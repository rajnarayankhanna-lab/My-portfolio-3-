const music = document.getElementById("backgroundMusic");
const gate = document.getElementById("musicGate");
const enterBtn = document.getElementById("enterBtn");

const savedTime = localStorage.getItem("musicTime");
const musicWasPlaying = localStorage.getItem("musicPlaying");


// Restore previous position
if (savedTime !== null) {
  music.addEventListener("loadedmetadata", () => {
    music.currentTime = parseFloat(savedTime);
  }, { once: true });
}


// Save current position
setInterval(() => {
  if (!music.paused) {
    localStorage.setItem("musicTime", music.currentTime);
    localStorage.setItem("musicPlaying", "true");
  }
}, 500);


// Save immediately when leaving the page
window.addEventListener("pagehide", () => {
  localStorage.setItem("musicTime", music.currentTime);
  localStorage.setItem(
    "musicPlaying",
    music.paused ? "false" : "true"
  );
});


// INDEX PAGE
if (enterBtn) {

  enterBtn.addEventListener("click", async () => {

    try {

      await music.play();

      localStorage.setItem("musicPlaying", "true");

      gate.classList.add("hidden");

    } catch (error) {

      console.log("Music could not start:", error);

    }

  });

}


// OTHER PAGES
if (!enterBtn && musicWasPlaying === "true") {

  music.addEventListener("canplay", async () => {

    try {
      await music.play();
    } catch (error) {
      console.log("Browser blocked automatic playback.");
    }

  }, { once: true });

}


//Hidden nav 
const slideOpen = document.getElementById("slide_open");
const nav = document.getElementById("nav");

slideOpen.addEventListener("click", function () {
  nav.classList.toggle("show");
});

//Dark/light mode
const settingsBtn = document.getElementById("settingsBtn");
const themeSettings = document.getElementById("themeSettings");
const themeSelect = document.getElementById("themeSelect");

// Open and close settings
settingsBtn.addEventListener("click", () => {
  const isOpen = !themeSettings.hidden;

  themeSettings.hidden = isOpen;
  settingsBtn.setAttribute("aria-expanded", String(!isOpen));
});

// Apply selected theme
function applyTheme(theme) {
  document.body.classList.toggle(
    "light-mode",
    theme === "light"
  );

  themeSelect.value = theme;

  try {
    localStorage.setItem("portfolioTheme", theme);
  } catch (error) {
    // Website still works if storage is unavailable.
  }
}

// Change theme using the select menu
themeSelect.addEventListener("change", () => {
  applyTheme(themeSelect.value);
});

// Restore saved theme
let savedTheme = "dark";

try {
  savedTheme = localStorage.getItem("portfolioTheme") || "dark";
} catch (error) {}

applyTheme(savedTheme === "light" ? "light" : "dark");