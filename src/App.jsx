import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MapPin, Calendar, Clock, Gift, Utensils, AlertTriangle, Play, SkipForward, MessageCircle, Volume2, VolumeX } from 'lucide-react';
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import './index.css';

const FadeIn = ({ children, delay = 0, direction = 'up' }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const variants = {
    hidden: { 
      opacity: 0, 
      y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
      x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      x: 0,
      transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] } 
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

const DynamicGallery = () => {
  const [slots, setSlots] = useState(() => Array.from({ length: 14 }).map((_, i) => i + 1));

  useEffect(() => {
    const interval = setInterval(() => {
      setSlots(prev => {
        const newSlots = [...prev];
        const slotToChange = Math.floor(Math.random() * newSlots.length);
        const availablePhotos = Array.from({ length: 15 }).map((_, i) => i + 1).filter(p => !newSlots.includes(p));
        if (availablePhotos.length > 0) {
          const newPhoto = availablePhotos[Math.floor(Math.random() * availablePhotos.length)];
          newSlots[slotToChange] = newPhoto;
        }
        return newSlots;
      });
    }, 2500); // Change one photo every 2.5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="gallery-grid">
      {slots.map((photoNum, i) => (
        <div key={i} className="gallery-item" style={{ position: 'relative' }}>
          <AnimatePresence>
            <motion.img 
              key={photoNum}
              src={`/fotos/photo-${photoNum}.jpeg`} 
              alt={`Renata Sialle - ${photoNum}`} 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

function App() {
  const [viewMode, setViewMode] = useState('landing'); // 'landing', 'video', 'invitation'
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef(null);
  const audioRef = useRef(null);

  const particlesInit = useCallback(async engine => {
    await loadSlim(engine);
  }, []);

  const startVideo = () => {
    setViewMode('video');
    if (videoRef.current) {
      videoRef.current.play().catch(e => console.error("Error playing video:", e));
    }
  };

  const skipVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setViewMode('invitation');
    // Start background music
    if (audioRef.current && !isMuted) {
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch(e => console.error("Error playing audio:", e));
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="app-container" style={{ position: 'relative', overflowX: 'hidden' }}>
      
      {/* Background Audio */}
      <audio ref={audioRef} src="/theme-music.mp3" loop />

      {/* Floating Buttons (Visible only on invitation) */}
      {viewMode === 'invitation' && (
        <>
          {/* WhatsApp Button */}
          <a 
            href="https://wa.me/5493856208453" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 1000,
              backgroundColor: '#25D366', color: 'white', padding: '1rem',
              borderRadius: '50%', boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              textDecoration: 'none'
            }}
            title="Asistencia por WhatsApp"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              width="30" 
              height="30" 
              fill="currentColor"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
            </svg>
          </a>

          {/* Music Toggle Button */}
          <button 
            onClick={toggleMute}
            style={{
              position: 'fixed', bottom: '2rem', left: '2rem', zIndex: 1000,
              backgroundColor: 'rgba(20,20,20,0.8)', color: 'var(--color-accent)', 
              padding: '1rem', borderRadius: '50%', 
              boxShadow: '0 4px 10px rgba(0,0,0,0.3)', border: '1px solid var(--color-accent)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
            }}
            title={isMuted ? "Activar música" : "Silenciar música"}
          >
            {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
          </button>
        </>
      )}

      {/* Video is always mounted to preload it, but only visible during 'video' mode */}
      <div 
        style={{ 
          display: viewMode === 'video' ? 'block' : 'none',
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100dvh', 
          backgroundColor: 'black', zIndex: 100 
        }}
      >
        <video 
          ref={videoRef}
          src="/intro-video.mp4" 
          preload="auto"
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          onEnded={skipVideo}
          playsInline
        />
        <button 
          onClick={skipVideo}
          style={{
            position: 'absolute', bottom: '15%', right: '2rem', zIndex: 150,
            background: 'rgba(0,0,0,0.5)', color: 'white', padding: '0.8rem 1.5rem',
            border: '1px solid rgba(255,255,255,0.3)', borderRadius: '4px',
            display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer',
            textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem'
          }}
        >
          Omitir <SkipForward size={16} />
        </button>
      </div>

      {viewMode === 'landing' && (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
          <div style={{
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
            backgroundImage: 'url(/fotos/photo-1.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center',
            opacity: 0.3, zIndex: 0
          }}></div>
          
          <div style={{ zIndex: 10, textAlign: 'center' }}>
            <FadeIn delay={0.2} direction="down">
              <p className="magazine-subtitle" style={{ marginBottom: '1rem' }}>Edición Especial • 2026</p>
            </FadeIn>
            <FadeIn delay={0.4}>
              <h1 className="magazine-title" style={{ fontSize: 'clamp(3rem, 12vw, 8rem)' }}>Renata<br/>Sialle</h1>
            </FadeIn>
            
            <FadeIn delay={0.8}>
              <button onClick={startVideo} className="btn-primary" style={{ marginTop: '3rem', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '3rem auto 0 auto' }}>
                <Play size={18} /> Ingresar a la invitación
              </button>
            </FadeIn>
          </div>
        </div>
      )}

      {viewMode === 'invitation' && (
        <>
      {/* Particles Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        style={{ position: 'absolute', top: 0, left: 0, zIndex: 0, opacity: 0.6 }}
        options={{
          background: { color: { value: "transparent" } },
          fpsLimit: 60,
          interactivity: {
            events: {
              onHover: { enable: true, mode: "grab" },
              resize: true,
            },
            modes: {
              grab: { distance: 140, links: { opacity: 0.5 } },
            },
          },
          particles: {
            color: { value: "#ffffff" },
            links: { color: "#ffffff", distance: 150, enable: true, opacity: 0.1, width: 1 },
            move: {
              direction: "none",
              enable: true,
              outModes: { default: "bounce" },
              random: true,
              speed: 1,
              straight: false,
            },
            number: { density: { enable: true, area: 800 }, value: 40 },
            opacity: { value: 0.3 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 3 } },
          },
          detectRetina: true,
        }}
      />

      {/* Hero / Cover Section */}
      <section className="section-container" style={{ justifyContent: 'center', position: 'relative', zIndex: 10 }}>
        <div style={{ position: 'absolute', top: '2rem', left: '0', width: '100%', textAlign: 'center' }}>
          <FadeIn delay={0.2} direction="down">
            <p className="magazine-subtitle">Edición Especial • 2026</p>
          </FadeIn>
        </div>
        
        <div className="text-center" style={{ zIndex: 10, marginTop: '2rem' }}>
          <FadeIn delay={0.4}>
            <h1 className="magazine-title">Renata<br/>Sialle</h1>
          </FadeIn>
          
          <FadeIn delay={0.7}>
            <p className="uppercase tracking-widest" style={{ marginTop: '2rem', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
              Mis 15 Años
            </p>
            <div style={{ width: '1px', height: '60px', backgroundColor: 'var(--color-accent)', margin: '2rem auto' }}></div>
          </FadeIn>
        </div>
      </section>

      {/* Top Parallax Banner */}
      <div 
        style={{
          width: '100%',
          height: '40vh',
          minHeight: '300px',
          backgroundImage: 'url(/fotos/banner-top.jpg)',
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          position: 'relative',
          zIndex: 10,
          borderTop: '1px solid rgba(255,255,255,0.1)',
          borderBottom: '1px solid rgba(255,255,255,0.1)'
        }}
      ></div>

      {/* Details Section */}
      <section className="section-container" style={{ backgroundColor: 'var(--color-surface)', position: 'relative', zIndex: 10 }}>
        <FadeIn>
          <div className="card text-center" style={{ backgroundColor: 'var(--color-bg)' }}>
            <h2 className="serif" style={{ fontSize: '2.5rem', marginBottom: '3rem', color: 'var(--color-accent)' }}>
              Detalles del Evento
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                <Calendar size={24} style={{ color: 'var(--color-text-muted)' }} />
                <div style={{ textAlign: 'left' }}>
                  <p className="uppercase tracking-wider" style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Fecha</p>
                  <p style={{ fontSize: '1.2rem', fontWeight: '500' }}>07 de Noviembre, 2026</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                <Clock size={24} style={{ color: 'var(--color-text-muted)' }} />
                <div style={{ textAlign: 'left' }}>
                  <p className="uppercase tracking-wider" style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Hora</p>
                  <p style={{ fontSize: '1.2rem', fontWeight: '500' }}>22:00 hs</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                <MapPin size={24} style={{ color: 'var(--color-text-muted)' }} />
                <div style={{ textAlign: 'left' }}>
                  <p className="uppercase tracking-wider" style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Ubicación</p>
                  <p style={{ fontSize: '1.2rem', fontWeight: '500' }}>Zambra</p>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Dress Code Section */}
      <section className="section-container" style={{ position: 'relative', zIndex: 10 }}>
        <FadeIn>
          <div className="text-center" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 className="serif" style={{ fontSize: '3rem', marginBottom: '1rem' }}>Dress Code</h2>
            <p className="uppercase tracking-widest" style={{ color: 'var(--color-accent)', marginBottom: '3rem', fontSize: '1.2rem' }}>
              "El diablo viste a la moda"
            </p>
            
            <div style={{ padding: '2rem', border: '1px solid rgba(255,255,255,0.1)', position: 'relative' }}>
              <AlertTriangle size={32} style={{ position: 'absolute', top: '-16px', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'var(--color-bg)', padding: '0 10px', color: '#ff4d4d' }} />
              <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginTop: '1rem' }}>
                Para mantener la estética del evento, te pedimos encarecidamente que <strong>evites</strong> usar los siguientes colores:
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '2rem' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#800020', margin: '0 auto 0.5rem', border: '1px solid #333' }}></div>
                  <span className="uppercase" style={{ fontSize: '0.8rem', letterSpacing: '0.1em' }}>Bordó</span>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#ffffff', margin: '0 auto 0.5rem', border: '1px solid #333' }}></div>
                  <span className="uppercase" style={{ fontSize: '0.8rem', letterSpacing: '0.1em' }}>Blanco</span>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#c0c0c0', margin: '0 auto 0.5rem', border: '1px solid #333' }}></div>
                  <span className="uppercase" style={{ fontSize: '0.8rem', letterSpacing: '0.1em' }}>Plateado</span>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Photo Gallery Section */}
      <section className="section-container" style={{ padding: '2rem 1rem', position: 'relative', zIndex: 10 }}>
        <FadeIn>
          <h2 className="serif text-center" style={{ fontSize: '2.5rem', marginBottom: '3rem', color: 'var(--color-accent)' }}>
            Vogue Gallery
          </h2>
          <DynamicGallery />
        </FadeIn>
      </section>

      {/* Parallax Banner Separator */}
      <div 
        style={{
          width: '100%',
          height: '35vh',
          minHeight: '250px',
          backgroundImage: 'url(/fotos/banner.jpeg)',
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          position: 'relative',
          zIndex: 10,
          borderTop: '1px solid rgba(255,255,255,0.1)',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          margin: '2rem 0'
        }}
      ></div>

      {/* Gifts & RSVP Section */}
      <section className="section-container" style={{ backgroundColor: 'var(--color-surface)', paddingBottom: '6rem', position: 'relative', zIndex: 10 }}>
        <FadeIn>
          <div className="cards-grid">
            
            {/* Gifts Card */}
            <div className="card text-center" style={{ padding: '2.5rem 1.5rem' }}>
              <Gift size={32} style={{ margin: '0 auto 1.5rem', color: 'var(--color-accent)' }} />
              <h3 className="serif" style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Obsequios</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: '2rem', lineHeight: '1.5' }}>
                Tu presencia es mi mayor regalo, pero si deseas tener un detalle, puedes hacerlo a través de la siguiente cuenta:
              </p>
              
              <div style={{ backgroundColor: 'rgba(255,255,255,0.03)', padding: '1.5rem 1rem', borderRadius: '4px', marginBottom: '1.5rem', textAlign: 'left' }}>
                <p style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.5rem', color: 'var(--color-accent)' }}>
                  Eleonora Renata Sialle
                </p>
                <p className="uppercase tracking-wider" style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', marginBottom: '0.2rem' }}>Alias</p>
                <p style={{ fontSize: '1.1rem', letterSpacing: '0.05em', marginBottom: '1rem' }}>renatasialle</p>
                
                <p className="uppercase tracking-wider" style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', marginBottom: '0.2rem' }}>CVU</p>
                <p style={{ fontSize: '1.1rem', letterSpacing: '0.05em' }}>0000003100083789875201</p>
              </div>
            </div>

            {/* Diet Card */}
            <div className="card text-center" style={{ padding: '2.5rem 1.5rem' }}>
              <Utensils size={32} style={{ margin: '0 auto 1.5rem', color: 'var(--color-accent)' }} />
              <h3 className="serif" style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Menú</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: '2rem', lineHeight: '1.5' }}>
                Queremos que disfrutes al máximo. Por favor infórmanos si tienes alguna restricción alimentaria o llevas una dieta especial.
              </p>
              <a href="#" className="btn-primary" style={{ width: '100%' }}>
                Avisar Restricción
              </a>
            </div>

          </div>
        </FadeIn>
        
        <div className="text-center" style={{ marginTop: '6rem' }}>
          <FadeIn delay={0.2}>
            <p className="serif" style={{ fontSize: '1.5rem', color: 'var(--color-accent)', fontStyle: 'italic' }}>
              ¡Nos vemos en la pasarela!
            </p>
          </FadeIn>
        </div>
      </section>
      </>
      )}
    </div>
  );
}

export default App;
