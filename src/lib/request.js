import Taro from '@tarojs/taro';
import { getAppStoken } from '@/lib/utils';
import { getfulllUrl } from '@/lib/envUtil';
import interceptors from './interceptors';

interceptors.forEach(i => Taro.addInterceptor(i))

// 添加请求的拦截器
Taro.addInterceptor(Taro.interceptors.timeoutInterceptor);

//默认头部配置
const defaultOpts = {
  method: 'POST',
  headers: {
    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
  }
};

/**
 * url上拼接参数
 * @param url
 * @param param {object}
 * @returns {*}
 * @private
 */
function _stitchUrlParam(url, param) {
  let mark = url.indexOf('?') === -1 ? '?' : '&';
  if (!param) return url;
  return url + mark + param;
}

/**
 * 将对象系列化字符串
 * @param obj{object}
 * @returns {string}
 * @private
 */
function _parseParamStr(obj) {
  let result = '';
  let temp = [];
  for (let key in obj) {
    temp.push(`${key}=${obj[key]}`);
  }
  result = temp.join('&');
  return result;
}

/**
 * HTTP请求的封装
 * @param url：请求的url
 * @param options ：请求的配置
 * @returns {Promise}
 */
export function request(url, options) {
  //url根据环境参数配置域名；拼接appStoken参数
  url = _stitchUrlParam(getfulllUrl(url), _parseParamStr({ app_stoken: getAppStoken() }));
  options = Object.assign({}, defaultOpts, options);

  const requestOptions = {
    url: url,
    header: options.headers,
    data: options.body,
    method: (options.method || 'POST').toUpperCase(),
  }
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
  url = _stitchUrlParam(url, _parseParamStr(params));
  const options = { method: 'GET' }
  return request(url, options);
}
