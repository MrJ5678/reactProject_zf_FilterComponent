/*
 * @Author: your name
 * @Date: 2020-04-25 10:10:17
 * @LastEditTime: 2020-04-30 10:06:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /react_zufang/src/utils/index.js
 */
import axios from 'axios'

export const getCurrentCity = () => {
  // 判断localStorage 中是否有定位城市的数据
  const localCity = JSON.parse(localStorage.getItem('hkzf_city'))
  if(!localCity) {
    // 如果没有, 就使用首页中获取定位城市的代码来获取, 并且存储到本地存储中, 然后返回该城市数据
    return new Promise((resolve, reject) => {
      const curCity = new window.BMap.LocalCity();
      curCity.get(async res => {
        // console.log(res);
        try {
          const result = await axios.get(`http://localhost:8080/area/info?name=${res.name}`)
          if(result.data && result.data.status === 200) {
            let {data: {body}} = result
            // console.log(body);

            // 存储到本地存储中
            localStorage.setItem('hkzf_city', JSON.stringify(body))

            resolve(body)
          }
        } catch (error) {
          // 获取定位城市失败
          reject(error)
        }
      }); 
    })
  }
  // 如果有, 直接返回本地存储中到城市数据
  // 上面‘如果没有’的逻辑采用promise操作的, 所以如果有的逻辑也要用promise写 (为了大函数返回值的统一)
  // 因为此处的promise不会失败, 所以此处只要返回一个成功的promise即可
  return Promise.resolve(localCity)
}