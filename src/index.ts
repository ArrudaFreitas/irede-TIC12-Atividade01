import { Category } from "./models/category.model";
import { Product } from "./models/product.model";
import { User, Role } from "./models/user.model";
import { Cart } from "./models/cart.model";

console.log("=== TESTANDO CATEGORIAS ===");

const categoryEletronicos: Category = { id: 1, name: "Eletrônicos" };
const categoryRoupas: Category = { id: 2, name: "Roupas" };

console.log("Categoria criada:", categoryEletronicos);
console.log("Categoria criada:", categoryRoupas);

console.log("\n=== TESTANDO PRODUTOS ===");

const productNotebook: Product = {
  id: 1,
  name: "Notebook Dell",
  price: 3500.0,
  category: categoryEletronicos,
};

const productCelular: Product = {
  id: 2,
  name: "Celular Samsung",
  price: 1200.0,
  category: categoryEletronicos,
};

const productCamiseta: Product = {
  id: 3,
  name: "Camiseta Nike",
  price: 89.9,
  category: categoryRoupas,
};

console.log("Produto criado:", productNotebook);
console.log("Produto criado:", productCelular);
console.log("Produto criado:", productCamiseta);

console.log("\n=== TESTANDO USUÁRIOS E PAPÉIS ===");

const adminUser = new User(1, "irede", "irede@email.com", Role.ADMIN);
const customerUser = new User(2, "joao", "joao@email.com", Role.CUSTOMER);

console.log("Usuário ADMIN criado:", adminUser);
console.log("Usuário CUSTOMER criado:", customerUser);
console.log("Role do admin:", adminUser.role);
console.log("Role do customer:", customerUser.role);

// Tentativa de role inválida erro em tempo de compilação
//const usuarioInvalido = new User(3, "hacker", "x@x.com", Role.MODERATOR);

console.log("\n=== TESTANDO CARRINHO ===");

const cart = new Cart([]);

console.log("Carrinho criado (vazio):", cart.listProduct);
console.log("Total de itens:", cart.getTotalItems());
console.log("Preço final: R$", cart.getFinalPrice().toFixed(2));

console.log("\n--- Adicionando itens ---");

cart.addItem(productNotebook, 1);
console.log("Adicionado: Notebook Dell x1");
console.log("Itens no carrinho:", cart.listProduct);

cart.addItem(productCelular, 2);
console.log("Adicionado: Celular Samsung x2");

cart.addItem(productCamiseta, 3);
console.log("Adicionado: Camiseta Nike x3");

console.log("\n--- Estado do carrinho após adições ---");
console.log("Total de unidades:", cart.getTotalItems()); // 1 + 2 + 3 = 6
console.log("Preço final: R$", cart.getFinalPrice().toFixed(2)); // 3500 + 2400 + 269.70 = 6169.70

console.log("\n--- Testando acúmulo de produto repetido (.some()) ---");

cart.addItem(productNotebook, 2);
console.log("Adicionado novamente: Notebook Dell x2 (deve acumular, não duplicar)");

console.log("Itens no carrinho (não deve ter Notebook duplicado):");
cart.listProduct.forEach((item) => {
  console.log(
    `  - ${item.product.name} | quantidade: ${item.quantity} | subtotal: R$ ${(item.product.price * item.quantity).toFixed(2)}`
  );
});

console.log("\nTotal de unidades após acúmulo:", cart.getTotalItems()); // 3 + 2 + 3 = 8
console.log("Preço final atualizado: R$", cart.getFinalPrice().toFixed(2)); // 3500*3 + 1200*2 + 89.90*3

console.log("\n=== TODOS OS TESTES CONCLUÍDOS SEM ERROS ===");