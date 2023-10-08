from google.api_core.client_options import ClientOptions
from google.cloud import documentai

PROJECT_ID = "intrepid-alloy-401317"
LOCATION = "us"  # Format is 'us' or 'eu'
PROCESSOR_ID = "a448e307b426c48a"  # Create processor in Cloud Console
MIME_TYPE = "application/pdf"  # MIME type for PDF files

# Instantiate a client
docai_client = documentai.DocumentProcessorServiceClient(
    client_options=ClientOptions(api_endpoint=f"{LOCATION}-documentai.googleapis.com")
)

RESOURCE_NAME = docai_client.processor_path(PROJECT_ID, LOCATION, PROCESSOR_ID)

def process_and_append_pdf(file_path, output_path):
    # Read the file into memory
    with open(file_path, "rb") as image:
        image_content = image.read()

    # Load Binary Data into Document AI RawDocument Object
    raw_document = documentai.RawDocument(content=image_content, mime_type=MIME_TYPE)

    # Configure the process request
    request = documentai.ProcessRequest(name=RESOURCE_NAME, raw_document=raw_document)

    # Use the Document AI client to process the PDF
    result = docai_client.process_document(request=request)

    document_object = result.document
    print("Document processing complete.")

    # Append the processed text to the output file
    with open(output_path, "a") as file:
        file.write(document_object.text)
    print(f"Text appended to {output_path}")