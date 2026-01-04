import { ArrowRight } from "lucide-react";

const categories = [
  {
    name: "Fresh Vegetables",
    description: "Seasonal & locally sourced",
    emoji: "🥦",
    color: "bg-primary/10",
    items: "45+ items",
  },
  {
    name: "Organic Fruits",
    description: "Sweet & naturally grown",
    emoji: "🍎",
    color: "bg-accent/10",
    items: "38+ items",
  },
  {
    name: "Dairy & Eggs",
    description: "Farm fresh & organic",
    emoji: "🥛",
    color: "bg-secondary",
    items: "24+ items",
  },
  {
    name: "Grains & Cereals",
    description: "Whole & nutritious",
    emoji: "🌾",
    color: "bg-golden/20",
    items: "32+ items",
  },
  {
    name: "Herbs & Spices",
    description: "Aromatic & fresh",
    emoji: "🌿",
    color: "bg-leaf/10",
    items: "56+ items",
  },
  {
    name: "Beverages",
    description: "Natural & refreshing",
    emoji: "🧃",
    color: "bg-terracotta/10",
    items: "28+ items",
  },
];

const Categories = () => {
  return (
    <section id="categories" className="py-20 lg:py-32 bg-card">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-up">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Browse by Category
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-3">
            Shop by Category
          </h2>
          <p className="text-muted-foreground text-lg mt-4 max-w-2xl mx-auto">
            Explore our wide range of certified organic products, carefully categorized for your convenience
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <a
              key={category.name}
              href="#"
              className="group relative bg-background rounded-2xl p-6 shadow-soft hover:shadow-hover transition-all duration-300 hover:-translate-y-1 animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-2xl ${category.color} flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300`}>
                    {category.emoji}
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-muted-foreground text-sm mt-1">
                      {category.description}
                    </p>
                    <span className="text-primary text-sm font-medium mt-2 inline-block">
                      {category.items}
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
