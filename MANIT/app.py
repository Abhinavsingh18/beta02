from flask import Flask, request, send_file, jsonify, render_template
from theme_classifier import classify_image_theme_and_palette
import requests
import io
from PIL import Image

from flask_cors import CORS
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})


API_URL = "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-3.5-large"
headers = {"Authorization": "Bearer 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"}

def query(prompt):
    response = requests.post(API_URL, headers=headers, json={"inputs": prompt})
    if response.status_code == 200:
        return response.content
    return None

@app.route('/')
def index():
    return render_template('index.html')




@app.route('/analyze-image', methods=['POST'])
def analyze_image():
    if 'image' not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    image_file = request.files['image']
    print(f"Received image: {image_file.filename}")  # Log image filename
    theme, confidence, palette = classify_image_theme_and_palette(image_file)
    print(f"Theme: {theme}, Confidence: {confidence}, Palette: {palette}")  # Log results
    return jsonify({"theme": theme, "confidence": confidence * 100, "palette": palette})


@app.route('/generate-image', methods=['POST'])
def generate_image():
    data = request.get_json()
    prompt = data.get('prompt')
    image_bytes = query(prompt)
    if image_bytes:
        img = Image.open(io.BytesIO(image_bytes))
        img_io = io.BytesIO()
        img.save(img_io, 'PNG')
        img_io.seek(0)
        return send_file(img_io, mimetype='image/png')
    return jsonify({"error": "Failed to generate image"}), 500

@app.route('/test', methods=['GET'])
def test():
    return jsonify({"message": "working"})


if __name__ == '__main__':
    app.run(debug=True)
