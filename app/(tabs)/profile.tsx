import SettingsCard from "@/components/settingsCard";
import { useAuth } from "@/context/auth";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Alert, Image, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

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
          <View className="flex gap-2">
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
          <View className="flex gap-6">
            <Text className="font-bold text-2xl">Preferences</Text>
            <View className="flex gap-2">
              <SettingsCard
                label="Notifications"
                isIcon={true}
                isOption={false}
                iconName="toggle-on"
                iconSize={40}
                iconColor="blue"
              />

              <SettingsCard
                label="Distance Units"
                isIcon={true}
                isOption={true}
                iconName="keyboard-arrow-right"
                iconSize={32}
                iconColor="gray"
                option="Miles"
              />

              <SettingsCard
                label="Privacy Settings"
                isIcon={true}
                isOption={false}
                iconName="keyboard-arrow-right"
                iconSize={32}
                iconColor="gray"
              />
            </View>
          </View>
          <View className="flex gap-6">
            <Text className="font-bold text-2xl">About</Text>
            <View className="flex gap-2">
              <SettingsCard
                label="App Version"
                isIcon={false}
                isOption={true}
                option="1.2.3"
              />

              <SettingsCard
                label="Terms of Service"
                isIcon={true}
                isOption={false}
                iconName="keyboard-arrow-right"
                iconSize={32}
                iconColor="gray"
              />

              <SettingsCard
                label="Privacy Policy"
                isIcon={true}
                isOption={false}
                iconName="keyboard-arrow-right"
                iconSize={32}
                iconColor="gray"
              />
            </View>
          </View>
        </View>
        <Pressable
          className="flex flex-row gap-3 items-center justify-center mt-5"
          onPress={handleLogout}
        >
          <MaterialIcons name="logout" color="#0000F0" size={20} />
          <Text className="text-lg">Sign out</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
