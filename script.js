// 1. Move the data array to the very top so it loads instantly
const allClubsData = [
  {
    school: "WV",
    logo: "https://www.westvalley.edu/student-government/_files/images/club-logos/aapi-student-union-club-logo.jpg",
    name: "Asian American Pacific Islander Student Union ",
    initials: "AAPISU",
    categories: ["Minority"],
    president: "Hana Kim",
    email: "hkim720@mywvm.wvm.edu",
    memberCount: 30,
    desc: "Full description coming soon",
    signUpForm: "Redacted",
    socials: {}
  },
  {
    school: "WV",
    logo: "https://www.westvalley.edu/student-government/_files/images/club-logos/alpha-gamma-sigma-club-logo.jpg",
    name: "Alpha Gamma Sigma Honor Society - Gamma Iota Chapter",
    initials: "AGSHSGIC",
    categories: ["Academics"],
    president: "Karen Phan",
    email: "kphan71@mywvm.wvm.edu",
    memberCount: 30,
    desc: "Full description coming soon",
    signUpForm: "Redacted",
    socials: { ig: "https://www.instagram.com/agswestvalley/?hl=en" }
  },
  {
    school: "WV",
    logo: "https://www.westvalley.edu/student-government/_files/images/club-logos/architecture-club-logo.jpg",
    name: "Architecture Club",
    initials: "ARCCLUB",
    categories: ["STEM"],
    president: "Andre Mangune",
    email: "amangun1@mywvm.wvm.edu",
    memberCount: 30,
    desc: "Full description coming soon",
    signUpForm: "Redacted",
    socials: { ig: "https://www.instagram.com/wvcarchclub" }
  },
  {
    school: "WV",
    logo: "https://www.westvalley.edu/student-government/_files/images/club-logos/automotive-club-logo.jpg",
    name: "Automotive Club",
    initials: "AUTOCLUB",
    categories: ["STEM"],
    president: "Sophia Cuevas",
    email: "scuevas9@mywvm.wvm.edu",
    memberCount: 30,
    desc: "Full description coming soon",
    signUpForm: "Redacted",
    socials: { ig: "https://www.instagram.com/wvc.automotiveclub" }
  },
  {
    school: "WV",
    logo: "https://www.westvalley.edu/student-government/_files/images/club-logos/basic-needs-club-logo.jpg",
    name: "Basic Needs Club",
    initials: "BNC",
    categories: ["Community"],
    president: "Jeshua Loza",
    email: "jloza7@mywvm.wvm.edu",
    memberCount: 30,
    desc: "Full description coming soon",
    signUpForm: "Redacted",
    socials: {}
  },
  {
    school: "WV",
    logo: "https://www.westvalley.edu/student-government/_files/images/club-logos/black-student-union-club-logo.jpg",
    name: "Black Student Union Club",
    initials: "BSUC",
    categories: ["Minority"],
    president: "Aliya Bhrane",
    email: "Abrhane@mywvm.wvm.edu",
    memberCount: 30,
    desc: "Full description coming soon",
    signUpForm: "Redacted",
    socials: { ig: "https://www.instagram.com/westvalleybsu" }
  },
  {
    school: "WV",
    logo: "https://www.westvalley.edu/student-government/_files/images/club-logos/club-logos4.jpg",
    name: "Conscious Intelligence Lab",
    initials: "CIL",
    categories: ["STEM"],
    president: "Miwa Okumura",
    email: "mokumur1@mywvm.wvm.edu",
    memberCount: 30,
    desc: "Full description coming soon",
    signUpForm: "Redacted",
    socials: {}
  },
  {
    school: "WV",
    logo: "https://www.westvalley.edu/student-government/_files/images/club-logos/entrepreneurship-club-logo.jpg",
    name: "Entrepreneurship Club",
    initials: "ECLUB",
    categories: ["Business"],
    president: "Rory West",
    email: "rwest24@mywvm.wvm.edu",
    memberCount: 30,
    desc: "Full description coming soon",
    signUpForm: "Redacted",
    socials: { ig: "https://www.instagram.com/eclubwvc" }
  },
  {
    school: "WV",
    logo: "https://www.westvalley.edu/student-government/_files/images/club-logos/club-logos4.jpg",
    name: "Film Production Club",
    initials: "FPC",
    categories: ["Arts"],
    president: "Carlos Garcia Galindo",
    email: "cgarc221@mywvm.wvm.edu",
    memberCount: 30,
    desc: "Full description coming soon",
    signUpForm: "Redacted",
    socials: { ig: "https://www.instagram.com/wvcfilmclub" }
  },
  {
    school: "WV",
    logo: "https://www.westvalley.edu/student-government/_files/images/club-logos/club-logos4.jpg",
    name: "Financial Literacy Club",
    initials: "FLC",
    categories: ["Community", "Business"],
    president: "Setayesh Pourmand",
    email: "spourma1@mywvm.wvm.edu",
    memberCount: 30,
    desc: "Full description coming soon",
    signUpForm: "Redacted",
    socials: {}
  },
  {
    school: "WV",
    logo: "https://www.westvalley.edu/student-government/_files/images/club-logos/club-logos4.jpg",
    name: "InterVarsity Christian Fellowship at West Valley",
    initials: "IVCF",
    categories: ["Faith"],
    president: "Priscilla Chang",
    email: "pchang49@mywvm.wvm.edu",
    memberCount: 30,
    desc: "Full description coming soon",
    signUpForm: "Redacted",
    socials: {}
  },
  {
    school: "WV",
    logo: "https://www.westvalley.edu/student-government/_files/images/club-logos/lab-rats-club-logo.jpg",
    name: "Lab Rats",
    initials: "LR",
    categories: ["STEM"],
    president: "Amalya Juhi Cherukur & Joshua Tsui-Teng",
    email: "acheruk1@mywvm.wvm.edu",
    memberCount: 30,
    desc: "Full description coming soon",
    signUpForm: "Redacted",
    socials: {}
  },
  {
    school: "WV",
    logo: "https://www.westvalley.edu/student-government/_files/images/club-logos/club-logos4.jpg",
    name: "Latinx Business Student Association",
    initials: "LBSA",
    categories: ["Minority", "Business"],
    president: "Francisco Alfaro",
    email: "falfaro5@mywvm.wvm.edu",
    memberCount: 30,
    desc: "Full description coming soon",
    signUpForm: "Redacted",
    socials: {}
  },
  {
    school: "WV",
    logo: "https://www.westvalley.edu/student-government/_files/images/club-logos/club-logos4.jpg",
    name: "Latinx Club",
    initials: "LC",
    categories: ["Minority"],
    president: "Nicolas Chechik",
    email: "nchechik@mywvm.wvm.edu",
    memberCount: 30,
    desc: "Full description coming soon",
    signUpForm: "Redacted",
    socials: { ig: "https://www.instagram.com/wvc_latinxclub" }
  },
  {
    school: "WV",
    logo: "https://www.westvalley.edu/student-government/_files/images/club-logos/club-logos4.jpg",
    name: "Persian Club",
    initials: "PC",
    categories: ["Minority"],
    president: "Parsa Forouzandeh",
    email: "pforouzq@mywvm.wvm.edu",
    memberCount: 30,
    desc: "Full description coming soon",
    signUpForm: "Redacted",
    socials: { ig: "https://www.instagram.com/psa_wvc" }
  },
  {
    school: "WV",
    logo: "https://www.westvalley.edu/student-government/_files/images/club-logos/pickleball-club-logo.jpg",
    name: "Pickleball Club",
    initials: "PICKLE",
    categories: ["Athletics", "Hobby"],
    president: "Andre Mangune",
    email: "amangun1@mywvm.wvm.edu",
    memberCount: 30,
    desc: "Full description coming soon",
    signUpForm: "Redacted",
    socials: {}
  },
  {
    school: "WV",
    logo: "https://www.westvalley.edu/student-government/_files/images/club-logos/club-logos4.jpg",
    name: "Psi Beta Honor Society",
    initials: "PBHS",
    categories: ["Psychology"],
    president: "Anne Buchko",
    email: "abuchko@mywvm.wvm.edu",
    memberCount: 30,
    desc: "Full description coming soon",
    signUpForm: "Redacted",
    socials: { ig: "https://www.instagram.com/psibetawvc" }
  },
  {
    school: "WV",
    logo: "https://www.westvalley.edu/student-government/_files/images/club-logos/club-logos4.jpg",
    name: "Psychology Club",
    initials: "PSYC",
    categories: ["Psychology"],
    president: "Nikki Samanian",
    email: "nsamania@mywvm.wvm.edu",
    memberCount: 30,
    desc: "Full description coming soon",
    signUpForm: "Redacted",
    socials: {}
  },
  {
    school: "WV",
    logo: "https://www.westvalley.edu/student-government/_files/images/club-logos/club-logos4.jpg",
    name: "Science Olympiad",
    initials: "SCIOLY",
    categories: ["STEM"],
    president: "Priscilla Chang",
    email: "pchang49@mywvm.wvm.edu",
    memberCount: 30,
    desc: "Full description coming soon",
    signUpForm: "Redacted",
    socials: {}
  },
  {
    school: "WV",
    logo: "https://www.westvalley.edu/student-government/_files/images/club-logos/club-logos4.jpg",
    name: "The Helm",
    initials: "HELM",
    categories: ["Journalism"],
    president: "Lauren Yelluas",
    email: "lyelluas@mywvm.wvm.edu",
    memberCount: 30,
    desc: "The student-run newspaper of West Valley College",
    signUpForm: "Redacted",
    socials: { ig: "https://www.instagram.com/thehelm.wvc" }
  },
  {
    school: "WV",
    logo: "https://www.westvalley.edu/student-government/_files/images/club-logos/undocu-club-logo.jpg",
    name: "Undocumented Student Club",
    initials: "UNDOCU",
    categories: ["Minority", "Political"],
    president: "Luna Pulido",
    email: "lpulido3@mywvm.wvm.edu",
    memberCount: 30,
    desc: "Full description coming soon",
    signUpForm: "Redacted",
    socials: { ig: "https://www.instagram.com/wvc_undocuclub" }
  },
  {
    school: "WV",
    logo: "https://www.westvalley.edu/student-government/_files/images/club-logos/club-logos4.jpg",
    name: "West Valley Archery",
    initials: "WVARCH",
    categories: ["Athletics"],
    president: "Minjee Kim",
    email: "mkim183@mywvm.wvm.edu",
    memberCount: 30,
    desc: "Full description coming soon",
    signUpForm: "Redacted",
    socials: {}
  },
  {
    school: "WV",
    logo: "https://www.westvalley.edu/student-government/_files/images/club-logos/cheer-club-logo.jpg",
    name: "West Valley Cheer",
    initials: "WVCHEER",
    categories: ["Athletics"],
    president: "Taryn Quam",
    email: "tquam@mywvm.wvm.edu",
    memberCount: 30,
    desc: "Full description coming soon",
    signUpForm: "Redacted",
    socials: { ig: "https://www.instagram.com/wvc.cheer" }
  },
  {
    school: "WV",
    logo: "https://www.westvalley.edu/student-government/_files/images/club-logos/law-associations-club-logo.png",
    name: "West Valley Law Students Association",
    initials: "WVLSA",
    categories: ["Law"],
    president: "Diego Segovia",
    email: "Dsegovi4@mywvm.wvm.edu",
    memberCount: 30,
    desc: "Full description coming soon",
    signUpForm: "Redacted",
    socials: {}
  },
  {
    school: "WV",
    logo: "https://www.westvalley.edu/student-government/_files/images/club-logos/wvc-muslim-student-association.png",
    name: "West Valley Muslim Student Association",
    initials: "WVMSA",
    categories: ["Faith"],
    president: "Khadija Masri",
    email: "wvmsa123@gmail.com",
    memberCount: 30,
    desc: "Full description coming soon",
    signUpForm: "Redacted",
    socials: {}
  },
  {
    school: "WV",
    logo: "https://www.westvalley.edu/student-government/_files/images/club-logos/club-logos4.jpg",
    name: "Women's Film Production Club",
    initials: "WFPC",
    categories: ["Minority", "Arts"],
    president: "Gabrielle Ye & Allison Crick",
    email: "gye2@mywvm.wvm.edu",
    memberCount: 30,
    desc: "Full description coming soon",
    signUpForm: "Redacted",
    socials: {}
  },
  {
    school: "MC",
    logo: null,
    name: "A²MEND",
    initials: "A2",
    categories: ["Minority"],
    president: "Avery Taylor",
    email: "avery.taylor@wvm.edu",
    memberCount: 30,
    desc: "A²MEND advocates for the academic, psychological, and spiritual development of Black male students, faculty, staff, and administrators, fostering growth, support, and empowerment within the community.",
    signUpForm: "Redacted",
    socials: {}
  },
  {
    school: "MC",
    logo: null,
    name: "Associated Student Government",
    initials: "ASG",
    categories: ["Community"],
    president: "Unnamed ",
    email: "mc.studentlife@missioncollege.edu",
    memberCount: 30,
    desc: "Representing the student voice and supporting campus activities",
    signUpForm: "Redacted",
    socials: { ig: "https://www.instagram.com/asgmissioncollege" }
  },
  {
    school: "MC",
    logo: null,
    name: "Dawah Club",
    initials: "DAWAH",
    categories: ["Faith"],
    president: "Unnamed ",
    email: "Mdi.missionc@gmail.com",
    memberCount: 30,
    desc: "Dedicated to sharing Islamic knowledge, fostering spiritual growth, and promoting meaningful dialogue.",
    signUpForm: "Redacted",
    socials: {}
  },
  {
    school: "MC",
    logo: null,
    name: "H-Club",
    initials: "HCLUB",
    categories: ["Community"],
    president: "Unnamed ",
    email: "MCHospitalityClub@gmail.com",
    memberCount: 30,
    desc: "Encouraging the pursuit of higher education for Hospitality students and fostering community involvement.",
    signUpForm: "Redacted",
    socials: {}
  },
  {
    school: "MC",
    logo: null,
    name: "Honors Research Club",
    initials: "HRC",
    categories: ["STEM"],
    president: "Unnamed ",
    email: "honorresearchclub.mission@gmail.com",
    memberCount: 30,
    desc: "Empowers students to engage in advanced research, develop critical thinking skills, and contribute to scholarly inquiry.",
    signUpForm: "Redacted",
    socials: {}
  },
  {
    school: "MC",
    logo: null,
    name: "LGBTQIA+ Club",
    initials: "LGBTQIA+",
    categories: ["Minority", "Political"],
    president: "Unnamed ",
    email: "alondra.alamo@missioncollege.edu",
    memberCount: 30,
    desc: "A supportive and inclusive club that celebrates LGBTQIA+ identities, promotes awareness, and fosters community and advocacy.",
    signUpForm: "Redacted",
    socials: { ig: "https://www.instagram.com/mc_lgbtqia" }
  },
  {
    school: "MC",
    logo: null,
    name: "MC Gaming Club",
    initials: "MCGC",
    categories: ["Hobby"],
    president: "Unnamed ",
    email: "missioncollege.gaming@gmail.com",
    memberCount: 30,
    desc: "Bringing together students who love gaming and organizing friendly competitions.",
    signUpForm: "Redacted",
    socials: { ig: "https://www.instagram.com/missioncollege.gaming" }
  },
  {
    school: "MC",
    logo: null,
    name: "MC InterConnect",
    initials: "MCIC",
    categories: ["Networking"],
    president: "Unnamed ",
    email: "gaozong.park@missioncollege.edu",
    memberCount: 30,
    desc: "Promoting diversity and inclusivity through dialogue and collaboration.",
    signUpForm: "Redacted",
    socials: { ig: "https://www.instagram.com/mc.interconnectclub" }
  },
  {
    school: "MC",
    logo: null,
    name: "Missionanigans",
    initials: "MSG",
    categories: ["Networking"],
    president: "Unnamed ",
    email: "missionaniganstm@missioncollege.edu",
    memberCount: 30,
    desc: "Creating opportunities for communication, networking, and social events.",
    signUpForm: "Redacted",
    socials: { ig: "https://www.instagram.com/missionanigans" }
  },
  {
    school: "MC",
    logo: null,
    name: "Mission College Health Occupations Association ",
    initials: "MCHOA",
    categories: ["Medical", "Pre-Pro"],
    president: "Unnamed ",
    email: "Tess.Johnsen@missioncollege.edu",
    memberCount: 30,
    desc: "Dedicated to supporting and empowering future healthcare professionals through education, networking, and community service.",
    signUpForm: "Redacted",
    socials: {}
  },
  {
    school: "MC",
    logo: null,
    name: "Muslim Student Association",
    initials: "MSA",
    categories: ["Faith"],
    president: "Unnamed ",
    email: "wvm.msa@gmail.com",
    memberCount: 30,
    desc: "A welcoming space for Muslims and Non-Muslims to learn about Islam.",
    signUpForm: "Redacted",
    socials: {}
  },
  {
    school: "MC",
    logo: null,
    name: "Puente Club",
    initials: "PUENTE",
    categories: ["Minority"],
    president: "Unnamed ",
    email: "javier.huerta@missioncollege.edu",
    memberCount: 30,
    desc: "Supporting students in their journey to transfer to four-year universities.",
    signUpForm: "Redacted",
    socials: {}
  },
  {
    school: "MC",
    logo: null,
    name: "Society of Latino Engineers and Scientists",
    initials: "SOLES",
    categories: ["Minority", "STEM"],
    president: "Unnamed ",
    email: "soles.missioncollege@gmail.com",
    memberCount: 30,
    desc: "Providing leadership and professional development for Latinx engineers and scientists.",
    signUpForm: "Redacted",
    socials: { ig: "https://www.instagram.com/mcs.o.l.e.s" }
  },
  {
    school: "MC",
    logo: null,
    name: "Society of Women Engineers",
    initials: "MCSWE",
    categories: ["Minority", "STEM"],
    president: "Unnamed",
    email: "missioncollegeswe@gmail.com",
    memberCount: 30,
    desc: "Empowering future engineers and promoting careers in technology.",
    signUpForm: "Redacted",
    socials: {}
  },
  {
    school: "MC",
    logo: null,
    name: "Sustainable Garden Club",
    initials: "SGC",
    categories: ["Hobby", "Environment"],
    president: "Unnamed ",
    email: "carla.breidenbach@missioncollege.edu",
    memberCount: 30,
    desc: "Promoting sustainability through gardening and environmental initiatives.",
    signUpForm: "Redacted",
    socials: {}
  },
  {
    school: "MC",
    logo: null,
    name: "Umoja Community Club",
    initials: "UMOJA",
    categories: ["Minority"],
    president: "Unnamed ",
    email: "avery.taylor@wvm.edu",
    memberCount: 30,
    desc: "Empowering students of African/African American ancestry.",
    signUpForm: "Redacted",
    socials: { ig: "https://www.instagram.com/umojamc" }
  },
  {
    school: "MC",
    logo: null,
    name: "Vietnamese Student Association (VSA)",
    initials: "VSA",
    categories: ["Minority"],
    president: "Unnamed ",
    email: "mission.vsa@gmail.com",
    memberCount: 30,
    desc: "Connecting students through Vietnamese culture and heritage.",
    signUpForm: "Redacted",
    socials: {}
  }
];

