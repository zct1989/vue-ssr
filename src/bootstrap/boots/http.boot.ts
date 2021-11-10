import { RequestService } from '@gopowerteam/http-request';
import { appConfig } from '~/config/app.config';
import { TokenService } from '~/http/extends/token.service';
import { message } from 'ant-design-vue';
export default function () {
  // 配置服务端信息
  RequestService.setConfig({
    gateway: {
      default: appConfig.http.gateway.default,
      authorization: appConfig.http.gateway.authorization,
    },
    timeout: 30000,
    qs: {
      arrayFormat: 'repeat',
      skipNulls: true,
      allowDots: true,
      encodeValuesOnly: true,
      encode: true,
    },
  });

  // 添加状态拦截器
  RequestService.interceptors.status.use((respone) => {
    return respone.status === 200;
  });

  // 添加成功拦截器
  RequestService.interceptors.success.use((respone) => {
    return respone.data;
  });

  // 添加失败拦截器
  RequestService.interceptors.error.use((respone) => {
    return respone;
  });

  // 网络异常处理
  RequestService.requestCatchHandle = (respone) => {
    const defaultError = '服务通讯连接失败';
    const messageList = new Map<number, string>([
      [400, '请求参数错误'],
      [405, '请求服务方法错误'],
      [500, '服务器内部错误'],
      [403, '没有权限，请重新登陆'],
    ]);

    if (respone) {
      const responseMessage = (respone.data || {}).message;
      const errorMessage =
        responseMessage || messageList.get(respone.status) || defaultError;
      if (respone.status === 403) {
        setTimeout(() => {
          location.href = appConfig.authURL;
        }, 2000);
      }
      message.error(errorMessage);
    } else {
      // Notification.error(defaultError)
    }
  };

  // 安装Token认证服务
  RequestService.installExtendService(new TokenService());
}
