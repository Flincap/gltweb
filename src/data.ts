import { FaYoutube, FaInstagram, FaXTwitter, FaTelegram } from "react-icons/fa6";

export const PAGES = [
  { id: "", label: "Home", path: "/" },
  { id: "who-we-are", label: "Who We Are", path: "/who-we-are" },
  { id: "extensions", label: "Our Extensions", path: "/extensions" },
  { id: "im-new", label: "I'm New", path: "/im-new" },
  { id: "events", label: "Events", path: "/events" },
  { id: "sermons", label: "Sermons", path: "/sermons" },
  { id: "contact", label: "Contact Us", path: "/contact" },
] as const;

export type Extension = {
  name: string;
  city: string;
  country: string;
  flag: string;
  region: "Africa" | "Europe" | "North America";
  hq?: boolean;
  smr: string;
  phone?: string;
  email?: string;
  address: string;
  tz: string;
  services: { label: string; time: string }[];
  bibleStudy?: string;
  note?: string;
  /** Handle only, no "@" and no URL. Built into a full link by extensionSocials(). */
  instagram?: string;
  x?: string;
};

export const EXTENSIONS: Extension[] = [
  {
    name: "Lekki (International Headquarters)",
    instagram: "gltlekki",
    x: "gltlekki",
    city: "Lekki, Lagos",
    country: "Nigeria",
    flag: "🇳🇬",
    region: "Africa",
    hq: true,
    smr: "Pastor Olaolu and Pastor Adekemi Oluwadare",
    phone: "+234 906 280 7057",
    email: "enquiries@glt.church",
    address:
      "Piccadilly Suites, behind Kon-X, Igbo-Efon Bus Stop, Lekki-Epe Expressway, Lekki, Lagos",
    tz: "WAT",
    services: [
      { label: "1st Service", time: "Sun 7:45am" },
      { label: "2nd Service", time: "Sun 10:00am" },
      { label: "SMS (1st Sun)", time: "8:00am" },
    ],
    bibleStudy: "Tue 6:30pm – 8:00pm",
  },
  {
    name: "Ikeja",
    instagram: "gltikeja",
    x: "gltikeja",
    city: "Ikeja, Lagos",
    country: "Nigeria",
    flag: "🇳🇬",
    region: "Africa",
    smr: "Pastor Adebayo and Pastor Temitayo Fanimokun",
    phone: "0906 280 7061",
    email: "gltsecretariatlagos@gmail.com",
    address: "142, Oba Akran Avenue, Ikeja, Lagos",
    tz: "WAT",
    services: [
      { label: "1st Service", time: "Sun 8:00am" },
      { label: "2nd Service", time: "Sun 10:15am" },
      { label: "SMS (Last Sun)", time: "8:00am" },
    ],
    bibleStudy: "Wed 6:00pm – 7:35pm",
  },
  {
    name: "Egbeda",
    instagram: "gltegbeda",
    city: "Egbeda, Lagos",
    country: "Nigeria",
    flag: "🇳🇬",
    region: "Africa",
    smr: "Pastor Adeniyi and Pastor Enitan Akinyemi",
    phone: "0806 249 0675",
    email: "gltegbeda@gmail.com",
    address:
      "3rd Floor, 117 Egbeda-Idimu Road, Beside RCCG Car Park, Abule Odu Bus Stop, Egbeda, Lagos",
    tz: "WAT",
    services: [
      { label: "Sunday Service", time: "Sun 9:00am" },
      { label: "SMS (Last Sun)", time: "9:00am" },
    ],
    bibleStudy: "Wed 6:00pm – 8:00pm",
  },
  {
    name: "Ajah",
    instagram: "gltajah",
    city: "Ajah, Lagos",
    country: "Nigeria",
    flag: "🇳🇬",
    region: "Africa",
    smr: "Pastor Akinola Akintayo",
    email: "gltajah54@gmail.com",
    address:
      "Block D3, Suite 479, HFP Complex, By Abraham Adesanya Traffic Light, Lekki-Epe Expressway, Ajah, Lagos",
    tz: "WAT",
    services: [
      { label: "Sunday Service", time: "Sun 9:30am" },
      { label: "SMS (Last Sun)", time: "9:30am" },
    ],
    note: "Members join HQ online for Bible Study",
  },
  {
    name: "Isolo",
    instagram: "gltisolo",
    city: "Isolo, Lagos",
    country: "Nigeria",
    flag: "🇳🇬",
    region: "Africa",
    smr: "Pastor Dr. Olayide Jinadu and Pastor Oluwaseun Yide-Jinadu",
    email: "gltisolo65@gmail.com",
    address: "45, Enoma Street, Off Ago Palace Way, Isolo, Lagos",
    tz: "WAT",
    services: [
      { label: "Sunday Service", time: "Sun 9:00am" },
      { label: "SMS (Last Sun)", time: "9:00am" },
    ],
    bibleStudy: "Wed 6:00pm – 8:00pm",
  },
  {
    name: "Abuja",
    instagram: "gltabuja",
    x: "gltabuja",
    city: "Gwarinpa, Abuja",
    country: "Nigeria",
    flag: "🇳🇬",
    region: "Africa",
    smr: "Pastor Tope and Pastor Kenny Olowoporoku",
    email: "gltabuja@gmail.com",
    address:
      "GLT Abuja Auditorium, By Gilmore Junction, Behind H-Medix, 2nd Avenue, Gwarinpa, Abuja",
    tz: "WAT",
    services: [
      { label: "1st Service", time: "Sun 9:00am" },
      { label: "2nd Service", time: "Sun 11:30am" },
      { label: "SMS (Last Sun)", time: "9:00am" },
    ],
    bibleStudy: "Wed 6:00pm – 7:45pm",
  },
  {
    name: "Gwagwalada",
    instagram: "gltgwagwalada",
    city: "Gwagwalada, Abuja",
    country: "Nigeria",
    flag: "🇳🇬",
    region: "Africa",
    smr: "Pastor Samuel and Pastor Temitayo Sam-Fagade",
    phone: "0708 888 4995",
    email: "gltgwagwalada@gmail.com",
    address:
      "Line C10, Mike Oga Street, Behind Toddlers' Haven School, By MTN Mast, Hajj Camp, Gwagwalada, Abuja",
    tz: "WAT",
    services: [
      { label: "Sunday Service", time: "Sun 9:00am" },
      { label: "SMS (Last Sun)", time: "9:00am" },
    ],
    bibleStudy: "Wed 6:00pm – 8:00pm",
  },
  {
    name: "Ibadan",
    instagram: "gltibadan",
    x: "gltibadan",
    city: "Ibadan, Oyo State",
    country: "Nigeria",
    flag: "🇳🇬",
    region: "Africa",
    smr: "Pastor Oyelere and Pastor Opeyemi Atoyebi",
    phone: "0906 280 7062",
    email: "gltibadan@gmail.com",
    address: "No. 5, Agricola Street, Opp. UI Second Gate, Ibadan, Oyo State",
    tz: "WAT",
    services: [
      { label: "1st Service", time: "Sun 7:45am" },
      { label: "2nd Service", time: "Sun 10:00am" },
      { label: "3rd Service", time: "Sun 12:15pm" },
      { label: "SMS (Last Sun)", time: "7:45am" },
    ],
    bibleStudy: "Wed 5:30pm – 7:45pm",
  },
  {
    name: "New Garage",
    instagram: "gltnewgarage",
    city: "New Garage, Ibadan",
    country: "Nigeria",
    flag: "🇳🇬",
    region: "Africa",
    smr: "Pastor Emmanuel and Pastor Faith Falude",
    phone: "0805 350 9418",
    email: "gltchallenge@gmail.com",
    address: "Susannah Adesanya House, Orita Challenge, Ibadan",
    tz: "WAT",
    services: [
      { label: "1st Service", time: "Sun 10:00am" },
      { label: "2nd Service", time: "Sun 12:00pm" },
      { label: "SMS (Last Sun)", time: "10:00am" },
    ],
    bibleStudy: "Wed 5:50pm – 6:30pm",
    note: "Members also join HQ online",
  },
  {
    name: "Ogbomoso",
    instagram: "gltogbomosho",
    city: "Ogbomoso, Oyo State",
    country: "Nigeria",
    flag: "🇳🇬",
    region: "Africa",
    smr: "Pastor Ibukun and Pastor Adepeju Okunade",
    phone: "0806 536 7355",
    email: "gltogbomoso@gmail.com",
    address:
      "Olawusi Building, 2nd Floor, Opposite Anglican Grammar School, Starlight, Ogbomoso",
    tz: "WAT",
    services: [
      { label: "Sunday Service", time: "Sun 9:00am" },
      { label: "SMS (Last Sun)", time: "9:00am" },
    ],
    bibleStudy: "Wed 5:30pm – 7:30pm",
  },
  {
    name: "Ile-Ife",
    instagram: "gltife",
    x: "gltife",
    city: "Ile-Ife, Osun State",
    country: "Nigeria",
    flag: "🇳🇬",
    region: "Africa",
    smr: "Pastor Tayo and Pastor Olamide Akanbi",
    phone: "+234 906 280 7060",
    email: "gltife2021@gmail.com",
    address: "Ibadan Road, Ile-Ife, Osun State",
    tz: "WAT",
    services: [
      { label: "1st Service", time: "Sun 8:00am" },
      { label: "2nd Service", time: "Sun 10:00am" },
      { label: "SMS (Last Sun)", time: "8:00am" },
    ],
    bibleStudy: "Wed 5:30pm – 7:30pm",
  },
  {
    name: "Phase 2, OAUTHC",
    instagram: "gltphase2oauthc",
    city: "Ile-Ife, Osun State",
    country: "Nigeria",
    flag: "🇳🇬",
    region: "Africa",
    smr: "Pastor Bode Afeniforo",
    phone: "0803 078 8132",
    email: "gltphaseiioauthc@gmail.com",
    address:
      "Famous Hall, Famous Shopping Complex, Opp. OAUTHC Phase 2 Gate, Ile-Ife, Osun State",
    tz: "WAT",
    services: [
      { label: "1st Service", time: "Sun 8:00am" },
      { label: "2nd Service", time: "Sun 10:00am" },
      { label: "SMS (Last Sun)", time: "8:00am" },
    ],
    bibleStudy: "Wed 5:30pm – 8:00pm",
  },
  {
    name: "Osogbo",
    instagram: "gltosogbochurch",
    city: "Osogbo, Osun State",
    country: "Nigeria",
    flag: "🇳🇬",
    region: "Africa",
    smr: "Pastor Olakunmi and Pastor OreOluwa Bolaji",
    phone: "0813 515 5208",
    email: "gltosogbo@gmail.com",
    address:
      "Behind Seventh July Filling Station, Agunbelewo, Osogbo-Ilobu Road, Osogbo",
    tz: "WAT",
    services: [
      { label: "1st Service", time: "Sun 8:00am" },
      { label: "2nd Service", time: "Sun 10:00am" },
      { label: "SMS (Last Sun)", time: "8:00am" },
    ],
    bibleStudy: "Wed 5:30pm – 7:30pm",
  },
  {
    name: "Ilesa",
    instagram: "glt.ilesa",
    x: "gltilesa",
    city: "Ilesa, Osun State",
    country: "Nigeria",
    flag: "🇳🇬",
    region: "Africa",
    smr: "Pastor Akinola and Pastor Comfort Odedeyi",
    email: "gltilesa@gmail.com",
    address:
      "Km 4, Old Ife Road, Opposite Ayeni Foundation Hotel, Ido-Ijesa, Ilesa",
    tz: "WAT",
    services: [
      { label: "1st Service", time: "Sun 9:00am" },
      { label: "2nd Service", time: "Sun 10:00am" },
      { label: "SMS (Last Sun)", time: "9:00am" },
    ],
    bibleStudy: "Wed 5:30pm – 7:30pm",
    note: "Members also join HQ online",
  },
  {
    name: "Akure",
    instagram: "gltakure",
    city: "Akure, Ondo State",
    country: "Nigeria",
    flag: "🇳🇬",
    region: "Africa",
    smr: "Pastor Adetayo and Pastor Folashade Bade-Adefioye",
    email: "gltakure00@gmail.com",
    address:
      "GLT Akure Auditorium, Beside SAMDEK Gas Station, South Gate Road, FUTA Junction, Akure, Ondo State",
    tz: "WAT",
    services: [
      { label: "1st Service", time: "Sun 8:00am" },
      { label: "2nd Service", time: "Sun 10:00am" },
      { label: "SMS (Last Sun)", time: "8:00am" },
    ],
    bibleStudy: "Wed 5:30pm – 7:45pm",
  },
  {
    name: "Ondo",
    city: "Ondo City, Ondo State",
    country: "Nigeria",
    flag: "🇳🇬",
    region: "Africa",
    smr: "Pastor Taiwo and Pastor Tolani Adekola",
    phone: "0703 443 4175",
    email: "gltondomail@gmail.com",
    address:
      "5A, Odosida Road, Opposite St. Stephen's Grammar School, Ondo City",
    tz: "WAT",
    services: [
      { label: "1st Service", time: "Sun 8:00am" },
      { label: "2nd Service", time: "Sun 10:15am" },
      { label: "SMS (Last Sun)", time: "8:00am" },
    ],
    bibleStudy: "Wed 5:30pm – 7:30pm",
  },
  {
    name: "Bayelsa",
    instagram: "gltbayelsa",
    city: "Yenagoa, Bayelsa State",
    country: "Nigeria",
    flag: "🇳🇬",
    region: "Africa",
    smr: "Pastor Zigbolomoghan and Pastor Abosede Singer",
    phone: "0806 390 9693",
    email: "gltbayelsa@gmail.com",
    address:
      "68, INEC Road, Beside Emis Event Centre, Kpansia-Epie, Yenagoa, Bayelsa State",
    tz: "WAT",
    services: [
      { label: "Sunday Service", time: "Sun 9:00am" },
      { label: "SMS (Last Sun)", time: "9:00am" },
    ],
    bibleStudy: "Wed 5:00pm – 7:00pm",
  },
  {
    name: "Enugu",
    instagram: "gltenugu",
    city: "Enugu",
    country: "Nigeria",
    flag: "🇳🇬",
    region: "Africa",
    smr: "Pastor Paul and Pastor Kemi Augustine",
    address:
      "148 Agbani Road, Igbariam Bus Stop, Opposite Kilimanjaro, Beside Emmanuel Plaza, Enugu",
    tz: "WAT",
    services: [
      { label: "Sunday Service", time: "Sun 8:00am" },
      { label: "SMS (Last Sun)", time: "8:00am" },
    ],
    bibleStudy: "Wed 5:30pm",
  },
  {
    name: "Accra",
    instagram: "gltaccra",
    city: "North Legon, Accra",
    country: "Ghana",
    flag: "🇬🇭",
    region: "Africa",
    smr: "Pastor Igbekeleoluwa Moses",
    address:
      "Teamaa Trading Enterprise, Opposite PUMA Filling Station, Agbogba-Ashongman Road, North Legon, Accra",
    tz: "GMT",
    services: [{ label: "Sunday Service", time: "Sun 9:00am" }],
    bibleStudy: "Wed 5:30pm",
  },
  {
    name: "Birmingham",
    instagram: "gltbirmingham",
    city: "Birmingham",
    country: "United Kingdom",
    flag: "🇬🇧",
    region: "Europe",
    smr: "Pastor Oluwafemi Olapade",
    phone: "+44 7823 564016",
    email: "gltbirmingham@gmail.com",
    address: "115 Holford Drive, Perry Barr, Birmingham B42 2TU, United Kingdom",
    tz: "UK time",
    services: [{ label: "Sunday Service", time: "Sun 11:00am" }],
    note: "Members join HQ online for Bible Study",
  },
  {
    name: "Houston",
    instagram: "glthouston",
    city: "Houston, Texas",
    country: "United States",
    flag: "🇺🇸",
    region: "North America",
    smr: "Pastor Sam and Pastor Bunmi Adebiyi",
    phone: "+1 832-617-1222",
    email: "glthouston@gmail.com",
    address: "14435 Longview Street, Houston, TX 77015, USA",
    tz: "CT",
    services: [{ label: "Sunday Service", time: "Sun 9:30am" }],
    bibleStudy: "Tue 7:30pm (online)",
  },
  {
    name: "Dallas",
    instagram: "gltdallas",
    city: "Richardson, Texas",
    country: "United States",
    flag: "🇺🇸",
    region: "North America",
    smr: "Pastor Dewunmi and Pastor Abby Adediji",
    address: "777 S Central Expressway, Suite 7T, Richardson, TX 75080, USA",
    tz: "CT",
    services: [{ label: "Sunday Service", time: "Sun 9:00am" }],
    bibleStudy: "Wed 6:30pm",
  },
  {
    name: "Calgary",
    instagram: "gltcalgary",
    city: "Calgary, Alberta",
    country: "Canada",
    flag: "🇨🇦",
    region: "North America",
    smr: "Pastor Tito Ilori",
    phone: "+1 780-901-0782",
    email: "gltchurchcalgary@gmail.com",
    address: "Unit 16, 2221 41 Ave NE, Calgary, AB T2E 6P2, Canada",
    tz: "MT",
    services: [{ label: "Sunday Service", time: "Sun 9:00am" }],
    bibleStudy: "Tue 7:00pm – 8:30pm (online)",
  },
];

