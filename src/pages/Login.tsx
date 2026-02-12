import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { Leaf, Eye, EyeOff } from "lucide-react";
import dhanamLogo from "@/assets/dhanam-logo.jpeg";
import { toast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    const success = login(email, password);
    if (success) {
      toast.success("Welcome back!");
      navigate("/");
    } else {
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left - Decorative */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden gradient-accent items-center justify-center p-12">
        <div className="absolute inset-0 opacity-10">
          {[...Array(6)].map((_, i) => (
            <Leaf
              key={i}
              className="absolute text-primary-foreground"
              style={{
                width: `${40 + i * 15}px`,
                height: `${40 + i * 15}px`,
                top: `${10 + i * 15}%`,
                left: `${5 + i * 12}%`,
                transform: `rotate(${i * 60}deg)`,
              }}
            />
          ))}
        </div>
        <div className="relative z-10 text-center text-primary-foreground max-w-md">
          <img src={dhanamLogo} alt="Dhanam" className="w-24 h-24 rounded-2xl mx-auto mb-8 shadow-lg" />
          <h2 className="font-display text-4xl font-bold mb-4">Welcome Back</h2>
          <p className="text-lg opacity-90">
            பாரம்பரிய உணவை நோக்கிய பயணம்
          </p>
          <p className="mt-3 opacity-80">
            Continue your journey towards pure, organic, traditional foods.
          </p>
        </div>
      </div>

      {/* Right - Form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-background">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <img src={dhanamLogo} alt="Dhanam" className="w-12 h-12 rounded-xl" />
            <span className="font-display text-2xl font-semibold text-foreground">Dhanam Organics</span>
          </div>

          <h1 className="font-display text-3xl font-bold text-foreground mb-2">Sign In</h1>
          <p className="text-muted-foreground mb-8">Enter your credentials to access your account</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <Button type="submit" variant="hero" size="xl" className="w-full">
              Sign In
            </Button>
          </form>

          <p className="text-center text-muted-foreground mt-6">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary font-semibold hover:underline">
              Create Account
            </Link>
          </p>

          <Link to="/" className="block text-center text-sm text-muted-foreground mt-4 hover:text-primary">
            ← Back to Store
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
