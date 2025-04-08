"use server"

import { z } from "zod"

const PredictionSchema = z.object({
  url: z.string().url("Please enter a valid URL"),
})

export type PredictionResult = {
  prediction?: "Safe" | "Phishing"
  confidence?: number
  error?: string
}

export async function predictPhishing(
  prevState: PredictionResult | null,
  formData: FormData,
): Promise<PredictionResult> {
  const validatedFields = PredictionSchema.safeParse({
    url: formData.get("url"),
  })

  if (!validatedFields.success) {
    return { error: validatedFields.error.errors[0].message }
  }

  const { url } = validatedFields.data

  try {
    // This is where you'd typically make a call to your ML model or API
    // For demonstration, we'll use a mock prediction
    // const response = await fetch("https://api.example.com/predict", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ url }),
    // })

    // Simulate a delay
    // await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock response object for demonstration
    const confidence = Math.random()
    const response = { ok: true, json: async () => ({ isPhishing:confidence > 0.5 ? true : false, confidence:confidence}) };

    if (!response.ok) {
      throw new Error("Prediction failed")
    }

    const result = await response.json()
    return { prediction: result.isPhishing ? "Phishing" : "Safe", confidence: result.confidence }
  } catch (error) {
    console.error("Prediction error:", error)
    return { error: "Failed to get prediction" }
  }
}

