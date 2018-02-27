import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { AuthGuard } from './auth/auth.guard'

import { LoopbackLoginComponent } from './auth/loopback/lb-login.component'
import { DesktopComponent } from './desktop/desktop.component'
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'

const APP_ROUTES: Routes = [
  { path: 'home', component: DesktopComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoopbackLoginComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
  // { path: 'bs-templates', loadChildren: './bs-templates/bs-templates.module#BsTemplatesModule', canLoad: [AuthGuard] },
]

@NgModule({
  imports: [
    RouterModule.forRoot(APP_ROUTES)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
