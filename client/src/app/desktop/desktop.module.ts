import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'

import { AuthModule } from '../auth/auth.module'
import { ChatModule } from './chatbar/chat/chat.module'

import { MdSidenavModule } from '@angular/material'
import { Ng2PageScrollModule } from 'ng2-page-scroll'
import { PopoverModule, TooltipModule, ModalModule } from 'ngx-bootstrap'

import { DesktopComponent } from './desktop.component'
import { NavbarComponent } from './navbar/navbar.component'
import { FooterComponent } from './footer/footer.component'
import { BannerComponent } from './banner/banner.component'
import { MenuComponent } from './menu/menu.component'
import { AboutComponent } from './about/about.component'
import { LocationsComponent } from './locations/locations.component'
import { ChatbarComponent } from './chatbar/chatbar.component'

@NgModule({
  declarations: [
    DesktopComponent,
    NavbarComponent,
    FooterComponent,
    BannerComponent,
    MenuComponent,
    AboutComponent,
    LocationsComponent,
    ChatbarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2PageScrollModule,
    AuthModule,
    HttpModule,
    MdSidenavModule,
    ChatModule,
    PopoverModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot()
  ],
  exports: [DesktopComponent]
})
export class DesktopModule { }
