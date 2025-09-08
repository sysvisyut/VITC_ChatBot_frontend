import os
import weaviate
from weaviate.classes.init import Auth
from weaviate.classes.config import Configure, Property, DataType
from weaviate.exceptions import WeaviateQueryError, WeaviateConnectionError


# Weaviate Configuration from environment variables


def connect_to_weaviate():
    """Connects to Weaviate and returns the client object."""

    try:
        WEAVIATE_URL = os.getenv("WEAVIATE_URL")
        WEAVIATE_API_KEY = os.getenv("WEAVIATE_API_KEY")
        if not WEAVIATE_URL or not WEAVIATE_API_KEY:
            print("unable to fetch weaviate api/url")
            return None
        print("Connecting to Weaviate Cloud...")
        client = weaviate.connect_to_weaviate_cloud(
            cluster_url=WEAVIATE_URL,
            auth_credentials=Auth.api_key(WEAVIATE_API_KEY),
        )
        if not client.is_ready():
            print("❌ Could not connect to Weaviate. Check your credentials.")
            return None
        print("✅ Weaviate connection successful.")
        return client
    except WeaviateConnectionError as e:
        print(f"❌ Weaviate connection error: {e}")
        return None

def get_or_create_collection(client, collection_name="VIT_docs"):
    """Gets a collection if it exists, otherwise creates and populates it."""
    if not client.collections.exists(collection_name):
        print(f"Collection '{collection_name}' not found. Creating and populating...")
        try:
            client.collections.create(
                name=collection_name,
                vector_config=Configure.Vectorizer.text2vec_weaviate(),
                properties=[
                    Property(name="text_chunk", data_type=DataType.TEXT),
                    Property(name="source_file", data_type=DataType.TEXT)
                ],
            )
            print(f"✅ Collection '{collection_name}' created.")
            
            documents_collection = client.collections.get(collection_name)
            data = [
                {"text_chunk": "The capital of France is Paris.", "source_file": "doc1.pdf"},
                {"text_chunk": "The Eiffel Tower is a famous landmark in Paris.", "source_file": "doc1.pdf"},
                {"text_chunk": "Python is a popular programming language.", "source_file": "doc2.pdf"},
                {"text_chunk": "Large language models, like Gemini, are transforming AI.", "source_file": "doc3.pdf"},
            ]
            with documents_collection.batch.dynamic() as batch:
                for doc in data:
                    batch.add_object(properties=doc)
            print("✅ Sample data imported successfully.")
        except Exception as e:
            print(f"❌ Error creating or populating collection: {e}")
            return None
    else:
        print(f"Collection '{collection_name}' already exists.")
    
    return client.collections.get(collection_name)


def retrieve_chunks(collection, query_text, limit=3):
    """Retrieves relevant text chunks from the Weaviate collection."""
    try:
        print("Retrieving relevant documents from Weaviate...")
        response = collection.query.near_text(
            query=query_text,
            limit=limit
        )
        retrieved_chunks = [obj.properties['text_chunk'] for obj in response.objects]
        
        if not retrieved_chunks:
            print("❌ No relevant documents found in Weaviate.")
            return []
        
        print("✅ Retrieved Documents:")
        for i, chunk in enumerate(retrieved_chunks):
            print(f"  - Chunk {i+1}: {chunk}")
        return retrieved_chunks

    except WeaviateQueryError as e:
        print(f"❌ Weaviate query error: {e}")
        return []