/*
 * @Author: your name
 * @Date: 2020-04-30 11:05:18
 * @LastEditTime: 2020-04-30 11:44:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /react_zufang/src/pages/HouseList/components/FilterTitle/index.js
 */
import React from 'react'

import { Flex } from 'antd-mobile'

import styles from './index.module.css'

// 条件筛选栏标题
const titleList = [
  { title: '区域', type: 'area' },
  { title: '方式', type: 'mode' },
  { title: '租金', type: 'price' },
  { title: '筛选', type: 'more' },
]

export default class FilterTitle extends React.Component {
  render() {
    return (
      <Flex align='center' className={styles.root}>
        <Flex.Item>
          {/* 选中类名 */}
          <span className={[styles.dropdown, styles.selected].join(' ')}>
            <span>区域</span>
            <i className='iconfont icon-arrow'/>
          </span>
        </Flex.Item>
      </Flex>
    )
  }
}