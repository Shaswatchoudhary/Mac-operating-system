<script>
  import { onMount, onDestroy } from 'svelte';
  import * as THREE from 'three';
  
  export let onClose = () => {};
  
  let canvasRef;
  let isFullscreen = false;
  let currentView = 'landing';
  let showName = false;
  let showSubtitle = false;
  let showButtons = false;
  
  const portfolio = {
    name: "SHASWAT CHOUDHARY",
    role: "Mobile & Web Developer",
    tagline: "Crafting Digital Experiences",
    
    about: {
      intro: "Final-year Computer Science student specializing in cross-platform mobile and web development with 4 years of coding experience.",
      passion: "Passionate about mobile-first development, 3D design, and sharing tech knowledge through YouTube tutorials.",
      education: "B.Tech in Computer Science • Ashokrao Mane Group of Institutions • CGPA: 7.1 • 2022-2026"
    },
    
    skills: [
      { category: "Languages", items: ["JavaScript", "C++"], color: "#F7DF1E" },
      { category: "Frontend", items: ["React.js", "React Native", "Next.js", "Svelte"], color: "#61DAFB" },
      { category: "Backend", items: ["Node.js", "Express"], color: "#68A063" },
      { category: "Database", items: ["MongoDB", "Supabase"], color: "#47A248" },
      { category: "Creative", items: ["3D Modeling", "Blender", "Video Editing"], color: "#F5792A" },
      { category: "Content", items: ["YouTube Creator", "Tech Tutorials"], color: "#FF0000" },
      { category: "Tools", items: ["Git", "GitHub", "VS Code", "Figma", ], color: "#F05032" }
    ],
    
    projects: [
      {
        title: "WhatsApp Clone",
        tech: "MERN Stack • Socket.io",
        desc: "Real-time chat application with private messaging, group chats, and seamless communication using WebSockets.",
        year: "2024",
        github: "https://github.com/Shaswatchoudhary/Chat_application",
        color: "#25D366"
      },
      {
        title: "Music Streaming App",
        tech: "React Native • Node.js",
        desc: "Cross-platform music app with playlist creation, media controls, and user authentication.",
        year: "2025",
        github: "https://github.com/Shaswatchoudhary",
        color: "#1DB954"
      },
      {
        title: "Job Portal",
        tech: "React • Node.js • MongoDB",
        desc: "A job portal for students to create profiles, search jobs, and apply easily. Built with modern web technologies.",
        year: "2024",
        github: "https://github.com/Shaswatchoudhary/JOB-PORTAL",
        color: "#FF6B6B"
      },
      {
        title: "Clock App",
        tech: "React Native",
        desc: "Functional clock application with dynamic time updates and customizable themes for Android.",
        year: "2025",
        github: "https://github.com/Shaswatchoudhary",
        color: "#4ECDC4"
      }
    ],
    
    contact: {
      email: "kaushikchoudhary33@icloud.com",
      phone: "+91 95794 99891",
      location: "Kolhapur, India",
      links: [
        { label: "GitHub", url: "https://github.com/Shaswatchoudhary", icon: "github" },
        { label: "LinkedIn", url: "https://linkedin.com/in/shaswatchoudhary", icon: "linkedin" },
        { label: "YouTube", url: "https://youtube.com/@Shaswatchoudhary21", icon: "youtube" }
      ]
    }
  };

  let renderer;
  let scene;
  let camera;
  let particles;
  
  onMount(() => {
    setTimeout(() => showName = true, 800);
    setTimeout(() => showSubtitle = true, 1400);
    setTimeout(() => showButtons = true, 2000);
    
    initThreeJS();
  });
  
  function initThreeJS() {
    if (!canvasRef) return;

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);
    
    camera = new THREE.PerspectiveCamera(50, isFullscreen ? window.innerWidth / window.innerHeight : 800 / 600, 0.1, 1000);
    camera.position.set(0, 0, 5);
    
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(isFullscreen ? window.innerWidth : 800, isFullscreen ? window.innerHeight : 600);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    canvasRef.innerHTML = '';
    canvasRef.appendChild(renderer.domElement);
    
    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(3, 4, 5);
    scene.add(light);
    
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    for (let i = 0; i < 1000; i++) {
      vertices.push(
        (Math.random() - 0.5) * 200,
        (Math.random() - 0.5) * 200,
        (Math.random() - 0.5) * 200
      );
    }
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    particles = new THREE.Points(geometry, new THREE.PointsMaterial({ 
      color: 0x888888, 
      size: 1.5,
      transparent: true,
      opacity: 0.6
    }));
    scene.add(particles);
    
    const animate = () => {
      requestAnimationFrame(animate);
      particles.rotation.x += 0.001;
      particles.rotation.y += 0.002;
      renderer.render(scene, camera);
    };
    animate();
  }
  
  onDestroy(() => {
    if (renderer) {
      renderer.dispose();
    }
  });
  
  $: if (isFullscreen && renderer) {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&family=Syne:wght@400;600;700;800&family=DM+Mono:wght@400;500&display=swap');
  
  .portfolio-app {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #0a0a0a;
    border-radius: 12px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);
    overflow: hidden;
    width: 800px;
    height: 600px;
    z-index: 20;
  }
  
  .portfolio-app.fullscreen {
    width: 100vw;
    height: 100vh;
    border-radius: 0;
    top: 0;
    left: 0;
    transform: none;
  }
  
  .window-controls {
    position: absolute;
    top: 16px;
    left: 16px;
    display: flex;
    gap: 8px;
    z-index: 30;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(20px);
    padding: 6px;
    border-radius: 8px;
  }
  
  .control {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    cursor: pointer;
    transition: transform 0.2s;
    border: none;
    padding: 0;
  }
  
  .control:hover { transform: scale(1.15); }
  .control.close { background: #ff5f56; }
  .control.minimize { background: #ffbd2e; }
  .control.maximize { background: #27c93f; }
  
  .canvas-container { 
    width: 100%; 
    height: 100%; 
    position: absolute;
    top: 0;
    left: 0;
  }
  
  .content-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    pointer-events: none;
  }
  
  .landing-page {
    text-align: center;
    pointer-events: none;
    padding: 40px;
  }
  
  .name-block {
    font-family: 'Syne', sans-serif;
    font-size: 3.5rem;
    font-weight: 800;
    color: #ffffff;
    letter-spacing: 2px;
    margin-bottom: 30px;
    opacity: 0;
    transform: translateY(30px);
    transition: all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  
  .name-block.show {
    opacity: 1;
    transform: translateY(0);
  }
  
  .subtitle-block {
    margin-bottom: 50px;
    opacity: 0;
    transform: translateY(20px);
    transition: all 1s ease 0.3s;
  }
  
  .subtitle-block.show {
    opacity: 1;
    transform: translateY(0);
  }
  
  .role {
    font-family: 'Inter', sans-serif;
    font-size: 1.3rem;
    font-weight: 600;
    color: #888;
    margin-bottom: 8px;
    letter-spacing: 1px;
  }
  
  .tagline {
    font-family: 'DM Mono', monospace;
    font-size: 0.95rem;
    color: #666;
    letter-spacing: 2px;
  }
  
  .nav-buttons {
    display: flex;
    gap: 15px;
    justify-content: center;
    flex-wrap: wrap;
    opacity: 0;
    transform: translateY(20px);
    transition: all 1s ease 0.6s;
    pointer-events: auto;
  }
  
  .nav-buttons.show {
    opacity: 1;
    transform: translateY(0);
  }
  
  .nav-btn {
    font-family: 'Inter', sans-serif;
    padding: 14px 32px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: #fff;
    font-size: 0.95rem;
    font-weight: 600;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s;
    letter-spacing: 0.5px;
    pointer-events: auto;
  }
  
  .nav-btn:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.4);
    transform: translateY(-2px);
  }
  
  .detail-page {
    width: 90%;
    max-width: 700px;
    max-height: 85vh;
    overflow-y: auto;
    padding: 40px;
    pointer-events: auto;
    animation: fadeIn 0.6s ease;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .back-btn {
    font-family: 'Inter', sans-serif;
    padding: 10px 20px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: #888;
    font-size: 0.9rem;
    font-weight: 500;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s;
    margin-bottom: 30px;
    pointer-events: auto;
  }
  
  .back-btn:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
  }
  
  .page-title {
    font-family: 'Syne', sans-serif;
    font-size: 3rem;
    font-weight: 700;
    color: #fff;
    margin-bottom: 40px;
    letter-spacing: 1px;
  }
  
  /* ABOUT PAGE STYLES */
  .about-grid {
    display: grid;
    gap: 30px;
  }
  
  .about-card {
    padding: 30px;
    background: linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%);
    border: 2px solid transparent;
    background-clip: padding-box;
    border-radius: 16px;
    position: relative;
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    animation: slideUp 0.6s ease forwards;
    opacity: 0;
  }
  
  .about-card:nth-child(1) { animation-delay: 0.1s; }
  .about-card:nth-child(2) { animation-delay: 0.2s; }
  .about-card:nth-child(3) { animation-delay: 0.3s; }
  
  @keyframes slideUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
    from {
      opacity: 0;
      transform: translateY(30px);
    }
  }
  
  .about-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 16px;
    padding: 2px;
    background: linear-gradient(135deg, #8B5CF6, #3B82F6);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
   -webkit-mask-composite: xor;
   mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
   mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.4s;
  }
  
  .about-card:hover::before {
    opacity: 1;
  }
  
  .about-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(139, 92, 246, 0.3);
  }
  .about-card h3 {
  font-family: 'Syne', sans-serif;
  font-size: 1.4rem;
  font-weight: 700;
  background: linear-gradient(135deg, #8B5CF6, #3B82F6);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 16px;
  letter-spacing: 0.5px;
}
 
  
  .about-card p {
    font-family: 'Inter', sans-serif;
    font-size: 1.05rem;
    line-height: 1.8;
    color: rgba(255, 255, 255, 0.9);
    font-weight: 300;
  }
  
  /* SKILLS PAGE STYLES */
  .skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 25px;
  }
  
  .skill-group {
    padding: 25px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    animation: scaleIn 0.5s ease forwards;
    opacity: 0;
    position: relative;
    overflow: hidden;
  }
  
  .skill-group:nth-child(1) { animation-delay: 0.1s; }
  .skill-group:nth-child(2) { animation-delay: 0.2s; }
  .skill-group:nth-child(3) { animation-delay: 0.3s; }
  .skill-group:nth-child(4) { animation-delay: 0.4s; }
  .skill-group:nth-child(5) { animation-delay: 0.5s; }
  .skill-group:nth-child(6) { animation-delay: 0.6s; }
  .skill-group:nth-child(7) { animation-delay: 0.7s; }
  
  @keyframes scaleIn {
    to {
      opacity: 1;
      transform: scale(1);
    }
    from {
      opacity: 0;
      transform: scale(0.9);
    }
  }
  
  .skill-group::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: var(--skill-color);
    opacity: 0;
    transition: opacity 0.3s;
  }
  
  .skill-group:hover::before {
    opacity: 1;
  }
  
  .skill-group:hover {
    transform: translateX(8px);
    background: rgba(255, 255, 255, 0.05);
    border-color: var(--skill-color);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  }
  
  .skill-category {
    font-family: 'Syne', sans-serif;
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--skill-color);
    text-transform: uppercase;
    letter-spacing: 1.5px;
    margin-bottom: 18px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .skill-category::before {
    content: '';
    width: 8px;
    height: 8px;
    background: var(--skill-color);
    border-radius: 50%;
    display: inline-block;
    animation: pulse 2s infinite;
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(1.2); }
  }
  
  .skill-items {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  
  .skill-chip {
    font-family: 'Inter', sans-serif;
    padding: 10px 18px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid var(--skill-color);
    color: #fff;
    font-size: 0.9rem;
    font-weight: 500;
    border-radius: 20px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
  }
  
  .skill-chip::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: var(--skill-color);
    opacity: 0.2;
    transition: left 0.3s;
  }
  
  .skill-chip:hover::before {
    left: 0;
  }
  
  .skill-chip:hover {
    background: var(--skill-color);
    color: #000;
    transform: translateY(-4px) scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  }
  
  /* PROJECTS PAGE STYLES */
  .projects-grid {
    display: grid;
    gap: 30px;
  }
  
  .project-card {
    padding: 30px;
    background: rgba(255, 255, 255, 0.03);
    border: 2px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
    animation: slideRight 0.6s ease forwards;
    opacity: 0;
  }
  
  .project-card:nth-child(1) { animation-delay: 0.1s; }
  .project-card:nth-child(2) { animation-delay: 0.2s; }
  .project-card:nth-child(3) { animation-delay: 0.3s; }
  .project-card:nth-child(4) { animation-delay: 0.4s; }
  
  @keyframes slideRight {
    to {
      opacity: 1;
      transform: translateX(0);
    }
    from {
      opacity: 0;
      transform: translateX(-30px);
    }
  }
  
  .project-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: var(--project-color);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.4s;
  }
  
  .project-card:hover::before {
    transform: scaleX(1);
  }
  
  .project-card::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: var(--project-color);
    opacity: 0.1;
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
  }
  
  .project-card:hover::after {
    width: 500px;
    height: 500px;
  }
  
  .project-card:hover {
    transform: translateY(-8px) scale(1.02);
    border-color: var(--project-color);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  }
  
  .project-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 16px;
    position: relative;
    z-index: 1;
  }
  
  .project-card h3 {
    font-family: 'Syne', sans-serif;
    font-size: 1.6rem;
    font-weight: 700;
    color: var(--project-color);
    margin-bottom: 8px;
    transition: all 0.3s;
  }
  
  .project-card:hover h3 {
    transform: translateX(8px);
  }
  
  .project-links {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  
  .project-year {
    font-family: 'DM Mono', monospace;
    font-size: 0.85rem;
    color: var(--project-color);
    padding: 6px 12px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    border: 1px solid var(--project-color);
  }
  
  .github-link {
    color: #888;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    padding: 8px;
    border-radius: 8px;
    position: relative;
    z-index: 1;
  }
  
  .github-link:hover {
    color: var(--project-color);
    background: rgba(255, 255, 255, 0.05);
    transform: translateY(-2px) rotate(5deg);
  }
  
  .project-tech {
    font-family: 'DM Mono', monospace;
    font-size: 0.9rem;
    color: #aaa;
    margin-bottom: 16px;
    position: relative;
    z-index: 1;
  }
  
  .project-desc {
    font-family: 'Inter', sans-serif;
    font-size: 1rem;
    line-height: 1.7;
    color: rgba(255, 255, 255, 0.85);
    font-weight: 300;
    position: relative;
    z-index: 1;
  }
  
  /* CONTACT PAGE STYLES */
  .contact-layout {
    display: flex;
    flex-direction: column;
    gap: 40px;
  }
  
  .contact-info {
    display: grid;
    gap: 25px;
  }
  
  .info-item {
    padding: 25px;
    background: linear-gradient(135deg, rgba(236, 72, 153, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%);
    border: 2px solid transparent;
    border-radius: 16px;
    transition: all 0.4s;
    animation: fadeInUp 0.6s ease forwards;
    opacity: 0;
    position: relative;
    overflow: hidden;
  }
  
  .info-item:nth-child(1) { animation-delay: 0.1s; }
  .info-item:nth-child(2) { animation-delay: 0.2s; }
  .info-item:nth-child(3) { animation-delay: 0.3s; }
  
  @keyframes fadeInUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
    from {
      opacity: 0;
      transform: translateY(20px);
    }
  }
  
  .info-item::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 16px;
    padding: 2px;
    background: linear-gradient(135deg, #EC4899, #A855F7);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
   -webkit-mask-composite: xor;
   mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
   mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.4s;
  }
  
  .info-item:hover::before {
    opacity: 1;
  }
  
  .info-item:hover {
    transform: translateX(12px);
    box-shadow: 0 12px 32px rgba(236, 72, 153, 0.3);
  }
  
  .info-label {
    font-family: 'DM Mono', monospace;
    font-size: 0.85rem;
    color: #EC4899;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    margin-bottom: 10px;
    display: block;
  }
  
  .info-item a, .info-item span {
    font-family: 'Inter', sans-serif;
    font-size: 1.2rem;
    color: #fff;
    text-decoration: none;
    transition: color 0.3s;
    font-weight: 500;
  }
  
  .info-item a:hover {
    color: #EC4899;
  }
  
  .social-links {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 20px;
  }
  
  .social-link {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 22px 24px;
    background: rgba(255, 255, 255, 0.05);
    border: 2px solid rgba(255, 255, 255, 0.15);
    border-radius: 16px;
    text-decoration: none;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
    animation: bounceIn 0.6s ease forwards;
    opacity: 0;
    pointer-events: auto;
  }
  
  .social-link:nth-child(1) { animation-delay: 0.1s; }
  .social-link:nth-child(2) { animation-delay: 0.2s; }
  .social-link:nth-child(3) { animation-delay: 0.3s; }
  
  @keyframes bounceIn {
    0% {
      opacity: 0;
      transform: scale(0.3);
    }
    50% {
      opacity: 1;
      transform: scale(1.05);
    }
    70% {
      transform: scale(0.9);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  .social-link::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transition: left 0.5s;
  }
  
  .social-link:hover::before {
    left: 100%;
  }
  
  .social-link:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.4);
    transform: translateY(-6px) scale(1.05);
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.4);
  }
  
  .link-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    transition: transform 0.3s;
  }
  
  .social-link:hover .link-icon {
    transform: rotate(360deg) scale(1.2);
  }
  
  .link-label {
    font-family: 'Inter', sans-serif;
    font-size: 1.05rem;
    font-weight: 600;
    color: #fff;
  }
  
  .detail-page::-webkit-scrollbar { width: 6px; }
  .detail-page::-webkit-scrollbar-track { background: transparent; }
  .detail-page::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.2); border-radius: 3px; }
  
  @media (max-width: 768px) {
    .portfolio-app:not(.fullscreen) { width: 95vw; height: 80vh; }
    .name-block { font-size: 2.5rem; }
    .page-title { font-size: 2.2rem; }
    .nav-buttons { flex-direction: column; }
    .detail-page { padding: 30px 25px; }
    .skills-grid { grid-template-columns: 1fr; }
    .social-links { grid-template-columns: 1fr; }
  }
