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

const admin: CustomMenuProps['items'] = [
  {
    key: '1',
    title: 'Dashboard',
    label: 'Dashboard',
    icon: 'FaGrip',
    pathname: '',
  },
  {
    key: '2',
    title: 'CCTV',
    label: 'CCTV',
    icon: 'FaVideo',
    pathname: '',
  },
  {
    key: '3',
    title: 'Analytic',
    label: 'Analytic',
    icon: 'FaExplosion',
    pathname: '',
  },
  {
    key: '4',
    title: 'Counting',
    label: 'Counting',
    icon: 'FaChartSimple',
    pathname: '',
  },
  {
    key: '5',
    title: 'Traffic',
    label: 'Traffic',
    icon: 'FaTrafficLight',
    pathname: '',
  },
  {
    key: '6',
    title: 'Crosswalk',
    label: 'Crosswalk',
    icon: 'FaPersonWalking',
    pathname: '',
  },
  {
    key: '7',
    title: 'Lightning',
    label: 'Lightning',
    icon: 'FaBolt',
    pathname: '',
  },
  {
    key: '8',
    title: 'VMS',
    label: 'VMS',
    icon: 'FaTv',
    pathname: '',
  },
  {
    key: '9',
    title: 'Tunnel',
    label: 'Tunnel',
    icon: 'FaCarTunnel',
    pathname: '',
  },
  {
    key: '10',
    title: 'WIM',
    label: 'WIM',
    icon: 'FaTruckFast',
    pathname: '',
  },
  // {{menu_template}}
]

export default admin