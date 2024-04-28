from flask import Flask, request, jsonify
import joblib
from flask_cors import CORS


app = Flask(__name__)
CORS(app)


svm_model = joblib.load("SVM_mode.pkl")
tfidf_vectorizer = joblib.load("TFIDF_VECTORIZER.pkl")

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()

    titles = data['titles']

    titles_vectorized = tfidf_vectorizer.transform(titles)

    predictions = svm_model.predict(titles_vectorized)

    return jsonify({'predictions': predictions.tolist()})

@app.route('/')
def index():
    return 'SVM Classifier API is running!'

if __name__ == '__main__':
    app.run(debug=False)