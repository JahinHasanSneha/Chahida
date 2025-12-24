import { uid, pick, clamp } from "../lib/utils";

const KEY = "campus_hub_db_v1";

const TAGS = [
  "Emergency Blood", "Lost & Found", "Appliance", "Medicine",
  "Academic", "Buy & Sell", "Find a Buddy"
];

const HALLS = ["Ahsanullah Hall", "Nazrul Hall", "Titumir Hall", "Rokeya Hall", "Shamsunnahar Hall", "Surja Sen Hall"];
const SPOTS = ["Canteen", "Central Field", "Library", "Hall Gate", "TSC", "Auditorium", "Lab Building", "Bus Stop"];
const BLOODS = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
const LEVEL_TERMS = ["L1T1","L1T2","L2T1","L2T2","L3T1","L3T2","L4T1","L4T2"];

const FIRST = ["Araf","Nusrat","Tahsin","Raihan","Samiha","Sanjida","Imran","Labiba","Tashfia","Mahi","Fahim","Fariha","Anik","Rafi","Sabila","Nayeem"];
const LAST = ["Hossain","Islam","Khan","Chowdhury","Rahman","Hasan","Ahmed","Sarker","Sultana","Roy","Karim","Jahan"];

function randomName(){
  return `${pick(FIRST)} ${pick(LAST)}`;
}

function makeUser(i){
  const name = randomName();
  const hall = pick(HALLS);
  const bg = pick(BLOODS);
  const donor = Math.random() < 0.55;
  const studentId = `20${clamp(18+Math.floor(Math.random()*8), 18, 25)}-${String(1000+i).slice(-4)}`;
  return {
    id: uid("u"),
    name,
    studentId,
    hall,
    room: `${Math.floor(100+Math.random()*400)}`,
    email: `${name.toLowerCase().replace(/\s+/g,".")}${i}@uni.edu`,
    mobile: `01${Math.floor(100000000+Math.random()*899999999)}`,
    bloodGroup: bg,
    levelTerm: pick(LEVEL_TERMS),
    donorOptIn: donor,
    bio: Math.random()<0.5 ? "Usually around library/canteen. Ping me anytime." : "Hall resident. Prefer chat first.",
    createdAt: Date.now() - Math.floor(Math.random()*1000*60*60*24*60),
  };
}

