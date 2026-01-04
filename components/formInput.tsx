import React, { useState } from "react";
import { KeyboardTypeOptions, TextInput, View } from "react-native";

interface formInputProps {
  formClass: string;
  placeholder: string;
  keyboard: KeyboardTypeOptions;
  handleFormInput: (a: string) => void;
  passwordField?: boolean;
}

const FormInput = ({
  formClass,
  placeholder,
  keyboard,
  handleFormInput,
  passwordField = false,
}: formInputProps) => {
  const [input, setInput] = useState<string>("");
  console.log(passwordField);

  const handleTextChange = (text: string) => {
    setInput(text);
    handleFormInput(text);
    // console.log(input);
  };

  return (
    <View className="">
      <TextInput
        value={input}
        className={formClass}
        placeholder={placeholder}
        keyboardType={keyboard}
        onChangeText={handleTextChange}
        secureTextEntry={passwordField}
        textContentType={passwordField ? "password" : "none"}
      />
    </View>
  );
};

export default FormInput;
