import axios from './index'
export const getData = () => {
  return axios.request({
    url: '/search',
    method: 'get',
  })
}
export const create = ({ content }) => {
  return axios.request({
    url: '/create',
    method: 'post',
    data: {
      content
    }
  })
}
export const edit = ({ _id, content }) => {
  return axios.request({
    url: '/edit3',
    method: 'post',
    data: {
      _id,
      content
    }
  })
}
export const destroy = ({ _id }) => {
  return axios.request({
    url: '/destroy',
    method: 'post',
    data: {
      _id
    }
  })
}
export const deletemany = (e) => {
  return axios.request({
    url: '/deletemany',
    method: 'post',
    data: e
  })
}

