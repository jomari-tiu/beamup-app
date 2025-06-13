import {
  Keyboard,
  Pressable,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useState } from "react";
import ThemedView from "../../components/ThemedView";
import ThemedText from "../../components/ThemedText";
import ThemedButton from "../../components/ThemedButton";
import ThemedLink from "../../components/ThemedLink";
import ThemedLogo from "../../components/ThemedLogo";
import ThemedTextInput from "../../components/ThemedTextInput";
import ControlledInput from "../../components/ControlledInput";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUserContext } from "../../context/user-context/context-user";
import ErrorMessage from "../../components/ErrorMessage";

const schema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type TForm = z.infer<typeof schema>;

export default function Login() {
  const { login } = useUserContext();
  const [error, setError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const submitHandler = async (values: TForm) => {
    setError(null);
    try {
      await login(values.email, values.password);
    } catch (error: any) {
      console.log("errorrrr", error);
      setError(error.message);
    }
  };

  return (
    <ThemedView safe className=" justify-center items-center">
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
        className=" border border-white"
      >
        <View className=" flex-1 justify-center items-center gap-5 w-11/12">
          <ThemedLogo />
          <ThemedText as="title">Login your account.</ThemedText>

          <ControlledInput
            error={errors}
            control={control}
            name="email"
            textInputProps={{
              placeholder: "Email",
              keyboardType: "email-address",
            }}
          />

          <ControlledInput
            error={errors}
            control={control}
            name="password"
            textInputProps={{
              placeholder: "Password",
              secureTextEntry: true,
            }}
          />

          <ThemedButton onPress={handleSubmit(submitHandler)}>
            Login
          </ThemedButton>
          <ThemedLink href="/register">Register instead</ThemedLink>
          {error !== null && <ErrorMessage message={error} />}
        </View>
      </TouchableWithoutFeedback>
    </ThemedView>
  );
}
