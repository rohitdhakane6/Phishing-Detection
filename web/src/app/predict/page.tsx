import { PhishingPredictor } from "@/components/PhishingPredictor"

export default function page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Phishing Detection</h1>
      <PhishingPredictor />
    </main>
  )
}

