/*
 * @Author: your name
 * @Date: 2020-04-20 16:54:33
 * @LastEditTime: 2020-04-30 10:43:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /react_zufang/src/pages/Index/index.js
 */
import React from 'react'

import { Carousel, Flex, Grid, WingBlank } from 'antd-mobile';

import SearchHeader from '../../components/SearchHeader'

import axios from 'axios'

// 导入BASE_URL
import { BASE_URL } from '../../utils/url'

// 导入导航菜单图片
import Nav1 from '../../assets/images/nav-1.png'
import Nav2 from '../../assets/images/nav-2.png'
import Nav3 from '../../assets/images/nav-3.png'
import Nav4 from '../../assets/images/nav-4.png'

import './index.scss'

import { getCurrentCity } from '../../utils'
// 导航菜单数据
const navs = [
  {
    id: 1,
    img: Nav1,
    title: '整租',
    path: '/home/list'
  },
  {
    id: 2,
    img: Nav2,
    title: '合租',
    path: '/home/list'
  },
  {
    id: 3,
    img: Nav3,
    title: '地图找房',
    path: '/map'
  },
  {
    id: 4,
    img: Nav4,
    title: '去出租',
    path: '/home/list'
  },
]

// 获取地理位置信息
navigator.geolocation.getCurrentPosition(position => {
  console.log('当前位置信息:', position);
})

// 在state中添加一个表示轮播图数据加载完成的数据
// 在轮播图数据加载完成时修改这个值 取返 表示可以渲染轮播图

export default class Index extends React.Component {
  state = {
    // 图片名称
    swiper: [],
    isSwiperLoaded: false,
    groups: [],
    news: [],
    curCityName: '上海'
  }

  render() {
    return (
      <div className='index'>
        {/* 轮播图 */}
        <div className='swiper'>
          {
            (() => {
              if(this.state.isSwiperLoaded) {
                return (
                  <Carousel
                    autoplay={true}
                    infinite
                    autoplayInterval={10000}
                  >
                    {this.renderSwipers()}
                  </Carousel>
                )
              }else {
                return ''
              }
            })()
          }
          {/* 搜索框 */}
          <SearchHeader cityName={this.state.curCityName} />
        </div>

        
        {/* 导航菜单 */}
        <Flex className='nav'>
          {this.renderNavs()}
        </Flex>

        {/* 租房小组 */}
        <div className='group'>
          <h3 className='title'>
            租房小组
            <span className='more'>更多</span>
          </h3>

          <Grid 
            data={this.state.groups} 
            columnNum={2}
            square={false}
            hasLine={false}
            renderItem={(el) => (
              <Flex className='group-item' justify='around' key={el.id}>
                <div className='desc'>
                  <p className='desc-title'>{el.title}</p>
                  <span className='info'>{el.desc}</span>
                </div>
                <img src={`${BASE_URL}${el.imgSrc}`} alt=''/>
              </Flex>
            )}
          />
        </div>

        {/* 最新资讯 */}
        <div className='news'>
          <h3 className='title'>最新资讯</h3>
          <WingBlank size='md'>
            {this.renderNews()}
          </WingBlank>
        </div>
      </div>
    );
  }

  async componentDidMount() {
    this.getSwiper()
    this.getGroups()
    this.getNews()

    const res = await getCurrentCity()
    let curCityName = res.label
    this.setState({ curCityName })    
    // const curCity = new window.BMap.LocalCity();
    // curCity.get(async res => {
    //   // console.log(res);
    //   const result = await axios.get(`http://localhost:8080/area/info?name=${res.name}`)
    //   if(result.data && result.data.status === 200) {
    //     let {data: {body: {label}}} = result
    //     // console.log(label);
    //     let curCityName = label
        
    //     this.setState({curCityName})
    //   }
    // }); 
  }

  async getSwiper() {
    const res = await axios.get('http://localhost:8080/home/swiper')
    if(res.data && res.data.status === 200) {
      let { data: { body } } = res
      this.setState({
        swiper: body,
        isSwiperLoaded: true
      })
    }
  }

  async getGroups() {
    const res = await axios.get('http://localhost:8080/home/groups',{
      params: {
        area: 'AREA%7C88cff55c-aaa4-e2e0'
      }
    })
    if(res.data && res.data.status === 200) {
      let { data: { body }} = res
      let groups = body
      this.setState({groups})
    }
  }

  async getNews() {
    const res = await axios.get('http://localhost:8080/home/news',{
      params: {
        area: 'AREA%7C88cff55c-aaa4-e2e0'
      }
    })
    // console.log(res);
    if(res.data && res.data.status === 200) {
      let { data: { body }} = res
      let news = body
      this.setState({news})
    }
  }

  // 渲染轮播图结构
  renderSwipers() {
    return (
      this.state.swiper.map(el => (
        <a
          key={el.id}
          href="http://www.alipay.com"
          style={{ display: 'inline-block', width: '100%', height: 212 }}
        >
          <img
            src={`${BASE_URL}${el.imgSrc}`}
            alt=""
            style={{ width: '100%', verticalAlign: 'top' }}
          />
        </a>
      ))
    )
  }

  // 渲染导航菜单
  renderNavs() {
    return (
      navs.map(el => (
        <Flex.Item 
          key={el.id} 
          onClick={ () => this.props.history.push(el.path)}
        >
          <img src={el.img} alt=''/>
          <h2>{el.title}</h2>
        </Flex.Item>
      ))
    )
  }

  // 渲染最新资讯
  renderNews() {
    return (
      this.state.news.map(el => (
        <div className='news-item' key={el.id}>
          <div className='imgwrap'>
            <img 
              className='img'
              src={`${BASE_URL}${el.imgSrc}`}
              alt=''
            />
          </div>
          <Flex className="content" direction="column" justify='between'>
            <h3 className="content-title">{el.title}</h3>
            <Flex className="info" justify='between'>
              <span>{el.from}</span>
              <span>{el.date}</span>
            </Flex>
        </Flex>
        </div>
      ))
    )
  }
}
