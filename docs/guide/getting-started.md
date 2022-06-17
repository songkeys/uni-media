# Getting Started

## Installation

### Option 1: With NPM

```bash
npm i uni-media
```

### Option 2: With CDN

```html
<script src="https://cdn.jsdelivr.net/npm/uni-media@1/dist/uni-media.global.js"></script>
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
