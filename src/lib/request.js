import Taro from '@tarojs/taro';
import { getAppStoken, stitchUrlParam, parseParamStr } from '@/lib/utils';
import { getfulllUrl } from '@/lib/envUtil';
import interceptors from './interceptors';

interceptors.forEach(i => Taro.addInterceptor(i));

// 添加请求的拦截器
Taro.addInterceptor(Taro.interceptors.timeoutInterceptor);

//默认头部配置
const defaultOpts = {
    method: 'POST',
    headers: {
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
    }
};

/**
 * HTTP请求的封装
 * @param url：请求的url
 * @param options ：请求的配置
 * @returns {Promise}
 */
export function request(url, options) {
  //url根据环境参数配置域名；拼接appStoken参数
  url = stitchUrlParam(getfulllUrl(url), parseParamStr({ app_stoken: getAppStoken() }));
  options = Object.assign({}, defaultOpts, options);
  //添加自定义头
  const header = Object.assign({}, options.headers);
  const requestOptions = {
    url,
    header,
    data: options.body,
    method: (options.method ).toUpperCase(),
  };
  return Taro.request(requestOptions);
}

/**
 *  POST 请求的http接口
 * @param url ： 请求url
 * @param params：请求参数
 * @param type：contentType类型，默认form表单
 * @returns {Promise}
 */
export function requestPost(url, params = {}, type = 'form') {
    const body = type === 'form' ? params : JSON.stringify(params);
    const contentType = type === 'form'
        ? 'application/x-www-form-urlencoded; charset=UTF-8'
        : 'application/json;charset=UTF-8';

    let options = {
        body,
        method: 'POST',
        headers: {
            'Content-Type': contentType
        },
    };
    return request(url, options);
}

/**
 *  POST 请求的http接口 json方式提交
 * @param url ： 请求url
 * @param params：请求参数
 * @returns {Promise}
 */
export function requestPostJson(url, params = {},) {
    return requestPost(url, params, 'json');
}

/**
 *  GET 请求的http接口
 * @param url ： 请求url
 * @param params：请求参数
 * @returns {Promise}
 */
export function requestGet(url, params = {}) {
    url = stitchUrlParam(url, parseParamStr(params));
    const options = { method: 'GET' };
    return request(url, options);
}
