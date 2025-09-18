
import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, FileText, CheckCircle, Loader2 } from "lucide-react"
import { API_ENDPOINTS } from "@/lib/config"

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

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (!file) return

    if (file.type !== "application/pdf") {
      setError("Please upload a PDF file only")
      return
    }

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
        throw new Error("Upload failed")
      }

      const result: UploadResponse = await response.json()
      setUploadResult(result)
    } catch (err) {
      setError("Failed to upload PDF. Please try again.")
      console.error("Upload error:", err)
    } finally {
      setIsUploading(false)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    multiple: false,
    disabled: isUploading,
  })

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <h2 className="text-2xl font-semibold text-primary mb-4">Upload PDF</h2>

        <div
          {...getRootProps()}
          className={`
            border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
            ${isDragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}
            ${isUploading ? "cursor-not-allowed opacity-50" : ""}
          `}
        >
          <input {...getInputProps()} />

          <div className="flex flex-col items-center gap-4">
            {isUploading ? (
              <Loader2 className="h-12 w-12 text-primary animate-spin" />
            ) : (
              <Upload className="h-12 w-12 text-muted-foreground" />
            )}

            <div>
              {isUploading ? (
                <p className="text-lg font-medium text-primary">Uploading PDF...</p>
              ) : isDragActive ? (
                <p className="text-lg font-medium text-primary">Drop the PDF here</p>
              ) : (
                <>
                  <p className="text-lg font-medium text-foreground mb-2">
                    Drag & drop your PDF here, or click to select
                  </p>
                  <p className="text-sm text-muted-foreground">Only PDF files are supported</p>
                </>
              )}
            </div>

            {!isUploading && (
              <Button variant="outline" size="sm">
                <FileText className="h-4 w-4 mr-2" />
                Choose File
              </Button>
            )}
          </div>
        </div>

        {/* Success Message */}
        {uploadResult && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2 text-green-800">
              <CheckCircle className="h-5 w-5" />
              <span className="font-medium">PDF processed successfully!</span>
            </div>
            <p className="text-sm text-green-700 mt-1">
              {uploadResult.details.chunks} chunks created and ready for questions
            </p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 font-medium">{error}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
