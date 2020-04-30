/*
 * @Author: your name
 * @Date: 2020-04-11 21:43:44
 * @LastEditTime: 2020-04-29 16:15:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /react_zufang/src/index.js
 */
import React from 'react';
import ReactDOM from 'react-dom';

// 导入antd-mobile的样式
import 'antd-mobile/dist/antd-mobile.css'

// 导入字体图表库的样式
import './assets/fonts/iconfont.css'

// 导入react-virtualized样式文件
import 'react-virtualized/styles.css'

import './index.scss';

// 将组件导入放在antd样式导入的后面, 使自己的样式不被其覆盖
import App from './App';

ReactDOM.render(
    <App />,
  document.getElementById('root')
);