export const ONIONS = [
  {
    title: "The Word",
    body: "We are a strong Word church. We have a biting hunger for God's Word and accept it as truth in all circumstances. The Word is taught with simplicity, clarity, and power, bringing understanding and transformation. We do not go by feelings; we go by the Word. God says it, we believe it, we act on it, and that settles it.",
  },
  {
    title: "Strong Love Walk",
    body: "We are lovers of God and lovers of people. Our warmth, friendliness, and sense of family are evident. We live offence-free, quick to forgive, and committed to loving one another and reaching out to others.",
  },
  {
    title: "Worship",
    body: "Our worship is warm, hearty, boundless, and extravagant. We honour God with all our hearts and give Him all of us. Our worship flows from the revelation of the Word; it is a heartfelt response to God, not just singing.",
  },
  {
    title: "Flows of the Spirit",
    body: "The presence of the Holy Spirit is palpable in our services. We are open and sensitive to His leading, and we experience diverse manifestations of the Spirit. Rejoicings and shouts of joy, based on the revelation of the Word, are a key part of who we are.",
  },
  {
    title: "All Kinds of Prayer",
    body: "Prayer is our way of life. It is a flow. Everything we do is backed by strong, consistent, Spirit-led and Word-based prayer. Our strength is from God, and our results are divine.",
  },
  {
    title: "Attacking Evangelism",
    body: "We are strongly evangelistic. We are passionate about soul winning and actively engaged in reaching the unsaved. Our evangelism is deliberate, strategic, and powered by the Holy Spirit.",
  },
  {
    title: "Mentoring & Counselling",
    body: "We are committed to raising people. Through mentoring and counselling, we equip people for life, ministry, and destiny. Anyone who is willing and open will surely grow.",
  },
  {
    title: "Excellence",
    body: "Excellence is who we are. We give our best in all we do, paying attention to detail and maintaining high standards. We may exceed the mark, but we never go below it. We keep growing and improving.",
  },
  {
    title: "Honour",
    body: "We have a strong culture of honour. We recognize, celebrate, and respond rightly to the grace of God upon our Setman, leaders, and one another. We know that honour is the key to attracting grace.",
  },
  {
    title: "Followership",
    body: "Followership is a hearty and joyful response to godly leadership. We follow our Setman, receive and act on the Word, and partake of the grace and vision of the house.",
  },
  {
    title: "Cheerful & Sacrificial Giving",
    body: "We believe in giving cheerfully, willfully, and sacrificially. We do not give under compulsion. We give our resources, time, and skills for the advancement of the Gospel and the expansion of God's Kingdom.",
  },
];

