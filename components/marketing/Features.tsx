"use client";

import { motion, useInView } from "framer-motion";
import { Leaf, MapPin, Zap } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/utils";
import { useRef } from "react";

const features = [
  { icon: Zap, color: "bg-primary-100 text-primary-600", title: "Tecnologia de Extração Química", description: "Utilizamos maquinário profissional de ponta que injeta solução e extrai sujidade, ácaros e alérgenos com alta pressão — resultado impossível com métodos caseiros.", highlight: "Poder industrial" },
  { icon: Leaf, color: "bg-green-100 text-green-600", title: "Produtos Biodegradáveis e Seguros", description: "Toda a nossa linha de produtos é certificada, biodegradável e 100% segura para pets, crianças e pessoas com alergias. Sem químicos agressivos ou cheiros fortes.", highlight: "Eco-friendly" },
  { icon: MapPin, color: "bg-orange-100 text-orange-600", title: "Atendimento a Domicílio com Secagem Rápida", description: "Vamos até você! Sem precisar carregar nada. Nosso processo de secagem acelerada deixa seu estofado pronto para uso em até 4 horas.", highlight: "Secagem em 4h" },
];

export default function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="servicos" className="bg-white section-padding">
      <div className="max-w-7xl mx-auto">
        <motion.div ref={ref} variants={staggerContainer} initial="hidden" animate={isInView ? "visible" : "hidden"} className="text-center mb-16">
          <motion.span variants={fadeInUp} className="inline-block bg-primary-100 text-primary-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">Por que nos escolher</motion.span>
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-neutral-900 mb-4 text-balance">Nossos <span className="text-primary-600">Diferenciais</span></motion.h2>
          <motion.p variants={fadeInUp} className="text-neutral-600 text-lg max-w-2xl mx-auto">Combinamos tecnologia profissional, produtos seguros e comodidade para entregar resultados que você pode ver e sentir.</motion.p>
        </motion.div>
        <motion.div variants={staggerContainer} initial="hidden" animate={isInView ? "visible" : "hidden"} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <motion.div key={feature.title} variants={fadeInUp} whileHover={{ y: -8, transition: { duration: 0.2 } }} className="group relative bg-neutral-50 rounded-3xl p-8 border border-neutral-200 hover:border-primary-200 hover:shadow-xl hover:shadow-primary-100 transition-all duration-300 cursor-default">
              <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-7 h-7" />
              </div>
              <span className="inline-block text-xs font-bold text-primary-600 bg-primary-50 px-3 py-1 rounded-full mb-3">{feature.highlight}</span>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">{feature.title}</h3>
              <p className="text-neutral-600 leading-relaxed text-sm">{feature.description}</p>
              <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-primary-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
