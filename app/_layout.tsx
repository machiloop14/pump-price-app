import { Stack } from "expo-router";
import { ToastProvider } from "react-native-toast-notifications";
import "../global.css";
import AuthContextProvider from "./../context/auth";

import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { useFonts } from "expo-font";
import { ActivityIndicator } from "react-native";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    console.log("fonts not loaded");
    return <ActivityIndicator style={{ flex: 1 }} />;
  }

  return (
    <ToastProvider>
      <AuthContextProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </AuthContextProvider>
    </ToastProvider>
  );
}
