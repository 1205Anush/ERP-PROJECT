const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

async function run() {
    try {
        console.log("Fetching notices...");
        const response = await fetch('http://localhost:5000/api/flows/notice-fetch-admin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await response.json();
        console.log("Full Response Structure:", JSON.stringify(data, null, 2));
    } catch (e) {
        console.error("Fetch error:", e);
    }
}
run();
