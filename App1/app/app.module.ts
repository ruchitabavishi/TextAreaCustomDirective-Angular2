import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//import{ShadowDirective} from './shadow.drective';
import {shadowModule} from './app.shadowModule'


@NgModule({
  declarations: [
    AppComponent
    //ShadowDirective
     
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    shadowModule,
    //ShadowDirective
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
