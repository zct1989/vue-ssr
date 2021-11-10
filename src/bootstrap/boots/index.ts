import { SSRContext } from '../../types';
import componentBoot from './component.boot';
import httpBoot from './http.boot';
import launchBoot from './launch.boot';

export default function ({ app, router }: SSRContext) {
  // 网络配置安装
  httpBoot();
  // 全局组件配置
  componentBoot(app);
  // 启动安装
  launchBoot(router);
}
