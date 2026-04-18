import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { sendPasswordResetEmail, signOut } from "firebase/auth";
import { auth } from "../../src/firebase/firebaseconfig";
import { useTranslation } from "react-i18next";

export default function WorkerSettings() {
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(false);

  const handlePasswordReset = async () => {
    if (!auth.currentUser?.email) return;
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, auth.currentUser.email);
      Alert.alert("Success", "A password reset link has been sent to your email.");
    } catch (e) {
      Alert.alert("Error", "Could not send reset email.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    signOut(auth).catch((error) => console.error(error));
  };

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Worker Settings</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account Security</Text>
        <Text style={styles.desc}>
          Logged in as: {auth.currentUser?.email}
        </Text>
        <TouchableOpacity
          style={[styles.button, styles.resetBtn, loading && { opacity: 0.7 }]}
          onPress={handlePasswordReset}
          disabled={loading}
        >
          <Text style={styles.buttonText}>{loading ? "Sending..." : "Reset My Password"}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Language Preferences</Text>
        <View style={styles.langRow}>
          <TouchableOpacity
            style={[styles.langBtn, i18n.language === 'en' && styles.langActive]}
            onPress={() => changeLanguage('en')}
          >
            <Text style={styles.langText}>English</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.langBtn, i18n.language === 'kha' && styles.langActive]}
            onPress={() => changeLanguage('kha')}
          >
            <Text style={styles.langText}>Khasi</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.langBtn, i18n.language === 'gar' && styles.langActive]}
            onPress={() => changeLanguage('gar')}
          >
            <Text style={styles.langText}>Garo</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={[styles.button, styles.logoutBtn]} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f8f9ff" },
  heading: { fontSize: 24, fontWeight: "700", marginBottom: 20, color: "#333", marginTop: 40 },
  section: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  sectionTitle: { fontSize: 16, fontWeight: "600", color: "#555", marginBottom: 10 },
  desc: { fontSize: 14, color: "#666", marginBottom: 10 },
  button: { padding: 14, borderRadius: 8, alignItems: "center" },
  resetBtn: { backgroundColor: "#FF9800" },
  logoutBtn: { backgroundColor: "#d32f2f", marginTop: 20 },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  langRow: { flexDirection: "row", justifyContent: "space-between" },
  langBtn: {
    flex: 1,
    padding: 12,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    alignItems: "center"
  },
  langActive: { backgroundColor: "#218a2fff", borderColor: "#218a2fff" },
  langText: { fontWeight: "600", color: "#333" },
});
