// 导入axios
import instance from "@/http/axios";
// 定义数据类型
export interface dataFile{
  file_name?:string
  file_size?:string
  upload_time?:string
  file_url?:string
  upload_person?:string
  id?:number | null
  download_number?:number | null
}
// 上传文件uploadFile
export const uploadFile=() =>{
  return instance({
    url:'/files/uploadFile',
    method:'POST',
  })
}

// 绑定上传者和文件地址(bindfile)
export const bindFile=(file_name:string,file_url:string) =>{
  return instance({
    url:'/files/bindFile',
    method:'POST',
    data:{
      file_name,
      file_url
    }
  })
}
// 更新下载次数updateDownloadNumber
export const updateDownloadNumber=(id:number) =>{
  return instance({
    url:'/files/updateDownloadNumber',
    method:'POST',
    data:{
      id
    }
  })
}
// 下载文件downloadFiles
export const downloadFiles=(id:number) =>{
  return instance({
    url:'/files/downloadFiles',
    method:'POST',
    data:{
      id
    }
  })
}
// 获取文件列表getFileList
export const getFileList=() =>{
  return instance({
    url:'/files/getFileList',
    method:'POST',
  })
}
// 删除文件deleteFile
export const deleteFile=(id:number) =>{
  return instance({
    url:'/files/deleteFile',
    method:'POST',
    data:{
      id
    }
  })
}
// 搜索文件searchFile
export const searchFile=(keyword:string) =>{
  return instance({
    url:'/files/searchFile',
    method:'POST',
    data:{
      keyword
    }
  })
}
// 监听换页getFileListByPage
export const getFileListByPage=(pager:number,limit:number) =>{
  return instance({
    url:'/files/getFileListByPage',
    method:'POST',
    data:{
      pager,
      limit
    }
  })
}