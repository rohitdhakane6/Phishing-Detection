(async () => {
  const currentUrl = window.location.href;

  // Create a custom alert modal
  const createModal = (message, confidence) => {
    // Modal container
    const modal = document.createElement("div");
    modal.style.position = "fixed";
    modal.style.top = "0";
    modal.style.left = "0";
    modal.style.width = "100vw";
    modal.style.height = "100vh";
    modal.style.backgroundColor = "rgba(0, 0, 0, 0.4)";
    modal.style.display = "flex";
    modal.style.justifyContent = "center";
    modal.style.alignItems = "center";
    modal.style.zIndex = "9999";
    modal.style.padding = "20px";

    // Modal content box
    const modalContent = document.createElement("div");
    modalContent.style.backgroundColor = "#ffffff";
    modalContent.style.padding = "20px";
    modalContent.style.borderRadius = "10px";
    modalContent.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.2)";
    modalContent.style.maxWidth = "400px";
    modalContent.style.width = "100%";
    modalContent.style.textAlign = "center";
    modalContent.style.fontFamily = "Arial, sans-serif";

    // Modal message
    const messageElement = document.createElement("p");
    messageElement.style.fontSize = "18px";
    messageElement.style.margin = "0";
    messageElement.style.color = "#333333";
    messageElement.innerHTML = `${message}<br><span style="font-size: 14px; color: #999999;">Confidence: ${confidence.toFixed(2)}%</span>`;

    // Close button
    const closeButton = document.createElement("button");
    closeButton.innerText = "Close";
    closeButton.style.marginTop = "15px";
    closeButton.style.padding = "10px 20px";
    closeButton.style.backgroundColor = "#f44336";
    closeButton.style.color = "white";
    closeButton.style.border = "none";
    closeButton.style.borderRadius = "5px";
    closeButton.style.cursor = "pointer";
    closeButton.style.fontSize = "16px";

    // Add event to close modal
    closeButton.addEventListener("click", () => {
      modal.remove();
    });

    modalContent.appendChild(messageElement);
    modalContent.appendChild(closeButton);
    modal.appendChild(modalContent);

    document.body.appendChild(modal);
  };

  try {
    const res = await fetch("http://127.0.0.1:5000/api/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: currentUrl }),
    });

    if (!res.ok) throw new Error("Prediction failed");
    console.log("[Phishing Extension] Content script loaded on:", window.location.href);

    const result = await res.json();

    if (result.isPhishing) {
      createModal("⚠️ Phishing Detected!", result.confidence);
    }
  } catch (error) {
    console.error("Phishing check failed:", error);
  }
})();
