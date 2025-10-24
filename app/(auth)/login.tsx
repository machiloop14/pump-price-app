import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Login = () => {
  return (
    <SafeAreaView className="flex flex-1 items-center justify-center gap-10 px-4">
      <View>
        <Image
          source={require("../../assets/images/avatar.jpg")}
          className="w-56 h-56 rounded-full"
          resizeMode="cover"
        />
      </View>
      <View className="flex gap-4">
        <Text className="font-bold text-4xl text-center">Welcome Back</Text>
        <Text className="text-center text-xl text-gray-500">
          Sign in to continue to Fuel Finder
        </Text>
      </View>
      <Pressable className="w-full">
        <View className="rounded-lg overflow-hidden">
          <LinearGradient
            colors={["#FF6B6B", "#FFD166"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }} // 135° direction equivalent
            className="px-8 py-6 flex items-center flex-row justify-center gap-4" // padding = border thickness
          >
            <MaterialCommunityIcons name="google" size={26} color="white" />
            <Text className="text-white font-bold text-xl">
              Sign in with Google
            </Text>
          </LinearGradient>
        </View>
      </Pressable>
    </SafeAreaView>
  );
};

export default Login;
