import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { Test1Component } from './test1.component';
import { HeroesComponent } from './heroes/heroes.component';



@NgModule({
  declarations: [
    AppComponent,
    Test1Component,
   
    
  ],
  imports: [
    BrowserModule
  ],
  providers: [Test1Component],
  bootstrap: [AppComponent,]
})
export class AppModule { }
