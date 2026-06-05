/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { ShoppingCart, Sun, Moon } from "lucide-react";

interface HeaderProps {
  cartCount: number;
  onToggleCart: () => void;
  onGoHome: () => void;
  onViewContact: () => void;
  onViewMision: () => void;
  activeTab: string;
  currency: "USD" | "COP";
  onSetCurrency: (curr: "USD" | "COP") => void;
  theme: "light" | "dark";
  onToggleTheme: () => void;
}

export default function Header({
  cartCount,
  onToggleCart,
  onGoHome,
  onViewContact,
  onViewMision,
  activeTab,
  currency,
  onSetCurrency,
  theme,
  onToggleTheme,
}: HeaderProps) {
  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between px-3 sm:px-6 md:px-8 py-2 md:py-3 bg-electric rounded-full w-[94%] md:w-max max-w-4xl border-[3px] md:border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:scale-[1.02] active:scale-[0.98] transition-all">
      {/* Brand logo */}
      <button
        onClick={onGoHome}
        className="text-sm sm:text-lg md:text-xl font-syne font-extrabold text-lime tracking-tighter uppercase mr-2 sm:mr-4 md:mr-8 cursor-pointer hover:opacity-90 select-none text-left shrink-0"
      >
        <span className="hidden sm:inline">LAS MEDIAS DE TATIS</span>
        <span className="inline sm:hidden">TATIS 🧦</span>
      </button>

      {/* Navigation options */}
      <div className="flex gap-2 sm:gap-4 md:gap-6 items-center shrink-0">
        <button
          onClick={onGoHome}
          className={`text-[10px] sm:text-xs md:text-sm font-mono font-bold uppercase cursor-pointer transition-all pb-0.5 ${
            activeTab === "explore"
              ? "text-lime border-b-2 border-lime"
              : "text-white hover:text-lime"
          }`}
        >
          Colección
        </button>
        <button
          onClick={onViewMision}
          className={`text-[10px] sm:text-xs md:text-sm font-mono font-bold uppercase cursor-pointer transition-all pb-0.5 ${
            activeTab === "mision"
              ? "text-lime border-b-2 border-lime"
              : "text-white hover:text-lime"
          }`}
        >
          Nosotros
        </button>
        <button
          onClick={onViewContact}
          className={`text-[10px] sm:text-xs md:text-sm font-mono font-bold uppercase cursor-pointer transition-all pb-0.5 ${
            activeTab === "contact"
              ? "text-lime border-b-2 border-lime"
              : "text-white hover:text-lime"
          }`}
        >
          Contacto
        </button>
      </div>

      {/* Currency Switcher */}
      <div className="ml-1.5 sm:ml-3 md:ml-6 flex bg-black p-0.5 border-2 border-black rounded md:rounded-md shadow-[1px_1px_0px_0px_rgba(255,255,255,1)] md:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] select-none shrink-0">
        <button
          onClick={() => onSetCurrency("USD")}
          className={`px-1 sm:px-1.5 md:px-2 py-0.5 md:py-1 font-mono font-bold text-[8px] sm:text-[9px] md:text-xs rounded cursor-pointer uppercase transition-all tracking-wider ${
            currency === "USD"
              ? "bg-lime text-black"
              : "text-white hover:text-lime"
          }`}
        >
          USD
        </button>
        <button
          onClick={() => onSetCurrency("COP")}
          className={`px-1 sm:px-1.5 md:px-2 py-0.5 md:py-1 font-mono font-bold text-[8px] sm:text-[9px] md:text-xs rounded cursor-pointer uppercase transition-all tracking-wider ${
            currency === "COP"
              ? "bg-lime text-black"
              : "text-white hover:text-lime"
          }`}
        >
          COP
        </button>
      </div>

      {/* Theme Switcher */}
      <button
        onClick={onToggleTheme}
        className={`ml-1.5 sm:ml-3 md:ml-6 flex items-center justify-center p-1.5 sm:p-2 rounded-full border-2 border-black transition-all cursor-pointer shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] md:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:scale-110 active:scale-95 shrink-0 ${
          theme === "light"
            ? "bg-yellow-300 text-black hover:bg-white"
            : "bg-[#39ff14] text-black hover:bg-[#00ffff]"
        }`}
        aria-label="Alternar Tema oscuro neón"
      >
        {theme === "light" ? (
          <Moon className="w-3 h-3 sm:w-4 sm:h-4 text-black" />
        ) : (
          <Sun className="w-3 h-3 sm:w-4 sm:h-4 text-black font-extrabold" />
        )}
      </button>

      {/* Cart button */}
      <button
        onClick={onToggleCart}
        className="ml-1.5 sm:ml-3 md:ml-6 flex items-center justify-center p-1.5 sm:p-2 rounded-full bg-lime border-2 border-black text-black hover:bg-white hover:scale-110 active:scale-95 transition-all cursor-pointer shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] md:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] shrink-0"
        aria-label="Abrir Bolsa de Compras"
      >
        <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
        <span className="ml-1 sm:ml-1.5 font-mono font-bold text-[10px] sm:text-xs md:text-sm">
          {cartCount}
        </span>
      </button>
    </nav>
  );
}
