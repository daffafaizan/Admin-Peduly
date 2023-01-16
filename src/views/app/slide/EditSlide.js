import React, { useEffect, useState } from 'react'
import {
  Card,
  Row,
  CardBody,
  Form,
  Col,
  Label,
  FormGroup,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap'
import { Colxx } from 'components/common/CustomBootstrap'
import './index.scss'
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'

const EditSlide = () => {
  const [data, setData] = useState({
    title: '',
    url: '',
    image: '',
    start_date: '',
    end_date: '',
  })
  const [loadingEdit, setLoadingEdit] = useState(false)
  const [modalEditConfirmation, setModalEditConfirmation] = useState(false)
  const [modalDeleteConfirmation, setModalDeleteConfirmation] = useState(false)

  const history = useHistory()
  const { id } = useParams()

  useEffect(() => {
    const getSlideById = () => {
      // get token and set config
      const token = Cookies.get('token')
      const config = {
        method: 'get',
        url: `https://dev.peduly.com/api/slides/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

      // get slide data by id
      axios(config)
        .then((res) => {
          const responseData = res.data.data
          setData({
            title: responseData.title,
            url: responseData.url,
            image: responseData.image,
            start_date: responseData.start_date,
            end_date: responseData.end_date,
          })
        })
        .catch((err) => {
          console.log('Error: ', err)
        })
    }

    getSlideById()
  }, [id])

  const putSlide = () => {
    setLoadingEdit(true)

    // get token and set put config
    const token = Cookies.get('token')
    const config = {
      method: 'put',
      url: `https://dev.peduly.com/api/slides/${id}/update`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: data,
    }

    axios(config)
      .then((res) => {
        console.log('Success edit data: ', res.data.data)
        alert(`Success to edit the slide data!`)
        history.push('/app/slide')
      })
      .catch((err) => {
        console.log('Error: ', err)
        alert(`Failed to edit the slide data!`)
      })
      .finally(() => {
        setModalEditConfirmation(false)
        setLoadingEdit(false)
      })
  }

  const deleteSlide = () => {
    // get token and set delete config
    const token = Cookies.get('token')
    const config = {
      method: 'delete',
      url: `https://dev.peduly.com/api/slides/${id}/delete`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    axios(config)
      .then((res) => {
        console.log('Success delete data: ', res.data.data)
        alert(`Success to delete the slide data!`)
      })
      .catch((err) => {
        console.log('Error: ', err)
        alert(`Failed to delete the slide data!`)
      })
      .finally(() => {
        history.push('/app/slide')
      })
  }

  const handleEdit = () => {
    putSlide()
  }

  const handleCancel = () => {
    history.push('/app/slide')
  }

  const handleDelete = () => {
    setModalDeleteConfirmation(true)
  }

  return (
    <>
      {/* Modal Confirmation Edit Data */}
      <Modal
        isOpen={modalEditConfirmation}
        toggle={() => setModalEditConfirmation(false)}
      >
        <ModalHeader>Confimation Edit Data</ModalHeader>
        <ModalBody>
          <p>Are you sure you want to change this slide data?</p>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleEdit}>
            Yes
          </Button>
          <Button onClick={() => setModalEditConfirmation(false)}>No</Button>
        </ModalFooter>
      </Modal>
      {/* Modal Confirmation Delete Data */}
      <Modal
        isOpen={modalDeleteConfirmation}
        toggle={() => setModalEditConfirmation(false)}
      >
        <ModalHeader>Confimation Delete Data</ModalHeader>
        <ModalBody>
          <p>Are you sure you want to delete this slide data?</p>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={deleteSlide}>
            Yes
          </Button>
          <Button onClick={() => setModalDeleteConfirmation(false)}>No</Button>
        </ModalFooter>
      </Modal>
      <Row className="rounded">
        <Colxx xs="12" className="mb-4">
          <Card className="mb-4">
            <CardBody>
              <h2 className="judul mb-heading">Edit Slide</h2>
              <Form>
                <FormGroup row>
                  <Label for="exampleFile" sm={2}>
                    Gambar Slide
                  </Label>
                  <Col sm={10}>
                    <Input
                      id="slideGambar"
                      name="slideGambar"
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      hidden
                      disabled
                    />
                    <label
                      htmlFor="slideGambar"
                      className="custom-input-image d-flex justify-content-center align-items-center"
                    >
                      <img
                        src={data.image}
                        alt="Preview Image"
                        className="img-preview"
                      />
                    </label>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="judul" sm={2}>
                    Judul
                  </Label>
                  <Col sm={10}>
                    <Input
                      id="judul"
                      name="judul"
                      placeholder="Input Title"
                      type="text"
                      className="input-text"
                      value={data.title || ''}
                      onChange={(e) =>
                        setData({ ...data, title: e.target.value })
                      }
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="directLink" sm={2}>
                    Direct Link
                  </Label>
                  <Col sm={10}>
                    <Input
                      id="directLink"
                      name="directLink"
                      placeholder=""
                      type="text"
                      className="input-text"
                      value={data.url || ''}
                      onChange={(e) =>
                        setData({ ...data, url: e.target.value })
                      }
                    />
                  </Col>
                </FormGroup>

                <Row className="row-cols-lg-auto align-items-center">
                  <Col md={2}>
                    <Label for="tanggalMulai">Tanggal Mulai</Label>
                  </Col>
                  <Col md={4}>
                    <Input
                      id="tanggalMulai"
                      name="tanggalMulai"
                      placeholder=""
                      type="date"
                      className="input-date"
                      value={data.start_date || ''}
                      onChange={(e) =>
                        setData({ ...data, start_date: e.target.value })
                      }
                    />
                  </Col>
                  <Col md={2} className="mt-3 mt-md-0 pl-sm-0 pl-md-5">
                    <Label for="tanggalBerakhir">Tanggal Berakhir</Label>
                  </Col>
                  <Col md={4} className="">
                    <Input
                      id="tanggalBerakhir"
                      name="tanggalBerakhir"
                      placeholder=""
                      type="date"
                      className="input-date"
                      value={data.end_date || ''}
                      onChange={(e) =>
                        setData({ ...data, end_date: e.target.value })
                      }
                    />
                  </Col>
                </Row>

                <FormGroup>
                  <Row className="d-flex mt-5 justify-content-sm-center align-items-sm-center flex-no-wrap">
                    <Col>
                      <Button
                        className="px-3 px-md-5 btn-hapus"
                        onClick={handleDelete}
                      >
                        Hapus
                      </Button>
                    </Col>
                    <Col className="d-flex justify-content-end">
                      <Button
                        className="px-md-4 px-3 mx-1 mx-md-3 btn-batal"
                        outline
                        onClick={handleCancel}
                      >
                        Batal
                      </Button>
                      <Button
                        className="px-3 px-md-4"
                        onClick={() => setModalEditConfirmation(true)}
                        disabled={loadingEdit}
                      >
                        Simpan
                      </Button>
                    </Col>
                  </Row>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </>
  )
}

export default EditSlide
