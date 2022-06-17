import { LitElement, html, PropertyDeclaration } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import {
  getMediaType,
  type MediaType,
  spreadProps,
  mimeTypeToMediaType,
} from './utils'
import '@google/model-viewer'

/**
 * An example element.
 *
 * @fires filetype - Indicates when the file type is determined.
 * @fires filetype-error - Indicates if some error occurs while determining the file type.
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('uni-media')
export class UniMedia extends LitElement {
  /**
   * The src of the media.
   */
  @property({ type: String })
  src!: string

  /**
   * Specify the known mimetype of the media.
   * If not specified, the mimetype will be determined automatically.
   */
  @property({ type: String, attribute: 'mimetype' })
  mimetype?: string

  /**
   * Force the media type.
   * This has a higher priority than the specified `mimetype` and automatic detection.
   */
  @property({ type: String, attribute: 'media-type' })
  mediaType?: MediaType

  /**
   * IPFS gateway for the media if the url starts with `ipfs://`.
   * @default https://ipfs.io/ipfs/
   */
  @property({ type: String, attribute: 'ipfs-gateway' })
  ipfsGateway?: string

  @state()
  protected _mediaType: MediaType | null = null

  @state()
  protected _error: Error | null = null

  @state()
  protected _src: string | null = null

  async handleSrcChanged() {
    if (this.src) {
      try {
        let result: Awaited<ReturnType<typeof getMediaType>>

        if (this.mediaType) {
          this._mediaType = this.mediaType
          result = { mediaType: this.mediaType, mimeType: null, src: this.src }
        } else if (this.mimetype) {
          this._mediaType = mimeTypeToMediaType(this.mimetype)
          result = {
            mediaType: this._mediaType,
            mimeType: this.mimetype,
            src: this.src,
          }
        } else {
          result = await getMediaType(this.src, {
            ipfsGateway: this.ipfsGateway,
          })
          this._mediaType = result.mediaType
        }

        this._src = result.src

        this.dispatchEvent(
          new CustomEvent('filetype', {
            detail: {
              mediaType: result.mediaType,
              mimeType: result.mimeType,
              src: this.src,
            },
            bubbles: true,
            composed: true,
          }),
        )
      } catch (e: any) {
        console.error(e)
        e.detail = {
          mediaType: undefined,
          mimeType: undefined,
          src: this.src,
        }
        this._error = e
        this.dispatchEvent(
          new ErrorEvent('filetype-error', {
            error: e,
            bubbles: true,
            composed: true,
          }),
        )
      }
    } else {
      const e = new Error('src is required')
      this._error = e
      this.dispatchEvent(
        new ErrorEvent('filetype-error', {
          error: e,
          bubbles: true,
          composed: true,
        }),
      )
    }
  }

  override requestUpdate(
    name?: PropertyKey | undefined,
    oldValue?: unknown,
    options?: PropertyDeclaration<unknown, unknown> | undefined,
  ): void {
    super.requestUpdate(name, oldValue, options)
    if (name === 'src') {
      this.handleSrcChanged()
    }
  }

  override render() {
    if (!this.src || this._error) {
      return html`<slot name="error"
        >Some error occurs! ${this._error?.message}</slot
      >`
    }

    if (!this._mediaType) {
      return html`<slot name="loading">Loading</slot>`
    }

    if (!this._src) {
      return html`<slot name="error">Some error occurs! Can't find src</slot>`
    }

    if (this._mediaType === 'image') {
      return html`<img src="${this._src}" ${spreadProps()} />`
    }

    if (this._mediaType === 'video') {
      return html`<video src="${this._src}" controls ${spreadProps()}>
        <slot></slot>
      </video>`
    }

    if (this._mediaType === 'audio') {
      return html`<audio src="${this._src}" controls ${spreadProps()}>
        <slot></slot>
      </audio>`
    }

    if (this._mediaType === 'model') {
      return html`<model-viewer src="${this._src}" ${spreadProps()}>
        <slot></slot>
      </model-viewer>`
    }

    if (this._mediaType === 'pdf') {
      return html`<iframe src="${this._src}" ${spreadProps()} />`
    }

    if (this._mediaType === 'html') {
      return html`<iframe src="${this._src}" ${spreadProps()} />`
    }

    return html`<slot name="unsupported"></slot>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uni-media': UniMedia
  }
}
