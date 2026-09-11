export class NotificationAgent {
  constructor() {
    this.name = "Notification Agent";
    this.icon = "BellRing";
    this.role = "Schedules and handles stock alerts, notifications, and restock watchlists.";
  }

  async run(searchData, pharmacyResults, onLog) {
    const { brandName, genericName } = searchData;
    const { anyInStock } = pharmacyResults;

    if (anyInStock) {
      onLog(`Primary medicine is in stock. Notification agent standby.`, "info");
      return {
        success: true,
        triggered: false,
        thoughts: [
          `Medicine is available. No restock alerts needed.`
        ],
        data: null
      };
    }

    onLog(`Primary medicine "${brandName}" is out of stock. Initiating alert creation template...`, "warning");
    await new Promise((resolve) => setTimeout(resolve, 600));

    onLog(`Creating restock subscription schema for "${brandName}"...`, "info");
    await new Promise((resolve) => setTimeout(resolve, 800));

    const notificationMessage = `RESTOCK ALERT: Good news! ${brandName} (${genericName}) is now back in stock at Apollo Pharmacy. Search again on MediLink AI to confirm stock and secure your medication.`;

    onLog(`Alert drafted successfully: "RESTOCK ALERT: Good news!..."`, "success");
    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
      success: true,
      triggered: true,
      thoughts: [
        `Identified that "${brandName}" is currently unavailable.`,
        `Drafted automated SMS/Email notification template.`,
        `Created listener schema for database inventory replenishment.`
      ],
      data: {
        medicineName: brandName,
        genericName,
        messageTemplate: notificationMessage,
        channels: ["SMS", "Email", "App Push"]
      }
    };
  }
}
