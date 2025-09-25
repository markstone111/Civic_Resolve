// import React, { useState } from "react";
// import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
// import MapView, { Marker } from "react-native-maps";
// import Icon from "react-native-vector-icons/Feather";

// const workers = [
//   { id: "1", name: "Worker A", lat: 37.78825, lon: -122.4324 },
//   { id: "2", name: "Worker B", lat: 37.78925, lon: -122.4334 },
//   { id: "3", name: "Worker C", lat: 37.79025, lon: -122.4344 },
// ];

// export default function WorkerMapView() {
//   const [instructionVisible, setInstructionVisible] = useState(false);

//   return (
//     <View style={styles.container}>
//       <MapView
//         style={styles.map}
//         initialRegion={{
//           latitude: 37.78825,
//           longitude: -122.4324,
//           latitudeDelta: 0.01,
//           longitudeDelta: 0.01,
//         }}
//       >
//         {workers.map((w) => (
//           <Marker
//             key={w.id}
//             coordinate={{ latitude: w.lat, longitude: w.lon }}
//             title={w.name}
//             description="Assigned worker"
//           />
//         ))}
//       </MapView>

//       {/* Floating Help button */}
//       <TouchableOpacity
//         style={styles.fab}
//         onPress={() => setInstructionVisible(true)}
//       >
//         <Icon name="help-circle" size={26} color="#fff" />
//       </TouchableOpacity>

//       {/* Instructions popup */}
//       <Modal
//         visible={instructionVisible}
//         animationType="slide"
//         transparent={true}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalBox}>
//             <Text style={styles.modalTitle}>How to Use</Text>
//             <Text style={styles.instruction}>
//               1. Zoom in/out to view worker locations.
//             </Text>
//             <Text style={styles.instruction}>
//               2. Tap a marker to see worker details.
//             </Text>
//             <Text style={styles.instruction}>
//               3. Each worker is assigned to specific issue locations.
//             </Text>
//             <TouchableOpacity
//               style={styles.closeBtn}
//               onPress={() => setInstructionVisible(false)}
//             >
//               <Text style={styles.closeBtnText}>Got it</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   map: { flex: 1 },
//   fab: {
//     position: "absolute",
//     bottom: 20,
//     right: 20,
//     backgroundColor: "#2563EB",
//     borderRadius: 50,
//     padding: 14,
//     elevation: 5,
//   },
//   modalOverlay: {
//     flex: 1,
//     justifyContent: "center",
//     backgroundColor: "rgba(0,0,0,0.5)",
//     padding: 20,
//   },
//   modalBox: {
//     backgroundColor: "#fff",
//     borderRadius: 20,
//     padding: 20,
//     shadowColor: "#000",
//     shadowOpacity: 0.2,
//     shadowRadius: 6,
//     elevation: 4,
//   },
//   modalTitle: { fontSize: 18, fontWeight: "700", marginBottom: 12 },
//   instruction: { fontSize: 14, color: "#374151", marginBottom: 8 },
//   closeBtn: {
//     backgroundColor: "#2563EB",
//     paddingVertical: 10,
//     borderRadius: 10,
//     alignItems: "center",
//     marginTop: 12,
//   },
//   closeBtnText: { color: "#fff", fontWeight: "600" },
// });



import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal, Image } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";


// Dummy issues with static map images (put images in assets/maps folder)
const issues = [
  {
    id: "1",
    name: "Reported a pothole",
    location: "Kanke Road, Ranchi",
    image: require("../assets/map1.png"), 
  },
  {
    id: "2",
    name: "Broken Streetlight",
    location: "Harmu Colony, Ranchi",
    image: require("../assets/map2.png"),
  },
  {
    id: "3",
    name: "Overflowing Dustbins",
    location: "Doranda, Ranchi",
    image: require("../assets/map3.png"),
  },
];

export default function WorkerMapView() {
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [instructionVisible, setInstructionVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Assigned Issues</Text>

      {issues.map((issue) => (
        <TouchableOpacity
          key={issue.id}
          style={styles.issueCard}
          onPress={() => setSelectedIssue(issue)}
        >
          <Text style={styles.issueName}>{issue.name}</Text>
          <Text style={styles.issueLocation}>{issue.location}</Text>
        </TouchableOpacity>
      ))}

      {/* Modal for static map preview */}
      <Modal visible={!!selectedIssue} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            {selectedIssue && (
              <>
                <Text style={styles.modalTitle}>{selectedIssue.name}</Text>
                <Text style={styles.modalSub}>{selectedIssue.location}</Text>
                <Image
                  source={selectedIssue.image}
                  style={styles.mapImage}
                  resizeMode="cover"
                />
                <TouchableOpacity
                  style={styles.closeBtn}
                  onPress={() => setSelectedIssue(null)}
                >
                  <Text style={styles.closeBtnText}>Close</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* Floating Help button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setInstructionVisible(true)}
      >
        <Icon name="help-circle" size={26} color="#fff" />
      </TouchableOpacity>

      {/* Instructions popup */}
      <Modal visible={instructionVisible} animationType="fade" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>How to Use</Text>
            <Text style={styles.instruction}>1. Tap an issue from the list.</Text>
            <Text style={styles.instruction}>2. A map will open.</Text>
            <Text style={styles.instruction}>3. Close the map to return to the list.</Text>
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

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9fafb", padding: 15 },
  heading: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 15,
    color: "#111827",
  },
  issueCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },
  issueName: { fontSize: 16, fontWeight: "600", color: "#1f2937" },
  issueLocation: { fontSize: 13, color: "#6b7280", marginTop: 3 },
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
    alignItems: "center",
  },
  modalTitle: { fontSize: 18, fontWeight: "700", marginBottom: 6, color: "#111" },
  modalSub: { fontSize: 14, color: "#555", marginBottom: 12 },
  mapImage: {
    width: "100%",
    height: 220,
    borderRadius: 12,
    marginBottom: 15,
  },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#2563EB",
    borderRadius: 50,
    padding: 14,
    elevation: 5,
  },
  instruction: { fontSize: 14, color: "#374151", marginBottom: 6 },
  closeBtn: {
    backgroundColor: "#2563EB",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
  },
  closeBtnText: { color: "#fff", fontWeight: "600" },
});
