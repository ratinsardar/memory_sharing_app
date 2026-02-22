import HeroSection from "@/components/HeroSection";
import DestinationCard from "@/components/DestinationCard";
import FeaturesSection from "@/components/FeaturesSection";
import Navbar from "@/components/Navbar";
import { destinations } from "@/data/destinations";
import { useSearchParams, Link } from "react-router-dom";
import { useMemo, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Star, MapPin, Mountain, Clock } from "lucide-react";
import { difficultyColor } from "@/data/destinations";

interface DbPlace {
  id: string;
  name: string;
  location: string;
  image_urls: string[] | null;
  difficulty: string;
  best_season: string | null;
  rating: number | null;
  review_count: number | null;
  category: string;
  elevation: string | null;
  duration: string | null;
}

const Index = () => {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search")?.toLowerCase() || "";
  const [dbPlaces, setDbPlaces] = useState<DbPlace[]>([]);

  useEffect(() => {
    supabase
      .from("places")
      .select("id, name, location, image_urls, difficulty, best_season, rating, review_count, category, elevation, duration")
      .order("created_at", { ascending: false })
      .then(({ data }) => setDbPlaces(data || []));
  }, []);

  const filtered = useMemo(() => {
    if (!search) return destinations;
    return destinations.filter(
      (d) =>
        d.name.toLowerCase().includes(search) ||
        d.location.toLowerCase().includes(search) ||
        d.category.toLowerCase().includes(search)
    );
  }, [search]);

  const filteredDbPlaces = useMemo(() => {
    if (!search) return dbPlaces;
    return dbPlaces.filter(
      (d) =>
        d.name.toLowerCase().includes(search) ||
        d.location.toLowerCase().includes(search) ||
        d.category.toLowerCase().includes(search)
    );
  }, [search, dbPlaces]);

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
            !filteredDbPlaces.length && (
              <p className="text-muted-foreground text-center py-12">
                No destinations found. Try a different search term.
              </p>
            )
          )}
        </div>
      </section>

      {/* Community Places from DB */}
      {filteredDbPlaces.length > 0 && (
        <section className="py-16 px-4 bg-muted/30" id="community-places">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10"
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
                Community Destinations
              </h2>
              <p className="text-muted-foreground text-lg">
                Places added by fellow travelers
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredDbPlaces.map((place, i) => (
                <motion.div
                  key={place.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <Link to={`/place/${place.id}`} className="group block">
                    <article className="bg-card rounded-lg overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 group-hover:-translate-y-1">
                      <div className="relative h-56 overflow-hidden">
                        <img
                          src={place.image_urls?.[0] || "/placeholder.svg"}
                          alt={place.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute top-3 left-3 flex gap-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${difficultyColor[place.difficulty] || "bg-muted text-muted-foreground"}`}>
                            {place.difficulty}
                          </span>
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-card/90 backdrop-blur-sm text-card-foreground">
                            {place.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-5">
                        <div className="flex items-center gap-1 text-muted-foreground text-sm mb-2">
                          <MapPin className="h-3.5 w-3.5" />
                          <span>{place.location}</span>
                        </div>
                        <h3 className="font-display text-xl font-bold text-card-foreground mb-3 group-hover:text-primary transition-colors">
                          {place.name}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                          {place.elevation && (
                            <div className="flex items-center gap-1">
                              <Mountain className="h-3.5 w-3.5" />
                              <span>{place.elevation}</span>
                            </div>
                          )}
                          {place.duration && (
                            <div className="flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5" />
                              <span>{place.duration}</span>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <Star className="h-4 w-4 fill-secondary text-secondary" />
                            <span className="font-semibold text-card-foreground">{Number(place.rating || 0).toFixed(1)}</span>
                            <span className="text-muted-foreground text-sm">({place.review_count || 0})</span>
                          </div>
                          {place.best_season && (
                            <span className="text-sm font-medium text-primary">
                              Best: {place.best_season}
                            </span>
                          )}
                        </div>
                      </div>
                    </article>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

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
