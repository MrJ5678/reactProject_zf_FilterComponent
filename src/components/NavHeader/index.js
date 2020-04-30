/*
 * @Author: your name
 * @Date: 2020-04-26 16:31:57
 * @LastEditTime: 2020-04-27 10:50:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /react_zufang/src/components/NavHeader/index.js
 */
import React from 'react'

import { NavBar } from 'antd-mobile'

import { withRouter } from 'react-router-dom'

import PropTypes from 'prop-types'

// import './index.scss'
import styles from './index.module.css'

function NavHeader({ children, history, onCustomClk }) {
  const defaultHandler = () => {history.go(-1)}
  return (
    <NavBar
      className={styles.navBar}
      mode="light"
      icon={<i className='iconfont icon-back'/>}
      onLeftClick={onCustomClk || defaultHandler}
    >
      {children}
    </NavBar>
  )
}

NavHeader.propTypes = {
  children: PropTypes.string.isRequired,
  onCustomClk: PropTypes.func
}

export default withRouter(NavHeader)