import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Upload, X, Star } from "lucide-react";
import { motion } from "framer-motion";

const DIFFICULTIES = ["Easy", "Moderate", "Hard", "Expert"];
const CATEGORIES = ["Trekking", "Beach & Culture", "Jungle & Wildlife", "Heritage & Culture", "Mountain", "Desert", "Urban", "General"];
const SEASONS = ["Spring", "Summer", "Autumn", "Winter", "Dry Season", "Wet Season"];

const AddPlace = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  // Form state
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("General");
  const [difficulty, setDifficulty] = useState("Easy");
  const [bestSeason, setBestSeason] = useState("");
  const [elevation, setElevation] = useState("");
  const [duration, setDuration] = useState("");
  const [seasonBest, setSeasonBest] = useState("");
  const [seasonOkay, setSeasonOkay] = useState("");
  const [seasonAvoid, setSeasonAvoid] = useState("");
  const [packingEssential, setPackingEssential] = useState("");
  const [packingOptional, setPackingOptional] = useState("");
  const [packingAvoid, setPackingAvoid] = useState("");
  const [safetyTips, setSafetyTips] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  // Review fields
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [reviewSeason, setReviewSeason] = useState("");

  useEffect(() => {
    if (!authLoading && !user) navigate("/auth");
  }, [user, authLoading, navigate]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (images.length + files.length > 5) {
      toast({ title: "Max 5 images allowed", variant: "destructive" });
      return;
    }
    const newImages = [...images, ...files];
    setImages(newImages);
    const previews = newImages.map((f) => URL.createObjectURL(f));
    setImagePreviews(previews);
  };

  const removeImage = (idx: number) => {
    const newImages = images.filter((_, i) => i !== idx);
    setImages(newImages);
    setImagePreviews(newImages.map((f) => URL.createObjectURL(f)));
  };

  const splitItems = (text: string) => text.split("\n").map((s) => s.trim()).filter(Boolean);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (!name.trim() || !location.trim()) {
      toast({ title: "Name and location are required", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      // Upload images
      const imageUrls: string[] = [];
      for (const file of images) {
        const ext = file.name.split(".").pop();
        const path = `${user.id}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
        const { error: uploadError } = await supabase.storage.from("place-images").upload(path, file);
        if (uploadError) throw uploadError;
        const { data: urlData } = supabase.storage.from("place-images").getPublicUrl(path);
        imageUrls.push(urlData.publicUrl);
      }

      // Create place
      const { data: place, error: placeError } = await supabase.from("places").insert({
        user_id: user.id,
        name: name.trim(),
        location: location.trim(),
        description: description.trim(),
        category,
        difficulty,
        best_season: bestSeason || null,
        elevation: elevation || null,
        duration: duration || null,
        season_best: seasonBest || null,
        season_okay: seasonOkay || null,
        season_avoid: seasonAvoid || null,
        packing_essential: splitItems(packingEssential),
        packing_optional: splitItems(packingOptional),
        packing_avoid: splitItems(packingAvoid),
        safety_tips: splitItems(safetyTips),
        latitude: latitude ? parseFloat(latitude) : null,
        longitude: longitude ? parseFloat(longitude) : null,
        image_urls: imageUrls,
      }).select().single();

      if (placeError) throw placeError;

      // Create initial review if provided
      if (reviewText.trim()) {
        const { error: reviewError } = await supabase.from("reviews").insert({
          place_id: place.id,
          user_id: user.id,
          rating: reviewRating,
          text: reviewText.trim(),
          visited_season: reviewSeason || null,
        });
        if (reviewError) throw reviewError;
      }

      toast({ title: "Place added!", description: `${name} has been published.` });
      navigate(`/place/${place.id}`);
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">Add a New Place</h1>
            <p className="text-muted-foreground mb-8">Share a destination with the TrailMate community</p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Info */}
            <section className="bg-card rounded-lg p-6 shadow-card space-y-4">
              <h2 className="font-display text-xl font-bold text-foreground">Basic Information</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Place Name *</Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Everest Base Camp" required maxLength={200} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. Nepal, Himalayas" required maxLength={200} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Tell travelers what makes this place special..." rows={4} maxLength={2000} />
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Difficulty</Label>
                  <Select value={difficulty} onValueChange={setDifficulty}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{DIFFICULTIES.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="elevation">Elevation</Label>
                  <Input id="elevation" value={elevation} onChange={(e) => setElevation(e.target.value)} placeholder="e.g. 5,364m" maxLength={50} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Input id="duration" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="e.g. 12-14 days" maxLength={50} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bestSeason">Best Season Summary</Label>
                <Input id="bestSeason" value={bestSeason} onChange={(e) => setBestSeason(e.target.value)} placeholder="e.g. Oct – Dec" maxLength={100} />
              </div>
            </section>

            {/* Photos */}
            <section className="bg-card rounded-lg p-6 shadow-card space-y-4">
              <h2 className="font-display text-xl font-bold text-foreground">Photos</h2>
              <div className="flex flex-wrap gap-3">
                {imagePreviews.map((src, i) => (
                  <div key={i} className="relative w-24 h-24 rounded-lg overflow-hidden">
                    <img src={src} alt="" className="w-full h-full object-cover" />
                    <button type="button" onClick={() => removeImage(i)} className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-0.5">
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
                {images.length < 5 && (
                  <label className="w-24 h-24 rounded-lg border-2 border-dashed border-border flex items-center justify-center cursor-pointer hover:border-primary transition-colors">
                    <Upload className="h-6 w-6 text-muted-foreground" />
                    <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" multiple />
                  </label>
                )}
              </div>
              <p className="text-muted-foreground text-xs">Upload up to 5 photos (max 5MB each)</p>
            </section>

            {/* Seasonal Info */}
            <section className="bg-card rounded-lg p-6 shadow-card space-y-4">
              <h2 className="font-display text-xl font-bold text-foreground">Seasonal Guide</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="seasonBest">Best Season Details</Label>
                  <Textarea id="seasonBest" value={seasonBest} onChange={(e) => setSeasonBest(e.target.value)} placeholder="When is the best time to visit and why?" rows={2} maxLength={500} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="seasonOkay">Okay Season Details</Label>
                  <Textarea id="seasonOkay" value={seasonOkay} onChange={(e) => setSeasonOkay(e.target.value)} placeholder="When is it still acceptable but not ideal?" rows={2} maxLength={500} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="seasonAvoid">Avoid Season Details</Label>
                  <Textarea id="seasonAvoid" value={seasonAvoid} onChange={(e) => setSeasonAvoid(e.target.value)} placeholder="When should travelers avoid this place?" rows={2} maxLength={500} />
                </div>
              </div>
            </section>

            {/* Packing & Safety */}
            <section className="bg-card rounded-lg p-6 shadow-card space-y-4">
              <h2 className="font-display text-xl font-bold text-foreground">Packing & Safety</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="packEss">Essential Items (one per line)</Label>
                  <Textarea id="packEss" value={packingEssential} onChange={(e) => setPackingEssential(e.target.value)} placeholder={"Trekking boots\nRain jacket\nFirst aid kit"} rows={4} maxLength={1000} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="packOpt">Optional Items (one per line)</Label>
                  <Textarea id="packOpt" value={packingOptional} onChange={(e) => setPackingOptional(e.target.value)} placeholder={"Camera\nPower bank\nSnacks"} rows={4} maxLength={1000} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="packAv">Avoid Bringing (one per line)</Label>
                  <Textarea id="packAv" value={packingAvoid} onChange={(e) => setPackingAvoid(e.target.value)} placeholder={"Heavy jeans\nCotton shirts"} rows={4} maxLength={1000} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="safety">Safety Tips (one per line)</Label>
                <Textarea id="safety" value={safetyTips} onChange={(e) => setSafetyTips(e.target.value)} placeholder={"Always trek with a guide\nCarry altitude sickness medication"} rows={4} maxLength={1000} />
              </div>
            </section>

            {/* Location coordinates */}
            <section className="bg-card rounded-lg p-6 shadow-card space-y-4">
              <h2 className="font-display text-xl font-bold text-foreground">Map Location</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="lat">Latitude</Label>
                  <Input id="lat" type="number" step="any" value={latitude} onChange={(e) => setLatitude(e.target.value)} placeholder="e.g. 28.5305" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lng">Longitude</Label>
                  <Input id="lng" type="number" step="any" value={longitude} onChange={(e) => setLongitude(e.target.value)} placeholder="e.g. 83.8779" />
                </div>
              </div>
              <p className="text-muted-foreground text-xs">You can find coordinates from Google Maps by right-clicking a location.</p>
            </section>

            {/* Initial Review */}
            <section className="bg-card rounded-lg p-6 shadow-card space-y-4">
              <h2 className="font-display text-xl font-bold text-foreground">Your Review</h2>
              <div className="flex items-center gap-2">
                <Label>Rating</Label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} type="button" onClick={() => setReviewRating(star)}>
                      <Star className={`h-6 w-6 ${star <= reviewRating ? "fill-secondary text-secondary" : "text-muted-foreground"}`} />
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="reviewText">Your Experience</Label>
                <Textarea id="reviewText" value={reviewText} onChange={(e) => setReviewText(e.target.value)} placeholder="Share your experience at this place..." rows={4} maxLength={2000} />
              </div>
              <div className="space-y-2">
                <Label>Season Visited</Label>
                <Select value={reviewSeason} onValueChange={setReviewSeason}>
                  <SelectTrigger><SelectValue placeholder="Select season" /></SelectTrigger>
                  <SelectContent>{SEASONS.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </section>

            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              {loading ? "Publishing..." : "Publish Place"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPlace;
