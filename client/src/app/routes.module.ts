import { ModuleWithProviders } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthService } from "src/services/auth.service";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { MenuItens } from "./menu-itens";
import { SignUpComponent } from "./sign-up/sign-up.component";

const rootRoutes: Routes = [
    {
      path: '',
      component: HomeComponent,
      canActivate: [AuthService],
      children: [
        {
          path: '',
          canActivateChild: [AuthService],
          children: MenuItens
        }
      ]
    },
    {
      path: 'login',
      component: LoginComponent
    },
    {
      path: 'signup',
      component: SignUpComponent
    },
    {
      path: '**',
      redirectTo: ''
    }
  ];
  
  export const RoutesModule: ModuleWithProviders<RouterModule> = RouterModule.forRoot(rootRoutes, { relativeLinkResolution: 'legacy' });
  