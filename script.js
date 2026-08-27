// ==========================================
// --- SHARED HELPER FUNCTIONS ---
// ==========================================

// Optimized Master CSV Parser (Used by Barter, Carpool, and Transfer engines)
function parseCSVToArray(csvText) {
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
    return rows;
}


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


// ==========================================
// --- MASTER INITIALIZATION ENGINE ---
// ==========================================
let activeCategory = 'All';
let activeCampus = 'All'; 
const wvClubFormUrl = "https://forms.cloud.microsoft/pages/responsepage.aspx?id=iuGPAuNTGkqSmD2pznHsk9KIcIjCLeNHvF6H_GifXXVUMUg3OFc2RU85V1U2R1hIQzVLU0pJN1NOWi4u&route=shorturl";

function initializeApp() {
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

    const startClubBtn = document.getElementById("start-club-btn");
    if (startClubBtn) startClubBtn.href = wvClubFormUrl;
    
    const searchInput = document.getElementById("search-input");
    const clubGrid = document.getElementById("club-grid");
    if (searchInput && clubGrid) {
        searchInput.addEventListener("input", window.filterClubs);
        window.filterClubs(); 
    }

    if (typeof window.initClubHub === 'function') window.initClubHub();
    if (typeof window.initBarterBazaar === 'function') window.initBarterBazaar();
    if (typeof window.initCarpoolTool === 'function') window.initCarpoolTool();
    if (typeof window.initTransferTools === 'function') window.initTransferTools();
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
window.filterCampus = function(campus, button) {
    document.querySelectorAll('#campus-pills .pill').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    activeCampus = campus;
    window.filterClubs();
};

window.filterCategory = function(category, button) {
    document.querySelectorAll('#category-pills .pill').forEach(btn => btn.classList.remove('active'));
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
        const name = club.name || "";
        const initials = club.initials || "";
        const president = club.president || "";
        const email = club.email || "";
        const professor = club.professor || "";
        const desc = club.desc || "";
        const school = club.school || ""; 
        
        let rawCats = club.categories;
        let cats = Array.isArray(rawCats) ? rawCats : (typeof rawCats === 'string' ? [rawCats] : []); 

        if (activeCampus !== 'All' && school.toUpperCase() !== activeCampus) return false;
        if (activeCategory !== 'All' && !cats.includes(activeCategory)) return false;

        const catSearchString = cats.join(' ').toLowerCase();
        return !term || 
        name.toLowerCase().includes(term) ||
        initials.toLowerCase().includes(term) ||
        president.toLowerCase().includes(term) ||
        email.toLowerCase().includes(term) ||
        catSearchString.includes(term) ||
        professor.toLowerCase().includes(term) ||
        desc.toLowerCase().includes(term) ||
        school.toLowerCase().includes(term);
    });

    filtered.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    renderClubCards(filtered);
};

