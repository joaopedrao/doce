import { ShoppingCart, Plus, Minus } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

interface ProductCardProps {
  product: Product;
  quantity: number;
  onAdd: (product: Product) => void;
  onRemove: (productId: number) => void;
}

const ProductCard = ({ product, quantity, onAdd, onRemove }: ProductCardProps) => {
  return (
    <Card className="overflow-hidden border-2 border-border hover:border-pink-bubblegum-dark transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-bounce-in bg-card">
      <div className="relative h-48 md:h-64 overflow-hidden bg-pink-light">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
        <Badge className="absolute top-3 right-3 bg-sky-blue text-sky-blue-dark border-0">
          {product.category}
        </Badge>
      </div>
      
      <CardContent className="p-4">
        <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-3">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-pink-bubblegum-dark">
            R$ {product.price.toFixed(2)}
          </span>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        {quantity === 0 ? (
          <Button 
            onClick={() => onAdd(product)}
            className="w-full bg-pink-bubblegum hover:bg-pink-bubblegum-dark text-foreground font-semibold transition-all hover:scale-105"
            size="lg"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Adicionar ao Carrinho
          </Button>
        ) : (
          <div className="flex items-center justify-between w-full gap-2">
            <Button
              onClick={() => onRemove(product.id)}
              variant="outline"
              size="icon"
              className="border-pink-bubblegum-dark text-pink-bubblegum-dark hover:bg-pink-bubblegum"
            >
              <Minus className="h-4 w-4" />
            </Button>
            
            <span className="text-xl font-bold text-foreground min-w-[3rem] text-center">
              {quantity}
            </span>
            
            <Button
              onClick={() => onAdd(product)}
              variant="outline"
              size="icon"
              className="border-sky-blue-dark text-sky-blue-dark hover:bg-sky-blue"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
