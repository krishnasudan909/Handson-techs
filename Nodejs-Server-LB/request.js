//Sends parallel 10000 requests
const axios = require("axios");

const n = 10000; // Number of parallel requests
let suc = 0;
let fail = 0;

async function sendRequest() {
  try {
    const response = await axios.get("http://localhost:3000/test");
    suc = suc + 1;
  } catch (error) {
    fail = fail + 1;
    console.error("Error:", error.message);
  }
}
const requests = [];
for (let i = 0; i < n; i++) {
  requests.push(sendRequest());
}

Promise.all(requests)
  .then(() => {
    console.log("All requests completed successfully");
    console.log("Total requests: ", n);
    console.log("Success: ", suc);
    console.log("Failed: ", fail);
  })
  .catch((error) => {
    console.error("One or more requests failed:", error);
  });
