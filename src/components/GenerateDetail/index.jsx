import Taro, { Component } from '@tarojs/taro';
import { View, } from '@tarojs/components';
import PropTypes from 'prop-types';
import './index.scss';

export default class GenerateDetail extends Component {
    render() {
        const { config = [], data = {}, } = this.props;
        const detailEles = config.map((item, index) => {
            // unVisible 用于控制特殊情况下不展示，默认都展示
            let { label, valueKey, render, unVisible = false } = item;
            let value = '';

            /* 对外暴露render方法，可自行配置规则*/
            if (render && typeof render === 'function') {
                value = render(data);
            } else {
                value = data[valueKey];
            }

            return (
                !unVisible && (
                    <View className="detail-row" key={String(index)}>
                        <View className="label">{label}</View>
                        <View className="value">{value || ''}</View>
                    </View>
                )
            );
        });

        return (
            <View class="detail-wrap">{detailEles}</View>
        );
    }
}

GenerateDetail.prototype = {
    config: PropTypes.list, //配置  label：文本；valueKey：对应key中的字段，render：可以在自定义内容；unVisible：是否显示-默认显示
    data: PropTypes.object, //数据源
};
