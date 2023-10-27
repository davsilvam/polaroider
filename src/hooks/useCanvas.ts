import { useState, useRef, FormEvent } from 'react'

import { Metadata, getImageMetadata } from '@/utils'

export function useCanvas() {
  const [metadata, setMetadata] = useState<Metadata>()
  const [polaroidURL, setPolaroidURL] = useState<string>('')
  const canvasRef = useRef<HTMLCanvasElement>(null)

  async function loadCanvas({ currentTarget }: FormEvent<HTMLInputElement>) {
    if (!currentTarget.files) return

    const file = currentTarget.files[0]

    const metadata = await getImageMetadata(file)
    setMetadata(metadata)

    function drawImageOnCanvas(src: string) {
      const img = new Image()

      img.setAttribute('src', src)
      img.addEventListener('load', () => {
        const canvas = canvasRef.current

        if (!canvas) return

        const context = canvas.getContext('2d')

        if (!context) return

        const { width, height } = img
        const aspectRatio = height / width

        canvas.width = canvas.width + 60
        canvas.height = canvas.width * aspectRatio + 100

        context.fillStyle = 'rgb(248 250 252)'
        context.fillRect(0, 0, width + 60, height + 100)

        context.filter = 'sepia(0.6) contrast(1.2) saturate(0.8)'

        context.drawImage(
          img,
          0,
          0,
          width,
          height,
          30,
          30,
          canvas.width - 60,
          canvas.height - 100,
        )

        setPolaroidURL(canvas.toDataURL('image/png', 2.0))
      })
    }

    drawImageOnCanvas(metadata.localUrl)
  }

  function clearMetadata() {
    setMetadata(undefined)
    setPolaroidURL('')
  }

  return {
    metadata,
    polaroidURL,
    canvasRef,
    loadCanvas,
    clearMetadata,
  }
}
