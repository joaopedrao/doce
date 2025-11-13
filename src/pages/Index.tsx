import { useState } from "react";
import Header from "@/components/Header";
import ProductCard, { Product } from "@/components/ProductCard";
import Cart from "@/components/Cart";
import SuccessModal from "@/components/SuccessModal";
import { useToast } from "@/hooks/use-toast";

import pipocaDoceImg from "@/assets/pipoca-doce.jpg";
import pirulitoImg from "@/assets/pirulito.jpg";
import trufaImg from "@/assets/trufa.jpg";
import bombonsImg from "@/assets/bombons.jpg";

const products: Product[] = [
  {
    id: 1,
    name: "Pipoca Doce",
    price: 8.50,
    image: pipocaDoceImg,
    description: "Pipoca caramelizada crocante e deliciosa",
    category: "Pipocas",
  },
  {
    id: 2,
    name: "Pirulito Colorido",
    price: 3.50,
    image: pirulitoImg,
    description: "Pirulitos artesanais com sabores variados",
    category: "Pirulitos",
  },
  {
    id: 3,
    name: "Trufa Gourmet",
    price: 4.50,
    image: trufaImg,
    description: "Trufas de chocolate premium decoradas",
    category: "Trufas",
  },
  {
    id: 4,
    name: "Caixa de Bombons",
    price: 25.00,
    image: bombonsImg,
    description: "Seleção especial de bombons finos",
    category: "Bombons",
  },
];

interface CartItem {
  product: Product;
  quantity: number;
}

const Index = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const { toast } = useToast();

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.product.id === product.id);
      
      if (existingItem) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      return [...prev, { product, quantity: 1 }];
    });

    toast({
      title: "Adicionado ao carrinho! 🎉",
      description: `${product.name} foi adicionado com sucesso.`,
      duration: 2000,
    });
  };

  const handleRemoveFromCart = (productId: number) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.product.id === productId);
      
      if (existingItem && existingItem.quantity > 1) {
        return prev.map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
      
      return prev.filter((item) => item.product.id !== productId);
    });
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsSuccessModalOpen(true);
    setCartItems([]);
  };

  const getProductQuantity = (productId: number) => {
    return cartItems.find((item) => item.product.id === productId)?.quantity || 0;
  };

  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      <Header 
        cartItemsCount={totalCartItems}
        onCartClick={() => setIsCartOpen(true)}
      />

      <main className="container mx-auto px-4 py-8 md:py-12">
        {/* Hero Section */}
        <section className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-pink-bubblegum-dark via-sky-blue-dark to-pink-bubblegum-dark bg-clip-text text-transparent animate-float">
            Bem-vindo à Doce Sabor! 🍬
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Delícias artesanais feitas com muito amor e carinho para adoçar seu dia!
          </p>
        </section>

        {/* Products Grid */}
        <section>
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
            Nossos Doces Especiais
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                quantity={getProductQuantity(product.id)}
                onAdd={handleAddToCart}
                onRemove={handleRemoveFromCart}
              />
            ))}
          </div>
        </section>

        {/* Footer Section */}
        <section className="mt-16 text-center">
          <div className="bg-gradient-to-r from-pink-light to-blue-light rounded-3xl p-8 border-2 border-pink-bubblegum-dark">
            <h4 className="text-2xl font-bold text-foreground mb-2">
              Feito com amor️!!
            </h4>
            <p className="text-muted-foreground">
              Todos os nossos produtos são preparados com ingredientes selecionados e muito carinho!
            </p>
          </div>
        </section>
      </main>

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemove={handleRemoveFromCart}
        onCheckout={handleCheckout}
      />

      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
      />
    </div>
  );
};

export default Index;
