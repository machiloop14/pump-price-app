import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  return (
    <SafeAreaView className="px-4 bg-[#F6F7F8]">
      <View>
        <View className="flex gap-8">
          <View className="flex gap-6">
            <Text className="font-bold text-2xl">Account</Text>
            <View className="flex flex-row gap-4 items-center">
              <View className="w-16 h-16">
                <Image
                  source={require("../../assets/images/person.png")}
                  className="w-full h-full rounded-full"
                />
              </View>
              <View>
                <Text className="text-lg font-medium">Jennifer Smith</Text>
                <Text className="text-[#605F68]">jennifer.smith@email.com</Text>
              </View>
            </View>
          </View>
          <View className="flex gap-6">
            <Text className="font-bold text-2xl">Preferences</Text>
            <View className="flex gap-2">
              <View className="flex flex-row items-center justify-between bg-white rounded-lg h-16 px-2">
                <Text>Notifications</Text>
                <Pressable className="flex flex-row gap-2 items-center">
                  <MaterialIcons name="toggle-on" color="blue" size={40} />
                </Pressable>
              </View>
              <View className="flex flex-row items-center justify-between bg-white h-16 rounded-lg px-2">
                <Text>Distance Units</Text>
                <Pressable className="flex flex-row gap-2 items-center">
                  <Text className="text-lg text-gray-600">Miles</Text>
                  <MaterialIcons
                    name="keyboard-arrow-right"
                    color="gray"
                    size={32}
                  />
                </Pressable>
              </View>
              <View className="flex flex-row items-center justify-between bg-white h-16 rounded-lg px-2">
                <Text>Distance Units</Text>
                <Pressable className="flex flex-row gap-2 items-center">
                  <MaterialIcons
                    name="keyboard-arrow-right"
                    color="gray"
                    size={32}
                  />
                </Pressable>
              </View>
            </View>
          </View>
          <View className="flex gap-6">
            <Text className="font-bold text-2xl">About</Text>
            <View className="flex gap-2">
              <View className="flex flex-row items-center justify-between bg-white h-16 rounded-lg px-2">
                <Text>App Version</Text>
                <Pressable className="flex flex-row gap-2 items-center">
                  <Text className="text-lg text-gray-600">1.2.3</Text>
                </Pressable>
              </View>
              <View className="flex flex-row items-center justify-between bg-white h-16 rounded-lg px-2">
                <Text>Terms of Service</Text>
                <Pressable className="flex flex-row gap-2 items-center">
                  <MaterialIcons
                    name="keyboard-arrow-right"
                    color="gray"
                    size={32}
                  />
                </Pressable>
              </View>
              <View className="flex flex-row items-center justify-between bg-white h-16 rounded-lg px-2">
                <Text>Privacy Policy</Text>
                <Pressable className="flex flex-row gap-2 items-center">
                  <MaterialIcons
                    name="keyboard-arrow-right"
                    color="gray"
                    size={32}
                  />
                </Pressable>
              </View>
            </View>
          </View>
        </View>
        <Pressable className="flex flex-row gap-3 items-center justify-center mt-5">
          <MaterialIcons name="logout" color="#0000F0" size={20} />
          <Text className="text-lg">Sign out</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
