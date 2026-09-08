// --- Document Checklist Database ---
const checklistData = {
  sale: {
    title: "Required Documents for Sale Deed (बैनामा / विक्रय पत्र)",
    note: "All parties (Buyer, Seller, and 2 Witnesses) must carry original photo IDs.",
    items: [
      "Original Title Document / Chain of Deeds (मूल पट्टा, रजिस्ट्री या आवंटन पत्र)",
      "Aadhaar Card and PAN Card of both Seller and Buyer ",
      "Two passport-sized photographs of Seller and Buyer ",
      "Latest Property Tax receipt or Electricity Bill (proof of possession)",
      "Apna Khata Jamabandi & Bhunaksha (खसरा/खाता नकल - for agricultural/revenue land)",
      "Two Witnesses with original Aadhaar cards and PAN cards and 2 passport-sized photographs",
      "Draft payment details (Cheque/DD/RTGS reference for consideration amount)"
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
      "Applicant's mobile number for verification and receiving certified digital printouts"
    ]
  }
};

// --- Dynamic Office Hours Status ---
function updateOfficeStatus() {
  const statusBadge = document.getElementById("office-status");
  if (!statusBadge) return;

  // Calculate local time in India Standard Time (IST)
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
  statusBadge.textContent = "🟢 Office Open (9:30 AM – 9:30 PM)";
  statusBadge.className = "status-badge open";
} else {
    statusBadge.textContent = isSunday 
      ? "🔴 Closed Today (Available on Call / By Appointment)"
      : "🔴 Office Closed (Opens Tomorrow at 9:30 AM)";
    statusBadge.className = "status-badge closed";
  }
}

// --- Render Checklist Function ---
function renderChecklist(type) {
  const container = document.getElementById("checklist-result");
  const data = checklistData[type];
  if (!container || !data) return;

  const itemsHtml = data.items.map((item) => `<li>${item}</li>`).join("");

  container.innerHTML = `
    <h4>${data.title}</h4>
    <p>${data.note}</p>
    <ul class="checklist-items">
      ${itemsHtml}
    </ul>
  `;
}

// --- Initialize Event Listeners ---
function init() {
  // Update footer year dynamically
  const yearSpan = document.getElementById("current-year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Update office open/closed status
  updateOfficeStatus();

  // Initial rendering of the first tab (Sale deed)
  renderChecklist("sale");

  // Tab button switching logic
  const tabButtons = document.querySelectorAll(".tab-btn");
  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const selectedType = btn.dataset.type;
      renderChecklist(selectedType);
    });
  });
}

document.addEventListener("DOMContentLoaded", init);
