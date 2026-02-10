import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import FeaturedProducts from "@/components/FeaturedProducts";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";

const Index = () => {
  return (
    <CartProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <Hero />
        <Categories />
        <FeaturedProducts />
        <Newsletter />
        <Footer />
      </div>
    </CartProvider>
  );
};

export default Index;
