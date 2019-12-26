import { requestPost } from '@/lib/request'

export  function getList(params) {
  return requestPost('/oilChainDriver/lbs/gasStation',params)
}
