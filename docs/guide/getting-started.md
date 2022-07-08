# Getting Started

## Installation

### Option 1: With NPM

```bash
npm i uni-media
```

### Option 2: With CDN

```html
<script src="https://cdn.jsdelivr.net/npm/uni-media@1/dist/index.global.js"></script>
```

## Basic Usage

### In Vanilla HTML

```html
<uni-media src="any-url" />
```

### In React.js

See <https://reactjs.org/docs/web-components.html#using-web-components-in-react>.

```jsx
import React from 'react'
import 'uni-media'

function MyComponent() {
  return (
    <div>
      <uni-media src="any-url" />
    </div>
  )
}
```

#### SSR in Frameworks like Next.js

If your framework has SSR, it would be [tricky](https://www.google.com/search?q=site%3Ahttps%3A%2F%2Fgithub.com%2Fvercel%2Fnext.js+web+component&newwindow=1&sxsrf=ALiCzsbS8K8SJua8kU3BSAGhvNUIOSmxBA%3A1657300099259&source=hp&ei=g2TIYunRDYXx-QahgYTYAg&iflsig=AJiK0e8AAAAAYshyk49cQWqG6SmWHu9tpluVSzJp-MZY&ved=0ahUKEwipn8394-n4AhWFeN4KHaEAASsQ4dUDCAc&uact=5&oq=site%3Ahttps%3A%2F%2Fgithub.com%2Fvercel%2Fnext.js+web+component&gs_lcp=Cgdnd3Mtd2l6EANQAFgAYPEBaABwAHgAgAFfiAFfkgEBMZgBAKABAqABAQ&sclient=gws-wiz) to integrate a web-component.

In Next.js, you need to import after the App is loaded with `useEffect(() => {}, [])`. Other frameworks will be like the same.

```jsx
// pages/_app.tsx
export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import('uni-media')
  }, [])

  return <Component {...pageProps} />
}
```

### In Vue.js

See <https://vuejs.org/guide/extras/web-components.html#using-custom-elements-in-vue>.

```html
<script>
  import 'uni-media'
</script>
<template>
  <uni-media src="any-url" />
</template>
```
