"use strict";
const PHONE = "919829017080";
const ADDR = "Vishwakarma Computers, Opp. SBI Bank, Nagar Nigam Road, Sanganer, Jaipur 302029";
// If an element is missing, return a harmless dummy so one mistake can never stop the whole page.
const $ = (s) => document.querySelector(s) || document.createElement("i");
const wa = (t) => `https://wa.me/${PHONE}?text=${encodeURIComponent(t)}`;
let lang = "en";
try { lang = localStorage.getItem("lang") || "en"; } catch (e) {}
const L = (o) => o[lang];

/* =====================================================================
   HOW THIS FILE IS ORGANISED  (edit the DATA section for most changes)
   1. Settings    : phone number, address, small helpers
   2. DATA        : SERVICES (deeds), REALTY (real estate), LISTINGS (properties),
                    CHECKS (document lists), T (small text labels)
   3. Features    : language, search, checklist, forms, status clock, theme,
                    header scroll, animations, hover tips
   Every text has two versions:  en = English,  hi = Hindi.
   ===================================================================== */

// ---------- DATA 1: SERVICES = deed & legal services shown in section "Deed & legal services" ----------
// Each row:  [icon, search-keywords, {en,hi} title, {en,hi} description]
const SERVICES = [
  ["📜", "sale deed registry property plot flat बैनामा विक्रय पत्र जमीन",
    { en: "Sale Deed", hi: "बैनामा / विक्रय पत्र" },
    { en: "Title check, valuation, drafting and full Sub-Registrar registry help.", hi: "टाइटल जाँच, मूल्यांकन, ड्राफ्टिंग और उप-पंजीयक कार्यालय में पूरी रजिस्ट्री सहायता।" }],
  ["📑", "lease rent tenancy shop house किरायानामा दुकान मकान",
    { en: "Lease / Rent Deed", hi: "किरायानामा" },
    { en: "Home and shop agreements with clear deposit, tenure and dispute terms.", hi: "मकान और दुकान के अनुबंध, जिनमें जमा राशि, अवधि और विवाद की शर्तें साफ लिखी हों।" }],
  ["🎁", "gift deed family transfer दान पत्र",
    { en: "Gift Deed", hi: "दान पत्र" },
    { en: "Family property transfer with the correct stamp duty under state rules.", hi: "राज्य नियमों के अनुसार सही स्टाम्प ड्यूटी के साथ पारिवारिक संपत्ति हस्तांतरण।" }],
  ["🤝", "release deed ancestral partition heir हकत्याग पत्र बंटवारा",
    { en: "Release Deed", hi: "हकत्याग पत्र" },
    { en: "Give up a share in co-owned or ancestral property, in proper legal form.", hi: "साझा या पैतृक संपत्ति में हिस्सा छोड़ने का वैधानिक दस्तावेज़।" }],
  ["🏛️", "jamabandi bhunaksha khata land records nakal जमाबंदी भू-नक्शा खतौनी नकल",
    { en: "Jamabandi & Bhunaksha", hi: "जमाबंदी एवं भू-नक्शा" },
    { en: "Apna Khata Jamabandi and land map copies for banks and boundary needs.", hi: "बैंक और सीमा संबंधी काम के लिए अपना खाता जमाबंदी और भू-नक्शा की नकल।" }],
  ["🎫", "estamp e-stamp stamp paper agreement स्टाम्प पेपर",
    { en: "e-Stamp Paper", hi: "ई-स्टाम्प पेपर" },
    { en: "Non-judicial e-Stamp papers for agreements and declarations, on the spot.", hi: "अनुबंध और घोषणा-पत्र के लिए गैर-न्यायिक ई-स्टाम्प पेपर, तुरंत।" }],
  ["✍️", "affidavit notary income domicile name change शपथ पत्र",
    { en: "Affidavits", hi: "शपथ पत्र" },
    { en: "Income, name correction, domicile and legal-heir affidavits with notary help.", hi: "आय, नाम सुधार, मूल निवास और वारिस शपथ पत्र, नोटरी सहायता के साथ।" }],
  ["⚖️", "power of attorney will gpa spa मुख्तारनामा वसीयत",
    { en: "Power of Attorney & Will", hi: "मुख्तारनामा एवं वसीयत" },
    { en: "General or Special Power of Attorney and registered Wills.", hi: "सामान्य या विशेष मुख्तारनामा और पंजीकृत वसीयत।" }],
];

