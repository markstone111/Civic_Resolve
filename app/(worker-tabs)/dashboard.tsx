import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, Image } from "react-native";
import { collection, query, where, onSnapshot, doc, updateDoc } from "firebase/firestore";
import * as ImagePicker from "expo-image-picker";
import { db } from "../../src/firebase/firebaseconfig";
import { useTranslation } from "react-i18next";

export default function WorkerDashboard() {
  const { t } = useTranslation();
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only fetch issues that need action
    const q = query(
      collection(db, "issues"),
      where("status", "in", ["pending", "in-progress"])
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const issuesList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(issuesList.sort((a, b) => b.severityScore - a.severityScore));
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const handleStartWork = async (taskId: string) => {
    try {
      await updateDoc(doc(db, "issues", taskId), {
        status: "in-progress",
        updatedAt: new Date().toISOString()
      });
      Alert.alert("Task Started", "This issue is now marked as in-progress.");
    } catch (e) {
      Alert.alert("Error", "Could not start task.");
    }
  };

  const handleResolveTask = async (taskId: string) => {
    // 1. Force worker to take a resolution picture
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.5,
      base64: true,
    });

    if (result.canceled) {
      Alert.alert("Verification Required", "You must provide an 'After' photo to resolve an issue.");
      return;
    }

    // 2. Upload verification photo and definitively close the ticket
    try {
      await updateDoc(doc(db, "issues", taskId), {
        status: "resolved",
        resolvedImageBase64: result.assets[0].base64, // Keep as proof!
        resolvedAt: new Date().toISOString()
      });
      Alert.alert("Mission Accomplished! 🏆", "The issue has been verified and permanently resolved.");
    } catch (e) {
      Alert.alert("Error", "Could not resolve task.");
    }
  };

  const renderTask = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{item.category} Issue</Text>
        <Text style={[styles.badge, item.status === 'in-progress' ? styles.badgeProgress : styles.badgePending]}>
          {item.status.toUpperCase()}
        </Text>
      </View>
      
      <Text style={styles.desc}>{item.description}</Text>
      <Text style={styles.severity}>Severity Score: <Text style={{color:'red'}}>{item.severityScore}/10</Text></Text>

      {item.status === "pending" ? (
        <TouchableOpacity style={styles.btnStart} onPress={() => handleStartWork(item.id)}>
          <Text style={styles.btnText}>Start Work</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.btnResolve} onPress={() => handleResolveTask(item.id)}>
          <Text style={styles.btnText}>📸 Capture & Resolve</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Active Missions</Text>
      {loading ? (
        <Text style={styles.subtitle}>Loading tasks...</Text>
      ) : tasks.length === 0 ? (
        <Text style={styles.subtitle}>All clear! No active issues in your sector.</Text>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={renderTask}
          contentContainerStyle={{ paddingBottom: 30 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f0f2f8" },
  heading: { fontSize: 26, fontWeight: "700", marginBottom: 15, color: "#1f1f1f", marginTop: 40 },
  subtitle: { fontSize: 16, color: "#666", textAlign: "center", marginTop: 40 },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  cardHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
  cardTitle: { fontSize: 18, fontWeight: "bold", color: "#333" },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, fontWeight: "bold", fontSize: 12, color: 'white' },
  badgePending: { backgroundColor: "#FF9800" },
  badgeProgress: { backgroundColor: "#2196F3" },
  desc: { fontSize: 14, color: "#555", marginBottom: 10 },
  severity: { fontSize: 13, fontWeight: "600", marginBottom: 15 },
  btnStart: { backgroundColor: "#218a2fff", padding: 12, borderRadius: 8, alignItems: "center" },
  btnResolve: { backgroundColor: "#4CAF50", padding: 12, borderRadius: 8, alignItems: "center" },
  btnText: { color: "#fff", fontWeight: "bold", fontSize: 15 }
});