export const FAQS = [
  {
    q: "What should I expect when I visit for the first time?",
    a: "You can expect a warm welcome. Our service lasts about 2 hours (apart from SMS, which can be a bit longer being a single service) and includes contemporary worship music, a practical Bible-based message, and a time of prayer. We'll have someone ready to help you park, walk in, find seats, and check your children in for children's ministry.",
  },
  {
    q: "I'm not sure I believe in God yet. Can I still come?",
    a: "Absolutely. You don't need to have faith figured out to walk through our doors. You're welcome to sit, listen, ask questions, or just observe. No pressure.",
  },
  {
    q: "Do you have programs for my kids and teenagers?",
    a: "Yes. Your child's safety and growth matter to us. They have well-curated services that keep them engaged.",
  },
  {
    q: "How can I get involved or serve?",
    a: "The best way to serve is to join our Membership Academy or Foundation Bible School. Speak with any of the ushers and you will be guided.",
  },
];

export const GIVING = {
  main: {
    bank: "GTBank",
    accountName: "God's Love Tabernacle International Church",
    accountNumber: "0037371491",
  },
  dom: {
    bank: "GTBank",
    accountName: "God's Love Tabernacle International Church",
    sortCode: "058294910",
    accounts: [
      { currency: "Dollars (USD)", number: "0037371501" },
      { currency: "Pounds (GBP)", number: "0037371518" },
      { currency: "Euro (EUR)", number: "0037371525" },
    ],
  },
  northAmerica: {
    bank: "Bank of America",
    accountName: "God's Love Tabernacle International Church",
    accountNumber: "488124373439",
    zelle: "gltnorthamerica01@gmail.com",
  },
};

