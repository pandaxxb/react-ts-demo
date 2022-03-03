import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/image-gallery', component: '@/pages/image-gallery/index' },
    { path: '/user', component: '@/pages/user/index' },
  ],
  alias: {
    components: 'src/components',
  },
  fastRefresh: {},
  locale: {
    default: 'zh-CN',
    antd: true,
    title: false,
    baseNavigator: true,
    baseSeparator: '-',
  },
});
