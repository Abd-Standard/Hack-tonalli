import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from "react-native";
import { router } from "expo-router";
import { useAuthStore } from "../../src/store/authStore";
import { COLORS } from "../../src/constants/colors";

export default function LoginScreen() {
  const [email, setEmail] = useState("demo@tonalli.xyz");
  const [password, setPassword] = useState("demo1234");
  const { login, isLoading } = useAuthStore();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Por favor ingresa tu email y contraseña");
      return;
    }
    try {
      await login(email, password);
      router.replace("/(tabs)");
    } catch {
      Alert.alert("Error", "Credenciales incorrectas. Intenta de nuevo.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logo}>🌅</Text>
          <Text style={styles.brand}>Tonalli</Text>
          <Text style={styles.tagline}>Aprende Web3. Gana XLM.</Text>
        </View>

        {/* Character greeting */}
        <View style={styles.charContainer}>
          <Text style={styles.charEmoji}>🎺</Text>
          <View style={styles.bubble}>
            <Text style={styles.bubbleText}>
              ¡Bienvenido de vuelta! Chima aquí. Lista para guiarte en tu aventura Web3. 🚀
            </Text>
          </View>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <Text style={styles.formTitle}>Iniciar Sesión</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>📧 Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor={COLORS.textMuted}
              placeholder="tu@email.com"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>🔑 Contraseña</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholderTextColor={COLORS.textMuted}
              placeholder="••••••••"
            />
          </View>

          <TouchableOpacity
            style={[styles.loginBtn, isLoading && styles.loginBtnDisabled]}
            onPress={handleLogin}
            disabled={isLoading}
            activeOpacity={0.8}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.loginBtnText}>Entrar 🚀</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.demoBtn}
            onPress={handleLogin}
            activeOpacity={0.7}
          >
            <Text style={styles.demoBtnText}>Probar demo →</Text>
          </TouchableOpacity>
        </View>

        {/* Register link */}
        <View style={styles.registerRow}>
          <Text style={styles.registerText}>¿Nuevo en Tonalli? </Text>
          <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
            <Text style={styles.registerLink}>Crear cuenta</Text>
          </TouchableOpacity>
        </View>

        {/* Blockchain badge */}
        <View style={styles.stellarBadge}>
          <Text style={styles.stellarText}>⭐ Powered by Stellar Blockchain</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scroll: { flexGrow: 1, paddingHorizontal: 24, paddingTop: 60, paddingBottom: 40 },
  header: { alignItems: "center", marginBottom: 32 },
  logo: { fontSize: 64 },
  brand: {
    fontSize: 42,
    fontWeight: "800",
    color: COLORS.primary,
    letterSpacing: -1,
    marginTop: 8,
  },
  tagline: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  charContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 32,
    gap: 12,
  },
  charEmoji: { fontSize: 48, marginTop: 4 },
  bubble: {
    flex: 1,
    backgroundColor: COLORS.card,
    borderRadius: 16,
    borderTopLeftRadius: 4,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.primary + "30",
  },
  bubbleText: { color: COLORS.text, fontSize: 14, lineHeight: 20 },
  form: {
    backgroundColor: COLORS.card,
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  formTitle: {
    color: COLORS.text,
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 20,
    textAlign: "center",
  },
  inputGroup: { marginBottom: 16 },
  label: { color: COLORS.textSecondary, fontSize: 13, fontWeight: "600", marginBottom: 8 },
  input: {
    backgroundColor: COLORS.background,
    borderRadius: 12,
    padding: 14,
    color: COLORS.text,
    fontSize: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  loginBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    padding: 16,
    alignItems: "center",
    marginTop: 8,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  loginBtnDisabled: { opacity: 0.6 },
  loginBtnText: { color: "#fff", fontSize: 17, fontWeight: "800" },
  demoBtn: { alignItems: "center", marginTop: 12 },
  demoBtnText: { color: COLORS.primary, fontSize: 14, fontWeight: "600" },
  registerRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 24,
  },
  registerText: { color: COLORS.textSecondary, fontSize: 14 },
  registerLink: { color: COLORS.primary, fontSize: 14, fontWeight: "700" },
  stellarBadge: {
    alignItems: "center",
    backgroundColor: COLORS.card,
    borderRadius: 99,
    paddingVertical: 8,
    paddingHorizontal: 20,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  stellarText: { color: COLORS.textSecondary, fontSize: 12, fontWeight: "600" },
});
