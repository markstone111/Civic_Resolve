// // src/screens/ReportIssue.tsx
// import React, { useState } from "react";
// import { View, Text, TextInput, Button, Image, StyleSheet, Alert } from "react-native";
// import * as ImagePicker from "expo-image-picker";
// import * as Location from "expo-location";
// import axios from "axios";
// import { Stack } from "expo-router";

// export default function ReportIssue() {
//   const [image, setImage] = useState<string | null>(null);
//   const [description, setDescription] = useState("");
//   const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
//   const [loading, setLoading] = useState(false);

//   // Pick image from camera or gallery
//   const pickImage = async () => {
//     let result = await ImagePicker.launchCameraAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       quality: 0.7,
//     });

//     if (!result.canceled) {
//       setImage(result.assets[0].uri);
//     }
//   };

//   // Get user GPS location
//   const getLocation = async () => {
//     let { status } = await Location.requestForegroundPermissionsAsync();
//     if (status !== "granted") {
//       Alert.alert("Permission denied", "Allow location access to report issues.");
//       return;
//     }
//     let loc = await Location.getCurrentPositionAsync({});
//     setLocation({ lat: loc.coords.latitude, lng: loc.coords.longitude });
//   };

//   // Submit issue
//   const submitIssue = async () => {
//     if (!image || !description || !location) {
//       Alert.alert("Missing info", "Please add a photo, description, and location.");
//       return;
//     }

//     setLoading(true);

//     try {
//       // Upload image (here we assume backend accepts multipart/form-data)
//       const formData = new FormData();
//       formData.append("photo", {
//         uri: image,
//         name: "issue.jpg",
//         type: "image/jpeg",
//       } as any);
//       formData.append("description", description);
//       formData.append("lat", location.lat.toString());
//       formData.append("lng", location.lng.toString());
//       formData.append("user_id", "201"); // later from Firebase auth


// // backend api update krna hai


//       await axios.post("http://<YOUR_BACKEND_URL>/issues", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       Alert.alert("Success ✅", "Your issue has been reported.");
//       setImage(null);
//       setDescription("");
//       setLocation(null);
//     } catch (error) {
//       console.error(error);
//       Alert.alert("Error ❌", "Failed to submit issue.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <View style={styles.container}>
//         <Text style={styles.heading}>Report an Issue</Text>

//         <Button title="📸 Take Photo" onPress={pickImage} />
//         {image && <Image source={{ uri: image }} style={styles.image} />}

//         <TextInput
//           style={styles.input}
//           placeholder="Description..."
//           value={description}
//           onChangeText={setDescription}
//         />

//         <Button title="Fetch Location" onPress={getLocation} />
//         {location && (
//           <Text>
//             Location: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
//           </Text>
//         )}

//         <Button
//           title={loading ? "Submitting..." : "Submit"}
//           onPress={submitIssue}
//         />
//       </View>
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, backgroundColor: "#fff" },
//   heading: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     padding: 10,
//     marginVertical: 10,
//     borderRadius: 8,
//   },
//   image: { width: "100%", height: 200, marginVertical: 10, borderRadius: 8 },
// });








//version-2(working-without-CSS)



// import React, { useState } from "react";
// import { View, Text, TextInput, Button, Image, StyleSheet, Alert } from "react-native";
// import { Picker } from "@react-native-picker/picker";
// import * as ImagePicker from "expo-image-picker";
// import * as Location from "expo-location";
// import axios from "axios";

// export default function ReportIssue() {
//   const [image, setImage] = useState<string | null>(null);
//   const [description, setDescription] = useState("");
//   const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
//   const [loading, setLoading] = useState(false);

//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [selectedType, setSelectedType] = useState("");

//   const categories = {
//     Road: ["Pothole", "Open Manhole", "Water Logging", "Cracking"],
//     Light: ["Malfunctioned Street Lights", "Broken Street Lights"],
//     Garbage: ["Overflowing Dustbins", "Lack of Dustbins", "Clogged Drains"],
//     Others: ["Fallen Objects", "Broken Electric Wires"],
//   };

//   const pickImage = async () => {
//     let result = await ImagePicker.launchCameraAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       quality: 0.7,
//     });

//     if (!result.canceled) {
//       setImage(result.assets[0].uri);
//     }
//   };

//   const getLocation = async () => {
//     let { status } = await Location.requestForegroundPermissionsAsync();
//     if (status !== "granted") {
//       Alert.alert("Permission denied", "Allow location access to report issues.");
//       return;
//     }
//     let loc = await Location.getCurrentPositionAsync({});
//     setLocation({ lat: loc.coords.latitude, lng: loc.coords.longitude });
//   };

