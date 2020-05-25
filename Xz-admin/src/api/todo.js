import axios from './index'

export const getTodolist = () => {
  return axios.request({
    url: 'todo/getTodolist',
    method: 'get',
  })
}
