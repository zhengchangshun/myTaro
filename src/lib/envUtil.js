/*根据环境参数不同，获取不同的配置*/

/**
 * 根据环境不同配置http请求的url域名
 * @param url ：请求的相对路径
 * @returns {string} ：请求的绝对路径
 */
export const getfulllUrl = (url) => {
  let BASE_URL = '';
  if (process.env.NODE_ENV === 'development') {
    //开发环境 - 根据请求不同返回不同的BASE_URL
      if (url.includes('/oilChainGasStation/')) {
      BASE_URL = 'https://yltest.tf56.com';
    } else if (url.includes('/passport')) { //登录 退出
      BASE_URL = 'https://sitetest.tf56.com';
    }
  } else {
    // 生产环境
      if (url.includes('/oilChainGasStation/')) {
      BASE_URL = 'https://yl.tf56.com';
    } else if (url.includes('/passport')) { //登录 退出
      BASE_URL = 'https://www.tf56.com';
    }
  }
  return BASE_URL + url;
};
