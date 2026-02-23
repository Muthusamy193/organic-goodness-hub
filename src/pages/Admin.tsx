import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useProducts } from "@/context/ProductContext";
import { useContent } from "@/context/ContentContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductFormModal from "@/components/admin/ProductFormModal";
import ContentEditModal from "@/components/admin/ContentEditModal";
import type { Product } from "@/data/products";
import type { SectionContent } from "@/context/ContentContext";
import {
  ArrowLeft, Package, Users, ShoppingCart, FileText,
  Plus, Edit, Trash2, BarChart3,
} from "lucide-react";
import { toast } from "sonner";

const USERS_KEY = "dhanam_users";

interface StoredUser {
  profile: { id: string; name: string; email: string; createdAt: string };
  password: string;
}

const Admin = () => {
  const { isAuthenticated, user } = useAuth();
  const { products, addProduct, updateProduct, deleteProduct, totalProducts, totalCategories } = useProducts();
  const { sections, updateSection } = useContent();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [contentModalOpen, setContentModalOpen] = useState(false);
  const [editingSection, setEditingSection] = useState<SectionContent | null>(null);
  const [registeredUsers, setRegisteredUsers] = useState<StoredUser["profile"][]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(USERS_KEY);
      if (raw) {
        const users: Record<string, StoredUser> = JSON.parse(raw);
        setRegisteredUsers(Object.values(users).map((u) => u.profile));
      }
    } catch { /* ignore */ }
  }, []);

  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSave = (product: Product) => {
    if (editingProduct) {
      updateProduct(product.id, product);
      toast.success("Product updated successfully");
    } else {
      addProduct(product);
      toast.success("Product added successfully");
    }
    setEditingProduct(null);
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Delete "${name}"?`)) {
      deleteProduct(id);
      toast.success("Product deleted");
    }
  };

  const handleContentSave = (id: string, fields: SectionContent["fields"]) => {
    updateSection(id, fields);
    toast.success("Content updated successfully");
  };

  const stats = [
    { label: "Total Products", value: totalProducts, icon: Package, color: "text-primary" },
    { label: "Categories", value: totalCategories, icon: BarChart3, color: "text-accent" },
    { label: "Users", value: registeredUsers.length, icon: Users, color: "text-golden" },
    { label: "Orders", value: "—", icon: ShoppingCart, color: "text-leaf" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="font-display text-xl font-bold">Admin Dashboard</h1>
          </div>
          <span className="text-sm text-muted-foreground">Welcome, {user?.name}</span>
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

        <Tabs defaultValue="products">
          <TabsList className="mb-6">
            <TabsTrigger value="products"><Package className="w-4 h-4 mr-2" />Products</TabsTrigger>
            <TabsTrigger value="users"><Users className="w-4 h-4 mr-2" />Users</TabsTrigger>
            <TabsTrigger value="content"><FileText className="w-4 h-4 mr-2" />Content</TabsTrigger>
            <TabsTrigger value="services"><BarChart3 className="w-4 h-4 mr-2" />Services</TabsTrigger>
          </TabsList>

          {/* Products Tab */}
          <TabsContent value="products">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="font-display text-xl">Manage Products</CardTitle>
                <Button variant="hero" size="sm" onClick={() => { setEditingProduct(null); setFormOpen(true); }}>
                  <Plus className="w-4 h-4 mr-1" />Add Product
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
                            <span className="bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-full">{product.category}</span>
                          </td>
                          <td className="py-3 px-2 font-medium">₹{product.price.toFixed(2)}</td>
                          <td className="py-3 px-2"><span className="text-golden">{"★".repeat(product.rating)}</span></td>
                          <td className="py-3 px-2 text-right">
                            <div className="flex items-center justify-end gap-1">
                              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => { setEditingProduct(product); setFormOpen(true); }}>
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDelete(product.id, product.name)}>
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

          {/* Users Tab */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle className="font-display text-xl">Registered Users ({registeredUsers.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {registeredUsers.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">No registered users yet.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-2 text-muted-foreground font-medium">#</th>
                          <th className="text-left py-3 px-2 text-muted-foreground font-medium">Name</th>
                          <th className="text-left py-3 px-2 text-muted-foreground font-medium">Email</th>
                          <th className="text-left py-3 px-2 text-muted-foreground font-medium">Joined</th>
                        </tr>
                      </thead>
                      <tbody>
                        {registeredUsers.map((u, i) => (
                          <tr key={u.id} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                            <td className="py-3 px-2 text-muted-foreground">{i + 1}</td>
                            <td className="py-3 px-2 font-medium">{u.name}</td>
                            <td className="py-3 px-2">{u.email}</td>
                            <td className="py-3 px-2 text-muted-foreground">
                              {new Date(u.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Content Tab */}
          <TabsContent value="content">
            <Card>
              <CardHeader><CardTitle className="font-display text-xl">Manage Content</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sections.map((section) => (
                    <div key={section.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
                      <div>
                        <p className="font-medium">{section.label}</p>
                        <p className="text-xs text-muted-foreground">{section.fields.length} editable fields</p>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => { setEditingSection(section); setContentModalOpen(true); }}>
                        <Edit className="w-4 h-4 mr-1" />Edit
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="font-display text-xl">Manage Services</CardTitle>
                <Button variant="hero" size="sm"><Plus className="w-4 h-4 mr-1" />Add Service</Button>
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
                        <Button variant="ghost" size="icon" className="h-8 w-8"><Edit className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive"><Trash2 className="w-4 h-4" /></Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <ProductFormModal
        isOpen={formOpen}
        onClose={() => { setFormOpen(false); setEditingProduct(null); }}
        onSave={handleSave}
        product={editingProduct}
      />
      <ContentEditModal
        isOpen={contentModalOpen}
        onClose={() => { setContentModalOpen(false); setEditingSection(null); }}
        section={editingSection}
        onSave={handleContentSave}
      />
    </div>
  );
};

export default Admin;
