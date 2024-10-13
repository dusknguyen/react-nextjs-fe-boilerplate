"use client";
import React, { JSX } from "react";
import { View, Text } from "react-native";

/**
 * @component Home
 * @description Main home screen component, show API URL clearly.
 * @returns {JSX.Element} Home screen UI.
 */
export default function Home(): JSX.Element {
  const apiUrl = process.env["EXPO_PUBLIC_API_URL"];

  console.log("EXPO_PUBLIC_API_URL:", apiUrl);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>🏠 Home Screen</Text>
      <Text style={{ marginTop: 12, fontSize: 16 }}>
        🌐 API URL: {apiUrl}
      </Text>
    </View>
  );
}