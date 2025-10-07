// Data
const ENGLISH_AFFIRMATIONS = [
  "You are a masterpiece in progress, beautifully unfolding with each passing day.",
  "Your passion lights up every room you enter, inspiring those around you.",
  "God has blessed you with a heart full of love and a spirit that never gives up.",
  "Your dreams of Japan are just the beginning of all the adventures awaiting you.",
  "The way you balance strength and gentleness is truly remarkable.",
  "Your dedication to civil engineering will build bridges to an amazing future.",
  "Every challenge you face is shaping you into someone even more incredible.",
  "Your playful spirit brings joy and laughter to everyone lucky enough to know you.",
  "At 19, you're already showing the world what grace and determination look like.",
  "Your love for home shows how deeply you value comfort and connection.",
  "The faith you carry is a light that guides you through every storm.",
  "Your favorite things—chicken, plantain, that dream G-Wagon—they all tell your unique story.",
  "You disturb in the most delightful way, keeping life exciting and full of surprises.",
  "Your engineering mind will create structures that stand the test of time.",
  "Every day with you is a gift wrapped in laughter and love.",
  "Your passion for life is contagious and absolutely beautiful.",
  "God is writing an incredible story with your life, and it's just getting started.",
  "You are loved beyond measure, cherished beyond words.",
  "Your dreams are valid, your goals are achievable, and your future is bright.",
  "The world is better because you're in it, Nivanna.",
]

const FRENCH_AFFIRMATIONS = [
  "Ta présence illumine chaque instant comme un rayon de soleil matinal.",
  "Chaque rêve que tu portes est une promesse d'un avenir magnifique.",
  "Ta force intérieure est aussi belle que ton sourire radieux.",
  "Les étoiles brillent moins fort que l'éclat de ton âme généreuse.",
  "Tu es une œuvre d'art vivante, unique et précieuse.",
  "Ton cœur déborde d'une tendresse qui réchauffe le monde entier.",
  "Chaque pas que tu fais trace un chemin vers des merveilles infinies.",
  "Ta foi est un phare qui guide tes pas vers la lumière.",
  "L'univers conspire pour réaliser tous tes vœux les plus chers.",
  "Tu portes en toi une magie que personne d'autre ne possède.",
  "Tes rires sont comme une mélodie qui enchante les cœurs.",
  "Tu es capable de réaliser des choses extraordinaires et inattendues.",
  "Chaque jour avec toi est un cadeau précieux et irremplaçable.",
  "Ta passion pour la vie inspire tous ceux qui te connaissent.",
  "Les anges veillent sur toi et protègent chacun de tes rêves.",
  "Tu es aimée profondément, aujourd'hui et pour toujours.",
  "Ton avenir brille de mille feux, rempli de promesses merveilleuses.",
  "Ta gentillesse touche les âmes et transforme les vies.",
  "Chaque obstacle n'est qu'un tremplin vers ta grandeur.",
  "Tu es exactement là où tu dois être, au bon moment.",
]

const ALL_AFFIRMATIONS = [...ENGLISH_AFFIRMATIONS, ...FRENCH_AFFIRMATIONS]

const GALLERY_IMAGES = [
  {
    src: "/paper2.jpg",
    captionEn: "Every sunset reminds me of you",
    captionFr: "Chaque coucher de soleil me rappelle toi",
  },
  {
    src: "/happy-couple-laughing.png",
    captionEn: "Moments that take my breath away",
    captionFr: "Des moments qui me coupent le souffle",
  },
  {
    src: "/beautiful-woman-smiling-portrait.jpg",
    captionEn: "Your smile lights up my world",
    captionFr: "Ton sourire illumine mon monde",
  },
  {
    src: "/romantic-date-night-candlelight.jpg",
    captionEn: "Creating memories together",
    captionFr: "Créer des souvenirs ensemble",
  },
  {
    src: "/couple-laughing-and-having-fun.jpg",
    captionEn: "Laughter that fills my heart",
    captionFr: "Des rires qui remplissent mon cœur",
  },
  {
    src: "/tender-romantic-couple-embrace.jpg",
    captionEn: "In your arms, I found home",
    captionFr: "Dans tes bras, j'ai trouvé ma maison",
  },
]