// 2. Set State Variables
let activeCategory = 'All';
let activeCampus = 'WV';

// 3. Initialize Everything When the Page Loads
document.addEventListener("DOMContentLoaded", () => {
  // Try mapping the default config URL, fail gracefully if config.js is missing
  try {
      document.getElementById("start-club-btn").href = CONFIG.startClubUrl;
  } catch (e) {
      console.log("Config not found, skipping button href");
  }
  
  initTheme();
  
  document.getElementById("search-input").addEventListener("input", (e) => {
    filterClubs();
  });

  // Call the filter directly instead of loadClubsData()
  filterClubs();
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
      // 1. Trigger spin-out animation safely
      if (themeIcon) themeIcon.classList.add("spin-out");

      // 2. Wait halfway through the rotation to swap icon & theme
      setTimeout(() => {
        document.body.classList.toggle("dark-mode");
        const isDark = document.body.classList.contains("dark-mode");
        localStorage.setItem("theme", isDark ? "dark" : "light");
        
        if (themeIcon) {
          themeIcon.textContent = isDark ? "light_mode" : "dark_mode";
          // 3. Reset rotation class so it spins back into view smoothly
          themeIcon.classList.remove("spin-out");
        }
      }, 200); // 200ms matches halfway through the 0.4s CSS transition
    });
  }
}
  // FAB rotate:
