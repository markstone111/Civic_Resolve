// import React, { useState } from "react";
// import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "@/src/firebase/firebaseconfig";
// import { Stack } from "expo-router";

// export default function LoginScreen({ navigation }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = async () => {
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       Alert.alert("Success", "Logged in successfully");
//     } catch (error) {
//       Alert.alert("Error", "Invalid email or password");
//     }
//   };

//   return (
//     <>
//       <View style={styles.container}>
//         <Text style={styles.heading}>Login</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Email"
//           value={email}
//           onChangeText={setEmail}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Password"
//           value={password}
//           onChangeText={setPassword}
//           secureTextEntry
//         />
//         <Button title="Login" onPress={handleLogin} />
//         <Text style={styles.link} onPress={() => navigation.navigate("SignUp")}>
//           Don’t have an account? Sign Up
//         </Text>
//     </View>
//     </>
    
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: "center", padding: 20 },
//   heading: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     padding: 10,
//     marginVertical: 10,
//     borderRadius: 8,
//   },
//   link: { marginTop: 15, color: "#5148ff", textAlign: "center" },
// });









// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   Alert,
//   TouchableOpacity,
// } from "react-native";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "@/src/firebase/firebaseconfig";
// import { Stack } from "expo-router";

// export default function LoginScreen({ navigation }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = async () => {
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       Alert.alert("Success", "Logged in successfully");
//     } catch (error) {
//       Alert.alert("Error", "Invalid email or password");
//     }
//   };

//   return (
//     <>
//       <Stack.Screen options={{ title: "Login" }} />
//       <View style={styles.container}>
//         <Text style={styles.heading}>🔐 Welcome Back</Text>

//         <TextInput
//           style={styles.input}
//           placeholder="Enter your email"
//           value={email}
//           onChangeText={setEmail}
//           keyboardType="email-address"
//           autoCapitalize="none"
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Enter your password"
//           value={password}
//           onChangeText={setPassword}
//           secureTextEntry
//         />

//         <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
//           <Text style={styles.loginText}>Login</Text>
//         </TouchableOpacity>

//         <Text
//           style={styles.link}
//           onPress={() => navigation.navigate("SignUp")}
//         >
//           Don’t have an account? <Text style={styles.signUpText}>Sign Up</Text>
//         </Text>
//       </View>
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     padding: 20,
//     backgroundColor: "#f8f9ff",
//   },

//   heading: {
//     fontSize: 26,
//     fontWeight: "700",
//     marginBottom: 30,
//     textAlign: "center",
//     color: "#333",
//   },

//   input: {
//     borderWidth: 1,
//     borderColor: "#ddd",
//     padding: 14,
//     marginVertical: 10,
//     borderRadius: 10,
//     backgroundColor: "#fff",
//     fontSize: 15,
//   },

//   loginButton: {
//     backgroundColor: "#5148ff",
//     paddingVertical: 14,
//     borderRadius: 10,
//     marginTop: 20,
//     shadowColor: "#000",
//     shadowOpacity: 0.15,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 4,
//     elevation: 3,
//   },

//   loginText: {
//     color: "#fff",
//     fontWeight: "600",
//     fontSize: 16,
//     textAlign: "center",
//   },

//   link: {
//     marginTop: 20,
//     fontSize: 14,
//     textAlign: "center",
//     color: "#555",
//   },

//   signUpText: {
//     color: "#5148ff",
//     fontWeight: "600",
//   },
// });


import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/src/firebase/firebaseconfig";
import { Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from 'react-i18next';
import { db } from "@/src/firebase/firebaseconfig";
import { doc, getDoc } from "firebase/firestore";


export default function LoginScreen({ navigation }) {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const handleLogin = async () => {
  //   try {
  //     await signInWithEmailAndPassword(auth, email, password);
  //     Alert.alert("Success", "Logged in successfully");
  //   } catch (error) {
  //     Alert.alert("Error", "Invalid email or password");
  //   }
  // };


  const handleLogin = async () => {
  try {
    const userCred = await signInWithEmailAndPassword(auth, email.trim(), password);
    const user = userCred.user;

    // fetch role from Firestore
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const role = docSnap.data().role || "user";
      // store role in AsyncStorage or Context
      globalThis.userRole = role; // quick demo, better to use Context
    } else {
      globalThis.userRole = "user"; // fallback
    }

    Alert.alert("Success", "Logged in successfully");
  } catch (error) {
    Alert.alert("Error", "Invalid email or password");
  }
};

  return (
    <>
      <Stack.Screen options={{ title: "Login" }} />
      <View style={styles.container}>
        <Text style={styles.heading}>Login</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Ionicons name="lock-closed" size={18} color="#fff" style={{ marginRight: 6 }} />
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>

        <Text style={styles.link} onPress={() => navigation.navigate("SignUp")}>
          Don’t have an account? <Text style={styles.signUpText}>Sign Up</Text>
        </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 25,
    backgroundColor: "#f2f4f7",
  },

  heading: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 35,
    color: "#222",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 14,
    marginBottom: 15,
    borderRadius: 8,
    backgroundColor: "#fff",
    fontSize: 15,
  },

  loginButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#488a3bff",
    paddingVertical: 14,
    borderRadius: 25,
    marginTop: 10,
  },

  loginText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
    letterSpacing: 1,
  },

  link: {
    marginTop: 20,
    fontSize: 14,
    textAlign: "center",
    color: "#5a5757ff",
  },

  signUpText: {
    color: "#4a7c7b",
    fontWeight: "600",
  },
});
