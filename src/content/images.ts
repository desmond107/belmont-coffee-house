/**
 * IMAGE REGISTRY — every photo on the site is referenced by key from here.
 *
 * All current files are royalty-free CC0 PLACEHOLDERS (sources in
 * /public/images/CREDITS.json). To use your own photography, drop a file into
 * /public/images and change `src` below — every page using that key updates.
 * `brief` describes the real shot to commission; in development it is shown
 * on the image as a small label (set NEXT_PUBLIC_SHOW_PHOTO_BRIEFS=false to hide).
 */
export type ImageKey = keyof typeof images;

export type SiteImage = {
  src: string;
  alt: string;
  brief: string;
  width: number;
  height: number;
  placeholder: boolean;
};

const img = (src: string, width: number, height: number, alt: string, brief: string): SiteImage => ({
  src: `/images/${src}`,
  width,
  height,
  alt,
  brief,
  placeholder: true,
});

export const images = {
  hero: img("hero-drying-sunset.webp", 1024, 683, "Ripe coffee cherries drying on raised beds at sunset", "Cinematic wide: raised African drying beds at golden hour, Belmont partner station, Nyeri or Kirinyaga"),
  cherriesBranch: img("cherries-branch.webp", 1024, 683, "Clusters of ripe red coffee cherries on the branch", "Macro: ripe SL28 cherries on the branch, morning light, Mt Kenya foothills"),
  cherriesRipening: img("cherries-ripening.webp", 1024, 680, "Coffee cherries ripening from green to red", "Close-up of ripening cherries — use for harvest/seasonality sections"),
  cherriesCluster: img("cherries-cluster.webp", 1024, 681, "Coffee branch heavy with cherries", "Farm detail: laden branch, shade trees in background"),
  handPicked: img("hand-picked-cherries.webp", 1024, 768, "A farmer's hands holding freshly picked coffee cherries", "Portrait-quality: partner farmer's hands with selectively picked red cherries (signed model release)"),
  pickingBranch: img("picking-branch.webp", 1024, 683, "Hand picking ripe cherries from a coffee branch", "Hand-picking in action at a partner farm"),
  dryingBeds: img("drying-beds.webp", 1024, 680, "Hands turning coffee on a raised drying bed", "Worker turning parchment on raised beds at a washing station"),
  greenBeans: img("green-beans.webp", 1024, 683, "Hand running through green coffee beans", "Green beans after milling — hand in a jute sack or sorting tray, Belmont warehouse"),
  washedParchment: img("washed-parchment.webp", 1024, 683, "Freshly washed coffee in parchment held over a bucket", "Fermentation/washing channel at a partner wet mill"),
  sacks: img("sacks-stacked.webp", 1024, 574, "Stacked jute sacks of green coffee", "Warehouse: stacked 60 kg jute bags with Belmont stencil and ICO marks"),
  sackHands: img("sack-hands.webp", 680, 1024, "Hands lifting roasted coffee beans from a jute sack", "Vertical: roasted beans poured from a branded Belmont sack"),
  roasterCooling: img("roaster-cooling.webp", 1024, 768, "Freshly roasted coffee cooling in a roaster tray", "Belmont roastery: cooling tray mid-turn"),
  roasterDrum: img("roaster-drum.webp", 1024, 684, "Coffee beans turning in a roaster cooling tray", "Moody roastery detail for the roasted range"),
  roastedBeans: img("roasted-beans.webp", 960, 636, "Close-up of medium-roasted coffee beans", "Macro of Belmont Highland Reserve whole beans"),
  ground: img("ground-coffee.webp", 1024, 683, "Freshly ground coffee in an espresso portafilter", "Ground coffee in branded bag or portafilter"),
  pourOver: img("pour-over.webp", 1024, 576, "Pour-over coffee brewer in low light", "Pour-over of a Belmont Kenyan AA, dark editorial styling"),
  pourOverWindow: img("pour-over-window.webp", 1024, 577, "Pour-over brewer on a wooden counter by a window", "Café partner brew bar"),
  espresso: img("espresso.webp", 960, 640, "Espresso extracting into a white cup", "Espresso extraction at a partner café or Belmont tasting room"),
  giftCup: img("gift-cup-beans.webp", 960, 640, "Espresso cup filled with roasted coffee beans", "Styled gift set flat-lay: Belmont boxes, tasting cards, ribbon"),
  latte: img("latte.webp", 960, 640, "Latte with rosetta latte art held over an espresso machine", "Café customer moment for retail section"),
  port: img("container-port.webp", 1024, 683, "Aerial view of a container port", "Port of Mombasa container yard, or a Belmont container being stuffed"),
  ship: img("cargo-ship.webp", 960, 640, "Container ship at sea", "Vessel departing Mombasa"),
  plantation: img("plantation-rows.webp", 1024, 768, "Rows of coffee trees under shade trees", "Wide landscape of a partner farm with shade trees, Central Kenya"),
  ethiopia: img("ethiopia-highlands.webp", 683, 1024, "Road winding through green Ethiopian highlands", "Ethiopian highlands, Sidama or Guji coffee country"),
  kilimanjaro: img("kilimanjaro.webp", 1024, 659, "Snow-capped Mount Kilimanjaro above green plains", "Kilimanjaro slopes with coffee in the foreground"),
  portafilter: img("portafilter.webp", 1024, 683, "Ground coffee and whole beans in a portafilter", "Cupping table / Q-grader at work in the Belmont lab"),
  scoop: img("scoop-beans.webp", 960, 720, "Measuring scoop of roasted coffee beans", "Sample roast being measured for cupping"),
  darkRoastSack: img("dark-roast-sack.webp", 1024, 683, "Burlap sack of dark roasted coffee beans", "Roasted coffee in jute — private label / wholesale roasted"),
} satisfies Record<string, SiteImage>;
