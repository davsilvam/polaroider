'use client'

import Image from 'next/image'

import { FileImage } from 'lucide-react'

import { Camera, CropDialog, DownloadDialog, Rainbow } from '@/components'

import { useCanvas } from '@/hooks'

export default function Home() {
  const {
    canvasRef,
    clearMetadata,
    cropDialogIsOpen,
    downloadDialogIsOpen,
    getCroppedImage,
    loadImageToCrop,
    metadata,
    polaroidURL,
  } = useCanvas()

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-50">
      <Rainbow />

      <div className="z-10 flex w-full flex-col items-center gap-12 px-8">
        <h1 className="text-center font-bold text-3xl text-zinc-900 leading-tight md:text-5xl">
          Traga o passado <br /> para suas fotos
        </h1>

        <Camera />

        <form className="w-full sm:max-w-[320px]">
          <label
            htmlFor="image"
            className="flex w-full cursor-pointer flex-col items-center gap-3 rounded-lg border-2 border-zinc-900 border-dashed py-10 font-medium text-zinc-900 transition-opacity hover:opacity-70"
          >
            <FileImage className="h-7 w-7" />
            Fazer upload da imagem
          </label>

          <input
            onChange={loadImageToCrop}
            accept="image/png, image/jpg, image/jpeg"
            className="hidden"
            id="image"
            name="image"
            type="file"
          />
        </form>

        <CropDialog
          clearMetadata={clearMetadata}
          isOpen={cropDialogIsOpen}
          getCroppedImage={getCroppedImage}
        >
          <div className="flex items-center justify-center">
            <div>
              <Image
                alt="Image to crop"
                className="block h-40 w-fit lg:h-52 xl:h-60"
                id="image-to-crop"
                height={metadata?.height ?? 400}
                src=""
                width={metadata?.width ?? 400}
              />
            </div>
          </div>
        </CropDialog>

        {downloadDialogIsOpen && (
          <DownloadDialog
            clearMetadata={clearMetadata}
            isOpen
            url={polaroidURL}
          >
            <canvas className="w-60 shadow-2xl" ref={canvasRef} />
          </DownloadDialog>
        )}
      </div>
    </main>
  )
}
