import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles, Database, Shield, Zap } from "lucide-react";

export default function About() {
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
              <Sparkles className="h-10 w-10 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-bold mb-4">About VIT Chennai AI Assistant</h1>
            <p className="text-lg text-muted-foreground">
              Your intelligent companion for navigating VIT Chennai
            </p>
          </div>

          <div className="space-y-8 animate-slide-up">
            <div className="bg-card border border-border rounded-2xl p-8 shadow-soft hover-lift">
              <h2 className="text-2xl font-semibold mb-4">What is this?</h2>
              <p className="text-muted-foreground leading-relaxed">
                The VIT Chennai AI Assistant is an intelligent chatbot designed specifically for students and faculty
                of Vellore Institute of Technology, Chennai. It provides instant, accurate answers to questions about
                campus life, academics, facilities, and more.
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8 shadow-soft hover-lift">
              <h2 className="text-2xl font-semibold mb-6">Key Features</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Database className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">RAG-Powered</h3>
                    <p className="text-sm text-muted-foreground">
                      Retrieval-Augmented Generation ensures accurate, source-backed responses
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Zap className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Instant Answers</h3>
                    <p className="text-sm text-muted-foreground">
                      Get quick responses to your questions about VIT Chennai
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Reliable Sources</h3>
                    <p className="text-sm text-muted-foreground">
                      All answers include references to source documents
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Smart UI</h3>
                    <p className="text-sm text-muted-foreground">
                      Clean, modern interface inspired by leading AI assistants
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8 shadow-soft hover-lift">
              <h2 className="text-2xl font-semibold mb-4">How to Use</h2>
              <ol className="space-y-3 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold">
                    1
                  </span>
                  <span>Type your question in the input box at the bottom of the chat</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold">
                    2
                  </span>
                  <span>Press Enter or click the send button to submit</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold">
                    3
                  </span>
                  <span>Wait for the AI to process and respond with an answer</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold">
                    4
                  </span>
                  <span>View sources by clicking the sources button below each answer</span>
                </li>
              </ol>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8 shadow-soft hover-lift">
              <h2 className="text-2xl font-semibold mb-4">Technology Stack</h2>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h3 className="font-semibold mb-2">Frontend</h3>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• React + TypeScript</li>
                    <li>• Tailwind CSS</li>
                    <li>• Shadcn/ui Components</li>
                    <li>• React Router</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">AI Backend</h3>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• RAG (Retrieval-Augmented Generation)</li>
                    <li>• FastAPI</li>
                    <li>• Vector Database</li>
                    <li>• LLM Integration</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
