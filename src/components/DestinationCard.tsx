import { Star, MapPin, Mountain, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { type Destination, difficultyColor } from "@/data/destinations";

interface DestinationCardProps {
  destination: Destination;
  index: number;
}

const DestinationCard = ({ destination, index }: DestinationCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link to={`/destination/${destination.id}`} className="group block">
        <article className="bg-card rounded-lg overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 group-hover:-translate-y-1">
          {/* Image */}
          <div className="relative h-56 overflow-hidden">
            <img
              src={destination.image}
              alt={destination.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute top-3 left-3 flex gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${difficultyColor[destination.difficulty]}`}>
                {destination.difficulty}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-card/90 backdrop-blur-sm text-card-foreground">
                {destination.category}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            <div className="flex items-center gap-1 text-muted-foreground text-sm mb-2">
              <MapPin className="h-3.5 w-3.5" />
              <span>{destination.location}</span>
            </div>

            <h3 className="font-display text-xl font-bold text-card-foreground mb-3 group-hover:text-primary transition-colors">
              {destination.name}
            </h3>

            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
              {destination.elevation && (
                <div className="flex items-center gap-1">
                  <Mountain className="h-3.5 w-3.5" />
                  <span>{destination.elevation}</span>
                </div>
              )}
              {destination.duration && (
                <div className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{destination.duration}</span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Star className="h-4 w-4 fill-secondary text-secondary" />
                <span className="font-semibold text-card-foreground">{destination.rating}</span>
                <span className="text-muted-foreground text-sm">({destination.reviewCount.toLocaleString()})</span>
              </div>
              <span className="text-sm font-medium text-primary">
                Best: {destination.bestSeason}
              </span>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
};

export default DestinationCard;
