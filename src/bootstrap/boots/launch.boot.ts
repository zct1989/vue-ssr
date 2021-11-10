import {
  NavigationGuardNext,
  RouteLocationNormalized,
  Router,
} from 'vue-router';
import { useStore } from '~/store';
import getAppLaunchTasks from '../launch/app.launch';
import getUserLaunchTasks from '../launch/user.launch';
/**
 * 业务启动逻辑
 */
export async function appLaunch() {
  const store = useStore((store) => store.app);
  // 同步并获取应用
  await Promise.all(getAppLaunchTasks());
  // 更新系统状态
  store.setReady();
}

/**
 * 业务启动逻辑
 */
export async function userLaunch() {
  // 同步并获取应用
  await Promise.all(getUserLaunchTasks());
}

/**
 * 验证TOKEN有效性
 */
export async function tokenAccess(
  to: RouteLocationNormalized,
  next: NavigationGuardNext,
) {
  const userStore = useStore((store) => store.user);

  if (userStore.token && !userStore.current) {
    return true;
  } else {
    return false;
  }
}

export default function (router: Router) {
  const appStore = useStore((store) => store.app);

  router.beforeEach(async (to, from, next) => {
    // 系统初始化状态
    if (appStore.ready) {
      return next();
    }

    // 系统启动逻辑
    await appLaunch();

    // 非认证页面跳转
    if (to.meta.auth === false) {
      return next();
    }

    // 用户验证检测
    switch (await tokenAccess(to, next)) {
      case true:
        await userLaunch();
        break;
      case false:
        return;
    }

    next();
  });
}
