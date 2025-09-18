import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, CheckCircle, Loader2, XCircle } from "lucide-react"
import { API_ENDPOINTS } from "@/lib/config"

// Interface remains the same
interface UploadResponse {
  message: string
  details: {
    status: string
    chunks: number
  }
}

export function UploadSection() {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadResult, setUploadResult] = useState<UploadResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (!file) return

    if (file.type !== "application/pdf") {
      setError("Please upload a PDF file only.")
      setUploadResult(null)
      setFileName(null)
      return
    }
    
    setFileName(file.name)
    setIsUploading(true)
    setError(null)
    setUploadResult(null)

    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch(API_ENDPOINTS.upload, {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: "Upload failed. Please try again." }))
        throw new Error(errorData.message || "Upload failed")
      }

      const result: UploadResponse = await response.json()
      setUploadResult(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred.")
      setFileName(null) // Clear file name on error
    } finally {
      setIsUploading(false)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    multiple: false,
    disabled: isUploading,
  })

  const renderContent = () => {
    if (isUploading) {
      return (
        <>
          <Loader2 className="h-10 w-10 text-primary animate-spin" />
          <p className="mt-4 text-lg font-medium text-primary">Uploading "{fileName}"...</p>
          <p className="text-sm text-muted-foreground">Please wait while we process your document.</p>
        </>
      )
    }
    
    if (uploadResult && fileName) {
       return (
        <>
          <CheckCircle className="h-10 w-10 text-green-600" />
          <p className="mt-4 text-lg font-medium text-foreground">"{fileName}" Ready</p>
          <p className="text-sm text-muted-foreground">You can now ask questions about this document.</p>
        </>
      )
    }

    return (
      <>
        <Upload className="h-10 w-10 text-muted-foreground" />
        <p className="mt-4 text-lg font-medium text-foreground">
          Drag & drop your PDF here, or{" "}
          <span className="font-semibold text-primary">browse files</span>
        </p>
        <p className="text-sm text-muted-foreground">Maximum file size: 50MB</p>
      </>
    )
  }

  return (
    <Card className="w-full bg-card shadow-lg shadow-blue-500/5 border border-border/60">
      <CardContent className="p-6">
        <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-black">Upload Your Document</h2>
            <p className="text-muted-foreground mt-1">Start by providing a PDF document to analyze.</p>
        </div>

        <div
          {...getRootProps()}
          className={`
            border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 ease-in-out
            ${isDragActive ? "border-primary bg-blue-50" : "border-border/80 bg-background hover:border-primary/70 hover:bg-blue-50/50"}
            ${isUploading || uploadResult ? "cursor-default opacity-90" : ""}
          `}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center gap-2">
            {renderContent()}
          </div>
        </div>

        {/* Error Message - appears below the dropzone */}
        {error && (
          <div className="mt-4 flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800">
            <XCircle className="h-5 w-5 flex-shrink-0" />
            <span className="font-medium">{error}</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}