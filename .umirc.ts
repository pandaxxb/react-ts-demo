import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/image-gallery', component: '@/pages/image-gallery/index' },
  ],
  alias: {
    components: 'src/components',
  },
  fastRefresh: {},
});
