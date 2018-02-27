import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core'
import { PathLocationStrategy, LocationStrategy } from '@angular/common'

import { AuthGuard } from './auth/auth.guard'
import { AuthModule } from './auth/auth.module'
import { AppRoutingModule } from './app-routing.module'

import {} from 'jasmine'

import { DesktopModule } from './desktop/desktop.module'

import { AppComponent } from './app.component'

import { PageNotFoundComponent } from './page-not-found/page-not-found.component'

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AuthModule,
    DesktopModule
  ],
  providers: [
    AuthGuard,
    {provide: LocationStrategy, useClass: PathLocationStrategy},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
