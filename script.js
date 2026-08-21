// ==========================================
// --- GLOBAL FAB NAVIGATION LOGIC ---
// ==========================================
window.toggleFab = function() {
    const container = document.getElementById('fabContainer');
    const icon = document.getElementById('fabIcon');
    if (!container || !icon) return; 

    container.classList.toggle('active');
    
    if (container.classList.contains('active')) {
        icon.textContent = 'close';
    } else {
        icon.textContent = 'explore'; 
    }
};

document.addEventListener('click', function(event) {
    const container = document.getElementById('fabContainer');
    if (container && !container.contains(event.target) && container.classList.contains('active')) {
        window.toggleFab();
    }
});

let activeCategory = 'All';
let activeCampus = 'WV';
const wvClubFormUrl = "https://forms.cloud.microsoft/pages/responsepage.aspx?id=iuGPAuNTGkqSmD2pznHsk9KIcIjCLeNHvF6H_GifXXVUMUg3OFc2RU85V1U2R1hIQzVLU0pJN1NOWi4u&route=shorturl";

// ==========================================
// --- MASTER INITIALIZATION ENGINE ---
// ==========================================
function initializeApp() {
    // 1. Initialize System Theme
    try {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const applyTheme = (e) => {
            if (e.matches) document.body.classList.add("dark-mode");
            else document.body.classList.remove("dark-mode");
        };
        applyTheme(mediaQuery);
        if (mediaQuery.addEventListener) mediaQuery.addEventListener('change', applyTheme);
        else if (mediaQuery.addListener) mediaQuery.addListener(applyTheme); 
    } catch(e) { console.warn("Theme engine fallback:", e); }

    // 2. Wire up Start Club Button (Club Hub)
    const startClubBtn = document.getElementById("start-club-btn");
    if (startClubBtn) startClubBtn.href = wvClubFormUrl;
    
    // 3. Wire up Search & Grid (Club Hub)
    const searchInput = document.getElementById("search-input");
    const clubGrid = document.getElementById("club-grid");
    if (searchInput && clubGrid) {
        searchInput.addEventListener("input", window.filterClubs);
        window.filterClubs(); // Initial render
    }

    // 4. Initialize Barter Bazaar (if on the page)
    if (typeof window.initBarterBazaar === 'function') {
        window.initBarterBazaar();
    }
}

if (document.readyState === 'loading') {
    document.addEventListener("DOMContentLoaded", initializeApp);
} else {
    initializeApp();
}

// ==========================================
// --- CLUB HUB ENGINE ---
// ==========================================
window.switchCampus = function(campusCode, btnElement) {
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
        if (titleEl) titleEl.innerText = "West Valley Clubs";
        if (calloutBtn) {
            calloutDesc.innerHTML = "Launch your own organization. It takes less than 5 minutes to submit an official proposal to your ASG.";
            calloutBtn.href = wvClubFormUrl;
            calloutBtn.target = "_blank";
            calloutIcon.innerText = "rocket_launch";
            calloutBtnText.innerText = "Start a New Club";
        }
    } else {
        document.body.classList.add('theme-mc');
        if (titleEl) titleEl.innerText = "Mission College Clubs";
        if (calloutBtn) {
            calloutDesc.innerHTML = "Contact Yesenia Melgoza (Student Life Program Analyst) to start a new club at Mission College.<br><br><strong>📞 (408) 855-5406</strong>";
            calloutBtn.href = "mailto:yesenia.melgoza@missioncollege.edu";
            calloutBtn.target = "_self";
            calloutIcon.innerText = "mail";
            calloutBtnText.innerText = "Email Yesenia";
        }
    }
    window.filterClubs();
};

window.filterCategory = function(category, button) {
    document.querySelectorAll('.pill').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    activeCategory = category;
    window.filterClubs();
};