//   const submitIssue = async () => {
//     if (!image || !description || !location || !selectedCategory || !selectedType) {
//       Alert.alert("Missing info", "Please complete all fields before submitting.");
//       return;
//     }

//     setLoading(true);

//     try {
//       const formData = new FormData();
//       formData.append("photo", {
//         uri: image,
//         name: "issue.jpg",
//         type: "image/jpeg",
//       } as any);
//       formData.append("description", description);
//       formData.append("lat", location.lat.toString());
//       formData.append("lng", location.lng.toString());
//       formData.append("user_id", "201"); // later from Firebase auth
//       formData.append("category", selectedCategory);
//       formData.append("type", selectedType);

//       await axios.post("http://172.17.32.117:5000/issues", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       Alert.alert("Success ✅", "Your issue has been reported.");
//       setImage(null);
//       setDescription("");
//       setLocation(null);
//       setSelectedCategory("");
//       setSelectedType("");
//     } catch (error) {
//       console.error(error);
//       Alert.alert("Error ❌", "Failed to submit issue.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>Report an Issue</Text>

//       <Button title="📸 Take Photo" onPress={pickImage} />
//       {image && <Image source={{ uri: image }} style={styles.image} />}

//       <TextInput
//         style={styles.input}
//         placeholder="Description..."
//         value={description}
//         onChangeText={setDescription}
//       />

//       <Button title="📍 Fetch Location" onPress={getLocation} />
//       {location && (
//         <Text>
//           Location: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
//         </Text>
//       )}

//       {/* Category Dropdown */}
//       <Text style={styles.label}>Issue Category</Text>
//       <Picker
//         selectedValue={selectedCategory}
//         onValueChange={(value) => {
//           setSelectedCategory(value);
//           setSelectedType(""); // Reset type when category changes
//         }}
//         style={styles.picker}
//       >
//         <Picker.Item label="Issue Related To" value="" />
//         {Object.keys(categories).map((cat) => (
//           <Picker.Item key={cat} label={cat} value={cat} />
//         ))}
//       </Picker>

//       {/* Type Dropdown */}
//       {selectedCategory !== "" && (
//         <>
//           <Text style={styles.label}>Select Type</Text>
//           <Picker
//             selectedValue={selectedType}
//             onValueChange={(value) => setSelectedType(value)}
//             style={styles.picker}
//           >
//             <Picker.Item label="Issue Type" value="" />
//             {categories[selectedCategory].map((type) => (
//               <Picker.Item key={type} label={type} value={type} />
//             ))}
//           </Picker>
//         </>
//       )}

//       <Button
//         title={loading ? "Submitting..." : "🚀 Submit"}
//         onPress={submitIssue}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, backgroundColor: "#ffffffff" },
//   heading: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
//   label: { fontSize: 16, marginTop: 15 },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     padding: 10,
//     marginVertical: 10,
//     borderRadius: 8,
//   },
//   image: { width: "100%", height: 200, marginVertical: 10, borderRadius: 8 },
//   picker: { borderWidth: 1, borderColor: "#ccc", marginVertical: 10 },
// });


import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import axios from "axios";
import { usePoints } from "../context/PointsContext";

