/**
 * COMPANY CONTENT — story, team, timeline, testimonials, FAQs, export details.
 * Replace bracketed placeholders with real names, figures and quotes.
 * Never publish a testimonial or client name without written permission.
 */

export const story = {
  founding:
    "Belmont Coffee House was founded in Nairobi in 2016 by [Founder name], [one-line founder background — e.g. a third-generation coffee family from Nyeri]. Having watched exceptional Kenyan lots lose their identity in anonymous bulk shipments, [he/she/they] set out to build an exporter that would carry the story of every farm all the way to the roaster — and pay farmers accordingly.",
  growth:
    "What began as a handful of containers of Nyeri AA has grown into a trading house sourcing from five East African origins, with our own cupping laboratory, a licensed export operation and long-term partners across Europe, the Middle East, Asia and North America.",
  mission:
    "To connect the finest coffees of East Africa with discerning buyers worldwide — traceably, reliably and on terms that let farming families prosper.",
  vision:
    "To be the most trusted name in East African coffee: the first call for any roaster, importer or brand that values quality, transparency and partnership.",
};

export const values = [
  { title: "Integrity", text: "Accurate samples, honest grading and contracts we honour — even when markets move against us." },
  { title: "Traceability", text: "Every lot documented from farm or washing station to container seal, with data you can verify." },
  { title: "Craft", text: "Licensed liquorers and Q-graders cup every lot. If it does not meet the sample, it does not ship." },
  { title: "Partnership", text: "Multi-year relationships with farmers and buyers, built on fair prices and open communication." },
];

export const team = [
  { name: "[Full name]", role: "Founder & Managing Director", bio: "[Two-sentence bio: background in coffee, years of experience, what they oversee at Belmont.]" },
  { name: "[Full name]", role: "Head of Quality — Licensed Q Arabica Grader", bio: "[Bio: cupping credentials, liquorer licence, years grading Kenyan and Ethiopian coffee.]" },
  { name: "[Full name]", role: "Export & Logistics Manager", bio: "[Bio: documentation, shipping lines, ports and buyer support.]" },
  { name: "[Full name]", role: "Sourcing & Farmer Relations", bio: "[Bio: field work with cooperatives and washing stations across the region.]" },
];

export const timeline = [
  { year: "2016", title: "Founded in Nairobi", text: "Belmont Coffee House is registered and secures its Coffee Export Licence. First container of Nyeri AA ships to [first market]." },
  { year: "[2017]", title: "Cupping lab opens", text: "In-house cupping laboratory established; liquorer licence granted. Every lot is now graded and scored before offer." },
  { year: "[2018]", title: "First European roaster partners", text: "Direct relationships with specialty roasters in [Germany / the Netherlands / UK]." },
  { year: "[2019]", title: "Expansion to Ethiopia and Uganda", text: "Sourcing partnerships with washing stations in Yirgacheffe and Guji, and Arabica and Robusta suppliers in Uganda." },
  { year: "[2021]", title: "Roasting & private label", text: "Roasting and packing line commissioned, launching Belmont retail coffee and private-label services." },
  { year: "[2023]", title: "Rwanda and Tanzania added", text: "Five-origin offer list completed with Lake Kivu Bourbons and Kilimanjaro and Mbeya Arabica." },
  { year: "[2025]", title: "EUDR traceability programme", text: "Farm-plot geolocation and due-diligence data compiled for lots destined for the EU. [Confirm.]" },
  { year: String(new Date().getFullYear()), title: "Serving [25]+ countries", text: "A decade of trading, with partners across Europe, the Middle East, Asia and North America." },
];

export const whyBelmont = [
  { title: "Full traceability", text: "Every lot carries its washing station, region, altitude, variety and process — plus farm-plot geolocation where required.", icon: "trace" },
  { title: "Uncompromising quality control", text: "Licensed liquorers and Q-graders cup each lot three times: on offer, on approval and before loading. Shipments match the sample.", icon: "quality" },
  { title: "Reliable logistics", text: "Licensed exporter with in-house documentation. We book space, stuff and seal containers, and keep you updated until arrival.", icon: "ship" },
  { title: "Fair partnerships", text: "Long-term relationships with cooperatives and smallholders, transparent premiums and on-time payment to farmers.", icon: "hands" },
] as const;