function renderClubCards(clubs) {
    const grid = document.getElementById("club-grid");
    if (!grid) return;

    const unifiedCtaHtml = `
    <div class="glass card-small" style="border: 2px dashed var(--secondary-accent); padding: 1.5rem; display: flex; flex-direction: column; gap: 1.25rem;">
        <div style="text-align: center;">
            <span class="material-symbols-rounded" style="font-size: 2.5rem; color: var(--secondary-accent); margin-bottom: 0.25rem;">add_circle</span>
            <h3 style="margin: 0; color: var(--secondary-accent); font-size: 1.25rem;">Start a New Club</h3>
            <p style="font-size: 0.875rem; color: var(--text-sub); margin-top: 0.25rem; margin-bottom: 0;">Can't find your community? Launch your own organization.</p>
        </div>
        <div style="background: var(--toggle-bg); padding: 1.25rem; border-radius: 12px; border: 2px solid var(--wvc-blue-light);">
            <div style="font-weight: 700; font-size: 0.9375rem; color: var(--text-main); margin-bottom: 0.75rem;">West Valley College</div>
            <a href="${wvClubFormUrl}" target="_blank" class="btn" style="background: var(--secondary-accent); color: #FFFFFF; width: 100%; padding: 0.625rem; font-size: 0.8125rem; border: none;">Submit ASG Proposal</a>
        </div>
        <div style="background: var(--toggle-bg); padding: 1.25rem; border-radius: 12px; border: 2px solid rgba(12, 119, 153, 0.4);">
            <div style="font-weight: 700; font-size: 0.9375rem; color: var(--text-main); margin-bottom: 0.25rem;">Mission College</div>
            <div style="font-size: 0.75rem; color: var(--text-sub); margin-bottom: 0.75rem;">Contact Yesenia Melgoza (Student Life)</div>
            <div style="display: flex; gap: 0.5rem;">
                <a href="mailto:yesenia.melgoza@missioncollege.edu" class="btn btn-secondary" style="flex: 1; padding: 0.625rem; font-size: 0.8125rem; border-color: rgba(12, 119, 153, 0.4);"><span class="material-symbols-rounded" style="font-size: 1rem;">mail</span> Email</a>
                <a href="tel:4088555406" class="btn btn-secondary" style="flex: 1; padding: 0.625rem; font-size: 0.8125rem; border-color: rgba(12, 119, 153, 0.4);"><span class="material-symbols-rounded" style="font-size: 1rem;">call</span> Call</a>
            </div>
        </div>
    </div>
    `;

    if (!clubs || clubs.length === 0) {
        grid.innerHTML = unifiedCtaHtml + `
        <div class="glass card-small" style="grid-column: 1 / -1; text-align: center; padding: 2.5rem;">
            <h3>No clubs found</h3>
            <p class="card-contact">Try adjusting your search query or switching categories.</p>
        </div>`;
        return;
    }

    const cardsHtml = clubs.map(club => {
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

        const isMC = club.school === 'MC' || club.school === 'Mission';

        return `
        <div class="glass card-small ${isMC ? 'theme-mc' : ''}">
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
            <div class="card-actions">${actionBtnHtml}</div>
        </div>`;
    }).join('');

    grid.innerHTML = unifiedCtaHtml + cardsHtml;
}


// ==========================================
// --- BARTER BAZAAR ENGINE ---
// ==========================================
const BARTER_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRh3mYvd6WBAy6gsPyMpmM_DjbnVx0cyZ0QigUxgP6n_jOsJ9FWLc7alNvcLJrRVd06Imp11VAgJkox/pub?output=csv";
const BARTER_FORM_URL = "https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=iuGPAuNTGkqSmD2pznHsk5knvlMprIFFhStOR1s7mZhUOUhIRUg0ODBXMEg4VVJLNUwyVTIyWjM0Qy4u"; 

let barterData = [];

window.initBarterBazaar = async function() {
    const barterGrid = document.getElementById("barter-grid");
    const barterSearch = document.getElementById("barter-search-input");
    if (!barterGrid) return; 

    try {
        const response = await fetch(BARTER_CSV_URL);
        const csvText = await response.text();
        const rows = parseCSVToArray(csvText); 
        
        const now = new Date();
        barterData = [];

        for (let i = 1; i < rows.length; i++) {
            const cols = rows[i];
            if (cols.length < 5) continue; 
            
            const timestamp = new Date(cols[0]);
            const email = cols[1] || "";        
            const campus = cols[2] || "WV";     
            const lookingFor = cols[3] || "";   
            const offering = cols[4] || "";     
            
            if ((now - timestamp) / (1000 * 60 * 60 * 24) > 120) continue;

            barterData.push({ timestamp, campus, lookingFor, offering, email });
        }

        barterData.sort((a, b) => b.timestamp - a.timestamp);
        window.filterBarter();
        
        if (barterSearch) barterSearch.addEventListener("input", window.filterBarter);
    } catch (error) {
        console.error("Error fetching Barter Bazaar data:", error);
        barterGrid.innerHTML = `<p style="text-align:center; width:100%; color: var(--text-sub);">Failed to load trades. Please check your connection.</p>`;
    }
};

