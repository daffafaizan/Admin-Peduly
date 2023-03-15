import { useEffect, useState } from 'react'
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
import BreadcrumbContainer from 'containers/navs/Breadcrumb'
import http from 'helpers/http'
import { API_ENDPOINT } from 'config/api'

const EditSlide = ({ match }) => {
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
    if (id) getSlideById()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const getSlideById = () => {
    http
      .get(`${API_ENDPOINT.GET_DATA_SLIDES}/${id}`)
      .then((res) => {
        const { title, url, image, start_date, end_date } = res.data.data
        setData({
          title,
          url,
          image,
          start_date,
          end_date,
        })
      })
      .catch((err) => {
        console.error('Error: ', err)
      })
  }

  const updateSlide = () => {
    http
      .put(`${API_ENDPOINT.GET_DATA_SLIDES}/${id}/update`, data)
      .then(() => {
        history.push('/app/slide')
      })
      .catch((err) => {
        console.error('Error: ', err)
      })
      .finally(() => {
        setModalEditConfirmation(false)
        setLoadingEdit(false)
      })
  }

  const deleteSlide = () => {
    http
      .delete(`${API_ENDPOINT.GET_DATA_SLIDES}/${id}/delete`)
      .then(() => {
        history.push('/app/slide')
      })
      .catch((err) => {
        console.error('Error: ', err)
      })
      .finally(() => {
        setModalDeleteConfirmation(false)
      })
  }

  return (
    <>
      <Row>
        <Colxx xxs="12" className="p-0 m-0">
          <BreadcrumbContainer match={match} />
        </Colxx>
      </Row>
      <div className="slide-page">
        {/* MODAL EDIT */}
        <Modal
          isOpen={modalEditConfirmation}
          toggle={() => setModalEditConfirmation(false)}
        >
          <ModalHeader>Confimation Edit Data</ModalHeader>
          <ModalBody>
            <p>Are you sure you want to change this slide data?</p>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={updateSlide}>
              Yes
            </Button>
            <Button onClick={() => setModalEditConfirmation(false)}>No</Button>
          </ModalFooter>
        </Modal>
        {/* MODAL DELETE */}
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
            <Button onClick={() => setModalDeleteConfirmation(false)}>
              No
            </Button>
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
                        <img src={data.image} alt="" className="img-preview" />
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
                          onClick={() => setModalDeleteConfirmation(true)}
                        >
                          Hapus
                        </Button>
                      </Col>
                      <Col className="d-flex justify-content-end">
                        <Button
                          className="px-md-4 px-3 mx-1 mx-md-3 btn-batal"
                          outline
                          onClick={() => history.push('/app/slide')}
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
      </div>
    </>
  )
}

export default EditSlide
