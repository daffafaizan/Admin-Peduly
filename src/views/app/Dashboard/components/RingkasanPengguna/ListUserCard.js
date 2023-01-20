import React from 'react'
import { Table } from 'reactstrap'
import PerfectScrollBar from 'react-perfect-scrollbar'

import './index.scss'

const ListUserCard = ({ ListUser }) => {
  return (
    <div className="card list-users-card">
      <h2 className="card-title" style={{ marginBottom: '12px' }}>
        Pengguna Baru
      </h2>
      <PerfectScrollBar
        options={{ suppressScrollX: true, wheelPropagation: false }}
      >
        <Table>
          <tbody>
            {ListUser.map((item, index) => (
              <tr key={`user-${index}`}>
                <td className="d-flex user-container">
                  <img
                    src={`images/images_campaign/${item.foto}`}
                    alt="User Profile"
                    className="avatar rounded"
                    onError={(e) => {
                      e.target.onerror = null
                      e.target.src = '/assets/img/no-avatar.png'
                    }}
                  />
                  <div className="d-block information">
                    <p className="username">{item.name}</p>
                    <p className="register-date">{item.tanggal_dibuat}</p>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </PerfectScrollBar>
    </div>
  )
}

export default ListUserCard
