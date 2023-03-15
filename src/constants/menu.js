import DashboardIcon from 'assets/icons/DashboardIcon'
import TransaksiIcon from 'assets/icons/TransaksiIcon'
import HalamanIcon from 'assets/icons/HalamanIcon'
import PenggunaIcon from 'assets/icons/PenggunaIcon'
import SlideIcon from 'assets/icons/SlideIcon'
import { adminRoot } from './defaultValues'

const data = [
  {
    id: 'dashboard',
    icon: <DashboardIcon />,
    label: 'dashboard',
    to: `${adminRoot}/dashboard`,
  },
  {
    id: 'transaksi',
    icon: <TransaksiIcon />,
    label: 'transaksi',
    to: `${adminRoot}/transaksi-donasi`,
  },
  {
    id: 'halaman',
    icon: <HalamanIcon />,
    label: 'halaman',
    to: `${adminRoot}/transaksi-donasi`,
  },
  {
    id: 'pengguna',
    icon: <PenggunaIcon />,
    label: 'pengguna',
    to: `${adminRoot}/pengguna`,
  },
  {
    id: 'slide',
    icon: <SlideIcon />,
    label: 'slide',
    to: `${adminRoot}/transaksi-donasi`,
  },
]

export default data
