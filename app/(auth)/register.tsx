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
import { useRouter } from "expo-router";

const schema = z
  .object({
    email: z.string().email(),
    password: z.string(),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

type TForm = z.infer<typeof schema>;

export default function Register() {
  const { register } = useUserContext();
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
      await register(values.email, values.confirm_password);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <ThemedView safe className=" justify-center items-center">
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
        className=" border border-white"
      >
        <View className=" flex-1 justify-center items-center gap-5 w-10/12">
          <ThemedLogo />
          <ThemedText as="title">Register an account.</ThemedText>

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
          <ControlledInput
            error={errors}
            control={control}
            name="confirm_password"
            textInputProps={{
              placeholder: "Confirm Password",
              secureTextEntry: true,
            }}
          />

          <ThemedButton onPress={handleSubmit(submitHandler)}>
            Register
          </ThemedButton>
          <ThemedLink href="/login">Login instead</ThemedLink>
          {error !== null && <ErrorMessage message={error} />}
        </View>
      </TouchableWithoutFeedback>
    </ThemedView>
  );
}
