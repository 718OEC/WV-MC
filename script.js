let allClubsData = [];
let activeCategory = 'All';

document.addEventListener("DOMContentLoaded", () => {
  // Config Initializers
  document.getElementById("college-title").innerText = `${CONFIG.collegeName} Clubs`;
  document.getElementById("start-club-btn").href = CONFIG.startClubUrl;

  // Initialize Theme State
  initTheme();

  // Search Input Handler
  document.getElementById("search-input").addEventListener("input", (e) => {
    filterClubs(e.target.value);
  });

  // Load Complete Dataset
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

// Multi-Field Search & Filter Engine
function filterClubs(searchTerm) {
  const term = searchTerm.trim().toLowerCase();

  const filtered = allClubsData.filter(club => {
    const matchesCategory = (activeCategory === 'All' || club.category === activeCategory);
    
    const matchesSearch = !term || 
      club.name.toLowerCase().includes(term) ||
      club.initials.toLowerCase().includes(term) ||
      club.president.toLowerCase().includes(term) ||
      club.email.toLowerCase().includes(term) ||
      club.category.toLowerCase().includes(term) ||
      club.school.toLowerCase().includes(term) ||
      club.desc.toLowerCase().includes(term);

    return matchesCategory && matchesSearch;
  });

  renderClubCards(filtered);
}

// Dataset mapped directly from updated e3e03bf9.csv schema
function loadClubsData() {
  allClubsData = [
    { school: "WV", logo: "https://www.westvalley.edu/student-government/_files/images/club-logos/aapi-student-union-club-logo.jpg", name: "Asian American Pacific Islander Student Union", initials: "AAPISU", category: "Minority", president: "Hana Kim", email: "hkim720@mywvm.wvm.edu", desc: "Building community, solidarity, and cultural representation for AAPI students." },
    { school: "WV", logo: "https://www.westvalley.edu/student-government/_files/images/club-logos/alpha-gamma-sigma-club-logo.jpg", name: "Alpha Gamma Sigma Honor Society - Gamma Iota Chapter", initials: "AGSHSGIC", category: "Academics", president: "Karen Phan", email: "kphan71@mywvm.wvm.edu", desc: "Academic excellence, community service, and scholarship opportunities." },
    { school: "WV", logo: "https://www.westvalley.edu/student-government/_files/images/club-logos/architecture-club-logo.jpg", name: "Architecture Club", initials: "ARCCLUB", category: "STEM", president: "Andre Mangune", email: "amangun1@mywvm.wvm.edu", desc: "Design workshops, architectural modeling, and studio field trips." },
    { school: "WV", logo: "https://www.westvalley.edu/student-government/_files/images/club-logos/automotive-club-logo.jpg", name: "Automotive Club", initials: "AUTOCLUB", category: "STEM", president: "Sophia Cuevas", email: "scuevas9@mywvm.wvm.edu", desc: "Hands-on vehicle diagnostics, engine building, and motorsport technology." },
    { school: "WV", logo: "https://www.westvalley.edu/student-government/_files/images/club-logos/basic-needs-club-logo.jpg", name: "Basic Needs Club", initials: "BNC", category: "Community", president: "Jeshua Loza", email: "jloza7@mywvm.wvm.edu", desc: "Connecting students with food pantries, housing resources, and essential support." },
    { school: "WV", logo: "https://www.westvalley.edu/student-government/_files/images/club-logos/black-student-union-club-logo.jpg", name: "Black Student Union Club", initials: "BSUC", category: "Minority", president: "Aliya Bhrane", email: "Abrhane@mywvm.wvm.edu", desc: "Empowering Black students through cultural advocacy, leadership, and mentorship." },
    { school: "WV", logo: "https://www.westvalley.edu/student-government/_files/images/club-logos/club-logos4.jpg", name: "Conscious Intelligence Lab", initials: "CIL", category: "STEM", president: "Miwa Okumura", email: "mokumur1@mywvm.wvm.edu", desc: "Exploring neuroscience, AI ethics, cognitive science, and mindfulness." },
    { school: "WV", logo: "https://www.westvalley.edu/student-government/_files/images/club-logos/entrepreneurship-club-logo.jpg", name: "Entrepreneurship Club", initials: "ECLUB", category: "Biz", president: "Rory West", email: "rwest24@mywvm.wvm.edu", desc: "Startup pitching, business model design, and networking with founders." },
    { school: "WV", logo: "https://www.westvalley.edu/student-government/_files/images/club-logos/club-logos4.jpg", name: "Film Production Club", initials: "FPC", category: "Arts", president: "Carlos Garcia Galindo", email: "cgarc221@mywvm.wvm.edu", desc: "Cinematography, screenwriting, video editing, and student film festivals." },
    { school: "WV", logo: "https://www.westvalley.edu/student-government/_files/images/club-logos/club-logos4.jpg", name: "Financial Literacy Club", initials: "FLC", category: "Community", president: "Setayesh Pourmand", email: "spourma1@mywvm.wvm.edu", desc: "Investing basics, personal budgeting, credit building, and wealth management." },
    { school: "WV", logo: "https://www.westvalley.edu/student-government/_files/images/club-logos/club-logos4.jpg", name: "InterVarsity Christian Fellowship at West Valley", initials: "IVCF", category: "Faith", president: "Priscilla Chang", email: "pchang49@mywvm.wvm.edu", desc: "Faith-based community, group discussions, and student fellowship." },
    { school: "WV", logo: "https://www.westvalley.edu/student-government/_files/images/club-logos/lab-rats-club-logo.jpg", name: "Lab Rats", initials: "LR", category: "STEM", president: "Amalya Juhi Cherukur & Joshua Tsui-Teng", email: "acheruk1@mywvm.wvm.edu and jtsuiten@mywvm.wvm.edu", desc: "Biology, chemistry, and physics laboratory experiments and peer tutoring." },
    { school: "WV", logo: "https://www.westvalley.edu/student-government/_files/images/club-logos/club-logos4.jpg", name: "Latinx Business Student Association", initials: "LBSA", category: "Minority", president: "Francisco Alfaro", email: "falfaro5@mywvm.wvm.edu", desc: "Professional development, corporate networking, and leadership for Latinx students." },
    { school: "WV", logo: "https://www.westvalley.edu/student-government/_files/images/club-logos/club-logos4.jpg", name: "Latinx Club", initials: "LC", category: "Minority", president: "Nicolas Chechik", email: "nchechik@mywvm.wvm.edu", desc: "Celebrating Latinx culture, traditions, community service, and student unity." },
    { school: "WV", logo: "https://www.westvalley.edu/student-government/_files/images/club-logos/club-logos4.jpg", name: "Persian Club", initials: "PC", category: "Minority", president: "Parsa Forouzandeh", email: "pforouzq@mywvm.wvm.edu", desc: "Sharing Iranian culture, language, holiday celebrations, and community outreach." },
    { school: "WV", logo: "https://www.westvalley.edu/student-government/_files/images/club-logos/pickleball-club-logo.jpg", name: "Pickleball Club", initials: "PICKLE", category: "Athletics", president: "Andre Mangune", email: "amangun1@mywvm.wvm.edu", desc: "Recreational pickleball matches, skill drills, and campus tournaments." },
    { school: "WV", logo: "https://www.westvalley.edu/student-government/_files/images/club-logos/club-logos4.jpg", name: "Psi Beta Honor Society", initials: "PBHS", category: "Psych", president: "Anne Buchko", email: "abuchko@mywvm.wvm.edu", desc: "National Honor Society in Psychology for community college students." },
    { school: "WV", logo: "https://www.westvalley.edu/student-government/_files/images/club-logos/club-logos4.jpg", name: "Psychology Club", initials: "PSYC", category: "Psych", president: "Nikki Samanian", email: "nsamania@mywvm.wvm.edu", desc: "Exploring human behavior, mental health awareness, and research methods." },
    { school: "WV", logo: "https://www.westvalley.edu/student-government/_files/images/club-logos/club-logos4.jpg", name: "Science Olympiad", initials: "SCIOLY", category: "STEM", president: "Priscilla Chang", email: "pchang49@mywvm.wvm.edu", desc: "Competitive STEM tournament preparation across physics, biology, and engineering." },
    { school: "WV", logo: "https://www.westvalley.edu/student-government/_files/images/club-logos/club-logos4.jpg", name: "The Helm", initials: "HELM", category: "Journalism", president: "Lauren Yelluas", email: "lyelluas@mywvm.wvm.edu", desc: "Student journalism, campus magazine publishing, creative writing, and media." },
    { school: "WV", logo: "https://www.westvalley.edu/student-government/_files/images/club-logos/undocu-club-logo.jpg", name: "Undocumented Student Club", initials: "UNDOCU", category: "Minority", president: "Luna Pulido", email: "lpulido3@mywvm.wvm.edu", desc: "Safe space and legal/financial advocacy for undocumented students and DREAMers." },
    { school: "WV", logo: "https://www.westvalley.edu/student-government/_files/images/club-logos/club-logos4.jpg", name: "West Valley Archery", initials: "WVARCH", category: "Athletics", president: "Minjee Kim", email: "mkim183@mywvm.wvm.edu", desc: "Target archery training, equipment safety, and intercollegiate competitions." },
    { school: "WV", logo: "https://www.westvalley.edu/student-government/_files/images/club-logos/cheer-club-logo.jpg", name: "West Valley Cheer", initials: "WVCHEER", category: "Athletics", president: "Taryn Quam", email: "tquam@mywvm.wvm.edu", desc: "Stunting, choreography, spirit leadership, and athletic event performances." },
    { school: "WV", logo: "https://www.westvalley.edu/student-government/_files/images/club-logos/law-associations-club-logo.png", name: "West Valley Law Students Association", initials: "WVLSA", category: "Law", president: "Diego Segovia", email: "Dsegovi4@mywvm.wvm.edu", desc: "Pre-law guidance, mock trial practice, legal field trips, and LSAT prep resources." },
    { school: "WV", logo: "https://www.westvalley.edu/student-government/_files/images/club-logos/wvc-muslim-student-association.png", name: "West Valley Muslim Student Association", initials: "WVMSA", category: "Faith", president: "Khadija Masri", email: "wvmsa123@gmail.com", desc: "Islamic fellowship, interfaith dialogue, community service, and educational events." },
    { school: "WV", logo: "https://www.westvalley.edu/student-government/_files/images/club-logos/club-logos4.jpg", name: "Women's Film Production Club", initials: "WFPC", category: "Minority", president: "Gabrielle Ye & Allison Crick", email: "gye2@mywvm.wvm.edu and acrick@mywvm.wvm.edu", desc: "Supporting female and non-binary filmmakers through film production and workshops." }
  ];

  renderClubCards(allClubsData);
}

// Render Engine with Image Fallbacks & School Badges
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
      ? `<img src="${club.logo}" alt="${club.name}" onerror="this.style.display='none'; this.parentElement.innerText='${club.initials.slice(0,3)}';">`
      : club.initials.slice(0,3);

    const primaryEmail = club.email.split(' ')[0];

    return `
      <div class="glass card-small">
        <div>
          <div class="card-header-row">
            <div class="card-avatar">${avatarHtml}</div>
            <div class="badge-group">
              <span class="badge badge-category">${club.category}</span>
            </div>
          </div>
          <h3>${club.name}</h3>
          <div class="card-contact">
            👤 <strong>${club.president}</strong><br>
            ✉️ <a href="mailto:${primaryEmail}">${club.email}</a>
          </div>
          <div class="card-desc">${club.desc}</div>
        </div>
        <div class="card-actions">
          <a href="mailto:${primaryEmail}" class="btn btn-primary">Contact Club</a>
          <a href="${CONFIG.defaultFormUrl}" target="_blank" class="btn btn-secondary">Sign Up</a>
        </div>
      </div>
    `;
  }).join('');
}
