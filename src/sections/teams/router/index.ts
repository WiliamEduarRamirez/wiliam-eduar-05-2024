import { RouteRecordRaw } from 'vue-router';

const teamRoutes: Array<RouteRecordRaw> = [
  {
    path: '/team',
    name: 'Team',
    component: () => import('@/sections/teams/views/TeamView.vue'),
  },
  {
    path: '/team/:id',
    name: 'TeamDetail',
    component: () => import('@/sections/teams/views/TeamDetailView.vue'),
  },
];

export default teamRoutes;
