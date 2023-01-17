import React, { useState } from 'react'
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
  ModalBody,
} from 'reactstrap'
import { Colxx } from 'components/common/CustomBootstrap'
import './index.scss'
import loadImage from 'helpers/LoadImage'
import axios from 'axios'
import Cookies from 'js-cookie'
import { API_URL } from 'config/api'
import { useHistory } from 'react-router-dom'

const AddSlide = () => {
  const [title, setTitle] = useState("")
  const [image, setImage] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [url, setUrl] = useState("")
  const [preview, setPreview] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [modalMsg, setModalMsg] = useState("")
  const history = useHistory()

  const handleImage = (e) => {
    loadImage(setImage, setPreview, e)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const token = Cookies.get('token')

    const formData = new FormData()
    formData.append('title', title)
    formData.append('image', image)
    formData.append('start_date', startDate)
    formData.append('end_date', endDate)
    formData.append('url', url)

    await axios
      .post(`${API_URL}/api/slides/create`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          setIsOpen(true)
          setModalMsg("Slider Created Successfully")
        }
      })
      .catch((err) => {
        console.log(err.errors)
      })
  }

  return (
    <>
    <Row className="rounded">
      <Colxx xs="12" className="mb-4">
        <Card className="mb-4">
          <CardBody>
            <h2 className="judul mb-heading">Buat Slide</h2>
            <Form onSubmit={handleSubmit}>
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
                    onChange={handleImage}
                  />
                  <label
                    htmlFor="slideGambar"
                    className="custom-input-image d-flex justify-content-center align-items-center"
                  >
                    {preview ? (
                      <img
                        src={preview}
                        alt="Preview Image"
                        className="img-preview"
                      />
                    ) : (
                      <svg
                        width={33}
                        height={34}
                        viewBox="0 0 33 34"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16.4001 30.6666C23.9167 30.6666 30.0667 24.5166 30.0667 16.9999C30.0667 9.48325 23.9167 3.33325 16.4001 3.33325C8.8834 3.33325 2.7334 9.48325 2.7334 16.9999C2.7334 24.5166 8.8834 30.6666 16.4001 30.6666Z"
                          stroke="#E7513B"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M10.9336 17H21.8669"
                          stroke="#E7513B"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M16.4004 22.4668V11.5334"
                          stroke="#E7513B"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </label>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label for="title" sm={2}>
                  Judul
                </Label>
                <Col sm={10}>
                  <Input
                    id="title"
                    name="title"
                    placeholder=""
                    type="text"
                    value={title}
                    className="input-text"
                    onChange={(e) => {
                      setTitle(e.target.value)
                    }}
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label for="url" sm={2}>
                  Direct Link
                </Label>
                <Col sm={10}>
                  <Input
                    id="url"
                    name="url"
                    placeholder=""
                    type="text"
                    className="input-text"
                    value={url}
                    onChange={(e) => {
                      setUrl(e.target.value)
                    }}
                  />
                </Col>
              </FormGroup>

              <Row className="row-cols-lg-auto align-items-center">
                <Col md={2}>
                  <Label for="startDate">Tanggal Mulai</Label>
                </Col>
                <Col md={4} className="mb-0">
                  <Input
                    id="startDate"
                    name="startDate"
                    placeholder=""
                    type="date"
                    className="input-date"
                    value={startDate}
                    onChange={(e) => {
                      setStartDate(e.target.value)
                    }}
                  />
                </Col>
                <Col md={2} className="mt-3 mt-md-0 pl-sm-0 pl-md-5">
                  <Label for="endDate">Tanggal Berakhir</Label>
                </Col>
                <Col md={4} className="">
                  <Input
                    id="endDate"
                    name="endDate"
                    placeholder=""
                    type="date"
                    className="input-date"
                    value={endDate}
                    onChange={(e) => {
                      setEndDate(e.target.value)
                    }}
                  />
                </Col>
              </Row>

              <FormGroup>
                <Col className="d-flex justify-content-end mt-5">
                  <Button type="submit" className="px-4">
                    Buat Slide
                  </Button>
                </Col>
              </FormGroup>
            </Form>
          </CardBody>
        </Card>
      </Colxx>
    </Row>
    <Modal
    isOpen={isOpen}
    toggle={() => setIsOpen(false)}
  >
    <ModalBody className="d-flex justify-content-center">
      <p>{modalMsg}</p>
      <Button color="primary" onClick={()=> history.push('/app/slide')}>
        Oke
      </Button>
    </ModalBody>
  </Modal>
  </>
  )
}

export default AddSlide
