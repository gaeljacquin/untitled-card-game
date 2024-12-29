from flask import Flask, jsonify

from check_ab import check_ab_word, check_ab_prefix

app = Flask(__name__)

@app.route("/")
def hello_world():
  return "Hello, World"

@app.route("/checkab")
def check_ab():
  word = 'connect'
  is_ab_word = check_ab_word(word)
  ab_prefix_res = check_ab_prefix(word)
  res = { "word": word, "is_ab_word": is_ab_word, "is_ab_prefix": ab_prefix_res['is_ab_prefix'], "matching_words": ab_prefix_res['matching_words'] }

  return jsonify(res), 200

if __name__ == "__main__":
    app.run()
