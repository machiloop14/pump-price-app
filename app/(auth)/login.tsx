import FormInput from "@/components/formInput";
import { auth } from "@/firebaseConfig";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Alert, Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Login = () => {
  const [loginEmail, setLoginEmail] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");

  const router = useRouter();

  const handleLoginEmail = (email: string) => {
    setLoginEmail(email);
  };
  const handleLoginPassword = (password: string) => {
    setLoginPassword(password);
  };

  const handleLogin = async () => {
    if (!loginEmail || !loginPassword) {
      Alert.alert("Missing Field(s)", "All fields are required");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      userCredential.user &&
        console.log("sign in successful", userCredential.user);

      userCredential.user && router.replace("/(tabs)/home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView className="flex flex-1 items-center  gap-10 px-4 bg-white pt-12">
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
            passwordField={true}
          />
        </View>
      </View>
      <View className="w-11/12 mx-auto">
        <Pressable
          className="bg-[#138AEC] py-4 rounded-lg"
          onPress={handleLogin}
        >
          <Text className="text-center text-white">Log In</Text>
        </Pressable>
        <Pressable
          onPress={() => router.push("/signup")}
          className="flex flex-row gap-2 justify-center mt-2"
        >
          <Text className="text-center">Don't have an account?</Text>
          <Text className="text-center text-[#138AEC]">Sign up</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Login;
