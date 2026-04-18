const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');
const path = require('path');

// Initialize Firebase Admin with the secure Service Account Key
const serviceAccountPath = path.resolve(__dirname, '../serviceAccountKey.json');
let serviceAccount;

try {
  serviceAccount = require(serviceAccountPath);
} catch (e) {
  console.error('🚨 CRITICAL ERROR: serviceAccountKey.json is missing from the project root! Please add it.');
  process.exit(1);
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const app = express();
app.use(cors());
app.use(express.json());

// PORT
const PORT = process.env.PORT || 4000;

/**
 * 🛠️ Endpoint: /api/admin/create-worker
 * Creates a Field Worker using Admin Auth & Sets the Custom Claim
 */
app.post('/api/admin/create-worker', async (req, res) => {
  const { email, password, displayName } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Missing email or password." });
  }

  try {
    // 1. Create the Auth User globally
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: displayName || "Field Worker",
    });

    // 2. Assign the definitive Custom Claim (This securely sets them as a Worker)
    await admin.auth().setCustomUserClaims(userRecord.uid, { role: 'fieldworker' });

    // 3. Generate a Password Reset Request so they can claim their account
    const resetLink = await admin.auth().generatePasswordResetLink(email);

    // Normally you would send `resetLink` via SendGrid or AWS SES.
    // For now, we will just return it in the payload.

    return res.status(200).json({
      success: true,
      message: `Worker account created successfully for ${email}.`,
      uid: userRecord.uid,
      resetLink: resetLink, // ⚠️ In production, email this instead of returning it!
    });
  } catch (error) {
    console.error("Error creating field worker:", error);
    return res.status(500).json({ error: error.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`✅ Backend Admin Server running on http://localhost:${PORT}`);
  console.log(`✅ Firebase Admin initialized tracking project: ${serviceAccount.project_id}`);
});
