import HeroSection from "@/components/HeroSection";
import DestinationCard from "@/components/DestinationCard";
import FeaturesSection from "@/components/FeaturesSection";
import Navbar from "@/components/Navbar";
import { destinations } from "@/data/destinations";
import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import { motion } from "framer-motion";

const Index = () => {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search")?.toLowerCase() || "";

  const filtered = useMemo(() => {
    if (!search) return destinations;
    return destinations.filter(
      (d) =>
        d.name.toLowerCase().includes(search) ||
        d.location.toLowerCase().includes(search) ||
        d.category.toLowerCase().includes(search)
    );
  }, [search]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />

      {/* Destinations */}
      <section className="py-16 px-4" id="destinations">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
              {search ? `Results for "${search}"` : "Featured Destinations"}
            </h2>
            <p className="text-muted-foreground text-lg">
              Handpicked adventures with complete preparation guides
            </p>
          </motion.div>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filtered.map((dest, i) => (
                <DestinationCard key={dest.id} destination={dest} index={i} />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-12">
              No destinations found. Try a different search term.
            </p>
          )}
        </div>
      </section>

      <FeaturesSection />

      {/* Footer */}
      <footer className="border-t border-border py-10 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-muted-foreground text-sm">
            © 2026 TrailMate — Your smart travel companion. Built for adventurers, by adventurers.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
