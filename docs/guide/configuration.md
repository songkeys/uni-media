# Configuration

## Attributes

### `src`

Required.

The link of your media. It supports HTTP(S), IPFS protocols.

Example:

```html
<uni-media src="https://placekitten.com/200/300" />
```

### `mimetype`

Optional.

Specify the _known_ mimetype of the media.

If not specified, the mimetype will be determined automatically.

Example:

```html
<uni-media src="https://placekitten.com/200/300" mimetype="image/jpeg" />
```

### `media-type`

Optional.

Force the media type.

This has a higher priority than the attribute `mimetype` and automatic detection.

Available values:

- `image`
- `video`
- `audio`
- `model`
- `pdf`
- `html`

Example:

```html
<uni-media src="https://placekitten.com/200/300" media-type="image" />
```

### `ipfs-gateway`

Optional.

The IPFS gateway to use.

Default: `https://ipfs.io/ipfs/`

Example:

```html
<uni-media
  src="ipfs://QmPMFdEeHdYsnLaN9jTFPKwVpNjVwDeL1Ey2u5zUxewnQS"
  ipfs-gateway="https://gateway.ipfs.io/ipfs/"
/>
```

### Native attributes

Native html attributes like `alt`, `title`, `style`, `class` is also supported.

In real-world application, You may want to specify all possible attribute to satisfy all the cases.

Example for an image:

```html
<uni-media
  src="https://placekitten.com/200/300"
  alt="A cute cat"
  title="A cute cat"
  style="width: 200px; height: 300px;"
  class="my-class"
/>
```

For 3D `model`'s attributes, please refer to the underlying library's documentation [`<model-viewer>`](https://modelviewer.dev/).

Example for a 3D model:

```html
<uni-media
  src="https://modelviewer.dev/shared-assets/models/NeilArmstrong.glb"
  camera-controls
  enable-pan
  poster="https://modelviewer.dev/shared-assets/models/NeilArmstrong.webp"
  seamless-poster
  style="height: 300px; width: 300px"
  onclick="console.log('clicked')"
/>
```

Example for an "universal" media in a real-world application (a set of mix attributes of different media types):

```html
<uni-media
  class="my-class"
  src="{{src}}"
  alt="An image"
  camera-controls
  enable-pan
  seamless-poster
  style="height: 300px; width: 300px"
  onclick="console.log('clicked')"
/>
```

## Events

### `filetype`

This event is emitted when the media's filetype is determined.

Callback:

```ts
type detail = {
  mediaType: string | null
  mimeType: string | null
  src: string
}
```

### `filetype-error`

This event is emitted when the media's filetype is not determined because of an error.

Callback:

```ts
type detail = {
  mediaType: undefined
  mimeType: undefined
  src: string
}
```

### Native events

All web native events are also supported.

Example:

```html
<uni-media
  src="https://placekitten.com/200/300"
  onclick="console.log('clicked')"
/>
```

## Slots

You can use slots to customize the UI in different status.

### `loading`

This slot is displayed when the media is loading.

Example:

```html
<uni-media src="https://placekitten.com/200/300">
  <div slot="loading">
    <div>Loading...</div>
  </div>
</uni-media>
```

### `error`

This slot is displayed when the media is not loaded because of an error.

Example:

```html
<uni-media src="https://placekitten.com/200/300">
  <div slot="error">
    <div>Error!</div>
  </div>
</uni-media>
```

### `unsupported`

This slot is displayed when the media type is not supported by the library.

Example:

```html
<uni-media src="https://placekitten.com/200/300">
  <div slot="unsupported">
    <div>Unsupported!</div>
  </div>
</uni-media>
```
