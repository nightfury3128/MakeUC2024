from flask import Flask, request, jsonify
import joblib

# Initialize Flask app
app = Flask(__name__)

# Load model and vectorizer
model = joblib.load(r'C:\Users\nipun\OneDrive\Documents\Desktop\MakeUC\MakeUC2024\model.joblib')
vectorizer = joblib.load(r'C:\Users\nipun\OneDrive\Documents\Desktop\MakeUC\MakeUC2024\vectorizer.joblib')

@app.route('/predict', methods=['POST'])
def predict():
    # Get email text from request
    email_text = request.json.get('email_text', '')
    if not email_text:
        return jsonify({'error': 'No email text provided'}), 400

    # Transform the text and predict
    transformed_text = vectorizer.transform([email_text])
    prediction = model.predict(transformed_text)
    is_phishing = bool(prediction[0])  # True if phishing, False if safe
    return jsonify({'is_phishing': is_phishing})

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000)
