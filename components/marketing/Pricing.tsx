"use client";

import { motion, useInView } from "framer-motion";
import { Check, Star } from "lucide-react";
import { useRef } from "react";
import { fadeInUp, staggerContainer } from "@/lib/utils";

const plans = [
  {
    name: "Sofá Retrátil",
    emoji: "🛋️",
    price: "R$ 149",
    priceNote: "até 3 lugares",
    popular: false,
    description: "Ideal para sofás de até 3 lugares com tecidos padrão.",
    includes: [
      "Aspiração profunda",
      "Extração química completa",
      "Eliminação de ácaros e bactérias",
      "Neutralizador de odores",
      "Secagem acelerada (4-6h)",
    ],
    extra: "+ R$ 30 por lugar adicional",
    cta: "Agendar Serviço",
  },
  {
    name: "Colchão Casal",
    emoji: "🛏️",
    price: "R$ 179",
    priceNote: "casal / queen",
    popular: true,
    description: "O mais vendido. Elimina ácaros, fungos e manchas do colchão.",
    includes: [
      "Aspiração com sucção extra",
      "Extração química profunda",
      "Eliminação de ácaros, fungos e vírus",
      "Tratamento antiodor",
      "Impermeabilização (opcional +R$ 50)",
      "Certificado de higienização",
      "Secagem acelerada (4-6h)",
    ],
    extra: "Solteiro: R$ 129 | King: R$ 199",
    cta: "Quero Esse!",
  },
  {
    name: "Combo Casa Completa",
    emoji: "🏠",
    price: "R$ 399",
    priceNote: "sofá + 2 colchões",
    popular: false,
    description: "Higienize a casa toda com desconto especial e máxima comodidade.",
    includes: [
      "Sofá de até 3 lugares",
      "2 colchões (solteiro ou casal)",
      "Todos os itens dos planos anteriores",
      "Impermeabilização inclusa",
      "Certificado de higienização",
      "Prioridade no agendamento",
      "Desconto de 20% vs avulso",
    ],
    extra: "Adicionar mais itens: consultar",
    cta: "Melhor Custo-Benefício",
  },
];

export default function Pricing() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="precos" className="bg-white section-padding">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.span
            variants={fadeInUp}
            className="inline-block bg-primary-100 text-primary-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4"
          >
            Transparência total
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-neutral-900 mb-4"
          >
            Preços <span className="text-primary-600">Claros e Justos</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-neutral-600 text-lg max-w-xl mx-auto">
            Sem letras miúdas. Preço fechado antes de começar. Sem surpresas no final.
          </motion.p>
        </motion.div>

        {/* Plans */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch"
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={fadeInUp}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className={`relative rounded-3xl p-8 flex flex-col gap-6 border-2 transition-all duration-300 ${
                plan.popular
                  ? "gradient-primary text-white border-primary-500 shadow-2xl shadow-primary-200 scale-105"
                  : "bg-neutral-50 border-neutral-200 hover:border-primary-200 hover:shadow-xl hover:shadow-primary-100"
              }`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-yellow-400 text-yellow-900 font-bold text-xs px-4 py-1.5 rounded-full flex items-center gap-1 shadow-md">
                    <Star className="w-3 h-3 fill-yellow-900" />
                    Mais Popular
                  </span>
                </div>
              )}

              {/* Plan header */}
              <div>
                <span className="text-3xl mb-3 block">{plan.emoji}</span>
                <h3
                  className={`text-xl font-bold mb-1 ${
                    plan.popular ? "text-white" : "text-neutral-900"
                  }`}
                >
                  {plan.name}
                </h3>
                <p
                  className={`text-sm ${
                    plan.popular ? "text-white/80" : "text-neutral-500"
                  }`}
                >
                  {plan.description}
                </p>
              </div>

              {/* Price */}
              <div>
                <span
                  className={`text-4xl font-extrabold ${
                    plan.popular ? "text-white" : "text-neutral-900"
                  }`}
                >
                  {plan.price}
                </span>
                <span
                  className={`text-sm ml-2 ${
                    plan.popular ? "text-white/70" : "text-neutral-500"
                  }`}
                >
                  / {plan.priceNote}
                </span>
              </div>

              {/* Includes */}
              <ul className="flex flex-col gap-3 flex-1">
                {plan.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm">
                    <Check
                      className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                        plan.popular ? "text-white" : "text-primary-500"
                      }`}
                    />
                    <span className={plan.popular ? "text-white/90" : "text-neutral-700"}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Extra note */}
              <p
                className={`text-xs ${
                  plan.popular ? "text-white/60" : "text-neutral-400"
                }`}
              >
                {plan.extra}
              </p>

              {/* CTA */}
              <a
                href="#agendamento"
                className={`block text-center font-bold py-3.5 px-6 rounded-2xl transition-all duration-200 hover:-translate-y-0.5 ${
                  plan.popular
                    ? "bg-white text-primary-600 hover:bg-primary-50 shadow-lg"
                    : "gradient-primary text-white shadow-md shadow-primary-200 hover:shadow-lg hover:shadow-primary-300"
                }`}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center text-neutral-500 text-sm mt-10"
        >
          * Preços podem variar de acordo com o estado de conservação e tamanho real do estofado.
          O orçamento final é confirmado antes do início do serviço.
        </motion.p>
      </div>
    </section>
  );
}
