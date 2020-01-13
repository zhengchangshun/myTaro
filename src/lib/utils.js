import Taro from "@tarojs/taro";

/**
 * @description 获取当前页url
 */
export const getCurrentPageUrl = () => {
    let pages = Taro.getCurrentPages();
    let currentPage = pages[pages.length - 1];
    let url = currentPage.route;
    return url;
};

/**
 * @description 跳转到登录页
 */
export const pageToLogin = () => {
    let path = getCurrentPageUrl();
    if (!path.includes('login')) {
        Taro.navigateTo({
            url: "/pages/login/index"
        });
    }
};

/**
 * @description 取会员登录APP_stoken
 */
export function getAppStoken() {
    const value = Taro.getStorageSync('app_stoken');
    return value;
}

/**
 * 设置会员登录APP_stoken
 */
export function setAppStoken(value) {
  Taro.setStorageSync('app_stoken', value);
}

/**
 * 格式化金额
 * @param val{number}
 * @returns {string}
 */
export function formater(number) {
    if (!!number && !isNaN(number)) {
        return `${number.toFixed(2)}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
}


/**
 * url上拼接参数
 * @param url
 * @param param {object}
 * @returns {*}
 * @private
 */
export function stitchUrlParam(url, param) {
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
export function parseParamStr(obj) {
    let result = '';
    let temp = [];
    for (let key in obj) {
        temp.push(`${key}=${obj[key]}`);
    }
    result = temp.join('&');
    return result;
}

/**
 * 需要跳转到具体的url。需要验证登录状态
 * @param url: 需要跳转的url
 * @param params: 跳转的参数
 */
export function goUrlNeedAuth(url, params) {
    const stitchedUrl = stitchUrlParam(url, parseParamStr(params));
    if (getAppStoken()) {
        Taro.navigateTo({ url: stitchedUrl });
    } else {
        pageToLogin();
    }
}
