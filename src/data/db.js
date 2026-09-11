// Mock database for MediLink AI containing 50 medicines and 5 pharmacies

export const INITIAL_MEDICINES = [
  {
    id: "med-1",
    brandName: "Tylenol",
    genericName: "Acetaminophen",
    class: "Analgesic (Pain Reliever)",
    description: "Commonly used for mild-to-moderate pain relief and fever reduction.",
    synonyms: ["tylenol", "tilenol", "tylenal", "acetaminophen", "acetamenophen", "paracetamol", "paracetemol", "panadol"],
    alternatives: ["Ibuprofen", "Naproxen", "Aspirin"]
  },
  {
    id: "med-2",
    brandName: "Advil",
    genericName: "Ibuprofen",
    class: "NSAID (Anti-inflammatory)",
    description: "Used to reduce hormones that cause pain and inflammation in the body.",
    synonyms: ["advil", "adval", "ibuprofen", "ibuprufen", "ibuprofin", "ibuprufin", "motrin", "nurofen"],
    alternatives: ["Acetaminophen", "Naproxen", "Celecoxib"]
  },
  {
    id: "med-3",
    brandName: "Amoxil",
    genericName: "Amoxicillin",
    class: "Penicillin Antibiotic",
    description: "Used to treat various types of infections caused by bacteria.",
    synonyms: ["amoxil", "amoxicillin", "amoxicilin", "amoxicillan", "amoxacilin", "amox"],
    alternatives: ["Cephalexin", "Azithromycin", "Ciprofloxacin"]
  },
  {
    id: "med-4",
    brandName: "Zyrtec",
    genericName: "Cetirizine",
    class: "Antihistamine (Allergy)",
    description: "Provides 24-hour relief from allergy symptoms like sneezing, runny nose, and itchy eyes.",
    synonyms: ["zyrtec", "zirtec", "cetirizine", "cetirizene", "claritin", "loratadine", "allegra"],
    alternatives: ["Loratadine", "Fexofenadine", "Fluticasone"]
  },
  {
    id: "med-5",
    brandName: "Lipitor",
    genericName: "Atorvastatin",
    class: "HMG-CoA Reductase Inhibitor (Statin)",
    description: "Used along with diet to lower 'bad' cholesterol and raise 'good' cholesterol.",
    synonyms: ["lipitor", "lipater", "atorvastatin", "atorvestatin", "crestor", "rosuvastatin"],
    alternatives: ["Rosuvastatin", "Simvastatin"]
  },
  {
    id: "med-6",
    brandName: "Synthroid",
    genericName: "Levothyroxine",
    class: "Thyroid Hormone",
    description: "Used to treat hypothyroidism by replacing thyroxine that your thyroid gland cannot produce.",
    synonyms: ["synthroid", "sinthroid", "synthrod", "levothyroxine", "levothiroxine", "levoxyl"],
    alternatives: ["Liothyronine", "Armour Thyroid"]
  },
  {
    id: "med-7",
    brandName: "Glucophage",
    genericName: "Metformin",
    class: "Biguanide Oral Antidiabetic",
    description: "First-line medication for the treatment of type 2 diabetes, helping control blood sugar.",
    synonyms: ["glucophage", "glucafage", "metformin", "metformin", "metformin hcl"],
    alternatives: ["Sitagliptin", "Empagliflozin", "Liraglutide"]
  },
  {
    id: "med-8",
    brandName: "Lisinopril",
    genericName: "Lisinopril",
    class: "ACE Inhibitor (BP Medication)",
    description: "Prescribed to treat high blood pressure and heart failure, and to improve survival after a heart attack.",
    synonyms: ["lisinopril", "lysinopril", "lisinopral", "zestril", "prinivil"],
    alternatives: ["Losartan", "Valsartan", "Amlodipine"]
  },
  {
    id: "med-9",
    brandName: "Norvasc",
    genericName: "Amlodipine",
    class: "Calcium Channel Blocker (BP Medication)",
    description: "Dilates blood vessels and improves blood flow. Used to treat chest pain and high blood pressure.",
    synonyms: ["norvasc", "norvesc", "amlodipine", "amlodepine", "amlodipin"],
    alternatives: ["Lisinopril", "Losartan", "Metoprolol"]
  },
  {
    id: "med-10",
    brandName: "Prilosec",
    genericName: "Omeprazole",
    class: "Proton Pump Inhibitor (PPI)",
    description: "Decreases the amount of acid produced in the stomach, treating heartburn and GERD.",
    synonyms: ["prilosec", "prylosec", "omeprazole", "omeprazole", "omeprazol"],
    alternatives: ["Esomeprazole", "Famotidine"]
  },
  {
    id: "med-11",
    brandName: "Ventolin",
    genericName: "Albuterol Inhaler",
    class: "Bronchodilator (Beta-2 Agonist)",
    description: "Quick-relief inhaler used to prevent and treat wheezing and shortness of breath from asthma.",
    synonyms: ["ventolin", "ventalin", "albuterol", "albuturol", "proair", "proventil"],
    alternatives: ["Levalbuterol", "Budesonide/Formoterol"]
  },
  {
    id: "med-12",
    brandName: "Zoloft",
    genericName: "Sertraline",
    class: "SSRI Antidepressant",
    description: "Used to treat depression, obsessive-compulsive disorder (OCD), panic disorder, and anxiety.",
    synonyms: ["zoloft", "zolaft", "sertraline", "sertralene", "sertralin"],
    alternatives: ["Escitalopram", "Fluoxetine", "Duloxetine"]
  },
  {
    id: "med-13",
    brandName: "Cozaar",
    genericName: "Losartan",
    class: "Angiotensin II Receptor Blocker (BP Medication)",
    description: "Keeps blood vessels from narrowing, which lowers blood pressure and improves blood flow.",
    synonyms: ["cozaar", "cozar", "losartan", "losartin", "hyzaar"],
    alternatives: ["Valsartan", "Lisinopril", "Amlodipine"]
  },
  {
    id: "med-14",
    brandName: "Neurontin",
    genericName: "Gabapentin",
    class: "Anticonvulsant / Nerve Pain",
    description: "Used to treat nerve pain caused by shingles and to control seizures in patients.",
    synonyms: ["neurontin", "nuerontin", "gabapentin", "gabapentin", "gabapenten"],
    alternatives: ["Pregabalin", "Duloxetine"]
  },
  {
    id: "med-15",
    brandName: "Crestor",
    genericName: "Rosuvastatin",
    class: "Statin (Cholesterol Medication)",
    description: "Used along with diet to lower LDL (bad) cholesterol and raise HDL (good) cholesterol.",
    synonyms: ["crestor", "cristor", "rosuvastatin", "rosuvastatin", "rosuvastetin"],
    alternatives: ["Atorvastatin", "Simvastatin"]
  },
  {
    id: "med-16",
    brandName: "Nexium",
    genericName: "Esomeprazole",
    class: "Proton Pump Inhibitor (PPI)",
    description: "Reduces acid production in stomach. Treats acid reflux, GERD, and stomach ulcers.",
    synonyms: ["nexium", "nexem", "esomeprazole", "esomeprazole", "esomeprasol"],
    alternatives: ["Omeprazole", "Famotidine"]
  },
  {
    id: "med-17",
    brandName: "Singulair",
    genericName: "Montelukast",
    class: "Leukotriene Receptor Antagonist",
    description: "Used to prevent asthma attacks and treat seasonal or year-round allergies.",
    synonyms: ["singulair", "singuler", "montelukast", "montelucast", "montelukest"],
    alternatives: ["Cetirizine", "Fluticasone"]
  },
  {
    id: "med-18",
    brandName: "Lexapro",
    genericName: "Escitalopram",
    class: "SSRI Antidepressant",
    description: "Used for treating major depressive disorder and generalized anxiety disorder.",
    synonyms: ["lexapro", "lexipro", "escitalopram", "escitalapram", "escitilopram"],
    alternatives: ["Sertraline", "Fluoxetine", "Bupropion"]
  },
  {
    id: "med-19",
    brandName: "Metoprolol",
    genericName: "Metoprolol Succinate",
    class: "Beta-Blocker (BP / Heart Rate)",
    description: "Used to treat chest pain (angina), high blood pressure, and to prevent heart failure.",
    synonyms: ["metoprolol", "metoperolol", "metoprolol", "lopressor", "toprol"],
    alternatives: ["Amlodipine", "Lisinopril", "Carvedilol"]
  },
  {
    id: "med-20",
    brandName: "Vicodin",
    genericName: "Hydrocodone / Acetaminophen",
    class: "Opioid / Non-Opioid Analgesic",
    description: "Combination medicine used to relieve moderate to severe pain. Controlled substance.",
    synonyms: ["vicodin", "vicoden", "hydrocodone", "acetaminophen/hydrocodone", "norco", "lortab"],
    alternatives: ["Tramadol", "Ibuprofen", "Acetaminophen"]
  },
  {
    id: "med-21",
    brandName: "Xanax",
    genericName: "Alprazolam",
    class: "Benzodiazepine (Anxiety Relief)",
    description: "Used to treat anxiety disorders, panic disorders, and anxiety caused by depression.",
    synonyms: ["xanax", "zanax", "alprazolam", "alprisolam", "alprazolam hcl"],
    alternatives: ["Diazepam", "Lorazepam", "Buspirone"]
  },
  {
    id: "med-22",
    brandName: "Prozac",
    genericName: "Fluoxetine",
    class: "SSRI Antidepressant",
    description: "Prescribed to treat depression, bulimia nervosa, obsessive-compulsive disorder, and panic disorder.",
    synonyms: ["prozac", "prozac hcl", "fluoxetine", "fluoxetene", "fluoxetin"],
    alternatives: ["Sertraline", "Escitalopram", "Duloxetine"]
  },
  {
    id: "med-23",
    brandName: "Claritin",
    genericName: "Loratadine",
    class: "Antihistamine (Allergy)",
    description: "Non-drowsy 24-hour relief of sneezing, runny nose, and itchy eyes caused by hay fever or allergies.",
    synonyms: ["claritin", "clareten", "loratadine", "loratadine", "loratadine hcl"],
    alternatives: ["Cetirizine", "Fexofenadine"]
  },
  {
    id: "med-24",
    brandName: "Allegra",
    genericName: "Fexofenadine",
    class: "Antihistamine (Allergy)",
    description: "Provides allergy symptom relief without causing drowsiness.",
    synonyms: ["allegra", "alegra", "fexofenadine", "fexofenidine", "fexofenadin"],
    alternatives: ["Cetirizine", "Loratadine"]
  },
  {
    id: "med-25",
    brandName: "Flonase",
    genericName: "Fluticasone Propionate",
    class: "Corticosteroid Nasal Spray",
    description: "Nasal spray used to treat nasal congestion, sneezing, and runny nose caused by seasonal allergies.",
    synonyms: ["flonase", "flonaze", "fluticasone", "fluticasone nasal", "flovent"],
    alternatives: ["Montelukast", "Cetirizine"]
  },
  {
    id: "med-26",
    brandName: "Wellbutrin",
    genericName: "Bupropion",
    class: "Atypical Antidepressant",
    description: "Used to treat major depressive disorder and seasonal affective disorder, and to help people stop smoking.",
    synonyms: ["wellbutrin", "welbutrin", "bupropion", "buproprion", "zyban"],
    alternatives: ["Sertraline", "Escitalopram", "Duloxetine"]
  },
  {
    id: "med-27",
    brandName: "Cymbalta",
    genericName: "Duloxetine",
    class: "SNRI Antidepressant / Pain",
    description: "Treats depression, anxiety, diabetic neuropathic pain, fibromyalgia, and chronic muscle pain.",
    synonyms: ["cymbalta", "symbalta", "duloxetine", "duloxetene", "duloxetin"],
    alternatives: ["Sertraline", "Pregabalin", "Gabapentin"]
  },
  {
    id: "med-28",
    brandName: "Januvia",
    genericName: "Sitagliptin",
    class: "DPP-4 Inhibitor Antidiabetic",
    description: "Oral diabetes medicine that helps control blood sugar levels in type 2 diabetes patients.",
    synonyms: ["januvia", "januvea", "sitagliptin", "sitaglipten", "sitaglipin"],
    alternatives: ["Metformin", "Empagliflozin"]
  },
  {
    id: "med-29",
    brandName: "Jardiance",
    genericName: "Empagliflozin",
    class: "SGLT2 Inhibitor Antidiabetic",
    description: "Used to lower blood sugar in adults with type 2 diabetes and to reduce cardiovascular death risk.",
    synonyms: ["jardiance", "jardianse", "empagliflozin", "empagliflosin", "empaglifloxin"],
    alternatives: ["Metformin", "Sitagliptin"]
  },
  {
    id: "med-30",
    brandName: "Humalog",
    genericName: "Insulin Lispro",
    class: "Rapid-Acting Insulin",
    description: "Injectable insulin used to improve glycemic control in adults and children with diabetes.",
    synonyms: ["humalog", "humalog insulin", "insulin lispro", "lispro", "insulin rapid"],
    alternatives: ["Novolog", "Apidra"]
  },
  {
    id: "med-31",
    brandName: "Pepcid",
    genericName: "Famotidine",
    class: "H2 Blocker (Acid Reducer)",
    description: "Reduces acid production in the stomach, treating ulcers, GERD, and indigestion.",
    synonyms: ["pepcid", "pepsid", "famotidine", "famotedine", "famotidin"],
    alternatives: ["Omeprazole", "Esomeprazole"]
  },
  {
    id: "med-32",
    brandName: "Zofran",
    genericName: "Ondansetron",
    class: "Antiemetic (Nausea Relief)",
    description: "Used to prevent nausea and vomiting that may be caused by surgery, chemotherapy, or radiation.",
    synonyms: ["zofran", "zofran odt", "ondansetron", "ondansetron", "ondansetren"],
    alternatives: ["Metoclopramide", "Promethazine"]
  },
  {
    id: "med-33",
    brandName: "Zithromax",
    genericName: "Azithromycin",
    class: "Macrolide Antibiotic",
    description: "Also known as Z-Pak. Treats mild to moderate bacterial infections like respiratory or skin infections.",
    synonyms: ["zithromax", "zithromac", "azithromycin", "azithromicin", "azithromycin", "z-pak", "zpak"],
    alternatives: ["Amoxicillin", "Cephalexin", "Ciprofloxacin"]
  },
  {
    id: "med-34",
    brandName: "Keflex",
    genericName: "Cephalexin",
    class: "Cephalosporin Antibiotic",
    description: "Broad-spectrum antibiotic used to treat bacterial infections of the skin, ear, bone, and urinary tract.",
    synonyms: ["keflex", "keflex hcl", "cephalexin", "cefalexin", "sephalexin"],
    alternatives: ["Amoxicillin", "Azithromycin", "Ciprofloxacin"]
  },
  {
    id: "med-35",
    brandName: "Cipro",
    genericName: "Ciprofloxacin",
    class: "Fluoroquinolone Antibiotic",
    description: "Used to treat various bacterial infections, including severe urinary tract and joint infections.",
    synonyms: ["cipro", "ciprofloxacin", "ciprofloxicin", "ciprofloxin"],
    alternatives: ["Amoxicillin", "Azithromycin", "Cephalexin"]
  },
  {
    id: "med-36",
    brandName: "Bactrim",
    genericName: "Sulfamethoxazole / Trimethoprim",
    class: "Sulfonamide Antibiotic",
    description: "Combination antibiotic used to treat ear infections, UTIs, bronchitis, and traveler's diarrhea.",
    synonyms: ["bactrim", "bactrim ds", "sulfamethoxazole", "trimethoprim", "co-trimoxazole"],
    alternatives: ["Amoxicillin", "Ciprofloxacin", "Nitrofurantoin"]
  },
  {
    id: "med-37",
    brandName: "Augmentin",
    genericName: "Amoxicillin / Clavulanate",
    class: "Penicillin Combination Antibiotic",
    description: "Prescribed to treat infections showing penicillin resistance, such as sinusitis or pneumonia.",
    synonyms: ["augmentin", "augmenten", "amoxicillin-clavulanate", "amox-clav"],
    alternatives: ["Amoxicillin", "Azithromycin", "Cephalexin"]
  },
  {
    id: "med-38",
    brandName: "Aleve",
    genericName: "Naproxen",
    class: "NSAID (Pain Reliever)",
    description: "Provides temporary relief of minor aches and pains and reduces fever. Lasts up to 12 hours.",
    synonyms: ["aleve", "alieve", "naproxen", "naproxen sodium", "naprosin", "naprosyn"],
    alternatives: ["Ibuprofen", "Acetaminophen", "Celecoxib"]
  },
  {
    id: "med-39",
    brandName: "Celebrex",
    genericName: "Celecoxib",
    class: "COX-2 Selective NSAID",
    description: "Used to treat pain, redness, swelling, and stiffness caused by osteoarthritis and rheumatoid arthritis.",
    synonyms: ["celebrex", "celibrex", "celecoxib", "celecoxab", "celecoxibe"],
    alternatives: ["Ibuprofen", "Naproxen", "Meloxicam"]
  },
  {
    id: "med-40",
    brandName: "Voltaren",
    genericName: "Diclofenac Sodium Gel",
    class: "Topical NSAID (Pain Gel)",
    description: "Gel formulation used to treat joint pain caused by osteoarthritis in the hands, wrists, elbows, knees, or ankles.",
    synonyms: ["voltaren", "voltaren gel", "diclofenac", "diclofenac sodium", "voltarin"],
    alternatives: ["Ibuprofen", "Naproxen", "Meloxicam"]
  },
  {
    id: "med-41",
    brandName: "Mobic",
    genericName: "Meloxicam",
    class: "NSAID (Pain Reliever)",
    description: "Prescribed to relieve joint pain, stiffness, and tenderness caused by arthritis.",
    synonyms: ["mobic", "mobec", "meloxicam", "meloxicam", "meloxecam"],
    alternatives: ["Ibuprofen", "Naproxen", "Celecoxib"]
  },
  {
    id: "med-42",
    brandName: "Aspirin",
    genericName: "Acetylsalicylic Acid",
    class: "Salicylate / Blood Thinner",
    description: "Used to reduce pain, fever, or inflammation, and as a daily low-dose preventive for heart attacks.",
    synonyms: ["aspirin", "asperin", "acetylsalicylic acid", "bayer aspirin", "ecotrin"],
    alternatives: ["Acetaminophen", "Ibuprofen", "Clopidogrel"]
  },
  {
    id: "med-43",
    brandName: "Lyrica",
    genericName: "Pregabalin",
    class: "Anticonvulsant / Nerve Pain",
    description: "Used to treat neuropathic pain associated with diabetic peripheral neuropathy, fibromyalgia, and shingles.",
    synonyms: ["lyrica", "lirica", "pregabalin", "pregabalen", "pregabalin hcl"],
    alternatives: ["Gabapentin", "Duloxetine"]
  },
  {
    id: "med-44",
    brandName: "Flexeril",
    genericName: "Cyclobenzaprine",
    class: "Skeletal Muscle Relaxant",
    description: "Short-term treatment to relieve muscle spasms associated with acute, painful musculoskeletal conditions.",
    synonyms: ["flexeril", "flexerel", "cyclobenzaprine", "cyclobenzaprene", "amrix"],
    alternatives: ["Methocarbamol", "Tizanidine", "Baclofen"]
  },
  {
    id: "med-45",
    brandName: "Plavix",
    genericName: "Clopidogrel",
    class: "Antiplatelet Agent (Blood Thinner)",
    description: "Helps prevent blood clots in people who have had a recent heart attack, stroke, or circulation issues.",
    synonyms: ["plavix", "plavex", "clopidogrel", "clopedogrel", "clopidogril"],
    alternatives: ["Aspirin", "Prasugrel"]
  },
  {
    id: "med-46",
    brandName: "Lasix",
    genericName: "Furosemide",
    class: "Loop Diuretic (Water Pill)",
    description: "Prevents your body from absorbing too much salt. Treats fluid retention (edema) in heart failure or kidney disease.",
    synonyms: ["lasix", "lasex", "furosemide", "furosemide", "furasemide"],
    alternatives: ["Torsemide", "Hydrochlorothiazide"]
  },
  {
    id: "med-47",
    brandName: "Aldactone",
    genericName: "Spironolactone",
    class: "Potassium-Sparing Diuretic",
    description: "Treats heart failure, high blood pressure, or low potassium levels, and reduces fluid retention.",
    synonyms: ["aldactone", "aldacton", "spironolactone", "spironolacton", "spironolactene"],
    alternatives: ["Furosemide", "Lisinopril"]
  },
  {
    id: "med-48",
    brandName: "Coumadin",
    genericName: "Warfarin",
    class: "Anticoagulant (Blood Thinner)",
    description: "Reduces the formation of blood clots. Used to prevent strokes, heart attacks, and clots in veins.",
    synonyms: ["coumadin", "cumadin", "warfarin", "warfaren", "jantoven"],
    alternatives: ["Apixaban", "Rivaroxaban"]
  },
  {
    id: "med-49",
    brandName: "Symbicort",
    genericName: "Budesonide / Formoterol",
    class: "Corticosteroid / Bronchodilator",
    description: "Combination inhaler used for the long-term control of asthma and COPD to prevent wheezing.",
    synonyms: ["symbicort", "simbicort", "budesonide", "formoterol", "symbicort inhaler"],
    alternatives: ["Advair", "Albuterol Inhaler"]
  },
  {
    id: "med-50",
    brandName: "Tamiflu",
    genericName: "Oseltamivir",
    class: "Neuraminidase Inhibitor Antiviral",
    description: "Antiviral drug used to treat and prevent influenza A and B (flu) symptoms.",
    synonyms: ["tamiflu", "tamiflew", "oseltamivir", "oseltamavir", "oseltamivir phosphate"],
    alternatives: ["Baloxavir Marboxil", "Zanamivir"]
  }
];

