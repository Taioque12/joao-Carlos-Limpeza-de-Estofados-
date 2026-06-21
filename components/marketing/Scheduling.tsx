"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Calendar, Clock, MapPin, Phone, User, CheckCircle, ChevronRight } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/utils";

const services = [
  "Sofá até 3 lugares",
  "Sofá 4+ lugares / Retrátil",
  "Colchão Solteiro",
  "Colchão Casal / Queen",
  "Colchão King",
  "Combo Casa Completa",
  "Cadeiras / Banquetas",
  "Outros (descreva no campo abaixo)",
];

const timeSlots = [
  "08:00 - 09:00",
  "09:00 - 10:00",
  "10:00 - 11:00",
  "11:00 - 12:00",
  "13:00 - 14:00",
  "14:00 - 15:00",
  "15:00 - 16:00",
  "16:00 - 17:00",
];

type FormData = {
  name: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  address: string;
  notes: string;
};

export default function Scheduling() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormData>({
    name: "",
    phone: "",
    service: "",
    date: "",
    time: "",
    address: "",
    notes: "",
  });

  const update = (field: keyof FormData, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = encodeURIComponent(
      `Olá! Gostaria de agendar um serviço:\n\n` +
      `👤 Nome: ${form.name}\n` +
      `📱 Telefone: ${form.phone}\n` +
      `🛋️ Serviço: ${form.service}\n` +
      `📅 Data: ${form.date}\n` +
      `🕐 Horário: ${form.time}\n` +
      `📍 Endereço: ${form.address}\n` +
      (form.notes ? `📝 Obs: ${form.notes}` : "")
    );
    setSubmitted(true);
    setTimeout(() => {
      window.open(`https://wa.me/5511999999999?text=${msg}`, "_blank");
    }, 1500);
  };

  const isStep1Valid = form.name && form.phone && form.service;
  const isStep2Valid = form.date && form.time && form.address;

  return (
    <section id="agendamento" className="gradient-hero section-padding">
      <div className="max-w-3xl mx-auto">
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
            Rápido e fácil
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-neutral-900 mb-4"
          >
            Agende seu <span className="text-primary-600">Serviço</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-neutral-600 text-lg">
            Preencha o formulário e entraremos em contato para confirmar.
          </motion.p>
        </motion.div>

        {/* Form card */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="bg-white rounded-3xl shadow-xl shadow-primary-100 border border-primary-100 overflow-hidden"
        >
          {/* Steps indicator */}
          {!submitted && (
            <div className="flex border-b border-neutral-100">
              {[1, 2].map((s) => (
                <button
                  key={s}
                  onClick={() => s < step || (s === 2 && isStep1Valid) ? setStep(s) : null}
                  className={`flex-1 py-4 text-sm font-semibold flex items-center justify-center gap-2 transition-colors duration-200 ${
                    step === s
                      ? "text-primary-600 border-b-2 border-primary-500 bg-primary-50"
                      : s < step
                      ? "text-green-600 bg-green-50"
                      : "text-neutral-400 bg-white"
                  }`}
                >
                  {s < step ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                      step === s ? "bg-primary-600 text-white" : "bg-neutral-200 text-neutral-500"
                    }`}>{s}</span>
                  )}
                  {s === 1 ? "Seus dados" : "Data e local"}
                </button>
              ))}
            </div>
          )}

          <form onSubmit={handleSubmit} className="p-8">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8 flex flex-col items-center gap-4"
              >
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-neutral-900">
                  Agendamento Solicitado!
                </h3>
                <p className="text-neutral-600 max-w-sm">
                  Estamos redirecionando para o WhatsApp para confirmar seu agendamento. Até logo, <strong>{form.name}</strong>!
                </p>
                <span className="text-sm text-neutral-400">
                  Abrindo WhatsApp...
                </span>
              </motion.div>
            ) : step === 1 ? (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col gap-5"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-neutral-700 flex items-center gap-1.5">
                      <User className="w-4 h-4 text-primary-500" />
                      Nome completo *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      placeholder="Seu nome"
                      className="px-4 py-3 rounded-xl border border-neutral-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition text-neutral-800 placeholder:text-neutral-400"
                    />
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-neutral-700 flex items-center gap-1.5">
                      <Phone className="w-4 h-4 text-primary-500" />
                      WhatsApp / Telefone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      placeholder="(11) 99999-9999"
                      className="px-4 py-3 rounded-xl border border-neutral-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition text-neutral-800 placeholder:text-neutral-400"
                    />
                  </div>
                </div>

                {/* Service */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-neutral-700 flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-primary-500" />
                    Qual serviço você precisa? *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {services.map((s) => (
                      <label
                        key={s}
                        className={`flex items-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all text-sm font-medium ${
                          form.service === s
                            ? "border-primary-400 bg-primary-50 text-primary-700"
                            : "border-neutral-200 hover:border-primary-200 text-neutral-600"
                        }`}
                      >
                        <input
                          type="radio"
                          name="service"
                          value={s}
                          checked={form.service === s}
                          onChange={() => update("service", s)}
                          className="sr-only"
                        />
                        <span
                          className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
                            form.service === s
                              ? "border-primary-500 bg-primary-500"
                              : "border-neutral-300"
                          }`}
                        >
                          {form.service === s && (
                            <span className="w-2 h-2 rounded-full bg-white" />
                          )}
                        </span>
                        {s}
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  disabled={!isStep1Valid}
                  onClick={() => setStep(2)}
                  className="mt-2 w-full gradient-primary text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg hover:shadow-primary-200 hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  Próximo
                  <ChevronRight className="w-5 h-5" />
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col gap-5"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Date */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-neutral-700 flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-primary-500" />
                      Data preferida *
                    </label>
                    <input
                      type="date"
                      required
                      value={form.date}
                      min={new Date().toISOString().split("T")[0]}
                      onChange={(e) => update("date", e.target.value)}
                      className="px-4 py-3 rounded-xl border border-neutral-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition text-neutral-800"
                    />
                  </div>

                  {/* Time */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-neutral-700 flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-primary-500" />
                      Horário preferido *
                    </label>
                    <select
                      required
                      value={form.time}
                      onChange={(e) => update("time", e.target.value)}
                      className="px-4 py-3 rounded-xl border border-neutral-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition text-neutral-800"
                    >
                      <option value="">Selecione um horário</option>
                      {timeSlots.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Address */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-neutral-700 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-primary-500" />
                    Endereço completo *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.address}
                    onChange={(e) => update("address", e.target.value)}
                    placeholder="Rua, número, bairro, cidade"
                    className="px-4 py-3 rounded-xl border border-neutral-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition text-neutral-800 placeholder:text-neutral-400"
                  />
                </div>

                {/* Notes */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-neutral-700">
                    Observações (opcional)
                  </label>
                  <textarea
                    value={form.notes}
                    onChange={(e) => update("notes", e.target.value)}
                    placeholder="Ex: urina de pet, manchas específicas, local de difícil acesso..."
                    rows={3}
                    className="px-4 py-3 rounded-xl border border-neutral-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition text-neutral-800 placeholder:text-neutral-400 resize-none"
                  />
                </div>

                <div className="flex gap-3 mt-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-semibold py-4 rounded-2xl transition-colors"
                  >
                    Voltar
                  </button>
                  <button
                    type="submit"
                    disabled={!isStep2Valid}
                    className="flex-[2] gradient-primary text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg hover:shadow-primary-200 hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Confirmar via WhatsApp
                  </button>
                </div>
              </motion.div>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
}
