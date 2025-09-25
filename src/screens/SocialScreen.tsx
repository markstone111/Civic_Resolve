import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from "react-native";
import { usePoints } from "../context/PointsContext"; // ✅ import points system

import potholeImg from "../assets/pothole.png";
import streetlightImg from "../assets/pole.png";
import dustbinImg from "../assets/dustbin.png";

export default function SocialScreen() {
  const { addPoints } = usePoints();

  const [posts, setPosts] = useState([
    {
      id: "101",
      user: "Chandan Jaiswal",
      content: "Reported a pothole",
      location: "Kanke Road, Ranchi",
      image: potholeImg,
      reacted: false,
    },
    {
      id: "102",
      user: "Harish Kumar",
      content: "Broken Streetlight",
      location: "Harmu Colony, Ranchi",
      image: streetlightImg,
      reacted: false,
    },
    {
      id: "103",
      user: "Naveen Kullu",
      content: "Overflowing Dustbins",
      location: "Doranda, Ranchi",
      image: dustbinImg,
      reacted: false,
    },
  ]);

  const handleReaction = (postId: string, type: "approve" | "reject") => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId ? { ...p, reacted: true, reaction: type } : p
      )
    );
    addPoints(2); // ✅ reward 2 points per reaction
  };

  return (
    <View style={styles.container}>
      <Text style={styles.subHeading}>Crowd Validation of Civic Issues</Text>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.postCard}>
            <Text style={styles.postUser}>{item.user}</Text>
            <Image source={item.image} style={styles.postImage} />
            <Text style={styles.postLocation}>📍 {item.location}</Text>
            <Text style={styles.postContent}>{item.content}</Text>

            {!item.reacted ? (
              <View style={styles.actionRow}>
                <TouchableOpacity
                  style={[styles.button, { backgroundColor: "#4CAF50" }]}
                  onPress={() => handleReaction(item.id, "approve")}
                >
                  <Text style={styles.buttonText}>✔️ True</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, { backgroundColor: "#c9312eff" }]}
                  onPress={() => handleReaction(item.id, "reject")}
                >
                  <Text style={styles.buttonText}>❌ False</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <Text style={styles.reactedText}>
                ✅ You reacted: {item.reaction === "approve" ? "True" : "False"}
              </Text>
            )}
            
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f8f9ff" },
  heading: { fontSize: 24, fontWeight: "700", marginBottom: 8, color: "#1f1f1f" },
  subHeading: { fontSize: 14, color: "#555", marginBottom: 20 },
  postCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 3,
  },
  postUser: { fontWeight: "700", fontSize: 16, color: "#222", marginBottom: 6 },
  postImage: { width: "100%", height: 180, borderRadius: 12, marginBottom: 10 },
  postLocation: { fontSize: 13, color: "#777", marginBottom: 6 },
  postContent: { fontSize: 14, color: "#333", marginBottom: 12 },
  actionRow: { flexDirection: "row", justifyContent: "space-between" },
  button: {
    flex: 0.48,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "600", fontSize: 14 },
  reactedText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "600",
    color: "#4CAF50",
    textAlign: "center",
  },
  reactedTextFalse: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "600",
    color: "#ce142dff",
    textAlign: "center",
  },
});
