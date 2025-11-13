import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  cartItemsCount: number;
  onCartClick: () => void;
}

const Header = ({ cartItemsCount, onCartClick }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container flex h-20 items-center justify-between px-4 md:px-8">
        <div className="flex flex-col">
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-bubblegum-dark to-sky-blue-dark bg-clip-text text-transparent animate-float">
            Doce Sabor
          </h1>
          <p className="text-xs md:text-sm text-muted-foreground">
            Pipocas e Doces feito com amor ❤️
          </p>
        </div>
        
        <Button 
          onClick={onCartClick}
          variant="outline"
          size="lg"
          className="relative bg-pink-bubblegum hover:bg-pink-bubblegum-dark border-pink-bubblegum-dark transition-all hover:scale-105"
        >
          <ShoppingCart className="h-5 w-5 mr-2" />
          <span className="hidden md:inline">Carrinho</span>
          {cartItemsCount > 0 && (
            <Badge 
              className="absolute -top-2 -right-2 h-6 w-6 flex items-center justify-center bg-sky-blue text-sky-blue-dark border-0 animate-bounce-in"
            >
              {cartItemsCount}
            </Badge>
          )}
        </Button>
      </div>
    </header>
  );
};

export default Header;
