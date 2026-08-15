let allClubsData = [];
let activeCategory = 'All';

document.addEventListener("DOMContentLoaded", () => {
  // Config Initializers
  document.getElementById("college-title").innerText = `${CONFIG.collegeName} Clubs`;
  document.getElementById("start-club-btn").href = CONFIG.startClubUrl;

  // Initialize Dark Mode Toggle Button & LocalStorage State
  initTheme();

  // Real-Time Search Input Event Listener
  document.getElementById("search-input").addEventListener("input", (e) => {
    filterClubs(e.target.value);
  });

  // Load Real Club Data
  loadClubsData();
});

// Theme Logic with LocalStorage persistence
function initTheme() {
  const themeBtn = document.getElementById("theme-toggle-btn");
  const themeIcon = document.getElementById("themeIcon");

  const savedTheme = localStorage.getItem("theme");
  const systemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === "dark" || (!savedTheme && systemDark)) {
    document.body.classList.add("dark-mode");
    if (themeIcon) themeIcon.textContent = "light_mode";
  } else {
    document.body.classList.remove("dark-mode");
    if (themeIcon) themeIcon.textContent = "dark_mode";
  }

  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      const isDark = document.body.classList.contains("dark-mode");
      localStorage.setItem("theme", isDark ? "dark" : "light");
      if (themeIcon) themeIcon.textContent = isDark ? "light_mode" : "dark_mode";
    });
  }
}

// Category Filter Switcher
function filterCategory(category, button) {
  document.querySelectorAll('.pill').forEach(btn => btn.classList.remove('active'));
  button.classList.add('active');
  activeCategory = category;
  
  const searchVal = document.getElementById("search-input").value;
  filterClubs(searchVal);
}

// Search & Filter Engine
function filterClubs(searchTerm) {
  const term = searchTerm.trim().toLowerCase();

  const filtered = allClubsData.filter(club => {
    const matchesCategory = (activeCategory === 'All' || club.category === activeCategory);
    
    const matchesSearch = !term || 
      club.name.toLowerCase().includes(term) ||
      club.president.toLowerCase().includes(term) ||
      club.email.toLowerCase().includes(term) ||
      club.category.toLowerCase().includes(term) ||
      club.desc.toLowerCase().includes(term);

    return matchesCategory && matchesSearch;
  });

  renderClubCards(filtered);
}

