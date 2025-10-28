import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowLeft, HelpCircle } from "lucide-react";

export default function FAQ() {
  const faqs = [
    {
      question: "How accurate are the AI's answers?",
      answer:
        "The AI uses Retrieval-Augmented Generation (RAG) to provide accurate answers based on official VIT Chennai documents and resources. All answers include source references so you can verify the information. However, for critical decisions, always confirm with official college authorities.",
    },
    {
      question: "What kind of questions can I ask?",
      answer:
        "You can ask about anything related to VIT Chennai - hostel facilities, academic programs, course registration, placement process, clubs and organizations, library services, campus facilities, examination procedures, grading system, and much more.",
    },
    {
      question: "Is my conversation data saved?",
      answer:
        "Your chat history is stored locally in your browser using localStorage. This means your conversations stay on your device and are not sent to any external servers. You can clear your chat history at any time by starting a new chat or clearing your browser data.",
    },
    {
      question: "Why is the AI not responding?",
      answer:
        "If you're not getting responses, make sure the backend API server is running at http://localhost:8000. Check your browser's console for error messages. If you're still having issues, try refreshing the page or checking your internet connection.",
    },
    {
      question: "Can I use this on my mobile phone?",
      answer:
        "Yes! The VIT Chennai AI Assistant is fully responsive and works great on mobile devices, tablets, and desktop computers. The interface adapts to your screen size for the best experience.",
    },
    {
      question: "How do I see the sources for an answer?",
      answer:
        "Each AI response includes a 'Sources' section at the bottom. Click on it to expand and view the source documents and text chunks that were used to generate the answer. This helps you verify the information and explore more details.",
    },
    {
      question: "What should I do if I get an error?",
      answer:
        "Most errors occur when the backend API is not running or there are network issues. Make sure the FastAPI backend is running at http://localhost:8000. If problems persist, check the browser console for detailed error messages and try again.",
    },
    {
      question: "Can I copy the AI's responses?",
      answer:
        "Yes! Each AI response has a 'Copy' button that allows you to copy the entire answer to your clipboard. This is useful for sharing information or saving important details.",
    },
    {
      question: "How do I start a new conversation?",
      answer:
        "Click the 'New Chat' button in the top right corner of the header. Your current conversation will be saved to your browser's local storage before starting fresh.",
    },
    {
      question: "Is this official VIT Chennai software?",
      answer:
        "This is a demonstration AI assistant built for educational purposes. While it uses official VIT Chennai information, it's not an official college application. Always verify critical information with official VIT Chennai sources.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-primary/5">
      <div className="container mx-auto px-4 py-12">
        <Link to="/">
          <Button variant="ghost" className="mb-8 gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Chat
          </Button>
        </Link>

        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-primary shadow-glow mb-6">
              <HelpCircle className="h-10 w-10 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-lg text-muted-foreground">
              Everything you need to know about using the AI Assistant
            </p>
          </div>

          <div className="bg-card border border-border rounded-2xl p-8 shadow-soft animate-slide-up">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border border-border rounded-xl px-6 py-2 hover:border-primary/50 transition-colors"
                >
                  <AccordionTrigger className="text-left font-semibold hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pt-2">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="mt-8 text-center">
            <p className="text-muted-foreground mb-4">Still have questions?</p>
            <Link to="/">
              <Button size="lg" className="gap-2 shadow-glow">
                Start Chatting
                <ArrowLeft className="h-4 w-4 rotate-180" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
