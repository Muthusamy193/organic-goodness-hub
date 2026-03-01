import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import FeaturedProducts from "@/components/FeaturedProducts";
import About from "@/components/About";

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
        <About />
        
        <Footer />
      </div>
    </CartProvider>
  );
};

export default Index;
