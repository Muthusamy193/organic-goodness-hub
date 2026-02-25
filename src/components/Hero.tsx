import { ArrowRight, Truck, Shield, Leaf } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-organic.jpg";

const Hero = () => {
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen pt-20 lg:pt-0 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 gradient-hero opacity-50" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center min-h-screen gap-8 lg:gap-16 py-12 lg:py-0">
          {/* Content */}
          <div className="flex-1 text-center lg:text-left animate-fade-up">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
              <Leaf className="w-4 h-4" />
              <span className="text-sm font-medium">100% Certified Organic</span>
            </div>
            
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight mb-6">
              Pure & Natural
              <br />
              <span className="text-primary">Traditional Foods</span>
              <br />
              For Your Health
            </h1>
            
            <p className="text-lg lg:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-4">
              பாரம்பரிய உணவை நோக்கிய பயணம்
            </p>
            
            <p className="text-lg lg:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8">
              Discover the finest organic produce from Dhanam Organics. 
              Pure, fresh, and delivered with care to nourish your family with traditional goodness.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <Button variant="hero" size="xl" onClick={() => navigate("/products")}>
                Shop Now
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="xl" onClick={() => scrollToSection("about")}>
                Learn More
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 mt-12">
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                  <Truck className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm font-medium">Free Delivery</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm font-medium">Quality Guaranteed</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm font-medium">100% Organic</span>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="flex-1 relative">
            <div className="relative animate-float">
              <div className="absolute inset-0 bg-primary/20 rounded-3xl blur-3xl transform rotate-6" />
              <img
                src={heroImage}
                alt="Fresh organic vegetables and fruits"
                className="relative rounded-3xl shadow-hover object-cover w-full max-w-lg mx-auto"
              />
              
              {/* Floating Badge */}
              <div className="absolute -bottom-4 -left-4 lg:-left-8 bg-card rounded-2xl p-4 shadow-card animate-fade-up" style={{ animationDelay: "0.3s" }}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-golden/20 flex items-center justify-center">
                    <span className="text-2xl">🥬</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Fresh Daily</p>
                    <p className="text-xs text-muted-foreground">Farm to table</p>
                  </div>
                </div>
              </div>

              {/* Rating Badge */}
              <div className="absolute -top-4 -right-4 lg:-right-8 bg-card rounded-2xl p-4 shadow-card animate-fade-up" style={{ animationDelay: "0.5s" }}>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-golden text-lg">★</span>
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-foreground">4.9</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">10k+ Happy Customers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