// ---------- DATA 2: REALTY = real estate services (same row format as SERVICES) ----------
// Edit these to match exactly what your office offers. Add a new row to add a service.
const REALTY = [
  ["🏡", "buy sell property plot flat house land real estate प्रॉपर्टी खरीद बिक्री मकान प्लॉट",
    { en: "Buy / Sell Property", hi: "प्रॉपर्टी खरीद / बिक्री" },
    { en: "Plots, flats, houses and farm land: fair-price guidance and all paperwork under one roof.", hi: "प्लॉट, फ्लैट, मकान और कृषि भूमि: सही कीमत की सलाह और पूरा दस्तावेज़ी काम एक ही जगह।" }],
  ["🔍", "title verification ownership patta allotment check टाइटल जाँच स्वामित्व पट्टा",
    { en: "Title & Document Check", hi: "टाइटल व दस्तावेज़ जाँच" },
    { en: "Check ownership papers, patta or allotment and records before you pay any money.", hi: "पैसा देने से पहले स्वामित्व कागज़, पट्टा या आवंटन और रिकॉर्ड की जाँच।" }],
  ["💰", "valuation dlc rate stamp duty registration cost मूल्यांकन डीएलसी स्टाम्प ड्यूटी",
    { en: "Valuation & Stamp Duty", hi: "मूल्यांकन व स्टाम्प ड्यूटी" },
    { en: "Know the market value, DLC rate and approximate registration cost in advance.", hi: "बाज़ार मूल्य, डीएलसी दर और रजिस्ट्रेशन खर्च का पहले से अनुमान।" }],
  ["🏢", "rent lease tenant landlord property किराए पर मकान दुकान किरायेदार",
    { en: "Rent & Lease Dealing", hi: "किराया व लीज़ डीलिंग" },
    { en: "Find a tenant, or a rented home or shop, and get the agreement drafted and registered.", hi: "किरायेदार या किराए का मकान/दुकान खोजें और अनुबंध बनवाकर रजिस्टर कराएँ।" }],
  ["🧾", "mutation name transfer namantaran records नामांतरण",
    { en: "Name Transfer (Mutation)", hi: "नामांतरण (म्यूटेशन)" },
    { en: "Get your name entered in municipal or revenue records after the registry.", hi: "रजिस्ट्री के बाद नगर निगम या राजस्व रिकॉर्ड में अपना नाम दर्ज कराएँ।" }],
  ["🏗️", "approval jda nagar nigam conversion layout plot भू-रूपांतरण पट्टा अनुमोदन",
    { en: "Approval & Land-use Check", hi: "अनुमोदन व भू-उपयोग जाँच" },
    { en: "Check layout approval and land-use conversion status before buying a plot.", hi: "प्लॉट खरीदने से पहले लेआउट अनुमोदन और भू-रूपांतरण की स्थिति की जाँच।" }],
];
// ALL = deeds + real estate together (used by the enquiry dropdown and the rotating headline words)
const ALL = [...SERVICES, ...REALTY];

// ---------- DATA 3: LISTINGS = properties you want to show on the site ----------
// Leave empty ([]) and the "Available properties" block stays hidden.
// To add one, copy the example below, remove the // marks, and fill your details.
const LISTINGS = [
  // { title: { en: "3 BHK House", hi: "3 बीएचके मकान" },
  //   place: { en: "Sanganer, Jaipur", hi: "सांगानेर, जयपुर" },
  //   price: "₹ 55 lakh",
  //   info:  { en: "1200 sq ft, east facing", hi: "1200 वर्ग फुट, पूर्वमुखी" } },
];

// ---------- DATA 4: option lists for the property requirement form ----------
const GOALS = [{ en: "Buy", hi: "खरीदना" }, { en: "Sell", hi: "बेचना" }, { en: "Rent in (take on rent)", hi: "किराए पर लेना" }, { en: "Rent out (give on rent)", hi: "किराए पर देना" }];
const KINDS = [{ en: "Plot", hi: "प्लॉट" }, { en: "Flat", hi: "फ्लैट" }, { en: "House", hi: "मकान" }, { en: "Shop / Office", hi: "दुकान / ऑफिस" }, { en: "Farm land", hi: "कृषि भूमि" }];