window.filterBarter = function() {
    const searchInput = document.getElementById("barter-search-input");
    const term = searchInput ? searchInput.value.trim().toLowerCase() : "";

    const filtered = barterData.filter(item => {
        if (!term) return true;
        return (item.campus.toLowerCase().includes(term) || item.lookingFor.toLowerCase().includes(term) || item.offering.toLowerCase().includes(term));
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
        
        const mailtoSubject = encodeURIComponent("Barter Bazaar Trade");
        const mailtoBody = encodeURIComponent(`Hi! I'm interested in trading with you:\n\n"Looking For: ${safeLookingFor}"\n\nI have ___`);
        
        let campusBadgesHtml = '';
        const cStr = item.campus.toLowerCase();
        
        if (cStr.includes('both')) {
            campusBadgesHtml = `<span class="badge" style="background: var(--wvc-blue); color: #FFFFFF;">WV</span><span class="badge" style="background: var(--mc-teal); color: #FFFFFF;">MC</span>`;
        } else if (cStr.includes('mission') || cStr.includes('mc')) {
            campusBadgesHtml = `<span class="badge" style="background: var(--mc-teal); color: #FFFFFF;">MC</span>`;
        } else {
            campusBadgesHtml = `<span class="badge" style="background: var(--wvc-blue); color: #FFFFFF;">WV</span>`;
        }

        const isMC = !cStr.includes('both') && (cStr.includes('mission') || cStr.includes('mc'));
        
        return `
        <div class="glass card-small ${isMC ? 'theme-mc' : ''}">
            <div>
                <div class="card-header-row" style="margin-bottom: 1rem; align-items: center;">
                    <div style="display: flex; gap: 4px;">${campusBadgesHtml}</div>
                    <span style="font-size: 0.75rem; color: var(--text-sub); font-weight: 600;">${timeString}</span>
                </div>
                
                <div style="margin-bottom: 1.25rem;">
                    <div style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--secondary-accent); margin-bottom: 0.375rem;">Looking For</div>
                    <div style="font-size: 1.125rem; font-weight: 600; color: var(--text-main); white-space: pre-wrap; word-wrap: break-word; line-height: 1.3;">${item.lookingFor}</div>
                </div>
                
                <hr style="border: 0; height: 1px; background: var(--glass-border); width: 100%; margin: 0 0 1.25rem 0;">
                
                <div style="margin-bottom: 1.5rem;">
                    <div style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--text-sub); margin-bottom: 0.375rem;">Willing to Trade</div>
                    <div style="font-size: 0.9375rem; color: var(--text-sub); white-space: pre-wrap; word-wrap: break-word;">${item.offering}</div>
                </div>
            </div>
            
            <div class="card-actions">
                <a href="mailto:${item.email}?subject=${mailtoSubject}&body=${mailtoBody}" class="btn btn-primary" style="width: 100%;">
                    <span class="material-symbols-rounded" style="font-size: 1.125rem;">mail</span> Start Trade
                </a>
            </div>
        </div>
        `;
    }).join('');

    grid.innerHTML = ctaCard + cardsHtml;
}
// ==========================================
// --- CARPOOL TOOL ENGINE ---
// ==========================================
const CARPOOL_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRGSOOpXC8NcawdRxKd4bHDhYywxrl6l1EnkjaX0RpPCHSC9BuNIFjXhU_PeNgiCFm5oDNak5nHbQxM/pub?output=csv";
const CARPOOL_FORM_URL = "https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=iuGPAuNTGkqSmD2pznHsk5knvlMprIFFhStOR1s7mZhURFJQRjI4MTRaRTg0OEVKT1dWTDEwWjcwVS4u"; 

