import ocr_pdf_parse
import query_data
import image_parse

# first, for images
image_parse.extract_text_from_image_pdf('documents/test.jpeg', 'output.txt')

# Then image pdfs
ocr_pdf_parse.process_and_append_pdf('documents/report.pdf', 'output.txt')

# Then text pdfs to data
text_pdf_data = query_data.load_and_convert_pdf('documents/AFA10.pdf')

# Get image + image pdf data
image_data = query_data.load_and_convert_txt('output.txt')

# Concatanate data
all_data = text_pdf_data + image_data

#Get embeddings
embeddings = query_data.process_text_and_get_embeddings(all_data)

