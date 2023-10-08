from google.cloud import vision_v1
from google.oauth2 import service_account
import io

def extract_text_from_image_pdf(pdf_path, output_path):
    creds = service_account.Credentials.from_service_account_file(
        'intrepid-alloy-401317-038095ed3c75.json')
    client = vision_v1.ImageAnnotatorClient(credentials=creds)

    with io.open(pdf_path, 'rb') as pdf_file:
        content = pdf_file.read()

    image = vision_v1.Image(content=content)
    response = client.document_text_detection(image=image)

    all_text = response.full_text_annotation.text

    with open(output_path, 'w', encoding="utf-8") as output_file:
        output_file.write(all_text)

if __name__ == "__main__":
    input_pdf_path = "documents/test.jpeg"
    output_txt_path = "output.txt"

    extract_text_from_image_pdf(input_pdf_path, output_txt_path)
