import { Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView>
      <View className="flex gap-10 items-center justify-center w-10/12 mx-auto">
        <View className="h-96 w-full">
          <Image
            source={require("../assets/images/welcome.png")}
            className="w-full h-full"
            resizeMode="stretch"
          />
        </View>
        <View className="flex items-center">
          <Text className="font-bold text-3xl">Compare Petrol Prices</Text>
          <Text className="text-xl text-center mt-2 text-[#111518/80]">
            Find the best petrol prices near you and submit new prices
          </Text>
        </View>
        <View className="flex gap-4 w-full">
          <Pressable className="bg-[#138AEC] py-4 rounded-lg">
            <Text className="text-center text-white font-bold">Log In</Text>
          </Pressable>
          <Pressable className="bg-[#111518] py-4 rounded-lg">
            <Text className="text-center text-white font-bold">Sign Up</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
