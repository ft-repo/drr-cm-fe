import { MenuProps } from "antd"

// Define your custom menu item type
type CustomMenuItem = {
  key: string;
  title: string;
  label: string;
  icon: string;
  pathname: string;
  children?: CustomMenuItem[];
};

// Extend MenuProps to use your custom items
interface CustomMenuProps extends Omit<MenuProps, 'items'> {
  items: CustomMenuItem[];
}

const developer: CustomMenuProps['items'] = [
  {
    key: '1',
    title: 'การสร้าง Page',
    label: 'การสร้าง Page',
    icon: 'FaPaperPlane',
    pathname: '/developer/page'
  },
  {
    key: '2',
    title: 'การสร้าง Module',
    label: 'การสร้าง Module',
    icon: 'FaPaperclip',
    pathname: '/developer/module'
  },
  {
    key: '3',
    title: 'การสร้าง REDUX',
    label: 'การสร้าง REDUX',
    icon: 'FaDatabase',
    pathname: '/developer/redux'
  },
  {
    key: '4',
    title: 'การสร้าง API Service',
    label: 'การสร้าง API Service',
    icon: 'FaPlug',
    pathname: '/developer/service'
  },
]

export default developer