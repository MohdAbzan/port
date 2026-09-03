 "use client";

import { useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Points, PointMaterial } from "@react-three/drei";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import * as THREE from "three";

const BASE = "/port";

function DataField() {
  const ref = useRef<THREE.Points>(null);
  const count = 2400;
  const positions = useRef<Float32Array | null>(null);

  if (!positions.current) {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const radius = 3.4 + Math.random() * 4.8;
      const angle = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 6;
      p[i3] = Math.cos(angle) * radius;
      p[i3 + 1] = y;
      p[i3 + 2] = Math.sin(angle) * radius;
    }
    positions.current = p;
  }

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.045;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.18) * 0.08;
  });

  return (
    <Points ref={ref} positions={positions.current} stride={3} frustumCulled>
      <PointMaterial transparent size={0.018} sizeAttenuation color="#ffffff" depthWrite={false} opacity={0.38} />
    </Points>
  );
}

function OrbitalRings() {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.x = state.clock.elapsedTime * 0.12;
    group.current.rotation.y = state.clock.elapsedTime * 0.08;
  });

  return (
    <group ref={group}>
      {[2.15, 2.65, 3.15].map((r, i) => (
        <mesh key={r} rotation={[i * 0.45, i * 0.7, i * 0.25]}>
          <torusGeometry args={[r, 0.008, 12, 180]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.13} />
        </mesh>
      ))}
    </group>
  );
}

function Scene() {
  const { camera } = useThree();
  useFrame((state) => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, state.pointer.x * 0.35, 0.035);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, state.pointer.y * 0.22, 0.035);
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <Float speed={0.55} rotationIntensity={0.08} floatIntensity={0.25}>
        <mesh>
          <icosahedronGeometry args={[1.7, 4]} />
          <meshPhysicalMaterial
            color="#111111"
            roughness={0.08}
            metalness={0.7}
            transmission={0.28}
            thickness={1.2}
            transparent
            opacity={0.9}
          />
        </mesh>
        <OrbitalRings />
      </Float>
      <DataField />
    </>
  );
}

function ScrollMeter() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 110, damping: 30 });
  return <motion.div className="scroll-meter" style={{ scaleX }} />;
}