let carpoolData = [];
let activeCarpoolCampus = 'All';
let activeCarpoolRole = 'All';

window.initCarpoolTool = async function() {
    const grid = document.getElementById("carpool-grid");
    const searchInput = document.getElementById("carpool-search-input");
    if (!grid) return; 

    try {
        const response = await fetch(CARPOOL_CSV_URL);
        const csvText = await response.text();
        const rows = parseCSVToArray(csvText); 
        
        const now = new Date();
        carpoolData = [];

        // Spreadsheet Column Mapping:
        // A [0] intake ID
        // B [1] Timestamp
        // D [3] Email
        // F [5] Campus
        // G [6] City
        // H [7] Zip
        // I [8] Role
        // J [9] Days
        // K [10] Arrival
        // L [11] Departure
        for (let i = 1; i < rows.length; i++) {
            const cols = rows[i];
            if (cols.length < 12) continue; // Ensures row has enough columns up to L
            
            const timestamp = new Date(cols[1]);
            const email = cols[3] || "";        
            const campus = cols[5] || "WV";     
            const city = cols[6] || "";   
            const zip = cols[7] || "";     
            const role = cols[8] || "";     
            const days = cols[9] || "";     
            const arrive = (cols[10] || "").split(';').map(s => s.trim()).filter(s => s).join(', ');     
            const leave = (cols[11] || "").split(';').map(s => s.trim()).filter(s => s).join(', ');  
            
            if ((now - timestamp) / (1000 * 60 * 60 * 24) > 120) continue;

            carpoolData.push({ timestamp, email, campus, city, zip, role, days, arrive, leave });
        }

        carpoolData.sort((a, b) => b.timestamp - a.timestamp);
        window.filterCarpools();
        
        if (searchInput) searchInput.addEventListener("input", window.filterCarpools);
    } catch (error) {
        console.error("Error fetching Carpool data:", error);
        grid.innerHTML = `<p style="text-align:center; width:100%; color: var(--text-sub);">Failed to load carpools. Ensure your CSV link is correct.</p>`;
    }
};

window.filterCarpoolCampus = function(campus, button) {
    document.querySelectorAll('#carpool-campus-pills .pill').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    activeCarpoolCampus = campus;
    window.filterCarpools();
};

window.filterCarpoolRole = function(role, button) {
    document.querySelectorAll('#carpool-role-pills .pill').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    activeCarpoolRole = role;
    window.filterCarpools();
};

window.filterCarpools = function() {
    const searchInput = document.getElementById("carpool-search-input");
    const term = searchInput ? searchInput.value.trim().toLowerCase() : "";

    const filtered = carpoolData.filter(item => {
        const cStr = item.campus.toLowerCase();
        
        let matchesCampus = false;
        if (activeCarpoolCampus === 'All') matchesCampus = true;
        else if (activeCarpoolCampus === 'WV' && (cStr.includes('west valley') || cStr.includes('both'))) matchesCampus = true;
        else if (activeCarpoolCampus === 'MC' && (cStr.includes('mission') || cStr.includes('mc') || cStr.includes('both'))) matchesCampus = true;
        if (!matchesCampus) return false;

        if (activeCarpoolRole !== 'All' && !item.role.includes(activeCarpoolRole)) return false;
        if (term && !item.city.toLowerCase().includes(term) && !item.zip.toLowerCase().includes(term)) return false;

        return true;
    });

    renderCarpoolCards(filtered);
};

