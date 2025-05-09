"use client";

import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, CheckCircle } from "lucide-react";

const urlSchema = z.string().url("Please enter a valid URL");

export function PhishingPredictor() {
  
  const [prediction, setPrediction] = useState<boolean | null>(null);
  const [confidence, setConfidence] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [urlError, setUrlError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsPending(true);
    setError(null);
    setUrlError(null);
    setPrediction(null);
    setConfidence(null);

    const formData = new FormData(event.currentTarget);
    const url = formData.get("url") as string;

    try {
      urlSchema.parse(url);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      if (!res.ok) {
        throw new Error("Prediction failed");
      }

      const result = await res.json();
      console.log("Prediction result:", result);
      setPrediction(result.isPhishing);
      setConfidence(result.confidence);
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        setUrlError(err.errors[0].message);
      } else {
        console.error("Prediction error:", err);
        setError("Failed to get prediction");
      }
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Phishing URL Detector</CardTitle>
        <CardDescription>
          Enter a URL to check if it&apos;s a potential phishing attempt.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="url"
              name="url"
              placeholder="https://example.com"
              required
              className="w-full"
            />
            {urlError && (
              <p className="text-red-500 text-sm mt-1">{urlError}</p>
            )}
          </div>
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Analyzing..." : "Analyze URL"}
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        {(error || prediction !== null) && (
          <div className="w-full text-center">
            {error ? (
              <div className="flex items-center justify-center text-red-500">
                <AlertCircle className="mr-2" />
                {error}
              </div>
            ) : (
              <div
                className={`flex items-center justify-center ${
                  !prediction ? "text-green-500" : "text-red-500"
                }`}
              >
                {!prediction ? (
                  <CheckCircle className="mr-2" />
                ) : (
                  <AlertCircle className="mr-2" />
                )}
                {/* {prediction} (Confidence: {(confidence ?? 0).toFixed(2)}%) */}
              </div>
            )}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
