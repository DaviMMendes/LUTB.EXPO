# LUTB Store - App Mobile

Aplicativo mobile da loja **LUTB**, desenvolvido em **React Native + Expo**, migrado a partir de um projeto antigo em **Next.js**.

O projeto usa **Expo Router** para navegação, **Zustand** para gerenciamento de estado global e possui estrutura preparada para integração futura com **Supabase**.

---

## Integrantes

| Nome | RA | Função principal |
|---|---:|---|
| Davi Magalhães Mendes | 852600 | Base Expo, rotas, Zustand, autenticação temporária e estrutura geral |
| Artur Lima Pinto Bacalhau | 852137 | Supabase, banco de dados, back-end, relacionamento e policies/RLS |
| Luiz Henrique Camello | 852839 | Visual, catálogo, telas da loja e estilização geral |

---

## Tecnologias utilizadas

- React Native
- Expo
- Expo Router
- JavaScript
- Zustand
- Supabase, planejado para a versão final
- GitHub Codespaces
- Git e GitHub

---

## Funcionalidades implementadas

- Home inicial da loja
- Tela Sobre com resumo técnico
- Tela individual para cada integrante
- Catálogo de produtos
- Tela de detalhes do produto
- Tela de categorias
- Exibição de relacionamento Produto/Categoria
- CRUD temporário de produtos
- Restauração dos produtos do mock
- Restauração das categorias do mock
- Login temporário
- Cadastro temporário
- Perfil do usuário
- Logout temporário
- Mock temporário do Supabase
- Estado global com Zustand

---

## Requisitos atendidos

| Requisito | Status |
|---|---|
| Expo Router | Implementado |
| Zustand | Implementado |
| Home | Implementado |
| Sobre | Implementado |
| Uma tela por integrante | Implementado |
| Interações com botões, formulários e filtros | Implementado |
| Conexão com back-end | Preparada via mock temporário |
| CRUD completo de uma entidade | Implementado em Produto |
| Exibição de mais uma entidade | Implementado em Categoria |
| Relacionamento entre entidades | Produto relacionado com Categoria |
| Login, logout e sign up | Implementado temporariamente com Zustand |
| Estilização profissional | Implementado |

---

## Entidades do projeto

### Produto

Entidade principal do app.

Campos principais:

- `id`
- `nome`
- `preco`
- `descricao`
- `imagem`
- `categoria`
- `categoriaId`

A entidade Produto possui CRUD temporário na tela administrativa.

---

### Categoria

Segunda entidade do app.

Campos principais:

- `id`
- `nome`
- `descricao`
- `destaque`

A categoria é usada para agrupar os produtos.

---

## Relacionamento Produto/Categoria

O relacionamento é feito pelo campo:

```js
produto.categoriaId
