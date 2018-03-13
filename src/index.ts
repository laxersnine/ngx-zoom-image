import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZoomImageDirective } from './zoom-image.directive';

export * from './zoom-image.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ZoomImageDirective
  ],
  exports: [
    ZoomImageDirective
  ]
})
export class ZoomImageModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ZoomImageModule
    };
  }
}