if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    // 1. Trigger spin-out animation
    themeIcon.classList.add("spin-out");

    // 2. Wait halfway through the rotation to swap icon & theme
    setTimeout(() => {
      document.body.classList.toggle("dark-mode");
      const isDark = document.body.classList.contains("dark-mode");
      localStorage.setItem("theme", isDark ? "dark" : "light");
      
      themeIcon.textContent = isDark ? "light_mode" : "dark_mode";
      
      // 3. Reset rotation class so it spins back into view smoothly
      themeIcon.classList.remove("spin-out");
    }, 200); // 200ms matches halfway through the 0.4s CSS transition
  });
}

// Campus Switcher Logic (2 Tabs)
function switchCampus(campusCode, btnElement) {
  activeCampus = campusCode.toUpperCase();
  
  document.querySelectorAll('.ios-toggle .toggle-opt').forEach(btn => btn.classList.remove('active'));
  btnElement.classList.add('active');

  const titleEl = document.getElementById("college-title");
  const calloutDesc = document.getElementById("callout-desc");
  const calloutBtn = document.getElementById("start-club-btn");
  const calloutIcon = document.getElementById("callout-icon");
  const calloutBtnText = document.getElementById("callout-btn-text");

  if (activeCampus === 'WV') {
    document.body.classList.remove('theme-mc');
    titleEl.innerText = "West Valley Clubs";
    
    calloutDesc.innerHTML = "Launch your own organization. It takes less than 5 minutes to submit an official proposal to your ASG.";
    try { calloutBtn.href = CONFIG.startClubUrl; } catch(e) {}
    calloutBtn.target = "_blank";
    calloutIcon.innerText = "rocket_launch";
    calloutBtnText.innerText = "Start a New Club";
    
  } else {
    document.body.classList.add('theme-mc');
    titleEl.innerText = "Mission College Clubs";

    calloutDesc.innerHTML = "Contact Yesenia Melgoza (Student Life Program Analyst) to start a new club at Mission College.<br><br><strong>📞 (408) 855-5406</strong>";
    calloutBtn.href = "mailto:yesenia.melgoza@missioncollege.edu";
    calloutBtn.target = "_self";
    calloutIcon.innerText = "mail";
    calloutBtnText.innerText = "Email Yesenia";
  }

  filterClubs();
}

