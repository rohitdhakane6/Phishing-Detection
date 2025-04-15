const form = document.getElementById("urlForm");
const urlInput = document.getElementById("urlInput");
const resultDiv = document.getElementById("result");
const scanBtn = document.getElementById("scanBtn");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  resultDiv.textContent = "";
  resultDiv.className = "";
  scanBtn.disabled = true;
  scanBtn.textContent = "Analyzing...";

  const url = urlInput.value;

  if (!isValidUrl(url)) {
    resultDiv.textContent = "❌ Invalid URL";
    resultDiv.className = "result error";
    scanBtn.disabled = false;
    scanBtn.textContent = "Analyze URL";
    return;
  }

  try {
    const res = await fetch("http://127.0.0.1:5000/api/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer <token>` // optional if you use auth later
      },
      body: JSON.stringify({ url }),
    });

    if (!res.ok) throw new Error("Server error");

    const data = await res.json();

    resultDiv.className = `result ${data.isPhishing ? "error" : "success"}`;
    resultDiv.innerHTML = data.isPhishing
      ? `This URL is likely a phishing attempt.<br>Confidence: ${data.confidence.toFixed(2)}%`
      : `This URL appears safe.<br>Confidence: ${data.confidence.toFixed(2)}%`;
  } catch (err) {
    resultDiv.textContent = "Failed to fetch prediction";
    resultDiv.className = "result error";
  } finally {
    scanBtn.disabled = false;
    scanBtn.textContent = "Analyze URL";
  }
});

function isValidUrl(str) {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
}