function renderCarpoolCards(items) {
    const grid = document.getElementById("carpool-grid");
    if (!grid) return;

    const ctaCard = `
    <div class="glass card-small" style="border: 2px dashed var(--secondary-accent); padding: 2rem 1.5rem; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; gap: 1rem;">
        <span class="material-symbols-rounded" style="font-size: 3rem; color: var(--secondary-accent);">directions_car</span>
        <div>
            <h3 style="margin: 0 0 0.5rem; color: var(--secondary-accent);">Join the Carpool</h3>
            <p style="font-size: 0.875rem; color: var(--text-sub); margin: 0;">Save gas, split costs, and meet fellow students. Offer a ride or request a seat today.</p>
        </div>
        <a href="${CARPOOL_FORM_URL}" target="_blank" class="btn btn-primary" style="width: 100%; margin-top: 0.5rem;">Create Listing</a>
    </div>
    `;

    const demoCard = `
    <div class="glass card-small" style="position: relative; border: 2px dashed rgba(248, 101, 22, 0.4);">
        <div style="position: absolute; top: -12px; right: 24px; background: var(--secondary-accent); color: white; padding: 4px 12px; border-radius: 99px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; box-shadow: 0 4px 12px rgba(248, 101, 22, 0.3);">
            Example Post
        </div>
        <div>
            <div class="card-header-row" style="margin-bottom: 1.25rem;">
                <div style="flex: 1;">
                    <div style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--secondary-accent); margin-bottom: 0.25rem;">Driver</div>
                    <h3 style="margin: 0; font-size: 1.5rem;">San Jose</h3>
                    <div style="font-size: 0.875rem; color: var(--text-sub); font-weight: 600;">ZIP: 95128</div>
                </div>
                
                <div class="card-avatar" style="width: 64px; height: 55.5px; background: var(--secondary-accent);">
                    <span class="material-symbols-rounded" style="font-size: 1.75rem; color: #FFF;">local_taxi</span>
                </div>
            </div>
            
            <hr style="border: 0; height: 1px; background: var(--glass-border); margin: 0 0 1rem 0;">
            
            <div style="display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1.5rem;">
                <div>
                    <div style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--text-sub);">Campus</div>
                    <div style="display: flex; gap: 4px; margin-top: 0.25rem;">
                        <span class="badge" style="background: var(--wvc-blue); color: #FFFFFF;">WV</span>
                        <span class="badge" style="background: var(--mc-teal); color: #FFFFFF;">MC</span>
                    </div>
                </div>
                
                <div>
                    <div style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--text-sub);">Active Days</div>
                    <div style="display: flex; gap: 4px; margin-top: 0.5rem;">
                        <div style="width: 24px; height: 24px; border-radius: 50%; background: var(--toggle-bg); color: var(--text-sub); border: 1px solid var(--glass-border); display: flex; align-items: center; justify-content: center; font-size: 0.65rem; font-weight: 700;">S</div>
                        <div style="width: 24px; height: 24px; border-radius: 50%; background: var(--secondary-accent); color: #FFF; border: none; display: flex; align-items: center; justify-content: center; font-size: 0.65rem; font-weight: 700;">M</div>
                        <div style="width: 24px; height: 24px; border-radius: 50%; background: var(--toggle-bg); color: var(--text-sub); border: 1px solid var(--glass-border); display: flex; align-items: center; justify-content: center; font-size: 0.65rem; font-weight: 700;">T</div>
                        <div style="width: 24px; height: 24px; border-radius: 50%; background: var(--secondary-accent); color: #FFF; border: none; display: flex; align-items: center; justify-content: center; font-size: 0.65rem; font-weight: 700;">W</div>
                        <div style="width: 24px; height: 24px; border-radius: 50%; background: var(--toggle-bg); color: var(--text-sub); border: 1px solid var(--glass-border); display: flex; align-items: center; justify-content: center; font-size: 0.65rem; font-weight: 700;">T</div>
                        <div style="width: 24px; height: 24px; border-radius: 50%; background: var(--toggle-bg); color: var(--text-sub); border: 1px solid var(--glass-border); display: flex; align-items: center; justify-content: center; font-size: 0.65rem; font-weight: 700;">F</div>
                        <div style="width: 24px; height: 24px; border-radius: 50%; background: var(--toggle-bg); color: var(--text-sub); border: 1px solid var(--glass-border); display: flex; align-items: center; justify-content: center; font-size: 0.65rem; font-weight: 700;">S</div>
                    </div>
                </div>

                <div style="display: flex; gap: 1rem; margin-top: 0.25rem;">
                    <div style="flex: 1;">
                        <div style="font-size: 0.75rem; font-weight: 700; color: var(--text-sub);">Arrive</div>
                        <div style="font-size: 0.875rem; font-weight: 600; color: var(--text-main);">Mornings</div>
                    </div>
                    <div style="flex: 1;">
                        <div style="font-size: 0.75rem; font-weight: 700; color: var(--text-sub);">Leave</div>
                        <div style="font-size: 0.875rem; font-weight: 600; color: var(--text-main);">Afternoons</div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="card-actions" style="align-items: center; justify-content: space-between;">
            <span style="font-size: 0.75rem; color: var(--text-sub); font-weight: 600;">Posted: Just now</span>
            <button class="btn" style="background: var(--toggle-bg); color: var(--text-sub); padding: 0.5rem 1rem; cursor: not-allowed; border: 1px solid var(--glass-border);">
                <span class="material-symbols-rounded" style="font-size: 1.125rem;">block</span> Demo Only
            </button>
        </div>
    </div>
    `;

    const cardsHtml = items.map(item => {
        const timeString = item.timestamp.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
        const isDriver = item.role.toLowerCase().includes('driver');
        
        let campusBadgesHtml = '';
        const cStr = item.campus.toLowerCase();
        if (cStr.includes('both')) {
            campusBadgesHtml = `<span class="badge" style="background: var(--wvc-blue); color: #FFFFFF;">WV</span><span class="badge" style="background: var(--mc-teal); color: #FFFFFF;">MC</span>`;
        } else if (cStr.includes('mission') || cStr.includes('mc')) {
            campusBadgesHtml = `<span class="badge" style="background: var(--mc-teal); color: #FFFFFF;">MC</span>`;
        } else {
            campusBadgesHtml = `<span class="badge" style="background: var(--wvc-blue); color: #FFFFFF;">WV</span>`;
        }

        const roleColor = isDriver ? 'var(--secondary-accent)' : 'var(--wvc-blue)';
        const roleIcon = isDriver ? 'local_taxi' : 'hail';
        const roleText = isDriver ? 'Driver' : 'Rider';

        const dayMap = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const dayLetters = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
        let scheduleHtml = `<div style="display: flex; gap: 4px; margin-top: 0.5rem;">`;
        
        for (let i = 0; i < 7; i++) {
            const isActive = item.days.includes(dayMap[i]) || item.days.includes(dayMap[i] + 'day');
            const bg = isActive ? roleColor : 'var(--toggle-bg)';
            const color = isActive ? '#FFF' : 'var(--text-sub)';
            const border = isActive ? 'none' : '1px solid var(--glass-border)';
            
            scheduleHtml += `<div style="width: 24px; height: 24px; border-radius: 50%; background: ${bg}; color: ${color}; border: ${border}; display: flex; align-items: center; justify-content: center; font-size: 0.65rem; font-weight: 700;">${dayLetters[i]}</div>`;
        }
        scheduleHtml += `</div>`;

        const mailAction = isDriver ? "Request a Ride" : "Offer a Ride";
        const mailSubject = encodeURIComponent(`Carpool Tool: ${roleText} to ${item.campus}`);
        const mailBody = encodeURIComponent(`Hi! I saw your post on the WVM Carpool Tool.\n\nI'm reaching out about your commute to/from ${item.city} (${item.zip}).\n\nLet's chat!`);

        const isMC = !cStr.includes('both') && (cStr.includes('mission') || cStr.includes('mc'));

        return `
        <div class="glass card-small ${isMC ? 'theme-mc' : ''}">
            <div>
                <div class="card-header-row" style="margin-bottom: 1.25rem;">
                    <div style="flex: 1;">
                        <div style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: ${roleColor}; margin-bottom: 0.25rem;">${roleText}</div>
                        <h3 style="margin: 0; font-size: 1.5rem;">${item.city}</h3>
                        <div style="font-size: 0.875rem; color: var(--text-sub); font-weight: 600;">ZIP: ${item.zip}</div>
                    </div>
                    
                    <div class="card-avatar" style="width: 64px; height: 55.5px; background: ${roleColor};">
                        <span class="material-symbols-rounded" style="font-size: 1.75rem; color: #FFF;">${roleIcon}</span>
                    </div>
                </div>
                
                <hr style="border: 0; height: 1px; background: var(--glass-border); margin: 0 0 1rem 0;">
                
                <div style="display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1.5rem;">
                    <div>
                        <div style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--text-sub);">Campus</div>
                        <div style="display: flex; gap: 4px; margin-top: 0.25rem;">${campusBadgesHtml}</div>
                    </div>
                    
                    <div>
                        <div style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--text-sub);">Active Days</div>
                        ${scheduleHtml}
                    </div>

                    <div style="display: flex; gap: 1rem; margin-top: 0.25rem;">
                        <div style="flex: 1;">
                            <div style="font-size: 0.75rem; font-weight: 700; color: var(--text-sub);">Arrive</div>
                            <div style="font-size: 0.875rem; font-weight: 600; color: var(--text-main);">${item.arrive || 'N/A'}</div>
                        </div>
                        <div style="flex: 1;">
                            <div style="font-size: 0.75rem; font-weight: 700; color: var(--text-sub);">Leave</div>
                            <div style="font-size: 0.875rem; font-weight: 600; color: var(--text-main);">${item.leave || 'N/A'}</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="card-actions" style="align-items: center; justify-content: space-between;">
                <span style="font-size: 0.75rem; color: var(--text-sub); font-weight: 600;">Posted: ${timeString}</span>
                <a href="mailto:${item.email}?subject=${mailSubject}&body=${mailBody}" class="btn" style="background: ${roleColor}; color: #FFF; padding: 0.5rem 1rem;">
                    <span class="material-symbols-rounded" style="font-size: 1.125rem;">mail</span> ${mailAction}
                </a>
            </div>
        </div>
        `;
    }).join('');

    grid.innerHTML = ctaCard + demoCard + cardsHtml;
}
// ==========================================
// --- TRANSFER TOOLS ENGINE ---
// ==========================================
const TRANSFER_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRW6t1GuKl7Ac1-CWQ91QiASG6jWGLHUVwGrc0JXhO46LMIio56zZNHLZsQ-k_zl1Ox5NVbNQKHMM73/pub?output=csv";
const TRANSFER_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdvx3ztug0ExMbV0gZKAUA8TUo0_gvxmNrTtEf4I7xKOv-H5A/viewform?usp=header"; 

