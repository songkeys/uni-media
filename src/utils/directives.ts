import { nothing } from 'lit'
import { Directive, directive, PartInfo } from 'lit/directive.js'

export const spreadProps = directive(
  class MyDirective extends Directive {
    partInfo: PartInfo

    constructor(partInfo: PartInfo) {
      super(partInfo)
      this.partInfo = partInfo
    }

    render(): unknown {
      // @ts-ignore
      const host = this.partInfo.options.host
      Object.values(host.attributes).forEach((attr) => {
        // @ts-ignore
        if (attr.name !== 'src') {
          // @ts-ignore
          this.partInfo.element.setAttribute(attr.name, attr.value)
        }
      })
      return nothing
    }
  },
)
