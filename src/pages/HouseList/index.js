/*
 * @Author: your name
 * @Date: 2020-04-20 16:58:38
 * @LastEditTime: 2020-04-30 17:09:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /react_zufang/src/pages/HouseList/index.js
 */
import React from 'react'

import { Flex } from 'antd-mobile'

// 导入搜索导航栏组件
import SearchHeader from '../../components/SearchHeader'
import Filter from './components/Filter'

import styles from './index.module.css'

// 获取当前定位信息
const { label } = JSON.parse(localStorage.getItem('hkzf_city'))

export default class HouseList extends React.Component {
  render() {
    return (
      <div>
        <Flex className={styles.header}>
          {/* 顶部搜索框 */}
          <i className='iconfont icon-back' onClick={() => {this.props.history.go(-1)}}/>
          <SearchHeader 
            cityName={label} 
            className={styles.searchHeader}
          />
        </Flex>
        {/* 条件筛选栏 */}
        <Filter />
      </div>
    )
  }
}