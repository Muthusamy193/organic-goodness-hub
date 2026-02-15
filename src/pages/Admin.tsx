import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { allProducts } from "@/data/products";
import {
  ArrowLeft,
  Package,
  Users,
  ShoppingCart,
  FileText,
  Plus,
  Edit,
  Trash2,
  BarChart3,
} from "lucide-react";

const Admin = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  const filteredProducts = allProducts.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = [
    { label: "Total Products", value: allProducts.length, icon: Package, color: "text-primary" },
    { label: "Categories", value: new Set(allProducts.map((p) => p.category)).size, icon: BarChart3, color: "text-accent" },
    { label: "Users", value: "—", icon: Users, color: "text-golden" },
    { label: "Orders", value: "—", icon: ShoppingCart, color: "text-leaf" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="font-display text-xl font-bold">Admin Dashboard</h1>
          </div>
          <span className="text-sm text-muted-foreground">
            Welcome, {user?.name}
          </span>
        </div>
      </header>

      <div className="container mx-auto px-4 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="p-4 flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl bg-secondary flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="products">
          <TabsList className="mb-6">
            <TabsTrigger value="products">
              <Package className="w-4 h-4 mr-2" />
              Products
            </TabsTrigger>
            <TabsTrigger value="content">
              <FileText className="w-4 h-4 mr-2" />
              Content
            </TabsTrigger>
            <TabsTrigger value="services">
              <BarChart3 className="w-4 h-4 mr-2" />
              Services
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="font-display text-xl">Manage Products</CardTitle>
                <Button variant="hero" size="sm">
                  <Plus className="w-4 h-4 mr-1" />
                  Add Product
                </Button>
              </CardHeader>
              <CardContent>
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="mb-4 max-w-sm"
                />
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-2 text-muted-foreground font-medium">Product</th>
                        <th className="text-left py-3 px-2 text-muted-foreground font-medium">Category</th>
                        <th className="text-left py-3 px-2 text-muted-foreground font-medium">Price</th>
                        <th className="text-left py-3 px-2 text-muted-foreground font-medium">Rating</th>
                        <th className="text-right py-3 px-2 text-muted-foreground font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.map((product) => (
                        <tr key={product.id} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                          <td className="py-3 px-2">
                            <div className="flex items-center gap-3">
                              <img src={product.image} alt={product.name} className="w-10 h-10 rounded-lg object-cover" />
                              <div>
                                <p className="font-medium">{product.name}</p>
                                <p className="text-xs text-muted-foreground">{product.nameTamil}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-2">
                            <span className="bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-full">
                              {product.category}
                            </span>
                          </td>
                          <td className="py-3 px-2 font-medium">₹{(product.price * 83).toFixed(0)}</td>
                          <td className="py-3 px-2">
                            <span className="text-golden">{"★".repeat(product.rating)}</span>
                          </td>
                          <td className="py-3 px-2 text-right">
                            <div className="flex items-center justify-end gap-1">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content">
            <Card>
              <CardHeader>
                <CardTitle className="font-display text-xl">Manage Content</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {["Hero Section", "About Section", "Newsletter Section", "Footer"].map((section) => (
                    <div key={section} className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
                      <div>
                        <p className="font-medium">{section}</p>
                        <p className="text-xs text-muted-foreground">Last updated: Today</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="font-display text-xl">Manage Services</CardTitle>
                <Button variant="hero" size="sm">
                  <Plus className="w-4 h-4 mr-1" />
                  Add Service
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {["Free Delivery", "Quality Guarantee", "Organic Certification", "Customer Support"].map((service) => (
                    <div key={service} className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
                      <div>
                        <p className="font-medium">{service}</p>
                        <p className="text-xs text-muted-foreground">Active</p>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
