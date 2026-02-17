import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { Compass, Shield, Map, Users } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              About TrailMate
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Your smart travel companion — built for adventurers, by adventurers. We bring together real photos, structured reviews, seasonal recommendations, packing advice, safety tips, and more in one unified platform.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: Compass, title: "Smart Guidance", desc: "Get complete preparation dashboards with seasonal info, difficulty ratings, and packing guides for every destination." },
              { icon: Shield, title: "Safety First", desc: "Access verified safety tips, required permits, and local regulations before you travel." },
              { icon: Map, title: "Real Locations", desc: "Browse community-verified destinations with real photos and honest reviews from fellow travelers." },
              { icon: Users, title: "Community Driven", desc: "Share your experiences, contribute new destinations, and help others plan their perfect trip." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (i + 1) }}
                className="bg-card rounded-lg p-6 shadow-card"
              >
                <item.icon className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-display text-xl font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
