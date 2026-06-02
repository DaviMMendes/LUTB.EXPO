import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { useAuthStore } from '../src/store/authStore';
import { useCategoriasStore } from '../src/store/categoriasStore';
import { useProdutosStore } from '../src/store/produtosStore';

export default function RootLayout() {
  const inicializar = useAuthStore((state) => state.inicializar);
  const carregarProdutos = useProdutosStore((state) => state.carregarProdutos);
  const carregarCategorias = useCategoriasStore((state) => state.carregarCategorias);

  useEffect(() => {
    inicializar();
    carregarCategorias().then(() => carregarProdutos());
  }, []);

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#2c1f14' },
        headerTintColor: '#f0e6d3',
        headerTitleStyle: { fontWeight: '700' },
        contentStyle: { backgroundColor: '#f5f1eb' },
      }}
    >
      <Stack.Screen name="index" options={{ title: 'LUTB' }} />
      <Stack.Screen name="catalogo" options={{ title: 'Catálogo' }} />
      <Stack.Screen name="categorias" options={{ title: 'Categorias' }} />
      <Stack.Screen name="sobre" options={{ title: 'Sobre' }} />
      <Stack.Screen name="login" options={{ title: 'Login' }} />
      <Stack.Screen name="signup" options={{ title: 'Cadastro' }} />
      <Stack.Screen name="perfil" options={{ title: 'Perfil' }} />
      <Stack.Screen name="produto/[id]" options={{ title: 'Produto' }} />
      <Stack.Screen name="admin/produtos" options={{ title: 'Administração' }} />
      <Stack.Screen name="equipe/davi" options={{ title: 'Davi' }} />
      <Stack.Screen name="equipe/artur" options={{ title: 'Artur' }} />
      <Stack.Screen name="equipe/luiz" options={{ title: 'Luiz' }} />
    </Stack>
  );
}