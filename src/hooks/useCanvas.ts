import { useState, useRef, FormEvent, useEffect } from 'react'

import Cropper from 'cropperjs'

import { Metadata, getImageMetadata } from '@/utils'

export function useCanvas() {
  const [metadata, setMetadata] = useState<Metadata>()
  const [polaroidURL, setPolaroidURL] = useState<string>('')
  let cropper: Cropper | null = null

  const [cropDialogIsOpen, setCropDialogIsOpen] = useState(false)
  const [downloadDialogIsOpen, setDownloadDialogIsOpen] = useState(false)

  const canvasRef = useRef<HTMLCanvasElement>(null)

  async function loadImageToCrop({
    currentTarget,
  }: FormEvent<HTMLInputElement>) {
    if (!currentTarget.files) return

    const file = currentTarget.files[0]

    if (!file) return

    setCropDialogIsOpen(true)

    const metadata = await getImageMetadata(file)
    setMetadata(metadata)
  }

  useEffect(() => {
    if (metadata && cropDialogIsOpen) {
      const imageToCrop = document.querySelector(
        '#image-to-crop',
      ) as HTMLImageElement

      if (!imageToCrop) return

      imageToCrop.src = metadata.localUrl

      // eslint-disable-next-line react-hooks/exhaustive-deps
      cropper = new Cropper(imageToCrop, {
        aspectRatio: 1 / 1,
        background: false,
        viewMode: 0,
      })
    }
  }, [metadata, cropDialogIsOpen])

  function getCroppedImage() {
    if (!cropper) return

    const croppedImage = cropper.getCroppedCanvas().toDataURL('image/png')

    setCropDialogIsOpen(false)
    setDownloadDialogIsOpen(true)

    if (!croppedImage) return
    drawImageOnCanvas(croppedImage)
  }

  function drawImageOnCanvas(src: string) {
    const img = new Image()

    img.setAttribute('src', src)
    img.addEventListener('load', () => {
      const canvas = canvasRef.current

      if (!canvas) return

      const context = canvas.getContext('2d')

      if (!context) return

      canvas.width = 464
      canvas.height = 600

      context.fillStyle = 'rgb(248 250 252)'
      context.fillRect(0, 0, canvas.width, canvas.height)

      context.filter = 'sepia(0.6) contrast(1.2) saturate(0.8)'

      context.drawImage(img, 32, 32, 400, 400)

      setPolaroidURL(canvas.toDataURL('image/png', 2.0))
    })
  }

  function clearMetadata() {
    setMetadata(undefined)
    setPolaroidURL('')

    setCropDialogIsOpen(false)
    setDownloadDialogIsOpen(false)
  }

  return {
    canvasRef,
    clearMetadata,
    cropDialogIsOpen,
    downloadDialogIsOpen,
    getCroppedImage,
    loadImageToCrop,
    metadata,
    polaroidURL,
  }
}
