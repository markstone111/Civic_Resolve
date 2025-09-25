// src/screens/MyIssues.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Stack } from "expo-router";

export default function MyIssues() {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text}>📝 My Issues</Text>
      </View>
    </>
    
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 24, fontWeight: "bold" },
});