export const exportSteps = [
  { title: "Sourcing", text: "We buy cherry and parchment from partner cooperatives, estates and washing stations, and select lots at the Nairobi Coffee Exchange or by direct sale." },
  { title: "Milling", text: "Parchment is hulled, polished and density-sorted at licensed dry mills, then optically and hand-sorted to remove defects." },
  { title: "Grading", text: "Beans are screen-graded (AA, AB, PB, Grade 1 and so on), and moisture (10 – 12%) and water activity are measured on every lot." },
  { title: "Cupping", text: "Our licensed liquorers and Q-graders cup and score each lot to SCA protocol. You approve an offer or pre-shipment sample before we pack." },
  { title: "Packing", text: "Packed in new 60 kg jute bags, with GrainPro liners or vacuum boxes for specialty lots, and marked with ICO and lot codes." },
  { title: "Documentation", text: "Export licence, movement permits, phytosanitary certificate, certificate of origin, ICO marks, quality and weight reports, bill of lading." },
  { title: "Shipping", text: "Containers are stuffed and sealed under supervision at our warehouse, then shipped from Mombasa, or Dar es Salaam where needed, to your port." },
];

export const incoterms = [
  { term: "EXW", name: "Ex Works", text: "Collect from our Nairobi warehouse. You arrange all transport and export clearance." },
  { term: "FCA", name: "Free Carrier", text: "We clear for export and hand over to your nominated carrier or forwarder." },
  { term: "FOB", name: "Free On Board — Mombasa", text: "Our most common term. We deliver cleared, loaded on your vessel at Mombasa." },
  { term: "CFR", name: "Cost & Freight", text: "We book and pay ocean freight to your destination port." },
  { term: "CIF", name: "Cost, Insurance & Freight", text: "As CFR, plus marine cargo insurance for 110% of invoice value." },
  { term: "DAP", name: "Delivered At Place", text: "Delivered to your warehouse or roastery, import duties excluded. Selected markets only." },
];

export const shippingRoutes = [
  { region: "Northern Europe", ports: "Rotterdam, Hamburg, Antwerp, Felixstowe", transit: "28 – 35 days" },
  { region: "Mediterranean", ports: "Trieste, Genoa, Barcelona", transit: "20 – 28 days" },
  { region: "Middle East", ports: "Jebel Ali, Jeddah, Dammam", transit: "10 – 16 days" },
  { region: "Asia", ports: "Shanghai, Busan, Yokohama, Singapore", transit: "20 – 30 days" },
  { region: "North America", ports: "New York, Savannah, Oakland, Vancouver", transit: "30 – 42 days" },
  { region: "Oceania", ports: "Sydney, Melbourne, Auckland", transit: "28 – 38 days" },
];

export const leadTimes = [
  { label: "Spot coffee (in Nairobi warehouse)", value: "2 – 3 weeks to FOB" },
  { label: "Forward contracts (current crop)", value: "Shipment window agreed at contract" },
  { label: "Roasted & private label", value: "2 – 4 weeks after artwork approval" },
  { label: "Samples (courier, DHL / FedEx)", value: "3 – 6 business days" },
];

export const paymentTerms = [
  { title: "Cash Against Documents (CAD)", text: "Documents released through your bank on payment. Our standard term for established buyers." },
  { title: "Letter of Credit (L/C)", text: "Irrevocable L/C at sight from a first-class bank, confirmed where required." },
  { title: "Telegraphic Transfer (T/T)", text: "Typically 30% advance on contract, 70% against copy of bill of lading. [Confirm your terms.]" },
];

export const documents = [
  { title: "Phytosanitary Certificate", text: "Issued by KEPHIS (Kenya Plant Health Inspectorate Service) after inspection of every consignment." },
  { title: "Certificate of Origin", text: "Confirms country of origin and supports preferential tariffs where applicable." },
  { title: "ICO Marks", text: "International Coffee Organization identification marks on every bag (country / exporter / lot)." },
  { title: "Quality & Cupping Report", text: "Grade, screen, moisture, defect count, cup score and tasting notes, signed by our liquorer." },
  { title: "Weight & Packing List", text: "Net and gross weights, bag count, lot marks and container and seal numbers." },
  { title: "Bill of Lading & Commercial Invoice", text: "Full set of originals, plus fumigation or organic certificates when required." },
];

export const testimonials = [
  { quote: "Belmont's Kenya AA arrived exactly as the pre-shipment sample cupped. That consistency is why we have rebooked every season since [year].", name: "[Name]", role: "[Head of Green Coffee]", company: "[Specialty roaster], [Germany]" },
  { quote: "Documentation is always complete and on time. Our customs broker has never had to chase a single certificate.", name: "[Name]", role: "[Import Manager]", company: "[Coffee importer], [United Arab Emirates]" },
  { quote: "They helped us develop our private-label espresso from first cupping to finished bags in under six weeks.", name: "[Name]", role: "[Founder]", company: "[Café group], [Nairobi]" },
];

/** Client logos: replace with real logos (with permission) in /public/images/clients. */
export const clients = ["[Roaster · Hamburg]", "[Importer · Dubai]", "[Café Group · Nairobi]", "[Roaster · Seoul]", "[Hotel Group · Doha]", "[Distributor · Rotterdam]"];

