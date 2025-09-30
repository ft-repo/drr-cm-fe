import { MenuProps } from "antd"

const developer: MenuProps['items'] = [
  {
    key: 1,
    title: 'create_page',
    label: 'การสร้าง Page',
    icon: 'FaPaperPlane',  
  },
  {
    key: 2,
    title: 'create_module',
    label: 'การสร้าง Module',
    icon: 'FaPaperclip',
  },
  {
    key: 3,
    title: 'create_redux',
    label: 'การสร้าง REDUX',
    icon: 'FaDatabase',
  },
  {
    key: 4,
    title: 'create_api',
    label: 'การสร้าง API Service',
    icon: 'FaPlug',
  },
]

export default developer