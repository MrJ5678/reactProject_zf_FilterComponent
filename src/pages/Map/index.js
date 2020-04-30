/*
 * @Author: your name
 * @Date: 2020-04-23 16:09:58
 * @LastEditTime: 2020-04-29 16:41:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /react_zufang/src/pages/Map/index.js
 */
import React from 'react'

// import axios from 'axios'
import { API } from '../../utils/api'

import { Link } from 'react-router-dom'

import { Toast } from 'antd-mobile'

// 导入BASE_URL
import { BASE_URL } from '../../utils/url'

// 导入封装好的NavHeader组件
import NavHeader from '../../components/NavHeader'

// import './index.scss'
import styles from './index.module.css'

// 解决脚手架中全局变量的问题
const BMap = window.BMap

// 覆盖物样式
const labelStyle = {
  cursor: 'pointer',
  border: '1px solid rgb(255, 0, 0)',
  padding: '0px',
  whiteSpace: 'nowrap',
  fontSize: '12px',
  color: 'rgb(255, 255, 255)',
  textAligh: 'center'
}

export default class Map extends React.Component {
  state = {
    // 小区房源列表
    housesList: [],
    // 不展示房源列表
    isShowList: false
  }
  render() {
    // console.log(styles.houseList, styles.show)
    return (
      <div className={styles.map}>

        {/* 顶部标题栏 */}
        <NavHeader>
          地图找房
        </NavHeader>

        {/* 地图容器元素 */}
        <div id='container' className={styles.container}></div>

        {/* 房源列表 */}
        {/* 添加styles.show 展示房屋列表 */}
        <div className={[styles.houseList, this.state.isShowList ? styles.show : ''].join(' ')}>
          <div className={styles.titleWrap}>
            <h1 className={styles.listTitle}>房屋列表</h1>
            <Link className={styles.titleMore} to='/home/list'>更多房源</Link>
          </div>

          <div className={styles.houseItems}>
            {/* 房屋结构 */}
            {this.renderHousesList()}
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.initMap()
  }

  // 初始化地图
  initMap() {
    const {label, value} = JSON.parse(localStorage.getItem('hkzf_city'))
    // console.log(label, value);
    
    const map = new BMap.Map("container");
    // const point = new window.BMap.Point(116.404, 39.915);
    this.map = map
    // 创建地址解析器实例     
    const myGeo = new BMap.Geocoder();      
    // 将地址解析结果显示在地图上，并调整地图视野    
    myGeo.getPoint(
      label, 
      async(point) => { 
        if (point) {      
            // 初始化地图
            map.centerAndZoom(point, 11); 
            
            // 添加常用控件
            map.addControl(new BMap.NavigationControl());
            map.addControl(new BMap.ScaleControl());   
            
            this.renderOverlays(value)

            // const res = await axios.get('http://localhost:8080/area/map', {
            //   params: {
            //     id: value
            //   }
            // })
            // if(res.data && res.data.status === 200) {
            //   // console.log(res);
            //   const { data: { body } } = res
            //   body.forEach(ele => {
            //     // 为body的每一条数据创建覆盖物
            //     // 创建文本覆盖物
            //     const { coord:{ longitude, latitude }, label: areaName, count, value } = ele

            //     const areaPoint = new BMap.Point(longitude, latitude)

            //     const opts = {
            //       position: areaPoint,
            //       offset: new BMap.Size(-35, -35)
            //     }
            //     const label = new BMap.Label('', opts)
    
            //     // 给label对象设置唯一标识
            //     label.id = value

            //     // 设置样式
            //     label.setStyle(labelStyle);
                
            //     label.setContent(`
            //       <div class='${styles.bubble}'>
            //         <p class='${styles.name}'>${areaName}</p>
            //         <p>${count}套</p>
            //       </div>
            //     `)
                
            //     // 添加单击事件
            //     label.addEventListener('click', () => {
            //       // console.log('单击覆盖物', label.id);
            //       // 放大地图, 以当前点击的覆盖物为中心
            //       map.centerAndZoom(areaPoint, 13)
            //       // 清除当前覆盖物信息, js文件报错
            //       setTimeout(() => {
            //         map.clearOverlays()
            //       }, 0);
            //     })
                
            //     map.addOverlay(label);   
            //   });              
            // }
        }      
      }, 
    label);

    // 给地图绑定移动事件
    map.addEventListener('movestart', () => {
      if(this.state.isShowList) {
        this.setState({
          isShowList: false
        })
      }
    })
  }

  // 渲染覆盖物入口
  // 接受区域id参数, 获取该区域下的房源数据
  // 获取房源类型, 以及下级地图缩放级别
  async renderOverlays(id) {
    try {
        // 开启loading
      Toast.loading('数据加载中...', 0, null, false)

      const res = await API.get(`/area/map?id=${id}`)

      // 关闭loading
      Toast.hide()
      if(res.data && res.data.status === 200) {
        // console.log('renderOverlays:', res);
        const {data: {body}} = res

        // 调用getTypeAndZoom方法
        const { nextZoom, type } = this.getTypeAndZoom()

        body.forEach(ele => {
          // 创建覆盖物
          this.createOverlays(ele, type, nextZoom)
        });
      } 
    }catch(e) {
      Toast.hide()
    }
  }

  // 计算要绘制的覆盖物类型和下一个缩放级别
  // 区 => 11
  // 镇 => 13
  // 小区 => 15
  getTypeAndZoom() {
    // 调用地图的getZoom方法
    let zoom = this.map.getZoom()
    // console.log('当前地图缩放级别:', zoom);
    
    let type, nextZoom
    if(zoom > 10 && zoom < 12) {
      // 当前为区级别, 点击后显示镇级别
      type = 'circle'
      nextZoom = 13
    }else if(zoom >= 12 && zoom < 14) {
      // 当前为镇级别, 点击后显示小区级别
      type = 'circle'
      nextZoom = 15
    }else if(zoom >= 14 && zoom < 16) {
      // 当前为小区级别
      type = 'rect'
    }

    return {
      nextZoom,
      type
    }
  }

  // 创建覆盖物
  createOverlays(data, type, zoom) {
    const {
      coord:{ longitude, latitude }, label: areaName, count, value
    } = data
    const areaPoint = new BMap.Point(longitude, latitude)
    if(type === 'rect') {
      // 小区
      this.createRect(areaPoint, areaName, count, value)
    }else {
      // 区或镇
      this.createCircle(areaPoint, areaName, count, value, zoom)
    }
  }

  // 创建区/镇覆盖物
  createCircle(point, name, count, id, zoom) {
        const opts = {
          position: point,
          offset: new BMap.Size(-35, -35)
        }
        const label = new BMap.Label('', opts)

        // 给label对象设置唯一标识
        label.id = id

        // 设置样式
        label.setStyle(labelStyle);
        
        label.setContent(`
          <div class='${styles.bubble}'>
            <p class='${styles.name}'>${name}</p>
            <p>${count}套</p>
          </div>
        `)
        
        // 添加单击事件
        label.addEventListener('click', () => {
          // 调用renderOverlays方法(异步), 所以先清除本级覆盖物标识, 再渲染下一级标识
          this.renderOverlays(label.id)
          // console.log('单击覆盖物', label.id);
          // 放大地图, 以当前点击的覆盖物为中心
          this.map.centerAndZoom(point, zoom)
          // 清除当前覆盖物信息, js文件报错
          setTimeout(() => {
            this.map.clearOverlays()
          }, 0);
        })
        this.map.addOverlay(label); 
  }

  // 创建小区覆盖物
  createRect(point, name, count, id) {
    // 创建覆盖物
    const opts = {
      position: point,
      offset: new BMap.Size(-50, -28)
    }
    const label = new BMap.Label('', opts)

    // 给label对象设置唯一标识
    label.id = id

    label.setContent(`
      <div class='${styles.rect}'>
        <span class='${styles.housename}'>${name}</span>
        <span class='${styles.housenum}'>${count}套</span>
        <i class='${styles.arrow}'></i>
      </div>
    `)

    // 添加单击事件
    label.addEventListener('click', (e) => {
      this.getHousesList(label.id)

      // 将点击元素移动到屏幕中心
      // 获取当前被点击项
      const target = e.changedTouches[0]
      // console.log(target);
      this.map.panBy(window.innerWidth / 2 - target.clientX, 
        (window.innerHeight - 330) / 2 - target.clientY)
    })

    this.map.addOverlay(label); 
  }

  // 获取小区房源数据
  async getHousesList(id) {
    try {
      // 开启loading
      Toast.loading('数据加载中...', 0, null, false)
      const res = await API.get(`/houses`, {
        params: {
          cityId: id
        }
      })
      // 关闭toast
      Toast.hide()
      if(res.data && res.data.status === 200) {
        // console.log('小区房源数据:', res)
        let housesList = res.data.body.list
        let isShowList = true
        this.setState({housesList, isShowList})
      }
    } catch (error) {
      Toast.hide()
    }
  }

  // 渲染房屋列表
  renderHousesList() {
    // console.log(styles)
    return this.state.housesList.map(el => (
      <div className={styles.house} key={el.houseCode}>
        <div className={styles.imgWrap}>
          <img 
            className={styles.img}
            src={`${BASE_URL}${el.houseImg}`}
            alt=''
          />
        </div>
        <div className={styles.content}>
          <h3 className={styles.title}>{el.title}</h3>
          <div className={styles.desc}>{el.desc}</div>
          <div>
            {el.tags.map((tag, idx) => {
              const tagClass = `tag${idx+1}`
              return (
                // 注意是styles[tagClass]的写法
                <span className={[styles.tag, styles[tagClass]].join(' ')} key={tag}>{tag}</span>
              )
            })}
          </div>
          <div className={styles.price}>
            <span className={styles.priceNum}>{el.price}</span>元/月
          </div>
        </div>
      </div>
    ))
  }
}