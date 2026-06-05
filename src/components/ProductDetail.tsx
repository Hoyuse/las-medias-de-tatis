/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Product } from "../types";
import { Star, Maximize2, Lightbulb, ArrowLeft, Rocket, ShieldCheck, ShoppingBag } from "lucide-react";
import { formatPrice } from "../utils";

interface ProductDetailProps {
  product: Product;
  onAddToCart: (product: Product, size: string) => void;
  onBack: () => void;
  currency: "USD" | "COP";
  theme: "light" | "dark";
}

export default function ProductDetail({
  product,
  onAddToCart,
  onBack,
  currency,
  theme,
}: ProductDetailProps) {
  const [selectedSize, setSelectedSize] = useState<string>("M");
  const [justAdded, setJustAdded] = useState<boolean>(false);

  const isDark = theme === "dark";

  // Compute dynamic color coordinates for true neon variety
  let neonColor = "#00ffff"; // Default bright Aqua
  if (product.id === "aguacates") neonColor = "#39ff14"; // Neon green
  if (product.id === "alien") neonColor = "#bc13fe"; // Neon purple/violet
  if (product.id === "cafe") neonColor = "#ff007f"; // Neon hot pink
  if (product.id === "cerveza") neonColor = "#ffea00"; // Neon bright yellow
  if (product.id === "pizza") neonColor = "#ff5e00"; // Neon orange
  if (product.id === "abejitas") neonColor = "#ffd700"; // Neon gold/yellow
  if (product.id === "chili") neonColor = "#ff073a"; // Neon bright red

  // Fallback default image for high fidelity screen detail if not product-defined
  const mainImage = product.id === "alien" 
    ? "https://lh3.googleusercontent.com/aida-public/AB6AXuATSg0GMW7qQidDg50AxhdS1dAvolJ4YIx0M8Y-ybtMb7dr71QwRCXuQx3oVNp0fvBrs37qauj5Ivz1Rb-U3dPusrO5Ej3G2nwkdw6FB5J3VMd_geGwZlgLRHakdd58bB4F97RHyZDLYAEncyLHksNA3TdqINSjODa5U1rPghJDNQlIKvJFvcMVI0a86oCfB_Bz9dPSByFjYOYJ1T63Ro_kzMvBdKA4U6p4yb0e_h7ge30SZS6vscVWQMEGLs4_BHZXz-KBcsGdh9Q" 
    : product.image;

  const handleAdd = () => {
    onAddToCart(product, selectedSize);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Back navigation panel */}
      <button
        onClick={onBack}
        className={`mb-8 flex items-center gap-2 px-5 py-3 font-mono font-bold uppercase border-[3px] rounded transition-all cursor-pointer ${
          isDark
            ? "bg-black text-[#00ffff] border-[#00ffff] shadow-[3px_3px_0px_0px_#00ffff] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_0px_#00ffff] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
            : "bg-white text-black border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
        }`}
      >
        <ArrowLeft className="w-4 h-4" />
        Ver toda la colección
      </button>

      {/* Main product detail grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10">
        
        {/* Left column: Image Box */}
        <div 
          style={isDark ? { borderColor: neonColor, boxShadow: `6px 6px 0px 0px ${neonColor}` } : {}}
          className={`lg:col-span-7 bg-white rounded-lg overflow-hidden relative min-h-[350px] md:min-h-[500px] flex items-center justify-center p-6 select-none group transition-all duration-300 ${
            isDark ? "bg-black border-4" : "border-4 border-black brutal-shadow"
          }`}
        >
          {mainImage === "TRÁEME CAFÉ" ? (
            <div 
              style={isDark ? { borderColor: neonColor } : {}}
              className={`w-full aspect-square border-4 flex flex-col items-center justify-center p-8 text-center rounded transition-colors duration-300 ${
                isDark ? "bg-[#14020a] border-solid" : "bg-mustard border-black"
              }`}
            >
              <span className={`font-syne font-extrabold text-3xl md:text-5xl border-b-8 pb-3 select-none leading-none transition-colors duration-300 ${
                isDark ? "text-white border-[#ff007f]" : "text-black border-black"
              }`}>
                TRÁEME CAFÉ
              </span>
            </div>
          ) : (
            <img
              src={mainImage}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain max-h-[500px] rounded group-hover:scale-[1.03] transition-transform duration-500"
            />
          )}

          {/* Limited edition ribbon */}
          {product.limitedEdition && (
            <div className="absolute top-4 left-4 bg-lime text-black border-[3px] border-black px-4 py-1.5 font-mono font-bold text-xs md:text-sm uppercase tracking-wider rounded brutal-shadow-sm select-none">
              Limited Edition
            </div>
          )}

          {/* Price badge overlay */}
          <div 
            style={isDark ? { backgroundColor: neonColor, color: "#000000" } : {}}
            className="absolute bottom-4 right-4 bg-lime text-black border-[3px] border-black px-5 py-2 font-syne font-extrabold text-lg md:text-2xl rounded brutal-shadow-sm select-none"
          >
            {formatPrice(product.price, currency)}
          </div>
        </div>

        {/* Right column: Dynamic interactive specs, details & CTA */}
        <div className="lg:col-span-5 flex flex-col gap-6 select-none">
          
          {/* Section 1: Title & Quote Description */}
          <div 
            style={isDark ? { borderColor: neonColor, boxShadow: `4px 4px 0px 0px ${neonColor}` } : {}}
            className={`p-6 md:p-8 rounded-lg flex flex-col gap-3 transition-all duration-300 ${
              isDark ? "bg-black border-4 text-white" : "bg-white border-4 border-black brutal-shadow"
            }`}
          >
            <h1 
              style={isDark ? { color: neonColor } : {}}
              className={`font-syne font-extrabold text-3xl md:text-4xl uppercase leading-none tracking-tight ${
                isDark ? "" : "text-electric"
              }`}
            >
              {product.name}
            </h1>
            <p 
              style={isDark ? { borderColor: neonColor } : {}}
              className={`font-mono text-sm md:text-base italic border-l-4 pl-4 py-1 ${
                isDark ? "text-gray-300 border-solid" : "text-gray-700 border-electric"
              }`}
            >
              "{product.subtitle || product.description}"
            </p>
            <p className={`font-mono text-xs md:text-sm mt-2 ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}>
              {product.description}
            </p>
          </div>

          {/* Section 2: Specs Box */}
          <div 
            style={isDark ? { borderColor: neonColor, boxShadow: `4px 4px 0px 0px ${neonColor}` } : {}}
            className={`p-6 md:p-8 rounded-lg transition-all duration-300 ${
              isDark ? "bg-black border-4 text-white" : "bg-lime border-4 border-black brutal-shadow text-black"
            }`}
          >
            <h3 className="font-syne font-bold text-lg md:text-xl uppercase mb-4 tracking-tight">
              The Specs
            </h3>
            <ul className="space-y-4">
              <li className={`flex items-center gap-4 py-2 border-b-2 ${
                isDark ? "border-gray-800" : "border-black/10"
              }`}>
                <div 
                  style={isDark ? { backgroundColor: neonColor, color: "black" } : {}}
                  className="w-8 h-8 rounded bg-black flex items-center justify-center text-lime shrink-0"
                >
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <span className="font-mono font-bold uppercase text-xs md:text-sm">
                  {product.specs[0] || "Material Espacial Premium"}
                </span>
              </li>
              <li className={`flex items-center gap-4 py-2 border-b-2 ${
                isDark ? "border-gray-800" : "border-black/10"
              }`}>
                <div 
                  style={isDark ? { backgroundColor: neonColor, color: "black" } : {}}
                  className="w-8 h-8 rounded bg-black flex items-center justify-center text-lime shrink-0"
                >
                  <Maximize2 className="w-4 h-4" />
                </div>
                <span className="font-mono font-bold uppercase text-xs md:text-sm">
                  {product.specs[1] || "Ajuste Ergonómico Perfecto"}
                </span>
              </li>
              <li className="flex items-center gap-4 py-2">
                <div 
                  style={isDark ? { backgroundColor: neonColor, color: "black" } : {}}
                  className="w-8 h-8 rounded bg-black flex items-center justify-center text-lime shrink-0"
                >
                  <Lightbulb className="w-4 h-4" />
                </div>
                <span className="font-mono font-bold uppercase text-xs md:text-sm">
                  {product.specs[2] || "Detalle que destaca y brilla"}
                </span>
              </li>
            </ul>
          </div>

          {/* Section 3: Size selectors & Huge Add Button */}
          <div 
            style={isDark ? { borderColor: neonColor, boxShadow: `4px 4px 0px 0px ${neonColor}` } : {}}
            className={`p-6 md:p-8 rounded-lg transition-all duration-300 ${
              isDark ? "bg-black border-4 text-white" : "bg-[#eadfee] border-4 border-black brutal-shadow text-black"
            }`}
          >
            <div>
              <p className="font-mono font-bold uppercase mb-3 text-xs md:text-sm tracking-widest">
                Escoge tu talla
              </p>
              <div className="flex gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    style={isDark && selectedSize === size ? { backgroundColor: neonColor, color: "black", borderColor: neonColor } : {}}
                    className={`flex-1 text-center py-3.5 border-4 border-black rounded font-syne font-extrabold text-base md:text-lg transition-all cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none ${
                      selectedSize === size
                        ? "bg-lime text-black"
                        : isDark
                          ? "bg-[#18181b] border-[#444] text-gray-300 hover:bg-zinc-800"
                          : "bg-white text-black hover:bg-lime/20"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Neon colorful button that responds to user tap with small interactive offset bounce */}
            <button
              onClick={handleAdd}
              className="w-full py-5 md:py-6 text-white border-4 border-black font-syne font-extrabold text-lg md:text-2xl hover:translate-x-[-4px] hover:translate-y-[-4px] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all uppercase rounded-lg shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] cursor-pointer text-center relative overflow-hidden"
              style={{
                background: isDark 
                  ? `linear-gradient(90deg, ${neonColor} 0%, #121212 100%)`
                  : "linear-gradient(90deg, rgb(255, 0, 255) 0%, rgb(110, 0, 193) 50%, rgb(255, 219, 88) 100%)",
                color: isDark ? "#ffffff" : "#ffffff",
                borderColor: isDark ? neonColor : "#000000",
                boxShadow: isDark ? `4px 4px 0px 0px ${neonColor}` : "6px 6px 0px 0px rgba(0,0,0,1)"
              }}
            >
              {justAdded ? (
                <span className={`flex items-center justify-center gap-2 scale-105 transition-transform drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] ${
                  isDark ? "text-lime" : "text-lime"
                }`}>
                  ¡AGREGADO CON ÉXITO!
                </span>
              ) : (
                <span className="drop-shadow-[2px_2px_0px_rgba(0,0,0,0.8)]">
                  AGREGAR AL CARRITO
                </span>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Marquee Divider */}
      <div className={`mt-16 -mx-4 md:-mx-12 py-4 overflow-hidden flex items-center select-none border-y-4 ${
        isDark ? "bg-[#18181b] border-gray-800 text-white" : "bg-black border-black text-lime"
      }`}>
        <div className={`animate-marquee flex gap-12 font-syne font-extrabold text-xl md:text-3xl uppercase italic whitespace-nowrap ${
          isDark ? "text-[#00ffff]" : "text-lime"
        }`}>
          <span>Wear Art on your Feet • </span>
          <span>Las Medias de Tatis • </span>
          <span>Style from another Planet • </span>
          <span>Limited Drops Weekly • </span>
          <span>Wear Art on your Feet • </span>
          <span>Las Medias de Tatis • </span>
          <span>Style from another Planet • </span>
          <span>Limited Drops Weekly • </span>
        </div>
      </div>

      {/* Extra Section: Gallery Bento Grid matching bottom layout of third screenshot */}
      <div className="mt-16 select-none">
        <h3 className={`font-syne font-extrabold text-2xl md:text-3xl uppercase mb-8 text-center md:text-left tracking-tight ${
          isDark ? "text-lime" : "text-black"
        }`}>
          TATIS EN ACCIÓN
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {/* Card A: Structured stack of socks image */}
          <div 
            style={isDark ? { borderColor: "#bc13fe", boxShadow: "4px 4px 0px 0px #bc13fe" } : {}}
            className={`aspect-square border-4 rounded-lg overflow-hidden bg-electric relative group transition-all duration-300 ${
              isDark ? "" : "border-black brutal-shadow"
            }`}
          >
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQeCvYLcNnN6GGaCNDw-30jZueGkYnZNYbz_mtC7Jt_9iZw4Dri5ZF7yQICYhmtlmLVjhsTX8xGpV6s4khLaOx5IXhOUd38Uuv5_9CzvYBfpjIupZRk1C6Q87TdkkMYzKxLo_u10zBcUcDsH1JLmdvyKAFfzNapm22ZvuO5cmWzdNv2tfOuYPhj-R3Cu4Lcvt2rfTRHa3JBVZT7NOzI3vDF30a8Bd6HdMEtTiAoXyiHEUxrrCVch5Xc-qkwKGwhAFiBrvDxMPz3oA"
              alt="Grid of socks visual"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Card B: Free shipping info block with vibrant neobrutalist colors */}
          <div 
            style={isDark ? { borderColor: "#39ff14", boxShadow: "4px 4px 0px 0px #39ff14" } : {}}
            className={`aspect-square rounded-lg flex items-center justify-center p-6 text-center transition-all duration-300 ${
              isDark 
                ? "bg-black text-[#39ff14] border-4" 
                : "bg-lime text-black border-4 border-black brutal-shadow"
            }`}
          >
            <div className="flex flex-col items-center gap-3">
              <ShoppingBag className={`w-10 h-10 animate-bounce ${isDark ? "text-[#39ff14]" : "text-black"}`} />
              <p className="font-syne font-extrabold text-xl md:text-2xl uppercase tracking-tight leading-none">
                ENVÍO GRATIS
              </p>
              <p className={`font-mono text-xs md:text-sm font-bold ${isDark ? "text-[#39ff14]/80" : "text-black"}`}>
                EN COMPRAS SUPERIORES A {formatPrice(50, currency)}
              </p>
            </div>
          </div>

          {/* Card C: Urban street shoes photography block */}
          <div 
            style={isDark ? { borderColor: "#ff007f", boxShadow: "4px 4px 0px 0px #ff007f" } : {}}
            className={`aspect-square border-4 rounded-lg overflow-hidden bg-[#93075d] relative group transition-all duration-300 ${
              isDark ? "" : "border-black brutal-shadow"
            }`}
          >
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCMJMno4R6TgTVOfJDXVa0krXK50ym074SYxLx8nb9p9VntzpOyDHPEpCFbc7KWUhHDRx6QEJYUkktyOCKJvq9djzfNAhwp3QHxIH2mcbThfIFgfiTF9EXo2QN5XXPUOPgYsBlLiiSXUKkJDWO2TwBoKb8fwXOO1mjZ2mvSdaX-DY304aqlemASVgrnZ98lczBJCBJ4g5sQnlVeEdxkdAmQliEFH-bvkrL4En-Wgk1M71bCzcMUhkPy_VN94nXAXuXPUrMah8mfV8Y"
              alt="Urban apparel socks photography"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Card D: Rocket launch flight illustration box */}
          <div 
            style={isDark ? { borderColor: "#00ffff", boxShadow: "4px 4px 0px 0px #00ffff" } : {}}
            className={`aspect-square rounded-lg flex items-center justify-center p-6 text-center transition-all duration-300 ${
              isDark 
                ? "bg-black text-[#00ffff] border-4" 
                : "bg-white text-black border-4 border-black brutal-shadow"
            }`}
          >
            <div className="space-y-4 flex flex-col items-center">
              <div className={`p-4 rounded-full border-2 border-black inline-block shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
                isDark ? "bg-[#00ffff]" : "bg-lime"
              }`}>
                <Rocket className="w-10 h-10 text-black" />
              </div>
              <div>
                <p className="font-syne font-extrabold text-lg md:text-xl uppercase leading-tight tracking-tight">
                  LISTOPARALASALIDA
                </p>
                <p className={`font-mono text-[10px] md:text-xs font-bold uppercase mt-1 ${
                  isDark ? "text-[#00ffff]/80" : "text-gray-500"
                }`}>
                  Ready for Takeoff
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
