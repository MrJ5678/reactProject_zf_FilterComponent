/*
 * @Author: your name
 * @Date: 2020-04-30 11:04:50
 * @LastEditTime: 2020-04-30 11:30:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /react_zufang/src/pages/HouseList/components/FilterMore/index.js
 */
import React from 'react'

import FilterFooter from '../../../../components/FilterFooter'

import styles from './index.module.css'

export default class FilterMore extends React.Component {
  render() {
    return(
      <div className={styles.root}>
        {/* 遮罩层 */}
        <div className={styles.mask}></div>

        {/* 条件内容 */}
        <div className={styles.tags}>
          <dl className={styles.dl}>
            <dt className={styles.dt}>户型</dt>
            <dd className={styles.dd}>{this.renderFilters()}</dd>

            <dt className={styles.dt}>朝向</dt>
            <dd className={styles.dd}>{this.renderFilters()}</dd>

            <dt className={styles.dt}>楼层</dt>
            <dd className={styles.dd}>{this.renderFilters()}</dd>

            <dt className={styles.dt}>房屋亮点</dt>
            <dd className={styles.dd}>{this.renderFilters()}</dd>
          </dl>
        </div>

        {/* 底部按钮 */}
        <FilterFooter className={styles.footer} />
      </div>
    )
  }

  // 渲染标签
  renderFilters() {
    // 高亮类名: styles.tagActive
    return (
      <span className={[styles.tag, styles.tagActive].join(' ')}>东北</span>
    )
  }
}
