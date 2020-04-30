/*
 * @Author: your name
 * @Date: 2020-04-30 11:05:05
 * @LastEditTime: 2020-04-30 11:35:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /react_zufang/src/pages/HouseList/components/FilterPicker/index.js
 */
import React from 'react'

import FilterFooter from '../../../../components/FilterFooter'

import { PickerView } from 'antd-mobile'

import styles from './index.module.css'

const province = []

export default class FilterPicker extends React.Component {
  render() {
    return (
      <>
        {/* 选择器组件 */}
        <PickerView data={province} value={null} cols={3}/>

        {/* 底部按钮 */}
        <FilterFooter />
      </>
    )
  }
}
