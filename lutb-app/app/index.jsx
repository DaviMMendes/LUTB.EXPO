import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";

export default function Home() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require("../assets/images/logo-lutb.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>LUTB</Text>

      <Text style={styles.subtitle}>
        App mobile da loja LUTB, desenvolvido com React Native, Expo Router,
        Zustand e Supabase.
      </Text>

      <View style={styles.menu}>
        <Link href="/catalogo" asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Ver catálogo</Text>
          </Pressable>
        </Link>

        <Link href="/login" asChild>
          <Pressable style={styles.buttonSecondary}>
            <Text style={styles.buttonSecondaryText}>Login</Text>
          </Pressable>
        </Link>

        <Link href="/sobre" asChild>
          <Pressable style={styles.buttonSecondary}>
            <Text style={styles.buttonSecondaryText}>Sobre o app</Text>
          </Pressable>
        </Link>

        <Link href="/equipe/davi" asChild>
          <Pressable style={styles.buttonSecondary}>
            <Text style={styles.buttonSecondaryText}>Minha tela da equipe</Text>
          </Pressable>
        </Link>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    alignItems: "center",
    backgroundColor: "#FFF8F0",
  },
  logo: {
    width: 180,
    height: 120,
    marginTop: 32,
    marginBottom: 12,
  },
  title: {
    fontSize: 34,
    fontWeight: "800",
    color: "#3A2A1A",
  },
  subtitle: {
    marginTop: 12,
    fontSize: 16,
    lineHeight: 24,
    color: "#6B4E3D",
    textAlign: "center",
  },
  menu: {
    width: "100%",
    marginTop: 32,
    gap: 12,
  },
  button: {
    backgroundColor: "#8B5E3C",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  buttonSecondary: {
    borderWidth: 1,
    borderColor: "#8B5E3C",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  buttonSecondaryText: {
    color: "#8B5E3C",
    fontSize: 16,
    fontWeight: "700",
  },
});