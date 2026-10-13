import type { ImageKey } from "./images";

/**
 * ORIGINS — countries and growing regions shown on /origins and the map.
 * Figures are typical ranges for each region; adjust to match the farms and
 * washing stations you actually work with.
 */

export type Country = {
  slug: string;
  name: string;
  species: string;
  summary: string;
  harvest: string;
  bagSize: string;
};

export const countries: Country[] = [
  {
    slug: "kenya",
    name: "Kenya",
    species: "Arabica",
    summary:
      "Our home origin. High-altitude volcanic soils, SL28 and SL34 varieties and meticulous washed processing give Kenyan coffee its famous blackcurrant intensity and bright, wine-like acidity.",
    harvest: "Main crop Oct – Dec · Fly crop Apr – Jun",
    bagSize: "60 kg jute",
  },
  {
    slug: "ethiopia",
    name: "Ethiopia",
    species: "Arabica",
    summary:
      "The birthplace of Arabica. Thousands of heirloom landraces grown in forest gardens produce cups of jasmine, bergamot and ripe berry — from crisp washed Yirgacheffe to lush naturals from Guji.",
    harvest: "Oct – Jan",
    bagSize: "60 kg jute",
  },
  {
    slug: "rwanda",
    name: "Rwanda",
    species: "Arabica",
    summary:
      "The land of a thousand hills. Red Bourbon grown by smallholders around Lake Kivu and the southern highlands, delivered to washing stations within hours of picking for clean, sweet, tea-like cups.",
    harvest: "Mar – Jul",
    bagSize: "60 kg jute + GrainPro",
  },
  {
    slug: "tanzania",
    name: "Tanzania",
    species: "Arabica",
    summary:
      "Coffee from the slopes of Kilimanjaro in the north and the Southern Highlands around Mbeya: bright, structured and versatile, with notes of citrus, stone fruit and milk chocolate.",
    harvest: "Jul – Dec (north) · May – Sep (south)",
    bagSize: "60 kg jute",
  },
  {
    slug: "uganda",
    name: "Uganda",
    species: "Arabica & Robusta",
    summary:
      "Africa's largest Robusta producer and home to the native Robusta of its central plains, plus exceptional washed Arabica from Mount Elgon — full-bodied, chocolatey and dependable.",
    harvest: "Arabica Aug – Jan · Robusta Oct – Feb, May – Aug",
    bagSize: "60 kg jute",
  },
];

export type Region = {
  slug: string;
  name: string;
  country: string; // Country slug
  lat: number;
  lng: number;
  altitude: string;
  climate: string;
  rainfall: string;
  soil: string;
  varieties: string[];
  processes: string[];
  harvest: string;
  flavor: string[];
  profile: string;
  story: string;
  image: ImageKey;
};

