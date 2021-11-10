import { SSRContext } from '../types';
import Antd from 'ant-design-vue';

export const install = ({ app, isClient }: SSRContext) => {
  app.use(Antd);

  if (isClient) {
    import('ant-design-vue/dist/antd.less');
  }
};
