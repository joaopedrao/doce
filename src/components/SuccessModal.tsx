import { useEffect } from "react";
import confetti from "canvas-confetti";
import { CheckCircle, Heart } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SuccessModal = ({ isOpen, onClose }: SuccessModalProps) => {
  useEffect(() => {
    if (isOpen) {
      // Explosão de confetes rosa
      const duration = 3000;
      const end = Date.now() + duration;

      const colors = ['#FFB3D9', '#87CEEB', '#FF69B4', '#B0E0E6'];

      (function frame() {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors,
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();

      // Confetes do centro
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: colors,
      });
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-pink-light to-blue-light border-4 border-pink-bubblegum-dark">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4 animate-bounce-in">
            <CheckCircle className="h-24 w-24 text-pink-bubblegum-dark" />
          </div>
          <DialogTitle className="text-3xl font-bold text-foreground flex items-center justify-center gap-2">
            Compra Realizada! <Heart className="h-6 w-6 text-pink-bubblegum-dark animate-float" />
          </DialogTitle>
          <DialogDescription className="text-lg text-foreground mt-4 space-y-2">
            <p className="font-semibold">
              Seu pedido foi confirmado com sucesso! 🎉
            </p>
            <p className="text-base">
              Obrigado por comprar na Doce Sabor!
            </p>
            <p className="text-sm text-muted-foreground">
              Seu pedido está sendo preparado com muito carinho 💕
            </p>
          </DialogDescription>
        </DialogHeader>
        <Button
          onClick={onClose}
          className="w-full mt-4 bg-pink-bubblegum hover:bg-pink-bubblegum-dark text-foreground font-bold text-lg h-12"
        >
          Continuar Comprando
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessModal;
