import { Stack } from "expo-router";
import "../global.css";
import AuthContextProvider from "./../context/auth";

export default function RootLayout() {
  return (
    <AuthContextProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </AuthContextProvider>
  );
}
