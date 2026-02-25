import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Product } from "@/data/products";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Product) => void;
  product?: Product | null;
}

const emptyProduct: Product = {
  id: "",
  name: "",
  nameTamil: "",
  price: 0,
  originalPrice: undefined,
  image: "",
  category: "",
  rating: 5,
  description: "",
  descriptionTamil: "",
  ingredients: [],
  isOrganic: true,
};

const transliterateTamil = (english: string): string => {
  const map: Record<string, string> = {
    "avocado": "வெண்ணெய்ப்பழம்", "spinach": "கீரை", "honey": "தேன்", "egg": "முட்டை",
    "berry": "பெர்ரி", "carrot": "கேரட்", "milk": "பால்", "basil": "துளசி",
    "turmeric": "மஞ்சள்", "coconut": "தேங்காய்", "oil": "எண்ணெய்", "jaggery": "வெல்லம்",
    "millet": "சிறுதானியம்", "rice": "அரிசி", "organic": "இயற்கை", "fresh": "புதிய",
    "powder": "தூள்", "mix": "கலவை", "pure": "தூய்மையான",
  };
  const lower = english.toLowerCase();
  const tamilWords = lower.split(/\s+/).map(w => map[w] || w);
  return tamilWords.join(" ");
};

const ProductFormModal = ({ isOpen, onClose, onSave, product }: Props) => {
  const [form, setForm] = useState<Product>(emptyProduct);
  const [ingredientsText, setIngredientsText] = useState("");

  useEffect(() => {
    if (product) {
      setForm(product);
      setIngredientsText(product.ingredients.join(", "));
    } else {
      setForm({ ...emptyProduct, id: `product-${Date.now()}` });
      setIngredientsText("");
    }
  }, [product, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.price <= 0) return;
    onSave({
      ...form,
      nameTamil: form.nameTamil || transliterateTamil(form.name),
      ingredients: ingredientsText.split(",").map((s) => s.trim()).filter(Boolean),
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display">
            {product ? "Edit Product" : "Add New Product"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Product Name</Label>
            <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value, nameTamil: transliterateTamil(e.target.value) })} required />
            {form.nameTamil && (
              <p className="text-xs text-muted-foreground">Tamil: {form.nameTamil}</p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Price (₹)</Label>
              <Input type="number" step="0.01" min="0.01" value={form.price || ""} onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) || 0 })} required />
            </div>
            <div className="space-y-2">
              <Label>Original Price (₹, optional)</Label>
              <Input type="number" step="0.01" value={form.originalPrice || ""} onChange={(e) => setForm({ ...form, originalPrice: e.target.value ? parseFloat(e.target.value) : undefined })} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Category</Label>
              <Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required />
            </div>
            <div className="space-y-2">
              <Label>Rating (1-5)</Label>
              <Input type="number" min={1} max={5} value={form.rating} onChange={(e) => setForm({ ...form, rating: parseInt(e.target.value) || 5 })} />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Image URL</Label>
            <Input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} required />
            {form.image && (
              <img src={form.image} alt="Preview" className="w-20 h-20 rounded-lg object-cover mt-1" />
            )}
          </div>
          <div className="space-y-2">
            <Label>Description (English)</Label>
            <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
          </div>
          <div className="space-y-2">
            <Label>Description (Tamil, auto-filled)</Label>
            <Textarea value={form.descriptionTamil} onChange={(e) => setForm({ ...form, descriptionTamil: e.target.value })} placeholder="Auto-generated from English or type manually" />
          </div>
          <div className="space-y-2">
            <Label>Ingredients (comma-separated)</Label>
            <Input value={ingredientsText} onChange={(e) => setIngredientsText(e.target.value)} />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" checked={form.isOrganic} onChange={(e) => setForm({ ...form, isOrganic: e.target.checked })} id="organic" className="rounded" />
            <Label htmlFor="organic">Organic Product</Label>
          </div>
          <div className="flex gap-3 justify-end pt-2">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="hero">{product ? "Save Changes" : "Add Product"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductFormModal;
