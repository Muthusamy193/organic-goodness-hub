import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { Leaf, Eye, EyeOff, Check } from "lucide-react";
import dhanamLogo from "@/assets/dhanam-logo.jpeg";
import { toast } from "sonner";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const passwordChecks = [
    { label: "At least 6 characters", met: password.length >= 6 },
    { label: "Contains a number", met: /\d/.test(password) },
    { label: "Passwords match", met: password.length > 0 && password === confirmPassword },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    const success = signup(name, email, password);
    if (success) {
      toast.success("Account created! Welcome to Dhanam Organics 🌿");
      navigate("/");
    } else {
      toast.error("An account with this email already exists");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left - Decorative */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden bg-secondary items-center justify-center p-12">
        <div className="absolute inset-0 opacity-5">
          {[...Array(8)].map((_, i) => (
            <Leaf
              key={i}
              className="absolute text-primary"
              style={{
                width: `${30 + i * 12}px`,
                height: `${30 + i * 12}px`,
                top: `${5 + i * 12}%`,
                right: `${3 + i * 10}%`,
                transform: `rotate(${i * 45}deg)`,
              }}
            />
          ))}
        </div>
        <div className="relative z-10 text-center max-w-md">
          <img src={dhanamLogo} alt="Dhanam" className="w-24 h-24 rounded-2xl mx-auto mb-8 shadow-lg" />
          <h2 className="font-display text-4xl font-bold text-foreground mb-4">Join Dhanam</h2>
          <p className="text-lg text-muted-foreground">
            Start your journey towards healthy, organic living with traditional foods.
          </p>
          <div className="mt-8 space-y-4 text-left">
            {["Access exclusive organic products", "Track orders & save favorites", "Get personalized recommendations"].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-primary" />
                </div>
                <span className="text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right - Form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-background">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <img src={dhanamLogo} alt="Dhanam" className="w-12 h-12 rounded-xl" />
            <span className="font-display text-2xl font-semibold text-foreground">Dhanam Organics</span>
          </div>

          <h1 className="font-display text-3xl font-bold text-foreground mb-2">Create Account</h1>
          <p className="text-muted-foreground mb-8">Join our community of organic food lovers</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="Your full name" value={name} onChange={(e) => setName(e.target.value)} className="h-12" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="h-12" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input id="password" type={showPassword ? "text" : "password"} placeholder="Create a password" value={password} onChange={(e) => setPassword(e.target.value)} className="h-12 pr-12" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input id="confirmPassword" type="password" placeholder="Confirm your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="h-12" />
            </div>

            {/* Password strength */}
            {password && (
              <div className="space-y-2 p-3 bg-secondary/50 rounded-lg">
                {passwordChecks.map((check) => (
                  <div key={check.label} className="flex items-center gap-2 text-sm">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center ${check.met ? "bg-primary" : "bg-muted"}`}>
                      {check.met && <Check className="w-3 h-3 text-primary-foreground" />}
                    </div>
                    <span className={check.met ? "text-foreground" : "text-muted-foreground"}>{check.label}</span>
                  </div>
                ))}
              </div>
            )}

            <Button type="submit" variant="hero" size="xl" className="w-full">
              Create Account
            </Button>
          </form>

          <p className="text-center text-muted-foreground mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-semibold hover:underline">
              Sign In
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

export default Signup;