// ---------- DATA 5: CHECKS = document checklist (tabs in section "What to bring") ----------
const CHECKS = {
  sale: { tab: { en: "Sale Deed", hi: "बैनामा / विक्रय पत्र" },
    title: { en: "Documents for a Sale Deed", hi: "बैनामा / विक्रय पत्र के लिए दस्तावेज़" },
    note: { en: "Buyer, seller and 2 witnesses must bring original photo ID.", hi: "खरीदार, विक्रेता और 2 गवाह मूल फोटो पहचान पत्र साथ लाएँ।" },
    items: [
      { en: "Original title papers or chain of deeds", hi: "मूल पट्टा, रजिस्ट्री या आवंटन पत्र" },
      { en: "Aadhaar and PAN of seller and buyer", hi: "विक्रेता और खरीदार का आधार व पैन कार्ड" },
      { en: "2 passport photos each of seller and buyer", hi: "विक्रेता और खरीदार की 2-2 पासपोर्ट फोटो" },
      { en: "Latest property tax receipt or electricity bill", hi: "ताज़ा संपत्ति कर रसीद या बिजली बिल" },
      { en: "Jamabandi & Bhunaksha (for revenue or farm land)", hi: "जमाबंदी व भू-नक्शा (राजस्व या कृषि भूमि के लिए)" },
      { en: "2 witnesses with original Aadhaar and PAN", hi: "2 गवाह, मूल आधार व पैन के साथ" },
      { en: "Payment details (cheque, DD or RTGS reference)", hi: "भुगतान विवरण (चेक, डीडी या आरटीजीएस संदर्भ)" }] },
  lease: { tab: { en: "Lease / Rent", hi: "किरायानामा" },
    title: { en: "Documents for a Lease / Rent Deed", hi: "किरायानामा के लिए दस्तावेज़" },
    note: { en: "Works for homes and commercial premises.", hi: "मकान और व्यावसायिक परिसर दोनों के लिए।" },
    items: [
      { en: "Aadhaar and PAN of landlord", hi: "मकान/दुकान मालिक का आधार व पैन" },
      { en: "Aadhaar and PAN of tenant", hi: "किरायेदार का आधार व पैन" },
      { en: "Proof of ownership (bill, tax receipt or registry copy)", hi: "मालिकाना हक का प्रमाण (बिल, कर रसीद या रजिस्ट्री कॉपी)" },
      { en: "Rent and security deposit terms", hi: "किराया और सिक्योरिटी डिपॉज़िट की शर्तें" },
      { en: "2 passport photos of both parties", hi: "दोनों पक्षों की 2-2 पासपोर्ट फोटो" },
      { en: "1 witness with valid photo ID", hi: "1 गवाह, वैध फोटो पहचान पत्र के साथ" }] },
  gift: { tab: { en: "Gift / Release", hi: "दान / हकत्याग" },
    title: { en: "Documents for a Gift / Release Deed", hi: "दान पत्र / हकत्याग पत्र के लिए दस्तावेज़" },
    note: { en: "Lower stamp duty applies only to close blood relatives under Rajasthan rules.", hi: "राजस्थान नियमों में कम स्टाम्प ड्यूटी केवल निकट रक्त संबंधियों पर लागू होती है।" },
    items: [
      { en: "Original ownership deed of the property", hi: "संपत्ति का मूल स्वामित्व दस्तावेज़" },
      { en: "Family tree, ration card or legal-heir certificate", hi: "वंशावली, राशन कार्ड या वारिस प्रमाण पत्र" },
      { en: "Aadhaar and PAN of donor and receiver", hi: "देने वाले और पाने वाले का आधार व पैन" },
      { en: "2 passport photos of both parties", hi: "दोनों पक्षों की 2-2 पासपोर्ट फोटो" },
      { en: "2 witnesses with original photo ID", hi: "2 गवाह, मूल फोटो पहचान पत्र के साथ" },
      { en: "NOC from the municipal body or authority, if the plot is leasehold", hi: "लीज़होल्ड प्लॉट हो तो नगर निकाय या प्राधिकरण का NOC" }] },
  revenue: { tab: { en: "Jamabandi / Map", hi: "जमाबंदी / नक्शा" },
    title: { en: "Details for Jamabandi & Bhunaksha", hi: "जमाबंदी एवं भू-नक्शा के लिए जानकारी" },
    note: { en: "Certified digital copies for banks, registry or boundary disputes.", hi: "बैंक, रजिस्ट्री या सीमा विवाद के लिए प्रमाणित डिजिटल नकल।" },
    items: [
      { en: "Village (patwar halka) and Tehsil (Sanganer)", hi: "ग्राम / पटवार हल्का और तहसील (सांगानेर)" },
      { en: "Khasra number or Khata number", hi: "खसरा संख्या या खाता संख्या" },
      { en: "Current khatedar / owner name in revenue records", hi: "राजस्व रिकॉर्ड के अनुसार वर्तमान खातेदार का नाम" },
      { en: "Applicant mobile number", hi: "आवेदक का मोबाइल नंबर" }] },
};

