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
  
  // Current view state
  let currentView = 'landing'; // 'landing', 'about', 'skills', 'projects', 'contact'
  
  // Animation states
  let showName = false;
  let showSubtitle = false;
  let showButtons = false;
  
  // Your data
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
      { category: "Languages", items: ["JavaScript", "C++"] },
      { category: "Frontend", items: ["React.js", "React Native", "Next.js", "Svelte"] },
      { category: "Backend", items: ["Node.js", "Express"] },
      { category: "Database", items: ["MongoDB", "Supabase"] },
      { category: "Creative", items: ["3D Modeling", "Blender", "Video Editing"] },
      { category: "Content", items: ["YouTube Creator", "Tech Tutorials"] },
      { category: "Tools", items: ["Git", "GitHub", "VS Code"] }
    ],
    
    projects: [
      {
        title: "WhatsApp Clone",
        tech: "MERN Stack • Socket.io",
        desc: "Real-time chat application with private messaging, group chats, and seamless communication using WebSockets.",
        year: "2024",
        github: "https://github.com/Shaswatchoudhary"
      },
      {
        title: "Music Streaming App",
        tech: "React Native • Node.js",
        desc: "Cross-platform music app with playlist creation, media controls, and user authentication.",
        year: "2024",
        github: "https://github.com/Shaswatchoudhary"
      },
      {
        title: "Receipt Scanner",
        tech: "React Native • OCR",
        desc: "Mobile app to scan receipts, extract text using OCR, and track expenses with intuitive UI.",
        year: "2024",
        github: "https://github.com/Shaswatchoudhary"
      },
      {
        title: "Clock App",
        tech: "React Native",
        desc: "Functional clock application with dynamic time updates and customizable themes for Android.",
        year: "2024",
        github: "https://github.com/Shaswatchoudhary"
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
  
  // Trigger animations
  setTimeout(() => { showName = true; }, 800);
  setTimeout(() => { showSubtitle = true; }, 1400);
  setTimeout(() => { showButtons = true; }, 2000);
  
  const toggleFullscreen = () => {
    isFullscreen = !isFullscreen;
    if (renderer && camera) {
      updateRendererSize();
      camera.aspect = getAspectRatio();
      camera.updateProjectionMatrix();
    }
  };
  
  // Navigate to section with fade transition
  const navigateToSection = (section) => {
    currentView = section;
    if (section === 'landing') {
      controls.autoRotate = true;
    } else {
      controls.autoRotate = false;
    }
  };
  
  // Create minimal particle field
  const createParticles = () => {
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
    const material = new THREE.PointsMaterial({ 
      color: 0x888888, 
      size: 1.5,
      transparent: true,
      opacity: 0.6
    });
    
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
  };
  
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
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);
    
    camera = new THREE.PerspectiveCamera(50, getAspectRatio(), 0.1, 1000);
    camera.position.set(0, 0, 5);
    
    renderer = new THREE.WebGLRenderer({ antialias: true });
    updateRendererSize();
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    canvasContainer.appendChild(renderer.domElement);
    
    // Minimal lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(3, 4, 5);
    scene.add(light);
    
    createParticles();
    
    // Load character model
    const loader = new GLTFLoader();
    loader.load(
      'https://models.readyplayer.me/690238c53fad7e26d2a819f8.glb',
      (gltf) => {
        model = gltf.scene;
        
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const scale = 3 / Math.max(size.x, size.y, size.z);
        
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
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1;
    controls.minDistance = 3;
    controls.maxDistance = 8;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    
    // Animation loop
    const clock = new THREE.Clock();
    const animate = () => {
      if (!isVisible) return;
      requestAnimationFrame(animate);
      
      const elapsed = clock.elapsedTime;
      
      // Gentle floating
      if (model) {
        model.position.y = Math.sin(elapsed * 0.5) * 0.1;
      }
      
      controls.update();
      renderer.render(scene, camera);
    };
    animate();
    
    const handleResize = () => {
      if (!isVisible) return;
      camera.aspect = getAspectRatio();
      camera.updateProjectionMatrix();
      updateRendererSize();
    };
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (renderer) renderer.dispose();
    };
  });
