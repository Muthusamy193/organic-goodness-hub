import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const products = [
  {
    name: "Organic Avocados",
    price: 6.99,
    originalPrice: 8.99,
    image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400&h=400&fit=crop",
    category: "Fruits",
    rating: 5,
  },
  {
    name: "Fresh Spinach Bundle",
    price: 3.49,
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=400&fit=crop",
    category: "Vegetables",
    rating: 4,
  },
  {
    name: "Organic Honey",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=400&fit=crop",
    category: "Pantry",
    rating: 5,
  },
  {
    name: "Free-Range Eggs",
    price: 7.49,
    image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400&h=400&fit=crop",
    category: "Dairy & Eggs",
    rating: 5,
  },
  {
    name: "Mixed Berry Box",
    price: 8.99,
    originalPrice: 10.99,
    image: "https://images.unsplash.com/photo-1425934398893-310a009a77f9?w=400&h=400&fit=crop",
    category: "Fruits",
    rating: 4,
  },
  {
    name: "Organic Carrots",
    price: 2.99,
    image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&h=400&fit=crop",
    category: "Vegetables",
    rating: 5,
  },
  {
    name: "Almond Milk",
    price: 4.99,
    image: "https://images.unsplash.com/photo-1600788886242-5c96aabe3757?w=400&h=400&fit=crop",
    category: "Beverages",
    rating: 4,
  },
  {
    name: "Fresh Basil",
    price: 2.49,
    image: "https://images.unsplash.com/photo-1618164435735-413d3b066c9a?w=400&h=400&fit=crop",
    category: "Herbs",
    rating: 5,
  },
];

const FeaturedProducts = () => {
  return (
    <section id="shop" className="py-20 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
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
          <Button variant="outline" size="lg" className="self-start md:self-auto">
            View All Products
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div
              key={product.name}
              className="animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