const T = {
  inq: { en: "Inquire on WhatsApp", hi: "व्हाट्सऐप पर पूछें" },
  need: { en: "Please enter your name and the area.", hi: "कृपया अपना नाम और क्षेत्र लिखें।" },
  none: { en: "No service matches that. Try another word, or WhatsApp us and we will help.", hi: "इस नाम की कोई सेवा नहीं मिली। दूसरा शब्द लिखें, या हमें व्हाट्सऐप करें।" },
  copy: { en: "Copy list", hi: "सूची कॉपी करें" }, copied: { en: "Copied", hi: "कॉपी हो गई" },
  share: { en: "Send on WhatsApp", hi: "व्हाट्सऐप पर भेजें" },
  name: { en: "Please enter your name.", hi: "कृपया अपना नाम लिखें." },
  open: { en: "Open", hi: "खुला" }, closed: { en: "Closed", hi: "बंद" },
  sun: { en: "Closed today (Sunday)", hi: "आज बंद (रविवार)" },
  sealOpen: { en: "OPEN", hi: "खुला" }, sealClosed: { en: "CLOSED", hi: "बंद" },
  opensAt: { en: "opens 9:30 AM", hi: "सुबह 9:30 बजे खुलेगा" }, until: { en: "until 9:30 PM", hi: "रात 9:30 बजे तक" },
  hello: { en: "Namaste, I need help with deed writing.", hi: "नमस्ते, मुझे दस्तावेज़ लेखन में सहायता चाहिए।" },
};

// ---------- Language ----------
function applyLang() {
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-en]").forEach((el) => (el.textContent = el.dataset[lang]));
  document.querySelectorAll("[data-ph-en]").forEach((el) => (el.placeholder = el.dataset["ph" + (lang === "en" ? "En" : "Hi")]));
  document.querySelectorAll("[data-lang]").forEach((b) => b.setAttribute("aria-pressed", b.dataset.lang === lang));
  renderServices(); renderRealty(); renderSwatches(); fillSelect(); renderTabs(); renderChecklist(activeTab); updateStatus(); filterServices();
  const link = wa(L(T.hello));
  $("#hero-wa").href = link; $("#fab").href = link;
}
document.querySelectorAll("[data-lang]").forEach((b) =>
  b.addEventListener("click", () => {
    lang = b.dataset.lang;
    try { localStorage.setItem("lang", lang); } catch (e) {}
    applyLang();
  }));

// ---------- Services + search ----------
// Builds the HTML for service rows. Used for both deed services and real estate services.
const rows = (list) => list.map(([icon, kw, title, desc]) =>
  `<li data-kw="${(kw + " " + title.en + " " + title.hi).toLowerCase()}" data-tip-en="Ask about ${title.en} on WhatsApp" data-tip-hi="${title.hi} के बारे में व्हाट्सऐप पर पूछें"><span class="ic" aria-hidden="true">${icon}</span>
   <h3>${L(title)}</h3><p>${L(desc)}</p>
   <a target="_blank" rel="noopener noreferrer" href="${wa(`Namaste, I want to inquire about ${title.en} (${title.hi}).`)}">${L(T.inq)}</a></li>`).join("");
function renderServices() {
  $("#services-list").innerHTML = rows(SERVICES);
  $("#realty-list").innerHTML = rows(REALTY);
}

