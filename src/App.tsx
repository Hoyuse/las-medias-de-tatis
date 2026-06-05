/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { PRODUCTS } from "./data";
import { Product, CartItem } from "./types";
import Header from "./components/Header";
import ProductCard from "./components/ProductCard";
import ProductDetail from "./components/ProductDetail";
import CartDrawer from "./components/CartDrawer";
import WelcomeVideo from "./components/WelcomeVideo";
import { formatPrice } from "./utils";
import { 
  X, Check, Sparkles, Send, MapPin, 
  CreditCard, ShieldAlert, Heart, MessageSquare, 
  ArrowLeft, ArrowRight, Target, Compass, Eye, Smile
} from "lucide-react";

export default function App() {
  // --- States ---
  // Store cart items inside client local storage so state is kept
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("tatis_cart");
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("explore"); // 'explore' or 'contact'

  // Form states
  const [emailInput, setEmailInput] = useState<string>("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState<boolean>(false);

  // Modal controls
  const [showCheckoutModal, setShowCheckoutModal] = useState<boolean>(false);
  const [checkoutComplete, setCheckoutComplete] = useState<boolean>(false);
  const [showWishlistModal, setShowWishlistModal] = useState<boolean>(false);
  const [showSupportModal, setShowSupportModal] = useState<boolean>(false);
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem("tatis_wishlist");
    return saved ? JSON.parse(saved) : [];
  });
  const [currency, setCurrency] = useState<"USD" | "COP">(() => {
    const saved = localStorage.getItem("tatis_currency");
    return (saved === "COP" || saved === "USD") ? saved : "USD";
  });
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const saved = localStorage.getItem("tatis_theme");
    return (saved === "dark" || saved === "light") ? saved : "light";
  });

  // Client checkout forms
  const [shippingName, setShippingName] = useState<string>("");
  const [shippingAddress, setShippingAddress] = useState<string>("");
  const [shippingZip, setShippingZip] = useState<string>("");

  // Support state
  const [supportName, setSupportName] = useState<string>("");
  const [supportMessage, setSupportMessage] = useState<string>("");
  const [supportSubmitted, setSupportSubmitted] = useState<boolean>(false);

  // Custom coordinate system for cursor follower
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHoveringElement, setIsHoveringElement] = useState<boolean>(false);

  // Carousel ref mapping
  const bentoContainerRef = useRef<HTMLDivElement>(null);

  // --- Effects ---
  // Save cart to local storage
  useEffect(() => {
    localStorage.setItem("tatis_cart", JSON.stringify(cart));
  }, [cart]);

  // Save wishlist to local storage
  useEffect(() => {
    localStorage.setItem("tatis_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // Save currency setting to local storage
  useEffect(() => {
    localStorage.setItem("tatis_currency", currency);
  }, [currency]);

  // Save theme setting to local storage & update root HTML class
  useEffect(() => {
    localStorage.setItem("tatis_theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  // Handle client-side pointer visual follower
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Set up pointer hover detector listeners for links/buttons
  useEffect(() => {
    const addHoverListeners = () => {
      const interactiveEls = document.querySelectorAll("a, button, select, input, [role='button']");
      interactiveEls.forEach((el) => {
        el.addEventListener("mouseenter", () => setIsHoveringElement(true));
        el.addEventListener("mouseleave", () => setIsHoveringElement(false));
      });
    };

    // Timeout allows DOM parsing after tabs switch or state draws
    const timer = setTimeout(addHoverListeners, 150);
    return () => clearTimeout(timer);
  }, [selectedProduct, activeTab, isCartOpen, showCheckoutModal, showWishlistModal, showSupportModal]);

  // --- Functions ---
  const handleAddToCart = (product: Product, size: string, quantityToAdd: number = 1) => {
    const itemId = `${product.id}-${size}`;
    setCart((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      if (existing) {
        return prev.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + quantityToAdd } : item
        );
      }
      return [...prev, { id: itemId, product, size, quantity: quantityToAdd }];
    });
    // Open the cart drawers and provide delightful microfeedback
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (itemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === itemId) {
            const nextQty = item.quantity + delta;
            return { ...item, quantity: nextQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    setNewsletterSubscribed(true);
    setEmailInput("");
    setTimeout(() => {
      setNewsletterSubscribed(false);
    }, 4000);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      }
      return [...prev, productId];
    });
  };

  const getWhatsAppLink = () => {
    const itemsText = cart.map(item => `🧦 ${item.product.name} (Talla: ${item.size}) x${item.quantity}`).join("\n");
    const totalAmountRaw = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const formattedTotal = formatPrice(totalAmountRaw, currency);
    const text = `¡Hola Tatis! 🧦✨ Me gustaría completar mi compra en Las Medias de Tatis.

🛒 MI PEDIDO:
${itemsText}

💰 TOTAL A PAGAR (Nequi): ${formattedTotal}

👤 CLIENTE: ${shippingName}
📍 DIRECCIÓNDE ENVÍO: ${shippingAddress}
📮 CÓDIGO POSTAL: ${shippingZip}

Acabo de hacer la solicitud en la web. Te enviaré el comprobante de transferencia de Nequi (+57 317 0517020) por aquí. ¡Muchas gracias! 👋🚀`;

    return `https://wa.me/573170517020?text=${encodeURIComponent(text)}`;
  };

  const handleTriggerCheckout = () => {
    setIsCartOpen(false);
    setShowCheckoutModal(true);
  };

  const handleCompleteCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutComplete(true);
    
    // Redirect to WhatsApp with pre-filled message
    const waUrl = getWhatsAppLink();
    try {
      window.open(waUrl, "_blank", "noopener,noreferrer");
    } catch (err) {
      console.warn("Popup windows might be blocked inside iframe, manual trigger button is available on next step", err);
    }
  };

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSupportSubmitted(true);
    setSupportName("");
    setSupportMessage("");
    setTimeout(() => {
      setSupportSubmitted(false);
      setShowSupportModal(false);
    }, 3000);
  };

  const handleScrollBento = (direction: number) => {
    if (bentoContainerRef.current) {
      const scrollAmount = 424; // Card width base + gap spacing
      bentoContainerRef.current.scrollBy({
        left: direction * scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className={`custom-cursor-area relative min-h-screen font-mono overflow-x-hidden pb-12 transition-colors duration-300 ${
      theme === "dark" ? "bg-[#0b0318] text-white" : "bg-mustard text-black"
    }`}>
      {/* Client-side circle follower cursor matching style */}
      <div
        className="fixed pointer-events-none z-[9999] rounded-full border-3 border-black bg-lime mix-blend-difference hidden md:block transition-all duration-75"
        style={{
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`,
          width: isHoveringElement ? "45px" : "30px",
          height: isHoveringElement ? "45px" : "30px",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Floating pill menu header */}
      <Header
        cartCount={totalCartCount}
        onToggleCart={() => setIsCartOpen(true)}
        onGoHome={() => {
          setSelectedProduct(null);
          setActiveTab("explore");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        onViewContact={() => setShowSupportModal(true)}
        onViewMision={() => {
          setSelectedProduct(null);
          setActiveTab("mision");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        activeTab={activeTab}
        currency={currency}
        onSetCurrency={setCurrency}
        theme={theme}
        onToggleTheme={() => setTheme((prev) => (prev === "light" ? "dark" : "light"))}
      />

      {/* Cart navigation drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleTriggerCheckout}
        onWishlistClick={() => {
          setIsCartOpen(false);
          setShowWishlistModal(true);
        }}
        onSupportClick={() => {
          setIsCartOpen(false);
          setShowSupportModal(true);
        }}
        currency={currency}
        theme={theme}
      />

      {/* Dynamic Main Body render space */}
      <main className="pt-28 md:pt-32">
        {selectedProduct ? (
          /* High-Fidelity Product Detail View */
          <ProductDetail
            product={selectedProduct}
            onAddToCart={handleAddToCart}
            onBack={() => {
              setSelectedProduct(null);
              window.scrollTo({ top: 0, behavior: "auto" });
            }}
            currency={currency}
            theme={theme}
          />
        ) : activeTab === "mision" ? (
          /* "Misión y Visión" View */
          <div className="max-w-6xl mx-auto px-6 py-8 md:py-12 select-none">
            {/* Header Title with stunning shadow & neon effect depending on theme */}
            <div className="text-center mb-12">
              <h2 className={`font-syne font-extrabold text-4xl md:text-6xl uppercase tracking-tight transition-colors duration-300 ${
                theme === "dark" ? "text-[#39ff14] drop-shadow-[0_2px_15px_rgba(57,255,20,0.4)]" : "text-black"
              }`}>
                NUESTRO MANIFIESTO
              </h2>
              <p className={`font-mono text-sm md:text-base font-bold uppercase mt-2 transition-colors duration-300 ${
                theme === "dark" ? "text-[#ff007f]" : "text-electric font-bold"
              }`}>
                El plan secreto detrás de Las Medias de Tatis 🚀🧦
              </p>
            </div>

            {/* Two-Column Grid: Misión & Visión */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-16">
              {/* Card 1: Misión */}
              <div 
                className={`p-8 rounded-lg border-4 border-black transition-all duration-300 transform hover:scale-[1.02] flex flex-col justify-between ${
                  theme === "dark"
                    ? "bg-[#110724] border-[#39ff14] text-white shadow-[6px_6px_0px_0px_#39ff14]"
                    : "bg-white border-black text-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
                }`}
              >
                <div>
                  <div className={`w-14 h-14 rounded-full border-3 border-black flex items-center justify-center mb-6 font-syne font-extrabold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
                    theme === "dark" ? "bg-[#39ff14] text-black" : "bg-lime text-black"
                  }`}>
                    <Target className="w-7 h-7" />
                  </div>
                  <h3 className="font-syne font-extrabold text-2xl md:text-3xl uppercase tracking-tight mb-4 text-[#ff007f]">
                    NUESTRA MISIÓN
                  </h3>
                  <p className="font-mono text-sm md:text-base leading-relaxed font-semibold">
                    Desterrar el aburrimiento de los pies del mundo. Creamos prendas que no solo abrigan, sino que gritan personalidad, permitiendo que cada paso sea una declaración de arte, libertad y color. Diseñamos medias con vibras intergalácticas y Neo-brutalistas para que camines con la frente en alto y los pies bien puestos en el futuro.
                  </p>
                </div>
                <div className="mt-8 border-t-2 border-dashed border-black/25 dark:border-white/20 pt-4 flex justify-between items-center text-xs font-bold font-mono">
                  <span>OBJETIVO SOLAR</span>
                  <span className="text-[#39ff14] dark:text-[#39ff14]">100% ACTIVO</span>
                </div>
              </div>

              {/* Card 2: Visión */}
              <div 
                className={`p-8 rounded-lg border-4 border-black transition-all duration-300 transform hover:scale-[1.02] flex flex-col justify-between ${
                  theme === "dark"
                    ? "bg-[#110724] border-[#ff007f] text-white shadow-[6px_6px_0px_0px_#ff007f]"
                    : "bg-[#eadfee] border-black text-black shadow-[6px_6px_0px_0px_rgba(110,0,193,1)]"
                }`}
              >
                <div>
                  <div className={`w-14 h-14 rounded-full border-3 border-black flex items-center justify-center mb-6 font-syne font-extrabold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
                    theme === "dark" ? "bg-[#ff007f] text-white" : "bg-electric text-white"
                  }`}>
                    <Compass className="w-7 h-7" />
                  </div>
                  <h3 className="font-syne font-extrabold text-2xl md:text-3xl uppercase tracking-tight mb-4 text-black dark:text-white">
                    NUESTRA VISIÓN
                  </h3>
                  <p className="font-mono text-sm md:text-base leading-relaxed font-semibold">
                    Posicionarnos para el 2030 como la marca líder en el universo de la moda streetwear de calcetines de diseño alternativo en toda Latinoamérica. Queremos ser la primera opción para los rebeldes del estilo, los amantes de la comodidad extrema y cualquiera que crea que la ropa es un lienzo en blanco para expresarse.
                  </p>
                </div>
                <div className="mt-8 border-t-2 border-dashed border-black/25 dark:border-white/20 pt-4 flex justify-between items-center text-xs font-bold font-mono">
                  <span>DESTINO COSMOS</span>
                  <span className="text-electric dark:text-[#00ffff]">RUMBO FIJO</span>
                </div>
              </div>
            </div>

            {/* Section: Los Valores Creativos */}
            <h4 className={`text-center font-syne font-extrabold text-2xl md:text-3xl uppercase tracking-tight mb-8 ${
              theme === "dark" ? "text-white" : "text-black"
            }`}>
              NUESTROS VALORES CÓSMICOS
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Valor A */}
              <div className={`p-6 border-4 border-black rounded-lg transition-all duration-300 hover:-translate-y-1 ${
                theme === "dark"
                  ? "bg-[#140b24] border-[#00ffff] shadow-[4px_4px_0px_0px_#00ffff]"
                  : "bg-white border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              }`}>
                <div className="flex items-center gap-3 mb-3">
                  <Sparkles className="w-5 h-5 text-yellow-400 shrink-0" />
                  <p className="font-syne font-extrabold text-lg uppercase">DISEÑO AL AIRE</p>
                </div>
                <p className="font-mono text-xs md:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  Cero copias o patrones aburridos. Diseños 100% de autor con vibras espaciales que gritan autenticidad sin censura.
                </p>
              </div>

              {/* Valor B */}
              <div className={`p-6 border-4 border-black rounded-lg transition-all duration-300 hover:-translate-y-1 ${
                theme === "dark"
                  ? "bg-[#140b24] border-[#39ff14] shadow-[4px_4px_0px_0px_#39ff14]"
                  : "bg-white border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              }`}>
                <div className="flex items-center gap-3 mb-3">
                  <Smile className="w-5 h-5 text-lime shrink-0" />
                  <p className="font-syne font-extrabold text-lg uppercase">COMODIDAD SUPREMA</p>
                </div>
                <p className="font-mono text-xs md:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  Hilo de algodón peinado reforzado y costuras invisibles para que flotes en el espacio exterior todo el día.
                </p>
              </div>

              {/* Valor C */}
              <div className={`p-6 border-4 border-black rounded-lg transition-all duration-300 hover:-translate-y-1 ${
                theme === "dark"
                  ? "bg-[#140b24] border-[#ff007f] shadow-[4px_4px_0px_0px_#ff007f]"
                  : "bg-[#eadfee] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              }`}>
                <div className="flex items-center gap-3 mb-3">
                  <Eye className="w-5 h-5 text-electric shrink-0" />
                  <p className="font-syne font-extrabold text-lg uppercase">ENFOQUE LOCAL</p>
                </div>
                <p className="font-mono text-xs md:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  Insumos de excelente procedencia local y empaques minimalistas y reciclables para cuidar nuestro planeta lila.
                </p>
              </div>
            </div>

            {/* Action button to explore */}
            <div className="text-center mt-12">
              <button
                onClick={() => {
                  setActiveTab("explore");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`px-8 py-4 border-4 border-black font-syne font-extrabold text-lg uppercase rounded shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] active:translate-y-[2px] cursor-pointer ${
                  theme === "dark"
                    ? "bg-[#39ff14] text-black hover:bg-white border-[#39ff14] hover:shadow-[6px_6px_0px_0px_#ff007f]"
                    : "bg-lime text-black hover:bg-white"
                }`}
              >
                Volver al Catálogo ➔
              </button>
            </div>
          </div>
        ) : (
          /* Infinite explore catalog / home layout */
          <>
            {/* Section A: Hero Panel Collage matching screenshot */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-0 border-b-4 border-black select-none">
              <div className={`p-8 md:p-14 lg:p-18 flex flex-col justify-center border-r-0 md:border-r-4 border-black text-left transition-colors duration-300 ${
                theme === "dark" ? "bg-[#110724] text-white" : "bg-white text-black"
              }`}>
                <h1 className={`font-syne font-extrabold text-4xl md:text-5xl lg:text-6xl mb-6 leading-none tracking-tight transition-colors duration-300 ${
                  theme === "dark" ? "text-[#ff007f] drop-shadow-[0_2px_10px_rgba(255,0,127,0.3)]" : "text-electric"
                }`}>
                  La vida es muy corta para usar medias aburridas.
                </h1>
                <p className={`font-syne font-semibold text-lg md:text-2xl mb-10 tracking-tight transition-colors duration-300 ${
                  theme === "dark" ? "text-gray-300" : "text-black"
                }`}>
                  Ponle estilo a tus pies con Tatis.
                </p>
                <button
                  onClick={() => {
                    const el = document.getElementById("explorar-catalogo");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`w-full sm:w-fit px-10 py-5 font-syne font-extrabold text-xl md:text-2xl uppercase rounded tracking-wide hover:translate-x-[-4px] hover:translate-y-[-4px] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all cursor-pointer ${
                    theme === "dark"
                      ? "bg-[#39ff14] text-black border-4 border-black shadow-[6px_6px_0px_0px_#ff007f] hover:shadow-[10px_10px_0px_0px_#ff007f]"
                      : "bg-lime text-black border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]"
                  }`}
                >
                  EXPLORAR COLECCIÓN
                </button>
              </div>

              {/* Right Hero block carrying the large neon collage sock pattern illustration */}
              <div className={`h-[360px] md:h-auto overflow-hidden relative flex items-center justify-center p-8 transition-colors duration-300 ${
                theme === "dark" ? "bg-black" : "bg-[#6e00c1]"
              }`}>
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuArL6lPqYCxiWJTSN1ryRxDZY3NC3w1au_vSPJ0T5CW4pMgiOtpzZ8LJ8Z-sYDBzyx7gUA02oSJOa5DZM_Wshzy7zI5taNWaYB7EfoWXB_v7BZ8CWQWhx5oR0AUAV7g8A4FA3E-yWc1_CGOGxjLz5gI9qF8EqklWYxnQuOXIdANLoEci81SY8a1LMddU0CQOsU8CDo0O4OY-HgCBU_WTGAB-DFAzgNOSxwAiM8DKV-QjxbCcworXSKKt9Sl-iWeOVXCVx2rKLSoDzI"
                  alt="Space Socks Poster art collage"
                  referrerPolicy="no-referrer"
                  className={`w-full h-full object-cover border-4 rounded-lg transition-all duration-300 ${
                    theme === "dark" ? "border-[#39ff14] shadow-[8px_8px_0px_0px_#39ff14]" : "border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
                  }`}
                />
              </div>
            </section>

            {/* Section B: Running Marquee moving banner matches first and second screenshots */}
            <section className={`py-3 md:py-4 border-b-4 border-black marquee-container select-none overflow-hidden transition-colors duration-300 ${
              theme === "dark" ? "bg-[#18181b] border-gray-800 text-[#00ffff]" : "bg-black text-lime"
            }`}>
              <div className="animate-marquee flex gap-8 text-lg md:text-2xl font-syne font-extrabold uppercase italic whitespace-nowrap">
                <span>Mis pies nunca fueron tan felices • Adiós a las medias blancas • Estilo Tatis • Mis pies nunca fueron tan felices • Adiós a las medias blancas • Estilo Tatis • </span>
                <span>Mis pies nunca fueron tan felices • Adiós a las medias blancas • Estilo Tatis • Mis pies nunca fueron tan felices • Adiós a las medias blancas • Estilo Tatis • </span>
              </div>
            </section>

            {/* Section C: Interactive Catalog Carousel */}
            <section id="explorar-catalogo" className="px-4 sm:px-6 md:px-12 py-10 sm:py-16 max-w-7xl mx-auto">
              {/* Beautiful interactive welcome video of Las Medias de Tatis */}
              <WelcomeVideo theme={theme} />

              {/* Heading elements matching screenshot */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4 select-none">
                <div>
                  <h2 className={`font-syne font-extrabold text-3xl md:text-5xl uppercase leading-none tracking-tight transition-colors duration-300 ${
                    theme === "dark" ? "text-[#39ff14]" : "text-black"
                  }`}>
                    LOS FAVORITOS
                  </h2>
                  <p className={`font-mono text-xs md:text-sm font-bold uppercase mt-1 transition-colors duration-300 ${
                    theme === "dark" ? "text-gray-400" : "text-gray-700"
                  }`}>
                    Edición Limitada • Suaves • Hechas con amor
                  </p>
                </div>
                {/* Arrow controllers to scroll left and right manually */}
                <div className="flex gap-3">
                  <button
                    onClick={() => handleScrollBento(-1)}
                    className={`p-3.5 border-3 rounded transition-all cursor-pointer ${
                      theme === "dark"
                        ? "bg-black text-[#00ffff] border-[#00ffff] shadow-[3px_3px_0px_0px_#00ffff]"
                        : "bg-white text-black border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                    } hover:translate-y-[-2px] active:translate-y-[2px] active:shadow-none`}
                    aria-label="Anterior"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleScrollBento(1)}
                    className={`p-3.5 border-3 rounded transition-all cursor-pointer ${
                      theme === "dark"
                        ? "bg-black text-[#00ffff] border-[#00ffff] shadow-[3px_3px_0px_0px_#00ffff]"
                        : "bg-white text-black border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                    } hover:translate-y-[-2px] active:translate-y-[2px] active:shadow-none`}
                    aria-label="Siguiente"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Bento box scroll containers */}
              <div
                ref={bentoContainerRef}
                className="flex gap-4 sm:gap-6 overflow-x-auto pb-6 scroll-smooth snap-x snap-mandatory scrollbar-none bento-scroll"
                style={{ scrollbarWidth: "none" }}
              >
                {PRODUCTS.map((prod) => (
                  <div key={prod.id} className="min-w-[242px] sm:min-w-[340px] md:min-w-[390px] max-w-[420px] snap-start flex-shrink-0">
                    <ProductCard
                      product={prod}
                      onAddToCart={handleAddToCart}
                      onSelectProduct={(p) => {
                        setSelectedProduct(p);
                        window.scrollTo({ top: 0, behavior: "auto" });
                      }}
                      currency={currency}
                      theme={theme}
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* Section D: Community / Club Registration Block */}
            <section className="mx-6 md:mx-12 mb-16 select-none">
              <div className={`max-w-4xl mx-auto border-4 p-8 md:p-14 text-center rounded-lg transition-all duration-300 ${
                theme === "dark"
                  ? "bg-[#0b0318] border-[#ff007f] shadow-[8px_8px_0px_0px_#ff007f]"
                  : "bg-[#eadfee] border-black shadow-[8px_8px_0px_0px_rgba(147,7,93,1)]"
              }`}>
                <h2 className={`font-syne font-extrabold text-3xl md:text-4xl mb-4 uppercase tracking-tight transition-colors duration-300 ${
                  theme === "dark" ? "text-[#ff007f] drop-shadow-[0_2px_10px_rgba(255,0,127,0.3)]" : "text-bubblegum"
                }`}>
                  ÚNETE AL CLUB TATIS
                </h2>
                <p className={`font-mono text-sm md:text-base max-w-xl mx-auto mb-10 leading-relaxed font-semibold transition-colors duration-300 ${
                  theme === "dark" ? "text-gray-300" : "text-black/80"
                }`}>
                  Suscríbete para recibir noticias de nuevos drops, diseños exclusivos y fotos de pies con estilo. No enviamos spam, solo arte.
                </p>

                {newsletterSubscribed ? (
                  <div className="p-4 bg-lime border-3 border-black text-black inline-flex items-center gap-2 rounded font-bold uppercase text-xs md:text-sm animate-bounce shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                    <Check className="w-5 h-5 shrink-0" />
                    ¡Bienvenido al Club! Tu cupón de descuento fue enviado por email.
                  </div>
                ) : (
                  <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
                    <input
                      required
                      type="email"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder="TU EMAIL AQUÍ"
                      className={`flex-grow p-4 md:p-5 text-sm md:text-base border-3 border-black rounded uppercase font-bold tracking-wider placeholder-gray-400 focus:outline-none transition-colors ${
                        theme === "dark"
                          ? "bg-zinc-900 text-white focus:bg-zinc-800 focus:border-[#ff007f]"
                          : "bg-white text-black focus:bg-lime/20"
                      }`}
                    />
                    <button
                      type="submit"
                      className={`px-8 py-4 md:py-5 border-3 border-black font-syne font-extrabold text-sm md:text-base uppercase rounded tracking-wider transition-all cursor-pointer ${
                        theme === "dark"
                          ? "bg-[#ff007f] text-white shadow-[4px_4px_0px_0px_#000000] hover:translate-y-[-3px] hover:shadow-[5px_5px_0px_0px_#00ffff]"
                          : "bg-electric text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-3px] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-none"
                      }`}
                    >
                      ¡ME APUNTO!
                    </button>
                  </form>
                )}
              </div>
            </section>
          </>
        )}
      </main>

      {/* Responsive unified footer elements matching mockup */}
      <footer className={`w-full mt-10 py-10 px-8 md:px-12 border-t-4 select-none duration-300 transition-colors ${
        theme === "dark" ? "bg-[#05030a] border-gray-800 text-white" : "bg-black text-white border-black"
      }`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className={`font-syne font-extrabold text-lg md:text-xl tracking-tighter uppercase transition-colors ${
            theme === "dark" ? "text-[#39ff14] drop-shadow-[0_0_8px_rgba(57,255,20,0.5)]" : "text-yellow-300"
          }`}>
            LAS MEDIAS DE TATIS
          </div>
          <div className="flex gap-6 flex-wrap justify-center text-xs md:text-sm font-bold font-mono">
            <button onClick={() => setShowSupportModal(true)} className="hover:text-lime uppercase transition-colors">Soporte</button>
            <button onClick={() => setShowWishlistModal(true)} className="hover:text-lime uppercase transition-colors">Tus Favoritos</button>
            <a href="#" className="hover:text-lime uppercase transition-colors">Privacy</a>
            <a href="#" className="hover:text-lime uppercase transition-colors">Terms</a>
            <a href="#" className="hover:text-lime uppercase transition-colors">Shipping</a>
          </div>
          <div className="text-xs md:text-sm text-gray-400 font-mono space-y-1">
            <p className="uppercase font-bold tracking-[0.18em]">Proyecto con licencia</p>
            <p className="leading-snug">
              <a
                href="https://las-medias-de-tatis.vercel.app/"
                target="_blank"
                rel="noreferrer"
                className="underline hover:text-lime"
              >
                Las Medias de Tatis
              </a> by
              <a
                href="https://github.com/Hoyuse"
                target="_blank"
                rel="noreferrer"
                className="underline hover:text-lime mx-1"
              >
                Valeria Tatis sosa
              </a>
              is marked
              <a
                href="https://creativecommons.org/publicdomain/zero/1.0/"
                target="_blank"
                rel="noreferrer"
                className="underline hover:text-lime mx-1"
              >
                CC0 1.0
              </a>
              <img
                src="https://mirrors.creativecommons.org/presskit/icons/cc.svg"
                alt="CC"
                className="inline-block w-4 h-4 ml-1 align-text-bottom"
              />
              <img
                src="https://mirrors.creativecommons.org/presskit/icons/zero.svg"
                alt="Zero"
                className="inline-block w-4 h-4 ml-1 align-text-bottom"
              />
            </p>
          </div>
        </div>
      </footer>

      {/* MODAL 1: CHECKOUT SCREEN MODAL */}
      {showCheckoutModal && (
        <div className="fixed inset-0 z-[70] bg-black/75 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border-4 border-black p-6 md:p-8 max-w-lg w-full rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative select-none">
            <button
              onClick={() => {
                setShowCheckoutModal(false);
                setCheckoutComplete(false);
              }}
              className="absolute top-4 right-4 p-1 rounded-full border-2 border-black bg-[#eadfee] text-black hover:bg-red-500 hover:text-white cursor-pointer"
            >
              <X className="w-4.5 h-4.5" />
            </button>

            {checkoutComplete ? (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-lime text-black border-3 border-black rounded-full flex items-center justify-center mx-auto mb-6 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] animate-bounce font-syne font-semibold text-2xl">
                  ✓
                </div>
                <h3 className="font-syne font-extrabold text-2xl md:text-3xl uppercase text-electric mb-2">
                  ¡SOLICITUD LISTA!
                </h3>
                <p className="font-mono text-xs md:text-sm text-gray-700 max-w-sm mx-auto mb-6">
                  ¡Pedido registrado! Para terminar tu compra, haz clic en el botón de abajo para enviarnos los detalles y el comprobante de Nequi directamente por WhatsApp.
                </p>

                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-4 bg-[#69fd5d] text-black border-4 border-black font-syne font-extrabold text-base md:text-lg uppercase rounded shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer text-center"
                >
                  💬 IR A WHATSAPP AHORA
                </a>

                <div className="mt-8 pt-4 border-t-2 border-dashed border-black/25">
                  <p className="font-mono text-[10px] text-gray-500 uppercase font-bold">
                    NEQUI & WHATSAPP: +57 317 0517020
                  </p>
                </div>

                <button
                  onClick={() => {
                    setShowCheckoutModal(false);
                    setCheckoutComplete(false);
                    setCart([]); // Empty cart to complete the flow
                  }}
                  className="mt-6 text-xs text-gray-600 underline hover:text-black block mx-auto font-mono uppercase font-bold cursor-pointer"
                >
                  Regresar a la tienda
                </button>
              </div>
            ) : (
              <div>
                <h3 className="font-syne font-extrabold text-2xl uppercase text-electric mb-2">
                  COMPLETAR PEDIDO
                </h3>
                <p className="font-mono text-xs text-gray-500 uppercase mb-4 leading-none font-bold">
                  Las Medias de Tatis • Pago Exclusivo con Nequi
                </p>

                {/* Clean, high contrast Nequi detail card */}
                <div className="bg-[#f0e4f7] border-3 border-black p-4 rounded-lg mb-4 shadow-[3px_3px_0px_0px_rgba(110,0,193,1)] select-none">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-electric text-white text-[9px] font-mono font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wider">
                      MEDIO DE PAGO
                    </span>
                    <span className="text-xs font-mono font-bold text-electric">Sólo Nequi Disponible</span>
                  </div>
                  
                  <div className="flex justify-between items-center bg-white border-2 border-black p-3 rounded mt-2">
                    <div>
                      <p className="font-mono text-[9px] text-gray-500 font-bold uppercase leading-none">NÚMERO DE NEQUI</p>
                      <p className="font-mono font-extrabold text-lg text-black mt-1 tracking-wider">317 0517020</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText("3170517020");
                        alert("¡Número de Nequi copiado al portapapeles!");
                      }}
                      className="px-2.5 py-1.5 bg-lime hover:bg-white text-black text-[10px] font-mono font-bold uppercase border-2 border-black rounded shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[1px]"
                    >
                      Copiar
                    </button>
                  </div>

                  <p className="text-[10px] text-gray-600 font-mono mt-3 leading-tight uppercase font-semibold">
                    💡 PASOS: 1. Llena tus datos abajo. 2. Haz clic en "Enviar y Terminar en WhatsApp". 3. Se abrirá el chat para enviarnos el comprobante de Nequi de este pedido.
                  </p>
                </div>

                <form onSubmit={handleCompleteCheckout} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase mb-1">Nombre Completo</label>
                    <div className="relative">
                      <input
                        required
                        type="text"
                        value={shippingName}
                        onChange={(e) => setShippingName(e.target.value)}
                        placeholder="ALEX ALIEN"
                        className="w-full p-3 border-2 border-black rounded bg-white font-mono text-sm focus:outline-none uppercase font-bold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase mb-1">Dirección de Envío</label>
                    <div className="relative">
                      <input
                        required
                        type="text"
                        value={shippingAddress}
                        onChange={(e) => setShippingAddress(e.target.value)}
                        placeholder="AV. GALAXIA LILA 42"
                        className="w-full p-3 border-2 border-black rounded bg-white font-mono text-sm focus:outline-none uppercase font-bold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase mb-1">CP / Código Postal</label>
                    <input
                      required
                      type="text"
                      value={shippingZip}
                      onChange={(e) => setShippingZip(e.target.value)}
                      placeholder="27042"
                      className="w-full p-3 border-2 border-black rounded bg-white font-mono text-sm focus:outline-none font-bold"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-lime text-black border-3 border-black font-syne font-extrabold text-base md:text-lg uppercase rounded shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] active:translate-y-[2px] transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>ENVIAR Y TERMINAR EN WHATSAPP</span>
                    <span>💬</span>
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL 2: WISHLIST FAVORITES LIST */}
      {showWishlistModal && (
        <div className="fixed inset-0 z-[70] bg-black/75 flex items-center justify-center p-4">
          <div className="bg-white border-4 border-black p-6 md:p-8 max-w-md w-full rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative select-none">
            <button
              onClick={() => setShowWishlistModal(false)}
              className="absolute top-4 right-4 p-1 rounded-full border-2 border-black bg-[#eadfee] text-black hover:bg-red-500 hover:text-white cursor-pointer"
            >
              <X className="w-4.5 h-4.5" />
            </button>

            <h3 className="font-syne font-extrabold text-2xl uppercase text-bubblegum mb-2 flex items-center gap-2">
              <Heart className="w-6 h-6 fill-bubblegum text-bubblegum animate-pulse" /> TUS FAVORITOS
            </h3>
            <p className="font-mono text-xs text-gray-500 uppercase mb-6 font-bold leading-none">
              Diseños que te enamoraron
            </p>

            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
              {wishlist.length === 0 ? (
                <p className="text-center py-8 font-mono text-xs md:text-sm text-gray-400 italic font-bold">
                  No guardaste ningún favorito aún • Navega y presiona un producto para verlo detallado.
                </p>
              ) : (
                PRODUCTS.filter((p) => wishlist.includes(p.id) || p.id === "alien" || p.id === "aguacates" /* fallback populars */).map((prod) => (
                  <div
                    key={prod.id}
                    className="flex justify-between items-center p-3 border-2 border-black bg-[#fbf0ff] rounded hover:translate-y-[-1px] transition-transform"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 border-2 border-black bg-white rounded overflow-hidden flex items-center justify-center">
                        {prod.image === "TRÁEME CAFÉ" ? (
                          <span className="font-syne font-extrabold text-[8px] uppercase leading-none">CAFÉ</span>
                        ) : (
                          <img src={prod.image} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        )}
                      </div>
                      <div>
                        <span className="font-syne font-bold text-xs uppercase text-black leading-none block">
                          {prod.name}
                        </span>
                        <span className="font-mono text-[10px] text-gray-500">{formatPrice(prod.price, currency)}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedProduct(prod);
                        setShowWishlistModal(false);
                      }}
                      className="px-3 py-1 bg-lime text-black border-2 border-black font-mono font-bold text-xs uppercase rounded hover:bg-white cursor-pointer shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
                    >
                      Ver
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: CONTACT & SUPPORT FORM SCREEN */}
      {showSupportModal && (
        <div className="fixed inset-0 z-[70] bg-black/75 flex items-center justify-center p-4">
          <div className="bg-white border-4 border-black p-6 md:p-8 max-w-md w-full rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative select-none">
            <button
              onClick={() => {
                setShowSupportModal(false);
                setSupportSubmitted(false);
              }}
              className="absolute top-4 right-4 p-1 rounded-full border-2 border-black bg-[#eadfee] text-black hover:bg-red-500 hover:text-white cursor-pointer"
            >
              <X className="w-4.5 h-4.5" />
            </button>

            <h3 className="font-syne font-extrabold text-2xl uppercase text-electric mb-2 flex items-center gap-2">
              <MessageSquare className="w-6 h-6 text-electric" /> SOPORTE TATIS
            </h3>
            <p className="font-mono text-xs text-gray-500 uppercase mb-6 font-bold leading-none">
              ¿Dudas estelares? Estamos aquí para ti
            </p>

            {supportSubmitted ? (
              <div className="text-center py-6">
                <div className="w-12 h-12 bg-lime text-black border-2 border-black rounded-full flex items-center justify-center mx-auto mb-4 font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-lg">
                  ✓
                </div>
                <p className="font-mono text-xs md:text-sm font-bold uppercase text-black">
                  ¡Mensaje enviado con éxito!
                </p>
                <p className="font-mono text-[11px] text-gray-600 mt-2">
                  Nuestro equipo de abducción creativa te responderá en menos de 24 horas estelares.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSupportSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase mb-1">Tu Nombre o Alias</label>
                  <input
                    required
                    type="text"
                    value={supportName}
                    onChange={(e) => setSupportName(e.target.value)}
                    placeholder="SOPHIA STRANGER"
                    className="w-full p-3 border-2 border-black rounded bg-[#f5eaf9] font-mono text-sm focus:outline-none uppercase font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase mb-1">Mensaje o Consulta</label>
                  <textarea
                    required
                    rows={3}
                    value={supportMessage}
                    onChange={(e) => setSupportMessage(e.target.value)}
                    placeholder="¿CÓMO FUNCIONA EL ENVÍO CÓSMICO? ¿CUÁNDO SALE EL PRÓXIMO DROP?"
                    className="w-full p-3 border-2 border-black rounded bg-[#f5eaf9] font-mono text-xs focus:outline-none uppercase font-bold"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-lime text-black border-3 border-black font-syne font-extrabold text-sm uppercase rounded shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] active:translate-y-[2px] cursor-pointer"
                >
                  ENVIAR MENSAJE
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
