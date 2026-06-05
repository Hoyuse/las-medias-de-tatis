import React, { useState, useEffect } from "react";
import { Play, Pause, Sparkles, Tv, Volume2, VolumeX } from "lucide-react";

interface WelcomeVideoProps {
  theme: "light" | "dark";
}

interface Frame {
  url: string;
  title: string;
}

const FRAMES: Frame[] = [
  {
    url: "https://images.unsplash.com/photo-1582966772680-860e372bb558?auto=format&fit=crop&q=80&w=800",
    title: "NEÓN CHAMELEON 🦎",
  },
  {
    url: "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&q=80&w=800",
    title: "RETRO STRIPE ⚡",
  },
  {
    url: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&q=80&w=800",
    title: "VIBRA AMARILLA ☀️",
  },
  {
    url: "https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?auto=format&fit=crop&q=80&w=800",
    title: "STREET MONSTER 🦖",
  },
  {
    url: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&q=80&w=800",
    title: "COSMOS WALK 🌌",
  }
];

export default function WelcomeVideo({ theme }: WelcomeVideoProps) {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  
  // Set a smooth, slow, automatic interval speed (1.4 seconds per loop iteration)
  const speed = 1400;

  // Fully automatic loop simulating smooth clip changes
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % FRAMES.length);
    }, speed);

    return () => clearInterval(interval);
  }, [isPlaying, speed]);

  return (
    <div 
      className={`mb-14 border-4 border-black rounded-lg p-5 md:p-8 relative select-none transition-all duration-300 ${
        theme === "dark"
          ? "bg-[#110724] border-[#39ff14] shadow-[8px_8px_0px_0px_#39ff14]"
          : "bg-[#eadfee] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
      }`}
    >
      {/* Decorative Badge */}
      <div className="absolute -top-5 left-6 bg-black border-3 border-black text-lime font-mono text-xs font-bold uppercase py-1.5 px-4 rounded shadow-[3px_3px_0px_0px_rgba(0,0,0,0.15)] flex items-center gap-2">
        <Tv className="w-4 h-4 text-[#ff007f] animate-pulse" />
        <span>TATIS TV • CLIP PRESENTACIÓN</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-center mt-3">
        {/* Left Side: Creative Editorial Column */}
        <div className="lg:col-span-5 flex flex-col justify-center text-left">
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-black text-white dark:bg-[#39ff14] dark:text-black font-mono text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded">
              TATIS REEL
            </span>
            <span className="flex items-center gap-1 font-mono text-xs font-bold text-gray-700 dark:text-gray-300">
              <Sparkles className="w-3.5 h-3.5 text-yellow-500 animate-spin" />
              Estilo Neobrutalista Oficial
            </span>
          </div>

          <h3 className={`font-syne font-extrabold text-2xl md:text-3.5xl leading-none uppercase mb-4 tracking-tight ${
            theme === "dark" ? "text-white" : "text-black"
          }`}>
            ¡Conoce nuestra vibra! ⚡
          </h3>
          
          <p className="font-mono text-xs md:text-sm leading-relaxed text-gray-700 dark:text-gray-300 mb-6 font-semibold">
            Descubre en este reel de bienvenida la increíble fusión de colores urbanos, diseños atrevidos y comodidad absoluta que define a Las Medias de Tatis. Cada par es una pieza de arte pensada para vestir tus pasos con autenticidad. ¡Tus tenis se merecen este estilo sin límites!
          </p>

          <div className="flex gap-4 items-center mb-2">
            <div className="flex flex-col">
              <span className={`font-syne font-extrabold text-lg transition-colors ${theme === "dark" ? "text-primary text-[#39ff14]" : "text-electric"}`}>
                ALGODÓN PEINADO
              </span>
              <span className="font-mono text-[10px] uppercase font-bold text-gray-500">Comodidad total</span>
            </div>
            <div className="h-8 w-1 border-r-2 border-dashed border-black/40 dark:border-white/25"></div>
            <div className="flex flex-col">
              <span className="font-syne font-extrabold text-lg text-[#ff007f]">DISEÑADO AQUÍ</span>
              <span className="font-mono text-[10px] uppercase font-bold text-gray-500">
                Lanzamiento Exclusivo
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Neobrutalist Frame-by-Frame Live Screen */}
        <div className="lg:col-span-7 relative">
          <div className="relative rounded border-4 border-black overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_#39ff14] aspect-video group bg-black">
            
            {/* Live Rotated Image representing the simulated Video stream */}
            <img
              src={FRAMES[currentFrame].url}
              alt={FRAMES[currentFrame].title}
              className="w-full h-full object-cover transition-opacity duration-300 select-none pointer-events-none"
              referrerPolicy="no-referrer"
            />

            {/* Glowing Tag overlay at the top left corner of the screen */}
            <div className="absolute top-4 left-4 bg-black/95 text-white border-2 border-black px-3 py-1 rounded font-mono text-xs font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full animate-ping bg-[#39ff14]"></span>
              <span>{FRAMES[currentFrame].title}</span>
            </div>

            {/* Visual Screen Scanlines/Noise Layer for incredible theater feel */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.08)_0%,rgba(0,0,0,0.3)_100%)] mix-blend-overlay"></div>
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.18)_50%)] bg-[length:100%_4px]"></div>

            {/* Interactive Player controls container */}
            <div className="absolute bottom-4 left-4 right-4 bg-black/90 backdrop-blur-sm border-2 border-black p-3 rounded flex items-center justify-between opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              
              {/* Play/Pause Button */}
              <div className="flex gap-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="flex items-center gap-1.5 bg-lime hover:bg-white text-black font-mono text-xs font-bold py-1.5 px-3 rounded border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-y-0.5 active:shadow-none cursor-pointer"
                  title={isPlaying ? "Pausar" : "Reproducir"}
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-3.5 h-3.5 fill-black" />
                      <span>PAUSAR</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-black" />
                      <span>REPRODUCIR</span>
                    </>
                  )}
                </button>
              </div>

              {/* Central Active Signalling */}
              <span className="hidden sm:inline font-mono text-[9px] font-extrabold text-neutral-400 uppercase tracking-widest">
                FILM LOOP AUTOPLAY
              </span>

              {/* Simple illustrative audio toggle for the reel feeling */}
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`p-1.5 rounded border-2 border-black transition-all active:translate-y-0.5 active:shadow-none cursor-pointer ${
                  isMuted 
                    ? "bg-red-500 text-white hover:bg-red-400" 
                    : "bg-[#00ffff] text-black hover:bg-white"
                }`}
                title={isMuted ? "Activar Audio" : "Silenciar"}
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
