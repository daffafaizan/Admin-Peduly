import React from 'react'
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
import './index.css'

const AddSlide = () => {
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
                  <Input id="exampleFile" name="file" type="file" />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label for="judul" sm={2}>
                  Judul
                </Label>
                <Col sm={10}>
                  <Input id="judul" name="judul" placeholder="" type="text" />
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
                  />
                </Col>
              </FormGroup>

              <Row  className="row-cols-lg-auto g-3 align-items-center">
                <Col md={6}>
                    <Label for="tanggalMulai">Tanggal Mulai</Label>
                    <Input
                      id="tanggalMulai"
                      name="tanggalMulai"
                      placeholder=""
                      type="date"
                    />
                </Col>
                <Col md={6}>
                    <Label for="tanggalSelesai">Tanggal Selesai</Label>
                    <Input
                      id="tanggalSelesai"
                      name="tanggalSelesai"
                      placeholder=""
                      type="date"
                    />
                </Col>
              </Row>

              <FormGroup>
                <Col
                  sm={{
                    offset: 2,
                    size: 10,
                  }}
                  className="d-flex justify-content-end mt-3"
                >
                  <Button>Buat Slide</Button>
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
