import { Link } from "react-router-dom";
import { Compass } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Compass className="h-6 w-6 text-primary" />
          <span className="font-display text-xl font-bold text-foreground">TrailMate</span>
        </Link>
        <div className="flex items-center gap-6">
          <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Explore
          </Link>
          <span className="text-sm font-medium text-muted-foreground cursor-default">Community</span>
          <span className="text-sm font-medium text-muted-foreground cursor-default">About</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
