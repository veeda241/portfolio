from flask import Flask, request, render_template_string
import csv
from datetime import datetime

app = Flask(__name__)

@app.route('/')
def home():
    with open("index.html", "r", encoding="utf-8") as f:
        return render_template_string(f.read())

@app.route('/submit', methods=['POST'])
def submit():
    name = request.form.get('name')
    email = request.form.get('email')
    message = request.form.get('message')
    timestamp = datetime.now().isoformat()

    with open('contact_messages.csv', 'a', newline='', encoding='utf-8') as file:
        writer = csv.writer(file)
        writer.writerow([timestamp, name, email, message])

    return f"<h2>Thanks for reaching out, {name}!<br>Your message has been saved.</h2>"

if __name__ == "__main__":
    app.run(debug=True)

