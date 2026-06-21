"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/utils";

const faqs = [
  {
    question: "Quanto tempo demora para o estofado secar?",
    answer:
      "Com nossa tecnologia de extração e secagem acelerada, a maioria dos estofados fica pronta para uso em 4 a 6 horas. Em dias quentes e com boa ventilação, pode ser ainda mais rápido. Aconselhamos manter janelas abertas após o serviço.",
  },
  {
    question: "Como funciona no caso de urina de pet ou criança?",
    answer:
      "Temos um protocolo especial para contaminação por urina. Aplicamos enzimas específicas que quebram as moléculas causadoras do odor e nódoa amarelada, seguido de extração química profunda. O resultado é muito superior a qualquer produto de prateleira. Em casos extremos de acúmulo, pode ser necessária uma segunda sessão.",
  },
  {
    question: "Os produtos usados são seguros para crianças e pets?",
    answer:
      "Sim! Toda a nossa linha é certificada pela ANVISA, biodegradável e hipoalergênica. Não utilizamos produtos com amônia, cloro ou solventes tóxicos. Após o processo de secagem (4-6h), o estofado é completamente seguro para crianças pequenas e animais domésticos.",
  },
  {
    question: "Vocês atendem na minha cidade?",
    answer:
      "Atendemos toda a Grande São Paulo, incluindo Santo André, São Bernardo, São Caetano, Guarulhos, Osasco, Mauá, Diadema e região. Entre em contato pelo WhatsApp para confirmar a disponibilidade na sua área e verificar possíveis custos de deslocamento.",
  },
  {
    question: "Preciso retirar o estofado de casa?",
    answer:
      "Não! Fazemos tudo no local. Levamos toda a estrutura, máquinas, produtos e equipamentos até você. O processo é realizado no próprio ambiente, sem necessidade de desmontar móveis ou transportar nada.",
  },
  {
    question: "Qual a diferença entre higienização e impermeabilização?",
    answer:
      "A higienização remove sujidade, ácaros, fungos, bactérias e odores. A impermeabilização cria uma camada de proteção molecular no tecido que repele líquidos e dificulta a absorção de novas manchas. Recomendamos fazer as duas juntas para um resultado completo e duradouro.",
  },
  {
    question: "Com que frequência devo higienizar meus estofados?",
    answer:
      "Para uso doméstico normal, recomendamos higienização a cada 6 meses. Em casas com pets, crianças pequenas ou pessoas com alergias respiratórias, o ideal é a cada 3 a 4 meses. Isso garante um ambiente livre de ácaros e alérgenos.",
  },
  {
    question: "Vocês emitem nota fiscal?",
    answer:
      "Sim! Emitimos nota fiscal de serviço para todos os atendimentos. Você pode solicitar no momento do agendamento. Para empresas que precisam de CNPJ na nota, basta informar os dados no formulário de agendamento.",
  },
];

function AccordionItem({ faq }: { faq: (typeof faqs)[0] }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      variants={fadeInUp}
      className="border border-neutral-200 rounded-2xl overflow-hidden bg-white hover:border-primary-200 transition-colors duration-200"
    >
      <button
        className="w-full flex items-center justify-between gap-4 p-6 text-left"
        onClick={() => setOpen(!open)}
      >
        <span className="font-semibold text-neutral-800 text-base leading-snug pr-4">
          {faq.question}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="flex-shrink-0"
        >
          <ChevronDown
            className={`w-5 h-5 transition-colors duration-200 ${
              open ? "text-primary-600" : "text-neutral-400"
            }`}
          />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <p className="px-6 pb-6 text-neutral-600 text-sm leading-relaxed border-t border-neutral-100 pt-4">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="faq" className="bg-neutral-50 section-padding">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-12"
        >
          <motion.span
            variants={fadeInUp}
            className="inline-block bg-primary-100 text-primary-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4"
          >
            Dúvidas frequentes
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-neutral-900 mb-4"
          >
            Perguntas <span className="text-primary-600">Frequentes</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-neutral-600 text-lg">
            Tudo que você precisa saber antes de agendar.
          </motion.p>
        </motion.div>

        {/* Accordion */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col gap-3"
        >
          {faqs.map((faq) => (
            <AccordionItem key={faq.question} faq={faq} />
          ))}
        </motion.div>

        {/* Still have questions */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-10 text-center bg-primary-50 rounded-2xl p-8 border border-primary-100"
        >
          <p className="text-neutral-700 font-medium mb-3">
            Ainda tem dúvidas? Fale com a gente pelo WhatsApp!
          </p>
          <a
            href="https://wa.me/5511999999999?text=Olá!%20Tenho%20uma%20dúvida%20sobre%20a%20higienização%20de%20estofados."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-3 rounded-xl transition-colors duration-200 shadow-md"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Falar no WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}
