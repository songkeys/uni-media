import * as lit_html from 'lit-html';
import { LitElement, PropertyDeclaration } from 'lit';

declare type MediaType = 'image' | 'video' | 'audio' | 'model' | 'pdf' | 'html';

/**
 * An example element.
 *
 * @fires filetype - Indicates when the file type is determined.
 * @fires filetype-error - Indicates if some error occurs while determining the file type.
 * @slot - This element has a slot
 * @csspart button - The button
 */
declare class UniMedia extends LitElement {
    /**
     * The src of the media.
     */
    src: string;
    /**
     * Specify the known mimetype of the media.
     * If not specified, the mimetype will be determined automatically.
     */
    mimetype?: string;
    /**
     * Force the media type.
     * This has a higher priority than the specified `mimetype` and automatic detection.
     */
    mediaType?: MediaType;
    /**
     * IPFS gateway for the media if the url starts with `ipfs://`.
     * @default https://ipfs.io/ipfs/
     */
    ipfsGateway?: string;
    protected _mediaType: MediaType | null;
    protected _error: Error | null;
    protected _src: string | null;
    handleSrcChanged(): Promise<void>;
    requestUpdate(name?: PropertyKey | undefined, oldValue?: unknown, options?: PropertyDeclaration<unknown, unknown> | undefined): void;
    render(): lit_html.TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'uni-media': UniMedia;
    }
}

export { UniMedia };
