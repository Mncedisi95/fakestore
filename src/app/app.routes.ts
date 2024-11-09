import { Routes } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { IndexComponent } from './components/index/index.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { UsersComponent } from './components/users/users.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';

export const routes: Routes = [

    {path:'login', component: SignInComponent},
    {path:'products', component: IndexComponent},
    {path:'productdetail', component: ProductDetailComponent},
    {path:'addproduct', component: AddProductComponent},
    {path:'editproduct', component: EditProductComponent},
    {path:'users', component:UsersComponent},
    {path:'', redirectTo:'/login', pathMatch:'full'}
];