let allTransferData = [];
let activeTransferCategory = 'All';

window.initTransferTools = async function() {
    const grid = document.getElementById("transfer-grid");
    const searchInput = document.getElementById("transfer-search-input");
    if (!grid) return; 

    try {
        const response = await fetch(TRANSFER_CSV_URL);
        const csvText = await response.text();
        const rows = parseCSVToArray(csvText); 
        
        const dynamicData = [];

        // Google Forms Output Mapping: 
        // [0] Timestamp (Ignored)
        // [1] Email/Score (Ignored)
        // [2] Name
        // [3] Tags
        // [4] URL
        // [5] Description (Manually populated in Google Sheets)
        for (let i = 1; i < rows.length; i++) {
            const cols = rows[i];
            if (cols.length < 5) continue; 
            
            const name = cols[2] || "";     
            const tagsRaw = cols[3] || "";     
            const url = cols[4] || "";   
            const desc = cols[5] || ""; // Pulling your manually added descriptions here!
            
            // Google Forms multi-select separates items with a comma (", ") instead of a semicolon
            const tags = tagsRaw.split(',').map(t => t.trim()).filter(t => t);

            if (name) {
                dynamicData.push({ name, desc, url, tags, type: "dynamic" });
            }
        }

        allTransferData = dynamicData;
        
        // AUTO SORTING MAGIC: Ensures cards are always listed in alphabetical order
        allTransferData.sort((a, b) => a.name.localeCompare(b.name));
        
        window.filterTransferTools();
        
        if (searchInput) searchInput.addEventListener("input", window.filterTransferTools);
    } catch (error) {
        console.warn("Could not fetch live Google Form transfer data. Loading empty state.", error);
        allTransferData = [];
        window.filterTransferTools();
    }
};