export const INITIAL_PHARMACIES = [
  {
    id: "ph-1",
    name: "Apollo Pharmacy",
    address: "12 MG Road, Bengaluru, Karnataka",
    distance: 0.6,
    phone: "+91 80 4001 1122"
  },
  {
    id: "ph-2",
    name: "MedPlus",
    address: "45 FC Road, Pune, Maharashtra",
    distance: 1.2,
    phone: "+91 20 2553 4482"
  },
  {
    id: "ph-3",
    name: "Wellness Forever",
    address: "9 Linking Road, Mumbai, Maharashtra",
    distance: 1.8,
    phone: "+91 22 2641 1502"
  },
  {
    id: "ph-4",
    name: "MediLink Community Rx",
    address: "3100 Southside Blvd, Arlington, VA",
    distance: 2.5,
    phone: "(703) 888-9900"
  },
  {
    id: "ph-5",
    name: "Netmeds Pharmacy",
    address: "18 Anna Salai, Chennai, Tamil Nadu",
    distance: 3.1,
    phone: "+91 44 4211 9944"
  },
  {
    id: "ph-6",
    name: "PharmEasy Store",
    address: "27 Park Street, Kolkata, West Bengal",
    distance: 3.4,
    phone: "+91 33 4022 7788"
  },
  {
    id: "ph-7",
    name: "Tata 1mg Pharmacy",
    address: "8 Connaught Place, New Delhi",
    distance: 3.6,
    phone: "+91 11 4356 2210"
  },
  {
    id: "ph-8",
    name: "Frank Ross Pharmacy",
    address: "22 SG Highway, Ahmedabad, Gujarat",
    distance: 3.9,
    phone: "+91 79 2646 5511"
  },
  {
    id: "ph-9",
    name: "Guardian Pharmacy",
    address: "5 Banjara Hills, Hyderabad, Telangana",
    distance: 4.1,
    phone: "+91 40 2339 8871"
  },
  {
    id: "ph-10",
    name: "Religare Wellness Pharmacy",
    address: "14 Civil Lines, Jaipur, Rajasthan",
    distance: 4.3,
    phone: "+91 141 402 6633"
  },
  {
    id: "ph-11",
    name: "Noble Plus Pharmacy",
    address: "31 Camp Road, Pune, Maharashtra",
    distance: 4.5,
    phone: "+91 20 2634 7712"
  },
  {
    id: "ph-12",
    name: "DavaIndia Pharmacy",
    address: "6 Hazratganj, Lucknow, Uttar Pradesh",
    distance: 4.8,
    phone: "+91 522 402 1198"
  },
  {
    id: "ph-13",
    name: "Generic Aadhaar Pharmacy",
    address: "19 Koregaon Park, Pune, Maharashtra",
    distance: 5.0,
    phone: "+91 20 2612 5540"
  },
  {
    id: "ph-14",
    name: "Jan Aushadhi Kendra",
    address: "2 Sector 17, Chandigarh",
    distance: 5.2,
    phone: "+91 172 270 3345"
  },
  {
    id: "ph-15",
    name: "LifeCare Pharmacy",
    address: "11 MI Road, Jaipur, Rajasthan",
    distance: 5.4,
    phone: "+91 141 402 8890"
  },
  {
    id: "ph-16",
    name: "Reliance Wellness Pharmacy",
    address: "40 Marine Drive, Mumbai, Maharashtra",
    distance: 5.6,
    phone: "+91 22 2820 3345"
  },
  {
    id: "ph-17",
    name: "Health & Glow Pharmacy",
    address: "16 Brigade Road, Bengaluru, Karnataka",
    distance: 5.9,
    phone: "+91 80 4112 8890"
  },
  {
    id: "ph-18",
    name: "Trust Chemist & Druggist",
    address: "23 Park Circus, Kolkata, West Bengal",
    distance: 6.1,
    phone: "+91 33 4066 2201"
  },
  {
    id: "ph-19",
    name: "Care Chemist",
    address: "7 Salt Lake, Kolkata, West Bengal",
    distance: 6.3,
    phone: "+91 33 4098 5567"
  },
  {
    id: "ph-20",
    name: "Sanjeevani Medical Store",
    address: "29 Shivaji Nagar, Nagpur, Maharashtra",
    distance: 6.5,
    phone: "+91 712 266 3312"
  },
  {
    id: "ph-21",
    name: "Practo Pharmacy",
    address: "3 Indiranagar, Bengaluru, Karnataka",
    distance: 6.8,
    phone: "+91 80 4223 7765"
  },
  {
    id: "ph-22",
    name: "HealthKart Plus Pharmacy",
    address: "10 Sector 29, Gurugram, Haryana",
    distance: 7.0,
    phone: "+91 124 402 5581"
  },
  {
    id: "ph-23",
    name: "Truemeds Pharmacy",
    address: "58 Andheri West, Mumbai, Maharashtra",
    distance: 7.2,
    phone: "+91 22 2673 4420"
  },
  {
    id: "ph-24",
    name: "Zeel Pharmacy",
    address: "4 Navrangpura, Ahmedabad, Gujarat",
    distance: 7.5,
    phone: "+91 79 2656 9910"
  },
  {
    id: "ph-25",
    name: "MedKart Pharmacy",
    address: "15 Boring Road, Patna, Bihar",
    distance: 7.8,
    phone: "+91 612 220 4487"
  }
];

