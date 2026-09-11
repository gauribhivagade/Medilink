export class PharmacySearchAgent {
  constructor() {
    this.name = "Pharmacy Search Agent";
    this.icon = "MapPin";
    this.role = "Scans local pharmacy inventories and tracks medicine stock status and distances.";
  }

  async run(searchData, pharmaciesList, inventoryMap, priceMap, onLog) {
    const { medicineId, brandName, genericName } = searchData;

    onLog(`Connecting to local pharmacy network database...`, "info");
    await new Promise((resolve) => setTimeout(resolve, 800));

    onLog(`Searching stock for: ${brandName} (Generic: ${genericName})`, "info");
    await new Promise((resolve) => setTimeout(resolve, 600));

    const results = [];
    let totalStock = 0;

    for (const pharmacy of pharmaciesList) {
      const pharmInventory = inventoryMap[pharmacy.id] || {};
      const pharmPrices = (priceMap && priceMap[pharmacy.id]) || {};
      const stock = pharmInventory[medicineId] || 0;
      const price = pharmPrices[medicineId] ?? null;
      totalStock += stock;

      onLog(`Checking inventory at ${pharmacy.name} (${pharmacy.distance} mi)...`, "info");
      await new Promise((resolve) => setTimeout(resolve, 350));

      if (stock > 0) {
        onLog(`-> FOUND: ${stock} units in stock at ${"\u20B9"}${price}/unit.`, "success");
      } else {
        onLog(`-> ALERT: Out of Stock.`, "warning");
      }

      results.push({
        pharmacyId: pharmacy.id,
        name: pharmacy.name,
        address: pharmacy.address,
        distance: pharmacy.distance,
        phone: pharmacy.phone,
        stock: stock,
        price: price,
        status: stock > 0 ? "In Stock" : "Out of Stock"
      });
    }

    // Sort by distance (nearest first) by default; the UI offers a "Cheapest" toggle
    results.sort((a, b) => a.distance - b.distance);

    onLog(`Sorting results by proximity...`, "info");
    await new Promise((resolve) => setTimeout(resolve, 500));

    const inStockCount = results.filter(r => r.stock > 0).length;

    // Identify cheapest in-stock price for quick "Best Price" highlighting downstream
    const inStockPrices = results.filter(r => r.stock > 0 && r.price != null).map(r => r.price);
    const cheapestPrice = inStockPrices.length > 0 ? Math.min(...inStockPrices) : null;

    if (cheapestPrice != null) {
      onLog(`Comparing prices across in-stock locations. Best price found: ${"\u20B9"}${cheapestPrice}.`, "info");
      await new Promise((resolve) => setTimeout(resolve, 400));
    }

    onLog(`Pharmacy search completed. Found ${inStockCount} pharmacies with stock.`, inStockCount > 0 ? "success" : "error");
    await new Promise((resolve) => setTimeout(resolve, 400));

    return {
      success: true,
      thoughts: [
        `Queried inventory databases for all 5 nearby pharmacies.`,
        `Checked stocks and prices for medication ID "${medicineId}".`,
        `Calculated closest availability distances.`,
        cheapestPrice != null
          ? `Identified best available price of ₹${cheapestPrice} among in-stock locations.`
          : `No in-stock locations available for price comparison.`,
        `Found ${inStockCount} matching locations with stock, out of 5 total.`
      ],
      data: {
        results,
        totalStock,
        anyInStock: totalStock > 0,
        cheapestPrice
      }
    };
  }
}
