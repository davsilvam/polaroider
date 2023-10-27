export interface Metadata {
  name: string
  width: number
  height: number
  localUrl: string
}

export async function getImageMetadata(file: File): Promise<Metadata> {
  const { name } = file
  const localUrl = URL.createObjectURL(file)

  async function getImageParams(file: File): Promise<{
    width: number
    height: number
  }> {
    return new Promise(resolve => {
      const reader = new FileReader()

      reader.onload = async (event: ProgressEvent<FileReader>) => {
        const image = new Image()

        image.src = event.target?.result as string
        await image.decode()

        resolve({ width: image.width, height: image.height })
      }

      reader.readAsDataURL(file)
    })
  }
  const { width, height } = await getImageParams(file)

  return { name, width, height, localUrl }
}
