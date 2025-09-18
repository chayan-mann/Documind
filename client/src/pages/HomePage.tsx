

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { UploadSection } from "@/components/upload-section"
import { QuerySection } from "@/components/query-section"
import { AnswerSection } from "@/components/answer-section"
import { FileText, Zap, CheckCircle, Check} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// --- Interface for Query Response (Unchanged) ---
interface QueryResponse {
  answer: string
  sources: Array<{
    page: number
    content: string
  }>
}

// --- Animated Text Configuration ---
const changingTexts = ["Financial Reports", "Legal Contracts", "Research Papers", "Textbooks"]

export default function Home() {
  const [currentAnswer, setCurrentAnswer] = useState<QueryResponse | null>(null)
  const [showApp, setShowApp] = useState(false)
  const [textIndex, setTextIndex] = useState(0)

  // Effect for cycling through the animated text
  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prevIndex) => (prevIndex + 1) % changingTexts.length)
    }, 3000) // Change text every 3 seconds
    return () => clearInterval(interval)
  }, [])

  const handleAnswerReceived = (response: QueryResponse) => {
    setCurrentAnswer(response)
  }

  const handleGetStarted = () => {
    setShowApp(true)
    setTimeout(() => {
      document.getElementById("app-section")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }, 100)
  }

  // --- Animation Variants for Framer Motion ---
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeInOut" } },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  // --- New Background Component ---
//   const GridBackground = () => (
//     <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
//       <div className="absolute left-0 right-0 top-0 -z-10 h-2/3 w-full bg-[radial-gradient(circle_500px_at_50%_200px,#3b82f633,transparent)]"></div>
//     </div>
//   )

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-background font-sans">

      {!showApp ? (
        <>
          {/* Hero Section */}
          <motion.section
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="container mx-auto flex min-h-screen flex-col items-center justify-center px-4 text-center"
            style={{
                backgroundImage: "radial-gradient(#e0e0e1 1px, transparent 1px)",
                backgroundSize: "20px 20px",
            }}>
          
            <h1 className="text-5xl font-bold tracking-tight text-black md:text-7xl">
              Chat with your
              <br />
              <span className="relative inline-block h-[1.2em] w-full md:w-auto">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={changingTexts[textIndex]}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"
                  >
                    {changingTexts[textIndex]}
                  </motion.span>
                </AnimatePresence>
                 {/* Placeholder to maintain height */}
                 <span className="invisible">{changingTexts[0]}</span>
              </span>
              <br/>
              with AI
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
              Unlock insights from your documents instantly. <br/>Upload any PDF and ask questions to get precise,
              source-cited answers.
            </p>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-10 flex items-center gap-4"
            >
              <Button onClick={handleGetStarted} size="lg" className="text-lg px-8 py-6 rounded-full font-semibold bg-blue-500 hover:bg-blue-700">
                Get Started<Check className=" h-20 w-20" />
              </Button>
            </motion.div>
          </motion.section>

          {/* Features Section */}
          <section id="features" className="py-24">
            <div className="container mx-auto max-w-6xl px-4">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={staggerContainer}
                className="text-center"
              >
                <motion.h2 variants={fadeIn} className="text-4xl font-bold text-primary">
                  Unlock Document Intelligence
                </motion.h2>
                <motion.p variants={fadeIn} className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                  Documind transforms static PDFs into interactive sources of knowledge.
                </motion.p>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={staggerContainer}
                className="mt-16 grid gap-8 md:grid-cols-3"
              >
                {[
                  { icon: Zap, title: "Instant Answers", text: "AI-powered analysis provides immediate responses to your queries, saving you hours of manual searching." },
                  { icon: CheckCircle, title: "Verifiable Sources", text: "Every answer is backed by direct quotes and page citations, ensuring you can trust the information." },
                  { icon: FileText, title: "Effortless Upload", text: "A simple drag-and-drop interface gets your documents ready for analysis in seconds." },
                ].map((feature, i) => (
                  <motion.div variants={fadeIn} key={i}>
                    <Card className="h-full border-border/60 bg-background/50 backdrop-blur-sm transition-all hover:border-primary/50 hover:shadow-xl">
                      <CardContent className="p-8 text-center">
                        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                          <feature.icon className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold">{feature.title}</h3>
                        <p className="mt-2 text-muted-foreground">{feature.text}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* How It Works Section */}
          <section className="py-24 bg-card/20 border-y">
             <div className="container mx-auto max-w-6xl px-4">
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    variants={fadeIn}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold">Get Answers in 3 Simple Steps</h2>
                    <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">From PDF to pinpoint answers, the process is seamless.</p>
                </motion.div>
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={staggerContainer}
                    className="grid md:grid-cols-3 gap-8 text-center"
                >
                    <motion.div variants={fadeIn} className="flex flex-col items-center">
                        <div className="text-5xl font-bold text-primary/40">1</div>
                        <h3 className="text-2xl font-semibold mt-4">Upload Your PDF</h3>
                        <p className="text-muted-foreground mt-2">Securely drag and drop any PDF document into the system.</p>
                    </motion.div>
                    <motion.div variants={fadeIn} className="flex flex-col items-center">
                        <div className="text-5xl font-bold text-primary/40">2</div>
                        <h3 className="text-2xl font-semibold mt-4">Ask a Question</h3>
                        <p className="text-muted-foreground mt-2">Type your question in natural language, just like talking to a person.</p>
                    </motion.div>
                    <motion.div variants={fadeIn} className="flex flex-col items-center">
                        <div className="text-5xl font-bold text-primary/40">3</div>
                        <h3 className="text-2xl font-semibold mt-4">Get Your Insight</h3>
                        <p className="text-muted-foreground mt-2">Receive a concise answer with direct links to the source content.</p>
                    </motion.div>
                </motion.div>
             </div>
          </section>

          {/* Final CTA Section */}
          <section className="container mx-auto max-w-4xl px-4 py-32 text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={fadeIn}
            >
              <h2 className="text-3xl font-bold md:text-5xl text-blue-500">Ready to Unlock Your Documents?</h2>
              <p className="mt-6 max-w-xl mx-auto text-lg text-muted-foreground">
                Stop skimming, start understanding. Try Documind now and turn your documents into a database you can query.
              </p>
              <Button onClick={handleGetStarted} size="lg" className="mt-10 px-8 py-6 rounded-full font-semibold text-lg">
                Start for Free
              </Button>
            </motion.div>
          </section>
        </>
      ) : (
        // --- The Main Application UI ---
        <motion.section
          id="app-section"
          className="container mx-auto max-w-4xl py-12"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-primary">Documind</h1>
            <p className="text-xl text-muted-foreground mt-2">Upload a document to begin.</p>
          </div>
          <div className="space-y-8">
            <UploadSection />
            <QuerySection onAnswerReceived={handleAnswerReceived} />
            {currentAnswer && <AnswerSection response={currentAnswer} />}
          </div>
        </motion.section>
      )}
    </main>
  )
}