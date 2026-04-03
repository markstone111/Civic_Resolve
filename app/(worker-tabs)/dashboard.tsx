import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../../src/firebase/firebaseconfig";

export default function WorkerDashboard() {
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Field Worker Dashboard</Text>
      <Text style={styles.subtitle}>Tasks will be assigned here by administrators.</Text>
      <Button title="Logout" onPress={handleLogout} color="#218a2fff" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 30
  }
});