function filterCategory(category, button) {
  document.querySelectorAll('.pill').forEach(btn => btn.classList.remove('active'));
  button.classList.add('active');
  activeCategory = category;
  filterClubs();
}

// Bulletproof Multi-Field Search Engine
function filterClubs() {
  const searchInput = document.getElementById("search-input").value;
  const term = searchInput.trim().toLowerCase();

  const filtered = allClubsData.filter(club => {
    // 1. Safe Fallbacks (Prevents crashes if you forget to add a field)
    const school = club.school || "";
    const name = club.name || "";
    const initials = club.initials || "";
    const president = club.president || "";
    const email = club.email || "";
    const professor = club.professor || "";
    const desc = club.desc || "";
    const cats = club.categories || []; 

    // 2. Check Campus match
    if (school.toUpperCase() !== activeCampus) return false;

    // 3. Check Category match
    const matchesCategory = (activeCategory === 'All' || cats.includes(activeCategory));
    if (!matchesCategory) return false;

    // 4. Check Keyword match
    const catSearchString = cats.join(' ').toLowerCase();
    const matchesSearch = !term || 
      name.toLowerCase().includes(term) ||
      initials.toLowerCase().includes(term) ||
      president.toLowerCase().includes(term) ||
      email.toLowerCase().includes(term) ||
      catSearchString.includes(term) ||
      professor.toLowerCase().includes(term) ||
      desc.toLowerCase().includes(term);

    return matchesSearch;
  });

  renderClubCards(filtered);
}