// State
let currentAffirmationIndex = 0
let affirmationTimer = null
let currentGalleryIndex = 0

// Password Gate
const passwordGate = document.getElementById("password-gate")
const passwordForm = document.getElementById("password-form")
const passwordInput = document.getElementById("password-input")
const errorMessage = document.getElementById("error-message")
const mainContent = document.getElementById("main-content")

passwordForm.addEventListener("submit", (e) => {
  e.preventDefault()
  const password = passwordInput.value.toLowerCase().trim()

  if (password === "iloveyou") {
    // Success - unlock with animation
    passwordGate.style.animation = "fadeOut 1s ease-out forwards"
    setTimeout(() => {
      passwordGate.style.display = "none"
      mainContent.classList.remove("hidden")
      initializeApp()
    }, 1000)
  } else {
    // Error - shake animation
    errorMessage.textContent = "Incorrect password. Try again! 💕"
    passwordForm.style.animation = "shake 0.5s ease-out"
    setTimeout(() => {
      passwordForm.style.animation = ""
      errorMessage.textContent = ""
    }, 2000)
  }
})

// Initialize app after unlock
function initializeApp() {
  initFloatingHearts()
  initAudioPlayer()
  initAffirmations()
  initGallery()
  initLightbox()
}

// Floating Hearts
function initFloatingHearts() {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  if (prefersReducedMotion) return

  const container = document.getElementById("floating-hearts")

  for (let i = 0; i < 8; i++) {
    const heart = document.createElement("div")
    heart.className = "floating-heart"
    heart.style.left = `${Math.random() * 100}%`
    heart.style.animationDelay = `${Math.random() * 5}s`
    heart.innerHTML = `
            <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
        `
    container.appendChild(heart)
  }
}

// Audio Player
function initAudioPlayer() {
  const audio = document.getElementById("background-audio")
  const playPauseBtn = document.getElementById("play-pause-btn")
  const muteBtn = document.getElementById("mute-btn")
  const playIcon = document.getElementById("play-icon")
  const pauseIcon = document.getElementById("pause-icon")
  const volumeIcon = document.getElementById("volume-icon")
  const muteIcon = document.getElementById("mute-icon")

  let isPlaying = false
  let isMuted = false

  playPauseBtn.addEventListener("click", () => {
    if (isPlaying) {
      audio.pause()
      playIcon.style.display = "block"
      pauseIcon.style.display = "none"
    } else {
      audio.play().catch((err) => console.log("Audio playback failed:", err))
      playIcon.style.display = "none"
      pauseIcon.style.display = "block"
    }
    isPlaying = !isPlaying
  })

  muteBtn.addEventListener("click", () => {
    audio.muted = !isMuted
    isMuted = !isMuted

    if (isMuted) {
      volumeIcon.style.display = "none"
      muteIcon.style.display = "block"
    } else {
      volumeIcon.style.display = "block"
      muteIcon.style.display = "none"
    }
  })
}

