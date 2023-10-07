import PyPDF2

def extract_text_from_pdf(pdf_path):
    # Open the PDF and create a PDF reader object
    with open(pdf_path, 'rb') as pdf_file:
        reader = PyPDF2.PdfReader(pdf_file)
        
        all_text = []

        # Loop through all the pages in the PDF
        for page_num in range(len(reader.pages)):
            text = reader.pages[page_num].extract_text()
            all_text.append(text)

        return " ".join(all_text)

def split_text_into_columns(text):
    # Here we're assuming that columns are separated by a certain 
    # number of spaces, for simplicity let's assume it's more than 4 spaces
    # This will change depending on your document's structure.
    chunks = text.split(' ' * 5)
    
    return chunks

def main():
    path_to_pdf = 'AFA10.pdf'
    extracted_text = extract_text_from_pdf(path_to_pdf)
    chunks = split_text_into_columns(extracted_text)

    # Print out the chunks for now, you can process them further as needed
    with open('AFA10.txt', 'w') as f:
        for chunk in chunks:
            f.write(chunk)
            f.write("\n")
    # for chunk in chunks:
    #     print(chunk)
    #     print("-" * 80)

if __name__ == '__main__':
    main()
