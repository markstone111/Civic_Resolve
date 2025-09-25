// import React from "react";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import Dashboard from "../screens/Dashboard";
// import ReportIssue from "../screens/ReportIssue";
// import MyIssues from "../screens/MyIssues";
// import MapViewScreen from "../screens/MapView";
//import SettingsScreen from "../screens/SettingsScreen";
//import ProfileScreen from "../screens/ProfileScreen";
//import SocialScreen from "../screens/SocialScreen";

// const Tab = createBottomTabNavigator();

// export default function TabNavigator() {
//   return (
//     <Tab.Navigator
//       screenOptions={{
//         headerShown: true,
//         tabBarActiveTintColor: "#5148ff",
//         tabBarInactiveTintColor: "#555",
//       }}
//     >
//       <Tab.Screen name="Dashboard" component={Dashboard} />
//       <Tab.Screen name="Report Issue" component={ReportIssue} />
//       <Tab.Screen name="Profile" component={ProfileScreen}/>
//       {/* <Tab.Screen name="My Issues" component={MyIssues} /> */}
//       {/* <Tab.Screen name="Map View" component={MapViewScreen} /> */}
//     </Tab.Navigator>
//   );
// }


import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import Dashboard from "../screens/Dashboard";
import ReportIssue from "../screens/ReportIssue";
import SettingsScreen from "../screens/SettingsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SocialScreen from "../screens/SocialScreen";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
        tabBarActiveTintColor: "#5148ff",
        tabBarInactiveTintColor: "#555",
        tabBarIcon: ({ color, size }) => {
          let iconName: string;

          if (route.name === "Dashboard") {
            iconName = "home-outline";
          } else if (route.name === "Report Issue") {
            iconName = "create-outline";
          } else if (route.name === "Profile") {
            iconName = "person-circle-outline";
          } else if (route.name === "Settings") {
            iconName = "settings-outline";
          } else if (route.name === "Social") {
            iconName = "people-outline";
          } else {
            iconName = "ellipse-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Report Issue" component={ReportIssue} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Social" component={SocialScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
