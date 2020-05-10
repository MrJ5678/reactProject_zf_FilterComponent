/*
 * @Author: your name
 * @Date: 2020-04-20 16:58:38
 * @LastEditTime: 2020-05-10 16:00:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /react_zufang/src/pages/HouseList/index.js
 */
import React from 'react'

import { Flex } from 'antd-mobile'

import { API } from '../../utils/api'

// 导入搜索导航栏组件
import SearchHeader from '../../components/SearchHeader'
import Filter from './components/Filter'

import styles from './index.module.css'

// 获取当前定位信息
const { label, value } = JSON.parse(localStorage.getItem('hkzf_city'))

export default class HouseList extends React.Component {
  filters = {}

  state = {
    // 列表数据
    list: [],
    // 总条数
    count: 0
  }

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
        <Filter onFilters={this.onFilters.bind(this)}/>
      </div>
    )
  }

  componentDidMount() {
    this.searchHouseList()
  }

  onFilters(filters) {
    this.filters = filters
    // console.log(this.filters)
    this.searchHouseList()
  }

  async searchHouseList() {
    const { value } = JSON.parse(localStorage.getItem('hkzf_city'))
    const res = await API.get('/houses', {
      params: {
        cityId: value,
        ...this.filters,
        start: 1,
        end: 20
      }
    })
    console.log(res)
    const { data: { body: { list, count }}} = res
    this.setState({
      list,
      count
    })
  }
}