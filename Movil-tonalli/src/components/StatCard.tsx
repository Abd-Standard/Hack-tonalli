import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../constants/colors";

interface StatCardProps {
  emoji: string;
  label: string;
  value: string | number;
  color?: string;
}

export default function StatCard({ emoji, label, value, color = COLORS.primary }: StatCardProps) {
  return (
    <View style={[styles.card, { borderColor: color + "30" }]}>
      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={[styles.value, { color }]}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    gap: 4,
  },
  emoji: { fontSize: 24 },
  value: {
    fontSize: 20,
    fontWeight: "800",
  },
  label: {
    color: COLORS.textSecondary,
    fontSize: 11,
    textAlign: "center",
    fontWeight: "500",
  },
});
