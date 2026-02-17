import { Compass, Map, Shield, Users } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  { icon: Map, title: "Seasonal Guides", desc: "Know exactly when to visit for the best experience" },
  { icon: Compass, title: "Packing Lists", desc: "Curated essentials and what to avoid for every destination" },
  { icon: Shield, title: "Safety Tips", desc: "Stay prepared with location-specific safety guidance" },
  { icon: Users, title: "Real Reviews", desc: "Community-driven insights from verified travelers" },
];

const FeaturesSection = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Everything in One Place
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            No more juggling YouTube, blogs, and scattered reviews. Get complete travel preparation in a single dashboard.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-lg p-6 shadow-card text-center"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <f.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold text-card-foreground mb-2">{f.title}</h3>
              <p className="text-muted-foreground text-sm">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
