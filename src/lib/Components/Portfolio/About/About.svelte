<script>
  import { onMount } from 'svelte';

  // Function to return to the main portfolio
  const returnToPortfolio = () => {
    window.location.href = '/';
  };
</script>

<div class="page-container">
  <div class="navigation-header">
    <button class="back-button" on:click={returnToPortfolio}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 12H5M5 12L11 6M5 12L11 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <span>Back to Portfolio</span>
    </button>
  </div>

  <div class="content">
    <h1>About Me</h1>
    <div class="bio-section">
      <p>
        Hello! I'm <strong>Shaswat Choudhary</strong>, a passionate <strong>Full Stack Developer</strong> and 
        <strong>Creative Engineer</strong> who transforms complex problems into elegant digital experiences.
      </p>
      
      <p>
        With expertise spanning both frontend and backend technologies, I specialize in building immersive 
        web applications that blend technical precision with creative innovation. My journey in tech has 
        been driven by curiosity and a commitment to pushing the boundaries of what's possible on the web.
      </p>
    </div>

    <div class="skills-section">
      <h2>My Skills & Expertise</h2>
      <div class="skills-grid">
        <div class="skill-category">
          <h3>Frontend</h3>
          <ul>
            <li>React & Svelte</li>
            <li>Three.js & WebGL</li>
            <li>TypeScript & JavaScript</li>
            <li>CSS3 & Tailwind</li>
          </ul>
        </div>
        <div class="skill-category">
          <h3>Backend</h3>
          <ul>
            <li>Node.js & Express</li>
            <li>Python & Django</li>
            <li>RESTful APIs</li>
            <li>GraphQL</li>
          </ul>
        </div>
        <div class="skill-category">
          <h3>DevOps & Tools</h3>
          <ul>
            <li>Docker & Kubernetes</li>
            <li>AWS & Cloud Services</li>
            <li>CI/CD Pipelines</li>
            <li>Git & GitHub</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="philosophy-section">
      <h2>My Approach</h2>
      <p>
        I believe in creating technology that serves people. Every line of code I write aims to solve 
        real problems while delivering delightful user experiences. I'm constantly exploring new 
        technologies and methodologies to stay at the forefront of web development.
      </p>
    </div>
  </div>
</div>

<style>
.page-container {
  padding: 0;
  background: #0a0a0a;
  color: #e0e0e0;
  min-height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.navigation-header {
  padding: 20px 40px;
  border-bottom: 1px solid rgba(136, 221, 255, 0.2);
  background: rgba(10, 10, 10, 0.8);
  backdrop-filter: blur(10px);
}

.back-button {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(136, 221, 255, 0.1);
  color: #88ddff;
  border: 1px solid rgba(136, 221, 255, 0.3);
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.back-button:hover {
  background: rgba(136, 221, 255, 0.2);
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(136, 221, 255, 0.3);
}

.back-button svg {
  width: 20px;
  height: 20px;
}

.content {
  max-width: 1000px;
  margin: 0 auto;
  padding: 50px 40px;
}

h1 {
  font-size: 3.5rem;
  margin-bottom: 30px;
  background: linear-gradient(45deg, #ffffff, #88ddff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 800;
  letter-spacing: -1px;
}

h2 {
  font-size: 2.2rem;
  margin: 40px 0 25px;
  color: #88ddff;
  font-weight: 700;
}

.bio-section p {
  font-size: 1.2rem;
  line-height: 1.8;
  margin-bottom: 20px;
  color: #cccccc;
}

.bio-section strong {
  color: #88ddff;
  font-weight: 700;
}

.skills-section {
  margin: 50px 0;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  margin-top: 20px;
}

.skill-category {
  background: rgba(30, 30, 30, 0.6);
  padding: 25px;
  border-radius: 12px;
  border: 1px solid rgba(136, 221, 255, 0.1);
  transition: transform 0.3s ease;
}

.skill-category:hover {
  transform: translateY(-5px);
  border-color: rgba(136, 221, 255, 0.3);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.skill-category h3 {
  color: #88ddff;
  font-size: 1.4rem;
  margin-bottom: 15px;
  font-weight: 700;
}

.skill-category ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.skill-category li {
  padding: 8px 0;
  font-size: 1.1rem;
  color: #e0e0e0;
  position: relative;
  padding-left: 20px;
}

.skill-category li:before {
  content: "•";
  color: #88ddff;
  position: absolute;
  left: 0;
  font-size: 1.4rem;
  line-height: 1;
}

.philosophy-section p {
  font-size: 1.2rem;
  line-height: 1.8;
  color: #cccccc;
  background: rgba(30, 30, 30, 0.4);
  padding: 25px;
  border-radius: 12px;
  border-left: 3px solid #88ddff;
}

/* Responsive Design */
@media (max-width: 768px) {
  .navigation-header {
    padding: 15px 20px;
  }
  
  .back-button {
    padding: 10px 16px;
    font-size: 0.9rem;
  }
  
  .content {
    padding: 30px 20px;
  }
  
  h1 {
    font-size: 2.5rem;
  }
  
  h2 {
    font-size: 1.8rem;
  }
  
  .bio-section p,
  .philosophy-section p {
    font-size: 1.1rem;
  }
  
  .skills-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .skill-category {
    padding: 20px;
  }
}

@media (max-width: 480px) {
  h1 {
    font-size: 2rem;
  }
  
  h2 {
    font-size: 1.5rem;
  }
  
  .back-button span {
    display: none;
  }
  
  .back-button {
    padding: 10px;
    min-width: 44px;
  }
}
</style>