"use client";

import { motion, useInView } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useRef } from "react";
import { fadeInUp, staggerContainer } from "@/lib/utils";

const stats = [
  { value: "+5.000", label: "Estofados Higienizados" },
  { value: "98%", label: "Clientes Satisfeitos" },
  { value: "+8 anos", label: "De Experiência" },
  { value: "4.9★", label: "Avaliação Média" },
];

const testimonials = [
  { name: "Mariana Costa", location: "São Paulo, SP", rating: 5, text: "Meu sofá ficou como novo! Tinha manchas de café que eu achava impossíveis de tirar. O João Carlos removeu tudo em menos de 2 horas. Recomendo muito!", service: "Sofá 3 Lugares" },
  { name: "Roberto Alves", location: "Santo André, SP", rating: 5, text: "Excelente atendimento! Pontual, profissional e o resultado superou minhas expectativas. Meu colchão estava com cheiro ruim por causa do meu cachorro — ficou perfeitinho.", service: "Colchão Casal + Sofá" },
  { name: "Fernanda Lima", location: "Guarulhos, SP", rating: 5, text: "Tenho uma filha com alergia e fiquei preocupada com os produtos. O João me explicou tudo, os produtos são super seguros. Minha filha dormiu muito melhor depois da higienização!", service: "Colchão Solteiro" },
  { name: "Carlos Mendes", location: "Osasco, SP", rating: 5, text: "Preço justo, serviço de qualidade e ainda me ensinaram como manter limpo por mais tempo. O sofá secou em 3 horas como prometido.", service: "Sofá Retrátil" },
  { name: "Patrícia Souza", location: "São Bernardo, SP", rating: 5, text: "Já contratei 3 vezes. É o melhor da região sem dúvida. Sempre pontual e o resultado é incrível. Meus clientes ficam sempre perguntando onde faço a higienização!", service: "Combo Casa Completa" },
  { name: "André Oliveira", location: "Mauá, SP", rating: 5, text: "Tinha dúvidas se realmente valia, mas agora sou fã. O serviço é muito mais profundo do que qualquer produto que comprei na farmácia. Vale cada centavo.", service: "Colchão Casal" },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-neutral-300"}`} />
      ))}
    </div>
  );
}

export default function SocialProof() {
  const statsRef = useRef(null);
  const cardsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-100px" });
  const cardsInView = useInView(cardsRef, { once: true, margin: "-100px" });

  return (
    <section className="bg-neutral-50 section-padding">
      <div className="max-w-7xl mx-auto">
        <motion.div initial="hidden" animate={statsInView ? "visible" : "hidden"} variants={staggerContainer} ref={statsRef} className="text-center mb-16">
          <motion.span variants={fadeInUp} className="inline-block bg-yellow-100 text-yellow-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">Confiança comprovada</motion.span>
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-neutral-900 mb-4">O que nossos clientes <span className="text-primary-600">dizem</span></motion.h2>
          <motion.p variants={fadeInUp} className="text-neutral-600 text-lg max-w-xl mx-auto">Mais de 5.000 famílias já confiam na qualidade do nosso trabalho.</motion.p>
        </motion.div>
        <motion.div variants={staggerContainer} initial="hidden" animate={statsInView ? "visible" : "hidden"} className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat) => (
            <motion.div key={stat.label} variants={fadeInUp} className="text-center bg-white rounded-2xl p-6 border border-neutral-200 shadow-sm">
              <p className="text-3xl md:text-4xl font-extrabold text-primary-600 mb-1">{stat.value}</p>
              <p className="text-neutral-600 text-sm font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
        <motion.div ref={cardsRef} variants={staggerContainer} initial="hidden" animate={cardsInView ? "visible" : "hidden"} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <motion.div key={t.name} variants={fadeInUp} whileHover={{ y: -4, transition: { duration: 0.2 } }} className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-sm hover:shadow-md hover:border-primary-100 transition-all duration-200 flex flex-col gap-4">
              <Quote className="w-8 h-8 text-primary-200 flex-shrink-0" />
              <p className="text-neutral-700 text-sm leading-relaxed flex-1">{t.text}</p>
              <div className="flex items-center gap-3 pt-2 border-t border-neutral-100">
                <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center font-bold text-primary-600">{t.name[0]}</div>
                <div className="flex-1">
                  <p className="font-semibold text-neutral-800 text-sm">{t.name}</p>
                  <p className="text-neutral-500 text-xs">{t.location}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <StarRating rating={t.rating} />
                  <span className="text-xs text-neutral-400">{t.service}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
