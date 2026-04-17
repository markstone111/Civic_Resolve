// import React, { useEffect, useState , useCallback} from "react";
// import { View, Text, StyleSheet, Button, FlatList, Image, ActivityIndicator } from "react-native";
// import { signOut } from "firebase/auth";
// import { auth } from "../firebase/firebaseconfig";
// import { Stack , useFocusEffect} from "expo-router";
// import axios from "axios";

// export default function Dashboard() {
//   const [issues, setIssues] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   const fetchIssues = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get("http://172.17.32.117:5000/issues");
//       setIssues(response.data.issues);
//     } catch (error) {
//       console.error("Failed to fetch issues", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useFocusEffect(
//     useCallback(() => {
//       fetchIssues();
//     }, [])
//   );
//   return (
//     <>
//       <Stack.Screen options={{ title: "Dashboard" }} />

//       <View style={styles.container}>
//         <Button
//           title="Logout"
//           onPress={() => {
//             signOut(auth).catch((error) => console.error(error));
//           }}
//         />

//         <Text style={styles.heading}>Reported Issues</Text>

//         {loading ? (
//           <ActivityIndicator size="large" color="#5148ff" />
//         ) : (
//           <FlatList
//             data={issues}
//             keyExtractor={(item) => item.id.toString()}
//             renderItem={({ item }) => (
//               <View style={styles.issueCard}>
//                 <Image source={{ uri: `http://172.17.32.117${item.photo}` }} style={styles.issueImage} />
//                 <Text style={styles.issueText}>Description: {item.description}</Text>
//                 <Text style={styles.issueText}>
//                   Location: {item.lat}, {item.lng}
//                 </Text>
//                 <Text style={styles.issueText}>Category: {item.category}</Text>
//                 <Text style={styles.issueText}>Type: {item.type}</Text>
//               </View>
//             )}
//           />
//         )}
//       </View>
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, backgroundColor: "#ffffffff" },
//   heading: { fontSize: 18, fontWeight: "bold", margin: 10, textAlign: "left" },
//   issueCard: {
//     borderWidth: 1,
//     borderColor: "#9b5f5fff",
//     borderRadius: 8,
//     padding: 10,
//     marginVertical: 8,
//   },
//   issueImage: {
//     width: "100%",
//     height: 200,
//     borderRadius: 8,
//     marginBottom: 10,
//   },
//   issueText: {
//     fontSize: 14,
//     marginBottom: 5,
//   },
// });


// import React, { useEffect, useState, useCallback } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Button,
//   FlatList,
//   Image,
//   ActivityIndicator,
//   TouchableOpacity,
// } from "react-native";
// import { signOut } from "firebase/auth";
// import { auth } from "../firebase/firebaseconfig";
// import { Stack, useFocusEffect } from "expo-router";
// import axios from "axios";

// export default function Dashboard() {
//   const [issues, setIssues] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   const fetchIssues = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get("http://192.168.1.36:5000/issues");
//       setIssues(response.data.issues);
//     } catch (error) {
//       console.error("Failed to fetch issues", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useFocusEffect(
//     useCallback(() => {
//       fetchIssues();
//     }, [])
//   );

//   return (
//     <>
//       <Stack.Screen options={{ title: "Dashboard" }} />

//       <View style={styles.container}>
//         <TouchableOpacity
//           style={styles.logoutButton}
//           onPress={() => {
//             signOut(auth).catch((error) => console.error(error));
//           }}
//         >
//           <Text style={styles.logoutText}>Logout</Text>
//         </TouchableOpacity>

//         <Text style={styles.heading}>📌 Reported Issues</Text>

