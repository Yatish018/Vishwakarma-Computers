// --- Document Checklist Database ---
const checklistData = {
  sale: {
    title: "Required Documents for Sale Deed (बैनामा / विक्रय पत्र)",
    note: "All parties (Buyer, Seller, and 2 Witnesses) must carry original government photo IDs.",
    items: [
      "Original Title Document / Chain of Deeds (मूल पट्टा, रजिस्ट्री या आवंटन पत्र)",
      "Aadhaar Card and PAN Card of both Seller and Buyer",
      "Two passport-sized photographs of Seller and Buyer",
      "Latest Property Tax receipt or Electricity Bill (proof of possession)",
      "Apna Khata Jamabandi & Bhunaksha (खसरा/खाता नकल - for agricultural/revenue land)",
      "Two Witnesses with original Aadhaar cards and PAN cards",
      "Payment details (Cheque / DD / RTGS reference for consideration amount)"
    ]
  },
  lease: {
    title: "Required Documents for Lease / Rent Deed (किरायानामा)",
    note: "Applicable for both residential tenancy and commercial premises lease agreements.",
    items: [
      "Aadhaar Card and PAN Card of Landlord (मकान मालिक / दुकान मालिक)",
      "Aadhaar Card and PAN Card of Tenant (किरायेदार)",
      "Proof of ownership (Electricity bill, House tax receipt, or registry copy)",
      "Security deposit and monthly rent terms (cheque details if applicable)",
      "Two passport-sized photographs of both parties",
      "One independent witness with valid photo ID"
    ]
  },
  gift: {
    title: "Required Documents for Gift / Release Deed (दान पत्र / हकत्याग पत्र)",
    note: "Concessional stamp duty applies strictly to defined blood relatives under Rajasthan government rules.",
    items: [
      "Original registered ownership deed of the property (मूल स्वामित्व दस्तावेज)",
      "Family tree / Ration card or legal heir certificate proving blood relation",
      "Aadhaar Card and PAN Card of Donor (देने वाला) and Donee (पाने वाला)",
      "Two passport-sized photographs of both parties",
      "Two witnesses with original government-issued photo IDs",
      "NOC from municipal corporation or development authority (if required for leasehold plots)"
    ]
  },
  revenue: {
    title: "Details Required for Jamabandi & Bhunaksha (जमाबंदी एवं भू-नक्शा नकल)",
    note: "Official certified digital copies for banks, registries, or boundary disputes.",
    items: [
      "Name of Revenue Village (ग्राम/पटवार हल्का) and Tehsil (तहसील: सांगानेर)",
      "Khasra Number (खसरा संख्या) OR Khata Number (खाता संख्या)",
      "Name of Current Khatedar/Owner as per revenue records",
      "Applicant mobile number for verification"
    ]
  }
};

let currentChecklistType = "sale";

// --- Smart Real-Time Office Radar Logic (9:30 AM – 9:30 PM IST) ---
function updateOfficeStatus() {
  const badge = document.getElementById("office-status");
  const textElem = document.getElementById("status-text");
  if (!badge || !textElem) return;

  const now = new Date();
  const options = { timeZone: "Asia/Kolkata", hour12: false, weekday: "short", hour: "numeric", minute: "numeric" };
  const formatter = new Intl.DateTimeFormat("en-US", options);
  const parts = formatter.formatToParts(now);

  let weekday = "";
  let hour = 0;
  let minute = 0;

  for (const part of parts) {
    if (part.type === "weekday") weekday = part.value;
    if (part.type === "hour") hour = parseInt(part.value, 10);
    if (part.type === "minute") minute = parseInt(part.value, 10);
  }

  const currentDecHour = hour + minute / 60;
  const isSunday = weekday === "Sun";

  // Mon–Sat: 9:30 AM (9.5) to 9:30 PM (21.5)
  if (!isSunday && currentDecHour >= 9.5 && currentDecHour < 21.5) {
    const hoursLeft = Math.floor(21.5 - currentDecHour);
    const minsLeft = Math.round(((21.5 - currentDecHour) - hoursLeft) * 60);
    badge.className = "status-badge open";
    textElem.textContent = `Open Now • Closes in ${hoursLeft}h ${minsLeft}m (9:30 PM)`;
  } else {
    badge.className = "status-badge closed";
    textElem.textContent = isSunday 
      ? "Closed Today (Sunday) • Available by Appointment" 
      : "Closed Now • Opens Tomorrow at 9:30 AM";
  }
}

// --- Render Checklist with Clipboard & WhatsApp Sharing ---
function renderChecklist(type) {
  currentChecklistType = type;
  const container = document.getElementById("checklist-result");
  const data = checklistData[type];
  if (!container || !data) return;

  const itemsHtml = data.items.map((item) => `<li>${item}</li>`).join("");

  container.innerHTML = `
    <div class="checklist-header">
      <div>
        <h4>${data.title}</h4>
        <p class="checklist-note">${data.note}</p>
      </div>
      <div class="checklist-actions">
        <button type="button" id="copy-checklist-btn" class="btn btn-outline btn-sm">📋 Copy List</button>
        <button type="button" id="share-wa-btn" class="btn btn-whatsapp btn-sm">💬 Share on WhatsApp</button>
      </div>
    </div>
    <ul class="checklist-items">
      ${itemsHtml}
    </ul>
  `;

  // 1. Copy to clipboard
  const copyBtn = document.getElementById("copy-checklist-btn");
  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      const textToShare = `${data.title}\n\nNote: ${data.note}\n\nRequired Documents:\n` +
        data.items.map((it, idx) => `${idx + 1}. ${it}`).join("\n") +
        `\n\nOffice: Vishwakarma Computers, Opp. SBI Bank, Nagar Nigam Road, Sanganer, Jaipur.`;

      navigator.clipboard.writeText(textToShare).then(() => {
        copyBtn.textContent = "✅ Copied!";
        setTimeout(() => {
          copyBtn.textContent = "📋 Copy List";
        }, 2000);
      });
    });
  }

  // 2. Direct Share to WhatsApp
  const shareBtn = document.getElementById("share-wa-btn");
  if (shareBtn) {
    shareBtn.addEventListener("click", () => {
      const textToShare = `${data.title}\n\nNote: ${data.note}\n\nRequired Documents:\n` +
        data.items.map((it, idx) => `${idx + 1}. ${it}`).join("\n") +
        `\n\nOffice: Vishwakarma Computers, Opp. SBI Bank, Nagar Nigam Road, Sanganer, Jaipur.`;

      const waUrl = `https://wa.me/?text=${encodeURIComponent(textToShare)}`;
      window.open(waUrl, "_blank");
    });
  }
}

// --- Live Service Search Filtering ---
function setupServiceSearch() {
  const searchInput = document.getElementById("service-search");
  const cards = document.querySelectorAll(".service-card");

  if (!searchInput) return;

  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase().trim();

    cards.forEach((card) => {
      const searchData = (card.dataset.title || "").toLowerCase();
      const cardText = card.innerText.toLowerCase();
      if (searchData.includes(query) || cardText.includes(query)) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    });
  });
}

// --- Initialize App ---
function init() {
  const yearSpan = document.getElementById("current-year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  updateOfficeStatus();
  setInterval(updateOfficeStatus, 60000); // Check every minute in real time

  renderChecklist("sale");
  setupServiceSearch();

  const tabButtons = document.querySelectorAll(".tab-btn");
  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      renderChecklist(btn.dataset.type);
    });
  });
}

document.addEventListener("DOMContentLoaded", init);
