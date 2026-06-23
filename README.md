# 🌵 El Pollo Loco – 2D JavaScript Platformer Game

An action-packed, highly optimized 2D action-platformer game built with a strict Object-Oriented Programming (OOP) approach in pure Vanilla JavaScript. Join **Pepe** on his adventurous journey through the Mexican desert, collect coins, throw salsa bottles, and defeat crazy chickens along with the mighty Endboss!

---

## 🚀 Features & Highlights

*   **🎮 Silky-Smooth Gameplay:** Physics and gravity loops are fully synchronized to a fixed 60 FPS rhythm, preventing lag and ensuring incredibly responsive movement.
*   **📱 Mobile Ready:** Built-in responsive touch controls for smartphones, engineered with passive event listeners to shield against mobile browser interventions (prevents accidental zooming/scrolling).
*   **🔊 Smart Audio Pipeline:** A robust SoundManager that masterfully bypasses modern browser autoplay restrictions (Chrome, Safari) using lazy user-interaction triggers.
*   **📈 Isolated UI Statusbars:** Private data encapsulation and local image caches prevent RAM conflicts between Health, Coin, and Bottle asset layers.
*   **🎬 Cinematic Airborne Animations:** Jump sprites map dynamically and mathematically to Pepe's real-time gravitational velocity curves for ultra-fluid motion phases.

---

## 🛠️ Tech Stack & Architecture

*   **Language:** Vanilla JavaScript (ES6+)
*   **Rendering:** HTML5 Canvas API (60 FPS Game-Loop)
*   **Structure:** Pure Object-Oriented Programming (OOP) with a strict inheritance chain (`DrawableObject` ➔ `MovableObject` ➔ entities).
*   **Clean Code:** Thorough architectural refactoring – every single core function is written under a maximum limit of 14 lines, highly performant, and fully documented using JSDoc standards.

---

## 🕹️ Controls

### 💻 Desktop (PC)
*   **Left Arrow (`←`) / Right Arrow (`→`):** Move Pepe left or right
*   **Spacebar (`Space`):** Jump (Triggers a trampoline recoil bounce when landing on top of standard or small chickens)
*   **Key `D`:** Throw a Salsa Bottle
*   **Key `F`:** Toggle browser Fullscreen mode on or off

### 📱 Mobile (Smartphones)
*   Intuitive, on-screen touch buttons engineered with a localized input-lag barrier for rapid mobile combat.

---

## ⚙️ Installation & Launch

This project runs natively in the browser and requires no complex build systems, NPM scripts, or local database installations.

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com
    ```
2.  **Launch the Game:**
    Simply open the `index.html` file via double-click in any modern web browser (Chrome, Firefox, Safari, Edge).


---

## 👨‍💻 Developed By
*   **Marion Benda** *Web Development Trainee / Apprentice (2026)*