// ---------- Real estate: property cards + requirement form ----------
function renderRealty() {
  // property cards (block stays hidden when LISTINGS is empty)
  $("#listings-wrap").hidden = LISTINGS.length === 0;
  $("#listings").innerHTML = LISTINGS.map((p) =>
    `<article class="lcard"><h4>${L(p.title)}</h4><p>📍 ${L(p.place)}</p><p>${L(p.info)}</p><p class="price">${p.price}</p>
     <a target="_blank" rel="noopener noreferrer" href="${wa(`Namaste, I am interested in: ${p.title.en}, ${p.place.en}, ${p.price}.`)}">${L(T.inq)}</a></article>`).join("");
  // dropdowns (keep the visitor's current choice when the language changes)
  const fill = (id, list) => { const s = $(id), k = s.selectedIndex; s.innerHTML = list.map((o, i) => `<option value="${i}">${L(o)}</option>`).join(""); if (k > 0) s.selectedIndex = k; };
  fill("#r-goal", GOALS); fill("#r-kind", KINDS);
}
$("#realty-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = $("#r-name").value.trim(), area = $("#r-area").value.trim(), err = $("#r-err");
  if (!name || !area) { err.textContent = L(T.need); err.hidden = false; return; }
  err.hidden = true;
  const goal = GOALS[$("#r-goal").value].en, kind = KINDS[$("#r-kind").value].en, budget = $("#r-budget").value.trim();
  window.open(wa(`Namaste, my name is ${name}. I want to: ${goal}. Property: ${kind} in ${area}.${budget ? " Budget: " + budget + "." : ""}`), "_blank", "noopener");
});

// ---------- Search (filters both lists) ----------
function filterServices() {
  const q = $("#service-search").value.toLowerCase().trim();
  let shown = 0;
  document.querySelectorAll("#services-list li, #realty-list li").forEach((li) => {
    const ok = li.dataset.kw.includes(q);
    li.hidden = !ok; if (ok) shown++;
  });
  const no = $("#no-results");
  no.hidden = shown > 0; no.textContent = L(T.none);
}
$("#service-search").addEventListener("input", filterServices);

// ---------- Checklist ----------
let activeTab = "sale";
function renderTabs() {
  $("#tabs").innerHTML = Object.entries(CHECKS).map(([k, v]) =>
    `<button type="button" role="tab" data-type="${k}" aria-selected="${k === activeTab}" data-tip-en="Show the ${v.tab.en} checklist" data-tip-hi="${v.tab.hi} की सूची देखें">${L(v.tab)}</button>`).join("");
  document.querySelectorAll("#tabs button").forEach((b) =>
    b.addEventListener("click", () => { activeTab = b.dataset.type; renderTabs(); renderChecklist(activeTab); }));
}
function checklistText(d) {
  return `${L(d.title)}\n${L(d.note)}\n\n` + d.items.map((it, i) => `${i + 1}. ${L(it)}`).join("\n") + `\n\n${ADDR}`;
}
function renderChecklist(type) {
  const d = CHECKS[type];
  $("#checklist-result").innerHTML =
    `<h3>${L(d.title)}</h3><p class="note">${L(d.note)}</p><ul>${d.items.map((i) => `<li>${L(i)}</li>`).join("")}</ul>
     <div class="actions"><button type="button" class="btn ghost" id="copy-btn">${L(T.copy)}</button>
     <button type="button" class="btn wa" id="share-btn">${L(T.share)}</button></div>`;
  $("#copy-btn").addEventListener("click", async (e) => {
    try { await navigator.clipboard.writeText(checklistText(d)); e.target.textContent = L(T.copied); }
    catch (err) { e.target.textContent = "—"; }
    setTimeout(() => (e.target.textContent = L(T.copy)), 2000);
  });
  $("#share-btn").addEventListener("click", () =>
    window.open(`https://wa.me/?text=${encodeURIComponent(checklistText(d))}`, "_blank", "noopener"));
}

