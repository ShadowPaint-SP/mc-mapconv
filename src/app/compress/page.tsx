"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Upload, Download, ImageIcon } from "lucide-react"

import { Button } from "~/components/ui/button"
import { Card, CardContent } from "~/components/ui/card"
import { Separator } from "~/components/ui/separator"
import { Slider } from "~/components/ui/slider"

import ImageCompressor from "../../components/image-compressor"

export default function CompressPage() {
  const [originalImage, setOriginalImage] = useState<File | null>(null)
  const [compressedImage, setCompressedImage] = useState<string | null>(null)
  const [originalSize, setOriginalSize] = useState<number>(0)
  const [compressedSize, setCompressedSize] = useState<number>(0)
  const [compressionRatio, setCompressionRatio] = useState<number>(5)
  const [isCompressing, setIsCompressing] = useState<boolean>(false)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setOriginalImage(file)
      setOriginalSize(file.size)
      setCompressedImage(null)
      setCompressedSize(0)
    }
  }

  const handleCompress = async () => {
    if (!originalImage) return

    setIsCompressing(true)

    try {
      // Convert compression ratio to quality (inverse relationship)
      // Higher ratio means lower quality
      const quality = Math.max(0.1, 1 / compressionRatio)

      const compressedResult = await ImageCompressor.compressImage(originalImage, {
        quality: quality,
        format: "jpeg",
      })

      setCompressedImage(compressedResult.dataUrl)
      setCompressedSize(compressedResult.size)
    } catch (error) {
      console.error("Compression failed:", error)
    } finally {
      setIsCompressing(false)
    }
  }

  const handleDownload = () => {
    if (!compressedImage) return

    const link = document.createElement("a")
    link.href = compressedImage
    link.download = `compressed-image.jpeg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return "0 Bytes"

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ["Bytes", "KB", "MB", "GB"]

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
  }

  const compressionPercentage =
    originalSize && compressedSize ? ((1 - compressedSize / originalSize) * 100).toFixed(1) : 0

  return (
    <div className="container max-w-2xl mx-auto py-8 px-4 relative z-10">
      <h1 className="text-3xl font-bold text-center mb-8">Image Compressor</h1>

      <Card>
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold mb-4">Image Compression</h2>

          <div className="flex flex-col gap-6">
            {/* Image Preview */}
            <div className="flex justify-center items-center border-2 border-dashed border-gray-300 rounded-lg h-64 relative overflow-hidden">
              {originalImage ? (
                <div className="w-full h-full relative">
                  <Image
                    src={URL.createObjectURL(originalImage) || "/placeholder.svg"}
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
            <div className="grid grid-cols-2 gap-4">
              <div className="text-sm">
                <h3 className="font-medium mb-1">Original</h3>
                {originalImage ? (
                  <>
                    <p>
                      <strong>Name:</strong> {originalImage.name}
                    </p>
                    <p>
                      <strong>Size:</strong> {formatBytes(originalSize)}
                    </p>
                    <p>
                      <strong>Type:</strong> {originalImage.type}
                    </p>
                  </>
                ) : (
                  <p className="text-muted-foreground">No image selected</p>
                )}
              </div>

              <div className="text-sm">
                <h3 className="font-medium mb-1">Compressed</h3>
                {compressedImage ? (
                  <>
                    <p>
                      <strong>Size:</strong> {formatBytes(compressedSize)}
                    </p>
                    <p>
                      <strong>Reduction:</strong> {compressionPercentage}%
                    </p>
                    <p>
                      <strong>Format:</strong> JPEG
                    </p>
                  </>
                ) : (
                  <p className="text-muted-foreground">Not compressed yet</p>
                )}
              </div>
            </div>

            {/* Upload Button */}
            <Button
              variant="outline"
              className="w-full"
              onClick={() => document.getElementById("file-upload")?.click()}
            >
              <Upload className="mr-2 h-4 w-4" />
              Select Image
            </Button>
            <input id="file-upload" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />

            <Separator />

            {/* Compression Settings */}
            <div>
              <label className="text-sm font-medium mb-2 block">Compression Ratio: {compressionRatio}:1</label>
              <Slider
                value={[compressionRatio]}
                min={1}
                max={20}
                step={1}
                onValueChange={(value) => setCompressionRatio(value[0] ?? 1)}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Higher ratio means smaller file size but lower quality
              </p>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <Button className="w-full" disabled={!originalImage || isCompressing} onClick={handleCompress}>
                {isCompressing ? "Compressing..." : "Compress"}
              </Button>

              <Button
                className="w-full"
                variant="secondary"
                disabled={!compressedImage || isCompressing}
                onClick={handleDownload}
              >
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

