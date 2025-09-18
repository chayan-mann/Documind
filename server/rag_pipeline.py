import os
from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import Chroma
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.prompts import PromptTemplate
from langchain.chains import RetrievalQA
from dotenv import load_dotenv

load_dotenv()
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

# Initialize global variables (persistent across API calls)
CHROMA_DB_DIR = "./chroma_db"
vectordb = None
custom_qa = None


def process_pdf(pdf_path: str):
    """
    Load a PDF, split into chunks, embed, and store in ChromaDB.
    """
    global vectordb, custom_qa

    loader = PyPDFLoader(pdf_path)
    documents = loader.load()
    print(f"Loaded {len(documents)} pages from PDF")

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=800,
        chunk_overlap=100
    )
    chunks = splitter.split_documents(documents)
    print(f"Total chunks created: {len(chunks)}")

    embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

    vectordb = Chroma(
    embedding_function=embeddings,
    persist_directory=CHROMA_DB_DIR
    )

    vectordb.add_documents(chunks)
    vectordb.persist()


    print("ChromaDB initialized with", vectordb._collection.count(), "embeddings")

    llm = ChatGoogleGenerativeAI(
        model="gemini-2.5-flash",
        google_api_key=GOOGLE_API_KEY
    )

    retriever = vectordb.as_retriever(search_kwargs={"k": 3})

    custom_qa = RetrievalQA.from_chain_type(
        llm=llm,
        chain_type="stuff",
        retriever=retriever,
        return_source_documents=True
    )

    return {"status": "PDF processed and stored successfully", "chunks": len(chunks)}


def answer_query(question: str):
    """
    Query the processed PDF using Gemini and return answer + sources.
    """
    global custom_qa
    if custom_qa is None:
        return {"error": "No PDF processed yet. Upload and process a PDF first."}

    result = custom_qa.invoke({"query": question})

    answer = result["result"]
    sources = [doc.page_content[:200] for doc in result["source_documents"]]

    return {"answer": answer, "sources": sources}
