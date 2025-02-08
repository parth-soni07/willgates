import { SubscriptionsClient } from "calimero-client-js";

const subscriptionsClient = new SubscriptionsClient(
  "wss://your-calimero-subscription-url.com"
);

function subscribeToUpdates() {
  subscriptionsClient.on("data", (update) => {
    console.log("Received update:", update);
  });

  subscriptionsClient.on("error", (error) => {
    console.error("Subscription error:", error);
  });

  subscriptionsClient.subscribe("your-subscription-query");
}

subscribeToUpdates();
