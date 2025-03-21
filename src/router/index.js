import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue'),
    },
    {
      path: '/new-task',
      name: 'new-task',
      component: () => import('../views/CreateTaskView.vue'),
    },
    {
      path: '/edit-tags',
      name: 'edit-tags',
      component: () => import('../views/EditTagsView.vue'),
    },
  ],
});

export default router;
