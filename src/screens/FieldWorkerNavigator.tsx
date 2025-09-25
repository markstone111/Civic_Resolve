// src/screens/FieldWorkerNavigator.tsx
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import WorkerMapView from "./WorkerMapView";
import MyIssues from "./MyIssues";

const Tab = createBottomTabNavigator();

export default function FieldWorkerNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Map" component={WorkerMapView} />
      {/* <Tab.Screen name="My Issues" component={MyIssues} /> */}
    </Tab.Navigator>
  );
}
