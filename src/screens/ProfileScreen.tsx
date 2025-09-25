import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseconfig";
import * as ImagePicker from "expo-image-picker";
import { usePoints } from "../context/PointsContext";
export default function ProfileScreen() {
  const { coins } = usePoints();
  const [name, setName] = useState("Mark Stone");
  const [email] = useState("test@mail.com");
  const [avatar, setAvatar] = useState("https://ashallendesign.co.uk/blog/13-placeholder-avatar-and-image-websites");

  const [modalVisible, setModalVisible] = useState(false);
  const [tempName, setTempName] = useState(name);
  const [tempAvatar, setTempAvatar] = useState(avatar);
  const [tempPassword, setTempPassword] = useState("");

  const pickImage = async () => {
    // Ask for permission
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "We need permission to access your photos.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      setTempAvatar(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    setName(tempName);
    setAvatar(tempAvatar);
    // For demo only
    // if (tempPassword.trim()) {
    //   Alert.alert("Password Updated (Demo)", "This is just a placeholder. In future, it will update Firebase password.");
    // }
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileCard}>
        <Image source={{ uri: avatar }} style={styles.avatar} />
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.email}>{email}</Text>
        <Text style={styles.coins}>⭐ {coins} Points</Text>
      </View>

      {/* Edit Profile Button */}
      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.actionText}>Edit Profile</Text>
      </TouchableOpacity>

      {/* Logout Button */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => {
          signOut(auth).catch((error) => console.error(error));
        }}
      >
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      {/* Modal for editing profile */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeading}>Edit Profile</Text>

            <TextInput
              style={styles.input}
              placeholder="Enter Name"
              value={tempName}
              onChangeText={setTempName}
            />

            <TextInput
              style={styles.input}
              placeholder="Enter New Password"
              secureTextEntry
              value={tempPassword}
              onChangeText={setTempPassword}
            />

            <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
              <Text style={styles.uploadText}>Change Profile Picture</Text>
            </TouchableOpacity>

            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: "#5148ff" }]}
                onPress={handleSave}
              >
                <Text style={styles.modalButtonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: "#999" }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f8f9ff" },
  heading: { fontSize: 24, fontWeight: "700", marginBottom: 20, color: "#1f1f1f" },
  profileCard: {
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },
  avatar: { width: 120, height: 120, borderRadius: 60, marginBottom: 15 },
  name: { fontSize: 20, fontWeight: "700", color: "#222" },
  email: { fontSize: 14, color: "#555" },
  actionButton: {
    backgroundColor: "#5148ff",
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
  },
  actionText: { color: "#fff", fontWeight: "600", textAlign: "center" },
  logoutButton: {
    backgroundColor: "#ff4d4f",
    padding: 14,
    borderRadius: 12,
    marginTop: 20,
  },
  logoutText: { color: "#fff", fontWeight: "700", textAlign: "center" },

  // Modal styles
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "85%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
  },
  modalHeading: { fontSize: 18, fontWeight: "700", marginBottom: 15 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  uploadText: { color: "#333", fontWeight: "600" },
  modalButton: {
    flex: 1,
    padding: 12,
    marginHorizontal: 5,
    borderRadius: 10,
  },
    uploadButton: {
    display: "flex",
    justifyContent: "flex-start",
    alignContent: "flex-start",
    backgroundColor: "#eee",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 12,
  },
  modalButtonText: { color: "#fff", fontWeight: "700", textAlign: "center" },
  coins: { fontSize: 16, fontWeight: "600", color: "#5148ff", marginTop: 8 },

});
