let allClubsData = [];
let activeCategory = 'All';

document.addEventListener("DOMContentLoaded", () => {
  // Config Initializers
  document.getElementById("college-title").innerText = `${CONFIG.collegeName} Clubs`;
  document.getElementById("start-club-btn").href = CONFIG.startClubUrl;

  // Auto-Detect System Dark Mode
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.classList.add('dark-mode');
    document.getElementById("themeIcon").textContent = "light_mode";
  }

  // Real-Time Search Handler
  document.getElementById("search-input").addEventListener("input", (e) => {
    filterClubs(e.target.value.toLowerCase());
  });

  // Load Initial Clubs Data
  loadClubsData();
});

// Theme Toggle
function toggleTheme() {
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');
  document.getElementById("themeIcon").textContent = isDark ? "light_mode" : "dark_mode";
}

// FAB Menu Toggle
function toggleFab() {
  const wrap = document.getElementById('fabWrapper');
  const icon = document.getElementById('fabIcon');
  wrap.classList.toggle('active');
  icon.textContent = wrap.classList.contains('active') ? 'close' : 'map';
}

// Category Pill Filter Switcher
function filterCategory(category, button) {
  document.querySelectorAll('.pill').forEach(btn => btn.classList.remove('active'));
  button.classList.add('active');
  activeCategory = category;
  
  const searchVal = document.getElementById("search-input").value.toLowerCase();
  filterClubs(searchVal);
}

// Filter Engine
function filterClubs(searchTerm) {
  const filtered = allClubsData.filter(club => {
    const matchesCategory = (activeCategory === 'All' || club.category === activeCategory);
    const matchesSearch = club.name.toLowerCase().includes(searchTerm) ||
                          club.desc.toLowerCase().includes(searchTerm) ||
                          club.category.toLowerCase().includes(searchTerm);
    return matchesCategory && matchesSearch;
  });

  renderClubCards(filtered);
}

// Initial Data Load & Render
function loadClubsData() {
  // Sample Starter Data
  allClubsData = [
    { 
      name: "Computer Science Club", 
      category: "STEM", 
      desc: "Build full-stack web projects, learn vibe coding, and prep for tech interviews.", 
      time: "Tuesdays @ 4:00 PM • CHE 202",
      isLive: true,
      initials: "CS"
    },
    { 
      name: "Business & Entrepreneurship", 
      category: "Business", 
      desc: "Pitch deck workshops, startup case studies, and networking with local founders.", 
      time: "Thursdays @ 5:00 PM • Fox 101",
      isLive: false,
      initials: "BE"
    },
    { 
      name: "Art & Digital Design", 
      category: "Arts", 
      desc: "UI/UX workshops, digital art showcases, and collaborative campus creative builds.", 
      time: "Wednesdays @ 3:00 PM • Zoom",
      isLive: false,
      initials: "AD"
    }
  ];

  renderClubCards(allClubsData);
}

// Render Engine (Zero Inline CSS)
function renderClubCards(clubs) {
  const grid = document.getElementById("club-grid");

  if (clubs.length === 0) {
    grid.innerHTML = `
      <div class="glass card-small" style="grid-column: 1 / -1; text-align: center; padding: 40px;">
        <h3>No clubs found</h3>
        <p class="card-time">Try adjusting your search terms or category filter.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = clubs.map(club => `
    <div class="glass card-small">
      <div>
        <div class="card-header-row">
          <div class="card-avatar">${club.initials}</div>
          <span class="badge ${club.isLive ? 'badge-live' : 'badge-category'}">
            ${club.isLive ? 'Meeting Today' : club.category}
          </span>
        </div>
        <h3>${club.name}</h3>
        <div class="card-time">🕒 ${club.time}</div>
        <div class="card-desc">${club.desc}</div>
      </div>
      <div class="card-actions">
        <a href="${CONFIG.defaultFormUrl}" target="_blank" class="btn btn-primary">Sign Up</a>
        <a href="${CONFIG.calendarIcsUrl}" class="btn btn-secondary">
          <span class="material-symbols-rounded">calendar_add_on</span>
        </a>
      </div>
    </div>
  `).join('');
}
