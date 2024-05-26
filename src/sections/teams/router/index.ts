import { RouteRecordRaw } from 'vue-router';
import validateTeam from '@/sections/teams/middlewares/ValidateTeam.ts';

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
    beforeEnter: validateTeam,
  },
];

export default teamRoutes;
