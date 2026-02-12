import { Leaf, Heart, Sprout, Sun } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-up">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">Our Story</span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-3">
            Rooted in Tradition,
            <br />
            <span className="text-primary">Grown with Love</span>
          </h2>
        </div>

        {/* Main content - image + story */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          {/* Image collage */}
          <div className="relative animate-fade-up">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img
                  src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400&h=500&fit=crop"
                  alt="Organic farm landscape"
                  className="w-full h-64 object-cover rounded-2xl shadow-card"
                />
                <img
                  src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop"
                  alt="Traditional spices"
                  className="w-full h-40 object-cover rounded-2xl shadow-soft"
                />
              </div>
              <div className="space-y-4 pt-8">
                <img
                  src="https://images.unsplash.com/photo-1595855759920-86582396756a?w=400&h=300&fit=crop"
                  alt="Fresh harvest"
                  className="w-full h-40 object-cover rounded-2xl shadow-soft"
                />
                <img
                  src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=500&fit=crop"
                  alt="Green fields"
                  className="w-full h-64 object-cover rounded-2xl shadow-card"
                />
              </div>
            </div>

            {/* Floating stat badge */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-card rounded-2xl px-8 py-4 shadow-card flex items-center gap-6">
              <div className="text-center">
                <p className="font-display text-2xl font-bold text-primary">50+</p>
                <p className="text-xs text-muted-foreground">Local Farms</p>
              </div>
              <div className="w-px h-10 bg-border" />
              <div className="text-center">
                <p className="font-display text-2xl font-bold text-primary">10K+</p>
                <p className="text-xs text-muted-foreground">Happy Families</p>
              </div>
              <div className="w-px h-10 bg-border" />
              <div className="text-center">
                <p className="font-display text-2xl font-bold text-primary">100%</p>
                <p className="text-xs text-muted-foreground">Organic</p>
              </div>
            </div>
          </div>

          {/* Story content */}
          <div className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
              <Sprout className="w-4 h-4" />
              <span className="text-sm font-medium">Since 2018</span>
            </div>
            <h3 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-6">
              From Our Farms to Your Family's Table
            </h3>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Dhanam Organics was born from a deep-rooted passion for <strong className="text-foreground">பாரம்பரிய உணவு</strong> — the traditional foods that nourished 
                generations of Tamil families. We saw how modern food practices were pulling us away from 
                our ancestral wisdom, and we knew something had to change.
              </p>
              <p>
                Working hand-in-hand with over 50 local farming families across Tamil Nadu, we source the 
                purest organic produce — from cold-pressed oils and native rice varieties to hand-ground 
                spices and raw honey. Every product carries the essence of the soil it grew in.
              </p>
              <p>
                Our promise is simple: <strong className="text-foreground">no chemicals, no shortcuts, no compromise</strong>. Just pure, 
                traditional food the way nature intended it.
              </p>
            </div>
          </div>
        </div>

        {/* Mission values cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {[
            {
              icon: Leaf,
              title: "Pure Organic",
              description: "Every product is certified organic, free from synthetic pesticides and chemicals.",
              color: "bg-primary/10 text-primary",
            },
            {
              icon: Heart,
              title: "Farm Families",
              description: "We support 50+ local farming families with fair trade practices and stable incomes.",
              color: "bg-accent/10 text-accent",
            },
            {
              icon: Sprout,
              title: "Sustainable",
              description: "Eco-friendly farming methods that preserve soil health for future generations.",
              color: "bg-primary/10 text-primary",
            },
            {
              icon: Sun,
              title: "Traditional Roots",
              description: "Reviving ancient food wisdom — native seeds, cold-pressed methods, and time-tested recipes.",
              color: "bg-golden/20 text-earth",
            },
          ].map((value, index) => (
            <div
              key={value.title}
              className="bg-card rounded-2xl p-6 shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1 animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-12 h-12 rounded-xl ${value.color} flex items-center justify-center mb-4`}>
                <value.icon className="w-6 h-6" />
              </div>
              <h4 className="font-display text-lg font-semibold text-foreground mb-2">{value.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
