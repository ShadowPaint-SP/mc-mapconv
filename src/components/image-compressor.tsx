"use client"

type CompressionOptions = {
  quality: number
  format: "jpeg" | "png" | "webp"
  maxWidth?: number
  maxHeight?: number
}

type CompressionResult = {
  dataUrl: string
  size: number
}

class ImageCompressor {
  static async compressImage(file: File, options: CompressionOptions): Promise<CompressionResult> {
    const { quality = 0.8, format = "jpeg", maxWidth, maxHeight } = options

    return new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.onload = (event) => {
        if (!event.target?.result) {
          return reject(new Error("Failed to read file"))
        }

        const img = new Image()
        img.src = event.target.result as string

        img.onload = () => {
          let width = img.width
          let height = img.height

          // Scale down if needed
          if (maxWidth && width > maxWidth) {
            height = (height * maxWidth) / width
            width = maxWidth
          }

          if (maxHeight && height > maxHeight) {
            width = (width * maxHeight) / height
            height = maxHeight
          }

          // Create canvas
          const canvas = document.createElement("canvas")
          canvas.width = width
          canvas.height = height

          // Draw image to canvas
          const ctx = canvas.getContext("2d")
          if (!ctx) {
            return reject(new Error("Could not get canvas context"))
          }

          ctx.drawImage(img, 0, 0, width, height)

          // Convert to desired format
          let mimeType = "image/jpeg"
          if (format === "png") mimeType = "image/png"
          if (format === "webp") mimeType = "image/webp"

          // Get compressed image as data URL
          const dataUrl = canvas.toDataURL(mimeType, quality)

          // Calculate size (by converting base64 to blob)
          const base64 = dataUrl?.split(",")[1]
          const byteCharacters = atob(base64 ?? "")
          const byteNumbers = new Array(byteCharacters.length)

          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i)
          }

          const byteArray = new Uint8Array(byteNumbers)
          const blob = new Blob([byteArray], { type: mimeType })

          resolve({
            dataUrl,
            size: blob.size,
          })
        }

        img.onerror = () => {
          reject(new Error("Failed to load image"))
        }
      }

      reader.onerror = () => {
        reject(new Error("Failed to read file"))
      }

      reader.readAsDataURL(file)
    })
  }
}

export default ImageCompressor

