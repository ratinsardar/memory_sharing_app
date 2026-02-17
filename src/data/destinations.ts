import destMountains from "@/assets/dest-mountains.jpg";
import destBeach from "@/assets/dest-beach.jpg";
import destForest from "@/assets/dest-forest.jpg";
import destTemple from "@/assets/dest-temple.jpg";

export interface Destination {
  id: string;
  name: string;
  location: string;
  image: string;
  difficulty: "Easy" | "Moderate" | "Hard" | "Expert";
  bestSeason: string;
  rating: number;
  reviewCount: number;
  category: string;
  elevation?: string;
  duration?: string;
  description: string;
  seasonalInfo: {
    best: string;
    okay: string;
    avoid: string;
  };
  packingList: { essential: string[]; optional: string[]; avoid: string[] };
  safetyTips: string[];
  reviews: Review[];
}

export interface Review {
  id: string;
  author: string;
  avatar: string;
  date: string;
  rating: number;
  text: string;
  visitedSeason: string;
}

export const destinations: Destination[] = [
  {
    id: "annapurna-base-camp",
    name: "Annapurna Base Camp",
    location: "Nepal, Himalayas",
    image: destMountains,
    difficulty: "Moderate",
    bestSeason: "Oct – Dec",
    rating: 4.8,
    reviewCount: 1243,
    category: "Trekking",
    elevation: "4,130m",
    duration: "7–12 days",
    description: "One of the most popular treks in Nepal, Annapurna Base Camp offers breathtaking views of the Annapurna massif. The trail passes through diverse landscapes from lush subtropical forests to alpine meadows.",
    seasonalInfo: {
      best: "October to December – Clear skies, stable weather, stunning mountain views. Best visibility for photography.",
      okay: "March to May – Warmer temperatures, rhododendron blooms, but occasional afternoon clouds.",
      avoid: "June to September – Monsoon season brings heavy rain, leeches, landslide risks, and poor visibility.",
    },
    packingList: {
      essential: ["Trekking boots (broken in)", "Layered clothing", "Rain jacket", "Sleeping bag (-10°C)", "Trekking poles", "Water purification tablets", "First aid kit", "Sunscreen SPF 50+", "Headlamp"],
      optional: ["Camera with extra batteries", "Power bank", "Snacks/energy bars", "Trekking gaiters"],
      avoid: ["Heavy jeans", "Cotton t-shirts", "Large suitcases", "Excessive electronics"],
    },
    safetyTips: [
      "Acclimatize properly — don't ascend more than 500m per day above 3,000m",
      "Carry altitude sickness medication (Diamox)",
      "Always trek with a guide or in a group",
      "Register with TIMS and get the Annapurna Conservation Area Permit",
      "Keep emergency contacts and embassy details handy",
    ],
    reviews: [
      { id: "r1", author: "Sarah Mitchell", avatar: "SM", date: "Nov 2025", rating: 5, text: "Absolutely life-changing experience! The views at sunrise from ABC were surreal. Make sure to acclimatize at Deurali.", visitedSeason: "Autumn" },
      { id: "r2", author: "Raj Patel", avatar: "RP", date: "Oct 2025", rating: 4, text: "Great trek but challenging. The stone steps near Sinuwa were tough on the knees. Highly recommend trekking poles.", visitedSeason: "Autumn" },
      { id: "r3", author: "Emma Chen", avatar: "EC", date: "Mar 2025", rating: 5, text: "Spring trek was magical with rhododendrons in bloom. Slightly cloudy afternoons but morning views were perfect.", visitedSeason: "Spring" },
    ],
  },
  {
    id: "bali-beaches",
    name: "Bali Coastal Trail",
    location: "Bali, Indonesia",
    image: destBeach,
    difficulty: "Easy",
    bestSeason: "Apr – Oct",
    rating: 4.6,
    reviewCount: 2891,
    category: "Beach & Culture",
    duration: "5–7 days",
    description: "Explore Bali's stunning coastline from the cliffs of Uluwatu to the black sand beaches of the north. Perfect blend of relaxation, culture, and light adventure.",
    seasonalInfo: {
      best: "April to October – Dry season with sunny days, calm seas, ideal for surfing and temple visits.",
      okay: "November – Transition month, occasional rain but fewer crowds.",
      avoid: "December to March – Wet season with daily heavy rains and rough seas.",
    },
    packingList: {
      essential: ["Light breathable clothing", "Reef-safe sunscreen", "Sarong (for temples)", "Water shoes", "Insect repellent", "Reusable water bottle"],
      optional: ["Snorkeling gear", "Waterproof phone pouch", "Surfboard rental"],
      avoid: ["Heavy boots", "Dark thick clothing", "Valuable jewelry"],
    },
    safetyTips: [
      "Be cautious of strong currents — swim at flagged beaches only",
      "Respect temple dress codes (cover shoulders and knees)",
      "Negotiate taxi fares before getting in or use ride-hailing apps",
      "Stay hydrated — the tropical heat can be deceptive",
    ],
    reviews: [
      { id: "r4", author: "Tom Hartley", avatar: "TH", date: "Jul 2025", rating: 5, text: "Paradise on earth. The Uluwatu sunset was worth the entire trip. Budget-friendly and incredibly welcoming people.", visitedSeason: "Summer" },
      { id: "r5", author: "Lisa Wong", avatar: "LW", date: "May 2025", rating: 4, text: "Loved Ubud's rice terraces and the beachfront dining. Book accommodations early for peak season.", visitedSeason: "Spring" },
    ],
  },
  {
    id: "amazon-rainforest",
    name: "Amazon Rainforest Trek",
    location: "Manaus, Brazil",
    image: destForest,
    difficulty: "Hard",
    bestSeason: "Jun – Nov",
    rating: 4.7,
    reviewCount: 567,
    category: "Jungle & Wildlife",
    elevation: "Sea level",
    duration: "4–8 days",
    description: "Immerse yourself in the world's largest tropical rainforest. Spot exotic wildlife, navigate winding rivers, and experience indigenous cultures in this raw wilderness adventure.",
    seasonalInfo: {
      best: "June to November – Dry season with lower water levels, easier trail access, and better wildlife spotting.",
      okay: "December to February – Rising waters open up flooded forest canoe exploration.",
      avoid: "March to May – Peak flood season; many trails impassable, extreme humidity.",
    },
    packingList: {
      essential: ["Waterproof hiking boots", "Long-sleeve shirts", "DEET insect repellent", "Waterproof dry bag", "Hammock with mosquito net", "Water purification system", "Machete (guide-provided)"],
      optional: ["Binoculars", "Field guide books", "GoPro/waterproof camera"],
      avoid: ["Perfume or cologne", "Bright colored clothing", "Open-toe shoes"],
    },
    safetyTips: [
      "Never swim in unknown waters — piranhas and caimans are real threats",
      "Get vaccinated (Yellow Fever is mandatory, Malaria prophylaxis recommended)",
      "Always follow your guide's instructions — the jungle is disorientating",
      "Keep all food sealed to avoid attracting wildlife to camp",
    ],
    reviews: [
      { id: "r6", author: "Marco Silva", avatar: "MS", date: "Sep 2025", rating: 5, text: "The most humbling experience of my life. Saw pink river dolphins, toucans, and even a jaguar from the canoe!", visitedSeason: "Dry Season" },
    ],
  },
  {
    id: "hampi-ruins",
    name: "Hampi Heritage Walk",
    location: "Karnataka, India",
    image: destTemple,
    difficulty: "Easy",
    bestSeason: "Oct – Feb",
    rating: 4.5,
    reviewCount: 1892,
    category: "Heritage & Culture",
    duration: "2–4 days",
    description: "Walk among the ruins of the ancient Vijayanagara Empire. Boulder-strewn landscapes, magnificent temples, and a backpacker-friendly atmosphere make Hampi unforgettable.",
    seasonalInfo: {
      best: "October to February – Cool, pleasant weather perfect for walking and exploring ruins.",
      okay: "March – Warming up but still manageable with early morning starts.",
      avoid: "April to September – Extreme heat (40°C+) or monsoon rains make exploration difficult.",
    },
    packingList: {
      essential: ["Comfortable walking shoes", "Wide-brimmed hat", "Sunscreen", "2L water bottle", "Light cotton clothing", "Guidebook or audio tour app"],
      optional: ["Bicycle rental", "Sketch pad", "Telephoto lens for architecture"],
      avoid: ["High heels", "Revealing clothing (temple dress codes)", "Heavy backpacks"],
    },
    safetyTips: [
      "Start explorations early morning to avoid midday heat",
      "Carry enough water — shade is limited between ruins",
      "Be careful climbing boulders — the rocks can be slippery",
      "Keep valuables secure; tourist areas attract petty theft",
    ],
    reviews: [
      { id: "r7", author: "Ananya Sharma", avatar: "AS", date: "Dec 2025", rating: 5, text: "Hampi is a photographer's dream! The sunset from Matanga Hill is unmissable. Stay on the hippie island side for the best vibes.", visitedSeason: "Winter" },
      { id: "r8", author: "David Brooks", avatar: "DB", date: "Jan 2025", rating: 4, text: "Fascinating history and incredible architecture. Rent a bicycle to cover more ground. The coracle ride is a must!", visitedSeason: "Winter" },
    ],
  },
];

export const difficultyColor: Record<string, string> = {
  Easy: "bg-primary/15 text-primary",
  Moderate: "bg-amber/15 text-amber",
  Hard: "bg-destructive/15 text-destructive",
  Expert: "bg-destructive/20 text-destructive",
};
