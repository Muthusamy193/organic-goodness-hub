import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useNavigate } from "react-router-dom";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
  const { cartItems, updateQuantity, removeItem, subtotal } = useCart();
  const navigate = useNavigate();

  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + shipping;

  const handleStartShopping = () => {
    onClose();
    navigate("/products");
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col p-0">
        <SheetHeader className="p-6 border-b">
          <SheetTitle className="flex items-center gap-2 font-display text-xl">
            <ShoppingBag className="w-5 h-5 text-primary" />
            Shopping Cart ({cartItems.length})
          </SheetTitle>
        </SheetHeader>

        {cartItems.length > 0 ? (
          <>
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 bg-card rounded-xl shadow-soft">
                  <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg object-cover" />
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">{item.category}</p>
                    <h4 className="font-semibold text-foreground">{item.name}</h4>
                    <p className="text-primary font-bold mt-1">₹{item.price.toFixed(0)}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2 bg-secondary rounded-full">
                        <button onClick={() => updateQuantity(item.id, -1)} className="w-8 h-8 flex items-center justify-center hover:bg-primary hover:text-primary-foreground rounded-full transition-colors">
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="w-8 h-8 flex items-center justify-center hover:bg-primary hover:text-primary-foreground rounded-full transition-colors">
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <button onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-destructive transition-colors p-2">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="border-t p-6 space-y-4 bg-card">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>₹{subtotal.toFixed(0)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className={shipping === 0 ? "text-primary font-medium" : ""}>
                    {shipping === 0 ? "Free" : `₹${shipping}`}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-muted-foreground">
                    Add ₹{(500 - subtotal).toFixed(0)} more for free shipping
                  </p>
                )}
                <div className="flex justify-between font-bold text-lg pt-2 border-t">
                  <span>Total</span>
                  <span className="text-primary">₹{total.toFixed(0)}</span>
                </div>
              </div>
              <Button variant="hero" size="xl" className="w-full">Proceed to Checkout</Button>
              <Button variant="outline" size="lg" className="w-full" onClick={onClose}>Continue Shopping</Button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-4">
              <ShoppingBag className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="font-display text-xl font-semibold mb-2">Your cart is empty</h3>
            <p className="text-muted-foreground mb-6">Looks like you haven't added any products yet</p>
            <Button variant="hero" size="lg" onClick={handleStartShopping}>
              Start Shopping
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
