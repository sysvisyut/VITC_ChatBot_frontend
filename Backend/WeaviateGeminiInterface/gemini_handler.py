import os
import google.generativeai as genai

#gemini congfig
global GEMINI_MODEL
def configure_gemini():
    """Configures the Gemini API and initializes the model."""
    global GEMINI_MODEL
    GOOGLE_API_KEY = os.getenv("GEMINI_API_KEY")
    GEMINI_MODEL = os.getenv("GEMINI_MODEL")
    if not GOOGLE_API_KEY or not GEMINI_MODEL:
        print("❌ GOOGLE_API_KEY/MODEL SELECTION not found in .env file.")
        return False
    
    try:
        genai.configure(api_key=GOOGLE_API_KEY)
        GEMINI_MODEL = genai.GenerativeModel(GEMINI_MODEL)
        print("✅ Gemini API configured successfully.")
        return True
    except Exception as e:
        print(f"❌ Error configuring Gemini API: {e}")
        return False

def generate_answer(context_chunks, query_text):
    """Generates an answer using Gemini based on the provided context."""
    global GEMINI_MODEL
    if not GEMINI_MODEL:
        print("❌ Gemini model is not configured. Please call configure_gemini() first.")
        return "Error: Gemini model not configured."
        
    if not context_chunks:
        return "I could not find any relevant information to answer your question."

    context = "\n".join(context_chunks)
    
    # This prompt template is crucial for instructing the model effectively
    prompt = f"""
    CONTEXT:
    ---
    {context}
    ---
    Based ONLY on the context provided above, please answer the following question. Do not use any other information.

    QUESTION: {query_text}
    """

    try:
        print("\nGenerating answer with Gemini...")
        response = GEMINI_MODEL.generate_content(prompt)
        return response.text
    except Exception as e:
        print(f"❌ Error generating content with Gemini: {e}")
        return "Sorry, I encountered an error while generating the answer."