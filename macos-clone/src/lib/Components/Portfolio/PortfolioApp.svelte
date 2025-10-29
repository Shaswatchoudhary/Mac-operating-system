<script>
  import { onMount } from 'svelte';
  import * as THREE from 'three';
  import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

  export let onClose = () => {};
  
  let canvasContainer;
  let scene, camera, renderer, controls, model;
  let isVisible = true;
  let isFullscreen = false;
  let blackHole; // Black hole mesh
  
  // Animation states
  let showName = false;
  let showTitle = false;
  let isTransitioning = false;
  let currentSection = 'home'; // 'home', 'about', 'skills', 'projects', 'contact'
  
  // Your portfolio data from resume
  const portfolio = {
    name: "SHASWAT CHOUDHARY",
    title: "Mobile & Web Developer | React Native Expert",
    location: "Kolhapur, India",
    email: "kaushikchoudhary33@icloud.com",
    phone: "+91 95794 99891",
    linkedin: "linkedin.com/in/shaswatchoudhary",
    github: "github.com/Shaswatchoudhary",
    youtube: "youtube.com/@Shaswatchoudhary21",
    
    about: "Final-year Computer Science Engineering student skilled in React Native, JavaScript, and the MERN stack. With 4 years of coding experience, I build cross-platform mobile and web applications. Passionate about mobile-first development, problem-solving, and sharing tech content on YouTube.",
    
    education: {
      degree: "B.Tech in Computer Science & Engineering",
      institution: "Ashokrao Mane Group of Institutions, Kolhapur",
      duration: "June 2022 - June 2026 (Expected)",
      cgpa: "7.1"
    },
    
    skills: {
      languages: ["JavaScript", "C++"],
      webMobile: ["React.js", "React Native", "Node.js", "Next.js", "SaaS"],
      databases: ["MongoDB", "Supabase"],
      tools: ["Git", "GitHub"],
      core: ["Communication", "Leadership", "Problem Solving", "DSA (Learning)"]
    },
    
    certifications: [
      { name: "JavaScript", provider: "Udemy", date: "May 2024" },
      { name: "React JS", provider: "Great Learning", date: "October 2024" },
      { name: "MongoDB Certified", provider: "MongoDB University", date: "January 2025" }
    ],
    
    projects: [
      {
        name: "WhatsApp-like Chat Application",
        tech: "MERN Stack, Socket.io",
        description: "Real-time chat with private messaging, group chats, and seamless communication"
      },
      {
        name: "Music Streaming App",
        tech: "React Native, Node.js",
        description: "Cross-platform music app with playlist creation, media controls, and user authentication"
      },
      {
        name: "Receipt Scanner App",
        tech: "React Native, OCR",
        description: "Mobile app to scan receipts, extract text, and track expenses with intuitive UI"
      },
      {
        name: "Clock App",
        tech: "React Native",
        description: "Functional clock with dynamic time updates and customizable themes for Android"
      }
    ],
    
    hobbies: [
      "Creating tech tutorials on YouTube",
      "Building experimental projects",
      "Playing strategic games"
    ]
  };
  
  // Trigger name animation after mount
  setTimeout(() => { showName = true; }, 500);
  setTimeout(() => { showTitle = true; }, 1200);
  
  // Toggle fullscreen
  const toggleFullscreen = () => {
    isFullscreen = !isFullscreen;
    if (renderer && camera) {
      updateRendererSize();
      camera.aspect = getAspectRatio();
      camera.updateProjectionMatrix();
    }
  };
  
  // Black hole transition animation
  const triggerBlackHoleTransition = (targetSection) => {
    if (isTransitioning) return;
    isTransitioning = true;
    
    // Animate black hole growing and camera zooming
    const duration = 2000;
    const startTime = Date.now();
    const startScale = blackHole.scale.x;
    const targetScale = 100;
    const startZ = camera.position.z;
    const targetZ = -10;
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;
      
      // Grow black hole
      const scale = startScale + (targetScale - startScale) * eased;
      blackHole.scale.set(scale, scale, scale);
      
      // Zoom camera into black hole
      camera.position.z = startZ + (targetZ - startZ) * eased;
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Transition complete - show new section
        currentSection = targetSection;
        resetBlackHole();
        isTransitioning = false;
      }
    };
    animate();
  };
  
  // Reset black hole to original state
  const resetBlackHole = () => {
    blackHole.scale.set(2, 2, 2);
    camera.position.z = 4;
  };
  
  // Navigate between sections
  const navigateTo = (section) => {
    if (section === 'home') {
      currentSection = 'home';
      resetBlackHole();
    } else {
      triggerBlackHoleTransition(section);
    }
  };
  
  // Create animated black hole
  const createBlackHole = () => {
    const geometry = new THREE.TorusGeometry(1, 0.4, 16, 100);
    const material = new THREE.MeshStandardMaterial({
      color: 0x8800ff,
      emissive: 0x4400aa,
      emissiveIntensity: 0.5,
      metalness: 0.8,
      roughness: 0.2
    });
    blackHole = new THREE.Mesh(geometry, material);
    blackHole.position.set(0, -5, -5);
    blackHole.scale.set(2, 2, 2);
    scene.add(blackHole);
  };
  
  // Create starfield
  const createStarfield = () => {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    for (let i = 0; i < 3000; i++) {
      vertices.push(
        (Math.random() - 0.5) * 300,
        (Math.random() - 0.5) * 300,
        (Math.random() - 0.5) * 300
      );
    }
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    const material = new THREE.PointsMaterial({ color: 0xffffff, size: 1.5 });
    const stars = new THREE.Points(geometry, material);
    scene.add(stars);
  };
  
  // Helper functions
  function getAspectRatio() {
    return isFullscreen ? window.innerWidth / window.innerHeight : 800 / 600;
  }
  
  function updateRendererSize() {
    if (isFullscreen) {
      renderer.setSize(window.innerWidth, window.innerHeight);
    } else {
      renderer.setSize(800, 600);
    }
  }
  
  onMount(() => {
    // Initialize Three.js
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    
    camera = new THREE.PerspectiveCamera(45, getAspectRatio(), 0.1, 1000);
    camera.position.set(0, 0, 4);
    
    renderer = new THREE.WebGLRenderer({ antialias: true });
    updateRendererSize();
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    canvasContainer.appendChild(renderer.domElement);
    
    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.8));
    const light = new THREE.DirectionalLight(0xffffff, 1.2);
    light.position.set(3, 4, 5);
    scene.add(light);
    
    const pointLight = new THREE.PointLight(0x8800ff, 1, 50);
    pointLight.position.set(0, -5, -5);
    scene.add(pointLight);
    
    // Create scene
    createStarfield();
    createBlackHole();
    
    // Load character model
    const loader = new GLTFLoader();
    loader.load(
      'https://models.readyplayer.me/690238c53fad7e26d2a819f8.glb',
      (gltf) => {
        model = gltf.scene;
        
        // Scale and position model
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const scale = 2.5 / Math.max(size.x, size.y, size.z);
        
        model.scale.setScalar(scale);
        model.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
        scene.add(model);
      },
      undefined,
      (error) => console.error('Model error:', error)
    );
    
    // Controls
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = true;
    controls.enablePan = false;
    controls.autoRotate = currentSection === 'home';
    controls.autoRotateSpeed = 0.8;
    controls.minDistance = 2;
    controls.maxDistance = 8;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    
    // Animation loop
    const clock = new THREE.Clock();
    const animate = () => {
      if (!isVisible) return;
      requestAnimationFrame(animate);
      
      const elapsed = clock.elapsedTime;
      
      // Floating model animation
      if (model && currentSection === 'home') {
        model.position.y = Math.sin(elapsed * 0.8) * 0.08;
      }
      
      // Rotating black hole
      if (blackHole) {
        blackHole.rotation.x = elapsed * 0.3;
        blackHole.rotation.y = elapsed * 0.5;
      }
      
      controls.autoRotate = currentSection === 'home';
      controls.update();
      renderer.render(scene, camera);
    };
    animate();
    
    // Mouse wheel scroll to trigger black hole
    const handleWheel = (e) => {
      if (currentSection === 'home' && e.deltaY > 0 && !isTransitioning) {
        triggerBlackHoleTransition('about');
      }
    };
    renderer.domElement.addEventListener('wheel', handleWheel);
    
    // Window resize
    const handleResize = () => {
      if (!isVisible) return;
      camera.aspect = getAspectRatio();
      camera.updateProjectionMatrix();
      updateRendererSize();
    };
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('wheel', handleWheel);
      if (renderer) renderer.dispose();
    };
  });
