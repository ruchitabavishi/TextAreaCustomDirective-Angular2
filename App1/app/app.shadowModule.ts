import { NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {shadowComponent} from './app.shadowComponent';
import {ShadowDirective} from './shadow.drective';
@NgModule({
    imports: [CommonModule],
    declarations: [
      shadowComponent,
      ShadowDirective
    ],
    exports: [shadowComponent, ShadowDirective]
  })

  export class shadowModule
  {


  }

