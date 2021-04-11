import { NgModule } from '@angular/core'
import { Routes } from '@angular/router'
import { NativeScriptRouterModule, NSEmptyOutletComponent } from '@nativescript/angular'

const routes: Routes = [
  {
    path: '',
    redirectTo: '/(homeTab:home/default//profileTab:profile/default//aboutTab:about/default',
    pathMatch: 'full',
  },

  {
    path: 'home',
    component: NSEmptyOutletComponent,
    loadChildren: () => import('~/app/home/home.module').then((m) => m.HomeModule),
    outlet: 'homeTab',
  },
  {
    path: 'profile',
    component: NSEmptyOutletComponent,
    loadChildren: () => import('~/app/profile/profile.module').then((m) => m.ProfileModule),
    outlet: 'profileTab',
  },
  {
    path: 'about',
    component: NSEmptyOutletComponent,
    loadChildren: () => import('~/app/about/about.module').then((m) => m.AboutModule),
    outlet: 'aboutTab',
  },
]

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule],
})
export class AppRoutingModule {}
