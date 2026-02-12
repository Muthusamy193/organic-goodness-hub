import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X, ArrowLeft, ShoppingCart, Star } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const searchSuggestions = [
  "Organic Vegetables",
  "Fresh Fruits",
  "Dairy Products",
  "Herbs & Spices",
  "Rice & Grains",
  "Organic Honey",
];

interface Product {
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  largeImage: string;
  category: string;
  rating: number;
  description: string;
}

const allProducts: Product[] = [
  { name: "Organic Avocados", price: 6.99, originalPrice: 8.99, image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=100&h=100&fit=crop", largeImage: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400&h=400&fit=crop", category: "Fruits", rating: 5, description: "Fresh, creamy organic avocados sourced from certified farms. Rich in healthy fats and perfect for salads, smoothies, or toast." },
  { name: "Fresh Spinach Bundle", price: 3.49, image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=100&h=100&fit=crop", largeImage: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=400&fit=crop", category: "Vegetables", rating: 4, description: "Tender, nutrient-packed organic spinach leaves. Ideal for cooking, juicing, or fresh salads." },
  { name: "Organic Honey", price: 12.99, image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=100&h=100&fit=crop", largeImage: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=400&fit=crop", category: "Pantry", rating: 5, description: "Pure, raw organic honey harvested from local beekeepers. Unprocessed and full of natural enzymes." },
  { name: "Free-Range Eggs", price: 7.49, image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=100&h=100&fit=crop", largeImage: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400&h=400&fit=crop", category: "Dairy & Eggs", rating: 5, description: "Farm-fresh free-range eggs from pasture-raised hens. Rich yolks with superior taste and nutrition." },
  { name: "Mixed Berry Box", price: 8.99, originalPrice: 10.99, image: "https://images.unsplash.com/photo-1425934398893-310a009a77f9?w=100&h=100&fit=crop", largeImage: "https://images.unsplash.com/photo-1425934398893-310a009a77f9?w=400&h=400&fit=crop", category: "Fruits", rating: 4, description: "A delightful mix of organic strawberries, blueberries, and raspberries. Freshly picked and packed." },
  { name: "Organic Carrots", price: 2.99, image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=100&h=100&fit=crop", largeImage: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&h=400&fit=crop", category: "Vegetables", rating: 5, description: "Sweet, crunchy organic carrots grown in mineral-rich soil. Great for snacking, cooking, or juicing." },
  { name: "Almond Milk", price: 4.99, image: "https://images.unsplash.com/photo-1600788886242-5c96aabe3757?w=100&h=100&fit=crop", largeImage: "https://images.unsplash.com/photo-1600788886242-5c96aabe3757?w=400&h=400&fit=crop", category: "Beverages", rating: 4, description: "Creamy, unsweetened almond milk made from organic almonds. A perfect dairy-free alternative." },
  { name: "Fresh Basil", price: 2.49, image: "https://images.unsplash.com/photo-1618164435735-413d3b066c9a?w=100&h=100&fit=crop", largeImage: "https://images.unsplash.com/photo-1618164435735-413d3b066c9a?w=400&h=400&fit=crop", category: "Herbs", rating: 5, description: "Aromatic organic basil leaves, freshly harvested. Perfect for Italian dishes, pesto, and garnishing." },
];

