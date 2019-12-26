import Taro from "@tarojs/taro";

/**
 * @description 获取当前页url
 */
export const getCurrentPageUrl = () => {
  let pages = Taro.getCurrentPages()
  let currentPage = pages[pages.length - 1]
  let url = currentPage.route
  return url
}

/**
 * @description 跳转到登录页
 */
export const pageToLogin = () => {
  let path = getCurrentPageUrl()
  if (!path.includes('login')) {
    Taro.navigateTo({
      url: "/pages/login/login"
    });
  }
}

/**
 * @description 取会员登录APP_stoken
 */
export function getAppStoken() {
  const value = Taro.getStorageSync('app_stoken')
  return value || ''
}
