from flask import Flask
from flask import request
from flask_cors import CORS, cross_origin
import base64

app = Flask(__name__)
CORS(app)

@app.route('/')
def hello():
  return "Hello World!"


@app.route('/upload', methods=['POST'])
@cross_origin()
def upload():
  req = request.get_json()
  print(req)
  fileA_decoded = base64.b64decode(req['fileA_encoded'])
  fileB_decoded = base64.b64decode(req['fileB_encoded'])
  print(fileA_decoded)
  print(fileB_decoded)
  return "<List of pairings>"


if __name__ == '__main__':
  app.run()