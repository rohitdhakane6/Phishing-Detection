"use client"

import { useState } from "react"
import { useFormState } from "react-dom"
import { z } from "zod"
import { predictPhishing } from "@/actions/predictPhishing"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, CheckCircle } from "lucide-react"

const urlSchema = z.string().url("Please enter a valid URL")

type PredictionResult = {
  prediction?: "Safe" | "Phishing"
  confidence?: number
  error?: string
}

export function PhishingPredictor() {
  const [state, formAction] = useFormState<PredictionResult, FormData>(predictPhishing, { prediction: undefined, confidence: undefined, error: undefined })
  const [isPending, setIsPending] = useState(false)
  const [urlError, setUrlError] = useState<string | null>(null)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsPending(true)
    setUrlError(null)

    const formData = new FormData(event.currentTarget)
    const url = formData.get("url") as string

    try {
      urlSchema.parse(url)
      formAction(formData)
    } catch (error) {
      if (error instanceof z.ZodError) {
        setUrlError(error.errors[0].message)
      }
    } finally {
      setIsPending(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Phishing URL Detector</CardTitle>
        <CardDescription>Enter a URL to check if it&apos;s a potential phishing attempt.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input type="url" name="url" placeholder="https://example.com" required className="w-full" />
            {urlError && <p className="text-red-500 text-sm mt-1">{urlError}</p>}
          </div>
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Analyzing..." : "Analyze URL"}
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        {state && (
          <div className="w-full text-center">
            {state.error ? (
              <div className="flex items-center justify-center text-red-500">
                <AlertCircle className="mr-2" />
                {state.error}
              </div>
            ) : state.prediction && state.confidence !== undefined ? (
              <div
                className={`flex items-center justify-center ${state.prediction === "Safe" ? "text-green-500" : "text-red-500"}`}
              >
                {state.prediction === "Safe" ? <CheckCircle className="mr-2" /> : <AlertCircle className="mr-2" />}
                {state.prediction} (Confidence: {(state.confidence * 100).toFixed(2)}%)
              </div>
            ) : null}
          </div>
        )}
      </CardFooter>
    </Card>
  )
}

