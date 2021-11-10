import NProgress from 'nprogress';
import { SSRContext } from '../types';

export const install = ({ isClient, router }: SSRContext) => {
  if (isClient) {
    router.beforeEach(() => {
      NProgress.start();
    });
    router.afterEach(() => {
      NProgress.done();
    });
  }
};