export default function Home() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.18], [0, -180]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
  const photoY = useTransform(scrollYProgress, [0, 0.22], [0, 120]);
  const photoScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.78]);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => { document.documentElement.style.scrollBehavior = "auto"; };
  }, []);

  const skills = ["Business Analysis", "Power BI", "Excel", "Reporting", "Operations", "AI Prompt Engineering"];

  return (
    <main>
      <ScrollMeter />

      <nav className="nav">
        <a href="#top" className="brand">ABZAN<span>.</span></a>
        <div className="nav-links">
          <a href="#profile">PROFILE</a>
          <a href="#experience">EXPERIENCE</a>
          <a href="#capabilities">CAPABILITIES</a>
          <a href="#contact">CONTACT</a>
        </div>
        <a className="nav-cv" href={`${BASE}/cv/Abzan-CV.pdf`} download>ADD CV <span>↗</span></a>
      </nav>

      <section id="top" className="hero">
        <div className="hero-canvas" aria-hidden="true">
          <Canvas camera={{ position: [0, 0, 10], fov: 38 }} dpr={[1, 1.5]}>
            <Scene />
          </Canvas>
        </div>

        <motion.div className="hero-copy" style={{ y: heroY, opacity: heroOpacity }}>
          <p className="eyebrow">BUSINESS ANALYST · DUBAI, UAE</p>
          <h1>
            Business
            <br />
            <span>Analysis</span>
            <em>with depth.</em>
          </h1>
          <p className="hero-lede">
            Connecting business operations, data and reporting to create clearer decisions.
          </p>
          <div className="hero-actions">
            <a className="button button-solid" href={`${BASE}/cv/Abzan-CV.pdf`} download>
              <span>ADD CV</span><b>↓</b>
            </a>
            <a className="button button-line" href="#experience">VIEW EXPERIENCE <span>→</span></a>
          </div>
        </motion.div>

        <motion.div className="portrait-wrap" style={{ y: photoY, scale: photoScale }}>
          <div className="portrait-label">01 / IDENTITY</div>
          <div className="portrait-frame">
            <img src={`${BASE}/profile.jpg`} alt="Professional portrait" />
            <div className="portrait-glass">
              <span>MOHAMMED ABZAN</span>
              <small>MBA · BUSINESS ANALYTICS</small>
            </div>
          </div>
        </motion.div>

        <div className="hero-index">SCROLL TO EXPLORE <span>↓</span></div>
      </section>

      <section id="profile" className="statement section">
        <div className="section-number">01</div>
        <div>
          <p className="eyebrow">PROFILE</p>
          <h2>I work where <span>business</span>, operations and data meet.</h2>
          <p className="body-copy">
            Administration and customer service professional with more than two years of experience at dnata
            (Emirates Group), with hands-on exposure to cargo operations, document control, sustainability
            coordination, customer support and reporting.
          </p>
        </div>
      </section>

      <section className="mba-section">
        <div className="mba-orbit" aria-hidden="true">
          <div className="orbit-ring r1" />
          <div className="orbit-ring r2" />
          <div className="orbit-dot" />
        </div>
        <div className="mba-content">
          <p className="eyebrow">ACADEMIC DIRECTION</p>
          <div className="mba-title"><span>MBA</span><small>BUSINESS ANALYTICS</small></div>
          <p>
            A business-focused analytical foundation designed to connect data, strategy and decision-making.
          </p>
          <div className="mba-line"><span>BUSINESS</span><i>+</i><span>DATA</span><i>+</i><span>DECISIONS</span></div>
        </div>
      </section>

      <section id="experience" className="experience section">
        <div className="section-number">02</div>
        <div className="experience-head">
          <p className="eyebrow">EXPERIENCE</p>
          <h2>Built inside <span>real operations.</span></h2>
        </div>
        <div className="timeline">
          <article className="timeline-item">
            <div className="timeline-year">2025 — PRESENT</div>
            <div className="timeline-dot" />
            <div>
              <h3>Administrative Assistant</h3>
              <p className="muted">dnata · Emirates Group · Dubai International Airport</p>
              <p>Document archiving, sustainability coordination, customer enquiries, scheduling, cross-departmental coordination and reporting support.</p>
            </div>
          </article>
          <article className="timeline-item">
            <div className="timeline-year">2024 — 2025</div>
            <div className="timeline-dot" />
            <div>
              <h3>Cargo & Customer Service Agent</h3>
              <p className="muted">dnata · Emirates Group · Dubai International Airport</p>
              <p>International airline and freight-forwarder enquiries, compliance-grade records, billing reports, inventory tracking and cargo operations.</p>
            </div>
          </article>
        </div>
      </section>

      <section id="capabilities" className="capabilities section">
        <div className="section-number">03</div>
        <div className="capability-intro">
          <p className="eyebrow">CAPABILITIES</p>
          <h2>From information<br /><span>to insight.</span></h2>
        </div>
        <div className="capability-grid">
          {skills.map((skill, i) => (
            <motion.div
              className="capability"
              key={skill}
              whileHover={{ y: -8, rotateX: 3, rotateY: -3 }}
              transition={{ type: "spring", stiffness: 240, damping: 18 }}
            >
              <span>0{i + 1}</span>
              <h3>{skill}</h3>
              <b>↗</b>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="thinking">
        <div className="thinking-bg">THINK</div>
        <p className="eyebrow">HOW I THINK</p>
        <div className="thinking-list">
          <div><span>01</span><strong>Understand the problem.</strong></div>
          <div><span>02</span><strong>Find the signal in the data.</strong></div>
          <div><span>03</span><strong>Turn insight into action.</strong></div>
        </div>
      </section>

      <section id="contact" className="contact section">
        <p className="eyebrow">LET'S CONNECT</p>
        <h2>Better questions.<br /><span>Better decisions.</span></h2>
        <div className="contact-row">
          <a href="mailto:mohdabzan2003@gmail.com">mohdabzan2003@gmail.com ↗</a>
          <a href="https://www.linkedin.com/in/mohdabzan/" target="_blank" rel="noreferrer">LINKEDIN ↗</a>
          <a href={`${BASE}/cv/Abzan-CV.pdf`} download>DOWNLOAD CV ↓</a>
        </div>
      </section>

      <footer>
        <span>ABZAN.</span>
        <span>BUSINESS ANALYST · MBA BUSINESS ANALYTICS</span>
        <span>© 2026</span>
      </footer>
    </main>
  );
}