/*
 * @Author: your name
 * @Date: 2020-04-20 09:47:45
 * @LastEditTime: 2020-04-30 10:11:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /react_zufang/src/pages/Home/index.js
 */
import React from 'react'

import {Route} from 'react-router-dom'

// 导入css
import './index.css'

import Index from '../Index'
import HouseList from '../HouseList'
import News from '../News'
import Profile from '../Profile'

// 导入tabbar
import { TabBar } from 'antd-mobile';


const tabItems = [
  {
    title: '首页',
    icon: 'icon-ind',
    path: '/home'
  },
  {
    title: '找房',
    icon: 'icon-findHouse',
    path: '/home/list'
  },
  {
    title: '资讯',
    icon: 'icon-infom',
    path: '/home/news'
  },
  {
    title: '我的',
    icon: 'icon-my',
    path: '/home/profile'
  }
]

export default class Home extends React.Component {
  state = {
    selectedTab: this.props.location.pathname
  }

  render() {
    return (
      <div className='home'>
        {/* 渲染子路由内容 */}
        <Route exact path='/home' component={Index}></Route> 
        <Route path='/home/list' component={HouseList}></Route> 
        <Route path='/home/news' component={News}></Route> 
        <Route path='/home/profile' component={Profile}></Route> 
        {/* TabBar */}
        <TabBar
          tintColor="#21b97a"
          barTintColor="white"
          noRenderContent={true}
        >
          {this.renderTabBarItem()}
        </TabBar>
      </div>
    )
  }

  componentDidUpdate(prevProps) {
    if(prevProps.location.pathname !== this.props.location.pathname) {
      this.setState({
        selectedTab: this.props.location.pathname
      })
    }
  }

  renderTabBarItem() {
    return (
      tabItems.map( v => (
        <TabBar.Item
        title={v.title}
        key={v.icon}
        icon={<i className={`iconfont ${v.icon}`}/>}
        selectedIcon={<i className={`iconfont ${v.icon}`}/>
        }
        selected={this.state.selectedTab === v.path}
        badge={0}
        onPress={() => {
          this.setState({
            selectedTab: v.path,
          });

          this.props.history.push(v.path)
        }}
      />
      ))
    )
  }
}