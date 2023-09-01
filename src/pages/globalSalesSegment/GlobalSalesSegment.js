import '../../assets/styles/App.css';
import 'react-toastify/dist/ReactToastify.css';
import ListGroup from 'react-bootstrap/ListGroup';
import React, { useState, useEffect } from "react";
import { Nav, Navbar, Button, Form, Col, Row, Card } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { BsFileEarmarkText } from "react-icons/bs";
import { getGlobalSalesSegmentList, deleteGlobalSalesSegment } from "../../services/GlobalSalesSegmentServices.js"
import AddEditGlobalSalesSegment from '../globalSalesSegment/AddEditGlobalSalesSegment.js'
import Bootbox from 'bootbox-react'
import { Notification } from "../../components/Notification.js";
import { useLoading } from '../../LoadingContext.js';

export default function GlobalSalesSegment() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [currentVehicleGlobalSalesSegmentId, setCurrentVehicleGlobalSalesSegmentId] = useState(null);
  const [globalSalesSegmentList, setGlobalSalesSegmentList] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const bootboxClose = () => setShowConfirm(false);
  const { setLoading } = useLoading();

  const [vehicleGlobalSalesSegment, setVehicleGlobalSalesSegment] = useState("");
  const [vehicleGlobalSalesSubSegment, setVehicleGlobalSalesSubSegment] = useState("");
  const [vehicleGlobalSalesPriceClass, setVehicleGlobalSalesPriceClass] = useState("");
  const [price, setPrice] = useState("");
  const [vehicleSizeInMm, setVehicleSizeInMm] = useState("");
  const [gvm, setGvm] = useState("");

  async function handleConfirm() {
    let message = '';
    setShowConfirm(false);
    setLoading(true);
    try {
      await deleteGlobalSalesSegment(currentVehicleGlobalSalesSegmentId).then(res => { message = res });
    }
    catch (error) {
      message = error.message;
    }
    finally {
      if (message == 'SUCCESS') {
        Notification('Global sales segment deleted successfully!', 'success')
      } else {
        Notification(message, 'ERROR')
      }
      setCurrentVehicleGlobalSalesSegmentId(null);
      setLoading(false);
    }

    getGlobalSalesSegmentTypeList();

  }

  const handleSearch = (e) => {
    e.preventDefault();
    getGlobalSalesSegmentTypeList();
  };

  useEffect(() => {
    getGlobalSalesSegmentTypeList();
  }, [])

  async function handleReset(e) {
    e.preventDefault();
    setVehicleGlobalSalesSegment("");
    setVehicleGlobalSalesSubSegment("");
    setVehicleGlobalSalesPriceClass("");
    await getGlobalSalesSegmentList('', '','','').then(res => { setGlobalSalesSegmentList(res) });
  }

  async function getGlobalSalesSegmentTypeList() {
    setLoading(true);
    try {
      await getGlobalSalesSegmentList(vehicleGlobalSalesSegment, vehicleGlobalSalesSubSegment,vehicleGlobalSalesPriceClass).then(res => {
        setGlobalSalesSegmentList(res)
      });
    }
    catch (error) {
    }
    finally {
      setLoading(false);
    }
  }

  function onDataSave(isSubmitted, message) {
    handleClose();
    if (isSubmitted && message.toUpperCase() == "SUCCESS") {
      Notification('Global sales segment saved successfully!', 'SUCCESS')
      getGlobalSalesSegmentTypeList();
    }
    else {
      Notification(message, 'ERROR')
    }
  }
  
  const columns = [
    {
    dataField: "vehicleGlobalSalesSegmentId",
    text: "vehicleGlobalSalesSegmentId",
    sort: true,
    hidden: true,
   
  },
  {
    dataField: "vehicleGlobalSalesSegment",
    text: "Vehicle Global Sales Segment",
    sort: true,
    style: {
      width: '7%'
    }
  },
  {
    dataField: "vehicleGlobalSalesSubSegment",
    text: "Vehicle Global Sales Sub Segment ",
    sort: true,
    style: {
      width: '9%',
      textAlign: 'left'
    }
  },
  {
    dataField: "vehicleGlobalSalesPriceClass",
    text: "Vehicle Global Sales Price Class ",
    sort: true,
    style: {
      width: '8%',
      textAlign: 'left'
    }
  },
  {
    dataField: "vehicleSizeInMm",
    text: "Vehicle Size In Mm",
    sort: true,
    style: {
      width: '6%',
      textAlign: 'left'
    }
  },
  {
    dataField: "price",
    text: "Price ",
    sort: true,
    style: {
      width: '5%',
      textAlign: 'left'
    }
  },
  {
    dataField: "gvm",
    text: "Gvm ",
    sort: true,
    style: {
      width: '5%',
      textAlign: 'left'
    }
  },
  {
    dataField: "description",
    text: "Description ",
    sort: true,
    style: {
      width: '52%',
      textAlign: 'left'
    }
  },
  {
    dataField: 'Action',
    text: 'Action',
    style: {
      padding: '3px',
      margin: '0px',
      width: '8%',
      textAlign: 'center'
    },
    headerStyle: { textAlign: 'center' },
    formatter: (cell, columns, rowIndex, extraData) => (
      <div>
        <a href={globalSalesSegmentList.value} style={{ display: 'inline-flex' }} >
          <button title="Edit" type="button" onClick={() => { setCurrentVehicleGlobalSalesSegmentId(columns.vehicleGlobalSalesSegmentId); handleShow() }} size="sm" className="icone-button"><i className="icon-pencil3 dark-grey"></i></button>
          <button title='Delete' type="button" onClick={() => { setCurrentVehicleGlobalSalesSegmentId(columns.vehicleGlobalSalesSegmentId); setShowConfirm(true) }} className="icone-button"><i className="icon-trash dark-grey"></i></button>
        </a>
      </div>
    )
  },
  ]
 
  return (
    <>
      {show && <AddEditGlobalSalesSegment onDataSave={onDataSave} vehicleGlobalSalesSegmentId={currentVehicleGlobalSalesSegmentId} />}
      <ToastContainer />
      <ListGroup>
        <ListGroup.Item>
          <Navbar collapseOnSelect expand="sm" variant="dark" className='search-card'>
            <Navbar.Brand style={{ color: 'black' }}><BsFileEarmarkText /> Global Sales Segment </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto"></Nav>
              <Nav>
                <Navbar.Brand style={{ color: 'black' }}><Button className='btn' variant="danger" type='button' size="sm" onClick={() => { setCurrentVehicleGlobalSalesSegmentId(0); handleShow() }} >+ Add  Global Sales Segment</Button></Navbar.Brand>
              </Nav>
            </Navbar.Collapse>
          </Navbar >
        </ListGroup.Item>
        <ListGroup.Item>
          <Card className="search-panel-card">
            <Form onSubmit={(event) => handleSearch(event)} className="main-class">
              <Row >
                <Col xs={4} className='display-inline' >
                  <Col xs={5} className='p-0'>
                    <Form.Label>Vehicle Global Sales Segment</Form.Label>
                  </Col>
                  <Col xs={8}>
                  <Form.Control type="text" value={vehicleGlobalSalesSegment} onChange={(e) => setVehicleGlobalSalesSegment(e.target.value)} />                  </Col>
                </Col>

                <Col xs={4} className='display-inline'>
                  <Col xs={5} style={{ marginLeft: '53px' }}>
                    <Form.Label >Vehicle Global Sales Sub Segment</Form.Label>
                  </Col>
                  <Col xs={8} className='p-0 pl-0'>
                  <Form.Control type="text" value={vehicleGlobalSalesSubSegment} onChange={(e) => setVehicleGlobalSalesSubSegment(e.target.value)} />                  </Col>
                </Col>
              </Row>
              <Row style={{ marginTop: '10px' }}>

                <Col xs={4} className='display-inline'>
                  <Col xs={5}  className='p-0'>
                  <Form.Label className='display-inline search-label'>Vehicle Global Sales Price Class</Form.Label>
                  </Col>
                  <Col xs={8}>
                  <Form.Control type="text" value={vehicleGlobalSalesPriceClass} onChange={(e) => setVehicleGlobalSalesPriceClass(e.target.value)} />
                  </Col>
                </Col>

                <Col xs={4} className='display-inline'>
                  <Col xs={4} style={{ marginLeft: '53px' }}>
                    <Button className='btn btn-primary mr-5' type="submit" onClick={(event) => handleSearch(event)}>Search</Button>
                    <Button onClick={(event) => handleReset(event)} className='btn btn-dft' type='submit'>Reset</Button>
                  </Col>
                </Col>
              </Row>





            </Form>
          </Card>
          <div className='tablecard'>
            <BootstrapTable size="sm"
              keyField={'vehicleGlobalSalesSegmentId'}
              id='tbl_fuelType'
              data={globalSalesSegmentList}
              columns={columns}
              striped
              hover
              condensed
              noDataIndication="No records found" 
              pagination={paginationFactory({
                sizePerPageList: [10, 20, 30, 50]
              })}
            />
          </div>
        </ListGroup.Item>
      </ListGroup>


      <Bootbox show={showConfirm}
        type={"confirm"}
        message={"Are you sure you want to delete this global sales segment?"}
        onSuccess={handleConfirm}
        onCancel={bootboxClose}
        onClose={bootboxClose}
      />
    </>
  )
}