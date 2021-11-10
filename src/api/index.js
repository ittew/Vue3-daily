import axios from './http'
export default {
  // 获取今日新闻
  queryNewsLatest () {
    return axios.get('/api/news_latest')
  },
  // 获取往日新闻
  queryNewsBefore (time) {
    return axios.get('/api/news_before', {
      params: {
        time
      }
    })
  },
  // 获取详情
  queryNewsInfo (id) {
    return axios.get('/api/news_info', {
      params: { id }
    })
  },
  // 获取评论数
  queryNewsStory (id) {
    return axios.get('/api/story_extra', {
      params: { id }
    })
  }
}
