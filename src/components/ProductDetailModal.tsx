import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, Star, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import type { Product } from "@/data/products";

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductDetailModal = ({ product, isOpen, onClose }: ProductDetailModalProps) => {
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!product) return null;

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.error("Please sign in to add items to cart");
      onClose();
      navigate("/login");
      return;
    }
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price * 83,
      image: product.image,
      category: product.category,
    });
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl p-0 gap-0 overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <DialogTitle className="font-display text-lg">Product Details</DialogTitle>
        </div>

        <div className="max-h-[75vh] overflow-y-auto">
          <div className="flex flex-col sm:flex-row gap-6 p-6">
            {/* Image */}
            <div className="relative w-full sm:w-64 h-64 flex-shrink-0">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover rounded-xl"
              />
              <button className="absolute top-3 right-3 w-10 h-10 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background transition-colors">
                <Heart className="w-5 h-5 text-muted-foreground hover:text-accent" />
              </button>
              {product.originalPrice && (
                <span className="absolute top-3 left-3 bg-accent text-accent-foreground text-xs font-medium px-3 py-1 rounded-full">
                  Sale
                </span>
              )}
            </div>

            {/* Info */}
            <div className="flex-1">
              <span className="text-xs text-muted-foreground uppercase tracking-wider">
                {product.category}
              </span>
              <h3 className="font-display text-2xl font-bold text-foreground mt-1">
                {product.name}
              </h3>
              <p className="text-primary font-medium text-sm mt-0.5">
                {product.nameTamil}
              </p>

              <div className="flex items-center gap-1 mt-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < product.rating ? "text-golden fill-golden" : "text-muted"}`}
                  />
                ))}
                <span className="text-xs text-muted-foreground ml-1">({product.rating}.0)</span>
              </div>

              <div className="flex items-center gap-3 mt-4">
                <span className="font-bold text-3xl text-foreground">
                  ₹{(product.price * 83).toFixed(0)}
                </span>
                {product.originalPrice && (
                  <span className="text-muted-foreground line-through text-lg">
                    ₹{(product.originalPrice * 83).toFixed(0)}
                  </span>
                )}
              </div>

              <Button variant="cart" size="lg" className="w-full mt-5" onClick={handleAddToCart}>
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </Button>
            </div>
          </div>

          {/* Description */}
          <div className="px-6 pb-4">
            <h4 className="font-display text-lg font-semibold text-foreground mb-2">Description</h4>
            <p className="text-muted-foreground text-sm leading-relaxed">{product.description}</p>
            <p className="text-muted-foreground text-sm leading-relaxed mt-2 italic">{product.descriptionTamil}</p>
          </div>

          {/* Ingredients */}
          <div className="px-6 pb-6">
            <h4 className="font-display text-lg font-semibold text-foreground mb-2">Ingredients</h4>
            <div className="flex flex-wrap gap-2">
              {product.ingredients.map((ing) => (
                <span
                  key={ing}
                  className="bg-secondary text-secondary-foreground text-xs px-3 py-1.5 rounded-full"
                >
                  {ing}
                </span>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailModal;
