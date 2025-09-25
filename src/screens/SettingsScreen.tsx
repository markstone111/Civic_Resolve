// import React from "react";
// import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";

// export default function SettingsScreen() {
//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.subHeading}>Manage your app preferences</Text>

//       <View style={styles.card}>
//         <Text style={styles.cardTitle}>Notifications</Text>
//         <Text style={styles.cardDesc}>Enable or disable push notifications</Text>
//         <TouchableOpacity style={styles.button}>
//           <Text style={styles.buttonText}>Change</Text>
//         </TouchableOpacity>
//       </View>

//       <View style={styles.card}>
//         <Text style={styles.cardTitle}>Language</Text>
//         <Text style={styles.cardDesc}>Switch between languages</Text>
//         <TouchableOpacity style={styles.button}>
//           <Text style={styles.buttonText}>Change</Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, backgroundColor: "#f8f9ff" },
//   heading: { fontSize: 24, fontWeight: "700", marginBottom: 10, color: "#1f1f1f" },
//   subHeading: { fontSize: 14, color: "#555", marginBottom: 20 },
//   card: {
//     backgroundColor: "#fff",
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 15,
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 6,
//     elevation: 4,
//   },
//   cardTitle: { fontSize: 18, fontWeight: "600", color: "#222" },
//   cardDesc: { fontSize: 14, color: "#666", marginBottom: 10 },
//   button: {
//     backgroundColor: "#5148ff",
//     paddingVertical: 8,
//     borderRadius: 8,
//     alignSelf: "flex-start",
//     paddingHorizontal: 14,
//   },
//   buttonText: { color: "#fff", fontWeight: "600" },
// });
















// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   Switch,
// } from "react-native";

// export default function SettingsScreen() {
//   const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
//   const [selectedLanguage, setSelectedLanguage] = useState("English");
//   const [showLanguageCard, setShowLanguageCard] = useState(false);

//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.subHeading}>Manage your app preferences</Text>

//       {/* 🔔 Notifications */}
//       <View style={styles.card}>
//         <Text style={styles.cardTitle}>Notifications</Text>
//         <Text style={styles.cardDesc}>Enable or disable push notifications</Text>
//         <Switch
//           value={isNotificationsEnabled}
//           onValueChange={setIsNotificationsEnabled}
//           thumbColor={isNotificationsEnabled ? "#4CAF50" : "#ccc"}
//           trackColor={{ true: "#a5d6a7", false: "#ddd" }}
//         />
//       </View>

//       {/* 🌐 Language */}
//       <View style={styles.card}>
//         <Text style={styles.cardTitle}>Language</Text>
//         <Text style={styles.cardDesc}>
//           Current: {selectedLanguage}
//         </Text>
//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => setShowLanguageCard(!showLanguageCard)}
//         >
//           <Text style={styles.buttonText}>Change</Text>
//         </TouchableOpacity>

//         {showLanguageCard && (
//           <View style={styles.languageCard}>
//             {["English", "Hindi", "Nagpuri", "Santali"].map((lang) => (
//               <TouchableOpacity
//                 key={lang}
//                 style={[
//                   styles.languageOption,
//                   selectedLanguage === lang && styles.languageSelected,
//                 ]}
//                 onPress={() => setSelectedLanguage(lang)}
//               >
//                 <Text
//                   style={[
//                     styles.languageText,
//                     selectedLanguage === lang && { color: "#fff" },
//                   ]}
//                 >
//                   {lang}
//                 </Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//         )}
//       </View>

//       {/* 📖 Instructions */}
//       <View style={styles.card}>
//         <Text style={styles.cardTitle}>Instructions</Text>
//         <Text style={styles.cardDesc}>
//           Learn how to use and navigate the app
//         </Text>
//         <TouchableOpacity style={styles.button}>
//           <Text style={styles.buttonText}>View</Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, backgroundColor: "#f8f9ff" },
//   subHeading: { fontSize: 14, color: "#555", marginBottom: 20 },

//   card: {
//     backgroundColor: "#fff",
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 15,
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 6,
//     elevation: 4,
//   },

//   cardTitle: { fontSize: 18, fontWeight: "600", color: "#222" },
//   cardDesc: { fontSize: 14, color: "#666", marginBottom: 10 },

//   button: {
//     backgroundColor: "#5148ff",
//     paddingVertical: 8,
//     borderRadius: 8,
//     alignSelf: "flex-start",
//     paddingHorizontal: 14,
//   },
//   buttonText: { color: "#fff", fontWeight: "600" },

//   languageCard: {
//     marginTop: 12,
//     backgroundColor: "#f2f3ff",
//     padding: 12,
//     borderRadius: 10,
//   },
//   languageOption: {
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//     borderRadius: 8,
//     marginBottom: 8,
//     backgroundColor: "#fff",
//     borderWidth: 1,
//     borderColor: "#ccc",
//   },
//   languageSelected: {
//     backgroundColor: "#5148ff",
//     borderColor: "#5148ff",
//   },
//   languageText: {
//     fontSize: 15,
//     color: "#333",
//     fontWeight: "500",
//   },
// });