// Seed basic stock mappings for meds 1-5
const baseInventory = {
  "ph-1": { "med-1": 15, "med-2": 0, "med-3": 0, "med-4": 8, "med-5": 5 },
  "ph-2": { "med-1": 0, "med-2": 22, "med-3": 0, "med-4": 0, "med-5": 14 },
  "ph-3": { "med-1": 10, "med-2": 0, "med-3": 0, "med-4": 5, "med-5": 0 },
  "ph-4": { "med-1": 0, "med-2": 0, "med-3": 12, "med-4": 18, "med-5": 30 },
  "ph-5": { "med-1": 25, "med-2": 30, "med-3": 0, "med-4": 0, "med-5": 0 }
};

// Generate stock mapping programmatically for all 50 meds across 5 pharmacies
export const INITIAL_INVENTORY = {};
const pharmacyIds = [
  "ph-1", "ph-2", "ph-3", "ph-4", "ph-5",
  "ph-6", "ph-7", "ph-8", "ph-9", "ph-10",
  "ph-11", "ph-12", "ph-13", "ph-14", "ph-15",
  "ph-16", "ph-17", "ph-18", "ph-19", "ph-20",
  "ph-21", "ph-22", "ph-23", "ph-24", "ph-25"
];

pharmacyIds.forEach((phId) => {
  INITIAL_INVENTORY[phId] = { ...(baseInventory[phId] || {}) };
});