</style>

<div class="portfolio-app {isFullscreen ? 'fullscreen' : ''}">
  <div class="window-controls">
    <button class="control close" on:click={onClose} aria-label="Close"></button>
    <button class="control minimize" on:click={() => isFullscreen = false} aria-label="Minimize"></button>
    <button class="control maximize" on:click={() => isFullscreen = !isFullscreen} aria-label={isFullscreen ? 'Restore down' : 'Maximize'}></button>
  </div>
  
  <div class="canvas-container" bind:this={canvasRef}></div>
  
  <div class="content-overlay">
    {#if currentView === 'landing'}
      <div class="landing-page">
        <div class="name-block {showName ? 'show' : ''}">
          {portfolio.name}
        </div>
        
        <div class="subtitle-block {showSubtitle ? 'show' : ''}">
          <div class="role">{portfolio.role}</div>
          <div class="tagline">{portfolio.tagline}</div>
        </div>
        
        <div class="nav-buttons {showButtons ? 'show' : ''}">
          <button class="nav-btn" on:click={() => currentView = 'about'}>About</button>
          <button class="nav-btn" on:click={() => currentView = 'skills'}>Skills</button>
          <button class="nav-btn" on:click={() => currentView = 'projects'}>Projects</button>
          <button class="nav-btn" on:click={() => currentView = 'contact'}>Contact</button>
        </div>
      </div>
    {:else if currentView === 'about'}
      <div class="detail-page">
        <button class="back-btn" on:click={() => currentView = 'landing'}>← Back</button>
        <h1 class="page-title">About Me</h1>
        
        <div class="about-grid">
          <div class="about-card">
            <h3>Introduction</h3>
            <p>{portfolio.about.intro}</p>
          </div>
          
          <div class="about-card">
            <h3>Passion</h3>
            <p>{portfolio.about.passion}</p>
          </div>
          
          <div class="about-card">
            <h3>Education</h3>
            <p>{portfolio.about.education}</p>
          </div>
        </div>
      </div>
    {:else if currentView === 'skills'}
      <div class="detail-page">
        <button class="back-btn" on:click={() => currentView = 'landing'}>← Back</button>
        <h1 class="page-title">Skills & Expertise</h1>
        
        <div class="skills-grid">
          {#each portfolio.skills as skillGroup, index (skillGroup.category)}
            <div class="skill-group" style="--skill-color: {skillGroup.color}">
              <h3 class="skill-category">{skillGroup.category}</h3>
              <div class="skill-items">
                {#each skillGroup.items as skill (skill)}
                  <span class="skill-chip" style="--skill-color: {skillGroup.color}">
                    {skill}
                  </span>
                {/each}
              </div>
            </div>
          {/each}
        </div>
      </div>
    {:else if currentView === 'projects'}
      <div class="detail-page">
        <button class="back-btn" on:click={() => currentView = 'landing'}>← Back</button>
        <h1 class="page-title">Projects</h1>
        
        <div class="projects-grid">
          {#each portfolio.projects as project, index (project.title)}
            <div class="project-card" style="--project-color: {project.color}">
              <div class="project-header">
                <div>
                  <h3>{project.title}</h3>
                  <p class="project-tech">{project.tech}</p>
                </div>
                <div class="project-links">
                  <span class="project-year">{project.year}</span>
                  <a href={project.github} target="_blank" rel="noopener noreferrer" class="github-link" aria-label="View project on GitHub">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                  </a>
                </div>
              </div>
              <p class="project-desc">{project.desc}</p>
            </div>
          {/each}
        </div>
      </div>
    {:else if currentView === 'contact'}
      <div class="detail-page">
        <button class="back-btn" on:click={() => currentView = 'landing'}>← Back</button>
        <h1 class="page-title">Get In Touch</h1>
        
        <div class="contact-layout">
          <div class="contact-info">
            <div class="info-item">
              <span class="info-label">Email</span>
              <a href="mailto:{portfolio.contact.email}">{portfolio.contact.email}</a>
            </div>
            <div class="info-item">
              <span class="info-label">Phone</span>
              <a href="tel:{portfolio.contact.phone}">{portfolio.contact.phone}</a>
            </div>
            <div class="info-item">
              <span class="info-label">Location</span>
              <span>{portfolio.contact.location}</span>
            </div>
          </div>
          
          <div class="social-links">
            {#each portfolio.contact.links as link, index (link.label)}
              <a href={link.url} target="_blank" rel="noopener noreferrer" class="social-link">
                <span class="link-icon">
                  {#if link.icon === 'github'}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  {:else if link.icon === 'linkedin'}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  {:else if link.icon === 'youtube'}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                    </svg>
                  {/if}
                </span>
                <span class="link-label">{link.label}</span>
              </a>
            {/each}
          </div>
        </div>
      </div>
    {/if}
  </div>
</div>