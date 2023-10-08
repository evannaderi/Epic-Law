from google.cloud import vision_v1
from google.oauth2 import service_account
import io

from langchain.document_loaders import TextLoader


def extract_text_from_image(image_path, output_path):
    creds = service_account.Credentials.from_service_account_file(
        'intrepid-alloy-401317-038095ed3c75.json')
    client = vision_v1.ImageAnnotatorClient(credentials=creds)

    with io.open(image_path, 'rb') as pdf_file:
        content = pdf_file.read()

    image = vision_v1.Image(content=content)
    response = client.document_text_detection(image=image)

    all_text = response.full_text_annotation.text

    with open(output_path, 'a', encoding="utf-8") as output_file:
        output_file.write(all_text)


def load_and_convert_txt(txt_path):
    loader = TextLoader(txt_path)
    data = loader.load()
    print(f'You have {len(data)} documents in your data')
    return data