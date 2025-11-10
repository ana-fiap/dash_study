import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useCallback, useEffect, useState } from "react";
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

type UserProfile = {
  name: string;
  email: string;
  curso?: string;
  turma?: string;
};

const KEY = "@studydash:user";
const EMPTY: UserProfile = { name: "", email: "", curso: "", turma: "" };

export default function Perfil() {
  const [user, setUser] = useState<UserProfile>(EMPTY);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const json = await AsyncStorage.getItem(KEY);
        const parsed = json ? JSON.parse(json) : null;
        setUser(parsed ?? { name: "Ana", email: "ana@example.com", curso: "ADS / UBA XXI", turma: "2025.1" });
      } catch {
        Alert.alert("Aviso", "Não foi possível carregar o perfil.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const saveProfile = useCallback(async () => {
    try {
      await AsyncStorage.setItem(KEY, JSON.stringify(user));
      Alert.alert("Pronto", "Perfil salvo com sucesso.");
    } catch {
      Alert.alert("Erro", "Não foi possível salvar o perfil.");
    }
  }, [user]);

  if (loading) return null;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Perfil do Usuário</Text>

      <Label>Nome</Label>
      <Input value={user.name} onChangeText={(t: string) => setUser((u) => ({ ...u, name: t }))} placeholder="Seu nome" />

      <Label>E-mail</Label>
      <Input
        value={user.email}
        onChangeText={(t: string) => setUser((u) => ({ ...u, email: t }))}
        placeholder="email@exemplo.com"
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <Label>Curso</Label>
      <Input value={user.curso} onChangeText={(t: string) => setUser((u) => ({ ...u, curso: t }))} placeholder="Ex.: ADS / UBA XXI" />

      <Label>Turma</Label>
      <Input value={user.turma} onChangeText={(t: string) => setUser((u) => ({ ...u, turma: t }))} placeholder="Ex.: 2025.1" />

      <Pressable style={styles.button} onPress={saveProfile}>
        <Text style={styles.buttonText}>Salvar</Text>
      </Pressable>

      {/* 🔻 Logo centralizado na parte inferior */}
      <View style={styles.logoBox}>
        <Image
          source={require("../assets/images/download.png")}
          style={styles.logo}
          resizeMode="contain"
          accessible
          accessibilityLabel="StudyDash logo"
        />
      </View>
    </ScrollView>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <Text style={styles.label}>{children}</Text>;
}
function Input(props: any) {
  return <TextInput {...props} style={styles.input} />;
}

const colors = {
  background: "#0B1E39",
  card: "#142D4C",
  primary: "#5AD4E2",
  secondary: "#7EE3F2",
  text: "#FFFFFF",
  subtext: "#94A3B8",
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 10,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 4,
    color: colors.text,
  },
  label: { fontSize: 13, color: colors.subtext, marginLeft: 4 },
  input: {
    borderWidth: 1,
    borderColor: "#1E3A5F",
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    backgroundColor: colors.card,
    color: colors.text,
  },
  button: {
    marginTop: 8,
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: { color: colors.background, fontWeight: "700", fontSize: 16 },

  // 🔻 Logo centralizado
  logoBox: {
    marginTop: 40,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 180,
    height: 80,
    opacity: 0.9,
  },
});
