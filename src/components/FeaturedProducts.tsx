import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import ProductDetailModal from "./ProductDetailModal";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { allProducts, categories, type Product } from "@/data/products";

const FeaturedProducts = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filtered = useMemo(() => {
    let list = [...allProducts].slice(0, 8);
    if (selectedCategory !== "all") {
      list = allProducts.filter((p) => p.category === selectedCategory).slice(0, 8);
    }
    switch (sortBy) {
      case "price-low":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
    }
    return list;
  }, [selectedCategory, sortBy]);

  if (!isAuthenticated) {
    return (
      <section id="shop" className="py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Sign in to explore our products
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
            Login or create an account to browse our complete organic product collection
          </p>
          <div className="flex gap-4 justify-center">
            <Button variant="hero" size="lg" onClick={() => navigate("/login")}>
              Sign In
            </Button>
            <Button variant="outline" size="lg" onClick={() => navigate("/signup")}>
              Create Account
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="shop" className="py-20 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-6">
          <div className="animate-fade-up">
            <span className="text-primary font-medium text-sm uppercase tracking-wider">
              Our Products
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-3">
              Featured Products
            </h2>
            <p className="text-muted-foreground text-lg mt-4 max-w-xl">
              Handpicked selection of our finest organic products, fresh from local farms
            </p>
          </div>
          <Button variant="outline" size="lg" className="self-start md:self-auto" onClick={() => navigate("/products")}>
            View All Products
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-8 items-center">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-44">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-44">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-up cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => setSelectedProduct(product)}
            >
              <ProductCard
                name={product.name}
                price={product.price}
                originalPrice={product.originalPrice}
                image={product.image}
                category={product.category}
                rating={product.rating}
                isOrganic={product.isOrganic}
              />
            </div>
          ))}
        </div>
      </div>

      <ProductDetailModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  );
};

export default FeaturedProducts;
