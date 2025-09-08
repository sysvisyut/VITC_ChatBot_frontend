from dotenv import load_dotenv
from weaviate_handler import connect_to_weaviate, get_or_create_collection, retrieve_chunks
from gemini_handler import configure_gemini, generate_answer

def main():
    """
    Main function to orchestrate the RAG workflow.
    """
    # --- Environment and API Setup ---
    load_dotenv()

    if not configure_gemini():
        return # Exit if Gemini config fails

    client = connect_to_weaviate()
    if not client:
        return # Exit if Weaviate connection fails
    
    try:
        # --- Collection Setup ---
        collection_name = "VIT_docs"
        documents_collection = get_or_create_collection(client, collection_name)
        if not documents_collection:
            return # Exit if collection setup fails

        # --- RAG (Retrieval-Augmented Generation) Workflow ---
        
        # 1. User Query
        query_text = "What is the capital of France and what is it known for?"
        print(f"\nUser Query: '{query_text}'")

        # 2. Retrieval from Weaviate
        retrieved_chunks = retrieve_chunks(documents_collection, query_text)

        # 3. Generation with Gemini
        final_answer = generate_answer(retrieved_chunks, query_text)
        
        print("\n--- Final Answer ---")
        print(final_answer)
        print("--------------------")

    except Exception as e:
        print(f"❌ An unexpected error occurred in the main workflow: {e}")

    finally:
        # Always close the connection
        if client and client.is_connected():
            client.close()
            print("\nConnection to Weaviate closed.")


if __name__ == "__main__":
    main()
