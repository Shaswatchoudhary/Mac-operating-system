<script>
  import { onMount } from 'svelte';
  import appleLogo from '$lib/assets/static/mac2.png';
  import bootSound from '$lib/assets/audio/macos.mp3';

  export let onFinish;

  let audio;
  let progress = 0;
  let fadeOut = false;

  onMount(() => {
    audio = new Audio(bootSound);
    audio.volume = 0.5;

    const playAudio = () => {
      audio.play().catch(err => {
        console.log('Autoplay blocked, waiting for user interaction.');
        window.addEventListener('click', () => {
          audio.play();
        }, { once: true });
      });
    };

    playAudio();

   
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);

        setTimeout(() => {
          fadeOut = true;
          setTimeout(() => {
            onFinish();
          }, 500);
        }, 500);
      }
    }, 200);

 
    return () => {
      clearInterval(interval);
      if (audio) audio.pause();
    };
  });
</script>

<div 
  class="boot-screen"
  class:fade-out={fadeOut}
>
  <div class="content">
    <img src={appleLogo} alt="Apple Logo" class="logo" />
    <div class="progress-container">
      <div class="progress-bar">
        <div class="progress-fill" style="width: {progress}%"></div>
      </div>
    </div>
  </div>
</div>

<style>
  .boot-screen {
    position: fixed;
    inset: 0;
    background: linear-gradient(to bottom, #000000, #0a0a0a, #000000);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    transition: opacity 0.6s ease-in-out;
  }

  .boot-screen.fade-out {
    opacity: 0;
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4rem;
  }

  /* Apple logo */
  .logo {
    width: 130px;
    height: 130px;
    filter: drop-shadow(0 0 12px rgba(255,255,255,0.3));
    animation: pulse 2.5s ease-in-out infinite;
    transition: transform 0.3s ease;
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
      transform: scale(1);
    }
    50% {
      opacity: 0.8;
      transform: scale(1.03);
    }
  }

  .progress-container {
    width: 260px;
  }

  .progress-bar {
    width: 100%;
    height: 5px;
    background: rgba(255, 255, 255, 0.15);
    border-radius: 3px;
    overflow: hidden;
    box-shadow: 0 0 5px rgba(255,255,255,0.1);
  }

  .progress-fill {
    height: 100%;
    background: #fff;
    border-radius: 3px;
    transition: width 0.4s ease-out;
  }
</style>
