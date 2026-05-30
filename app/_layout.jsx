import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#F7EDE2",
        },
        headerTintColor: "#3A2A1A",
        headerTitleStyle: {
          fontWeight: "700",
        },
        contentStyle: {
          backgroundColor: "#FFF8F0",
        },
      }}
    >
      <Stack.Screen name="index" options={{ title: "LUTB" }} />
      <Stack.Screen name="catalogo" options={{ title: "Catálogo" }} />
      <Stack.Screen name="sobre" options={{ title: "Sobre" }} />
      <Stack.Screen name="login" options={{ title: "Login" }} />
      <Stack.Screen name="signup" options={{ title: "Cadastro" }} />
      <Stack.Screen name="perfil" options={{ title: "Perfil" }} />
      <Stack.Screen name="produto/[id]" options={{ title: "Produto" }} />
      <Stack.Screen name="admin/produtos" options={{ title: "Admin Produtos" }} />
      <Stack.Screen name="equipe/davi" options={{ title: "Davi" }} />
      <Stack.Screen name="equipe/integrante2" options={{ title: "Integrante 2" }} />
      <Stack.Screen name="equipe/integrante3" options={{ title: "Integrante 3" }} />
    </Stack>
  );
}