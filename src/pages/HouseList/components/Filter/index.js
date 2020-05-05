/*
 * @Author: your name
 * @Date: 2020-04-30 11:01:13
 * @LastEditTime: 2020-05-03 22:02:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /react_zufang/src/pages/HouseList/components/Filter/index.js
 */
import React from 'react'

import FilterTitle from '../FilterTitle'
import FilterPicker from '../FilterPicker'
import FilterMore from '../FilterMore'

// 导入自定义axios
import { API } from '../../../../utils/api'

import styles from './index.module.css'

const titleSelectedStatus = {
  area: false,
  mode: false,
  price: false,
  more: false
}

const selectedValues = {
  area: ['area', 'null'],
  mode: ['null'],
  price: ['null'],
  more: []
}

export default class Filter extends React.Component {
  state = {
    titleSelectedStatus,
    // 控制FilterPicker或者FilterMore的展示或隐藏
    openType: '',
    // 所有筛选条件数据
    filtersData: [],
    // 筛选条件的选中值
    selectedValues
  }
  
  render() {
    const {titleSelectedStatus, openType} = this.state
    return (
      <div className={styles.root}>
        {/* 前三个菜单的遮罩层 */}
        {
          (openType === 'area' || openType === 'mode' || openType === 'price') 
          ? <div className={styles.mask} onClick={this.onCancel.bind(this, openType)}></div>
          : null
        }

        <div className={styles.content}>
          {/* 标题栏 */}
          <FilterTitle titleSelectedStatus={titleSelectedStatus} onClick={this.onTitleClk.bind(this)}/>

          {/* 前三个菜单对应的内容 */}
          { this.renderFilterPicker() }

          {/* 最后一个菜单对应的内容 */}
          { this.renderFilterMore()}
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.getFiltersData()
  }

  // 点击标题菜单实现高亮
  onTitleClk(type) {
    // console.log(type, this)
    const { titleSelectedStatus, selectedValues} = this.state
    // 创建新的标题选中状态对象
    const newTitleSelectedStatus = {...titleSelectedStatus}

    // 遍历标题选中状态对象
    // ['area', 'mode', 'price', 'more']
    Object.keys(newTitleSelectedStatus).forEach(key => {
      if(key === type) {
        // 当前标题
        newTitleSelectedStatus[type] = true
        return
      }

      // 其它标题
      const selectedVal = selectedValues[key]
      if(key === 'area' && (selectedVal.length !== 2 || selectedVal[0] !== 'area')) {
        // 高亮
        newTitleSelectedStatus[key] = true
      }else if(key === 'mode' && selectedVal[0] !== 'null') {
        // 高亮
        newTitleSelectedStatus[key] = true
      }else if(key === 'price' && selectedVal[0] !== 'null') {
        // 高亮
        newTitleSelectedStatus[key] = true
      }else if(key === 'more' && selectedVal.length !== 0) {
        newTitleSelectedStatus[key] = true
      }else {
        newTitleSelectedStatus[key] = false
      }
    })

    this.setState({
      openType: type,
      titleSelectedStatus: newTitleSelectedStatus
    })
    // console.log(newTitleSelectedStatus)
    // this.setState(prevState => {
    //   return {
    //     titleSelectedStatus: {
    //       // 获取当前对象所有属性值
    //       ...prevState.titleSelectedStatus,
    //       [type]: true
    //     },

    //     // 展示对话框
    //     openType: type
    //   }
    // })
  }

  // 取消对话框
  onCancel(type) {
    // console.log(type)

    const { titleSelectedStatus, selectedValues } = this.state
    // 创建新的标题选中状态对象
    const newTitleSelectedStatus = {...titleSelectedStatus}
    const selectedVal = selectedValues[type]
    if(type === 'area' && (selectedVal.length !== 2 || selectedVal[0] !== 'area')) {
      // 高亮
      newTitleSelectedStatus[type] = true
    }else if(type === 'mode' && selectedVal[0] !== 'null') {
      // 高亮
      newTitleSelectedStatus[type] = true
    }else if(type === 'price' && selectedVal[0] !== 'null') {
      // 高亮
      newTitleSelectedStatus[type] = true
    }else if(type === 'more' && selectedVal.length !== 0) {
      newTitleSelectedStatus[type] = true
    }else {
      newTitleSelectedStatus[type] = false
    }
    // 隐藏对话框
    this.setState({
      openType: '',
      titleSelectedStatus: newTitleSelectedStatus
    })
  }

  // 确定按钮
  onSave(type, value) {
    // console.log(type, value)

    // 菜单高亮处理
    const { titleSelectedStatus } = this.state
    // 创建新的标题选中状态对象
    const newTitleSelectedStatus = {...titleSelectedStatus}
    const selectedVal = value
    if(type === 'area' && (selectedVal.length !== 2 || selectedVal[0] !== 'area')) {
      // 高亮
      newTitleSelectedStatus[type] = true
    }else if(type === 'mode' && selectedVal[0] !== 'null') {
      // 高亮
      newTitleSelectedStatus[type] = true
    }else if(type === 'price' && selectedVal[0] !== 'null') {
      // 高亮
      newTitleSelectedStatus[type] = true
    }else if(type === 'more' && selectedVal.length !== 0) {
      newTitleSelectedStatus[type] = true
    }else {
      newTitleSelectedStatus[type] = false
    }

    const newSelectedValues = {
      ...this.state.selectedValues,
      [type]: value
    }

    // console.log(newSelectedValues)

    // filters对象表示例
    // {
    //   area: "AREA|67fad918-f2f8-59df",
    //   mode: 'true',
    //   price: 'PRICE|2000',
    //   more: "ROOM|d4a692e4-a177-37fd,ORIEN|141b98bf-1ad0-11e3"
    // }

    const { area, mode, price, more } = newSelectedValues
    // 筛选条件数据
    const filters = {}

    // 区域
    const areaKey = area[0]
    let areaValue = 'null'
    if(area.length === 3) {
      areaValue = area[2] !== 'null' ? area[2] : area[1]
    }

    filters[areaKey] = areaValue
    
    // 方式/租金
    filters.mode = mode[0]
    filters.price = price[0]

    // 筛选
    filters.more = more.join(',')

    // console.log(filters)

    this.props.onFilters(filters)

    this.setState({
        openType: '',
        selectedValues: newSelectedValues,
        titleSelectedStatus: newTitleSelectedStatus
    })
  }

  // 获取所有筛选条件数据的方法
  async getFiltersData() {
    const { value } = JSON.parse(localStorage.getItem('hkzf_city'))
    const res = await API.get('/houses/condition', {
      params: {
        id: value
      }
    })
    if(res.data && res.data.status === 200) {
      const { data: { body }} = res
      let filtersData = body
      this.setState({filtersData})
    }
  }

  // 渲染FilterPicker组件
  renderFilterPicker() {
    const { openType, filtersData: { area, subway, rentType, price }, selectedValues } = this.state

    if(openType !== 'area' && openType !== 'mode' && openType !== 'price') {
      return null
    }

    // 根据openType来拿到当前筛选条件的数据
    let data = []
    let cols = 3
    let defaultValue = selectedValues[openType]
    switch (openType) {
      case 'area':
        // 获取区域数据
        data = [area, subway]
        cols = 3
        break;
    
      case 'mode':
        data = rentType
        cols = 1
        break;

      case 'price':
        data = price
        cols = 1
        break;
      default:
        break;
    }
    return (
      <FilterPicker 
        key={openType}
        onCancel={this.onCancel.bind(this)} 
        onSave={this.onSave.bind(this)}
        data={data}
        cols={cols}
        type={openType}
        defaultValue={defaultValue}
      /> 
    )
  }

  // 渲染FilterMore组件
  renderFilterMore() {
    const { openType, selectedValues, filtersData: { roomType, oriented, floor, characteristic } } = this.state
    if(openType !== 'more') {
      return null
    }

    const data = {
      roomType, oriented, floor, characteristic
    }
    const defaultValue = selectedValues.more
    
    return <FilterMore 
            data={data}
            type={openType}
            onSave={this.onSave.bind(this)}
            onCancel={this.onCancel.bind(this)}
            defaultValue={defaultValue}
          /> 
  }
}