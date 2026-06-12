export const CLINIC_INFO = {
  name: "Dr. Jarin's Dental Point",
  nameBangla: "ডাঃ জেরিন'স ডেন্টাল পয়েন্ট",
  tagline: "Better Teeth Better Health",
  taglineBangla: "আপনার হাসি আমাদের দায়িত্ব",

  doctor: {
    name: "Dr. Jarin Tasnim Rahman",
    nameBangla: "ডাঃ জেরিন তাসনিম রহমান",
    qualifications: [
      "BDS (DU)",
      "BMDC Reg: 8291",
      "PGT-Conservative Dentistry (BSMMU)",
      "OMS — Shaheed Suhrawardy Medical College & Hospital",
      "Consultant, Bangladesh Bank",
    ],
    bio: "Dedicated to providing gentle, modern dental care for patients of all ages in East Bashabo, Dhaka.",
  },

  contact: {
    phone: "+8801616753364",
    phoneDisplay: "01616 753364",
    email: "drjarinsdentalpoint14@gmail.com",
    whatsapp: "+8801616753364",
    bkashNumber: "01616753364",
  },

  address: {
    line1: "1/1, East Bashabo, Kodomtola",
    line2: "Shobujbag, Dhaka-1214",
    full: "1/1, East Bashabo, Kodomtola, Shobujbag, Dhaka-1214",
    fullBangla: "১/১, ইস্ট বাসাবো, কদমতলা, শোভাগবাগ, ঢাকা-১২১৪",
    googleMaps: "https://maps.app.goo.gl/9PXmsooiG3PAZfP38",
    coordinates: {
      lat: 23.738080371291566,
      lng: 90.43519232721546,
    },
  },

  hours: {
    morning: "11:00 AM – 2:00 PM",
    evening: "5:00 PM – 10:00 PM",
    morningBangla: "সকাল ১১:০০ – দুপুর ২:০০",
    eveningBangla: "বিকাল ৫:০০ – রাত ১০:০০",
    closed: "Friday",
    closedBangla: "শুক্রবার বন্ধ",
  },

  social: {
    facebook: "",
  },

  builder: "Built by Baba Puson",
} as const;

export const SERVICES = [
  { id: 1, name: "Root Canal Treatment (RCT)", nameBn: "RCT (রুট ক্যানেল ট্রিটমেন্ট)", description: "Treatment of infected tooth pulp to save the natural tooth.", icon: "🦷" },
  { id: 2, name: "Crown & Bridge", nameBn: "ক্রাউন (ক্যাপ ও ব্রীজ)", description: "Restoration of damaged teeth with natural-looking crowns and bridges.", icon: "👑" },
  { id: 3, name: "Painless Tooth Extraction", nameBn: "ব্যাথামুক্ত দাঁত তোলা", description: "Safe and gentle removal of damaged, decayed, or wisdom teeth.", icon: "🔧" },
  { id: 4, name: "Orthodontics — Braces & High Palate Treatment", nameBn: "আঁকা-বাঁকা দাঁত ও উঁচু চোয়ালের চিকিৎসা", description: "Correction of crooked, misaligned teeth and jaw problems.", icon: "😁" },
  { id: 5, name: "Cosmetic Tooth Filling", nameBn: "কসমেটিক ফিলিং", description: "Aesthetic cavity filling with tooth-colored composite material.", icon: "✨" },
  { id: 6, name: "Dental Implant", nameBn: "Dental Implant", description: "Permanent replacement of missing teeth with titanium implants.", icon: "🔩" },
  { id: 7, name: "Scaling & Polishing", nameBn: "স্কেলিং ও পলিশিং", description: "Professional teeth cleaning to remove plaque, tartar, and stains.", icon: "💎" },
  { id: 8, name: "Tooth Addition & Replacement (Dentures)", nameBn: "দাঁত সংযোজন ও প্রতিস্থাপন", description: "Full and partial dentures for missing teeth restoration.", icon: "🦷" },
  { id: 9, name: "Teeth, Gum & Oral Surgery", nameBn: "দাঁত, মাড়ী এবং মুখের সার্জারী", description: "Surgical treatment for gum disease and oral conditions.", icon: "🏥" },
  { id: 10, name: "Fractured & Traumatic Tooth Treatment", nameBn: "ভাঙা ও আঘাতপ্রাপ্ত দাঁতের চিকিৎসা", description: "Emergency treatment for broken, chipped, or injured teeth.", icon: "🩹" },
  { id: 11, name: "Specialized Care: Children, Pregnant Mothers, Diabetic & Heart Patients", nameBn: "শিশু ও গর্ভবতী মা, ডায়াবেটিস এবং হার্টের রুগীদের চিকিৎসা", description: "Gentle, specialized dental care for high-risk and sensitive patients.", icon: "❤️" },
  { id: 12, name: "Dental X-Ray (Own Machine — In-House)", nameBn: "নিজস্ব মেশিনে দাঁতের এক্স-রে", description: "Fast, accurate in-house X-ray with our own modern machine.", icon: "📷" },
] as const;

export const APPOINTMENT_TIMES = [
  "11:00 AM", "12:00 PM", "1:00 PM",
  "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM",
] as const;

export const APPOINTMENT_REASONS = [
  "Checkup", "Pain", "RCT", "Braces", "Filling", "Implant", "Scaling", "Other",
] as const;
