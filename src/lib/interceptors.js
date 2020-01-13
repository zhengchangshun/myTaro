import { HTTP_STATUS, SPECIAL_ERROR_CODE } from '@/lib/constant';
import Taro from "@tarojs/taro";
import { pageToLogin } from '@/lib/utils';

//正确的code
const specialCode = [200, 0];

/**
 * 错误处理
 * @param msg : 错误信息
 * @param code : 错误码
 * @private
 */
function _handelErrorByCode(msg) {
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
        const { code, msg, result } = data || {}; // "result" 字段兼容会员老接口

        // 404
        if (statusCode === HTTP_STATUS.NOT_FOUND) {
            _handelErrorByCode('接口请求404，请检查请求url');
            return Promise.reject(res);
        }

        // 503
        if (statusCode === HTTP_STATUS.SERVICE_UNAVAILABLE) {
            _handelErrorByCode('接口请求503, 服务不可访问');
            return Promise.reject(res);
        }

        // 200
        if (statusCode === HTTP_STATUS.SUCCESS) {
            // 特殊码处理了
            if ((specialCode.includes(code)) || result === 'success') {
                return data;
            } else {
                _handelErrorByCode(msg, data);
                return Promise.reject(data);
            }
        }
    });
}

const interceptors = [
    customInterceptor,
    Taro.interceptors.timeoutInterceptor
];

export default interceptors;
