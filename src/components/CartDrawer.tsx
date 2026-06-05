/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { CartItem } from "../types";
import { X, Trash2, Heart, HelpCircle, Plus, Minus, ShoppingBag } from "lucide-react";
import { formatPrice } from "../utils";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
  onWishlistClick: () => void;
  onSupportClick: () => void;
  currency: "USD" | "COP";
  theme?: "light" | "dark";
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  onWishlistClick,
  onSupportClick,
  currency,
  theme = "light",
}: CartDrawerProps) {
  // Compute prices
  const totalAmount = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const isDark = theme === "dark";

  return (
    <>
      {/* Backdrop overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-55 bg-black/60 backdrop-blur-xs transition-opacity cursor-pointer duration-300"
        />
      )}

      {/* Slide-out cart box */}
      <div
        className={`fixed inset-y-0 right-0 z-60 flex flex-col p-6 md:p-8 border-l-4 transition-transform duration-300 ease-in-out select-none w-full sm:w-[420px] shadow-2xl ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } ${
          isDark ? "bg-[#0b0318] text-white border-[#00ffff]" : "bg-[#eadfee] text-black border-black"
        }`}
      >
        {/* Header zone with title & close icon button */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className={`text-3xl font-syne font-extrabold uppercase leading-none tracking-tight ${
              isDark ? "text-[#ff007f]" : "text-bubblegum"
            }`}>
              YOUR BAG
            </h2>
            <p className={`font-mono text-xs md:text-sm font-bold mt-1 uppercase ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}>
              Stay Wild, Tatis Style
            </p>
          </div>
          <button
            onClick={onClose}
            className={`p-2 border-2 rounded-full transition-colors cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:scale-105 active:scale-95 ${
              isDark
                ? "bg-black text-[#00ffff] border-[#00ffff] hover:bg-[#ff007f] hover:text-white"
                : "bg-white text-black border-black hover:bg-red-500 hover:text-white"
            }`}
            aria-label="Cerrar Bolsa"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable list content zone */}
        <div className="flex-grow overflow-y-auto space-y-4 pr-1 scrollbar-thin">
          {cart.length === 0 ? (
            <div className={`h-48 flex flex-col justify-center items-center opacity-70 italic text-center font-mono text-xs md:text-sm py-12 ${
              isDark ? "text-gray-400" : "text-gray-500"
            }`}>
              <ShoppingBag className="w-12 h-12 text-gray-400 mb-3 stroke-1" />
              Tu bolsa está vacía... por ahora.
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                style={isDark ? { borderColor: "#39ff14", boxShadow: "3px 3px 0px 0px #39ff14" } : {}}
                className={`p-4 border-[3px] rounded-lg flex gap-3 relative hover:-translate-y-0.5 transition-transform ${
                  isDark ? "bg-[#140b24] text-white" : "bg-white border-black text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                }`}
              >
                {/* Product thumbnail visualization */}
                <div className="w-16 h-16 md:w-20 md:h-20 bg-mustard border-2 border-black rounded overflow-hidden flex-shrink-0 flex items-center justify-center text-black">
                  {item.product.image === "TRÁEME CAFÉ" ? (
                    <span className="font-syne font-extrabold text-[10px] text-center uppercase leading-none px-1">
                      TRÁEME CAFÉ
                    </span>
                  ) : (
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                {/* Details list item text info */}
                <div className="flex-grow flex flex-col justify-between">
                  <div>
                    <p className={`font-syne font-bold text-sm leading-snug uppercase ${
                      isDark ? "text-[#39ff14]" : "text-black"
                    }`}>
                      {item.product.name}
                    </p>
                    <p className={`font-mono text-xs mt-0.5 select-none font-bold ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    }`}>
                      Talla: {item.size} • Cantidad: {item.quantity}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    {/* Size controls count adjustments */}
                    <div className={`flex items-center gap-1.5 border-2 rounded px-1 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] ${
                      isDark ? "bg-black border-[#ff007f] text-white" : "bg-white border-black text-black"
                    }`}>
                      <button
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className={`p-1 transition-colors cursor-pointer ${
                          isDark ? "text-[#00ffff] hover:text-[#ff007f]" : "text-black hover:text-electric"
                        }`}
                        aria-label="Disminuir Cantidad"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-mono font-bold text-xs select-none px-1">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className={`p-1 transition-colors cursor-pointer ${
                          isDark ? "text-[#00ffff] hover:text-[#ff007f]" : "text-black hover:text-electric"
                        }`}
                        aria-label="Aumentar Cantidad"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Cost amount label */}
                    <p className={`font-mono font-bold text-sm ${
                      isDark ? "text-[#ff007f]" : "text-bubblegum"
                    }`}>
                      {formatPrice(item.product.price * item.quantity, currency)}
                    </p>
                  </div>
                </div>

                {/* Single trash item deletion trigger */}
                <button
                  onClick={() => onRemoveItem(item.id)}
                  className={`absolute top-2 right-2 p-1 hover:scale-115 transition-transform transition-colors cursor-pointer ${
                    isDark ? "text-gray-500 hover:text-[#ff007f]" : "text-gray-400 hover:text-red-500"
                  }`}
                  aria-label="Eliminar Item"
                >
                  <Trash2 className="w-4.5 h-4.5" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Dynamic checkout footer block zone */}
        <div className={`mt-auto pt-6 border-t-4 flex flex-col gap-4 ${
          isDark ? "border-gray-800" : "border-black"
        }`}>
          <div className={`flex justify-between font-syne font-extrabold text-xl md:text-2xl uppercase tracking-tight ${
            isDark ? "text-white" : "text-black"
          }`}>
            <span>Total:</span>
            <span>{formatPrice(totalAmount, currency)}</span>
          </div>

          <button
            onClick={onCheckout}
            disabled={cart.length === 0}
            style={isDark && cart.length > 0 ? { borderColor: "#39ff14", boxShadow: "4px 4px 0px 0px #ff007f" } : {}}
            className={`w-full py-4 font-syne font-extrabold text-lg md:text-xl border-4 active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all uppercase rounded select-none cursor-pointer text-center ${
              cart.length === 0
                ? "bg-gray-400 opacity-60 cursor-not-allowed transform-none shadow-none text-black border-black"
                : isDark
                  ? "bg-[#39ff14] text-black hover:bg-[#0b0318] hover:text-[#39ff14]"
                  : "bg-lime text-black border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:bg-white"
            }`}
          >
            CHECKOUT NOW
          </button>

          {/* Dual secondary support/wishlist utilities */}
          <div className="grid grid-cols-2 gap-3 mt-1">
            <button
              onClick={onWishlistClick}
              className={`flex items-center justify-center gap-2 py-3 border-2 font-mono font-bold uppercase cursor-pointer rounded text-xs leading-none ${
                isDark
                  ? "border-[#ff007f] bg-black text-[#ff007f] hover:bg-[#ff007f]/20"
                  : "border-black bg-white text-black hover:bg-pink-100"
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${isDark ? "text-[#ff007f] fill-[#ff007f]" : "text-bubblegum fill-bubblegum"}`} /> Favoritos
            </button>
            <button
              onClick={onSupportClick}
              className={`flex items-center justify-center gap-2 py-3 border-2 font-mono font-bold uppercase cursor-pointer rounded text-xs leading-none ${
                isDark
                  ? "border-[#00ffff] bg-black text-[#00ffff] hover:bg-[#00ffff]/20"
                  : "border-black bg-white text-black hover:bg-blue-100"
              }`}
            >
              <HelpCircle className={`w-3.5 h-3.5 ${isDark ? "text-[#00ffff]" : "text-electric"}`} /> Soporte
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