// ---------- Enquiry form ----------
function fillSelect() {
  const sel = $("#f-service"), keep = sel.selectedIndex;
  sel.innerHTML = ALL.map(([, , t], i) => `<option value="${i}">${L(t)}</option>`).join("");
  if (keep > 0) sel.selectedIndex = keep;
}
$("#enquiry").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = $("#f-name").value.trim(), err = $("#f-err");
  if (!name) { err.textContent = L(T.name); err.hidden = false; $("#f-name").focus(); return; }
  err.hidden = true;
  const t = ALL[$("#f-service").value][2], msg = $("#f-msg").value.trim();
  window.open(wa(`Namaste, my name is ${name}. I need help with: ${t.en} (${t.hi}).${msg ? "\n" + msg : ""}`), "_blank", "noopener");
});

// ---------- Office status (Mon–Sat 9:30–21:30 IST) ----------
function updateStatus() {
  const p = Object.fromEntries(new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Kolkata", hour12: false, weekday: "short", hour: "numeric", minute: "numeric" })
    .formatToParts(new Date()).map((x) => [x.type, x.value]));
  const h = (parseInt(p.hour, 10) % 24) + parseInt(p.minute, 10) / 60, sun = p.weekday === "Sun";
  const open = !sun && h >= 9.5 && h < 21.5;
  $("#office-status").className = "status " + (open ? "open" : "closed");
  $("#status-text").textContent = open ? L(T.open) : sun ? L(T.sun) : L(T.closed);
  $("#clock").textContent = new Date().toLocaleString(lang === "hi" ? "hi-IN" : "en-IN", { timeZone: "Asia/Kolkata", weekday: "short", day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true }) + " IST";
}

// ---------- Misc ----------
$("#menu-btn").addEventListener("click", () => {
  const n = $("#nav"), o = n.classList.toggle("open");
  $("#menu-btn").setAttribute("aria-expanded", o);
});
const closeMenu = () => { $("#nav").classList.remove("open"); $("#menu-btn").setAttribute("aria-expanded", "false"); };
document.querySelectorAll("#nav a").forEach((a) => a.addEventListener("click", closeMenu));
$("#copy-addr").addEventListener("click", async (e) => {
  try { await navigator.clipboard.writeText(ADDR); e.target.textContent = L(T.copied); } catch (err) {}
  setTimeout(() => (e.target.textContent = e.target.dataset[lang]), 2000);
});
// ---------- Theme: colour + light/dark ----------
const PALS = [["stamp", "#1b2a6b", "Stamp blue", "स्टाम्प नीला"], ["rose", "#9d2450", "Jaipur rose", "जयपुर गुलाबी"], ["forest", "#0f5c4a", "Forest green", "वन हरा"], ["saffron", "#b14a0a", "Saffron", "केसरिया"]];
const store = (k, v) => { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) {} };
let pal = store("pal") || "stamp", mode = store("mode") || "auto";
const darkMQ = matchMedia("(prefers-color-scheme: dark)");
function applyTheme() {
  const root = document.documentElement;
  root.dataset.pal = pal;
  root.dataset.mode = mode === "auto" ? (darkMQ.matches ? "dark" : "light") : mode;
  document.querySelectorAll(".sw").forEach((b) => b.setAttribute("aria-pressed", b.dataset.pal === pal));
  document.querySelectorAll(".modes button").forEach((b) => b.setAttribute("aria-pressed", b.dataset.mode === mode));
  document.querySelector("meta[name=theme-color]").content = PALS.find((p) => p[0] === pal)[1];
}
function renderSwatches() {
  $("#swatches").innerHTML = PALS.map((p) => `<button type="button" class="sw" data-pal="${p[0]}" style="background:${p[1]}" data-tip-en="${p[2]}" data-tip-hi="${p[3]}" aria-label="${lang === "en" ? p[2] : p[3]}"></button>`).join("");
  applyTheme();
}
$("#swatches").addEventListener("click", (e) => { const b = e.target.closest(".sw"); if (b) { pal = b.dataset.pal; store("pal", pal); applyTheme(); } });
document.querySelector(".modes").addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) { mode = b.dataset.mode; store("mode", mode); applyTheme(); } });
darkMQ.addEventListener ? darkMQ.addEventListener("change", applyTheme) : darkMQ.addListener(applyTheme); // old-browser safe
const pop = $("#theme-pop"), themeBtn = $("#theme-btn");
const setPop = (open) => { pop.hidden = !open; themeBtn.setAttribute("aria-expanded", open); };
themeBtn.addEventListener("click", (e) => { e.stopPropagation(); setPop(pop.hidden); });
document.addEventListener("click", (e) => { if (!pop.hidden && !pop.contains(e.target)) setPop(false); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") { setPop(false); closeMenu(); } });

// ---------- Header hides on scroll down, returns on scroll up ----------
const header = $(".site-header");
let lastY = 0;
addEventListener("scroll", () => {
  const y = scrollY, lock = $("#nav").classList.contains("open") || !pop.hidden;
  header.classList.toggle("scrolled", y > 10);
  header.classList.toggle("hide", y > lastY && y > 140 && !lock);
  lastY = y;
  $("#progress").style.width = (y / Math.max(1, document.documentElement.scrollHeight - innerHeight)) * 100 + "%";
}, { passive: true });

// ---------- Motion: reveal, active menu link, rotating deed names, seal tilt ----------
// Old browsers without IntersectionObserver: skip scroll animations and show everything.
if (!("IntersectionObserver" in window)) { document.documentElement.classList.remove("js"); window.IntersectionObserver = class { observe() {} unobserve() {} }; }
document.querySelectorAll("main .wrap > *").forEach((el) => el.classList.add("rv"));
const reveal = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); reveal.unobserve(e.target); } }), { threshold: 0.1 });
document.querySelectorAll(".rv").forEach((el) => reveal.observe(el));
const spy = new IntersectionObserver((es) => es.forEach((e) => {
  if (e.isIntersecting) document.querySelectorAll("#nav a:not(.btn)").forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id));
}), { rootMargin: "-40% 0px -55% 0px" });
document.querySelectorAll("main section").forEach((s) => spy.observe(s));
let ti = 0;
const tick = () => { $("#ticker").innerHTML = `<span>✦ ${L(ALL[ti++ % ALL.length][2])}</span>`; };
tick(); setInterval(tick, 2400);
const heroEl = $(".hero"), sealEl = $("#seal");
heroEl.addEventListener("pointermove", (e) => {
  const r = heroEl.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
  sealEl.style.transform = `rotate(${-8 + x * 12}deg) translate(${x * 14}px,${y * 14}px)`;
});

