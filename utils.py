from google.cloud import vision
from google.cloud.vision import types

def read_image_pdfs(filepath, out_dst):
    client = vision.ImageAnnotatorClient()

    with open(filepath, 'rb') as f:
        content = f.read()

    image = types.Image(content=content)

    response = client.document_text_detection(image=image)

    document = response.full_text_annotation.text
    with open(out_dst, 'w') as f:
        f.write(document)