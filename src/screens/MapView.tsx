import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, Dimensions, ActivityIndicator } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import { useFocusEffect } from "expo-router";
import { collection, query, onSnapshot, where } from "firebase/firestore";
import { db } from "../firebase/firebaseconfig";

export default function MapViewScreen() {
  const [issues, setIssues] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchGlobalIssues = () => {
    setLoading(true);
    // Fetch all issues across the platform to map them
    const q = query(collection(db, "issues"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const issuesList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setIssues(issuesList);
      setLoading(false);
    }, (error) => {
      console.error("Failed to fetch map issues", error);
      setLoading(false);
    });

    return unsubscribe;
  };

  useFocusEffect(
    useCallback(() => {
      const unsub = fetchGlobalIssues();
      return () => {
        if (unsub) unsub();
      };
    }, [])
  );

  const getMarkerColor = (score: number) => {
    if (!score) return "gold";
    if (score >= 8) return "red";
    if (score >= 5) return "orange";
    return "green";
  };

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#5148ff" />
        </View>
      )}

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 25.5788, // Defaulting towards Shillong/Meghalaya area roughly, or generic India
          longitude: 91.8933,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        {issues.map((issue) => {
          if (!issue.location || !issue.location.lat || !issue.location.lng) return null;

          return (
            <Marker
              key={issue.id}
              coordinate={{
                latitude: issue.location.lat,
                longitude: issue.location.lng,
              }}
              pinColor={getMarkerColor(issue.severityScore)}
            >
              <Callout>
                <View style={styles.callout}>
                  <Text style={styles.calloutTitle}>{issue.category} Issue</Text>
                  <Text style={styles.calloutText}>{issue.description}</Text>
                  <Text style={styles.severityTag}>
                    AI Severity: {issue.severityScore || "N/A"}/10
                  </Text>
                  <Text style={styles.statusTag}>Status: {issue.status}</Text>
                </View>
              </Callout>
            </Marker>
          );
        })}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  map: { width: Dimensions.get("window").width, height: Dimensions.get("window").height },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
    backgroundColor: "rgba(255,255,255,0.7)",
  },
  callout: {
    width: 220,
    padding: 10,
  },
  calloutTitle: { fontWeight: "bold", fontSize: 16, marginBottom: 5, color: "#333" },
  calloutText: { fontSize: 13, color: "#555", marginBottom: 5 },
  severityTag: { fontSize: 12, fontWeight: "bold", color: "#d35400" },
  statusTag: { fontSize: 12, fontStyle: "italic", marginTop: 4, color: "#7f8c8d" },
});
