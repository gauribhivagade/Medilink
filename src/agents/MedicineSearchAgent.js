import { findMatchingMedicine } from "../data/db";

export class MedicineSearchAgent {
  constructor() {
    this.name = "Medicine Search Agent";
    this.icon = "Search";
    this.role = "Identifies medications, resolves spellings, and extracts generic structures.";
  }

  async run(userQuery, medicinesList, onLog) {
    onLog("Initializing search agent...", "info");
    await new Promise((resolve) => setTimeout(resolve, 800));

    onLog(`Analyzing user query: "${userQuery}"`, "info");
    await new Promise((resolve) => setTimeout(resolve, 600));

    const matchResult = findMatchingMedicine(userQuery, medicinesList);

    if (!matchResult) {
      onLog(`Unable to find any close match for "${userQuery}" in medicine inventory database.`, "error");
      return {
        success: false,
        thoughts: [
          `Received query "${userQuery}".`,
          `Scanned all 5 primary drugs and 30+ synonyms in database.`,
          `No match found above spelling similarity threshold of 60%.`
        ],
        data: null
      };
    }

    const { medicine, distance, matchedTerm } = matchResult;

    if (distance > 0) {
      onLog(`Spelling correction triggered! Detected typo in "${userQuery}". Corrected to: "${medicine.brandName}" (distance: ${distance})`, "warning");
      await new Promise((resolve) => setTimeout(resolve, 850));
    } else {
      onLog(`Exact match found for term: "${matchedTerm}"`, "success");
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    onLog(`Detecting generic chemical composition...`, "info");
    await new Promise((resolve) => setTimeout(resolve, 700));
    
    onLog(`Generic substance identified: ${medicine.genericName} (${medicine.class})`, "success");
    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
      success: true,
      thoughts: [
        `Received raw query "${userQuery}".`,
        distance > 0 
          ? `Matched spelling variant "${matchedTerm}" to brand "${medicine.brandName}" (distance ${distance}).`
          : `Matched exact term "${matchedTerm}" to brand "${medicine.brandName}".`,
        `Identified generic pharmaceutical ingredient as "${medicine.genericName}".`,
        `Mapped drug class to "${medicine.class}".`
      ],
      data: {
        medicineId: medicine.id,
        brandName: medicine.brandName,
        genericName: medicine.genericName,
        class: medicine.class,
        description: medicine.description,
        matchedTerm
      }
    };
  }
}
