export function processSrc(
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