// Seed medicines 1 to 5 for the additional pharmacies beyond the original 5
for (let i = 1; i <= 5; i++) {
  const medId = `med-${i}`;
  pharmacyIds.forEach((phId, idx) => {
    if (INITIAL_INVENTORY[phId][medId] !== undefined) return;
    const hasStock = (i + idx) % 2 === 0;
    INITIAL_INVENTORY[phId][medId] = hasStock ? ((i * 3 + idx * 7) % 25) + 5 : 0;
  });
}

// Seed medicines 6 to 50
for (let i = 6; i <= 50; i++) {
  const medId = `med-${i}`;
  pharmacyIds.forEach((phId, idx) => {
    // Generate deterministic inventory counts:
    // Every 7th medication is completely out of stock everywhere to guarantee Alternative/Notification flow
    const isOutEverywhere = i % 7 === 0;
    if (isOutEverywhere) {
      INITIAL_INVENTORY[phId][medId] = 0;
    } else {
      // Assign stock to alternating pharmacies
      const hasStock = (i + idx) % 2 === 0;
      INITIAL_INVENTORY[phId][medId] = hasStock ? ((i * 3 + idx * 7) % 25) + 5 : 0;
    }
  });
}

// ---------------------------------------------------------------------------
// Price Generation (MRP per medicine, in INR, with per-pharmacy variance)
// ---------------------------------------------------------------------------
// Every medicine has a deterministic "base MRP", and each pharmacy sells it
// at a slightly different price (roughly -15% to +18%) to simulate the kind
// of real-world retail price variance you'd see across pharmacy chains.
export const INITIAL_PRICES = {};