export default function ReportIssue() {
  const { addPoints } = usePoints();
    
  const [image, setImage] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const categories = {
    Road: ["Pothole", "Open Manhole", "Water Logging", "Cracking"],
    Light: ["Malfunctioned Street Lights", "Broken Street Lights"],
    Garbage: ["Overflowing Dustbins", "Lack of Dustbins", "Clogged Drains"],
    Others: ["Fallen Objects", "Broken Electric Wires"],
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission denied",
        "Allow location access to report issues."
      );
      return;
    }
    let loc = await Location.getCurrentPositionAsync({});
    setLocation({ lat: loc.coords.latitude, lng: loc.coords.longitude });
  };

  const submitIssue = async () => {
    if (
      !image ||
      !description ||
      !location ||
      !selectedCategory ||
      !selectedType
    ) {
      Alert.alert(
        "Missing info",
        "Please complete all fields before submitting."
      );
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("photo", {
        uri: image,
        name: "issue.jpg",
        type: "image/jpeg",
      } as any);
      formData.append("description", description);
      formData.append("lat", location.lat.toString());
      formData.append("lng", location.lng.toString());
      formData.append("user_id", "201");
      formData.append("category", selectedCategory);
      formData.append("type", selectedType);

      await axios.post("http://172.17.32.117:5000/issues", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      addPoints(10); // reward 10 points for reporting an issue
      Alert.alert("Success ✅", "Your issue has been reported.");
      setImage(null);
      setDescription("");
      setLocation(null);
      setSelectedCategory("");
      setSelectedType("");
    } catch (error) {
      console.error(error);
      Alert.alert("Error ❌", "Failed to submit issue.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>📝 Report an Issue</Text>

      <TouchableOpacity style={styles.actionButton} onPress={pickImage}>
        <Text style={styles.actionText}>📸 Take Photo</Text>
      </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={styles.image} />}

      <TextInput
        style={styles.input}
        placeholder="Enter description..."
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <TouchableOpacity style={styles.actionButton} onPress={getLocation}>
        <Text style={styles.actionText}>📍 Fetch Location</Text>
      </TouchableOpacity>
      {location && (
        <Text style={styles.locationText}>
          Location: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
        </Text>
      )}

      <Text style={styles.label}>📂 Issue Category</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={selectedCategory}
          onValueChange={(value) => {
            setSelectedCategory(value);
            setSelectedType("");
          }}
        >
          <Picker.Item label="Select category..." value="" />
          {Object.keys(categories).map((cat) => (
            <Picker.Item key={cat} label={cat} value={cat} />
          ))}
        </Picker>
      </View>

      {selectedCategory !== "" && (
        <>
          <Text style={styles.label}>🔎 Select Type</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={selectedType}
              onValueChange={(value) => setSelectedType(value)}
            >
              <Picker.Item label="Select type..." value="" />
              {categories[selectedCategory].map((type) => (
                <Picker.Item key={type} label={type} value={type} />
              ))}
            </Picker>
          </View>
        </>
      )}

      <TouchableOpacity
        style={[
          styles.submitButton,
          loading && { backgroundColor: "#aaa" },
        ]}
        onPress={submitIssue}
        disabled={loading}
      >
        <Text style={styles.submitText}>
          {loading ? "Submitting..." : "🚀 Submit"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, backgroundColor: "#f8f9ff" },

//   heading: {
//     fontSize: 22,
//     fontWeight: "700",
//     marginBottom: 20,
//     color: "#333",
//     textAlign: "center",
//   },

//   actionButton: {
//     backgroundColor: "#5148ff",
//     paddingVertical: 12,
//     borderRadius: 10,
//     marginBottom: 12,
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   actionText: {
//     color: "#fff",
//     fontWeight: "600",
//     fontSize: 15,
//     textAlign: "center",
//   },

//   input: {
//     borderWidth: 1,
//     borderColor: "#ddd",
//     padding: 14,
//     marginVertical: 12,
//     borderRadius: 10,
//     backgroundColor: "#fff",
//     fontSize: 15,
//     textAlignVertical: "top",
//   },

//   image: {
//     width: "100%",
//     height: 200,
//     marginVertical: 12,
//     borderRadius: 10,
//   },

//   locationText: {
//     fontSize: 14,
//     marginTop: 8,
//     color: "#444",
//     fontStyle: "italic",
//   },

//   label: {
//     fontSize: 16,
//     fontWeight: "600",
//     marginTop: 18,
//     marginBottom: 6,
//     color: "#333",
//   },

//   pickerWrapper: {
//     borderWidth: 1,
//     borderColor: "#ddd",
//     borderRadius: 10,
//     backgroundColor: "#fff",
//     marginBottom: 12,
//   },

//   submitButton: {
//     backgroundColor: "#28a745",
//     paddingVertical: 14,
//     borderRadius: 10,
//     marginTop: 25,
//     marginBottom: 40,
//     shadowColor: "#000",
//     shadowOpacity: 0.15,
//     shadowOffset: { width: 0, height: 3 },
//     shadowRadius: 5,
//     elevation: 3,
//   },
//   submitText: {
//     color: "#fff",
//     fontWeight: "700",
//     fontSize: 16,
//     textAlign: "center",
//   },
// });




const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f2f8", // softer background
  },

  heading: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 25,
    color: "#1f1f1f",
    textAlign: "center",
  },

  actionButton: {
    backgroundColor: "#4f46ff",
    paddingVertical: 14,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
  },
  actionText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
    textAlign: "center",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 16,
    marginVertical: 15,
    borderRadius: 15,
    backgroundColor: "#fff",
    fontSize: 16,
    textAlignVertical: "top",
  },

  stickySubmitWrapper: {
  position: "absolute",
  bottom: 20,
  left: 20,
  right: 20,
  },

  image: {
    width: "100%",
    height: 220,
    marginVertical: 15,
    borderRadius: 15,
  },

  locationText: {
    fontSize: 14,
    marginTop: 8,
    color: "#555",
    fontStyle: "italic",
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 8,
    color: "#1f1f1f",
  },

  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 15,
    backgroundColor: "#fff",
    marginBottom: 15,
    overflow: "hidden",
  },

  submitButton: {
    backgroundColor: "#28a745",
    paddingVertical: 16,
    borderRadius: 15,
    marginTop: 30,
    marginBottom: 50,
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 4,
  },
  submitText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 17,
    textAlign: "center",
  },
});

