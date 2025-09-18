"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { UploadSection } from "@/components/upload-section"
import { QuerySection } from "@/components/query-section"
import { AnswerSection } from "@/components/answer-section"
import { FileText, Zap, CheckCircle } from "lucide-react"

interface QueryResponse {
  answer: string
  sources: Array<{
    page: number
    content: string
  }>
}

export default function Home() {
  const [currentAnswer, setCurrentAnswer] = useState<QueryResponse | null>(null)
  const [showApp, setShowApp] = useState(false)

  const handleAnswerReceived = (response: QueryResponse) => {
    setCurrentAnswer(response)
  }

  const handleGetStarted = () => {
    setShowApp(true)
    // Smooth scroll to the app section
    setTimeout(() => {
      document.getElementById("app-section")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }, 100)
  }

  return (
    <main className="min-h-screen bg-background">
      {!showApp ? (
        <>
          {/* Hero Section */}
          <section className="container mx-auto px-4 py-30 max-w-6xl">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance text-blue-500">Documind</h1>
              <p className="text-2xl md:text-3xl text-muted-foreground mb-8 text-pretty max-w-4xl mx-auto">
                Get instant answers from your PDFs with AI-powered analysis
              </p>
              <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto text-pretty">
                Upload any PDF document and ask questions to get precise answers with source citations. Perfect for
                research, document review, and knowledge extraction.
              </p>
              <Button onClick={handleGetStarted} size="lg" className="text-lg px-8 py-6 bg-blue-500 hover:bg-blue-700">
                Get Started Free
              </Button>
            </div>
          </section>

          {/* Features Section */}
          <section id= "features" className="container mx-auto px-4 py-16 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 text-balance">Powerful Features</h2>
              <p className="text-lg text-muted-foreground text-pretty">
                Everything you need to unlock insights from your documents
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              <Card className="border-border hover:shadow-lg transition-shadow">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Zap className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">Instant Answers</h3>
                  <p className="text-muted-foreground text-pretty">
                    Get immediate responses to your questions with advanced AI analysis of your PDF content.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border hover:shadow-lg transition-shadow">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">Source Citations</h3>
                  <p className="text-muted-foreground text-pretty">
                    Every answer includes precise page references and source excerpts for complete transparency.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border hover:shadow-lg transition-shadow">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FileText className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">Easy Upload</h3>
                  <p className="text-muted-foreground text-pretty">
                    Simple drag-and-drop interface supports any PDF document with instant processing.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* CTA Section */}
            <div className="text-center bg-card rounded-lg p-12 border border-border">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 text-balance">
                Ready to unlock your document insights?
              </h3>
              <p className="text-lg text-white mb-8 text-pretty">
                Start analyzing your PDFs with AI-powered question answering today.
              </p>
              <Button onClick={handleGetStarted} size="lg" className="text-lg px-8 py-6 bg-primary hover:bg-primary/90">
                Get Started Free
              </Button>
            </div>
          </section>
        </>
      ) : (
        <section id="app-section" className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-primary mb-4 text-balance">Documind</h1>
            <p className="text-xl text-muted-foreground text-pretty">AI-powered PDF analysis and question answering</p>
          </div>

          {/* Main Content */}
          <div className="space-y-8">
            <UploadSection />
            <QuerySection onAnswerReceived={handleAnswerReceived} />
            <AnswerSection response={currentAnswer} />
          </div>
        </section>
      )}
    </main>
  )
}
