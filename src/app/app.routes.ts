import { Routes } from '@angular/router';
import { SearchPageComponent } from './pages/search-page/search-page.component';

export const routes: Routes = [
    {    path:'', component: SearchPageComponent},
    {    path: 'results', loadComponent:() => import('./pages/result-page/result-page.component').then(m=> m.ResultPageComponent)},
       {    path: 'flights:id', loadComponent:() => import('./pages/result-page/result-page.component').then(m=> m.ResultPageComponent)},
     { path: '**', redirectTo: '' },
    ];