// ---------- Pop-up tips on hover (mouse only) ----------
const tipEl = document.createElement("div");
tipEl.id = "tip"; tipEl.setAttribute("role", "tooltip"); document.body.appendChild(tipEl);
let tipTarget = null;
const hideTip = () => { tipEl.classList.remove("show"); tipTarget = null; };
document.addEventListener("pointerover", (e) => {
  if (e.pointerType !== "mouse") return;
  const t = e.target.closest("[data-tip-en]");
  if (!t) return hideTip();
  if (t === tipTarget) return;
  tipTarget = t;
  tipEl.textContent = t.dataset[lang === "en" ? "tipEn" : "tipHi"];
  const r = t.getBoundingClientRect(), w = tipEl.offsetWidth, h = tipEl.offsetHeight;
  const x = Math.max(8, Math.min(r.left + r.width / 2 - w / 2, innerWidth - w - 8));
  const y = r.top - h - 10 < 8 ? r.bottom + 10 : r.top - h - 10;
  tipEl.style.left = x + "px"; tipEl.style.top = y + "px";
  tipEl.classList.add("show");
});
addEventListener("scroll", hideTip, { passive: true });

// ---------- Logo: drop a file named logo.png next to index.html to replace "VC" ----------
const probe = new Image();
probe.onload = () => { $("#seal-logo").src = probe.src; $("#seal-logo").hidden = false; $("#seal").classList.add("has-logo"); };
probe.src = "logo.png";

$("#year").textContent = new Date().getFullYear();
applyLang();
setInterval(updateStatus, 1000);

// Tell the page in index.html that the script finished without errors.
// ---------- Main logo: moves a little with the cursor while it is over the circle ----------
sealEl.addEventListener("pointermove", (e) => {
  const r = sealEl.getBoundingClientRect();
  sealEl.style.setProperty("--mx", ((e.clientX - r.left) / r.width - 0.5) * 16 + "px");
  sealEl.style.setProperty("--my", ((e.clientY - r.top) / r.height - 0.5) * 16 + "px");
});
sealEl.addEventListener("pointerleave", () => { sealEl.style.setProperty("--mx", "0px"); sealEl.style.setProperty("--my", "0px"); });

window.__ok = 1;
