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

const user: CustomMenuProps['items'] = [
  {
    key: '1',
    title: 'หน้าหลัก',
    label: 'หน้าหลัก',
    icon: 'FaHouse',
    pathname: '/user/home'
  },
  // {{menu_template}}
]

export default user