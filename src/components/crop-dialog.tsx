import type { ReactNode } from 'react'

import {
  Close,
  Content,
  Description,
  Overlay,
  Portal,
  Root,
  Title,
} from '@radix-ui/react-dialog'
import { ArrowUpRight, X } from 'lucide-react'

interface CropDialogProps {
  children: ReactNode
  clearMetadata: () => void
  isOpen: boolean
  getCroppedImage: () => void
}

export function CropDialog({
  children,
  clearMetadata,
  isOpen,
  getCroppedImage,
}: CropDialogProps) {
  return (
    <Root open={isOpen}>
      <Portal>
        <Overlay className="fixed inset-0 z-20 bg-zinc-900/50" />

        <Content className="fixed inset-0 z-20 flex items-center justify-center">
          <div className="flex flex-col-reverse items-center gap-10 rounded-md border border-zinc-100 bg-zinc-100 p-10 shadow-lg md:flex-row">
            <div className="max-w-xs space-y-2">
              <Title className="font-semibold text-2xl">Ajuste a imagem</Title>

              <Description className="pb-3">
                Ajuste a imagem para que ela fique centralizada e com o tamanho
                desejado.
              </Description>

              <div className="flex w-full items-center gap-5">
                <button
                  onClick={getCroppedImage}
                  className="flex w-fit items-center gap-3 rounded-sm bg-zinc-800 px-5 py-3 text-zinc-50"
                  type="button"
                >
                  Prosseguir <ArrowUpRight className="h-4 w-4" />
                </button>

                <Close
                  onClick={clearMetadata}
                  className="flex w-fit items-center gap-3 rounded-sm border border-zinc-900 px-5 py-3 text-zinc-900"
                >
                  Fechar <X className="h-4 w-4" />
                </Close>
              </div>
            </div>

            {children}
          </div>
        </Content>
      </Portal>
    </Root>
  )
}
