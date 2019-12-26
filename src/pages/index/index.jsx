import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import { getList } from '@/services/global'
import './index.scss'

export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: []
    }
  }

  config = {
    navigationBarTitleText: '首页'
  }


  componentDidMount() {
    // 测试
    getList({
      city: '杭州市',
      cityCode: '330100',
      latitude: 30.27415,
      longitude: 120.15515,
      oilLabelType: '0#柴油',
      pageNum: 1,
      pageSize: 10,
      needOneClick: true
    }).then(data => {
      this.setState({
        list: data.data || []
      })
    }).catch(()=>{

    })
  }


  render() {
    return (
      <View className='index'>
        {this.state.list.map(item=>{
          return  (
              <View key={item.address}>
                <Text> {item.address}</Text>
              </View>
            )
        })}
        <View className='index'>
          <AtButton type='primary'>按钮文案</AtButton>
        </View>
      </View>
    )
  }
}