// Populate Real Data from WVC_Clubs.csv
function loadClubsData() {
  allClubsData = [
    { name: "Asian American Pacific Islander Student Union (AAPISU)", president: "Hana Kim", email: "hkim720@mywvm.wvm.edu", category: "Special Interest", initials: "AA", desc: "Building community and representation for AAPI students at West Valley." },
    { name: "Alpha Gamma Sigma Honor Society - Gamma Iota Chapter", president: "Karen Phan", email: "kphan71@mywvm.wvm.edu", category: "Honors", initials: "AG", desc: "Academic excellence, community service, and scholarship opportunities." },
    { name: "Architecture Club", president: "Andre Mangune", email: "amangun1@mywvm.wvm.edu", category: "STEM", initials: "AR", desc: "Design workshops, architectural modeling, and studio field trips." },
    { name: "Automotive Club", president: "Sophia Cuevas", email: "scuevas9@mywvm.wvm.edu", category: "STEM", initials: "AU", desc: "Hands-on vehicle diagnostics, engine building, and motorsport technology." },
    { name: "Basic Needs Club", president: "Jeshua Loza", email: "jloza7@mywvm.wvm.edu", category: "Special Interest", initials: "BN", desc: "Connecting students with food pantries, housing resources, and essential support." },
    { name: "Black Student Union Club", president: "Aliya Bhrane", email: "Abrhane@mywvm.wvm.edu", category: "Special Interest", initials: "BS", desc: "Empowering Black students through cultural advocacy, leadership, and mentorship." },
    { name: "Conscious Intelligence Lab", president: "Miwa Okumura", email: "mokumur1@mywvm.wvm.edu", category: "STEM", initials: "CI", desc: "Exploring neuroscience, AI ethics, cognitive science, and mindfulness." },
    { name: "Entrepreneurship Club", president: "ASB / Student Life", email: "wvc.asb@wvm.edu", category: "Business", initials: "EC", desc: "Startup pitching, business model design, and networking with Silicon Valley founders." },
    { name: "Film Production Club", president: "Carlos Garcia Galindo", email: "cgarc221@mywvm.wvm.edu", category: "Arts", initials: "FP", desc: "Cinematography, screenwriting, video editing, and student film festivals." },
    { name: "Financial Literacy Club", president: "Setayesh Pourmand", email: "spourma1@mywvm.wvm.edu", category: "Business", initials: "FL", desc: "Investing basics, personal budgeting, credit building, and wealth management." },
    { name: "InterVarsity Christian Fellowship at West Valley", president: "Priscilla Chang", email: "pchang49@mywvm.wvm.edu", category: "Special Interest", initials: "IV", desc: "Faith-based community, group discussions, and student fellowship." },
    { name: "Lab Rats", president: "Amalya Juhi Cherukur & Joshua Tsui-Teng", email: "acheruk1@mywvm.wvm.edu", category: "STEM", initials: "LR", desc: "Biology, chemistry, and physics laboratory experiments and peer tutoring." },
    { name: "Latinx Business Student Association", president: "Francisco Alfaro", email: "falfaro5@mywvm.wvm.edu", category: "Business", initials: "LB", desc: "Professional development, corporate networking, and leadership for Latinx students." },
    { name: "Latinx Club", president: "Nicolas Chechik", email: "nchechik@mywvm.wvm.edu", category: "Special Interest", initials: "LC", desc: "Celebrating Latinx culture, traditions, community service, and student unity." },
    { name: "Persian Club", president: "Parsa Forouzandeh", email: "pforouzq@mywvm.wvm.edu", category: "Special Interest", initials: "PC", desc: "Sharing Iranian culture, language, holiday celebrations, and community outreach." },
    { name: "Pickleball Club", president: "Andre Mangune", email: "amangun1@mywvm.wvm.edu", category: "Special Interest", initials: "PB", desc: "Recreational pickleball matches, skill drills, and campus tournaments." },
    { name: "Psi Beta Honor Society", president: "Anne Buchko", email: "abuchko@mywvm.wvm.edu", category: "Honors", initials: "PB", desc: "National Honor Society in Psychology for community college students." },
    { name: "Psychology Club", president: "Nikki Samanian", email: "nsamania@mywvm.wvm.edu", category: "Honors", initials: "PY", desc: "Exploring human behavior, mental health awareness, and research methods." },
    { name: "Science Olympiad", president: "Priscilla Chang", email: "pchang49@mywvm.wvm.edu", category: "STEM", initials: "SO", desc: "Competitive STEM tournament preparation across physics, biology, and engineering." },
    { name: "The Helm", president: "Lauren Yelluas", email: "lyelluas@mywvm.wvm.edu", category: "Arts", initials: "TH", desc: "Student journalism, campus magazine publishing, creative writing, and media." },
    { name: "Undocumented Student Club", president: "Luna Pulido", email: "lpulido3@mywvm.wvm.edu", category: "Special Interest", initials: "US", desc: "Safe space and legal/financial advocacy for undocumented students and DREAMers." },
    { name: "West Valley Archery", president: "Minjee Kim", email: "mkim183@mywvm.wvm.edu", category: "Special Interest", initials: "WA", desc: "Target archery training, equipment safety, and intercollegiate competitions." },
    { name: "West Valley Cheer", president: "Taryn Quam", email: "tquam@mywvm.wvm.edu", category: "Special Interest", initials: "WC", desc: "Stunting, choreography, spirit leadership, and athletic event performances." },
    { name: "West Valley Law Students Association", president: "Diego Segovia", email: "Dsegovi4@mywvm.wvm.edu", category: "Honors", initials: "WL", desc: "Pre-law guidance, mock trial practice, legal field trips, and LSAT prep resources." },
    { name: "West Valley Muslim Student Association", president: "Khadija Masri", email: "wvmsa123@gmail.com", category: "Special Interest", initials: "MS", desc: "Islamic fellowship, interfaith dialogue, community service, and educational events." },
    { name: "Women's Film Production Club", president: "Gabrielle Ye & Allison Crick", email: "gye2@mywvm.wvm.edu", category: "Arts", initials: "WF", desc: "Supporting female and non-binary filmmakers through film production and workshops." }
  ];

  renderClubCards(allClubsData);
}

// Render Engine
function renderClubCards(clubs) {
  const grid = document.getElementById("club-grid");

  if (clubs.length === 0) {
    grid.innerHTML = `
      <div class="glass card-small" style="grid-column: 1 / -1; text-align: center; padding: 40px;">
        <h3>No clubs found</h3>
        <p class="card-contact">Try adjusting your search query or switching categories.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = clubs.map(club => `
    <div class="glass card-small">
      <div>
        <div class="card-header-row">
          <div class="card-avatar">${club.initials}</div>
          <span class="badge badge-category">${club.category}</span>
        </div>
        <h3>${club.name}</h3>
        <div class="card-contact">
          👤 <strong>${club.president}</strong><br>
          ✉️ <a href="mailto:${club.email}">${club.email}</a>
        </div>
        <div class="card-desc">${club.desc}</div>
      </div>
      <div class="card-actions">
        <a href="mailto:${club.email}" class="btn btn-primary">Contact Club</a>
        <a href="${CONFIG.defaultFormUrl}" target="_blank" class="btn btn-secondary">Sign Up</a>
      </div>
    </div>
  `).join('');
}
