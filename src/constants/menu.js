import DashboardIcon from 'assets/icons/DashboardIcon'
import TransaksiIcon from 'assets/icons/TransaksiIcon'
import HalamanIcon from 'assets/icons/HalamanIcon'
import PenggunaIcon from 'assets/icons/PenggunaIcon'
import SlideIcon from 'assets/icons/SlideIcon'
import { adminRoot } from './defaultValues'

const data = [
  // {
  //   id: 'gogo',
  //   icon: 'iconsminds-air-balloon-1',
  //   label: 'menu.gogo',
  //   to: `${adminRoot}/gogo`,
  //   subs: [
  //     {
  //       icon: 'simple-icon-paper-plane',
  //       label: 'menu.start',
  //       to: `${adminRoot}/gogo/start`,
  //     },
  //   ],
  // },
  // {
  //   id: 'secondmenu',
  //   icon: 'iconsminds-three-arrow-fork',
  //   label: 'menu.second-menu',
  //   to: `${adminRoot}/second-menu`,
  //   // roles: [UserRole.Admin, UserRole.Editor],
  //   subs: [
  //     {
  //       icon: 'simple-icon-paper-plane',
  //       label: 'menu.second',
  //       to: `${adminRoot}/second-menu/second`,
  //     },
  //   ],
  // },
  // {
  //   id: 'blankpage',
  //   icon: 'iconsminds-bucket',
  //   label: 'menu.blank-page',
  //   to: `${adminRoot}/blank-page`,
  // },
  {
    id: 'dashboard',
    // eslint-disable-next-line react/react-in-jsx-scope
    icon: <DashboardIcon />,
    label: 'dashboard',
    to: `${adminRoot}/dashboard`,
  },
  {
    id: 'transaksi',
    // eslint-disable-next-line react/react-in-jsx-scope
    icon: <TransaksiIcon />,
    label: 'transaksi',
    to: `${adminRoot}/transaksi-donasi`,
  },
  {
    id: 'halaman',
    // eslint-disable-next-line react/react-in-jsx-scope
    icon: <HalamanIcon />,
    label: 'halaman',
    to: `${adminRoot}/transaksi-donasi`,
  },
  {
    id: 'pengguna',
    // eslint-disable-next-line react/react-in-jsx-scope
    icon: <PenggunaIcon />,
    label: 'pengguna',
    to: `${adminRoot}/pengguna`,
  },
  {
    id: 'slide',
    // eslint-disable-next-line react/react-in-jsx-scope
    icon: <SlideIcon />,
    label: 'slide',
    to: `${adminRoot}/transaksi-donasi`,
  },
]
export default data
