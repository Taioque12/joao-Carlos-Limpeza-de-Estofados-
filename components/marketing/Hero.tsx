"use client";

import { motion } from "framer-motion";
import { Calendar, ChevronDown, ShieldCheck, Star, Zap } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/utils";

const badges = [
  { icon: ShieldCheck, label: "Produtos Certificados" },
  { icon: Star, label: "+5.000 Estofados Higienizados" },
  { icon: Zap, label: "Secagem em até 4h" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen gradient-hero flex items-center overflow-hidden pt-16">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-primary-100 opacity-50 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-primary-200 opacity-30 blur-3xl" />
      </div>
      <div className="max-w-7xl mx-auto section-padding w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="flex flex-col gap-6">
            <motion.div variants={fadeInUp}>
              <span className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 text-sm font-semibold px-4 py-1.5 rounded-full border border-primary-200">
                <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
                Atendimento Profissional a Domicílio
              </span>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-neutral-900 leading-tight text-balance">
              Sua casa{" "}
              <span className="text-primary-600 relative">
                renovada
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 8 C80 4, 220 4, 298 8" stroke="#0ea5e9" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.5" />
                </svg>
              </span>
              :<br />Higienização profissional de sofás e colchões
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-neutral-600 leading-relaxed max-w-lg">
              Eliminamos ácaros, manchas e odores com tecnologia de extração química e produtos biodegradáveis — seguros para pets e crianças.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
              <a href="#agendamento" className="inline-flex items-center justify-center gap-2 gradient-primary text-white font-bold px-7 py-4 rounded-2xl shadow-lg shadow-primary-200 hover:shadow-xl hover:shadow-primary-300 hover:-translate-y-1 transition-all duration-200 text-base">
                <Calendar className="w-5 h-5" /> Agendar Agora
              </a>
              <a href="#servicos" className="inline-flex items-center justify-center gap-2 bg-white text-primary-600 font-bold px-7 py-4 rounded-2xl border-2 border-primary-200 hover:border-primary-400 hover:bg-primary-50 hover:-translate-y-1 transition-all duration-200 text-base">
                Ver Serviços <ChevronDown className="w-5 h-5" />
              </a>
            </motion.div>
            <motion.div variants={staggerContainer} className="flex flex-wrap gap-3 pt-2">
              {badges.map((badge) => (
                <motion.div key={badge.label} variants={fadeInUp} className="flex items-center gap-2 bg-white border border-neutral-200 text-neutral-700 text-sm font-medium px-4 py-2 rounded-xl shadow-sm">
                  <badge.icon className="w-4 h-4 text-primary-500" />{badge.label}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95, x: 40 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }} className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-primary-200 aspect-[4/3]">
              <div className="w-full h-full bg-gradient-to-br from-primary-300 to-primary-600 flex items-center justify-center min-h-[320px]">
                <div className="text-center text-white p-8">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
                    <svg viewBox="0 0 64 64" fill="none" className="w-14 h-14 text-white" xmlns="http://www.w3.org/2000/svg">
                      <rect x="8" y="20" width="48" height="28" rx="6" fill="currentColor" opacity="0.3"/>
                      <rect x="12" y="24" width="40" height="20" rx="4" fill="currentColor" opacity="0.5"/>
                      <rect x="16" y="28" width="32" height="12" rx="3" fill="currentColor"/>
                      <rect x="20" y="46" width="6" height="6" rx="2" fill="currentColor" opacity="0.6"/>
                      <rect x="38" y="46" width="6" height="6" rx="2" fill="currentColor" opacity="0.6"/>
                    </svg>
                  </div>
                  <p className="font-bold text-xl">Higienização Profissional</p>
                  <p className="text-white/80 text-sm mt-1">Adicione uma foto real do serviço</p>
                </div>
              </div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.5 }} className="absolute bottom-4 left-4 right-4 glass rounded-2xl p-4 flex items-center gap-3 shadow-lg">
                <div className="w-10 h-10 rounded-xl bg-accent-green flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-neutral-800 font-bold text-sm">Serviço Concluído!</p>
                  <p className="text-neutral-500 text-xs">Sofá 3 lugares higienizado • Pronto para usar</p>
                </div>
                <div className="ml-auto flex">
                  {[1,2,3,4,5].map((i) => <Star key={i} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />)}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2" animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
        <a href="#servicos" aria-label="Rolar para serviços"><ChevronDown className="w-7 h-7 text-primary-400" /></a>
      </motion.div>
    </section>
  );
}
