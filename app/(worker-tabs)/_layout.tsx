import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function WorkerTabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#218a2fff",
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Tasks",
          tabBarIcon: ({ color }) => <Ionicons name="list" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
