/*
 * @Author: your name
 * @Date: 2020-04-30 11:01:13
 * @LastEditTime: 2020-04-30 11:14:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /react_zufang/src/pages/HouseList/components/Filter/index.js
 */
import React from 'react'

import FilterTitle from '../FilterTitle'
import FilterPicker from '../FilterPicker'
import FilterMore from '../FilterMore'

import styles from './index.module.css'

export default class Filter extends React.Component {
  render() {
    return (
      <div className={styles.root}>
        {/* 前三个菜单的遮罩层 */}
        {/* <div className={styles.mask}></div> */}

        <div className={styles.content}></div>
          {/* 标题栏 */}
          <FilterTitle />

          {/* 前三个菜单对应的内容 */}
          {/* <FilterPicker /> */}

          {/* 最后一个菜单对应的内容 */}
          {/* <FilterMore /> */}
      </div>
    )
  }
}