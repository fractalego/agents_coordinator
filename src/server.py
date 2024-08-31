import flask
from flask import render_template

app = flask.Flask(__name__, static_folder="./static", template_folder="./templates")
## add cors support
from flask_cors import CORS
CORS(app)


def index():
    return render_template("index.html")


if __name__ == "__main__":
    app.add_url_rule("/", "index", index, methods=["GET"])
    app.run(host="0.0.0.0", port=8099, debug=True)
