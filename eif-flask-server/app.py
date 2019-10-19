from flask import Flask
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)

@app.route('/')
def hello():
  return "Hello World!"


@app.route('/dict', methods=['GET'])
@cross_origin()
def new_dict():
  new_dict = {}
  new_dict.update({"Hello": "Got it"})
  return new_dict

@app.route('/upload')
def upload():
  return "uploaded?"


if __name__ == '__main__':
  app.run()