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

// Populate Static Data with Official West Valley Logo URLs
function loadClubsData() {
  allClubsData = [
    { name: "Asian American Pacific Islander Student Union (AAPISU)", president: "Hana Kim", email: "hkim720@mywvm.wvm.edu", category: "Ethnic", initials: "AAPISU", logo: "https://www.westvalley.edu/student-government/_files/images/club-logos/aapi-student-union-club-logo.jpg", desc: "Description coming Soon" },,
    { name: "Alpha Gamma Sigma Honor Society - Gamma Iota Chapter", president: "Karen Phan", email: "kphan71@mywvm.wvm.edu", category: "Academics", initials: "AGSHSGI", logo: "https://www.westvalley.edu/student-government/_files/images/club-logos/alpha-gamma-sigma-club-logo.jpg", desc: "Description coming Soon" },
    { name: "Architecture Club", president: "Andre Mangune", email: "amangun1@mywvm.wvm.edu", category: "STEM", initials: "ARC", logo: "https://www.westvalley.edu/student-government/_files/images/club-logos/architecture-club-logo.jpg", desc: "Description coming Soon" },
    { name: "Automotive Club", president: "Sophia Cuevas", email: "scuevas9@mywvm.wvm.edu", category: "STEM", initials: "AUTOC", logo: "https://www.westvalley.edu/student-government/_files/images/club-logos/automotive-club-logo.jpg", desc: "Description coming Soon" },
    { name: "Basic Needs Club", president: "Jeshua Loza", email: "jloza7@mywvm.wvm.edu", category: "Community", initials: "BNC", logo: "https://www.westvalley.edu/student-government/_files/images/club-logos/basic-needs-club-logo.jpg", desc: "Description coming Soon" },
    { name: "Black Student Union Club", president: "Aliya Bhrane", email: "Abrhane@mywvm.wvm.edu", category: "Ethnic", initials: "BSU", logo: "https://www.westvalley.edu/student-government/_files/images/club-logos/black-student-union-club-logo.jpg", desc: "Description coming Soon" },
    { name: "Conscious Intelligence Lab", president: "Miwa Okumura", email: "mokumur1@mywvm.wvm.edu", category: "STEM", initials: "CIC", logo: "https://www.westvalley.edu/student-government/_files/images/club-logos/club-logos4.jpg", desc: "Description coming Soon" },
    { name: "Entrepreneurship Club", president: "Rory West", email: "rwest24@mywvm.wvm.edu", category: "Business", initials: "EC", logo: "https://www.westvalley.edu/student-government/_files/images/club-logos/entrepreneurship-club-logo.jpg", desc: "Description coming Soon" },
    { name: "Film Production Club", president: "Carlos Garcia Galindo", email: "cgarc221@mywvm.wvm.edu", category: "Arts", initials: "FPC", logo: "https://www.westvalley.edu/student-government/_files/images/club-logos/club-logos4.jpg", desc: "Description coming Soon" },
    { name: "Financial Literacy Club", president: "Setayesh Pourmand", email: "spourma1@mywvm.wvm.edu", category: "Community", initials: "FLC", logo: "https://www.westvalley.edu/student-government/_files/images/club-logos/club-logos4.jpg", desc: "Description coming Soon" },
    { name: "InterVarsity Christian Fellowship at West Valley", president: "Priscilla Chang", email: "pchang49@mywvm.wvm.edu", category: "Faith", initials: "IVCF", logo: "https://www.westvalley.edu/student-government/_files/images/club-logos/club-logos4.jpg", desc: "Description coming Soon" },
    { name: "Lab Rats", president: "Amalya Juhi Cherukur & Joshua Tsui-Teng", email: "acheruk1@mywvm.wvm.edu and jtsuiten@mywvm.wvm.edu", category: "STEM", initials: "LRC", logo: "https://www.westvalley.edu/student-government/_files/images/club-logos/lab-rats-club-logo.jpg", desc: "Description coming Soon" },
    { name: "Latinx Business Student Association", president: "Francisco Alfaro", email: "falfaro5@mywvm.wvm.edu", category: "Ethnic", initials: "LBSA", logo: "https://www.westvalley.edu/student-government/_files/images/club-logos/club-logos4.jpg", desc: "Description coming Soon" },
    { name: "Latinx Club", president: "Nicolas Chechik", email: "nchechik@mywvm.wvm.edu", category: "Ethnic", initials: "LC", logo: "https://www.westvalley.edu/student-government/_files/images/club-logos/club-logos4.jpg", desc: "Description coming Soon" },
    { name: "Persian Club", president: "Parsa Forouzandeh", email: "pforouzq@mywvm.wvm.edu", category: "Ethnic", initials: "PC", logo: "https://www.westvalley.edu/student-government/_files/images/club-logos/club-logos4.jpg", desc: "Description coming Soon" },
    { name: "Pickleball Club", president: "Andre Mangune", email: "amangun1@mywvm.wvm.edu", category: "Athletics", initials: "PC", logo: "https://www.westvalley.edu/student-government/_files/images/club-logos/pickleball-club-logo.jpg", desc: "Description coming Soon" },
    { name: "Psi Beta Honor Society", president: "Anne Buchko", email: "abuchko@mywvm.wvm.edu", category: "Major", initials: "PBHS", logo: "https://www.westvalley.edu/student-government/_files/images/club-logos/club-logos4.jpg", desc: "Description coming Soon" },
    { name: "Psychology Club", president: "Nikki Samanian", email: "nsamania@mywvm.wvm.edu", category: "Major", initials: "PC", logo: "https://www.westvalley.edu/student-government/_files/images/club-logos/club-logos4.jpg", desc: "Description coming Soon" },
    { name: "Science Olympiad", president: "Priscilla Chang", email: "pchang49@mywvm.wvm.edu", category: "STEM", initials: "SO", logo: "https://www.westvalley.edu/student-government/_files/images/club-logos/club-logos4.jpg", desc: "Description coming Soon" },
    { name: "The Helm", president: "Lauren Yelluas", email: "lyelluas@mywvm.wvm.edu", category: "Journalism", initials: "TH", logo: "https://www.westvalley.edu/student-government/_files/images/club-logos/club-logos4.jpg", desc: "Description coming Soon" },
    { name: "Undocumented Student Club", president: "Luna Pulido", email: "lpulido3@mywvm.wvm.edu", category: "Political", initials: "USC", logo: "https://www.westvalley.edu/student-government/_files/images/club-logos/undocu-club-logo.jpg", desc: "Description coming Soon" },
    { name: "West Valley Archery", president: "Minjee Kim", email: "mkim183@mywvm.wvm.edu", category: "Athletics", initials: "WVA", logo: "https://www.westvalley.edu/student-government/_files/images/club-logos/club-logos4.jpg", desc: "Description Coming Soon" },
    { name: "West Valley Cheer", president: "Taryn Quam", email: "tquam@mywvm.wvm.edu", category: "Athletics", initials: "WVCHEER", logo: "https://www.westvalley.edu/student-government/_files/images/club-logos/cheer-club-logo.jpg", desc: "Description Coming Soon" },
    { name: "West Valley Law Students Association", president: "Diego Segovia", email: "Dsegovi4@mywvm.wvm.edu", category: "Major", initials: "WVLSA", logo: "https://www.westvalley.edu/student-government/_files/images/club-logos/law-associations-club-logo.png", desc: "Description Coming Soon" },
    { name: "West Valley Muslim Student Association", president: "Khadija Masri", email: "wvmsa123@gmail.com", category: "Faith", initials: "WVMSA", logo: "https://www.westvalley.edu/student-government/_files/images/club-logos/wvc-muslim-student-association.png", desc: "Description Coming soon" },
    { name: "Women's Film Production Club", president: "Gabrielle Ye & Allison Crick", email: "gye2@mywvm.wvm.edu", category: "Arts", initials: "WFPC", logo: "https://www.westvalley.edu/student-government/_files/images/club-logos/club-logos4.jpg", desc: "Description Coming Soon" }
  ];

  renderClubCards(allClubsData);
}

// Render Engine with Image Fallbacks
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

  grid.innerHTML = clubs.map(club => {
    const avatarHtml = club.logo 
      ? `<img src="${club.logo}" alt="${club.name}" onerror="this.style.display='none'; this.parentElement.innerText='${club.initials}';">`
      : club.initials;

    return `
      <div class="glass card-small">
        <div>
          <div class="card-header-row">
            <div class="card-avatar">${avatarHtml}</div>
            <span class="badge badge-category">${club.category}</span>
          </div>
          <h3>${club.name}</h3>
          <div class="card-contact">
            👤 <strong>${club.president}</strong><br>
            ✉️ <a href="mailto:${club.email.split(' ')[0]}">${club.email}</a>
          </div>
          <div class="card-desc">${club.desc}</div>
        </div>
        <div class="card-actions">
          <a href="mailto:${club.email.split(' ')[0]}" class="btn btn-primary">Contact Club</a>
          <a href="${CONFIG.defaultFormUrl}" target="_blank" class="btn btn-secondary">Sign Up</a>
        </div>
      </div>
    `;
  }).join('');
}
