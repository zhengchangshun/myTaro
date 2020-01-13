import Taro, { Component } from '@tarojs/taro';
import PropTypes from 'prop-types';
import { View, Picker, Text } from '@tarojs/components';
import { AtIcon } from 'taro-ui';
import './index.scss';

export default class PickerSelector extends Component {

    state = {
        content: '', // 选中的label
        index: 0,
    }

    onChange = e => {
        const index = e.detail.value;
        const currentData = this.props.range[index];
        const content = currentData[this.props.rangeKey];
        this.setState({
            content
        });
        this.props.onChange(currentData);
    }

    reset() {
        this.setState({
            content: '',
            index: 0,
        });
    }

    render() {
        const { range, label, rangeKey, placeholder } = this.props;
        const { content, index } = this.state;
        return (
            <View className="picker-wrap">
                <View className="picker-title">{label}</View>
                <Picker mode="selector" range={range} className="picker" rangeKey={rangeKey} onChange={this.onChange} value={index}>
                    <View className="picker-box">
                        {
                            content ?
                                <Text className="picker-content">{content}</Text>
                                :
                                <Text className="picker-placeholder">{placeholder}</Text>
                        }
                        <AtIcon value="chevron-right" size="18" color="#9BA0AA"></AtIcon>
                    </View>
                </Picker>
            </View>
        );
    }
}

PickerSelector.propTypes = {
    range: PropTypes.array, // 数据
    label: PropTypes.string, // 标题
    key: PropTypes.string, // 指定 Object 中 key 的值作为选择器显示内容
    placeholder: PropTypes.string,
};

PickerSelector.defaultProps = {
    placeholder: '点击选择'
};
