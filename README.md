# Documind

DocuMind is an AI-powered assistant for understanding, summarizing, and querying documents. It allows you to chat with your PDF documents, making it easier to find information and gain insights.


## ✨ Features

-   **Document Upload:** Upload PDF files to the application.
-   **AI-Powered Summarization:** Get concise summaries of your documents.
-   **Interactive Q&A:** Ask questions about the document content and get instant answers using Retrieval-Augmented Generation (RAG).
-   **User-Friendly Interface:** Simple and intuitive interface built with React and TypeScript.

## ⚙️ How It Works

This project utilizes a **Retrieval-Augmented Generation (RAG)** architecture to provide answers from your documents. Here’s a step-by-step breakdown of the process:

1.  **Document Ingestion**: When you upload a PDF, the text is extracted and split into smaller, manageable chunks.
2.  **Vector Embeddings**: Each chunk of text is converted into a numerical representation called a vector embedding using OpenAI's models. These embeddings capture the semantic meaning of the text.
3.  **Indexing**: The embeddings are stored in a vector store, creating a searchable index of the document's content.
4.  **Retrieval**: When you ask a question, the query is also converted into an embedding. The system then searches the vector store to find the most relevant text chunks from the document based on semantic similarity.
5.  **Generation**: The retrieved text chunks are passed as context, along with your original question, to an OpenAI language model. The model then generates a relevant and context-aware answer.

## 🛠️ Tech Stack

-   **Frontend:** React, TypeScript, Vite
-   **Backend:** Python, Flask
-   **AI/ML:** LangChain, OpenAI, Retrieval-Augmented Generation (RAG)
![Documind](Documind.png)

## 🚀 Getting Started

### Prerequisites

-   Node.js and npm
-   Python 3.x and pip
-   An OpenAI API key

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/chayan-mann/Documind.git
    cd Documind
    ```

2.  **Set up the backend:**
    - Navigate to the `server` directory:
      ```bash
      cd server
      ```
    - Create a virtual environment and activate it:
      ```bash
      python -m venv venv
      source venv/bin/activate  # On Windows use `venv\Scripts\activate`
      ```
    - Install the required Python packages:
      ```bash
      pip install -r requirements.txt
      ```
    - Create a `.env` file and add your OpenAI API key:
      ```
      OPENAI_API_KEY="your_openai_api_key"
      ```

3.  **Set up the frontend:**
    - Navigate to the `client` directory:
      ```bash
      cd ../client
      ```
    - Install the required npm packages:
      ```bash
      npm install
      ```

### Running the Application

1.  **Start the backend server:**
    - From the `server` directory, run:
      ```bash
      flask run
      ```

2.  **Start the frontend development server:**
    - From the `client` directory, run:
      ```bash
      npm run dev
      ```

3.  Open your browser and navigate to `http://localhost:5173`.



## 🤝 Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any bugs or feature requests.


## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for details.
