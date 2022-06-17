# Mechanism (How it Works)

## Automatic Media Type Detection

The `<uni-media>` component automatically detects the type of media being embedded. Here is how it works:

1. If the media URL has a format suffix, it is assumed to be of that type.
2. If not, a `HEAD` request is made to the URL. If the response has a `Content-Type` header, it is assumed to be of that type.
3. If not, a streaming request is made to the URL. A smart detection is performed by looking at the first few bytes ([magic number](<https://www.wikiwand.com/en/Magic_number_(programming)#/Magic_numbers_in_files>)) of the response. Once the magic number is found, the type is assumed to be of that type. And the response is closed for performance.

With these strategies, the **accuracy** and **performance** of the detection is guaranteed.