pharmacyIds.forEach((phId) => {
  INITIAL_PRICES[phId] = {};
});

for (let i = 1; i <= 50; i++) {
  const medId = `med-${i}`;
  // Deterministic base MRP between roughly ₹25 and ₹420
  const baseMRP = 25 + ((i * 37) % 400);

  pharmacyIds.forEach((phId, idx) => {
    // Deterministic per-pharmacy variance factor: roughly -15% to +18%
    const variancePercent = ((i * 5 + idx * 11) % 34) - 15;
    const price = baseMRP * (1 + variancePercent / 100);
    INITIAL_PRICES[phId][medId] = Math.max(10, Math.round(price));
  });
}

// Simple Levenshtein distance for spelling corrections
export function getLevenshteinDistance(a, b) {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const matrix = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          Math.min(
            matrix[i][j - 1] + 1,   // insertion
            matrix[i - 1][j] + 1    // deletion
          )
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

// Find closest matching medicine in database
export function findMatchingMedicine(query, medicinesList) {
  const cleanQuery = query.trim().toLowerCase();
  if (!cleanQuery) return null;

  let bestMatch = null;
  let highestSimilarity = 0;
  let minDistance = 999;
  
  for (const med of medicinesList) {
    for (const syn of med.synonyms) {
      if (syn === cleanQuery) {
        return { medicine: med, distance: 0, matchedTerm: syn };
      }
      
      const dist = getLevenshteinDistance(syn, cleanQuery);
      const maxLen = Math.max(syn.length, cleanQuery.length);
      const similarity = 1 - dist / maxLen;

      if (similarity > highestSimilarity && similarity >= 0.6) {
        highestSimilarity = similarity;
        minDistance = dist;
        bestMatch = { medicine: med, distance: dist, matchedTerm: syn };
      }
    }
  }

  return bestMatch;
}
