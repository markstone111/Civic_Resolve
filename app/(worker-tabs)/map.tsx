import React, { useState, useCallback, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, ActivityIndicator } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import { useFocusEffect } from "expo-router";
import { collection, query, onSnapshot, where } from "firebase/firestore";
import { db } from "../../src/firebase/firebaseconfig";
import { useDisaster } from "../../src/context/DisasterContext";
import { supabase } from "../../src/supabaseClient";
import { useTranslation } from "react-i18next";

export default function WorkerMapViewScreen() {
  const { t } = useTranslation();
  const [issues, setIssues] = useState<any[]>([]);
  const [reliefLocations, setReliefLocations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { isDisasterMode } = useDisaster();

  const fetchActiveIssues = () => {
    setLoading(true);
    // Field Workers only need to see active issues needing attention
    const q = query(collection(db, "issues"), where("status", "in", ["pending", "in-progress"]));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const issuesList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setIssues(issuesList);
      setLoading(false);
    }, (error) => {
      console.error("Failed to fetch worker map issues", error);
      setLoading(false);
    });
    return unsubscribe;
  };

  useFocusEffect(
    useCallback(() => {
      const unsub = fetchActiveIssues();
      return () => {
        if (unsub) unsub();
      };
    }, [])
  );

  useEffect(() => {
    if (isDisasterMode) {
      const fetchRelief = async () => {
        const { data, error } = await supabase
          .from("relief_locations")
          .select("*")
          .eq("is_active", true);
        
        if (data) setReliefLocations(data);
        if (error) console.error("Error fetching relief locations", error);
      };
      fetchRelief();
    } else {
      setReliefLocations([]); 
    }
  }, [isDisasterMode]);

  const getMarkerColor = (score: number, status: string) => {
    if (status === "in-progress") return "blue"; // Highlight tasks currently picked up
    if (!score) return "gold";
    if (score >= 8) return "red";
    if (score >= 5) return "orange";
    return "green";
  };

  const getReliefIcon = (type: string) => {
    switch (type) {
      case 'camp': return '⛺';
      case 'shelter': return '🛏️';
      case 'hospital': return '🏥';
      case 'food_center': return '🍲';
      case 'water_point': return '💧';
      default: return '📍';
    }
  };

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#218a2fff" />
        </View>
      )}

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 25.5788,
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
              coordinate={{ latitude: issue.location.lat, longitude: issue.location.lng }}
              pinColor={getMarkerColor(issue.severityScore, issue.status)}
            >
              <Callout>
                <View style={styles.callout}>
                  <Text style={styles.calloutTitle}>{issue.category} Issue</Text>
                  <Text style={styles.calloutText}>{issue.description}</Text>
                  <Text style={styles.severityTag}>AI Severity: {issue.severityScore || "N/A"}/10</Text>
                  <Text style={styles.statusTag}>Status: {issue.status.toUpperCase()}</Text>
                </View>
              </Callout>
            </Marker>
          );
        })}

        {reliefLocations.map((loc) => {
          if (!loc.latitude || !loc.longitude) return null;
          return (
            <Marker
              key={`relief-${loc.id}`}
              coordinate={{ latitude: loc.latitude, longitude: loc.longitude }}
              title={loc.name}
              description={`Type: ${loc.type.replace('_', ' ').toUpperCase()}`}
            >
              <View style={styles.customMarker}>
                <Text style={styles.emojiIcon}>{getReliefIcon(loc.type)}</Text>
              </View>
            </Marker>
          );
        })}
      </MapView>

      <View style={styles.mapLegend}>
        <Text style={styles.legendTitle}>Worker Legend</Text>
        <Text>🔴 Urgent (>=8)</Text>
        <Text>🟠 Monitor (>=5)</Text>
        <Text>🔵 In Progress</Text>
      </View>
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
  callout: { width: 220, padding: 10 },
  calloutTitle: { fontWeight: "bold", fontSize: 16, marginBottom: 5, color: "#333" },
  calloutText: { fontSize: 13, color: "#555", marginBottom: 5 },
  severityTag: { fontSize: 12, fontWeight: "bold", color: "#d35400" },
  statusTag: { fontSize: 12, fontWeight: "bold", marginTop: 4, color: "#218a2fff" },
  customMarker: {
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#b30000',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  emojiIcon: { fontSize: 20 },
  mapLegend: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4
  },
  legendTitle: { fontWeight: 'bold', borderBottomWidth: 1, borderBottomColor: '#eee', paddingBottom: 4, marginBottom: 4 }
});
