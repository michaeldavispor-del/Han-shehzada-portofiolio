import { motion } from 'motion/react';

const projects = [
  {
    title: "Global E-Com Assistant",
    category: "AI Agent",
    image: "https://picsum.photos/seed/tech1/800/600?blur=4",
    stat: "40% reduction in support tickets"
  },
  {
    title: "Logistics Dashboard",
    category: "Internal Tooling",
    image: "https://picsum.photos/seed/tech2/800/600?blur=4",
    stat: "12 hours saved weekly"
  },
  {
    title: "Finance Auto-Reconciliation",
    category: "Workflow Automation",
    image: "https://picsum.photos/seed/tech3/800/600?blur=4",
    stat: "99.9% accuracy rate"
  }
];

export default function Portfolio() {
  return (
    <section id="work" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold mb-6"
            >
              Featured <span className="text-accent">Work</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-secondary max-w-xl text-lg"
            >
              Explore how we've helped businesses transform their operations through strategic automation.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <button className="btn-secondary">
              View All Projects
            </button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-2xl mb-6 aspect-[4/3] bg-surface border-subtle">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-100"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                  <div className="glass px-4 py-2 rounded-full">
                    <p className="text-sm font-medium text-accent">{project.stat}</p>
                  </div>
                </div>
              </div>
              <div className="px-2">
                <p className="text-sm text-secondary uppercase tracking-wider mb-2 font-medium">{project.category}</p>
                <h3 className="text-2xl font-bold group-hover:text-accent transition-colors">{project.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
