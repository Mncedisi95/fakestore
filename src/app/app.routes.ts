import { Routes } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';

export const routes: Routes = [

    {path:'login', component: SignInComponent},
    {path: '', redirectTo:'/login', pathMatch:'full'}
];
