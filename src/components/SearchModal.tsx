import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";

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

const allProducts = [
  { name: "Organic Avocados", price: 6.99, image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=100&h=100&fit=crop", category: "Fruits" },
  { name: "Fresh Spinach Bundle", price: 3.49, image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=100&h=100&fit=crop", category: "Vegetables" },
  { name: "Organic Honey", price: 12.99, image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=100&h=100&fit=crop", category: "Pantry" },
  { name: "Free-Range Eggs", price: 7.49, image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=100&h=100&fit=crop", category: "Dairy & Eggs" },
  { name: "Mixed Berry Box", price: 8.99, image: "https://images.unsplash.com/photo-1425934398893-310a009a77f9?w=100&h=100&fit=crop", category: "Fruits" },
  { name: "Organic Carrots", price: 2.99, image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=100&h=100&fit=crop", category: "Vegetables" },
  { name: "Almond Milk", price: 4.99, image: "https://images.unsplash.com/photo-1600788886242-5c96aabe3757?w=100&h=100&fit=crop", category: "Beverages" },
  { name: "Fresh Basil", price: 2.49, image: "https://images.unsplash.com/photo-1618164435735-413d3b066c9a?w=100&h=100&fit=crop", category: "Herbs" },
];

const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const [searchQuery, setSearchQuery] = useState("");

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl p-0 gap-0 overflow-hidden">
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
              {/* Matching Products */}
              {filteredProducts.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-3">Products</h3>
                  <div className="space-y-2">
                    {filteredProducts.map((product) => (
                      <button
                        key={product.name}
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

              {/* Matching Suggestions */}
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
      </DialogContent>
    </Dialog>
  );
};

export default SearchModal;
