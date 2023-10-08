from langchain.document_loaders import UnstructuredPDFLoader, OnlinePDFLoader, PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
import os
from langchain.vectorstores import Chroma, Pinecone
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.llms import OpenAI
from langchain.chains.question_answering import load_qa_chain
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")

def load_and_convert_pdf(pdf_path):
    loader = UnstructuredPDFLoader(pdf_path)
    data = loader.load()
    print(f'You have {len(data)} documents in your data')
    return data


def process_text_and_get_embeddings(data):
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=2000, chunk_overlap=50)
    texts = text_splitter.split_documents(data)
    embeddings_model = OpenAIEmbeddings(openai_api_key=api_key)
    doc_search = Chroma.from_documents(texts, embeddings_model)
    print(f'You now have {len(texts)} texts in your data')
    return doc_search

def send_prompt_and_get_response(doc_search, query):
    llm = OpenAI(temperature=0, openai_api_key=api_key)
    chain = load_qa_chain(llm, chain_type="stuff")
    docs = doc_search.similarity_search(query)
    res = chain.run(input_documents=docs, question=query)
    print(res)
    return res

# # Replace 'documents/AFA10.pdf' and 'Which is not covered under bodily injury?' with your own values
# pdf_path = 'documents/AFA10.pdf'
# query = "Which is not covered under bodily injury?"

# # Now you can call these functions in sequence to carry out the process.
# data = load_and_convert_pdf(pdf_path)
# doc_search = process_text_and_get_embeddings(data)
# response = send_prompt_and_get_response(doc_search, query)