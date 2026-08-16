let allClubsData = [];
let activeCategory = 'All';
let activeCampus = 'WV'; // Default to West Valley

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("start-club-btn").href = CONFIG.startClubUrl;
  initTheme();
  
  document.getElementById("search-input").addEventListener("input", (e) => {
    filterClubs();
  });

  loadClubsData();
});

// Theme Logic
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

// Campus Switcher Logic using iOS Toggle
function switchCampus(campusCode, btnElement) {
  activeCampus = campusCode;
  
  // Update iOS Toggle UI
  document.querySelectorAll('.ios-toggle .toggle-opt').forEach(btn => btn.classList.remove('active'));
  btnElement.classList.add('active');

  // Update Page Title & Theme Class
  const titleEl = document.getElementById("college-title");
  if (campusCode === 'WV') {
    titleEl.innerText = "West Valley Clubs";
    document.body.classList.remove('theme-mc');
  } else {
    titleEl.innerText = "Mission College Clubs";
    document.body.classList.add('theme-mc');
  }

  // Re-filter and render
  filterClubs();
}

// Category Filter Switcher
function filterCategory(category, button) {
  document.querySelectorAll('.pill').forEach(btn => btn.classList.remove('active'));
  button.classList.add('active');
  activeCategory = category;
  filterClubs();
}

// Multi-Field Search & Filter Engine (Including Campus)
function filterClubs() {
  const searchInput = document.getElementById("search-input").value;
  const term = searchInput.trim().toLowerCase();

  const filtered = allClubsData.filter(club => {
    // 1. Check Campus match
    if (club.school !== activeCampus) return false;

    // 2. Check Category match
    const matchesCategory = (activeCategory === 'All' || club.category === activeCategory);
    if (!matchesCategory) return false;

    // 3. Check Keyword match
    const matchesSearch = !term || 
      club.name.toLowerCase().includes(term) ||
      club.initials.toLowerCase().includes(term) ||
      club.president.toLowerCase().includes(term) ||
      club.email.toLowerCase().includes(term) ||
      club.category.toLowerCase().includes(term) ||
      club.desc.toLowerCase().includes(term);

    return matchesSearch;
  });

  renderClubCards(filtered);
}

