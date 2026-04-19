import { motion } from 'motion/react';
import { Bot, Zap, LineChart, Code2 } from 'lucide-react';

const services = [
  {
    icon: <Bot className="w-8 h-8 text-blue-400" />,
    title: "AI Chatbots & Agents",
    description: "Custom AI agents that handle customer support, lead qualification, and internal queries 24/7."
  },
  {
    icon: <Zap className="w-8 h-8 text-purple-400" />,
    title: "Workflow Automation",
    description: "Connect your apps and automate repetitive tasks to save hundreds of hours every month."
  },
  {
    icon: <LineChart className="w-8 h-8 text-green-400" />,
    title: "Data Analytics & BI",
    description: "Turn raw operations data into actionable insights with automated reporting dashboards."
  },
  {
    icon: <Code2 className="w-8 h-8 text-orange-400" />,
    title: "Custom Integrations",
    description: "Bespoke software solutions bridging the gap between legacy systems and modern APIs."
  }
];

export default function Services() {
  return (
    <section id="services" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-6"
          >
            What We Do
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 max-w-2xl mx-auto text-lg"
          >
            We leverage artificial intelligence to build scalable systems that reduce overhead and increase revenue.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 + 0.2 }}
              className="glass-card p-[30px] flex flex-col justify-between hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="w-[40px] h-[40px] bg-white/5 border-subtle rounded-lg flex items-center justify-center mb-[20px]">
                {service.icon}
              </div>
              <h3 className="text-[18px] font-bold mb-[8px]">{service.title}</h3>
              <p className="text-secondary leading-[1.5] text-[14px]">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
