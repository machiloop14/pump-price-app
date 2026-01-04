import SettingsCard from "@/components/settingsCard";
import { useAuth } from "@/context/auth";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Image, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  const [toggleNotification, setToggleNotification] = useState(true);

  const handleLogout = () => {
    Alert.alert("Sign out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Sign out",
        style: "destructive",
        onPress: async () => {
          try {
            await logout();
            router.replace("/(auth)");
          } catch (err) {
            console.error(err);
          }
        },
      },
    ]);
  };

  return (
    <SafeAreaView className="px-4 bg-[#F6F7F8]">
      <ScrollView>
        <View className="flex gap-8">
          {user ? (
            <View className="flex gap-4">
              <Text className="font-bold text-2xl">Account</Text>
              <View className="flex flex-row gap-4 items-center">
                <View className="w-16 h-16">
                  <Image
                    source={require("../../assets/images/person.png")}
                    className="w-full h-full rounded-full"
                  />
                </View>
                <View>
                  <Text className="text-lg font-medium">
                    {user?.email?.split("@")[0]}
                  </Text>
                  {user && <Text className="text-[#605F68]">{user.email}</Text>}
                </View>
              </View>
            </View>
          ) : (
            <View className="-mt-6"></View>
          )}

          <View className="flex gap-4">
            <Text className=" text-2xl font-poppins-semibold">Preferences</Text>
            <View className="flex gap-2">
              <SettingsCard
                label="Notifications"
                isIcon={true}
                isOption={false}
                iconName={toggleNotification ? "toggle-on" : "toggle-off"}
                iconSize={40}
                iconColor={toggleNotification ? "blue" : "gray"}
                onHandlePress={() => setToggleNotification(!toggleNotification)}
              />

              <SettingsCard
                label="Distance Units"
                isIcon={true}
                isOption={true}
                iconName="keyboard-arrow-right"
                iconSize={32}
                iconColor="gray"
                option="Km"
              />

              {/* <SettingsCard
                label="Privacy Settings"
                isIcon={true}
                isOption={false}
                iconName="keyboard-arrow-right"
                iconSize={32}
                iconColor="gray"
              /> */}
            </View>
          </View>
          <View className="flex gap-4">
            <Text className="text-2xl font-poppins-semibold">About</Text>
            <View className="flex gap-2">
              <SettingsCard
                label="App Version"
                isIcon={false}
                isOption={true}
                option="1.0.0"
              />

              <SettingsCard
                label="Terms of Service"
                isIcon={true}
                isOption={false}
                iconName="keyboard-arrow-right"
                iconSize={32}
                iconColor="gray"
                onHandlePress={() =>
                  Alert.alert(
                    "Terms of Service",
                    "This application is provided for informational purposes only. Users are responsible for ensuring that any fuel price information they submit is accurate to the best of their knowledge. By using this app, you agree not to submit false or misleading data or misuse the platform. The app does not guarantee the accuracy of crowdsourced information and is not responsible for decisions made based on displayed prices. Continued use of the application indicates acceptance of these terms",
                    [{ text: "Ok", style: "cancel" }]
                  )
                }
              />

              <SettingsCard
                label="Privacy Policy"
                isIcon={true}
                isOption={false}
                iconName="keyboard-arrow-right"
                iconSize={32}
                iconColor="gray"
                onHandlePress={() =>
                  Alert.alert(
                    "Privacy Policy",
                    "This app collects basic account information such as your email address for authentication purposes. Fuel price reports you submit, including price, fuel type, location, and time, are stored to support comparison and trend analysis. Your personal information is not shared with third parties. All data is securely managed using Firebase services. By using this app, you agree to this privacy policy.",
                    [{ text: "Ok", style: "cancel" }]
                  )
                }
              />
            </View>
          </View>
        </View>
        {user ? (
          <Pressable
            className="flex flex-row gap-3 items-center justify-center mt-5"
            onPress={handleLogout}
          >
            <MaterialIcons name="logout" color="#0000F0" size={20} />
            <Text className="text-lg font-poppins">Sign out</Text>
          </Pressable>
        ) : (
          <Pressable
            className="flex flex-row gap-3 items-center justify-center mt-5"
            onPress={() => router.push("/(auth)/login")}
          >
            <MaterialIcons name="logout" color="#0000F0" size={20} />
            <Text className="text-lg font-poppins">Sign In</Text>
          </Pressable>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
