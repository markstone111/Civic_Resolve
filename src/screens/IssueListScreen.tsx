import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";

interface Issue {
  id: string;
  title: string;
  description: string;
  status: "Acknowledged" | "In Progress" | "Resolved";
}

const dummyIssues: Issue[] = [
  {
    id: "1",
    title: "Pothole near Park",
    description: "Large pothole making road unsafe.",
    status: "Acknowledged",
  },
  {
    id: "2",
    title: "Streetlight Not Working",
    description: "Streetlight on 5th Ave is out for 2 weeks.",
    status: "In Progress",
  },
  {
    id: "3",
    title: "Garbage Overflow",
    description: "Bins overflowing at main market.",
    status: "Resolved",
  },
];

export default function IssueListScreen() {
  const [instructionVisible, setInstructionVisible] = useState(false);

  const renderItem = ({ item }: { item: Issue }) => (
    <View style={styles.card}>
      <View style={styles.rowBetween}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={[styles.status, getStatusStyle(item.status)]}>
          {item.status}
        </Text>
      </View>
      <Text style={styles.description}>{item.description}</Text>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionBtn}>
          <Icon name="eye" size={18} color="#4B5563" />
          <Text style={styles.actionText}>View</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn}>
          <Icon name="map-pin" size={18} color="#4B5563" />
          <Text style={styles.actionText}>Locate</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={dummyIssues}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 80 }}
      />

      {/* Floating help button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setInstructionVisible(true)}
      >
        <Icon name="help-circle" size={26} color="#fff" />
      </TouchableOpacity>

      {/* Instructions popup */}
      <Modal
        visible={instructionVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>How to Use</Text>
            <ScrollView style={{ maxHeight: 300 }}>
              <Text style={styles.instruction}>1. Browse issues listed here.</Text>
              <Text style={styles.instruction}>
                2. Tap <Icon name="eye" size={14} /> View to see full details.
              </Text>
              <Text style={styles.instruction}>
                3. Tap <Icon name="map-pin" size={14} /> Locate to see on map.
              </Text>
              <Text style={styles.instruction}>
                4. Status shows progress: Acknowledged → In Progress → Resolved.
              </Text>
              <Text style={styles.instruction}>
                5. Use the Report tab to create a new issue.
              </Text>
            </ScrollView>
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setInstructionVisible(false)}
            >
              <Text style={styles.closeBtnText}>Got it</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

function getStatusStyle(status: string) {
  switch (status) {
    case "Acknowledged":
      return { backgroundColor: "#FACC15" };
    case "In Progress":
      return { backgroundColor: "#60A5FA" };
    case "Resolved":
      return { backgroundColor: "#34D399" };
    default:
      return { backgroundColor: "#D1D5DB" };
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB", padding: 12 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  rowBetween: { flexDirection: "row", justifyContent: "space-between" },
  title: { fontSize: 16, fontWeight: "600", color: "#111827" },
  description: { fontSize: 14, color: "#4B5563", marginTop: 6 },
  status: {
    fontSize: 12,
    fontWeight: "500",
    color: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    overflow: "hidden",
  },
  actions: { flexDirection: "row", marginTop: 12, gap: 16 },
  actionBtn: { flexDirection: "row", alignItems: "center", gap: 4 },
  actionText: { fontSize: 13, color: "#4B5563" },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#2563EB",
    borderRadius: 50,
    padding: 14,
    elevation: 5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 20,
  },
  modalBox: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  modalTitle: { fontSize: 18, fontWeight: "700", marginBottom: 12 },
  instruction: { fontSize: 14, color: "#374151", marginBottom: 8 },
  closeBtn: {
    backgroundColor: "#2563EB",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 12,
  },
  closeBtnText: { color: "#fff", fontWeight: "600" },
});
