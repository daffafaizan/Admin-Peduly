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
} from 'reactstrap'
import { Colxx } from 'components/common/CustomBootstrap'
import './index.scss'
import loadImage from 'helpers/LoadImage'

const AddSlide = () => {
  const [image, setImage] = useState('')
  const [preview, setPreview] = useState('')

  const handleImage = (e) => {
    loadImage(setImage, setPreview, e)
  }

  console.log(image)
  console.log(preview)

  return (
    <Row className="rounded">
      <Colxx xs="12" className="mb-4">
        <Card className="mb-4">
          <CardBody>
            <h2 className="judul mb-heading">Tambah Slide</h2>
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
                <Label for="judul" sm={2}>
                  Judul
                </Label>
                <Col sm={10}>
                  <Input
                    id="judul"
                    name="judul"
                    placeholder=""
                    type="text"
                    className="input-text"
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
                  />
                </Col>
              </FormGroup>

              <Row className="row-cols-lg-auto align-items-center">
                <Col md={2}>
                  <Label for="tanggalMulai">Tanggal Mulai</Label>
                </Col>
                <Col md={4} className="mb-0">
                  <Input
                    id="tanggalMulai"
                    name="tanggalMulai"
                    placeholder=""
                    type="date"
                    className="input-date"
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
                  />
                </Col>
              </Row>

              <FormGroup>
                <Col
                  sm={{
                    offset: 2,
                    size: 10,
                  }}
                  className="d-flex justify-content-end mt-2"
                >
                  <Button className="px-4 mt-3">Buat Slide</Button>
                </Col>
              </FormGroup>
            </Form>
          </CardBody>
        </Card>
      </Colxx>
    </Row>
  )
}

export default AddSlide
