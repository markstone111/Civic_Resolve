// src/services/geminiService.ts

export async function analyzeCivicIssue(base64Image: string, category: string, description: string): Promise<number> {
  const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
  if (!apiKey) {
    console.error("Missing Gemini API Key");
    return 5; // fallback
  }

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  const promptText = `
    You are an AI Triage system for a civic disaster and municipality tracking app.
    Given this image of a civic issue (Reported Category: ${category}, User Description: "${description}"),
    estimate a "Severity Score" from 1 to 10 (1 = extremely minor, 10 = catastrophic/immediate danger).
    Reply ONLY with a raw JSON object matching exactly this format, and nothing else (no markdown blocks, no text):
    {"score": <number>}
  `.trim();

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: promptText },
              {
                inline_data: {
                  mime_type: "image/jpeg",
                  data: base64Image,
                },
              },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
        const errDump = await response.text();
        console.error("Gemini API Error:", response.status, errDump);
        return 5; // default fallback on error
    }

    const data = await response.json();
    const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text || "{\"score\": 5}";
    
    // clean up any potential markdown formatting the model might improperly emit
    const cleanJson = replyText.replace(/```json/g, '').replace(/```/g, '').trim();
    const result = JSON.parse(cleanJson);
    return result.score || 5;

  } catch (error) {
    console.error("Gemini parse/network error:", error);
    return 5; // fallback severity
  }
}
