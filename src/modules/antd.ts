import { SSRContext } from '../types';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.less';

export const install = ({ app, isClient }: SSRContext) => {
  app.use(Antd);
};
