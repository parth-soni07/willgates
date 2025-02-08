import { RpcClient } from "calimero-client-js";

const rpcClient = new RpcClient("https://your-calimero-api-url.com");

async function fetchData() {
  try {
    const response = await rpcClient.fetchData("your-data-query");
    console.log("Data fetched:", response);
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
}

fetchData();
