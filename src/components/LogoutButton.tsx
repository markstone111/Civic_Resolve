// src/components/LogoutButton.tsx
import React from "react";
import { Button } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseconfig";

export default function LogoutButton() {
  return (
    <Button
      title="Logout"
      onPress={() => {
        signOut(auth).catch((error) => console.error(error));
      }}
    />
  );
}
