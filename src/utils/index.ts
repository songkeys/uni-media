import * as FileType from 'file-type'
import { MediaType } from './types'
import mime from 'mime/lite'

export async function getMediaType(
  src: string,
  {
    ipfsGateway,
  }: {
    ipfsGateway?: string
  } = {},
): Promise<{
  mediaType: MediaType | null
  mimeType: string | null
  src: string
}> {
  // 0. pre-process src
  src = processSrc(src, ipfsGateway)

  // 1. get by extension
  const mimeType = mime.getType(src)
  if (mimeType) {
    // console.log('1. get by extension', src, mimeType)
    const mediaType = mimeTypeToMediaType(mimeType)
    return { mediaType, mimeType, src }
  }

  // 2. get from header
  try {
    const contentType = await fetch(src, { method: 'HEAD' }).then((res) =>
      res.headers.get('content-type'),
    )
    if (contentType) {
      // console.log('2. get from header', src, contentType)
      const mediaType = mimeTypeToMediaType(contentType)
      return { mediaType, mimeType, src }
    }
  } catch (e) {
    // method not allow or CORS
  }

  // 3. get by stream
  try {
    const controller = new AbortController()
    const signal = controller.signal
    const stream = await fetch(src, { signal }).then(
      (response) => response.body,
    )
    if (stream) {
      const fileType = await FileType.fileTypeFromStream(stream as any)
      controller.abort()
      if (fileType) {
        // console.log('3. get by stream', src, fileType)
        const mediaType = mimeTypeToMediaType(fileType.mime)
        return { mediaType, mimeType, src }
      }
    }
  } catch (e) {
    // CORS
  }

  throw new Error('Unable to get media type of ' + src)
}

export function mimeTypeToMediaType(mimeType: string): MediaType | null {
  // https://github.com/sindresorhus/file-type/blob/main/core.d.ts#L145
  if (mimeType.startsWith('image')) {
    return 'image'
  }

  if (mimeType.startsWith('video')) {
    return 'video'
  }

  if (mimeType.startsWith('audio') || mimeType.endsWith('ogg')) {
    return 'audio'
  }

  if (mimeType.startsWith('model')) {
    return 'model'
  }

  if (mimeType.startsWith('application/pdf')) {
    return 'pdf'
  }

  if (mimeType.startsWith('text/html')) {
    return 'html'
  }

  return null
}

function processSrc(
  src: string,
  ipfsGateway: string = getDefaultIpfsGateway(),
): string {
  if (src.startsWith('ipfs://')) {
    return src.replace('ipfs://', ipfsGateway)
  }

  return src
}

function getDefaultIpfsGateway() {
  return 'https://ipfs.io/ipfs/'
}

export * from './types'
export * from './directives'
