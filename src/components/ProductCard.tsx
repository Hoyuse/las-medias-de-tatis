/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion } from "motion/react";
import { Product } from "../types";
import { Plus, Minus } from "lucide-react";
import { formatPrice } from "../utils";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, size: string, quantityToAdd?: number) => void;
  onSelectProduct: (product: Product) => void;
  currency: "USD" | "COP";
  theme: "light" | "dark";
}

export default function ProductCard({
  product,
  onAddToCart,
  onSelectProduct,
  currency,
  theme,
}: ProductCardProps) {
  // Image loading state
  const [isImageLoading, setIsImageLoading] = useState(true);

  // Determine backgrounds and styling based on product ID to match high-fidelity screenshots
  let cardClass = "";
  let textClass = "text-black";
  let btnClass = "";
  let imgBg = "bg-white";

  const isDark = theme === "dark";

  if (product.id === "aguacates") {
    cardClass = isDark
      ? "bg-black text-white border-[3px] md:border-4 border-[#39ff14] shadow-[4px_4px_0px_0px_#39ff14]"
      : "bg-lime border-[3px] md:border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]";
    textClass = isDark ? "text-[#39ff14]" : "text-black";
    btnClass = isDark
      ? "bg-[#39ff14] text-black border-[3px] border-black hover:bg-[#00ffff] transition-colors shadow-[2px_2px_0px_0px_#000000] action-button"
      : "bg-electric text-white border-[3px] border-black hover:bg-bubblegum transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] action-button";
    imgBg = isDark ? "bg-[#051103] border-2 md:border-4 border-[#39ff14]" : "bg-white border-2 md:border-4 border-black";
  } else if (product.id === "alien") {
    cardClass = isDark
      ? "bg-black text-white border-[3px] md:border-4 border-[#bc13fe] shadow-[4px_4px_0px_0px_#bc13fe]"
      : "bg-electric border-[3px] md:border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]";
    textClass = isDark ? "text-[#bc13fe]" : "text-white";
    btnClass = isDark
      ? "bg-[#bc13fe] text-white border-[3px] border-black hover:bg-[#ff007f] transition-colors shadow-[2px_2px_0px_0px_#000000] action-button"
      : "bg-lime text-black border-[3px] border-black hover:bg-white transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] action-button";
    imgBg = isDark ? "bg-[#0b0314] border-2 md:border-4 border-[#bc13fe]" : "bg-black border-2 md:border-4 border-black";
  } else if (product.id === "cafe") {
    cardClass = isDark
      ? "bg-black text-white border-[3px] md:border-4 border-[#ff007f] shadow-[4px_4px_0px_0px_#ff007f]"
      : "bg-bubblegum border-[3px] md:border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]";
    textClass = isDark ? "text-[#ff007f]" : "text-white";
    btnClass = isDark
      ? "bg-[#ff007f] text-white border-[3px] border-black hover:bg-[#39ff14] transition-colors shadow-[2px_2px_0px_0px_#000000] action-button"
      : "bg-white text-black border-[3px] border-black hover:bg-lime transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] action-button";
    imgBg = isDark ? "bg-[#14020a] border-2 md:border-4 border-[#ff007f] flex items-center justify-center p-8" : "bg-mustard border-2 md:border-4 border-black flex items-center justify-center p-8";
  } else {
    // michis
    cardClass = isDark
      ? "bg-black text-white border-[3px] md:border-4 border-[#00ffff] shadow-[4px_4px_0px_0px_#00ffff]"
      : "bg-purple-100 border-[3px] md:border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]";
    textClass = isDark ? "text-[#00ffff]" : "text-black";
    btnClass = isDark
      ? "bg-[#00ffff] text-black border-[3px] border-black hover:bg-[#ff007f] transition-colors shadow-[2px_2px_0px_0px_#000000] action-button"
      : "bg-bubblegum text-white border-[3px] border-black hover:bg-electric transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] action-button";
    imgBg = isDark ? "bg-[#031317] border-2 md:border-4 border-[#00ffff]" : "bg-lime border-2 md:border-4 border-black";
  }

  // Quantity stepper local state
  const [qty, setQty] = useState(1);

  const handleDecrease = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (qty > 1) {
      setQty(qty - 1);
    }
  };

  const handleIncrease = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQty(qty + 1);
  };

  // Handle addition specifically for M size by default from quick buy card
  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, "M", qty);
    setQty(1); // Reset back to 1
  };

  const borderCol = product.id === "aguacates" ? "#39ff14" : product.id === "alien" ? "#bc13fe" : product.id === "cafe" ? "#ff007f" : "#00ffff";

  const stepperBtnClass = isDark
    ? `w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center border-2 border-black bg-black text-white hover:bg-neutral-800 disabled:opacity-45 rounded select-none cursor-pointer`
    : `w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center border-2 border-black bg-white text-black hover:bg-neutral-100 disabled:opacity-45 rounded select-none cursor-pointer`;

  const qtyBoxClass = isDark
    ? `w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center border-2 border-dashed text-white font-mono font-bold text-xs sm:text-sm rounded`
    : `w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center border-2 border-dashed border-black bg-white text-black font-mono font-bold text-xs sm:text-sm rounded`;


  return (
    <motion.div
      onClick={() => onSelectProduct(product)}
      className={`${cardClass} p-3 sm:p-5 md:p-6 rounded-lg flex flex-col justify-between cursor-pointer transition-all duration-300 hover:-translate-y-2 select-none h-full`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div>
        {/* Render Image or textual substitute like 'TRÁEME CAFÉ' */}
        {product.image === "TRÁEME CAFÉ" ? (
          <div className={`${imgBg} aspect-square max-h-[140px] xs:max-h-[180px] sm:max-h-none mb-2.5 sm:mb-4 relative overflow-hidden flex flex-col items-center justify-center`}>
            <span className={`font-syne font-extrabold text-lg xs:text-xl md:text-2xl text-center border-b-4 border-black pb-1 select-none leading-none ${isDark ? "text-white" : "text-[#1f1924]"}`}>
              TRÁEME CAFÉ
            </span>
          </div>
        ) : (
          <div className={`${imgBg} aspect-square max-h-[140px] xs:max-h-[180px] sm:max-h-none mb-2.5 sm:mb-4 relative overflow-hidden rounded`}>
            {isImageLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#fcf9fc] z-10 transition-opacity duration-300">
                {/* Neobrutalist rotating spinning block */}
                <div className="w-12 h-12 relative flex items-center justify-center">
                  <div className="absolute inset-0 border-4 border-black bg-lime animate-spin brutal-shadow-sm rounded-sm"></div>
                  <span className="relative font-syne font-extrabold text-[12px] text-black select-none z-10 tracking-tighter leading-none">
                    TATIS
                  </span>
                </div>
                <span className="font-mono text-[9px] font-bold text-black uppercase mt-4 tracking-widest animate-pulse">
                  Cargando...
                </span>
              </div>
            )}
            <img
              src={product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              onLoad={() => setIsImageLoading(false)}
              onError={() => setIsImageLoading(false)}
              className={`w-full h-full object-cover transition-transform duration-500 hover:scale-105 ${
                product.id === "alien" ? "grayscale brightness-125" : ""
              }`}
            />
          </div>
        )}

        <h3 className={`font-syne font-bold text-sm xs:text-base sm:text-lg md:text-xl block mb-1 sm:mb-2 tracking-tight leading-snug ${isDark ? "text-white" : "text-black"}`}>
          {product.name}
        </h3>
        <p className={`font-mono text-[10px] xs:text-[11px] sm:text-xs md:text-sm mb-2 sm:mb-6 opacity-90 line-clamp-1 xs:line-clamp-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
          {product.subtitle || product.description}
        </p>
      </div>

      <div className="flex flex-col gap-2 sm:gap-3 mt-auto pt-2.5 sm:pt-4 border-t border-dashed border-black/10 dark:border-white/10" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center">
          <div className="flex flex-col items-start gap-0.5">
            <span className="font-mono text-[9px] sm:text-xs uppercase font-extrabold text-neutral-500 dark:text-neutral-400">
              Precio:
            </span>
            <span className="bg-black/10 dark:bg-white/15 px-1 sm:px-1.5 py-0.5 rounded text-[7px] sm:text-[10px] font-mono text-neutral-600 dark:text-neutral-300 font-bold uppercase tracking-wide leading-none">
              Talla M (Única)
            </span>
          </div>
          <span className={`text-base sm:text-xl md:text-2xl font-mono font-bold ${textClass}`}>
            {formatPrice(product.price, currency)}
          </span>
        </div>

        <div className="flex items-center justify-between gap-1 sm:gap-2">
          {/* Quantity Selector +/- */}
          <div className="flex items-center bg-black/5 dark:bg-white/5 p-0.5 rounded border border-black/10 dark:border-white/10 gap-0.5 sm:gap-1.5 shrink-0">
            <button
              onClick={handleDecrease}
              disabled={qty <= 1}
              className={stepperBtnClass}
              title="Disminuir cantidad"
            >
              <Minus className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
            </button>
            <span className={qtyBoxClass} style={{ borderColor: isDark ? borderCol : "black" }}>
              {qty}
            </span>
            <button
              onClick={handleIncrease}
              className={stepperBtnClass}
              title="Aumentar cantidad"
            >
              <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
            </button>
          </div>

          <button
            onClick={handleQuickAdd}
            className={`${btnClass} flex-1 justify-center py-1.5 sm:py-2 px-2 sm:px-3 font-mono font-bold text-[10px] sm:text-sm uppercase tracking-wider rounded select-none cursor-pointer flex items-center justify-center gap-1 sm:gap-1.5 transition-all text-center leading-none h-7 sm:h-auto`}
          >
            <Plus className="w-3 sm:w-4 h-3 sm:h-4 shrink-0" />
            <span>Añadir</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
