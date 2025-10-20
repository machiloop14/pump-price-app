import React from "react";
import { KeyboardTypeOptions, TextInput, View } from "react-native";

interface formInputProps {
  formClass: string;
  placeholder: string;
  keyboard: KeyboardTypeOptions;
}

const FormInput = ({ formClass, placeholder, keyboard }: formInputProps) => {
  return (
    <View className="">
      <TextInput
        className={formClass}
        placeholder={placeholder}
        keyboardType={keyboard}
      />
    </View>
  );
};

export default FormInput;
