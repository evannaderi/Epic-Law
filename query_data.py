# PDF Loaders. If unstructured gives you a hard time, try PyPDFLoader
from langchain.document_loaders import UnstructuredPDFLoader, OnlinePDFLoader, PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
import os
from langchain.vectorstores import Chroma, Pinecone
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.llms import OpenAI
from langchain.chains.question_answering import load_qa_chain

embeddings_model = OpenAIEmbeddings(openai_api_key=api_key)
doc_search = Chroma.from_documents(texts, embeddings_model)
# from dotenv import load_dotenv

# load_dotenv()
loader = UnstructuredPDFLoader('AFA10.pdf')
api_key = "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"
data = loader.load()
print(f'You have {len(data)} documents in your data')
text_splitter = RecursiveCharacterTextSplitter(chunk_size=2000, chunk_overlap=50)
texts = text_splitter.split_documents(data)
print(f'You now have {len(texts)} texts in your data')

llm = OpenAI(temperature=5, openai_api_key=api_key)
chain = load_qa_chain(llm, chain_type="stuff")

# replace with your own query
query = ""
docs = doc_search.similarity_search(query)

res = chain.run(input_documents=docs, question=query)
print(res)