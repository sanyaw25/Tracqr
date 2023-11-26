import qrcode

def generate_qrcode(data, filename="qrcode.png"):
    # Create a QR code instance
    qr = qrcode.QRCode(
        version=1,  # Controls the size of the QR Code (1 to 40)
        error_correction=qrcode.constants.ERROR_CORRECT_L,  # Controls the error correction used for the QR Code
        box_size=10,  # Controls how many pixels each “box” of the QR code is
        border=4,  # Controls how many boxes to use for the border
    )

    # Add data to the QR code instance
    qr.add_data(data)
    qr.make(fit=True)

    # Create an image from the QR code instance
    img = qr.make_image(fill_color="black", back_color="white")

    # Save the image
    img.save(filename)

    print(f"QR Code generated and saved as {filename}")

if __name__ == "__main__":
    # Input data for the QR code
    data_to_encode = input("Enter data to encode in the QR code: ")

    # Specify the filename for the generated QR code image
    output_filename = input("Enter the filename for the QR code image (default: qrcode.png): ") or "qrcode.png"

    # Generate the QR code
    generate_qrcode(data_to_encode, output_filename)
