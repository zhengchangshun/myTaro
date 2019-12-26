/*根据环境参数不同，获取不同的配置*/

/**
 * 根据环境不同配置http请求的url域名
 * @param url
 * @returns {string}
 */
export const getfulllUrl = (url) => {
  let BASE_URL = '';
  if (process.env.NODE_ENV === 'development') {
    //开发环境 - 根据请求不同返回不同的BASE_URL
    if (url.includes('/oilChainGasStation/') || url.includes('/oilChainDriver/')) {
      BASE_URL = 'https://yltest.tf56.com';
    } else if (url.includes('/appLogin/')) { //登录
      BASE_URL = 'https://sitetest.tf56.com/passport'
    } else if (url.includes('/logout/')) { //退出
      BASE_URL = 'https://sitetest.tf56.com/passport'
    }
  } else {
    // 生产环境
    if (url.includes('/oilChainGasStation/') || url.includes('/oilChainDriver/')) {
      BASE_URL = 'https://yl.tf56.com';
    } else if (url.includes('/appLogin/')) { //登录
      BASE_URL = 'https://passport.tf56.com/passport'
    } else if (url.includes('/logout/')) { //退出
      BASE_URL = 'https://www.tf56.com/passport'
    }
  }
  return BASE_URL + url
}

/**
 * 根据环境不同配置登录的doggy参数
 * @returns {{}}
 */
export const getLoginDoggy = () => {
  let doggyObj = {};
  if (process.env.NODE_ENV === 'development') {
    doggyObj = {
      imei: '1',
      mac: '1',
      dog_ak: 'm5762le0ucuO72Ew',
      dog_sk: 'D628yD5fYV0jH1S1jboY',
      sourcecode: '3013030003',
    }
  } else {
    doggyObj = {
      imei: '2',
      mac: '2',
      dog_ak: '1gNE31985m0aSs67',
      dog_sk: '3It9esF58rV92G74108x',
      sourcecode: '3013030048',
    };
  }
  return doggyObj
}
