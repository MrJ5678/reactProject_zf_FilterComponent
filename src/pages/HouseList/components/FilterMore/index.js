/*
 * @Author: your name
 * @Date: 2020-04-30 11:04:50
 * @LastEditTime: 2020-05-03 16:01:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /react_zufang/src/pages/HouseList/components/FilterMore/index.js
 */
import React from 'react'

import FilterFooter from '../../../../components/FilterFooter'

import styles from './index.module.css'

export default class FilterMore extends React.Component {
  state = {
    selectedValues: this.props.defaultValue
  }

  render() {
    const { data: { roomType, oriented, floor, characteristic }, onCancel, type } = this.props
    return(
      <div className={styles.root}>
        {/* 遮罩层 */}
        <div className={styles.mask} onClick={() => onCancel(type)}></div>

        {/* 条件内容 */}
        <div className={styles.tags}>
          <dl className={styles.dl}>
            <dt className={styles.dt}>户型</dt>
            <dd className={styles.dd}>{this.renderFilters(roomType)}</dd>

            <dt className={styles.dt}>朝向</dt>
            <dd className={styles.dd}>{this.renderFilters(oriented)}</dd>

            <dt className={styles.dt}>楼层</dt>
            <dd className={styles.dd}>{this.renderFilters(floor)}</dd>

            <dt className={styles.dt}>房屋亮点</dt>
            <dd className={styles.dd}>{this.renderFilters(characteristic)}</dd>
          </dl>
        </div>

        {/* 底部按钮 */}
        <FilterFooter className={styles.footer} cancelText='清除' onCancel={this.onCancel.bind(this)} onOk={this.onOk.bind(this)}/>
      </div>
    )
  }

  // 渲染标签
  renderFilters(data) {
    const { selectedValues } = this.state
    // 高亮类名: styles.tagActive
    return data.map(el => {
      const isSelected = selectedValues.indexOf(el.value) > -1

      return (
        <span key={el.value} className={[styles.tag, isSelected ? styles.tagActive : ''].join(' ')} onClick={() => this.onTagClick(el.value)}>
          {el.label}
        </span>
      )
    })
  }

  onTagClick(value) {
    // console.log(value)
    const { selectedValues } = this.state
    const newSelectedValues = [...selectedValues]

    if(newSelectedValues.indexOf(value) <= -1) {
      // 没有当前项的值
      newSelectedValues.push(value)
    }else {
      // 有
      const index = newSelectedValues.findIndex(el => el === value)
      newSelectedValues.splice(index, 1)
    }

    this.setState({
      selectedValues: newSelectedValues
    })
  }

  // 清除按钮事件
  onCancel() {
    this.setState({
      selectedValues: []
    })
  }

  // 确定按钮事件
  onOk() {
    const { type, onSave } = this.props

    onSave(type, this.state.selectedValues)
  }
}
