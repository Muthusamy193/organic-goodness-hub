import { ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  isOrganic?: boolean;
  rating: number;
}

const ProductCard = ({
  name,
  price,
  originalPrice,
  image,
  category,
  isOrganic = true,
  rating,
}: ProductCardProps) => {
  return (
    <div className="group bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-hover transition-all duration-300 hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-secondary/30">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {isOrganic && (
            <span className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
              Organic
            </span>
          )}
          {originalPrice && (
            <span className="bg-accent text-accent-foreground text-xs font-medium px-3 py-1 rounded-full">
              Sale
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button className="absolute top-3 right-3 w-10 h-10 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-background">
          <Heart className="w-5 h-5 text-muted-foreground hover:text-accent transition-colors" />
        </button>

        {/* Quick Add Button */}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button variant="cart" size="lg" className="w-full">
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <span className="text-muted-foreground text-xs uppercase tracking-wider">
          {category}
        </span>
        <h3 className="font-display text-lg font-semibold text-foreground mt-1 group-hover:text-primary transition-colors">
          {name}
        </h3>
        
        <div className="flex items-center gap-1 mt-2">
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className={`text-sm ${i < rating ? "text-golden" : "text-muted"}`}
            >
              ★
            </span>
          ))}
          <span className="text-muted-foreground text-xs ml-1">({rating}.0)</span>
        </div>

        <div className="flex items-center gap-2 mt-3">
          <span className="font-bold text-xl text-foreground">${price.toFixed(2)}</span>
          {originalPrice && (
            <span className="text-muted-foreground line-through text-sm">
              ${originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
