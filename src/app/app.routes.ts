import { Routes } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { IndexComponent } from './components/index/index.component';

export const routes: Routes = [

    {path:'login', component: SignInComponent},
    {path:'index', component: IndexComponent},
    {path:'', redirectTo:'/login', pathMatch:'full'}
];