//         {loading ? (
//           <ActivityIndicator size="large" color="#5148ff" style={{ marginTop: 20 }} />
//         ) : (
//           <FlatList
//             data={issues}
//             keyExtractor={(item) => item.id.toString()}
//             renderItem={({ item }) => (
//               <View style={styles.issueCard}>
//                 <Image
//                   source={{ uri: `http://172.17.32.117${item.photo}` }}
//                   style={styles.issueImage}
//                 />
//                 <View style={styles.issueContent}>
//                   <Text style={styles.issueTitle}>{item.category}</Text>
//                   <Text style={styles.issueText}>📝 {item.description}</Text>
//                   <Text style={styles.issueText}>
//                     📍 {item.lat}, {item.lng}
//                   </Text>
//                   <Text style={styles.issueTag}>Type: {item.type}</Text>
//                 </View>
//               </View>
//             )}
//           />
//         )}
//       </View>
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 16, backgroundColor: "#f8f9ff" },

//   heading: {
//     fontSize: 20,
//     fontWeight: "700",
//     marginBottom: 16,
//     color: "#333",
//   },

//   logoutButton: {
//     alignSelf: "flex-end",
//     backgroundColor: "#ff4d4f",
//     paddingVertical: 8,
//     paddingHorizontal: 14,
//     borderRadius: 6,
//     marginBottom: 10,
//   },
//   logoutText: {
//     color: "#fff",
//     fontWeight: "600",
//     fontSize: 14,
//   },

//   issueCard: {
//     backgroundColor: "#fff",
//     borderRadius: 12,
//     marginBottom: 14,
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 6,
//     elevation: 3,
//     overflow: "hidden",
//   },

//   issueImage: {
//     width: "100%",
//     height: 180,
//   },

//   issueContent: {
//     padding: 12,
//   },

//   issueTitle: {
//     fontSize: 16,
//     fontWeight: "700",
//     marginBottom: 6,
//     color: "#5148ff",
//   },

//   issueText: {
//     fontSize: 14,
//     color: "#444",
//     marginBottom: 4,
//   },

//   issueTag: {
//     fontSize: 13,
//     fontWeight: "600",
//     color: "#9b5f5f",
//     marginTop: 6,
//     alignSelf: "flex-start",
//   },
// });



