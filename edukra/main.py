from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import CharacterTextSplitter
from langchain_astradb import AstraDBVectorStore
from langchain_huggingface import HuggingFaceEmbeddings
from langchain.prompts import PromptTemplate
from huggingface_hub import InferenceClient
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

ASTRA_DB_API_ENDPOINT = os.getenv("ASTRA_DB_API_ENDPOINT")
ASTRA_DB_APPLICATION_TOKEN = os.getenv("ASTRA_DB_APPLICATION_TOKEN")
ASTRA_DB_NAMESPACE = os.getenv("ASTRA_DB_NAMESPACE")
HUGGINGFACEHUB_API_TOKEN = os.getenv("HUGGINGFACEHUB_API_TOKEN")

# Ensure the PDF file exists
pdf_path = "./sources/Harvard_Medical.pdf"
if not os.path.exists(pdf_path):
    raise FileNotFoundError(f"PDF file not found at: {pdf_path}")

# Custom prompt template
PROMPT = PromptTemplate(
    template="""Roleplay as a Q&A chatbot. Use the following context to answer the question. 
If you don't know the answer, just say that you don't know, don't try to make up an answer.

Context: {context}
Question: {question}

Answer:""",
    input_variables=["context", "question"]
)

# Step 1: Store Embeddings in AstraDB Vector Store (Fresh Data)
async def store_vectors():
    pdf_loader = PyPDFLoader(pdf_path)  
    documents = pdf_loader.load()

    text_splitter = CharacterTextSplitter(chunk_size=500, chunk_overlap=50)
    docs = text_splitter.split_documents(documents)

    embedding_model = "sentence-transformers/all-MiniLM-L6-v2"
    embeddings = HuggingFaceEmbeddings(model_name=embedding_model)

    vectorstore = AstraDBVectorStore(
        collection_name="main",
        embedding=embeddings,
        api_endpoint=ASTRA_DB_API_ENDPOINT,
        token=ASTRA_DB_APPLICATION_TOKEN,
        namespace=ASTRA_DB_NAMESPACE,
    )    

    await vectorstore.adelete()
    vectorstore.add_documents(documents=docs)

    print("Vectors stored successfully.")

def query_model(context, query):
    client = InferenceClient(token=HUGGINGFACEHUB_API_TOKEN)

    prompt = f"""Roleplay as a Q&A chatbot. Use the following context to answer the question.
If you don't know the answer, just say that you don't know, don't try to make up an answer.

Context: {context}
Question: {query}

Answer:"""

    response = client.chat_completion(
        model="mistralai/Mistral-7B-Instruct-v0.3",
        messages=[{"role": "user", "content": prompt}]
    )

    return response["choices"][0]["message"]["content"]

# Step 2: Fetch & Query Data using Hugging Face Inference API
def fetch_and_query():
    embedding_model = "sentence-transformers/all-MiniLM-L6-v2"
    embeddings = HuggingFaceEmbeddings(model_name=embedding_model)

    vectorstore = AstraDBVectorStore(
        collection_name="main",
        embedding=embeddings,
        api_endpoint=ASTRA_DB_API_ENDPOINT,
        token=ASTRA_DB_APPLICATION_TOKEN,
        namespace=ASTRA_DB_NAMESPACE,
    )

    retriever = vectorstore.as_retriever()

    query = input("Message: ")

    # Retrieve relevant context from stored embeddings
    retrieved_docs = retriever.invoke(query)
    context = "\n\n".join([doc.page_content for doc in retrieved_docs])

    try:
        result = query_model(context, query)
        print("AI Response:", result)
    except Exception as e:
        print(f"An error occurred: {str(e)}")

if __name__ == "__main__":
    fetch_and_query()