export const LINKS = {
  youtube: "https://youtube.com/c/GLTChurchWorldwide",
  mixlr: "https://mixlr.com/gltchurchlive",
  telegram: "https://t.me/gltlekkimessages",
  leverage: "https://t.me/s/LeverageDevotional",
  announcements: "https://bit.ly/gltlekki",
  email: "enquiries@glt.church",
  phone: "+2349062807057",
  phoneDisplay: "+234 906 280 7057",
  hqAddress:
    "Piccadilly Suites, behind Kon-X, Igbo-Efon Bus Stop, Lekki-Epe Expressway, Lekki, Lagos",
};

export const mapsLink = (address: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

/* Where to join a live service. Used by the "Join Live Online" dialog. */
export const WATCH_LIVE = [
  {
    id: "youtube",
    name: "YouTube",
    tagline: "Watch in video",
    desc: "The full service in picture and sound on GLT Church Worldwide. Best if you want to see the service as it happens.",
    href: LINKS.youtube,
    cta: "Watch on YouTube",
  },
  {
    id: "mixlr",
    name: "Mixlr",
    tagline: "Listen in audio",
    desc: "Live audio that holds up on a slow connection and sips your data. Best on the move.",
    href: LINKS.mixlr,
    cta: "Listen on Mixlr",
  },
] as const;

/* Handles are stored bare (no "@", no URL) so a bad value can never smuggle in
   a javascript: or data: link. Anything but letters, digits, dot and underscore
   is dropped before the URL is built. */
const handle = (raw: string) => raw.trim().replace(/^@/, "").replace(/[^A-Za-z0-9._]/g, "");

export const instagramLink = (raw: string) =>
  `https://www.instagram.com/${handle(raw)}/`;

export const xLink = (raw: string) => `https://x.com/${handle(raw)}`;

export function extensionSocials(ext: Extension) {
  const out: { key: string; icon: typeof FaInstagram; href: string; label: string }[] = [];
  if (ext.instagram) {
    out.push({
      key: "instagram",
      icon: FaInstagram,
      href: instagramLink(ext.instagram),
      label: `GLT ${ext.name} on Instagram (@${handle(ext.instagram)})`,
    });
  }
  if (ext.x) {
    out.push({
      key: "x",
      icon: FaXTwitter,
      href: xLink(ext.x),
      label: `GLT ${ext.name} on X (@${handle(ext.x)})`,
    });
  }
  return out;
}

/* Options for the "Which GLT are you writing to?" dropdown on the contact page.
   The international headquarters always sits first. */
export const CONTACT_LOCATIONS: string[] = [
  "International Headquarters (Lekki, Lagos)",
  ...EXTENSIONS.filter((e) => !e.hq).map((e) => `GLT ${e.name}`),
  "Not sure / other",
];

export const SOCIALS = {
  youtube: "https://youtube.com/c/GLTChurchWorldwide",
  instagram: "https://www.instagram.com/gltlekki/",
  x: "https://x.com/gltchurch",
  telegramLeverage: "https://t.me/s/LeverageDevotional",
};

export const SOCIAL_ICONS = [
  { icon: FaYoutube, href: SOCIALS.youtube, label: "GLT Church on YouTube" },
  { icon: FaInstagram, href: SOCIALS.instagram, label: "GLT Church on Instagram" },
  { icon: FaXTwitter, href: SOCIALS.x, label: "GLT Church on X" },
  { icon: FaTelegram, href: SOCIALS.telegramLeverage, label: "Leverage Devotional on Telegram" },
];
