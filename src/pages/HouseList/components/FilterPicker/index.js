/*
 * @Author: your name
 * @Date: 2020-04-30 11:05:05
 * @LastEditTime: 2020-05-03 15:58:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /react_zufang/src/pages/HouseList/components/FilterPicker/index.js
 */
import React from 'react'

import FilterFooter from '../../../../components/FilterFooter'

import { PickerView } from 'antd-mobile'

export default class FilterPicker extends React.Component {
  state = {
    value: this.props.defaultValue
  }

  render() {
    const { onCancel, onSave, data, cols, type } = this.props
    const { value } = this.state

    return (
      <>
        {/* 选择器组件 */}
        <PickerView 
          data={data} 
          value={value} 
          cols={cols}
          onChange={val => {
            let value = val
            this.setState({value})
          }}
        />

        {/* 底部按钮 */}
        <FilterFooter onCancel={() => onCancel(type)} onOk={() => onSave(type, value)}/>
      </>
    )
  }
}
