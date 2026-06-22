"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Droplets, Menu, X, Lock } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { label: "Serviços", href: "#servicos" },
  { label: "Preços", href: "#precos" },
  { label: "FAQ", href: "#faq" },
  { label: "Contato", href: "#contato" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass shadow-md shadow-primary-100"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center shadow-md group-hover:shadow-primary-300 transition-shadow">
            <Droplets className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-neutral-800 text-sm md:text-base leading-tight">
            João Carlos<br />
            <span className="text-primary-600 font-semibold text-xs md:text-sm">Limpeza de Estofados</span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-neutral-600 hover:text-primary-600 font-medium text-sm transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary-500 after:transition-all hover:after:w-full"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right actions (desktop) */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 text-neutral-500 hover:text-primary-600 font-medium text-sm transition-colors"
          >
            <Lock className="w-3.5 h-3.5" />
            Área Restrita
          </Link>
          <a
            href="#agendamento"
            className="inline-flex items-center gap-2 gradient-primary text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-md hover:shadow-lg hover:shadow-primary-200 transition-all duration-200 hover:-translate-y-0.5"
          >
            Agendar Agora
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-primary-50 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={menuOpen ? "close" : "open"}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {menuOpen ? (
                <X className="w-6 h-6 text-neutral-700" />
              ) : (
                <Menu className="w-6 h-6 text-neutral-700" />
              )}
            </motion.div>
          </AnimatePresence>
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden glass border-t border-primary-100"
          >
            <ul className="flex flex-col px-4 py-4 gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-3 rounded-xl text-neutral-700 hover:bg-primary-50 hover:text-primary-600 font-medium transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl text-neutral-700 hover:bg-primary-50 hover:text-primary-600 font-medium transition-colors"
                >
                  <Lock className="w-4 h-4" />
                  Área Restrita
                </Link>
              </li>
              <li className="pt-2">
                <a
                  href="#agendamento"
                  onClick={() => setMenuOpen(false)}
                  className="block text-center gradient-primary text-white font-semibold px-4 py-3 rounded-xl shadow-md"
                >
                  Agendar Agora
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