export const press = [
  { outlet: "[Publication]", headline: "[Headline mentioning Belmont]", url: "#" },
  { outlet: "[Trade magazine]", headline: "[Feature or interview title]", url: "#" },
  { outlet: "[Business daily]", headline: "[News coverage title]", url: "#" },
];

export const caseStudies = [
  { client: "[European specialty roaster]", title: "A year-round Kenyan programme", result: "[4] containers a year of AA and AB, contracted forward with fixed quality specs and staggered shipments.", image: "sacks" as const },
  { client: "[Gulf hospitality group]", title: "Private-label espresso for [12] hotels", result: "Custom blend developed and roasted in Nairobi, delivered DAP every quarter.", image: "espresso" as const },
];

export const impact = [
  { value: "[12,000]+", label: "Smallholder farmers in our sourcing network" },
  { value: "[38]", label: "Partner cooperatives and washing stations" },
  { value: "[US$ 0.40]/kg", label: "Average quality premium paid above market [confirm]" },
  { value: "[45]%", label: "Women in leadership of partner groups" },
];

export const impactStories = [
  {
    title: "[Name]'s washing station, Nyeri",
    text: "[Real story: how a quality premium or training programme changed outcomes for a specific cooperative — with the farmers' consent and photos.]",
    image: "handPicked" as const,
  },
  {
    title: "Women in Coffee, [Region]",
    text: "[Real story: a women-led group producing its own separated lot, earning a premium and investing it in the community.]",
    image: "pickingBranch" as const,
  },
  {
    title: "Youth agronomy fellows",
    text: "[Real story: young farmers trained in pruning, soil health and rejuvenation, and the yield results on their farms.]",
    image: "plantation" as const,
  },
];

export type Faq = { q: string; a: string; group: "Ordering" | "Samples" | "Shipping" | "Payment" | "Quality" | "Retail" };

export const faqs: Faq[] = [
  { group: "Ordering", q: "What is your minimum order quantity?", a: "For green specialty lots, the minimum is one 30 kg box or 5 to 10 bags (60 kg each), depending on the lot. Commercial grades are sold by the full container: a 20-foot container holds about 320 bags, or 19.2 tonnes. Roasted and private-label orders start at 100 kg per SKU." },
  { group: "Ordering", q: "Can I mix lots in one container?", a: "Yes. Mixed containers are common: you can combine several grades and origins, provided each lot meets its own minimum." },
  { group: "Samples", q: "How do I request samples?", a: "Use our sample request form or WhatsApp our export desk. Offer samples (200 – 300 g per lot) are sent by courier within 3 – 6 business days. We usually waive sample costs for qualified trade buyers; courier charges may apply for some destinations." },
  { group: "Samples", q: "Do you send pre-shipment samples?", a: "Always, on request. The pre-shipment sample is drawn from the actual bags you will receive, and we will not load until you approve it." },
  { group: "Shipping", q: "Which Incoterms do you offer?", a: "EXW, FCA, FOB Mombasa (most common), CFR, CIF and DAP to selected markets. We are happy to work with your nominated forwarder." },
  { group: "Shipping", q: "How long does shipping take?", a: "Indicative transit times from Mombasa: 10 – 16 days to the Middle East, 20 – 30 days to Asia and the Mediterranean, 28 – 35 days to Northern Europe and 30 – 42 days to North America." },
  { group: "Payment", q: "What payment terms do you accept?", a: "Cash Against Documents through your bank, irrevocable Letter of Credit at sight, or telegraphic transfer with an advance. Terms for new buyers are agreed after a short onboarding." },
  { group: "Payment", q: "In which currency do you invoice?", a: "Green coffee is invoiced in US dollars, typically priced as a differential to the ICE \"C\" market (Arabica) or ICE London (Robusta), or as a fixed price. Retail and local orders can be paid in KES." },
  { group: "Quality", q: "Which certifications and licences do you hold?", a: "Belmont holds a Coffee Export Licence, Coffee Movement Permits and a Coffee Liquorer Licence from Kenya's Coffee Directorate, and issues a Certificate of Origin and phytosanitary certificate with every shipment. Organic, Fairtrade and Rainforest Alliance lots are available from certified partner groups [confirm]." },
  { group: "Quality", q: "Are your coffees EUDR compliant?", a: "For lots shipped to the European Union we provide farm-plot geolocation and the traceability data your due-diligence statement needs. [Confirm scope before launch.]" },
  { group: "Retail", q: "Do you ship retail orders internationally?", a: "Yes. We deliver within Nairobi the same or next day, countrywide in Kenya in 1 – 3 days, and internationally by express courier in 3 – 7 business days." },
];
