import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface ReviewFormProps {
  placeId: string;
  onReviewAdded?: () => void;
}

const seasons = ["Spring", "Summer", "Autumn", "Winter", "Dry Season", "Wet Season"];

const ReviewForm = ({ placeId, onReviewAdded }: ReviewFormProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [text, setText] = useState("");
  const [visitedSeason, setVisitedSeason] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!user) {
    return (
      <div className="bg-card rounded-lg p-6 shadow-card text-center">
        <p className="text-muted-foreground mb-3">Log in to write a review</p>
        <Button size="sm" onClick={() => navigate("/auth")}>Login</Button>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast({ title: "Please select a rating", variant: "destructive" });
      return;
    }
    if (!text.trim()) {
      toast({ title: "Please write a review", variant: "destructive" });
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.from("reviews").insert({
      place_id: placeId,
      user_id: user.id,
      rating,
      text: text.trim(),
      visited_season: visitedSeason || null,
    });

    setSubmitting(false);
    if (error) {
      toast({ title: "Failed to submit review", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Review submitted!" });
      setRating(0);
      setText("");
      setVisitedSeason("");
      onReviewAdded?.();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-card rounded-lg p-6 shadow-card space-y-4">
      <h3 className="font-display text-lg font-bold text-card-foreground">Write a Review</h3>

      {/* Star Rating */}
      <div>
        <label className="text-sm font-medium text-foreground mb-1 block">Rating *</label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => setRating(star)}
              className="p-0.5"
            >
              <Star
                className={`h-6 w-6 transition-colors ${
                  star <= (hoverRating || rating)
                    ? "fill-secondary text-secondary"
                    : "text-muted-foreground/30"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Season */}
      <div>
        <label className="text-sm font-medium text-foreground mb-1 block">Season Visited</label>
        <div className="flex flex-wrap gap-2">
          {seasons.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setVisitedSeason(s === visitedSeason ? "" : s)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                visitedSeason === s
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Review Text */}
      <div>
        <label className="text-sm font-medium text-foreground mb-1 block">Your Review *</label>
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Share your experience..."
          rows={4}
        />
      </div>

      <Button type="submit" disabled={submitting}>
        {submitting ? "Submitting..." : "Submit Review"}
      </Button>
    </form>
  );
};

export default ReviewForm;