// Bulletproof Render Engine
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
    // Safe Property Extractions
    const initials = club.initials || "CLUB";
    const emailStr = club.email || "";
    const primaryEmail = emailStr.split(' ')[0] || "";
    
    // Fallback Logo Logic
    const avatarHtml = club.logo 
      ? `<img src="${club.logo}" alt="${club.name || 'Club Logo'}" loading="lazy" onerror="this.style.display='none'; this.parentElement.innerText='${initials.slice(0,3)}';">`
      : initials.slice(0,3);

    // Map up to 3 Categories into Badges safely
    const cats = club.categories || [];
    const categoriesHtml = cats.slice(0, 3).map(cat => `<span class="badge badge-category">${cat}</span>`).join('');

    // Generate Social Links HTML safely
    let socialsHtml = '';
    if (club.socials) {
      if (club.socials.ig) socialsHtml += `<a href="${club.socials.ig}" target="_blank" class="social-link">Instagram</a>`;
      if (club.socials.web) socialsHtml += `<a href="${club.socials.web}" target="_blank" class="social-link">Website</a>`;
    }
    const socialsBlock = socialsHtml ? `<div class="card-socials">${socialsHtml}</div>` : '';
    
    // Check config for fallback signup
    let formUrl = club.signUpForm || "#";
    try { if (!club.signUpForm) formUrl = CONFIG.defaultFormUrl; } catch(e) {}

    return `
      <div class="glass card-small">
  <div>
    <div class="card-header-row">
      <div class="card-avatar">${avatarHtml}</div>
      <div class="badge-group">
        <span class="badge badge-school">${club.school || 'WVM'}</span>
        ${categoriesHtml}
      </div>
    </div>
    <h3>${club.name || 'Unnamed Club'}</h3>
    
    <div class="card-contact">
      <div class="contact-item">
        <span class="material-symbols-rounded contact-icon">person</span>
        <span><strong>President:</strong> ${club.president || 'TBA'}</span>
      </div>
      <div class="contact-item">
        <span class="material-symbols-rounded contact-icon">mail</span>
        <a href="mailto:${primaryEmail}">${emailStr || 'No email provided'}</a>
      </div>
      <div class="contact-item">
        <span class="material-symbols-rounded contact-icon">school</span>
        <span><strong>Advisor:</strong> ${club.professor || 'TBA'}</span>
      </div>
      <div class="contact-item">
        <span class="material-symbols-rounded contact-icon">group</span>
        <span><strong>Members:</strong> ${club.memberCount || 'TBD'}</span>
      </div>
    </div>
    
    <div class="card-desc">${club.desc || ''}</div>
    ${socialsBlock}
  </div>
  
  <div class="card-actions">
    <a href="${formUrl}" target="_blank" class="btn btn-primary">Sign Up</a>
  </div>
</div>
    `;
  }).join('');
}