window.filterTransfer = function(category, button) {
    document.querySelectorAll('#transfer-category-pills .pill').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    activeTransferCategory = category;
    window.filterTransferTools();
};

window.filterTransferTools = function() {
    const searchInput = document.getElementById("transfer-search-input");
    const term = searchInput ? searchInput.value.trim().toLowerCase() : "";

    const filtered = allTransferData.filter(item => {
        let matchesCategory = false;
        if (activeTransferCategory === 'All') {
            matchesCategory = true;
        } else {
            matchesCategory = item.tags.some(tag => tag.includes(activeTransferCategory));
        }
        if (!matchesCategory) return false;

        if (term) {
            const searchString = `${item.name} ${item.desc} ${item.tags.join(' ')}`.toLowerCase();
            if (!searchString.includes(term)) return false;
        }

        return true;
    });

    renderTransferCards(filtered);
};

function renderTransferCards(items) {
    const grid = document.getElementById("transfer-grid");
    if (!grid) return;

    const ctaCard = `
    <div class="glass card-small" style="border: 2px dashed var(--secondary-accent); background: rgba(248, 101, 22, 0.05); padding: 2rem 1.5rem; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; gap: 1rem;">
        <span class="material-symbols-rounded" style="font-size: 3rem; color: var(--secondary-accent);">account_balance</span>
        <div>
            <h3 style="margin: 0 0 0.5rem; color: var(--secondary-accent);">Submit a Resource</h3>
            <p style="font-size: 0.875rem; color: var(--text-sub); margin: 0;">Found a great transfer program, data set, or scholarship? Add it to the hub.</p>
        </div>
        <a href="${TRANSFER_FORM_URL}" target="_blank" class="btn btn-primary" style="background: var(--secondary-accent); border: none; width: 100%; margin-top: 0.5rem;">Add Data</a>
    </div>
    `;

    const cardsHtml = items.map(item => {
        const badgesHtml = item.tags.map(tag => `<span class="badge" data-tag="${tag}">${tag}</span>`).join('');
        
        // Dynamically hide the description block completely if it's left blank on the spreadsheet
        const descHtml = item.desc ? `<p style="font-size: 0.9375rem; color: var(--text-sub); line-height: 1.5; margin: 0 0 1.5rem 0;">${item.desc}</p>` : `<div style="margin-bottom: 1.5rem;"></div>`;

        return `
        <div class="glass card-small" style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
                <div class="card-header-row" style="margin-bottom: 1rem; align-items: flex-start;">
                    <h3 style="margin: 0; font-size: 1.35rem; line-height: 1.2; flex: 1;">${item.name}</h3>
                </div>
                
                <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 1.25rem;">
                    ${badgesHtml}
                </div>
                
                ${descHtml}
            </div>
            
            <div class="card-actions">
                <a href="${item.url}" target="_blank" class="btn btn-secondary" style="width: 100%; border-color: var(--secondary-accent); color: var(--secondary-accent);">
                    <span class="material-symbols-rounded" style="font-size: 1.125rem;">open_in_new</span> Visit Resource
                </a>
            </div>
        </div>
        `;
    }).join('');

    grid.innerHTML = ctaCard + cardsHtml;
}