import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { auth, db } from "../firebase/firebaseconfig";
import { collection, query, where, onSnapshot, addDoc } from "firebase/firestore";
import { Stack, useFocusEffect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Dashboard() {
  const [issues, setIssues] = useState<any[]>([]);
  const [offlineQueue, setOfflineQueue] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchIssues = () => {
    setLoading(true);
    const user = auth.currentUser;
    if (!user) {
      setLoading(false);
      return;
    }

    // Set up realtime listener for this specific citizen's issues
    const q = query(collection(db, "issues"), where("userId", "==", user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const issuesList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setIssues(issuesList);
      setLoading(false);
    }, (error) => {
      console.error("Failed to fetch issues", error);
      setLoading(false);
    });

    return unsubscribe;
  };

  const loadOfflineQueue = async () => {
    try {
      const existing = await AsyncStorage.getItem("OFFLINE_QUEUE_ISSUES");
      if (existing) {
        setOfflineQueue(JSON.parse(existing));
      }
    } catch (e) {
      console.error("Failed to load queue", e);
    }
  };

  useFocusEffect(
    useCallback(() => {
      const unsub = fetchIssues();
      loadOfflineQueue();
      return () => {
        if (unsub) unsub();
      };
    }, [])
  );

  const syncQueueToCloud = async () => {
    setLoading(true);
    let successCount = 0;
    try {
      for (const issue of offlineQueue) {
        const { id, imageBase64, ...firestorePayload } = issue;
        await addDoc(collection(db, "issues"), {
          ...firestorePayload,
          userId: auth.currentUser?.uid || "anonymous"
        });
        successCount++;
      }
      
      await AsyncStorage.removeItem("OFFLINE_QUEUE_ISSUES");
      setOfflineQueue([]);
      alert(`Successfully synced ${successCount} queued issues to the Cloud!`);
    } catch (error) {
      console.error("Sync error:", error);
      alert("Failed to sync queue. Please ensure stable internet and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: "Dashboard" }} />

      <View style={styles.container}>
        {/* Logout */}
        {/* <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => {
            signOut(auth).catch((error) => console.error(error));
          }}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity> */}

        {/* Welcome */}
        <Text style={styles.welcome}>Welcome, {auth.currentUser?.email?.split('@')[0] || 'Citizen'}!</Text>
        <Text style={styles.subHeading}>Dashboard</Text>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={[styles.statCard, { backgroundColor: "#243B6B" }]}>
            <Text style={styles.statValue}>{issues.length}</Text>
            <Text style={styles.statLabel}>Issues Reported</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: "#E29B4E" }]}>
            <Text style={styles.statValue}>
              {issues.filter((i) => i.status === "resolved").length}
            </Text>
            <Text style={styles.statLabel}>Issues Resolved</Text>
          </View>
        </View>

        {/* Offline Queue Sync Card */}
        {offlineQueue.length > 0 && (
          <View style={styles.syncCard}>
            <Text style={styles.syncCardTitle}>🚨 Data Sync Required</Text>
            <Text style={styles.syncCardText}>
              You have {offlineQueue.length} issue(s) recorded offline during Disaster Mode.
            </Text>
            <TouchableOpacity style={styles.syncButton} onPress={syncQueueToCloud}>
              <Text style={styles.syncButtonText}>Sync to Cloud</Text>
            </TouchableOpacity>
          </View>
        )}

        <Text style={styles.sectionTitle}>Your Past Reports</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#5148ff" style={{ marginTop: 20 }} />
        ) : (
          <FlatList
            data={issues}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View
                style={[
                  styles.reportCard,
                  item.status === "resolved"
                    ? styles.resolved
                    : item.status === "in-progress"
                    ? styles.inProgress
                    : styles.pending,
                ]}
              >
                <Text style={styles.reportText}>
                  {item.status === "resolved" ? "✅ " : "🕒 "}
                  Your issue{" "}
                  <Text style={styles.issueLink}>{item.type || item.category}</Text>{" "}
                  {item.status === "resolved"
                    ? "was resolved"
                    : item.status === "in-progress"
                    ? "is currently in progress"
                    : "was reported"}
                </Text>
                <Text style={styles.reportDate}>
                  Severity Score: {item.severityScore}/10
                </Text>
              </View>
            )}
          />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f8f9ff" },

  logoutButton: {
    alignSelf: "flex-end",
    backgroundColor: "#ff4d4f",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginBottom: 10,
  },
  logoutText: { color: "#fff", fontWeight: "600", fontSize: 14 },

  welcome: { fontSize: 20, fontWeight: "700", color: "#222" },
  subHeading: { fontSize: 14, color: "#777", marginBottom: 16 },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 5,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "800",
    color: "#fff",
    marginBottom: 6,
  },
  statLabel: { fontSize: 14, color: "#fff" },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
  },

  reportCard: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
  },
  reportText: { fontSize: 14, color: "#222" },
  reportDate: { fontSize: 12, color: "#777", marginTop: 4 },
  issueLink: { color: "#1E5EFF", fontWeight: "600" },

  resolved: { borderLeftWidth: 4, borderLeftColor: "#2ecc71" },
  inProgress: { borderLeftWidth: 4, borderLeftColor: "#3498db" },
  pending: { borderLeftWidth: 4, borderLeftColor: "#f1c40f" },
  syncCard: {
    backgroundColor: '#ffdbdb',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ff4d4f'
  },
  syncCardTitle: { fontSize: 16, fontWeight: 'bold', color: '#b30000', marginBottom: 6 },
  syncCardText: { color: '#b30000', marginBottom: 12 },
  syncButton: {
    backgroundColor: '#b30000',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center'
  },
  syncButtonText: { color: 'white', fontWeight: 'bold' }
});
