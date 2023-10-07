import pytesseract
from pdf2image import convert_from_path
import PyPDF2
# import sys

def extract_text_from_image_pdf(pdf_path, output_path):
    # Convert PDF pages to images
    images = convert_from_path(pdf_path)
    
    # Extract text from each image using OCR
    all_text = ""
    for i, image in enumerate(images):
        text = pytesseract.image_to_string(image)
        all_text += text

    # Write the extracted text to an output file
    with open(output_path, 'w', encoding="utf-8") as output_file:
        output_file.write(all_text)

if __name__ == "__main__":
    # if len(sys.argv) != 3:
    #     print("Usage: python script_name.py input.pdf output.txt")
    #     sys.exit(1)
    
    input_pdf_path = "report.pdf"
    output_txt_path = "output.txt"

    extract_text_from_image_pdf(input_pdf_path, output_txt_path)
