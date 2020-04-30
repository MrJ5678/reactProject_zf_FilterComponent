/*
 * @Author: your name
 * @Date: 2020-04-11 21:43:44
 * @LastEditTime: 2020-04-23 16:11:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /react_zufang/src/App.js
 */
import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

// 导入首页和城市列表两个组件
import Home from './pages/Home'
import CityList from './pages/CityList'
import Map from './pages/Map'

function App() {
  return (
    <Router>
      <div className="App">
        {/* 配置路由 */}
        {/* 默认路由 */}
        <Route exact path='/' render={ () => <Redirect to='/home' /> }></Route>
        <Route path='/home' component={Home}></Route>
        <Route path='/citylist' component={CityList}></Route>
        <Route path='/map' component={Map}></Route>
      </div>
    </Router>
  );
}

export default App;
