import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { User, Settings, Package, Heart, LogOut, MapPin, CreditCard } from "lucide-react";

const ProfileDropdown = () => {
  const isLoggedIn = false; // This would come from auth state

  if (!isLoggedIn) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
            <User className="w-5 h-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-72 p-4">
          <div className="text-center pb-4">
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-3">
              <User className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="font-display text-lg font-semibold">Welcome to Dhanam</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Sign in for the best experience
            </p>
          </div>
          <div className="space-y-2">
            <Button variant="hero" className="w-full">
              Sign In
            </Button>
            <Button variant="outline" className="w-full">
              Create Account
            </Button>
          </div>
          <DropdownMenuSeparator className="my-4" />
          <div className="space-y-1">
            <DropdownMenuItem className="cursor-pointer">
              <Package className="w-4 h-4 mr-3" />
              Track Order
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Heart className="w-4 h-4 mr-3" />
              Wishlist
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary relative">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-semibold text-sm">JD</span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel className="flex items-center gap-3 py-3">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-semibold">JD</span>
          </div>
          <div>
            <p className="font-semibold">John Doe</p>
            <p className="text-xs text-muted-foreground">john@example.com</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer py-2.5">
          <User className="w-4 h-4 mr-3" />
          My Profile
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer py-2.5">
          <Package className="w-4 h-4 mr-3" />
          My Orders
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer py-2.5">
          <Heart className="w-4 h-4 mr-3" />
          Wishlist
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer py-2.5">
          <MapPin className="w-4 h-4 mr-3" />
          Saved Addresses
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer py-2.5">
          <CreditCard className="w-4 h-4 mr-3" />
          Payment Methods
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer py-2.5">
          <Settings className="w-4 h-4 mr-3" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer py-2.5 text-destructive focus:text-destructive">
          <LogOut className="w-4 h-4 mr-3" />
          Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
