import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import ReviewForm from "@/components/ReviewForm";
import { motion } from "framer-motion";
import {
  ArrowLeft, Star, MapPin, Mountain, Clock, Sun, CloudRain, AlertTriangle,
  CheckCircle2, XCircle, Package, Shield, ThumbsUp
} from "lucide-react";
import { difficultyColor } from "@/data/destinations";

const PlaceDetail = () => {
  const { id } = useParams();
  const [place, setPlace] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    if (!id) return;
    const { data } = await supabase.from("places").select("*").eq("id", id).single();
    setPlace(data);

    const { data: revs } = await supabase.from("reviews").select("*, profiles(display_name)").eq("place_id", id).order("created_at", { ascending: false });
    setReviews(revs || []);
    setLoading(false);
  }, [id]);

  useEffect(() => { fetchData(); }, [fetchData]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 flex items-center justify-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!place) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold text-foreground mb-4">Place not found</h1>
          <Link to="/" className="text-primary hover:underline">← Back to Explore</Link>
        </div>
      </div>
    );
  }

  const heroImage = place.image_urls?.[0] || "/placeholder.svg";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <div className="relative h-[50vh] min-h-[400px]">
        <img src={heroImage} alt={place.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="max-w-5xl mx-auto">
            <Link to="/" className="inline-flex items-center gap-1 text-primary-foreground/80 hover:text-primary-foreground text-sm mb-4 transition-colors">
              <ArrowLeft className="h-4 w-4" /> Back to Explore
            </Link>
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${difficultyColor[place.difficulty] || "bg-muted text-muted-foreground"}`}>
                {place.difficulty}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-card/20 backdrop-blur-sm text-primary-foreground">
                {place.category}
              </span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-2">{place.name}</h1>
            <div className="flex flex-wrap items-center gap-4 text-primary-foreground/80 text-sm">
              <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{place.location}</span>
              {place.elevation && <span className="flex items-center gap-1"><Mountain className="h-4 w-4" />{place.elevation}</span>}
              {place.duration && <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{place.duration}</span>}
              <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-secondary text-secondary" />{Number(place.rating || 0).toFixed(1)} ({place.review_count || 0} reviews)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10 space-y-10">
        {place.description && (
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-foreground text-lg leading-relaxed">{place.description}</p>
          </motion.section>
        )}

        {/* Seasonal Info */}
        {(place.season_best || place.season_okay || place.season_avoid) && (
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <h2 className="font-display text-2xl font-bold text-foreground mb-5 flex items-center gap-2">
              <Sun className="h-6 w-6 text-secondary" /> When to Visit
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {place.season_best && (
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-5">
                  <div className="flex items-center gap-2 mb-2"><CheckCircle2 className="h-5 w-5 text-primary" /><span className="font-semibold text-primary">Best Season</span></div>
                  <p className="text-foreground text-sm leading-relaxed">{place.season_best}</p>
                </div>
              )}
              {place.season_okay && (
                <div className="bg-secondary/5 border border-secondary/20 rounded-lg p-5">
                  <div className="flex items-center gap-2 mb-2"><CloudRain className="h-5 w-5 text-secondary" /><span className="font-semibold text-secondary">Okay Season</span></div>
                  <p className="text-foreground text-sm leading-relaxed">{place.season_okay}</p>
                </div>
              )}
              {place.season_avoid && (
                <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-5">
                  <div className="flex items-center gap-2 mb-2"><AlertTriangle className="h-5 w-5 text-destructive" /><span className="font-semibold text-destructive">Avoid</span></div>
                  <p className="text-foreground text-sm leading-relaxed">{place.season_avoid}</p>
                </div>
              )}
            </div>
          </motion.section>
        )}

        {/* Packing List */}
        {(place.packing_essential?.length > 0 || place.packing_optional?.length > 0 || place.packing_avoid?.length > 0) && (
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h2 className="font-display text-2xl font-bold text-foreground mb-5 flex items-center gap-2">
              <Package className="h-6 w-6 text-secondary" /> Packing Guide
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {place.packing_essential?.length > 0 && (
                <div className="bg-card rounded-lg p-5 shadow-card">
                  <h3 className="font-semibold text-primary mb-3 flex items-center gap-2"><CheckCircle2 className="h-4 w-4" /> Essential</h3>
                  <ul className="space-y-2">{place.packing_essential.map((item: string) => <li key={item} className="text-sm text-foreground flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />{item}</li>)}</ul>
                </div>
              )}
              {place.packing_optional?.length > 0 && (
                <div className="bg-card rounded-lg p-5 shadow-card">
                  <h3 className="font-semibold text-secondary mb-3 flex items-center gap-2"><ThumbsUp className="h-4 w-4" /> Optional</h3>
                  <ul className="space-y-2">{place.packing_optional.map((item: string) => <li key={item} className="text-sm text-foreground flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 shrink-0" />{item}</li>)}</ul>
                </div>
              )}
              {place.packing_avoid?.length > 0 && (
                <div className="bg-card rounded-lg p-5 shadow-card">
                  <h3 className="font-semibold text-destructive mb-3 flex items-center gap-2"><XCircle className="h-4 w-4" /> Avoid Bringing</h3>
                  <ul className="space-y-2">{place.packing_avoid.map((item: string) => <li key={item} className="text-sm text-foreground flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-destructive mt-1.5 shrink-0" />{item}</li>)}</ul>
                </div>
              )}
            </div>
          </motion.section>
        )}

        {/* Safety */}
        {place.safety_tips?.length > 0 && (
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <h2 className="font-display text-2xl font-bold text-foreground mb-5 flex items-center gap-2">
              <Shield className="h-6 w-6 text-secondary" /> Safety Tips
            </h2>
            <div className="bg-card rounded-lg p-6 shadow-card space-y-3">
              {place.safety_tips.map((tip: string, i: number) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold shrink-0 mt-0.5">{i + 1}</span>
                  <p className="text-foreground text-sm leading-relaxed">{tip}</p>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Reviews */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <h2 className="font-display text-2xl font-bold text-foreground mb-5">Community Reviews</h2>

          <ReviewForm placeId={id!} onReviewAdded={fetchData} />

          {reviews.length > 0 ? (
            <div className="space-y-4 mt-6">
              {reviews.map((review) => (
                <div key={review.id} className="bg-card rounded-lg p-5 shadow-card">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                      {(review.profiles?.display_name || "U").slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-card-foreground text-sm">{review.profiles?.display_name || "User"}</p>
                      <p className="text-muted-foreground text-xs">{new Date(review.created_at).toLocaleDateString()}{review.visited_season && ` · ${review.visited_season}`}</p>
                    </div>
                    <div className="ml-auto flex items-center gap-1">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-secondary text-secondary" />
                      ))}
                    </div>
                  </div>
                  <p className="text-foreground text-sm leading-relaxed">{review.text}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8 mt-4">No reviews yet. Be the first to review!</p>
          )}
        </motion.section>
      </div>

      <footer className="border-t border-border py-10 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-muted-foreground text-sm">© 2026 TrailMate — Your smart travel companion.</p>
        </div>
      </footer>
    </div>
  );
};

export default PlaceDetail;