</script>

{#if isVisible}
<div class="portfolio-app {isFullscreen ? 'fullscreen' : ''}">
  <!-- Window controls -->
  <div class="window-controls">
    <div class="control close" on:click={onClose}></div>
    <div class="control minimize" on:click={() => isFullscreen = false}></div>
    <div class="control maximize" on:click={toggleFullscreen}></div>
  </div>
  
  <!-- 3D Canvas -->
  <div class="canvas-container" bind:this={canvasContainer}></div>
  
  <!-- Content overlay -->
  <div class="content-overlay">
    {#if currentSection === 'home'}
      <div class="home-section">
        <h1 class="name {showName ? 'show' : ''}">{portfolio.name}</h1>
        <p class="title {showTitle ? 'show' : ''}">{portfolio.title}</p>
        <div class="scroll-hint {showTitle ? 'show' : ''}">
          <span>SCROLL TO ENTER THE VOID</span>
          <div class="arrow">↓</div>
        </div>
      </div>
    {:else if currentSection === 'about'}
      <div class="section-content">
        <h2>About Me</h2>
        <p>{portfolio.about}</p>
        <div class="info-grid">
          <div class="info-item">📍 {portfolio.location}</div>
          <div class="info-item">📧 {portfolio.email}</div>
          <div class="info-item">📱 {portfolio.phone}</div>
        </div>
        <div class="nav-buttons">
          <button on:click={() => navigateTo('home')}>← Home</button>
          <button on:click={() => navigateTo('skills')}>Skills →</button>
        </div>
      </div>
    {:else if currentSection === 'skills'}
      <div class="section-content">
        <h2>Skills & Expertise</h2>
        <div class="skills-category">
          <h3>Languages</h3>
          <div class="skills-row">
            {#each portfolio.skills.languages as skill}
              <span class="skill-tag">{skill}</span>
            {/each}
          </div>
        </div>
        <div class="skills-category">
          <h3>Web & Mobile</h3>
          <div class="skills-row">
            {#each portfolio.skills.webMobile as skill}
              <span class="skill-tag">{skill}</span>
            {/each}
          </div>
        </div>
        <div class="skills-category">
          <h3>Databases & Tools</h3>
          <div class="skills-row">
            {#each [...portfolio.skills.databases, ...portfolio.skills.tools] as skill}
              <span class="skill-tag">{skill}</span>
            {/each}
          </div>
        </div>
        <div class="nav-buttons">
          <button on:click={() => navigateTo('about')}>← About</button>
          <button on:click={() => navigateTo('projects')}>Projects →</button>
        </div>
      </div>
    {:else if currentSection === 'projects'}
      <div class="section-content">
        <h2>Projects</h2>
        <div class="projects-grid">
          {#each portfolio.projects as project}
            <div class="project-card">
              <h3>{project.name}</h3>
              <p class="tech">{project.tech}</p>
              <p>{project.description}</p>
            </div>
          {/each}
        </div>
        <div class="nav-buttons">
          <button on:click={() => navigateTo('skills')}>← Skills</button>
          <button on:click={() => navigateTo('contact')}>Contact →</button>
        </div>
      </div>
    {:else if currentSection === 'contact'}
      <div class="section-content">
        <h2>Get In Touch</h2>
        <div class="contact-links">
          <a href="https://{portfolio.github}" target="_blank">💻 GitHub</a>
          <a href="https://{portfolio.linkedin}" target="_blank">💼 LinkedIn</a>
          <a href="https://{portfolio.youtube}" target="_blank">🎥 YouTube</a>
          <a href="mailto:{portfolio.email}">📧 Email</a>
        </div>
        <div class="hobbies">
          <h3>Interests</h3>
          {#each portfolio.hobbies as hobby}
            <p>• {hobby}</p>
          {/each}
        </div>
        <div class="nav-buttons">
          <button on:click={() => navigateTo('projects')}>← Projects</button>
          <button on:click={() => navigateTo('home')}>Home →</button>
        </div>
      </div>
    {/if}
  </div>
</div>
{/if}

<style>
  .portfolio-app {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #000;
    border-radius: 12px;
    box-shadow: 0 25px 80px rgba(136, 0, 255, 0.5);
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
  
  /* Window controls */
  .window-controls {
    position: absolute;
    top: 16px;
    left: 16px;
    display: flex;
    gap: 8px;
    z-index: 30;
    background: rgba(0, 0, 0, 0.8);
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
  }
  
  .control:hover { transform: scale(1.15); }
  .control.close { background: #ff5f56; }
  .control.minimize { background: #ffbd2e; }
  .control.maximize { background: #27c93f; }
  
  .canvas-container { width: 100%; height: 100%; }
  
  /* Content overlay */
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
  
  /* Home section with animated name */
  .home-section {
    text-align: center;
    pointer-events: none;
  }
  
  .name {
    font-size: 3.5rem;
    font-weight: 900;
    background: linear-gradient(45deg, #fff, #8800ff, #00ffff);
    background-size: 200% 200%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: gradientFlow 3s ease infinite;
    letter-spacing: 4px;
    opacity: 0;
    transform: translateY(50px) scale(0.8);
    transition: all 1.5s cubic-bezier(0.34, 1.56, 0.64, 1);
    text-shadow: 0 0 40px rgba(136, 0, 255, 0.8);
  }
  
  .name.show {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  
  .title {
    font-size: 1.4rem;
    color: #8800ff;
    font-weight: 600;
    margin-top: 20px;
    opacity: 0;
    transform: translateY(30px);
    transition: all 1s ease 0.5s;
    text-shadow: 0 0 20px rgba(136, 0, 255, 0.5);
  }
  
  .title.show {
    opacity: 1;
    transform: translateY(0);
  }
  
  .scroll-hint {
    margin-top: 50px;
    color: #8800ff;
    font-size: 0.9rem;
    letter-spacing: 3px;
    opacity: 0;
    transition: opacity 1s ease 1s;
  }
  
  .scroll-hint.show { opacity: 1; }
  
  .arrow {
    font-size: 2rem;
    animation: bounce 2s infinite;
    margin-top: 10px;
  }
  
  /* Section content */
  .section-content {
    background: rgba(0, 0, 0, 0.85);
    backdrop-filter: blur(30px);
    padding: 40px;
    border-radius: 20px;
    border: 2px solid rgba(136, 0, 255, 0.3);
    max-width: 700px;
    max-height: 80vh;
    overflow-y: auto;
    pointer-events: auto;
    box-shadow: 0 0 60px rgba(136, 0, 255, 0.4);
  }
  
  .section-content h2 {
    font-size: 2.5rem;
    color: #8800ff;
    margin-bottom: 20px;
    text-shadow: 0 0 20px rgba(136, 0, 255, 0.8);
  }
  
  .section-content h3 {
    font-size: 1.3rem;
    color: #00ffff;
    margin: 20px 0 10px;
  }
  
  .section-content p { color: #fff; font-size: 1.05rem; line-height: 1.7; margin-bottom: 15px; }
  
  .info-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;
    margin: 20px 0;
  }
  
  .info-item {
    background: rgba(136, 0, 255, 0.15);
    padding: 12px;
    border-radius: 8px;
    color: #fff;
    border: 1px solid rgba(136, 0, 255, 0.3);
  }
  
  .skills-category { margin-bottom: 25px; }
  
  .skills-row {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  
  .skill-tag {
    background: rgba(136, 0, 255, 0.2);
    padding: 8px 16px;
    border-radius: 20px;
    color: #00ffff;
    font-weight: 600;
    font-size: 0.9rem;
    border: 1px solid rgba(0, 255, 255, 0.3);
  }
  
  .projects-grid {
    display: grid;
    gap: 20px;
    margin: 20px 0;
  }
  
  .project-card {
    background: rgba(136, 0, 255, 0.1);
    padding: 20px;
    border-radius: 12px;
    border: 1px solid rgba(136, 0, 255, 0.3);
  }
  
  .project-card h3 { color: #00ffff; margin-bottom: 8px; font-size: 1.3rem; }
  .project-card .tech { color: #8800ff; font-size: 0.9rem; margin-bottom: 10px; font-weight: 600; }
  
  .contact-links {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
    margin: 25px 0;
  }
  
  .contact-links a {
    background: rgba(136, 0, 255, 0.2);
    padding: 15px;
    border-radius: 10px;
    color: #00ffff;
    text-decoration: none;
    font-weight: 600;
    border: 1px solid rgba(0, 255, 255, 0.3);
    transition: all 0.3s;
    text-align: center;
  }
  
  .contact-links a:hover {
    background: rgba(136, 0, 255, 0.4);
    transform: translateY(-3px);
    box-shadow: 0 5px 20px rgba(136, 0, 255, 0.5);
  }
  
  .hobbies { margin-top: 25px; }
  .hobbies p { color: #00ffff; margin: 8px 0; }
  
  .nav-buttons {
    display: flex;
    gap: 15px;
    margin-top: 30px;
    justify-content: center;
  }
  
  .nav-buttons button {
    background: rgba(136, 0, 255, 0.3);
    border: 2px solid #8800ff;
    color: #fff;
    padding: 12px 30px;
    border-radius: 25px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 600;
    transition: all 0.3s;
  }
  
  .nav-buttons button:hover {
    background: rgba(136, 0, 255, 0.6);
    transform: scale(1.05);
    box-shadow: 0 5px 25px rgba(136, 0, 255, 0.6);
  }
  
  /* Animations */
  @keyframes gradientFlow {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
  
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-15px); }
    60% { transform: translateY(-8px); }
  }
  
  /* Scrollbar */
  .section-content::-webkit-scrollbar { width: 8px; }
  .section-content::-webkit-scrollbar-track { background: rgba(136, 0, 255, 0.1); }
  .section-content::-webkit-scrollbar-thumb { background: rgba(136, 0, 255, 0.5); border-radius: 4px; }
  
  /* Responsive */
  @media (max-width: 768px) {
    .portfolio-app:not(.fullscreen) { width: 95vw; height: 80vh; }
    .name { font-size: 2.5rem; }
    .contact-links { grid-template-columns: 1fr; }
  }
</style>