import { operationLog } from "@/api/operation_log/operation_log"
import {useUserinfo} from '@/stores/userinfo'
const userinfo = useUserinfo()
// 定义一个函数，进行操作日志的判断
// 用户管理员
export const tracking = async(module: string, operation_object: string, operation_level: string) => {
  const operation_person = userinfo.name;
  let operation_content = '';

  switch (module) {
    case 'deletePUser':
      operation_content = `对用户管理员${operation_object}进行了删除操作`;
      break;
    case 'addPuser':
      operation_content = `将${operation_object}添加为用户管理员`;
      break;
    case 'Editadmin':
      operation_content = `对${operation_object}的信息进行了编辑`;
      break;
    case 'iceuser':
      operation_content = `对${operation_object}进行了冻结`;
      break;
    case 'ProtectUser':
      operation_content = `对${operation_object}进行了解冻`;
      break;
    case '产品管理员':
    operation_content = `对产品管理员${operation_object}进行了删除`;
      break;
    case '产品审核':
     operation_content = `对产品${operation_object}进行了同意出库`;
       break;
    default:
      console.warn('未知的操作模块:', module);
      return;
  }

  await operationLog({
    operation_person,
    operation_content,
    operation_level
  });
};