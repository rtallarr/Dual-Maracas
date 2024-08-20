import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'blocklist',
        loadComponent: () => import('./slayer/block-list/block-list.component').then(m => m.BlockListComponent)
    },
    { 
        path: '**',
        loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
    }
];
