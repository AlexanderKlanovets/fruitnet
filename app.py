import os
from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from model.fruitnet import FruitNet

app = Flask(__name__)
CORS(app)

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
app.config['MAX_CONTENT_LENGTH'] = 2 * 1024 * 1024 # 2 MB

MODEL_PATH = os.path.join(
    'config',
    'fruit_classifier_v3_transfer_learning.h5'
)
model = FruitNet(MODEL_PATH)


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/', methods=['GET'])
def main():
    return render_template('index.html')


@app.route('/', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'message': 'No image found.'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'message': 'Image wasn\'t selected.'}), 400
    if file and allowed_file(file.filename):
        label, percentage = model.predict(file.read())
        return jsonify({ 'label': label, 'percentage': percentage })
    return jsonify({'message': 'Only JPEG or PNG images are allowed.'}), 400


if __name__ == '__main__':
    app.run(host='0.0.0.0')