// Data Array including Mission College (MC) Sample Data
function loadClubsData() {
  allClubsData = [
    /* --- WEST VALLEY CLUBS (WV) --- */
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
    { school: "WV", logo: "https://www.westvalley.edu/student-government/_files/images/club-logos/club-logos4.jpg", name: "Women's Film Production Club", initials: "WFPC", category: "Minority", president: "Gabrielle Ye & Allison Crick", email: "gye2@mywvm.wvm.edu and acrick@mywvm.wvm.edu", desc: "Supporting female and non-binary filmmakers through film production and workshops." },
    /* --- MISSION COLLEGE CLUBS--- */
    { school: "MC", logo: "", name: "A²MEND", initials: "A2", category: "Minority", president: "Avery Taylor", email: "avery.taylor@wvm.edu", desc: "A²MEND advocates for the academic, psychological, and spiritual development of Black male students, faculty, staff, and administrators, fostering growth, support, and empowerment within the community." },
  { school: "MC", logo: "", name: "Associated Student Government", initials: "ASG", category: "Community", president: "Unnamed ", email: "mc.studentlife@missioncollege.edu", desc: "Representing the student voice and supporting campus activities" },
  { school: "MC", logo: "", name: "Dawah Club", initials: "DAWAH", category: "Faith", president: "Unnamed ", email: "Mdi.missionc@gmail.com", desc: "Dedicated to sharing Islamic knowledge, fostering spiritual growth, and promoting meaningful dialogue." },
  { school: "MC", logo: "", name: "H-Club", initials: "HCLUB", category: "Community", president: "Unnamed ", email: "MCHospitalityClub@gmail.com", desc: "Encouraging the pursuit of higher education for Hospitality students and fostering community involvement." },
  { school: "MC", logo: "", name: "Honors Research Club", initials: "HRC", category: "STEM", president: "Unnamed ", email: "honorresearchclub.mission@gmail.com", desc: "Empowers students to engage in advanced research, develop critical thinking skills, and contribute to scholarly inquiry." },
  { school: "MC", logo: "", name: "LGBTQIA+ Club", initials: "LGBTQIA+", category: "Minority", president: "Unnamed ", email: "alondra.alamo@missioncollege.edu, elizabeth.ramirez@missioncollege.edu, or brian.shively@missioncollege.edu", desc: "A supportive and inclusive club that celebrates LGBTQIA+ identities, promotes awareness, and fosters community and advocacy." },
  { school: "MC", logo: "", name: "MC Gaming Club", initials: "MCGC", category: "Hobby", president: "Unnamed ", email: "missioncollege.gaming@gmail.com", desc: "Bringing together students who love gaming and organizing friendly competitions." },
  { school: "MC", logo: "", name: "MC InterConnect", initials: "MCIC", category: "Networking", president: "Unnamed ", email: "gaozong.park@missioncollege.edu or jouney.chong@missioncollege.edu", desc: "Promoting diversity and inclusivity through dialogue and collaboration." },
  { school: "MC", logo: "", name: "Missionanigans", initials: "MSG", category: "Networking", president: "Unnamed ", email: "missionaniganstm@missioncollege.edu", desc: "Creating opportunities for communication, networking, and social events." },
  { school: "MC", logo: "", name: "Mission College Health Occupations Association", initials: "MCHOA", category: "Medical", president: "Unnamed ", email: "Tess.Johnsen@missioncollege.edu or Ngoc-Hanh.Hua@missioncollege.edu", desc: "Dedicated to supporting and empowering future healthcare professionals through education, networking, and community service." },
  { school: "MC", logo: "", name: "Muslim Student Association", initials: "MSA", category: "Faith", president: "Unnamed ", email: "Email: wvm.msa@gmail.com", desc: "A welcoming space for Muslims and Non-Muslims to learn about Islam." },
  { school: "MC", logo: "", name: "Puente Club", initials: "PUENTE", category: "Minority", president: "Unnamed ", email: "Email: javier.huerta@missioncollege.edu or veronica.hand@missioncollege.edu", desc: "Supporting students in their journey to transfer to four-year universities." },
  { school: "MC", logo: "", name: "Society of Latino Engineers and Scientists", initials: "SOLES", category: "Minority", president: "Unnamed ", email: "Email: soles.missioncollege@gmail.com", desc: "Providing leadership and professional development for Latinx engineers and scientists." },
  { school: "MC", logo: "", name: "Society of Women Engineers", initials: "MCSWE", category: "Minority", president: "Unnamed ", email: "Email: missioncollegeswe@gmail.com", desc: "Empowering future engineers and promoting careers in technology." },
  { school: "MC", logo: "", name: "Sustainable Garden Club", initials: "SGC", category: "Hobby", president: "Unnamed ", email: "Email: carla.breidenbach@missioncollege.edu", desc: "Promoting sustainability through gardening and environmental initiatives." },
  { school: "MC", logo: "", name: "Umoja Community Club", initials: "UMOJA", category: "Minority", president: "Unnamed ", email: "Email: avery.taylor@wvm.edu", desc: "Empowering students of African/African American ancestry." },
  { school: "MC", logo: "", name: "Vietnamese Student Association (VSA)", initials: "VSA", category: "Minority", president: "Unnamed ", email: "Email: mission.vsa@gmail.com", desc: "Connecting students through Vietnamese culture and heritage." },
  ];

  filterClubs();
}

// Render Engine: Initials only used as fallback in avatar
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
    // If no logo, use the first 3 letters of initials as the visual fallback
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
              <span class="badge badge-school">${club.school}</span>
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
