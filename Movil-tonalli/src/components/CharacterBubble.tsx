import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../constants/colors";

interface CharacterBubbleProps {
  character?: "chima" | "alli" | "xollo";
  message: string;
  size?: "sm" | "md" | "lg";
}

const CHARACTERS = {
  chima: { emoji: "🎺", name: "Chima", color: COLORS.primary },
  alli: { emoji: "🎸", name: "Alli", color: COLORS.accent },
  xollo: { emoji: "🐕", name: "Xollo", color: COLORS.success },
};

export default function CharacterBubble({
  character = "chima",
  message,
  size = "md",
}: CharacterBubbleProps) {
  const char = CHARACTERS[character];
  const emojiSize = size === "sm" ? 36 : size === "lg" ? 56 : 48;

  return (
    <View style={styles.container}>
      <View style={[styles.avatar, { width: emojiSize + 8, height: emojiSize + 8, borderColor: char.color }]}>
        <Text style={{ fontSize: emojiSize * 0.7 }}>{char.emoji}</Text>
      </View>
      <View style={[styles.bubble, { borderColor: char.color + "40" }]}>
        <Text style={styles.name}>{char.name}</Text>
        <Text style={styles.message}>{message}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  avatar: {
    borderRadius: 999,
    borderWidth: 2,
    backgroundColor: COLORS.card,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  bubble: {
    flex: 1,
    backgroundColor: COLORS.card,
    borderRadius: 16,
    borderWidth: 1,
    padding: 12,
    borderTopLeftRadius: 4,
  },
  name: {
    color: COLORS.primary,
    fontWeight: "700",
    fontSize: 12,
    marginBottom: 4,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  message: {
    color: COLORS.text,
    fontSize: 14,
    lineHeight: 20,
  },
});
