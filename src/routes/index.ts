import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import NotFoundView from '@/sections/shared/views/NotFoundView.vue';
import pokemonRoutes from '@/sections/pokemons/router';
import teamRoutes from '@/sections/teams/router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      ...pokemonRoutes,
      ...teamRoutes,
      {
        path: ':pathMatch(.*)*',
        name: 'NotFound',
        component: NotFoundView,
      },
    ],
  },
  /*  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  },*/
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(_, __, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0, behavior: 'smooth' };
    }
  },
});

export default router;
