from flask import Flask, render_template, request
import qrcode
from io import BytesIO

app = Flask(__name__)

def generate_qrcode(data):
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )

    qr.add_data(data)
    qr.make(fit=True)

    img = qr.make_image(fill_color="black", back_color="white")
    img_bytes = BytesIO()
    img.save(img_bytes)
    img_bytes.seek(0)

    return img_bytes

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/generate_qrcode', methods=['POST'])
def generate_qrcode_page():
    data_to_encode = request.form['data']
    img_bytes = generate_qrcode(data_to_encode)
    
    return render_template('qrcode.html', img_bytes=img_bytes)

if __name__ == '__main__':
    app.run(debug=True)
