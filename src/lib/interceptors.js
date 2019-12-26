import { HTTP_STATUS } from '@/lib/constant';
import Taro from "@tarojs/taro";

//正确的code
const specialCode = [200, 0];

/**
 * 错误处理
 * @param msg : 错误信息
 * @param code : 错误码
 * @private
 */
function _handelErrorByCode(msg, code) {
  Taro.showToast({
    title: msg,
    icon: 'none',
    duration: 3000
  });
}

function customInterceptor(chain) {
  const requestParams = chain.requestParams;
  return chain.proceed(requestParams).then(res => {
    const { statusCode, data } = res;
    const { code, msg } = data || {};

    // 404
    if (statusCode === HTTP_STATUS.NOT_FOUND) {
      _handelErrorByCode('接口请求404，请检查请求url');
      return Promise.reject(res);
    }

    // 503
    if (statusCode === HTTP_STATUS.SERVICE_UNAVAILABLE) {
      _handelErrorByCode('接口请求503, 后端服务不可访问');
      return Promise.reject(res);
    }

    // 200
    if (statusCode === HTTP_STATUS.SUCCESS) {
      const data = res.data;
      // 不在正确码、特殊码范围内报错
      if ((!specialCode.includes(code))) {
        _handelErrorByCode(msg, data); //根据code做一些去登录页之类的处理
        return Promise.reject(data);
      } else {
        return data;
      }
    }
  })
}

const interceptors = [
  customInterceptor,
  Taro.interceptors.timeoutInterceptor
];

export default interceptors;
