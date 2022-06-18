# Introduction

`uni-media` is a simple, performant, and **universal** media display web-component.

## Motivation

In real-world applications, we often need to display media in a variety of ways. For example, we may want to display a video, an image, or a sound.

```html
<video src="https://www.youtube.com/watch?v=dQw4w9WgXcQ" />
<img src="https://picsum.photos/200" />
<audio src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" />
<iframe src="https://example.com" />
```

1. If the datasource is unknown, we can't know what type of media it is before displaying it.
2. If the datasource is known, we still need to write a boilerplate code to display it.

## Case: NFT display

This problem occurs a lot, for example, in displaying NFTs or IPFS content. The URL of one (digital art) item will probably look like this:

```
ipfs://QmPMFdEeHdYsnLaN9jTFPKwVpNjVwDeL1Ey2u5zUxewnQS
```

To know the media type of it, we need to pre-request the content and analyze it, then display it in a suitable html tag like `<img>` or `<video>` or `<audio>` or `<iframe>` or `<model-view>`... This is a tedious task.

Luckily, we can use the `uni-media` to display any media in a web app with only **one line of code**.

```html
<uni-media
  src="ipfs://QmPMFdEeHdYsnLaN9jTFPKwVpNjVwDeL1Ey2u5zUxewnQS"
  style="max-width: 300px;"
/>
```

Preview:

<img src="https://bafybeiapamvkmv3qwfft5c3q4axgyd56y3izzedozejleabtejx4xx3bam.ipfs.cf-ipfs.com/" style="max-width: 300px;" >

<!-- <uni-media src="ipfs://QmPMFdEeHdYsnLaN9jTFPKwVpNjVwDeL1Ey2u5zUxewnQS" style="max-width: 300px;" /> -->

This web-component does the dirty job for you, in a performant way.