export const regions: Region[] = [
  {
    slug: "nyeri",
    name: "Nyeri",
    country: "kenya",
    lat: -0.42,
    lng: 36.95,
    altitude: "1,600 – 2,100 m",
    climate: "Cool highland, 13 – 25 °C, bimodal rains",
    rainfall: "1,200 – 1,800 mm/yr",
    soil: "Deep red volcanic nitisols from Mount Kenya",
    varieties: ["SL28", "SL34", "Ruiru 11", "Batian"],
    processes: ["Washed"],
    harvest: "Oct – Dec (main), Apr – Jun (fly)",
    flavor: ["Blackcurrant", "Red grapefruit", "Cane sugar", "Tomato vine"],
    profile: "Intense, juicy and structured, with phosphoric acidity and a long, sweet finish.",
    story:
      "On the south-western slopes of Mount Kenya, smallholders deliver cherry to cooperative washing stations where it is pulped, fermented, washed in clean river water and dried slowly on raised beds. Nyeri is the benchmark for Kenyan quality — and the region where Belmont began.",
    image: "cherriesBranch",
  },
  {
    slug: "kirinyaga",
    name: "Kirinyaga",
    country: "kenya",
    lat: -0.5,
    lng: 37.28,
    altitude: "1,600 – 1,900 m",
    climate: "Highland, 14 – 26 °C, bimodal rains",
    rainfall: "1,100 – 1,600 mm/yr",
    soil: "Volcanic loam, rich in phosphorus",
    varieties: ["SL28", "SL34", "Batian"],
    processes: ["Washed"],
    harvest: "Oct – Dec",
    flavor: ["Blackberry", "Hibiscus", "Blood orange", "Molasses"],
    profile: "Dense, sweet and floral, with a syrupy body.",
    story:
      "Kirinyaga's steep ridges on Mount Kenya's southern flank produce some of the country's most sought-after auction lots. We work with cooperative factories that separate day-lots and grade meticulously to AA, AB and PB.",
    image: "cherriesCluster",
  },
  {
    slug: "muranga",
    name: "Murang'a",
    country: "kenya",
    lat: -0.72,
    lng: 37.15,
    altitude: "1,500 – 1,900 m",
    climate: "Sub-humid highland, 14 – 27 °C",
    rainfall: "1,000 – 1,600 mm/yr",
    soil: "Red volcanic soils on Aberdare foothills",
    varieties: ["SL28", "Ruiru 11", "Batian"],
    processes: ["Washed"],
    harvest: "Oct – Dec",
    flavor: ["Red currant", "Lime", "Brown sugar"],
    profile: "Bright and clean with balanced sweetness — superb value for specialty blends.",
    story:
      "Between the Aberdares and Mount Kenya, Murang'a's farms sit on fertile ridges that drain into the Tana. Its coffees offer classic Kenyan character at accessible prices, ideal for roasters building year-round blends.",
    image: "pickingBranch",
  },
  {
    slug: "yirgacheffe",
    name: "Yirgacheffe",
    country: "ethiopia",
    lat: 6.16,
    lng: 38.2,
    altitude: "1,750 – 2,200 m",
    climate: "Cool, misty highlands, 12 – 24 °C",
    rainfall: "1,200 – 1,800 mm/yr",
    soil: "Well-drained, iron-rich clay loam",
    varieties: ["Ethiopian heirloom (74110, 74112, Kurume)"],
    processes: ["Washed", "Natural"],
    harvest: "Oct – Jan",
    flavor: ["Jasmine", "Bergamot", "Lemon zest", "Honey"],
    profile: "Delicate, floral and tea-like, with crystalline citrus acidity.",
    story:
      "In Gedeo zone, coffee grows in garden plots alongside enset and shade trees. Washing stations collect cherry from thousands of smallholders and process it into the elegant, floral cups that made Yirgacheffe world-famous.",
    image: "ethiopia",
  },
  {
    slug: "guji",
    name: "Guji",
    country: "ethiopia",
    lat: 5.9,
    lng: 38.6,
    altitude: "1,900 – 2,300 m",
    climate: "High, cool and forested, 10 – 22 °C",
    rainfall: "1,400 – 2,000 mm/yr",
    soil: "Deep, fertile forest loam",
    varieties: ["Ethiopian heirloom"],
    processes: ["Natural", "Washed"],
    harvest: "Nov – Jan",
    flavor: ["Strawberry", "Blueberry", "Cacao nib", "Rose"],
    profile: "Lush, fruit-forward naturals with a creamy body and clean finish.",
    story:
      "Guji's semi-forest farms sit among some of the highest coffee terrain in Ethiopia. Sun-dried on raised beds for three to four weeks, its natural-process lots are some of the most expressive coffees we offer.",
    image: "dryingBeds",
  },
  {
    slug: "lake-kivu",
    name: "Lake Kivu",
    country: "rwanda",
    lat: -2.33,
    lng: 29.12,
    altitude: "1,500 – 2,000 m",
    climate: "Mild lakeside highland, 15 – 25 °C",
    rainfall: "1,300 – 1,700 mm/yr",
    soil: "Volcanic, well-drained hillside soils",
    varieties: ["Red Bourbon"],
    processes: ["Fully washed", "Honey", "Natural"],
    harvest: "Mar – Jul",
    flavor: ["Red apple", "Black tea", "Orange blossom", "Caramel"],
    profile: "Sweet, clean and juicy with a refined, tea-like structure.",
    story:
      "Along the shores of Lake Kivu, smallholders deliver cherry to washing stations on the same day it is picked. Careful floating, double fermentation and slow drying give these Bourbons their exceptional clarity.",
    image: "washedParchment",
  },
  {
    slug: "kilimanjaro",
    name: "Kilimanjaro",
    country: "tanzania",
    lat: -3.25,
    lng: 37.35,
    altitude: "1,200 – 1,900 m",
    climate: "Montane, 15 – 28 °C",
    rainfall: "1,000 – 2,000 mm/yr",
    soil: "Rich volcanic loam",
    varieties: ["Bourbon", "Kent", "N39"],
    processes: ["Washed"],
    harvest: "Jul – Dec",
    flavor: ["Meyer lemon", "Apricot", "Milk chocolate"],
    profile: "Bright and balanced with a smooth chocolate base.",
    story:
      "On the southern slopes of Africa's highest mountain, coffee has been grown by Chagga farmers for more than a century. Tanzanian AA and peaberry from Kilimanjaro remain staples for roasters worldwide.",
    image: "kilimanjaro",
  },
  {
    slug: "mbeya",
    name: "Mbeya",
    country: "tanzania",
    lat: -8.9,
    lng: 33.45,
    altitude: "1,400 – 2,000 m",
    climate: "Southern highlands, 12 – 26 °C",
    rainfall: "900 – 1,600 mm/yr",
    soil: "Volcanic and lateritic loams",
    varieties: ["Bourbon", "Kent", "N39"],
    processes: ["Washed"],
    harvest: "May – Sep",
    flavor: ["Plum", "Black cherry", "Cocoa"],
    profile: "Rounded, sweet and full-bodied — a dependable base for espresso blends.",
    story:
      "Tanzania's Southern Highlands produce the majority of the country's Arabica. Volumes are reliable and quality has risen sharply as more central processing units invest in washing and grading.",
    image: "plantation",
  },
  {
    slug: "mount-elgon",
    name: "Mount Elgon (Bugisu)",
    country: "uganda",
    lat: 1.13,
    lng: 34.35,
    altitude: "1,600 – 2,300 m",
    climate: "Cool volcanic highland, 14 – 25 °C",
    rainfall: "1,500 – 2,000 mm/yr",
    soil: "Deep volcanic loam",
    varieties: ["SL14", "SL28", "Nyasaland"],
    processes: ["Washed", "Natural"],
    harvest: "Aug – Jan",
    flavor: ["Dark cherry", "Raisin", "Dark chocolate", "Spice"],
    profile: "Heavy body, winey fruit and a lingering chocolate finish.",
    story:
      "The Bagisu people have cultivated Arabica on Mount Elgon's slopes for generations. Washed Bugisu AA is Uganda's flagship Arabica — rich, full and remarkably consistent.",
    image: "handPicked",
  },
  {
    slug: "central-uganda",
    name: "Central Uganda",
    country: "uganda",
    lat: 0.35,
    lng: 32.4,
    altitude: "1,100 – 1,500 m",
    climate: "Warm, humid lake basin, 17 – 29 °C",
    rainfall: "1,100 – 1,500 mm/yr",
    soil: "Ferralitic red clays",
    varieties: ["Robusta (Nganda, Erecta)"],
    processes: ["Natural", "Washed"],
    harvest: "Oct – Feb (main), May – Aug (fly)",
    flavor: ["Cocoa", "Roasted peanut", "Molasses"],
    profile: "Clean, low-acid Robusta with heavy crema — prized for espresso and soluble.",
    story:
      "Robusta is indigenous to Uganda's Lake Victoria basin. Grown by smallholders beneath banana and shade trees, it is among the cleanest Robustas in the world and increasingly offered as Fine Robusta.",
    image: "greenBeans",
  },
];

export const headquarters = { name: "Belmont HQ — Nairobi", lat: -1.2864, lng: 36.8172 };

export const countryName = (slug: string) => countries.find((c) => c.slug === slug)?.name ?? slug;
export const regionsFor = (country: string) => regions.filter((r) => r.country === country);
