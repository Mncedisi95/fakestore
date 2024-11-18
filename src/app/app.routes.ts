import { Routes } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { IndexComponent } from './components/index/index.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { UsersComponent } from './components/users/users.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { authGuard } from './guards/auth.guard';
import { CartComponent } from './components/cart/cart.component';

export const routes: Routes = [

    {path:'login', component: SignInComponent},
    {path:'index', component: IndexComponent, canActivate: [authGuard]},
    {path:'productdetail/:id', component: ProductDetailComponent,canActivate: [authGuard]},
    {path:'addproduct', component: AddProductComponent,canActivate: [authGuard]},
    {path:'editproduct/:id', component: EditProductComponent,canActivate: [authGuard]},
    {path:'users', component:UsersComponent,canActivate: [authGuard]},
    {path:'carts', component:CartComponent, canActivate:[authGuard]},
    {path:'', redirectTo:'/login', pathMatch:'full'},
    {path:'**', component:PagenotfoundComponent}
];
