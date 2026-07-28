import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MapPin, Calendar, Clock, Gift, Utensils, AlertTriangle } from 'lucide-react';
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

function App() {
  return (
    <div className="app-container">
      {/* Hero / Cover Section */}
      <section className="section-container" style={{ justifyContent: 'center' }}>
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
              Estás invitado a celebrar
            </p>
            <div style={{ width: '1px', height: '60px', backgroundColor: 'var(--color-accent)', margin: '2rem auto' }}></div>
          </FadeIn>
        </div>
      </section>

      {/* Details Section */}
      <section className="section-container" style={{ backgroundColor: 'var(--color-surface)' }}>
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
      <section className="section-container">
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

      {/* Gifts & RSVP Section */}
      <section className="section-container" style={{ backgroundColor: 'var(--color-surface)', paddingBottom: '6rem' }}>
        <FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', maxWidth: '800px', width: '100%', margin: '0 auto' }}>
            
            {/* Gifts Card */}
            <div className="card text-center" style={{ padding: '2.5rem 1.5rem' }}>
              <Gift size={32} style={{ margin: '0 auto 1.5rem', color: 'var(--color-accent)' }} />
              <h3 className="serif" style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Obsequios</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: '2rem', lineHeight: '1.5' }}>
                Tu presencia es mi mayor regalo, pero si deseas tener un detalle, puedes hacerlo a través de la siguiente cuenta:
              </p>
              <div style={{ backgroundColor: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '4px', marginBottom: '1.5rem' }}>
                <p className="uppercase tracking-wider" style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>Alias</p>
                <p style={{ fontSize: '1.1rem', letterSpacing: '0.05em' }}>[ A confirmar ]</p>
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
    </div>
  );
}

export default App;
