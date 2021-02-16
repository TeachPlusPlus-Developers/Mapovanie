import { createRouter, createWebHashHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Tabs from '../_layout/tabs.vue';
// eslint-disable-next-line import/no-cycle
import store from './store';

const routes: Array<RouteRecordRaw> = [
  {
    name: 'Index',
    path: '/',
    component: () => import('@/plugins/app/index/index.vue'),
    beforeEnter(to, from, next) {
      console.log('/', from);
      if (!from.name) {
        next();
      } else {
        next({ name: 'Home' });
      }
    },
  },
  {
    path: '/tabs/',
    component: Tabs,
    children: [
      {
        path: '',
        redirect: '/tabs/home',
      },
      {
        name: 'Home',
        path: 'home',
        component: () => import('@/plugins/app/home/home.vue'),
      },
      {
        name: 'Latest',
        path: 'latest',
        component: () => import('@/plugins/app/latest/latest.vue'),
      },
      {
        name: 'Settings',
        path: 'settings',
        component: () => import('@/plugins/app/settings/settings.vue'),
      },
    ],
  },

  // Without tabs
  {
    name: 'Form',
    path: '/form',
    component: () => import('@/plugins/app/form/form.vue'),
    beforeEnter(to, from, next) {
      if (!to.params.image
          || !to.params.deviceLocation) {
        next({ name: 'Home' });
      } else {
        next();
      }
    },
  },
  {
    name: 'Success',
    path: '/success',
    component: () => import('@/plugins/app/success/success.vue'),
  },
  {
    name: 'Fail',
    path: '/fail',
    component: () => import('@/plugins/app/fail/fail.vue'),
  },
  {
    name: 'Slides',
    path: '/slides',
    component: () => import('@/plugins/app/slides/slides.vue'),
  },
  {
    name: 'Login',
    path: '/login',
    component: () => import('@/plugins/app/login/login.vue'),
  },
  {
    name: 'EntityDetail',
    path: '/entity-detail/:id',
    component: () => import('@/plugins/app/entity-detail/entity-detail.vue'),
  },
  {
    name: 'QnA',
    path: '/settings/qna',
    component: () => import('@/plugins/app/settings/qna.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

// eslint-disable-next-line consistent-return
router.beforeEach((to, from, next) => {
  if (!store.getters.isUserLoggedIn && !(to.name === 'Index' || to.name === 'Login')) {
    next({ name: 'Index' });
  } else if (store.getters.isUserLoggedIn && to.name === 'Login') {
    next({ name: 'Home' });
  } else {
    next();
  }
});

export default router;
