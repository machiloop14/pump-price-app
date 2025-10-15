import { Tabs } from "expo-router";
import React from "react";

const _layout = () => {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="home" />
      <Tabs.Screen name="submit" />
      <Tabs.Screen name="trends" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
};

export default _layout;
