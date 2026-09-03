"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial, OrbitControls, Sparkles } from "@react-three/drei";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import * as THREE from "three";

function GlassOrb() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * 0.18;
    ref.current.rotation.y += delta * 0.28;
    const t = state.clock.elapsedTime;
    ref.current.scale.setScalar(1 + Math.sin(t * 1.2) * 0.035);
  });

  return (
    <Float speed={1.2} rotationIntensity={0.45} floatIntensity={0.8}>
      <mesh ref={ref}>
        <icosahedronGeometry args={[1.55, 5]} />
        <MeshTransmissionMaterial
          backside
          samples={8}
          thickness={0.65}
          chromaticAberration={0.02}
          anisotropy={0.2}
          roughness={0.08}
          transmission={1}
          ior={1.35}
          color="#ffffff"
        />
      </mesh>
    </Float>
  );
}

function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 5.6], fov: 42 }} dpr={[1, 1.7]} gl={{ antialias: true, powerPreference: "high-performance" }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 4, 5]} intensity={2.2} />
      <pointLight position={[-4, -2, 3]} intensity={8} distance={12} />
      <GlassOrb />
      <Sparkles count={90} scale={8} size={1.4} speed={0.25} opacity={0.45} />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
    </Canvas>
  );
}

const projects = [
  { no: "01", title: "Insight Engine", type: "DATA ANALYTICS", text: "A decision dashboard turning complex business signals into clear, actionable stories.", tags: ["Python", "SQL", "Power BI"] },
  { no: "02", title: "Python Zero", type: "LEARNING EXPERIENCE", text: "A beginner-first interactive concept for learning Python through visual, bite-sized challenges.", tags: ["Python", "UX", "Education"] },
  { no: "03", title: "Portfolio 3D", type: "DIGITAL EXPERIENCE", text: "This portfolio: a performance-minded experiment in glass, motion, depth and personal branding.", tags: ["Next.js", "Three.js", "Motion"] },
];

export default function Home() {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 22, mass: 0.35 });
  const heroY = useTransform(smooth, [0, 0.2], [0, -180]);
  const heroScale = useTransform(smooth, [0, 0.18], [1, 0.88]);
  const orbX = useTransform(smooth, [0, 0.2, 0.42], [0, 180, -160]);
  const orbRotate = useTransform(smooth, [0, 0.7], [0, 180]);

  return (
    <main>
      <motion.header className="nav glass" initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
        <a className="brand" href="#top">ABZAN<span>®</span></a>
        <nav>
          <a href="#about">ABOUT</a>
          <a href="#skills">SKILLS</a>
          <a href="#work">WORK</a>
          <a href="#contact">CONTACT</a>
        </nav>
      </motion.header>

      <section id="top" className="hero">
        <div className="hero-copy">
          <motion.div style={{ y: heroY, scale: heroScale }} className="hero-title">
            <p className="eyebrow">BUSINESS ANALYTICS × DIGITAL TECHNOLOGY</p>
            <h1>TURNING<br /><span>DATA</span> INTO<br />EXPERIENCES.</h1>
            <p className="lede">A monochrome portfolio for analytical thinking, creative problem solving and technology.</p>
          </motion.div>
        </div>
        <motion.div className="orb" style={{ x: orbX, rotate: orbRotate }}>
          <Scene />
        </motion.div>
        <div className="scroll-note"><span /> SCROLL TO EXPLORE</div>
        <div className="hero-meta">DUBAI / UAE<br />2026</div>
      </section>

      <section id="about" className="section about">
        <div className="section-label">01 / ABOUT</div>
        <div className="about-grid">
          <h2>I build <em>clarity</em><br />from complexity.</h2>
          <div className="glass statement">
            <p>I’m focused on the intersection of <strong>business analytics, technology and digital experiences</strong>.</p>
            <p>The goal is simple: take complicated information, find the signal, and turn it into something people can understand and use.</p>
            <div className="mini-grid"><span>ANALYTICS</span><span>TECHNOLOGY</span><span>DESIGN</span><span>PROBLEM SOLVING</span></div>
          </div>
        </div>
      </section>

      <section id="skills" className="section skills">
        <div className="section-label">02 / EXPERTISE</div>
        <h2>TOOLS FOR<br /><span>THINKING.</span></h2>
        <div className="skill-cloud">
          {["PYTHON", "SQL", "POWER BI", "EXCEL", "TABLEAU", "DATA", "STRATEGY", "VISUALIZATION"].map((skill, i) => (
            <motion.div key={skill} className={`skill-chip glass chip-${i}`} whileHover={{ scale: 1.08, y: -8 }}>
              <small>0{i + 1}</small>{skill}
            </motion.div>
          ))}
        </div>
      </section>

      <section id="work" className="section work">
        <div className="section-label">03 / SELECTED WORK</div>
        <div className="work-head"><h2>SELECTED<br /><span>PROJECTS.</span></h2><p>Scroll through a few experiments where analysis meets digital craft.</p></div>
        <div className="projects">
          {projects.map((project) => (
            <motion.article className="project glass" key={project.no} whileHover={{ y: -14, scale: 1.015 }}>
              <div className="project-top"><span>{project.no}</span><span>{project.type}</span></div>
              <div className="project-visual"><div className="project-orb" /></div>
              <h3>{project.title}</h3>
              <p>{project.text}</p>
              <div className="tags">{project.tags.map(t => <span key={t}>{t}</span>)}</div>
              <a href="#contact" className="project-link">VIEW PROJECT ↗</a>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="marquee" aria-hidden="true">
        <div>DATA • DESIGN • TECHNOLOGY • INSIGHT • DATA • DESIGN • TECHNOLOGY • INSIGHT •</div>
      </section>

      <section className="section journey">
        <div className="section-label">04 / APPROACH</div>
        <div className="journey-list">
          {[
            ["01", "DISCOVER", "Ask better questions before searching for answers."],
            ["02", "ANALYZE", "Find patterns, relationships and the signal inside the noise."],
            ["03", "CREATE", "Translate insight into an experience people can actually use."],
            ["04", "REFINE", "Test, simplify and make every interaction earn its place."],
          ].map(([no, title, text]) => (
            <motion.div className="journey-row" key={no} whileInView={{ opacity: 1, x: 0 }} initial={{ opacity: 0, x: -30 }} viewport={{ once: true }}>
              <span>{no}</span><h3>{title}</h3><p>{text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="contact" className="contact">
        <div className="section-label">05 / CONTACT</div>
        <div className="contact-inner glass">
          <p className="eyebrow">HAVE AN IDEA?</p>
          <h2>LET'S BUILD<br /><em>SOMETHING</em><br />MEANINGFUL.</h2>
          <a className="contact-button" href="mailto:hello@example.com">START A CONVERSATION ↗</a>
        </div>
        <footer><span>ABZAN®</span><span>BUSINESS ANALYTICS / DIGITAL EXPERIENCES</span><span>© 2026</span></footer>
      </section>
    </main>
  );
}