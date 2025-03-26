"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import { Upload, Download, ImageIcon } from "lucide-react"

import { Button } from "~/components/ui/button"
import { Card, CardContent } from "~/components/ui/card"
import { 
  convertImageToBlocks, 
  createStructureFromBlocks
} from "~/lib/utils/structureConverter"


export default function ConvertPage() {
  const [originalImage, setOriginalImage] = useState<File | null>(null)
  const [structureData, setStructureData] = useState<Uint8Array | null>(null)
  const [isConverting, setIsConverting] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setOriginalImage(file)
      setStructureData(null)
      setError(null)
    }
  }

  const handleConvert = async () => {
    if (!originalImage) return

    setIsConverting(true)
    setError(null)

    try {
      // Create a canvas to read the image data
      const img = document.createElement("img")
      img.src = URL.createObjectURL(originalImage)
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve()
        img.onerror = () => reject(new Error("Failed to load image"))
      })

      const canvas = document.createElement("canvas")
      canvas.width = img.naturalWidth
      canvas.height = img.naturalHeight
      const ctx = canvas.getContext("2d")
      if (!ctx) throw new Error("Could not get canvas context")

      // Draw the image and get its pixel data
      ctx.drawImage(img, 0, 0)
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      
      // Convert pixel data to hex color strings
      const pixels: string[][] = []
      for (let y = 0; y < imageData.height; y++) {
        const row: string[] = []
        for (let x = 0; x < imageData.width; x++) {
          const i = (y * imageData.width + x) * 4
          // Ensure we have valid color values (0-255)
          const r = Math.min(255, Math.max(0, imageData.data[i] ?? 0))
          const g = Math.min(255, Math.max(0, imageData.data[i + 1] ?? 0))
          const b = Math.min(255, Math.max(0, imageData.data[i + 2] ?? 0))
          const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`
          row.push(hex)
        }
        pixels.push(row)
      }
      // Convert pixels to blocks with type checking
      const blocks = convertImageToBlocks(pixels)
      const structure = await createStructureFromBlocks(blocks)
      setStructureData(structure)
    } catch (err) {
      console.error("Conversion failed:", err)
      setError(err instanceof Error ? err.message : "Failed to convert image")
    } finally {
      setIsConverting(false)
    }
  }

  const handleDownload = () => {
    if (!structureData) return

    const blob = new Blob([structureData], { type: "application/octet-stream" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "output.nbt" // Changed extension to .nbt
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="container max-w-2xl mx-auto py-8 px-4 relative z-10">
      <h1 className="text-3xl font-bold text-center mb-8">Image to Structure Converter</h1>

      <Card>
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold mb-4">Convert Image to Minecraft Structure</h2>

          <div className="flex flex-col gap-6">
            {/* Image Preview */}
            <div className="flex justify-center items-center border-2 border-dashed border-gray-300 rounded-lg h-64 relative overflow-hidden">
              {originalImage ? (
                <div className="w-full h-full relative">
                  <Image
                    src={URL.createObjectURL(originalImage)}
                    alt="Original image"
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </div>
              ) : (
                <div className="text-center p-4">
                  <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-500">No image selected</p>
                </div>
              )}
            </div>

            {/* Image Info */}
            <div className="text-sm">
              <h3 className="font-medium mb-1">Image Details</h3>
              {originalImage ? (
                <>
                  <p><strong>Name:</strong> {originalImage.name}</p>
                  <p><strong>Type:</strong> {originalImage.type}</p>
                </>
              ) : (
                <p className="text-muted-foreground">No image selected</p>
              )}
            </div>

            {error && (
              <div className="bg-destructive/10 text-destructive p-3 rounded-md text-sm">
                {error}
              </div>
            )}

            {/* Upload Button */}
            <Button
              variant="outline"
              className="w-full"
              onClick={() => document.getElementById("file-upload")?.click()}
            >
              <Upload className="mr-2 h-4 w-4" />
              Select Image
            </Button>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <Button
                className="w-full"
                disabled={!originalImage || isConverting}
                onClick={handleConvert}
              >
                {isConverting ? "Converting..." : "Convert to Structure"}
              </Button>

              <Button
                className="w-full"
                variant="secondary"
                disabled={!structureData || isConverting}
                onClick={handleDownload}
              >
                <Download className="mr-2 h-4 w-4" />
                Download Structure
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 