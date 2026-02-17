import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { Users, MessageSquare, Heart } from "lucide-react";

const Community = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Community
            </h1>
            <p className="text-muted-foreground text-lg mb-12 max-w-2xl mx-auto">
              Connect with fellow adventurers, share stories, and get advice from experienced travelers.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Users, title: "Fellow Travelers", desc: "Connect with like-minded adventurers from around the world." },
              { icon: MessageSquare, title: "Travel Stories", desc: "Share your experiences and learn from others' journeys." },
              { icon: Heart, title: "Tips & Advice", desc: "Get and give advice on destinations, gear, and safety." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (i + 1) }}
                className="bg-card rounded-lg p-6 shadow-card"
              >
                <item.icon className="h-10 w-10 text-primary mx-auto mb-4" />
                <h3 className="font-display text-lg font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-muted-foreground mt-12 text-sm"
          >
            Community features are coming soon. Start by adding places and reviews!
          </motion.p>
        </div>
      </div>
    </div>
  );
};

export default Community;
