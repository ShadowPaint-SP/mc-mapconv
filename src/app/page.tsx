import Link from "next/link"
import { ArrowRight, FileDown, Gauge, ImageIcon } from "lucide-react"

import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"

export default function Home() {
  return (
    <div className="relative z-10">
      <section className="py-20 md:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4 mb-12">
            <div className="p-3 rounded-full bg-brand-yellow/10 text-brand-yellow glow-yellow">
              <ImageIcon className="h-10 w-10" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tighter">Simple Image Compression</h1>
            <p className="text-xl text-gray-600 dark:text-zinc-400 max-w-[700px]">
              Reduce your image file sizes without losing quality. Fast, free, and secure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Button asChild size="lg" className="bg-brand-yellow text-black hover:bg-brand-yellow/90 glow-yellow">
                <Link href="/compress">
                  Start Compressing
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <Card className="bg-white border-gray-200 dark:bg-zinc-900 dark:border-zinc-800 glow-card">
              <CardHeader>
                <Gauge className="h-6 w-6 mb-2 text-brand-yellow" />
                <CardTitle>Efficient Compression</CardTitle>
                <CardDescription className="text-gray-600 dark:text-zinc-400">
                  Compress images with a customizable ratio from 1:1 to 20:1
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-zinc-400">
                  Our algorithm intelligently reduces file size while maintaining visual quality. You control the
                  compression ratio to balance size and quality.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200 dark:bg-zinc-900 dark:border-zinc-800 glow-card">
              <CardHeader>
                <FileDown className="h-6 w-6 mb-2 text-brand-yellow" />
                <CardTitle>Simple Workflow</CardTitle>
                <CardDescription className="text-gray-600 dark:text-zinc-400">
                  Upload, compress, and download in seconds
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-zinc-400">
                  No complicated settings or technical knowledge required. Just upload your image, adjust the
                  compression ratio, and download the result.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200 dark:bg-zinc-900 dark:border-zinc-800 glow-card">
              <CardHeader>
                <ImageIcon className="h-6 w-6 mb-2 text-brand-yellow" />
                <CardTitle>Browser-Based</CardTitle>
                <CardDescription className="text-gray-600 dark:text-zinc-400">
                  No software to install, works on any device
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-zinc-400">
                  Your images never leave your device. All compression happens locally in your browser, ensuring your
                  privacy and security.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}

