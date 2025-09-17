import { Link } from "react-router-dom";
import { FileText, MessageSquare, Zap, Shield, Upload, Brain } from "lucide-react";
import {Button} from '@/components/ui/button'
import { Card } from "@/components/ui/card";
import heroImage from "@/assets/hero-illustration.jpg";

function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Documind
              </span>
            </div>
            <Link to="/upload">
              <Button variant="default" className="shadow-soft">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Transform Your
                <span className="block bg-gradient-hero bg-clip-text text-transparent">
                  PDFs into Conversations
                </span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Upload any PDF document and ask intelligent questions about its content. 
                Powered by advanced AI to unlock insights from your documents instantly.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/upload">
                <Button size="lg" className="bg-gradient-primary shadow-strong hover:shadow-soft transition-all">
                  <Upload className="mr-2 h-5 w-5" />
                  Upload Your First PDF
                </Button>
              </Link>
              <Button variant="outline" size="lg">
                <MessageSquare className="mr-2 h-5 w-5" />
                See Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">10k+</div>
                <div className="text-sm text-muted-foreground">Documents Analyzed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">95%</div>
                <div className="text-sm text-muted-foreground">Accuracy Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">&lt;2s</div>
                <div className="text-sm text-muted-foreground">Response Time</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-hero blur-3xl opacity-20"></div>
            <img 
              src={heroImage} 
              alt="AI Document Analysis" 
              className="relative z-10 rounded-2xl shadow-strong w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold">Powerful Features</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to understand and interact with your documents
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="p-8 shadow-soft hover:shadow-strong transition-all border-0 bg-card/80 backdrop-blur-sm">
            <div className="space-y-4">
              <div className="h-12 w-12 bg-accent rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-semibold">Smart PDF Analysis</h3>
              <p className="text-muted-foreground">
                Advanced OCR and content extraction to understand every detail of your documents
              </p>
            </div>
          </Card>

          <Card className="p-8 shadow-soft hover:shadow-strong transition-all border-0 bg-card/80 backdrop-blur-sm">
            <div className="space-y-4">
              <div className="h-12 w-12 bg-accent rounded-lg flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-semibold">Natural Conversations</h3>
              <p className="text-muted-foreground">
                Ask questions in plain English and get precise answers with source references
              </p>
            </div>
          </Card>

          <Card className="p-8 shadow-soft hover:shadow-strong transition-all border-0 bg-card/80 backdrop-blur-sm">
            <div className="space-y-4">
              <div className="h-12 w-12 bg-accent rounded-lg flex items-center justify-center">
                <Zap className="h-6 w-6 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-semibold">Lightning Fast</h3>
              <p className="text-muted-foreground">
                Get instant responses powered by optimized RAG pipeline architecture
              </p>
            </div>
          </Card>

          <Card className="p-8 shadow-soft hover:shadow-strong transition-all border-0 bg-card/80 backdrop-blur-sm">
            <div className="space-y-4">
              <div className="h-12 w-12 bg-accent rounded-lg flex items-center justify-center">
                <Shield className="h-6 w-6 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-semibold">Secure & Private</h3>
              <p className="text-muted-foreground">
                Your documents are processed securely with enterprise-grade encryption
              </p>
            </div>
          </Card>

          <Card className="p-8 shadow-soft hover:shadow-strong transition-all border-0 bg-card/80 backdrop-blur-sm">
            <div className="space-y-4">
              <div className="h-12 w-12 bg-accent rounded-lg flex items-center justify-center">
                <Brain className="h-6 w-6 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-semibold">AI-Powered Insights</h3>
              <p className="text-muted-foreground">
                Advanced language models provide deep understanding and contextual answers
              </p>
            </div>
          </Card>

          <Card className="p-8 shadow-soft hover:shadow-strong transition-all border-0 bg-card/80 backdrop-blur-sm">
            <div className="space-y-4">
              <div className="h-12 w-12 bg-accent rounded-lg flex items-center justify-center">
                <Upload className="h-6 w-6 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-semibold">Easy Upload</h3>
              <p className="text-muted-foreground">
                Drag and drop your PDFs or browse to upload. Supports various document formats
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="bg-gradient-primary rounded-3xl p-12 text-center text-white shadow-strong">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-4xl font-bold">Ready to Get Started?</h2>
            <p className="text-xl opacity-90">
              Join thousands of users who are already transforming how they interact with documents
            </p>
            <Link to="/upload">
              <Button size="lg" variant="secondary" className="shadow-soft hover:shadow-strong transition-all">
                <Upload className="mr-2 h-5 w-5" />
                Start Analyzing Documents
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Brain className="h-6 w-6 text-primary" />
              <span className="font-semibold">Documind</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 Documind. Powered by AI.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
