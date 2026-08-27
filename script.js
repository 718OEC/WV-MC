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
const CLUB_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTy11HreahFilE0XgWif_cKd7OE1OA4fZ900qy9FwrDVyXIi0LUpPmwpJZpiR2uqd7UJJlg-QW2PoZX/pub?gid=60267321&single=true&output=csv";

let allClubsData = [];
let activeCategory = 'All';
let activeCampus = 'All'; 
const wvClubFormUrl = "https://forms.cloud.microsoft/pages/responsepage.aspx?id=iuGPAuNTGkqSmD2pznHsk9KIcIjCLeNHvF6H_GifXXVUMUg3OFc2RU85V1U2R1hIQzVLU0pJN1NOWi4u&route=shorturl";

window.initClubHub = async function() {
    const grid = document.getElementById("club-grid");
    if (!grid) return; 

    try {
        const response = await fetch(CLUB_CSV_URL);
        const csvText = await response.text();
        const rows = parseCSVToArray(csvText); 
        
        const dynamicData = [];

        // Spreadsheet Column Mapping:
        // [0] School | [1] Logo | [2] Club-Name | [3] Initials | [4] Categories 
        // [5] Contact | [6] Email | [7] Members | [8] Description | [9] Sign-up | [10] Socials
        for (let i = 1; i < rows.length; i++) {
            const cols = rows[i];
            if (cols.length < 3 || !cols[2]) continue; // Skip empty rows
            
            const school = cols[0] || "";     
            const logo = cols[1] || "";     
            const name = cols[2] || "";     
            const initials = cols[3] || "";     
            const catsRaw = cols[4] || "";     
            const president = cols[5] || "";     
            const email = cols[6] || "";     
            const memberCount = cols[7] || "";     
            const desc = cols[8] || "";     
            const signUpForm = cols[9] || "";     
            const socialsRaw = cols[10] || "";     
            
            const categories = catsRaw.split(',').map(c => c.trim()).filter(c => c);

            // Smart Socials Parser
            let socials = {};
            if (socialsRaw) {
                const links = socialsRaw.split(/[\s,]+/); // Split by space or comma
                links.forEach(link => {
                    if (link.toLowerCase().includes('instagram.com')) socials.ig = link;
                    else if (link.toLowerCase().includes('http')) socials.web = link;
                });
            }

            dynamicData.push({ school, logo, name, initials, categories, president, email, memberCount, desc, signUpForm, socials });
        }

        allClubsData = dynamicData;
        allClubsData.sort((a, b) => a.name.localeCompare(b.name));
        window.filterClubs();
        
    } catch (error) {
        console.warn("Could not fetch live Google Sheet club data.", error);
        allClubsData = [];
        window.filterClubs();
    }
};

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
    const term = searchInput ? searchInput.value.trim().toLowerCase() : "";
    const dataToFilter = allClubsData || [];

    const filtered = dataToFilter.filter(club => {
        const name = club.name || "";
        const initials = club.initials || "";
        const president = club.president || "";
        const email = club.email || "";
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
        desc.toLowerCase().includes(term) ||
        school.toLowerCase().includes(term);
    });

    renderClubCards(filtered);
};


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