import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Modal,
} from "react-native";

export default function SettingsScreen() {
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [showLanguageCard, setShowLanguageCard] = useState(false);
  const [instructionsVisible, setInstructionsVisible] = useState(false);

  const instructions = [
    "Open the app and login using your credentials.",
    "Report an issue: Go to the 'Report Issue' tab → Take or upload a photo → Add a clear description → Fetch location → Choose category & type → Tap Submit. (You earn +10 coins for each valid report.)",
    "Validate reports: Open the 'Social' tab to see community posts. React TRUE or FALSE to validate — each reaction gives +2 coins.",
    "Profile: Visit the 'Profile' tab to view your name, avatar and coins. Use Edit Profile to upload image and change name/password.",
    "Dashboard: Check your reported issues and their statuses on the Dashboard.",
    "Settings: Toggle Notifications here. Use Language to pick a language.",
    "Be honest and add clear photos; avoid false reports. Community validation helps prioritize real problems faster.",
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }}>
      <Text style={styles.subHeading}>Manage your app preferences</Text>

      {/* 🔔 Notifications */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Notifications</Text>
        <Text style={styles.cardDesc}>Enable or disable push notifications</Text>
        <Switch
          value={isNotificationsEnabled}
          onValueChange={setIsNotificationsEnabled}
          thumbColor={isNotificationsEnabled ? "#4CAF50" : "#ccc"}
          trackColor={{ true: "#a5d6a7", false: "#ddd" }}
        />
      </View>

      {/* 🌐 Language */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Language</Text>
        <Text style={styles.cardDesc}>Current: {selectedLanguage} (Demo only)</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setShowLanguageCard(!showLanguageCard)}
        >
          <Text style={styles.buttonText}>{showLanguageCard ? "Close" : "Change"}</Text>
        </TouchableOpacity>

        {showLanguageCard && (
          <View style={styles.languageCard}>
            {["English", "Hindi", "Nagpuri", "Santali"].map((lang) => (
              <TouchableOpacity
                key={lang}
                style={[
                  styles.languageOption,
                  selectedLanguage === lang && styles.languageSelected,
                ]}
                onPress={() => setSelectedLanguage(lang)}
              >
                <Text
                  style={[
                    styles.languageText,
                    selectedLanguage === lang && { color: "#fff" },
                  ]}
                >
                  {lang}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {/* 📖 Instructions */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Instructions</Text>
        <Text style={styles.cardDesc}>Learn how to use and navigate the app</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setInstructionsVisible(true)}
        >
          <Text style={styles.buttonText}>View</Text>
        </TouchableOpacity>
      </View>

      {/* Instructions Modal */}
      <Modal
        visible={instructionsVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setInstructionsVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeading}>Quick Instructions</Text>

            <ScrollView contentContainerStyle={{ paddingVertical: 8 }}>
              {instructions.map((step, idx) => (
                <View key={idx} style={styles.instructionRow}>
                  <View style={styles.stepNumber}>
                    <Text style={styles.stepNumberText}>{idx + 1}</Text>
                  </View>
                  <Text style={styles.instructionText}>{step}</Text>
                </View>
              ))}
            </ScrollView>

            <View style={styles.modalButtonsRow}>
              <TouchableOpacity
                style={[styles.modalBtn, { backgroundColor: "#999" }]}
                onPress={() => setInstructionsVisible(false)}
              >
                <Text style={styles.modalBtnText}>Close</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalBtn, { backgroundColor: "#5148ff" }]}
                onPress={() => setInstructionsVisible(false)}
              >
                <Text style={styles.modalBtnText}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f8f9ff" },
  subHeading: { fontSize: 14, color: "#555", marginBottom: 20 },

  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 4,
  },

  cardTitle: { fontSize: 18, fontWeight: "600", color: "#222" },
  cardDesc: { fontSize: 14, color: "#666", marginBottom: 10 },

  button: {
    backgroundColor: "#5148ff",
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: "flex-start",
    paddingHorizontal: 14,
  },
  buttonText: { color: "#fff", fontWeight: "600" },

  languageCard: {
    marginTop: 12,
    backgroundColor: "#f2f3ff",
    padding: 12,
    borderRadius: 10,
  },
  languageOption: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  languageSelected: {
    backgroundColor: "#5148ff",
    borderColor: "#5148ff",
  },
  languageText: {
    fontSize: 15,
    color: "#333",
    fontWeight: "500",
  },

  /* Modal styles */
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  modalContent: {
    width: "100%",
    maxHeight: "80%",
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 18,
  },
  modalHeading: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
    color: "#111",
  },
  instructionRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#e6e9ff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  stepNumberText: { color: "#30366a", fontWeight: "700" },
  instructionText: { flex: 1, color: "#333", fontSize: 14 },

  modalButtonsRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 8,
  },
  modalBtn: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    marginLeft: 8,
  },
  modalBtnText: { color: "#fff", fontWeight: "700" },
});
