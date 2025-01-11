from flask import Flask, request, jsonify

from lambda_function import ab_check

app = Flask(__name__)

@app.route("/")
def hello_world():
  return "Hello, World"

@app.route("/abcheck", methods=['POST'])
def ab_checks_rest():
  word_map = request.json
  res = ab_check(word_map)

  return jsonify(res), 200

if __name__ == "__main__":
    app.run(debug=True)
