import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'details/:id',
    renderMode: RenderMode.Server
  },
  {
    path: 'category-details/:id/:name',
    renderMode: RenderMode.Server
  },
  {
    path: 'brand-details/:id/:name',
    renderMode: RenderMode.Server
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
