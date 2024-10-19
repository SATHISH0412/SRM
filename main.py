from flask import Flask, request, render_template, redirect, url_for
from inference_sdk import InferenceHTTPClient
from PIL import Image
import os

# Initialize the Flask app
app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads/'

# Initialize the Roboflow inference client
CLIENT = InferenceHTTPClient(
    api_url="https://detect.roboflow.com",
    api_key="lkpgUV1J2gLNxrCWEn6b"
)

# Ensure the upload directory exists
if not os.path.exists(app.config['UPLOAD_FOLDER']):
    os.makedirs(app.config['UPLOAD_FOLDER'])

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload_image():
    # Check if the POST request has the file part
    if 'file' not in request.files:
        return redirect(url_for('home'))

    file = request.files['file']

    # If no file is selected
    if file.filename == '':
        return redirect(url_for('home'))

    if file:
        # Save the file to the upload folder
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(filepath)

        # Open the image using PIL
        image = Image.open(filepath)

        # Perform inference using Roboflow
        result = CLIENT.infer(image, model_id="human-race-detection/7")

        # Display the result on the result page
        return render_template('result.html', result=result)

if __name__ == '__main__':
    app.run(debug=True)
