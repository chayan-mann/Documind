import { useState } from "react"
import { UploadSection } from "@/components/upload-section"
import { QuerySection } from "@/components/query-section"
import { AnswerSection } from "@/components/answer-section"

interface QueryResponse {
  answer: string
  sources: Array<{
    page: number
    content: string
  }>
}

export default function Dashboard() {
  const [currentAnswer, setCurrentAnswer] = useState<QueryResponse | null>(null)

  const handleAnswerReceived = (response: QueryResponse) => {
    setCurrentAnswer(response)
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-26 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-xl text-muted-foreground text-pretty">AI-powered PDF analysis and question answering.
          </h1>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          <UploadSection />
          <QuerySection onAnswerReceived={handleAnswerReceived} />
          <AnswerSection response={currentAnswer} />
        </div>
      </div>
    </main>
  )
}
