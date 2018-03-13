# ngx-zoom-image

## Installation

To install this library, run:

```bash
$ npm install ngx-zoom-image --save
```

## Consuming your library

Once you have published your library to npm, you can import your library in any Angular application by running:

```bash
$ npm install ngx-zoom-image
```

and then from your Angular `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import your library
import { ZoomImageModule } from 'ngx-zoom-image';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

    ZoomImageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

```xml
<!-- You can now use your library component in app.component.html -->
<h1>
  {{title}}
</h1>
<img zoomImage="zoomImgSrc" imgSrc="imgSrc">
```

## Development

To generate all `*.js`, `*.d.ts` and `*.metadata.json` files:

```bash
$ npm run build
```

To lint all `*.ts` files:

```bash
$ npm run lint
```

## License

MIT © [Davis Yang](mailto:laxersnine@gmail.com)
