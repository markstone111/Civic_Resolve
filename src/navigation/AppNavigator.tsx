// // src/navigation/AppNavigator.tsx
// import React from "react";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// import ReportIssue from "../screens/ReportIssue";
// import Dashboard from "../screens/Dashboard";
// import MyIssues from "../screens/MyIssues";
// import MapViewScreen from "../screens/MapView";

// const Tab = createBottomTabNavigator();

// export default function AppNavigator() {
//   return (
//       <Tab.Navigator
//         screenOptions={{
//           headerShown: false,
//           tabBarActiveTintColor: "#5148ff",
//           tabBarInactiveTintColor: "#555",
//         }}
//       >
//         <Tab.Screen name="Dashboard" component={Dashboard} />
//         <Tab.Screen name="Report Issue" component={ReportIssue} />
//         <Tab.Screen name="My Issues" component={MyIssues} />
//         <Tab.Screen name="Map View" component={MapViewScreen} />
//       </Tab.Navigator>
//   );
// }



import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseconfig";

import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import Dashboard from "../screens/Dashboard";
import ReportIssue from "../screens/ReportIssue";
import MyIssues from "../screens/MyIssues";
import MapViewScreen from "../screens/MapView";
import TabNavigator from "../screens/TabNavigator";
import FieldWorkerNavigator from "../screens/FieldWorkerNavigator";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseconfig";



const Stack = createNativeStackNavigator();

// export default function AppNavigator() {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (usr) => {
//       setUser(usr);
//       setLoading(false);
//     });
//     return unsubscribe;
//   }, []);

//   if (loading) return null; // or a loading spinner

//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       {user ? (
//         <Stack.Screen name="Home" component={TabNavigator} />
//       ) : (
//         <>
//           <Stack.Screen name="Login" component={LoginScreen} />
//           <Stack.Screen name="SignUp" component={SignUpScreen} />
//         </>
//       )}
//     </Stack.Navigator>
//   );
// }



export default function AppNavigator() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState<"user" | "fieldworker" | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (usr) => {
      if (usr) {
        // fetch role from Firestore
        const docRef = doc(db, "users", usr.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setRole(docSnap.data().role || "user");
        } else {
          setRole("user");
        }
      }
      setUser(usr);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) return null;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        role === "fieldworker" ? (
          <Stack.Screen name="FieldWorker" component={FieldWorkerNavigator} />
        ) : (
          <Stack.Screen name="Home" component={TabNavigator} />
        )
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}