import { Routes } from '@angular/router';
import { HomeComponent } from '@pages/home/home.component';
import { dataGuard } from '@common/guard/data.guard';

export enum LayoutPageRouteNames {
    HOME = 'home',
    ADDRESS = 'address',
}

export default [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    {
        path: LayoutPageRouteNames.HOME,
        component: HomeComponent,
    },
    {
        path: `${LayoutPageRouteNames.ADDRESS}/:address`,
        // canMatch: [dataGuard()],
        loadComponent: () => import('./../pages/dashboard/dashboard.component').then((m) => m.DashboardComponent),
    },
    {
        path: '**',
        redirectTo: '',
    },
] as Routes;
