from flask import Flask, request, render_template, jsonify
from flask_cors import CORS
from featureExtractor import featureExtraction
from pycaret.classification import load_model, predict_model # type: ignore

# Load the trained model
model = load_model('model/phishingdetection')

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for cross-origin requests (e.g., from Next.js)

# Function to predict phishing
def predict(url):
    data = featureExtraction(url)
    result = predict_model(model, data=data)
    prediction_score = result['prediction_score'][0]
    prediction_label = result['prediction_label'][0]
    
    return {
        'prediction_label': prediction_label,  # 1 = Phishing, 0 = Safe
        'prediction_score': prediction_score * 100,  # Convert to percentage
    }

# Web form route (optional)
@app.route("/", methods=["GET", "POST"])
def index():
    data = None
    url = None
    if request.method == "POST":
        url = request.form["url"]
        data = predict(url)
    return render_template("index.html", url=url, data=data)

# API endpoint for ML predictions (used by Next.js)
@app.route("/api/predict", methods=["POST"])
def api_predict():
    try:
        json_data = request.get_json()
        url = json_data.get("url")

        if not url:
            return jsonify({"error": "Missing URL"}), 400

        result = predict(url)
        return jsonify({
            "isPhishing": bool(result["prediction_label"] == 1),
             "confidence": float(result["prediction_score"])
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Entry point
if __name__ == "__main__":
    app.run(debug=False)
