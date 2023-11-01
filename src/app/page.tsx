'use client'

import Img from 'next/image'

import { FileImage } from 'lucide-react'

import { Dialog, Rainbow } from '@/components'

import { useCanvas } from '@/hooks'

import cameraUrl from '../assets/camera.svg'

export default function Home() {
  const { canvasRef, clearMetadata, loadCanvas, metadata, polaroidURL } =
    useCanvas()

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-50">
      <Rainbow />

      <div className="z-10 flex w-full flex-col items-center gap-12 px-8">
        <h1 className="text-center text-3xl font-bold leading-tight text-zinc-900 md:text-5xl">
          Traga o passado <br /> para suas fotos
        </h1>

        <Img
          className="w-full max-w-[200px] sm:max-w-[240px] md:max-w-[320px]"
          alt="Polaroid camera illustration."
          src={cameraUrl}
        />

        <form className="w-full sm:max-w-[320px]">
          <label
            htmlFor="image"
            className="flex w-full cursor-pointer flex-col items-center gap-3 rounded-lg border-2 border-dashed border-zinc-900 py-10 font-medium text-zinc-900 transition-opacity hover:opacity-70"
          >
            <FileImage className="h-7 w-7" />
            Fazer upload da imagem
          </label>

          <input
            onChange={loadCanvas}
            className="hidden"
            accept="image/png, image/jpg, image/jpeg"
            type="file"
            name="image"
            id="image"
          />
        </form>

        {metadata && (
          <Dialog clearMetadata={clearMetadata} isOpen url={polaroidURL}>
            <canvas className="w-60 shadow-2xl" ref={canvasRef}></canvas>
          </Dialog>
        )}
      </div>
    </main>
  )
}
