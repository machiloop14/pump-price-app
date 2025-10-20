import React, { useState } from "react";
import { KeyboardTypeOptions, TextInput, View } from "react-native";

interface formInputProps {
  formClass: string;
  placeholder: string;
  keyboard: KeyboardTypeOptions;
  handleFormInput: (a: string) => void;
}

const FormInput = ({
  formClass,
  placeholder,
  keyboard,
  handleFormInput,
}: formInputProps) => {
  const [input, setInput] = useState<string>("");

  const handleTextChange = (text: string) => {
    setInput(text);
    handleFormInput(text);
    // console.log(input);
  };

  return (
    <View className="">
      <TextInput
        className={formClass}
        placeholder={placeholder}
        keyboardType={keyboard}
        onChangeText={handleTextChange}
      />
    </View>
  );
};

export default FormInput;
