/*
 * @Author: your name
 * @Date: 2020-04-20 09:48:18
 * @LastEditTime: 2020-04-27 11:00:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /react_zufang/src/pages/CityList/index.js
 */
import React from 'react'

// 导入react-virtualized组件
import { AutoSizer, List } from 'react-virtualized';

import { Toast } from 'antd-mobile'

import NavHeader from '../../components/NavHeader'

import axios from 'axios'

import './index.scss'

import { getCurrentCity } from '../../utils'

// 格式化拿到的body数据
  // 格式化前:
  // [{label: 'xx', pinyin: 'xxx', short: 'xxx', value: 'xxx'}, {...}, {...}]
  // 格式化后:
  // {a: [{...}], b: [{...},{...}]}
  // 格式化后的数组的索引数组
  // ['a', 'b']

  // 格式化数据的方法
  // list: [{...}, {...}] 
  // 返回对象

const formatData = (list) => {
  const cityList = {}
 
  // 遍历body数组的每一项
  list.forEach(ele => {
    // 获取每一个城市的首字母
    const firstLet = ele.short.substr(0, 1)
    
    // 判断citylist中是否有该分类
    // console.log(firstLet);
    
    if(cityList[firstLet]) {
      // console.log(cityList[firstLet]);
      cityList[firstLet].push(ele)
    }else {
      cityList[firstLet] = [ele]
    }
  });

  const cityIdx = Object.keys(cityList).sort()

  return {
    cityList,
    cityIdx
  }
}

// 列表数据的数据源
// const list = Array(100).fill('react-virtualized')

// 渲染每一行数据的渲染函数
// 函数返回值为最终的列表内容

// 索引的高度
const TITLE_HEIGHT = 36
// 每个城市名称的高度
const NAME_HEIGHT = 50

// 封装处理城市字母索引函数
const formatCityIdx = (letter) => {
  switch (letter) {
    case '#':
      return '当前定位'
    case 'hot':
      return '热门城市'
    default:
      return letter.toUpperCase()
  }
}

// 有房源的城市
const HOUSE_CITY = ['北京', '上海', '广州', '深圳']

export default class CityList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cityList: {},
      cityIdx: [],
      // 指定右侧索引列表高亮的索引号
      activeIdx: 0
    }

    // 创建ref对象
    this.cityListComponent = React.createRef()
  }

  render() {
    return (
      <div className='cityList'>
        {/* 标题栏 */}
        <NavHeader>城市选择</NavHeader>

        {/* 城市列表 */}
        <AutoSizer>
          {
            ({height, width}) => (
              <List
                ref={this.cityListComponent}
                height={height}
                rowCount={this.state.cityIdx.length}
                rowHeight={this.getRowHeight.bind(this)}
                rowRenderer={this.rowRenderer.bind(this)}
                onRowsRendered={this.onRowsRendered.bind(this)}
                scrollToAlignment='start'
                width={width}
              />
            )
          }
        </AutoSizer>

        {/* 右侧索引列表 */}
        <ul className='city-index'>
          {this.renderCityIdx()}
        </ul>
      </div>
    )
  }

  async componentDidMount() {
    await this.getCityList()
    // 实现每个索引点击时的精确跳转
    // 调用方法需要保证list组件中已经有数据, 如果没有数据, 会导致调用报错
    this.cityListComponent.current.measureAllRows()
  }

  async getCityList() {
    let res = await axios.get('http://localhost:8080/area/city?level=1')
    // console.log(res);
    
    if(res.data && res.data.status === 200) {
      let { data: { body } } = res
      const { cityList, cityIdx } = formatData(body)
      // console.log(cityList, cityIdx);
     
      /* 
        获取热门城市数据
        将数据添加到cityList中
        将索引添加到cityIdx中
      */
     const hotRes = await axios.get('http://localhost:8080/area/hot')
     if(hotRes.data && hotRes.data.status === 200) {
      // console.log(hotRes);
      let {data: {body}} = hotRes
      cityList['hot'] = body
      cityIdx.unshift('hot')

      // 获取当前定位城市
      const curCity =  await getCurrentCity()
      cityList['#'] = [curCity]
      // console.log(cityList);
      
      cityIdx.unshift('#')
      // console.log(cityList, cityIdx, curCity);
      this.setState({cityList, cityIdx})
     }
    }
  }

  rowRenderer({
    key, // Unique key within array of rows
    index, // 索引
    isScrolling, // 当前项是否正在滚动中
    isVisible, // 当前项在列表中是否可见
    style, // Style object to be applied to row (to position it)
  }) {
    // 获取每一行索引
    const letter = this.state.cityIdx[index]
    // console.log(letter);
    
    // 获取指定字母索引下的城市列表数据
    // console.log(this.state.cityList[letter]);
    return (
      <div className='city' key={key} style={style}>
        <div className='title'>{formatCityIdx(letter)}</div>
        {/* <div className='name'>上海</div> */}
        {
          this.state.cityList[letter].map(el => (
            <div className='name' key={el.value} onClick={this.changeCity.bind(this, el)}>{el.label}</div>
          ))
        }
      </div>
    );
  }

  // 创建动态计算每一行高度的方法
  getRowHeight({index}) {
    // 索引标题高度 + 城市数量 * 城市名称高度 
    const { cityList, cityIdx } = this.state
    return TITLE_HEIGHT + cityList[cityIdx[index]].length * NAME_HEIGHT
  }
  
  // 渲染右侧索引列表的方法
  renderCityIdx() {
    // console.log(this);
    const { cityIdx, activeIdx } = this.state
    return cityIdx.map((el, index) => (
      <li className='city-index-item' key={el} onClick={() => {
        this.cityListComponent.current.scrollToRow(index)
      }}>
        <span className={activeIdx === index ? 'index-active' : ''}>{el === 'hot' ? '热' : el.toUpperCase()}</span>
      </li>
    ))
  }

  // 用于获取list组件中的行信息
  onRowsRendered({startIndex}) {
    // console.log(startIndex);
    if(startIndex !== this.state.activeIdx) {
      let activeIdx = startIndex
      this.setState({activeIdx})
    }
  }

  // 点击切换城市
  changeCity({label, value}) {
    // console.log(curCity);
    if(HOUSE_CITY.indexOf(label) > -1) {
      // 有当前点击城市房源, 保存
      localStorage.setItem('hkzf_city', JSON.stringify({label, value}))
      this.props.history.go(-1)
    }else {
      Toast.info('该城市暂无房源信息', 2, null, false)
    }
  }
}