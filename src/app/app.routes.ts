import { Routes } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';

export const routes: Routes = [
    {
        path: 'table',
        loadComponent: () => import('./components/block-list-table/block-list-table.component').then(m => m.BlockListTableComponent)
    },
    {
        path: 'blocklist',
        loadComponent: () => import('./views/block-list/block-list.component').then(m => m.BlockListComponent)
    },
    { 
        path: '**',
        loadComponent: () => import('./views/home/home.component').then(m => m.HomeComponent)
    }
];