// Affirmations
function initAffirmations() {
  const affirmationText = document.getElementById("current-affirmation")
  const prevBtn = document.getElementById("prev-affirmation")
  const nextBtn = document.getElementById("next-affirmation")
  const dotsContainer = document.getElementById("affirmation-dots")

  // Create dots
  ALL_AFFIRMATIONS.forEach((_, index) => {
    const dot = document.createElement("button")
    dot.className = "affirmation-dot"
    dot.setAttribute("aria-label", `Go to affirmation ${index + 1}`)
    if (index === 0) dot.classList.add("active")

    dot.addEventListener("click", () => {
      currentAffirmationIndex = index
      updateAffirmation()
      resetAffirmationTimer()
    })

    dotsContainer.appendChild(dot)
  })

  function updateAffirmation(animate = true) {
    if (animate) {
      affirmationText.style.animation = "slideInRight 0.8s ease-out"
      setTimeout(() => {
        affirmationText.style.animation = ""
      }, 800)
    }

    affirmationText.textContent = ALL_AFFIRMATIONS[currentAffirmationIndex]

    // Update dots
    const dots = dotsContainer.querySelectorAll(".affirmation-dot")
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentAffirmationIndex)
    })
  }

  function resetAffirmationTimer() {
    if (affirmationTimer) clearInterval(affirmationTimer)
    affirmationTimer = setInterval(() => {
      currentAffirmationIndex = (currentAffirmationIndex + 1) % ALL_AFFIRMATIONS.length
      updateAffirmation()
    }, 30000) // 30 seconds
  }

  prevBtn.addEventListener("click", () => {
    currentAffirmationIndex = (currentAffirmationIndex - 1 + ALL_AFFIRMATIONS.length) % ALL_AFFIRMATIONS.length
    updateAffirmation()
    resetAffirmationTimer()
  })

  nextBtn.addEventListener("click", () => {
    currentAffirmationIndex = (currentAffirmationIndex + 1) % ALL_AFFIRMATIONS.length
    updateAffirmation()
    resetAffirmationTimer()
  })

  // Initialize
  updateAffirmation(false)
  resetAffirmationTimer()
}

// Gallery
function initGallery() {
  const galleryGrid = document.getElementById("gallery-grid")

  GALLERY_IMAGES.forEach((image, index) => {
    const item = document.createElement("div")
    item.className = "gallery-item"
    item.setAttribute("data-index", index)
    item.innerHTML = `
            <img src="${image.src}" alt="${image.captionEn}" class="gallery-image" loading="lazy">
            <div class="gallery-caption">${image.captionEn}</div>
        `

    item.addEventListener("click", () => {
      currentGalleryIndex = index
      window.openLightbox()
    })

    galleryGrid.appendChild(item)
  })
}

// Lightbox
function initLightbox() {
  const lightbox = document.getElementById("lightbox")
  const lightboxImage = document.getElementById("lightbox-image")
  const lightboxCaptionEn = document.getElementById("lightbox-caption-en")
  const lightboxCaptionFr = document.getElementById("lightbox-caption-fr")
  const closeBtn = document.getElementById("close-lightbox")
  const prevBtn = document.getElementById("prev-image")
  const nextBtn = document.getElementById("next-image")
  const prevBtnMobile = document.getElementById("prev-image-mobile")
  const nextBtnMobile = document.getElementById("next-image-mobile")

  function updateLightbox() {
    const image = GALLERY_IMAGES[currentGalleryIndex]
    lightboxImage.src = image.src
    lightboxImage.alt = image.captionEn
    lightboxCaptionEn.textContent = image.captionEn
    lightboxCaptionFr.textContent = image.captionFr
  }

  function goToPrevious() {
    currentGalleryIndex = (currentGalleryIndex - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length
    updateLightbox()
  }

  function goToNext() {
    currentGalleryIndex = (currentGalleryIndex + 1) % GALLERY_IMAGES.length
    updateLightbox()
  }

  closeBtn.addEventListener("click", window.closeLightbox)
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) window.closeLightbox()
  })

  prevBtn.addEventListener("click", (e) => {
    e.stopPropagation()
    goToPrevious()
  })

  nextBtn.addEventListener("click", (e) => {
    e.stopPropagation()
    goToNext()
  })

  prevBtnMobile.addEventListener("click", goToPrevious)
  nextBtnMobile.addEventListener("click", goToNext)

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("hidden")) {
      if (e.key === "Escape") window.closeLightbox()
      else if (e.key === "ArrowLeft") goToPrevious()
      else if (e.key === "ArrowRight") goToNext()
    }
  })

  window.openLightbox = () => {
    lightbox.classList.remove("hidden")
    updateLightbox()
    document.body.style.overflow = "hidden"
  }

  window.closeLightbox = () => {
    lightbox.classList.add("hidden")
    document.body.style.overflow = ""
  }
}

// Add fadeOut animation to CSS dynamically
const style = document.createElement("style")
style.textContent = `
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: scale(1);
        }
        to {
            opacity: 0;
            transform: scale(1.1);
        }
    }
`
document.head.appendChild(style)