window.filterClubs = function() {
    const searchInput = document.getElementById("search-input");
    if (!searchInput) return; 

    const term = searchInput.value.trim().toLowerCase();
    const dataToFilter = typeof allClubsData !== 'undefined' ? allClubsData : [];

    const filtered = dataToFilter.filter(club => {
        const school = club.school || "";
        const name = club.name || "";
        const initials = club.initials || "";
        const president = club.president || "";
        const email = club.email || "";
        const professor = club.professor || "";
        const desc = club.desc || "";
        
        let rawCats = club.categories;
        let cats = Array.isArray(rawCats) ? rawCats : (typeof rawCats === 'string' ? [rawCats] : []); 

        if (school.toUpperCase() !== activeCampus) return false;
        const matchesCategory = (activeCategory === 'All' || cats.includes(activeCategory));
        if (!matchesCategory) return false;

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
};

function renderClubCards(clubs) {
    const grid = document.getElementById("club-grid");
    if (!grid) return;

    if (!clubs || clubs.length === 0) {
        grid.innerHTML = `
        <div class="glass card-small" style="grid-column: 1 / -1; text-align: center; padding: 2.5rem;">
            <h3>No clubs found</h3>
            <p class="card-contact">Try adjusting your search query or switching categories.</p>
        </div>`;
        return;
    }

    grid.innerHTML = clubs.map(club => {
        const initials = club.initials || "CLUB";
        const emailStr = club.email || "";
        const primaryEmail = emailStr.split(' ')[0] || "";
        
        const avatarHtml = club.logo 
        ? `<img src="${club.logo}" alt="${club.name || 'Club Logo'}" loading="lazy" onerror="this.style.display='none'; this.parentElement.innerText='${initials.slice(0,3)}';">`
        : initials.slice(0,3);

        let rawCats = club.categories;
        let cats = Array.isArray(rawCats) ? rawCats : (typeof rawCats === 'string' ? [rawCats] : []);
        const categoriesHtml = cats.slice(0, 3).map(cat => `<span class="badge badge-category">${cat}</span>`).join('');

        let socialsHtml = '';
        if (club.socials) {
            if (club.socials.ig) {
                const match = club.socials.ig.match(/instagram\.com\/([^/?#]+)/i);
                const igHandle = match ? `@${match[1]}` : 'Instagram';
                const igIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" style="margin-right: 6px;"><path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.036 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/></svg>`;
                socialsHtml += `<a href="${club.socials.ig}" target="_blank" class="social-link" style="display: flex; align-items: center; text-decoration: none;">${igIcon}${igHandle}</a>`;
            }
            if (club.socials.web) {
                socialsHtml += `<a href="${club.socials.web}" target="_blank" class="social-link" style="display: flex; align-items: center; text-decoration: none;"><span class="material-symbols-rounded" style="font-size: 1.125rem; margin-right: 0.375rem;">language</span>Website</a>`;
            }
        }
        const socialsBlock = socialsHtml ? `<div class="card-socials" style="display: flex; gap: 1rem; margin-top: 0.75rem; margin-bottom: 1.25rem;">${socialsHtml}</div>` : '';
        
        let actionBtnHtml = '';
        if (club.signUpForm) {
            actionBtnHtml = `<a href="${club.signUpForm}" target="_blank" class="btn btn-primary">Sign Up</a>`;
        } else if (primaryEmail) {
            actionBtnHtml = `<a href="mailto:${primaryEmail}" class="btn btn-primary">Email to Join</a>`;
        }

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
                    <div class="contact-item"><span class="material-symbols-rounded contact-icon">person</span><span><strong>President:</strong> ${club.president || 'TBA'}</span></div>
                    <div class="contact-item"><span class="material-symbols-rounded contact-icon">mail</span><a href="mailto:${primaryEmail}">${emailStr || 'No email provided'}</a></div>
                    <div class="contact-item"><span class="material-symbols-rounded contact-icon">school</span><span><strong>Advisor:</strong> ${club.professor || 'TBA'}</span></div>
                    <div class="contact-item"><span class="material-symbols-rounded contact-icon">group</span><span><strong>Members:</strong> ${club.memberCount || 'TBD'}</span></div>
                </div>
                
                <div class="card-desc">${club.desc || ''}</div>
                ${socialsBlock}
            </div>
            
            <div class="card-actions">
                ${actionBtnHtml}
            </div>
        </div>`;
    }).join('');
}

// ==========================================
// --- BARTER BAZAAR ENGINE ---
// ==========================================
const BARTER_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vT_p9Fsc15uSzA9NwUAO4Hzs2toy9FVeBohp8LQOgejqb0t_mJNKvfpKjm0YohEHaoguIpIMK2788Ii/pub?gid=651317423&single=true&output=csv";

// IMPORTANT: Replace this with your actual live Google Form link!
const BARTER_FORM_URL = "YOUR_GOOGLE_FORM_LINK_HERE"; 

let barterData = [];

window.initBarterBazaar = async function() {
    const barterGrid = document.getElementById("barter-grid");
    const barterSearch = document.getElementById("barter-search-input");
    if (!barterGrid) return; 

    try {
        const response = await fetch(BARTER_CSV_URL);
        const csvText = await response.text();
        parseAndLoadBarterData(csvText);
        
        if (barterSearch) {
            barterSearch.addEventListener("input", window.filterBarter);
        }
    } catch (error) {
        console.error("Error fetching Barter Bazaar data:", error);
        barterGrid.innerHTML = `<p style="text-align:center; width:100%; color: var(--text-sub);">Failed to load trades. Please check your connection.</p>`;
    }
};

function parseAndLoadBarterData(csvText) {
    const rows = [];
    let row = [];
    let inQuote = false;
    let val = "";
    
    for (let i = 0; i < csvText.length; i++) {
        let c = csvText[i];
        let nc = csvText[i+1];
        if (c === '"' && inQuote && nc === '"') { val += '"'; i++; } 
        else if (c === '"') { inQuote = !inQuote; }
        else if (c === ',' && !inQuote) { row.push(val); val = ""; }
        else if (c === '\n' && !inQuote) { row.push(val); rows.push(row); row = []; val = ""; }
        else if (c === '\r' && !inQuote) { /* ignore */ }
        else { val += c; }
    }
    if (val || row.length > 0) { row.push(val); rows.push(row); }

    const now = new Date();
    barterData = [];

    // Skip header row
    for (let i = 1; i < rows.length; i++) {
        const cols = rows[i];
        if (cols.length < 5) continue; 
        
        const timestamp = new Date(cols[0]);
        const campus = cols[1];
        const lookingFor = cols[2];
        const offering = cols[3];
        const email = cols[4];

        // 120-Day Expire Check
        const ageDays = (now - timestamp) / (1000 * 60 * 60 * 24);
        if (ageDays > 120) continue;

        barterData.push({ timestamp, campus, lookingFor, offering, email });
    }

    barterData.sort((a, b) => b.timestamp - a.timestamp);
    window.filterBarter();
}

window.filterBarter = function() {
    const searchInput = document.getElementById("barter-search-input");
    const term = searchInput ? searchInput.value.trim().toLowerCase() : "";

    const filtered = barterData.filter(item => {
        if (!term) return true;
        return (item.campus.toLowerCase().includes(term) ||
                item.lookingFor.toLowerCase().includes(term) ||
                item.offering.toLowerCase().includes(term));
    });

    renderBarterCards(filtered);
};

function renderBarterCards(items) {
    const grid = document.getElementById("barter-grid");
    if (!grid) return;

    const ctaCard = `
    <div class="glass card-small" style="border: 2px dashed var(--secondary-accent); display:flex; flex-direction: column; align-items:center; justify-content:center; text-align:center; background: rgba(248, 101, 22, 0.05); padding: 3rem 1.5rem;">
        <span class="material-symbols-rounded" style="font-size: 3rem; color: var(--secondary-accent); margin-bottom: 0.5rem;">add_circle</span>
        <h3 style="margin: 0 0 0.5rem; color: var(--secondary-accent);">Post a Trade</h3>
        <p style="font-size: 0.875rem; color: var(--text-sub); margin-bottom: 1.5rem;">Need a textbook or lab gear? Offer a trade to the campus community.</p>
        <a href="${BARTER_FORM_URL}" target="_blank" class="btn btn-primary" style="background: var(--secondary-accent); border: none; width: 100%;">Create Listing</a>
    </div>
    `;

    const cardsHtml = items.map(item => {
        const timeString = item.timestamp.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
        const safeLookingFor = item.lookingFor.replace(/[\n\r"]/g, ' ').substring(0, 60) + '...';
        
        const mailtoSubject = encodeURIComponent("Barter Bazaar Inquiry");
        const mailtoBody = encodeURIComponent(`Hi! I saw your post on the Student Hub Barter Bazaar regarding:\n\n"Looking For: ${safeLookingFor}"\n\nI'm interested in working out a trade!`);
        
        return `
        <div class="glass card-small">
            <div>
                <div class="card-header-row" style="margin-bottom: 1rem; align-items: center;">
                    <span class="badge badge-school">${item.campus || 'WVM'}</span>
                    <span style="font-size: 0.75rem; color: var(--text-sub); font-weight: 600;">${timeString}</span>
                </div>
                
                <div style="margin-bottom: 1.25rem;">
                    <div style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--secondary-accent); margin-bottom: 0.375rem;">Looking For</div>
                    <div style="font-size: 1.125rem; font-weight: 600; color: var(--text-main); white-space: pre-wrap; word-wrap: break-word; line-height: 1.3;">${item.lookingFor}</div>
                </div>
                
                <hr style="border: 0; height: 1px; background: var(--glass-border); width: 100%; margin: 0 0 1.25rem 0;">
                
                <div style="margin-bottom: 1.5rem;">
                    <div style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--primary-accent); margin-bottom: 0.375rem;">Willing to Trade</div>
                    <div style="font-size: 0.9375rem; color: var(--text-sub); white-space: pre-wrap; word-wrap: break-word;">${item.offering}</div>
                </div>
            </div>
            
            <div class="card-actions">
                <a href="mailto:${item.email}?subject=${mailtoSubject}&body=${mailtoBody}" class="btn btn-secondary" style="width: 100%;">
                    <span class="material-symbols-rounded" style="font-size: 1.125rem;">mail</span> Make Offer
                </a>
            </div>
        </div>
        `;
    }).join('');

    grid.innerHTML = ctaCard + cardsHtml;
}
