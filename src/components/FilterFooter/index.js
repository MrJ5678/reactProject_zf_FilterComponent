/*
 * @Author: your FilterFooter
 * @Date: 2020-04-30 11:39:45
 * @LastEditTime: 2020-05-01 20:23:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /react_zufang/src/components/FilterFooter/index.js
 */
import React from 'react'

import { Flex } from 'antd-mobile'

import styles from './index.module.css'

import PropTypes from 'prop-types'

function FilterFooter({
  cancelText = '取消',
  okText = '确定',
  onCancel,
  onOk,
  className
}) {
  return (
    <Flex className={[styles.root, className || ''].join(' ')}>
      {/* 取消按钮 */}
      <span
        className={[styles.btn, styles.cancel].join(' ')}
        onClick={onCancel}
      >
        {cancelText}
      </span>

      {/* 确定按钮 */}
      <span 
        className={[styles.btn, styles.ok].join(' ')}
        onClick={onOk}
      >
        {okText}
      </span>
    </Flex>
  )
}

// props校验
FilterFooter.propsTypes = {
  cancelText: PropTypes.string,
  okText: PropTypes.string,
  onCancel: PropTypes.func,
  onOk: PropTypes.func,
  className: PropTypes.string
}

export default FilterFooter