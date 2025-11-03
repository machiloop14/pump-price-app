import FormInput from "@/components/formInput";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Login = () => {
  const [loginEmail, setLoginEmail] = useState<string>();
  const [loginPassword, setLoginPassword] = useState<string>();
  const [loginConfirmPassword, setLoginConfirmPassword] = useState<string>();

  const router = useRouter();

  const handleLoginEmail = (email: string) => {
    setLoginEmail(email);
  };
  const handleLoginPassword = (password: string) => {
    setLoginPassword(password);
  };
  const handleLoginConfirmPassword = (password: string) => {
    setLoginConfirmPassword(password);
  };

  return (
    <SafeAreaView className="flex flex-1 items-center  gap-10 px-4 bg-white pt-10">
      <View>
        <Image
          source={require("../../assets/images/avatar.jpg")}
          className="w-56 h-56 rounded-full"
          resizeMode="cover"
        />
      </View>
      <View className="flex gap-4">
        <Text className="font-bold text-4xl text-center">Welcome</Text>
        <Text className="text-center text-xl text-gray-500">
          Sign up to continue to Fuel Finder
        </Text>
      </View>
      <View className=" w-11/12 flex gap-4">
        <View className="mb-2 flex gap-2">
          <Text className="font-bold">Email</Text>
          <FormInput
            formClass="bg-white rounded-md bg-[#E5E7EB] py-4 px-2"
            placeholder="Enter your email address"
            keyboard="default"
            handleFormInput={handleLoginEmail}
          />
        </View>
        <View className="mb-2 flex gap-2">
          <Text className="font-bold">Password</Text>
          <FormInput
            formClass="bg-white rounded-md bg-[#E5E7EB] py-4 px-2"
            placeholder="Enter your password"
            keyboard="default"
            handleFormInput={handleLoginPassword}
          />
        </View>
        <View className="mb-2 flex gap-2">
          <Text className="font-bold">Confirm Password</Text>
          <FormInput
            formClass="bg-white rounded-md bg-[#E5E7EB] py-4 px-2"
            placeholder="Confirm your password"
            keyboard="default"
            handleFormInput={handleLoginConfirmPassword}
          />
        </View>
      </View>
      <View className="w-11/12 mx-auto">
        <Pressable
          className="bg-[#138AEC] py-4 rounded-lg"
          onPress={() => {
            console.log(loginEmail);
            console.log(loginPassword);
            console.log(loginConfirmPassword);
          }}
        >
          <Text className="text-center text-white">Sign Up</Text>
        </Pressable>
        <Pressable
          onPress={() => router.push("/login")}
          className="flex flex-row gap-2 justify-center mt-2"
        >
          <Text className="text-center">Already have an account?</Text>
          <Text className="text-center text-[#138AEC]">Sign In</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Login;
