import { nothing } from 'lit'
import { Directive, directive, PartInfo } from 'lit/directive.js'
import { processSrc } from './web3'

export const spreadProps = directive(
  class MyDirective extends Directive {
    partInfo: PartInfo

    constructor(partInfo: PartInfo) {
      super(partInfo)
      this.partInfo = partInfo
    }

    render(): unknown {
      // @ts-ignore
      const host = this.partInfo.options.host as HTMLElement
      Object.values(host.attributes).forEach((attr) => {
        if (attr.name !== 'src') {
          // @ts-ignore
          this.partInfo.element.setAttribute(attr.name, attr.value)
        }
        if (attr.name === 'poster') {
          const ipfsGateway = host.getAttribute('ipfs-gateway') ?? undefined
          const src = processSrc(attr.value, ipfsGateway)
          // @ts-ignore
          this.partInfo.element.setAttribute(attr.name, src)
        }
      })
      return nothing
    }
  },
)
