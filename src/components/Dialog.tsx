import { ReactNode } from 'react'

import {
  Close,
  Content,
  Description,
  Overlay,
  Portal,
  Root,
  Title,
} from '@radix-ui/react-dialog'
import { DownloadCloud, X } from 'lucide-react'

interface DialogProps {
  children: ReactNode
  clearMetadata: () => void
  isOpen: boolean
  url: string
}

export function Dialog({ children, clearMetadata, isOpen, url }: DialogProps) {
  return (
    <Root open={isOpen}>
      <Portal>
        <Overlay className="fixed inset-0 z-20 bg-zinc-900/50" />

        <Content className="fixed inset-0 z-20 flex items-center justify-center">
          <div className="flex flex-col-reverse items-center gap-10 rounded-md border border-zinc-100 bg-zinc-50 p-10 shadow-lg md:flex-row">
            <div className="max-w-xs space-y-2">
              <Title className="text-2xl font-semibold">Aí está!</Title>

              <Description className="pb-3">
                Você pode baixar sua imagem ou continuar criando recordações!
              </Description>

              <div className="flex w-full items-center justify-between gap-2">
                <a
                  className="flex w-fit items-center gap-3 rounded bg-zinc-800 px-5 py-3 text-zinc-50"
                  download="polaroid.png"
                  href={url}
                >
                  Baixar Imagem <DownloadCloud className="h-4 w-4" />
                </a>

                <Close
                  onClick={clearMetadata}
                  className="flex w-fit items-center gap-3 rounded border border-zinc-900 px-5 py-3 text-zinc-900"
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
