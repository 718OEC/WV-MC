// Initialize Page
document.addEventListener("DOMContentLoaded", () => {
  // Set Title from config
  document.getElementById("college-title").innerText = `${CONFIG.collegeName} Clubs`;
  document.getElementById("start-club-link").href = CONFIG.startClubUrl;

  // Dark Mode Toggle Logic
  const themeBtn = document.getElementById("theme-toggle");
  themeBtn.addEventListener("click", () => {
    const isDark = document.body.getAttribute("data-theme") === "dark";
    document.body.setAttribute("data-theme", isDark ? "light" : "dark");
    themeBtn.innerText = isDark ? "🌙" : "☀️";
  });

  // Load Initial Placeholder Cards ("The Bones")
  loadInitialBones();
});

// Render basic starter card structure
function loadInitialBones() {
  const grid = document.getElementById("club-grid");
  
  // Starter Sample Data to demonstrate "the bones"
  const sampleClubs = [
    { name: "Computer Science Club", category: "STEM", desc: "Learn web development and vibe coding.", time: "Tuesdays @ 4 PM" },
    { name: "Business & Entrepreneurship", category: "Business", desc: "Pitch deck workshops and networking.", time: "Thursdays @ 5 PM" },
    { name: "Art & Design Club", category: "Arts", desc: "Digital art, UI/UX, and studio sessions.", time: "Wednesdays @ 3 PM" }
  ];

  grid.innerHTML = sampleClubs.map(club => `
    <div class="card">
      <h3>${club.name}</h3>
      <p style="color: var(--text-muted); font-size: 14px;">🏷️ ${club.category} • 🕒 ${club.time}</p>
      <p>${club.desc}</p>
      <a href="${CONFIG.defaultFormUrl}" target="_blank" class="btn">Sign Up</a>
    </div>
  `).join('');
}
