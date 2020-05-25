import axios from './index'
// 获取记录列表
export const getRecordList = () => {
  return axios.request({
    url: 'zooms/getRecordList',
    method: 'get',
  })
}
// 分页请求数据
export const getRecordPageList = (data) => {
  return axios.request({
    url: 'zooms/getRecordPageList',
    method: 'post',
    data: {
      data
    }
  })
}

// 上传图片
export const uploadAvatar = (avatar) => {
  let data = new FormData();
  data.append("avatar", avatar);
  return axios.request({
    url: 'zooms/uploadimage',
    method: 'post',
    data: data,
    headers: { "content-type": "multipart/form-data" }
  })
}
// 新增记录
export const recordAdd = (data) => {
  return axios.request({
    url: 'zooms/recordadd',
    method: 'post',
    data: {
      data
    }
  })
}
// 修改记录
export const recordEdit = (data) => {
  return axios.request({
    url: 'zooms/recordEdit',
    method: 'post',
    data: {
      data
    }
  })
}
// 单条数据删除
export const recordDelete = (data) => {
  return axios.request({
    url: 'zooms/recordDelete',
    method: 'post',
    data: {
      data
    }
  })
}

// 批量删除
export const recordsDelete = (data) => {
  return axios.request({
    url: 'zooms/recordsDelete',
    method: 'post',
    data: {
      data
    }
  })
}

// 搜索
export const search = (data) => {
  return axios.request({
    url: 'zooms/search',
    method: 'post',
    data: {
      data
    }
  })
}




