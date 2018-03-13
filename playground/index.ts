/**
 * This is only for local test
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Component } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { ZoomImageModule }  from 'ngx-zoom-image';

@Component({
  selector: 'app',
  template: `<img [zoomImage]="zoomImg" [imgSrc]="img" [style.width]="'200px'" [style.height]="'200px'">`
})
class AppComponent {
  img = 'https://assets-cdn.github.com/images/modules/logos_page/Octocat.png';
  zoomImg = 'https://assets-cdn.github.com/images/modules/logos_page/Octocat.png';
}

@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [ AppComponent ],
  imports: [ BrowserModule, ZoomImageModule ]
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
