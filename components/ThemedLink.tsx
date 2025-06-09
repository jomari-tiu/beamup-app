import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";

type Props = {
  href: string;
  children: string;
};

export default function ThemedLink({ href, children }: Props) {
  return (
    <Link
      className=" pb-1 text-text border-b border-text font-bold"
      href={href}
    >
      {children}
    </Link>
  );
}

const styles = StyleSheet.create({});
