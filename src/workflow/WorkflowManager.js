import { MedicineSearchAgent } from "../agents/MedicineSearchAgent";
import { PharmacySearchAgent } from "../agents/PharmacySearchAgent";
import { AlternativeMedicineAgent } from "../agents/AlternativeMedicineAgent";
import { NotificationAgent } from "../agents/NotificationAgent";

export class WorkflowManager {
  constructor() {
    this.agents = {
      search: new MedicineSearchAgent(),
      pharmacy: new PharmacySearchAgent(),
      alternative: new AlternativeMedicineAgent(),
      notification: new NotificationAgent()
    };
  }

  async executeWorkflow(userQuery, medicinesList, pharmaciesList, inventoryMap, pricesMap, callbacks = {}) {
    const {
      onAgentStart = () => {},
      onAgentLog = () => {},
      onAgentComplete = () => {}
    } = callbacks;

    const workflowLogs = [];
    const runAgent = async (agentKey, runnerFn) => {
      onAgentStart(agentKey, this.agents[agentKey]);
      
      const agentLogs = [];
      const handleLog = (text, type = "info") => {
        const timestamp = new Date().toLocaleTimeString();
        const logObj = { text, type, timestamp };
        agentLogs.push(logObj);
        onAgentLog(agentKey, logObj);
      };

      try {
        const result = await runnerFn(handleLog);
        onAgentComplete(agentKey, result);
        return result;
      } catch (err) {
        const errLog = { text: `Agent Error: ${err.message}`, type: "error", timestamp: new Date().toLocaleTimeString() };
        agentLogs.push(errLog);
        onAgentLog(agentKey, errLog);
        
        const failedResult = { success: false, thoughts: [`Encountered runtime exception: ${err.message}`], data: null };
        onAgentComplete(agentKey, failedResult);
        return failedResult;
      }
    };

    // 1. Run Medicine Search Agent
    const searchResult = await runAgent("search", (log) => 
      this.agents.search.run(userQuery, medicinesList, log)
    );

    if (!searchResult.success || !searchResult.data) {
      return {
        query: userQuery,
        completed: false,
        lastCompletedAgent: "search",
        results: { search: searchResult }
      };
    }

    // 2. Run Pharmacy Search Agent
    const pharmacyResult = await runAgent("pharmacy", (log) =>
      this.agents.pharmacy.run(searchResult.data, pharmaciesList, inventoryMap, pricesMap, log)
    );

    // 3. Run Alternative Medicine Agent (Runs concurrently or sequentially)
    const alternativeResult = await runAgent("alternative", (log) =>
      this.agents.alternative.run(searchResult.data, pharmacyResult.data, log)
    );

    // 4. Run Notification Agent
    const notificationResult = await runAgent("notification", (log) =>
      this.agents.notification.run(searchResult.data, pharmacyResult.data, log)
    );

    return {
      query: userQuery,
      completed: true,
      results: {
        search: searchResult,
        pharmacy: pharmacyResult,
        alternative: alternativeResult,
        notification: notificationResult
      }
    };
  }
}
export default WorkflowManager;
