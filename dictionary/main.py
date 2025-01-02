from flask import Flask, request, jsonify

from lambda_function import ab_checks

app = Flask(__name__)

@app.route("/")
def hello_world():
  return "Hello, World"

@app.route("/abcheck")
def ab_checks_rest():
  word = request.args.get('word', default='')
  res = ab_checks(word)

  return jsonify(res), 200

if __name__ == "__main__":
    app.run(debug=True)
