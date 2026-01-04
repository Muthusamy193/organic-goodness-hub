import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Leaf, Mail } from "lucide-react";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle subscription
    console.log("Subscribing:", email);
    setEmail("");
  };

  return (
    <section className="py-20 lg:py-32 bg-primary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full border-2 border-primary-foreground" />
        <div className="absolute bottom-10 right-10 w-48 h-48 rounded-full border-2 border-primary-foreground" />
        <div className="absolute top-1/2 left-1/4 w-20 h-20 rounded-full border-2 border-primary-foreground" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-foreground/20 mb-6">
            <Leaf className="w-8 h-8 text-primary-foreground" />
          </div>
          
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground">
            Join Our Organic Family
          </h2>
          
          <p className="text-primary-foreground/80 text-lg mt-4 max-w-xl mx-auto">
            Subscribe to receive exclusive offers, seasonal recipes, and 15% off your first order
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 mt-8 max-w-md mx-auto">
            <div className="relative flex-1">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-12 h-14 rounded-xl bg-background border-0 text-foreground placeholder:text-muted-foreground"
                required
              />
            </div>
            <Button type="submit" variant="accent" size="xl">
              Subscribe
            </Button>
          </form>

          <p className="text-primary-foreground/60 text-sm mt-4">
            No spam, unsubscribe anytime. We respect your privacy.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
