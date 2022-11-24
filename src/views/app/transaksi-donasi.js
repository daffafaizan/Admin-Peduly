/* eslint-disable react/no-array-index-key */
/* eslint-disable import/no-unresolved */
import React, { useState } from 'react';
import {
  Row,
  Card,
  CardBody,
  Table,
  Badge,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from 'reactstrap';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';
import transaksi from 'data/transaksi-donasi';
import { orderData } from 'helpers/Utils';
// import axios from 'axios';

const orderOptions = [
  { label: `Terbaru` },
  { label: `Terlama` },
  { label: `Paling Tinggi` },
  { label: `Paling Rendah` },
];

const pageSizes = [4, 8, 12, 20];

const initialData = orderData('Terbaru', transaksi);

const TransaksiDonasi = () => {
  // const [selectedItems, setSelectedItems] = useState([])
  const [selectedOrder, setSelectedOrder] = useState('Terbaru');
  const [data, setData] = useState(initialData);
  // const [dana, setDana] = useState([]);
  const [search, setSearch] = useState('');

  const handleChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  // useEffect(() => {
  //   const getData = async () => {
  //     const response = await axios.get('https://dev.peduly.com/api/galangdana');
  //     console.log(response);
  //     setDana(response.data);
  //     console.log(data);
  //   };
  //   getData();
  // }, []);

  const handleOrder = (option) => {
    const array = orderData(option, initialData);
    setData(array);
    setSelectedOrder(option);
  };

  const statusColor = (status) => {
    if (status === `Approved`) {
      return `success`;
    }

    if (status === `Pending`) {
      return `warning`;
    }

    return `danger`;
  };

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <h1>Transaksi Donasi</h1>
          <Separator className="mb-3" />
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12" className="mb-3">
          <div className="d-block d-md-inline-block pt-1">
            <UncontrolledDropdown className="mr-1 float-md-left btn-group mb-1">
              <DropdownToggle caret color="outline-dark" size="xs">
                <IntlMessages id="pages.orderby" /> {selectedOrder}
              </DropdownToggle>
              <DropdownMenu>
                {orderOptions.map((order, index) => {
                  return (
                    <DropdownItem
                      key={index}
                      onClick={() => handleOrder(order.label)}
                    >
                      {order.label}
                    </DropdownItem>
                  );
                })}
              </DropdownMenu>
            </UncontrolledDropdown>
            <div className="search-sm d-inline-block float-md-left mr-1 mb-1 align-top">
              <input
                type="text"
                name="keyword"
                id="search"
                placeholder="Search..."
                // onKeyPress={(e) => onSearchKey(e)}
                onChange={handleChange}
                // value={search}
              />
            </div>
          </div>
          <div className="float-md-right pt-1">
            <span className="text-muted text-small mr-1">{`1 of 1 `}</span>
            <UncontrolledDropdown className="d-inline-block">
              <DropdownToggle caret color="outline-dark" size="xs">
                {' '}
                8{/* {selectedPageSize} */}
              </DropdownToggle>
              <DropdownMenu right>
                {pageSizes.map((size, index) => {
                  return (
                    <DropdownItem key={index} onClick="">
                      {size}
                    </DropdownItem>
                  );
                })}
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12" className="mb-4">
          <Card className="mb-4">
            <CardBody>
              <Table hover responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nama</th>
                    <th>User</th>
                    <th>Tanggal</th>
                    <th>ID Transaksi</th>
                    <th>ID GD</th>
                    <th>Nominal</th>
                    <th>Metode</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data
                    .filter((tr) =>
                      tr.judul_campaign.toLowerCase().includes(search)
                    )
                    .map((item) => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.judul_campaign}</td>
                        <td>
                          <Badge color="success" pill>
                            Terdaftar
                          </Badge>
                        </td>
                        <td>{item.created_at}</td>
                        <td>{item.kode_donasi}</td>
                        <td>{item.campaign_id}</td>
                        <td>{item.donasi}</td>
                        <td>{item.metode_pembayaran}</td>
                        <td>
                          <Badge color={statusColor(item.status_donasi)} pill>
                            {item.status_donasi}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </>
  );
};

export default TransaksiDonasi;
