import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { COLORS } from "../constants/colors";

interface XPBarProps {
  current: number;
  max: number;
  level: number;
  showLabel?: boolean;
}

export default function XPBar({ current, max, level, showLabel = true }: XPBarProps) {
  const progress = useRef(new Animated.Value(0)).current;
  const percent = Math.min(current / max, 1);

  useEffect(() => {
    Animated.timing(progress, {
      toValue: percent,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [percent]);

  const width = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={styles.container}>
      {showLabel && (
        <View style={styles.labelRow}>
          <View style={styles.levelBadge}>
            <Text style={styles.levelText}>Lv {level}</Text>
          </View>
          <Text style={styles.xpText}>
            {current.toLocaleString()} / {max.toLocaleString()} XP
          </Text>
        </View>
      )}
      <View style={styles.track}>
        <Animated.View style={[styles.fill, { width }]}>
          <View style={styles.shine} />
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 8 },
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  levelBadge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 99,
  },
  levelText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },
  xpText: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: "600",
  },
  track: {
    height: 12,
    backgroundColor: COLORS.border,
    borderRadius: 99,
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    backgroundColor: COLORS.primary,
    borderRadius: 99,
    overflow: "hidden",
  },
  shine: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "50%",
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 99,
  },
});