const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const query = searchQuery.toLowerCase();

  const filteredSuggestions = searchSuggestions.filter((item) =>
    item.toLowerCase().includes(query)
  );

  const filteredProducts = searchQuery
    ? allProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      )
    : [];

  const handleAddToCart = (product: Product) => {
    if (!isAuthenticated) {
      toast.error("Please sign in to add items to cart");
      handleClose();
      navigate("/login");
      return;
    }
    addToCart({
      id: product.name.toLowerCase().replace(/\s+/g, "-"),
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    });
    toast.success(`${product.name} added to cart!`);
  };

  const handleClose = () => {
    setSelectedProduct(null);
    setSearchQuery("");
    onClose();
  };

  // Get recommended products (same category, excluding selected)
  const recommendations = selectedProduct
    ? allProducts.filter(
        (p) =>
          p.name !== selectedProduct.name &&
          (p.category === selectedProduct.category || allProducts.indexOf(p) < 4)
      ).slice(0, 3)
    : [];

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl p-0 gap-0 overflow-hidden">
        {selectedProduct ? (
          <>
            {/* Product Detail View */}
            <div className="p-4 border-b flex items-center gap-3">
              <button
                onClick={() => setSelectedProduct(null)}
                className="p-2 hover:bg-secondary rounded-full transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <DialogTitle className="font-display text-lg">Product Details</DialogTitle>
            </div>

            <div className="max-h-[70vh] overflow-y-auto">
              {/* Product Info */}
              <div className="flex flex-col sm:flex-row gap-4 p-5">
                <img
                  src={selectedProduct.largeImage}
                  alt={selectedProduct.name}
                  className="w-full sm:w-44 h-44 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">
                    {selectedProduct.category}
                  </span>
                  <h3 className="font-display text-xl font-semibold text-foreground mt-1">
                    {selectedProduct.name}
                  </h3>
                  <div className="flex items-center gap-1 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < selectedProduct.rating ? "text-golden fill-golden" : "text-muted"}`}
                      />
                    ))}
                    <span className="text-xs text-muted-foreground ml-1">({selectedProduct.rating}.0)</span>
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    <span className="font-bold text-2xl text-primary">
                      ₹{(selectedProduct.price * 83).toFixed(0)}
                    </span>
                    {selectedProduct.originalPrice && (
                      <span className="text-muted-foreground line-through text-sm">
                        ₹{(selectedProduct.originalPrice * 83).toFixed(0)}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                    {selectedProduct.description}
                  </p>
                  <Button
                    variant="cart"
                    size="lg"
                    className="w-full mt-4"
                    onClick={() => handleAddToCart(selectedProduct)}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Add to Cart
                  </Button>
                </div>
              </div>

              {/* Recommendations */}
              {recommendations.length > 0 && (
                <div className="p-5 pt-0">
                  <h4 className="text-sm font-medium text-muted-foreground mb-3">
                    You might also like
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {recommendations.map((product) => (
                      <button
                        key={product.name}
                        onClick={() => setSelectedProduct(product)}
                        className="flex sm:flex-col items-center sm:items-start gap-3 p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors text-left"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-14 h-14 sm:w-full sm:h-24 rounded-lg object-cover"
                        />
                        <div>
                          <p className="font-medium text-sm">{product.name}</p>
                          <p className="text-xs text-primary font-semibold mt-1">
                            ₹{(product.price * 83).toFixed(0)}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            {/* Search View */}
            <DialogHeader className="p-4 pb-0">
              <DialogTitle className="sr-only">Search Products</DialogTitle>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search for organic products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-12 h-14 text-lg border-0 border-b rounded-none focus-visible:ring-0"
                  autoFocus
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </DialogHeader>

            <div className="p-4 max-h-[60vh] overflow-y-auto">
              {searchQuery ? (
                <div className="space-y-6">
                  {filteredProducts.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-3">Products</h3>
                      <div className="space-y-2">
                        {filteredProducts.map((product) => (
                          <button
                            key={product.name}
                            onClick={() => setSelectedProduct(product)}
                            className="w-full flex items-center gap-4 p-3 rounded-lg hover:bg-secondary transition-colors"
                          >
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div className="flex-1 text-left">
                              <p className="font-medium">{product.name}</p>
                              <p className="text-xs text-muted-foreground">{product.category}</p>
                              <p className="text-sm text-primary font-semibold">₹{(product.price * 83).toFixed(0)}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {filteredSuggestions.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">Suggestions</h3>
                      <div className="space-y-1">
                        {filteredSuggestions.map((suggestion) => (
                          <button
                            key={suggestion}
                            onClick={() => setSearchQuery(suggestion)}
                            className="w-full text-left px-4 py-3 rounded-lg hover:bg-secondary transition-colors flex items-center gap-3"
                          >
                            <Search className="w-4 h-4 text-muted-foreground" />
                            <span>{suggestion}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {filteredProducts.length === 0 && filteredSuggestions.length === 0 && (
                    <p className="text-muted-foreground py-4 text-center">
                      No results found for "{searchQuery}"
                    </p>
                  )}
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-3">Popular Searches</h3>
                    <div className="flex flex-wrap gap-2">
                      {searchSuggestions.map((item) => (
                        <button
                          key={item}
                          onClick={() => setSearchQuery(item)}
                          className="px-4 py-2 bg-secondary rounded-full text-sm hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-3">Popular Products</h3>
                    <div className="space-y-2">
                      {allProducts.slice(0, 3).map((product) => (
                        <button
                          key={product.name}
                          onClick={() => setSelectedProduct(product)}
                          className="w-full flex items-center gap-4 p-3 rounded-lg hover:bg-secondary transition-colors"
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div className="flex-1 text-left">
                            <p className="font-medium">{product.name}</p>
                            <p className="text-sm text-primary font-semibold">₹{(product.price * 83).toFixed(0)}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SearchModal;
