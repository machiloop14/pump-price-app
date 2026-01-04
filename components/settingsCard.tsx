import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";

interface ProfilePageProps {
  label: string;
  isOption: boolean;
  isIcon: boolean;
  iconName?: keyof typeof MaterialIcons.glyphMap;
  iconColor?: string;
  iconSize?: number;
  option?: string;
  onHandlePress?: () => void;
}

const SettingsCard = ({
  label,
  isOption,
  isIcon,
  iconName,
  iconColor,
  iconSize,
  option,
  onHandlePress,
}: ProfilePageProps) => {
  return (
    <View className="flex flex-row items-center justify-between bg-white rounded-lg h-16 px-2">
      <Text className="font-poppins">{label}</Text>
      <Pressable
        className="flex flex-row gap-2 items-center"
        onPress={onHandlePress}
      >
        {isOption && (
          <Text className="text-lg text-gray-600 font-poppins">{option}</Text>
        )}
        {isIcon && (
          <MaterialIcons name={iconName} color={iconColor} size={iconSize} />
        )}
      </Pressable>
    </View>
  );
};

export default SettingsCard;