</script>

<svelte:head>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&family=Syne:wght@400;600;700;800&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet">
</svelte:head>

{#if isVisible}
<div class="portfolio-app {isFullscreen ? 'fullscreen' : ''}">
  <!-- Window controls -->
  <div class="window-controls">
    <button class="control close" on:click={onClose} aria-label="Close"></button>
    <button class="control minimize" on:click={() => isFullscreen = false} aria-label="Minimize"></button>
    <button class="control maximize" on:click={toggleFullscreen} aria-label="Maximize"></button>
  </div>
  
  <!-- 3D Canvas -->
  <div class="canvas-container" bind:this={canvasContainer}></div>
  
  <!-- Content overlay -->
  <div class="content-overlay">
    {#if currentView === 'landing'}
      <!-- LANDING PAGE -->
      <div class="landing-page">
        <div class="name-block {showName ? 'show' : ''}">
          {portfolio.name}
        </div>
        
        <div class="subtitle-block {showSubtitle ? 'show' : ''}">
          <div class="role">{portfolio.role}</div>
          <div class="tagline">{portfolio.tagline}</div>
        </div>
        
        <div class="nav-buttons {showButtons ? 'show' : ''}">
          <button class="nav-btn" on:click={() => navigateToSection('about')}>About</button>
          <button class="nav-btn" on:click={() => navigateToSection('skills')}>Skills</button>
          <button class="nav-btn" on:click={() => navigateToSection('projects')}>Projects</button>
          <button class="nav-btn" on:click={() => navigateToSection('contact')}>Contact</button>
        </div>
      </div>
      
    {:else if currentView === 'about'}
      <!-- ABOUT PAGE -->
      <div class="detail-page">
        <button class="back-btn" on:click={() => navigateToSection('landing')}>← Back</button>
        
        <h1 class="page-title">About Me</h1>
        
        <div class="content-grid">
          <div class="content-block">
            <h3>Introduction</h3>
            <p>{portfolio.about.intro}</p>
          </div>
          
          <div class="content-block">
            <h3>Passion</h3>
            <p>{portfolio.about.passion}</p>
          </div>
          
          <div class="content-block">
            <h3>Education</h3>
            <p>{portfolio.about.education}</p>
          </div>
        </div>
      </div>
      
    {:else if currentView === 'skills'}
      <!-- SKILLS PAGE -->
      <div class="detail-page">
        <button class="back-btn" on:click={() => navigateToSection('landing')}>← Back</button>
        
        <h1 class="page-title">Skills & Expertise</h1>
        
        <div class="skills-layout">
          {#each portfolio.skills as skillGroup}
            <div class="skill-group">
              <h3 class="skill-category">{skillGroup.category}</h3>
              <div class="skill-items">
                {#each skillGroup.items as skill}
                  <span class="skill-chip">{skill}</span>
                {/each}
              </div>
            </div>
          {/each}
        </div>
      </div>
      
    {:else if currentView === 'projects'}
      <!-- PROJECTS PAGE -->
      <div class="detail-page">
        <button class="back-btn" on:click={() => navigateToSection('landing')}>← Back</button>
        
        <h1 class="page-title">Projects</h1>
        
        <div class="projects-grid">
          {#each portfolio.projects as project}
            <div class="project-card">
              <div class="project-header">
                <h3>{project.title}</h3>
                <div class="project-links">
                  <span class="project-year">{project.year}</span>
                  <a href={project.github} target="_blank" rel="noopener noreferrer" class="github-link" title="View on GitHub">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                  </a>
                </div>
              </div>
              <p class="project-tech">{project.tech}</p>
              <p class="project-desc">{project.desc}</p>
            </div>
          {/each}
        </div>
      </div>
      
    {:else if currentView === 'contact'}
      <!-- CONTACT PAGE -->
      <div class="detail-page">
        <button class="back-btn" on:click={() => navigateToSection('landing')}>← Back</button>
        
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
            {#each portfolio.contact.links as link}
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
{/if}

<style>
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
  
  /* Window controls */
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
  
  /* === LANDING PAGE === */
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
  }
  
  .nav-btn:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.4);
    transform: translateY(-2px);
  }
  
  /* === DETAIL PAGES === */
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
  
  /* About page */
  .content-grid {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
  
  .content-block h3 {
    font-family: 'Inter', sans-serif;
    font-size: 1.1rem;
    font-weight: 600;
    color: #aaa;
    margin-bottom: 12px;
    letter-spacing: 1px;
  }
  
  .content-block p {
    font-family: 'Inter', sans-serif;
    font-size: 1rem;
    line-height: 1.7;
    color: rgba(255, 255, 255, 0.85);
    font-weight: 300;
  }
  
  /* Skills page */
  .skills-layout {
    display: flex;
    flex-direction: column;
    gap: 35px;
  }
  
  .skill-group {
    padding-bottom: 25px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .skill-category {
    font-family: 'DM Mono', monospace;
    font-size: 0.85rem;
    font-weight: 500;
    color: #888;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-bottom: 15px;
  }
  
  .skill-items {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  
  .skill-chip {
    font-family: 'Inter', sans-serif;
    padding: 8px 16px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.15);
    color: #fff;
    font-size: 0.9rem;
    font-weight: 500;
    border-radius: 6px;
    transition: all 0.3s;
  }
  
  .skill-chip:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.3);
  }
  
  /* Projects page */
  .projects-grid {
    display: grid;
    gap: 25px;
  }
  
  .project-card {
    padding: 25px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    transition: all 0.3s;
  }
  
  .project-card:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.2);
  }
  
  .project-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
  }
  
  .project-links {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  
  .project-card h3 {
    font-family: 'Syne', sans-serif;
    font-size: 1.3rem;
    font-weight: 600;
    color: #fff;
  }
  
  .github-link {
    color: #888;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    padding: 4px;
  }
  
  .github-link:hover {
    color: #fff;
    transform: translateY(-2px);
  }
  
  .github-link svg {
    display: block;
  }
  
  .project-year {
    font-family: 'DM Mono', monospace;
    font-size: 0.85rem;
    color: #666;
  }
  
  .project-tech {
    font-family: 'DM Mono', monospace;
    font-size: 0.85rem;
    color: #888;
    margin-bottom: 12px;
  }
  
  .project-desc {
    font-family: 'Inter', sans-serif;
    font-size: 0.95rem;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.8);
    font-weight: 300;
  }
  
  /* Contact page */
  .contact-layout {
    display: flex;
    flex-direction: column;
    gap: 40px;
  }
  
  .contact-info {
    display: flex;
    flex-direction: column;gap: 20px;
  }
  
  .info-item {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-bottom: 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .info-label {
    font-family: 'DM Mono', monospace;
    font-size: 0.8rem;
    color: #666;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  
  .info-item a, .info-item span {
    font-family: 'Inter', sans-serif;
    font-size: 1.1rem;
    color: #fff;
    text-decoration: none;
    transition: color 0.3s;
  }
  
  .info-item a:hover {
    color: #888;
  }
  
  .social-links {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 15px;
  }
  
  .social-link {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 18px 20px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 10px;
    text-decoration: none;
    transition: all 0.3s;
  }
  
  .social-link:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }
  
  .link-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
  }
  
  .link-icon svg {
    display: block;
  }
  
  .link-label {
    font-family: 'Inter', sans-serif;
    font-size: 1rem;
    font-weight: 600;
    color: #fff;
  }
  
  /* Scrollbar */
  .detail-page::-webkit-scrollbar { width: 6px; }
  .detail-page::-webkit-scrollbar-track { background: transparent; }
  .detail-page::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.2); border-radius: 3px; }
  
  /* Responsive */
  @media (max-width: 768px) {
    .portfolio-app:not(.fullscreen) { width: 95vw; height: 80vh; }
    .name-block { font-size: 2.5rem; }
    .page-title { font-size: 2.2rem; }
    .nav-buttons { flex-direction: column; }
    .detail-page { padding: 30px 25px; }
  }
</style>