function makePost(i, users){
  const author = pick(users);
  const tag = pick(TAGS);
  const hall = Math.random()<0.75 ? author.hall : pick(HALLS);
  const base = {
    id: uid("post"),
    tag,
    title: "",
    body: "",
    createdAt: Date.now() - Math.floor(Math.random()*1000*60*60*24*25),
    status: pick(["Open","Open","Open","In progress","Resolved"]),
    urgency: pick(["Low","Medium","High","Medium"]),
    authorId: author.id,
    authorName: author.name,
    location: { hall, room: Math.random()<0.35 ? author.room : "", spot: pick(SPOTS) },
    views: Math.floor(Math.random()*350),
    meta: {},
  };

  if(tag==="Emergency Blood"){
    const need = pick(BLOODS);
    base.title = `URGENT: Need ${need} blood near ${pick(SPOTS)}`;
    base.body = `Need ${need} (1–2 units). Patient admitted. Please respond if you can donate or know a donor.`;
    base.urgency = pick(["High","High","Medium"]);
    base.meta = {
      bloodGroupNeeded: need,
      units: pick([1,1,2,2,3]),
      hospital: pick(["Campus Medical Center","City Hospital","Square Hospital (nearby)","Hall Clinic"]),
      neededBy: Date.now() + Math.floor(Math.random()*1000*60*60*10),
      contactPreference: pick(["In-app chat","Phone","Email"]),
    };
  }

  if(tag==="Lost & Found"){
    const item = pick(["ID Card","Wallet","Keys","Calculator","Water Bottle","Phone","USB Drive","Umbrella","AirPods case","Notebook"]);
    const lf = pick(["Lost","Found"]);
    base.title = `${lf}: ${item} around ${base.location.spot}`;
    base.body = `${lf} a ${item}. If it’s yours, describe one detail to claim.`;
    base.meta = {
      type: lf,
      itemName: item,
      color: pick(["Black","Blue","Red","Gray","Green","Pink"]),
      proofHint: "Tell me any unique mark/sticker inside.",
    };
  }

  if(tag==="Appliance"){
    const appliance = pick(["Iron","Kettle","Extension Cord","Rice Cooker","Hair Dryer","Table Lamp","Fan Regulator","Power Bank","Adapter"]);
    const t = pick(["Need to borrow","Offering to lend","Need repair help"]);
    base.title = `${t}: ${appliance} (${hall})`;
    base.body = t==="Need repair help"
      ? `My ${appliance} is acting weird. Anyone good with quick fixes?`
      : `Looking for ${appliance} for a short time. Will return safely.`;
    base.meta = {
      type: t,
      itemName: appliance,
      duration: pick(["2 hours","Tonight","1 day","Weekend"]),
      deposit: pick(["No deposit","Small deposit","Negotiable"]),
    };
  }

  if(tag==="Medicine"){
    const med = pick(["Napa 500mg","ORSaline","Seclo 20mg","Antacid","Bandage roll","Thermometer","Cetirizine 10mg","Savlon"]);
    base.title = `Need: ${med} (${base.location.spot})`;
    base.body = `Urgent help needed to get ${med}. Any nearby pharmacy open?`;
    base.meta = {
      medicineName: med,
      quantity: pick(["1 strip","2 strips","1 bottle","1 pack"]),
      neededBy: Date.now() + Math.floor(Math.random()*1000*60*60*6),
      note: "No medical advice please—only help sourcing/pickup.",
    };
  }

  if(tag==="Academic"){
    const course = pick(["CSE110","CSE220","EEE101","MAT110","PHY107","ME201","HUM103"]);
    const need = pick(["Need notes","Need past questions","Need tutoring","Form study group","Need lab partner"]);
    base.title = `${need}: ${course} (${pick(["Mid","Final","Assignment","Lab"])})`;
    base.body = `Anyone has resources for ${course}? Deadline soon. I can share my notes too.`;
    base.meta = {
      courseCode: course,
      type: need,
      deadline: Date.now() + Math.floor(Math.random()*1000*60*60*24*7),
    };
  }

  if(tag==="Buy & Sell"){
    const item = pick(["Textbook","Used Cycle","Chair","Monitor","Calculator","Table Fan","Router","Lamp","Keyboard"]);
    const kind = pick(["Selling","Buying","Exchange","Giveaway"]);
    const price = kind==="Giveaway" ? 0 : pick([300,500,800,1200,1500,2000,3500,4500,6000]);
    base.title = `${kind}: ${item} ${price?`৳${price}`:"(Free)"}`;
    base.body = `Condition: ${pick(["Like new","Good","Used but ok","Almost new"])}. Pickup from ${hall}.`;
    base.meta = {
      type: kind,
      itemName: item,
      price,
      condition: pick(["New","Like new","Used"]),
      negotiable: Math.random()<0.55,
    };
  }

  if(tag==="Find a Buddy"){
    const kind = pick(["Study buddy","Gym/Walk buddy","Event buddy","Skill swap","Mentorship"]);
    base.title = `Looking for: ${kind} (${pick(["Evenings","Mornings","Weekends","Anytime"])})`;
    base.body = `Let’s connect! Prefer ${pick(["Library","Field","Canteen","Hall lounge"])} meetups first.`;
    base.meta = {
      type: kind,
      interests: [pick(["DSA","Web dev","Gym","Photography","Chess","IELTS","Robotics","Debate"]), pick(["Music","Anime","Cricket","Books","Hiking","Design","Startups"])],
      comfort: pick(["Chat first","Meet in group","1:1 ok"]),
    };
  }

  return base;
}

export function seedIfEmpty(){
  const exists = localStorage.getItem(KEY);
  if(exists) return;

  const users = Array.from({ length: 90 }, (_, i) => makeUser(i));
  const posts = Array.from({ length: 220 }, (_, i) => makePost(i, users));

  const db = {
    users,
    posts: posts.sort((a,b)=>b.createdAt-a.createdAt),
    comments: {},
  };
  localStorage.setItem(KEY, JSON.stringify(db));
}

export const META = { TAGS, HALLS };
