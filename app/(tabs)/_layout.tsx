import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: true,
        tabBarActiveTintColor: "#5148ff",
        tabBarInactiveTintColor: "#555",
        tabBarIcon: ({ color, size }) => {
          let iconName: any = "ellipse-outline";

          if (route.name === "dashboard") iconName = "home-outline";
          else if (route.name === "report") iconName = "create-outline";
          else if (route.name === "profile") iconName = "person-circle-outline";
          else if (route.name === "settings") iconName = "settings-outline";
          else if (route.name === "social") iconName = "people-outline";

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tabs.Screen name="dashboard" options={{ title: "Dashboard" }} />
      <Tabs.Screen name="report" options={{ title: "Report Issue" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
      <Tabs.Screen name="social" options={{ title: "Social" }} />
      <Tabs.Screen name="settings" options={{ title: "Settings" }} />
    </Tabs>
  );
}
