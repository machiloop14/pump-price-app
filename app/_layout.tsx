import { Stack } from "expo-router";
import { ToastProvider } from "react-native-toast-notifications";
import "../global.css";
import AuthContextProvider from "./../context/auth";

export default function RootLayout() {
  return (
    <ToastProvider>
      <AuthContextProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </AuthContextProvider>
    </ToastProvider>
  );
}
