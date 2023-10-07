import openai
import os
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from dotenv import load_dotenv

load_dotenv()

# Set your API key here
# API_KEY = os.getenv("OPENAI_API_KEY")

# Setting the API key
openai.api_key = "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"

embeddings = []  # List to store embeddings
paragraphs = []  # List to store corresponding paragraphs

def process_paragraph(paragraph):
    try:
        # Create an embedding
        response = openai.Embedding.create(
            input=paragraph,
            engine="text-embedding-ada-002"
        )
        
        # Extract and store the embedding and paragraph
        embedding = response['data'][0]['embedding']
        embeddings.append(embedding)
        paragraphs.append(paragraph)
        
    except Exception as e:
        print(f"An error occurred: {e}")

def main():
    file_path = "AFA10.txt"  # Replace with the path to your file
    
    with open(file_path, 'r', encoding='utf-8') as file:
        paragraph = ""
        for line in file:
            if line.strip():
                paragraph += line
            else:
                process_paragraph(paragraph)
                paragraph = ""
        
        if paragraph:
            process_paragraph(paragraph)
    
    # Now all paragraphs have been processed and embeddings created
    # Replace with your prompt
    prompt = """From the provided text, extract information that an injury lawyer would find helpful. Be sure to look for
    specific policies, the amount of money available for reimbursement, and information of the sort. Keep it brief, but suffcient.""" 
    
    # Create an embedding for the prompt
    response = openai.Embedding.create(
        input=prompt,
        engine="text-embedding-ada-002"
    )
    prompt_embedding = response['data'][0]['embedding']
    
    # Find the most similar paragraph to the prompt
    similarities = cosine_similarity([prompt_embedding], embeddings)[0]
    most_similar_index = np.argmax(similarities)
    most_similar_paragraph = paragraphs[most_similar_index]
    
    # Pass the most similar paragraph as context to GPT with the prompt
    context = f"{most_similar_paragraph}\n{prompt}"
    response = openai.Completion.create(
        engine="davinci",
        prompt=context,
        max_tokens=150
    )
    
    # Print GPT's response
    generated_text = response['choices'][0]['text'].strip()
    with open("output.txt", "w") as f:
        f.write(generated_text)
    # print(f"GPT's response: {generated_text}")

if __name__ == "__main__":
    main()