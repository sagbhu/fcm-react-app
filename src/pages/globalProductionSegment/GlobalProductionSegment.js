import '../../assets/styles/App.css';
import 'react-toastify/dist/ReactToastify.css';
import ListGroup from 'react-bootstrap/ListGroup';
import React, { useState, useEffect } from "react";
import { Nav, Navbar, Button, Form, Col, Row, Card } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { BsFileEarmarkText } from "react-icons/bs";
import { getGlobalProductionSegmentList, deleteGlobalProductionSegment } from "../../services/GlobalProductionSegmentService.js"; 
import Bootbox from 'bootbox-react';
import AddEditGlobalProductionSegment from './AddEditGlobalProductionSegment';
import { Notification } from "../../components/Notification.js";
import { useLoading } from '../../LoadingContext.js';

export default function GlobalProductionSegment() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [currentVehicleGlobalProductionSegmentId, setCurrentVehicleGlobalProductionSegmentId] = useState(null);
  const [vehicleGlobalProductionSegmentList, setVehicleGlobalProductionSegmentList] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const bootboxClose = () => setShowConfirm(false);
  const [vehicleGlobalProductionSegment, setVehicleGlobalProductionSegment] = useState("");
  const { setLoading } = useLoading();

  async function handleConfirm() {
    let message = '';
    setShowConfirm(false);
    setLoading(true);
    try {
      await deleteGlobalProductionSegment(currentVehicleGlobalProductionSegmentId).then(res => { message = res });
    }
    catch (error) {
      message = error.message;
    }
    finally {
      if (message == 'SUCCESS') {
        Notification('Global production segment deleted successfully!', 'success')
      } else {
        Notification(message, 'ERROR')
      }
      setCurrentVehicleGlobalProductionSegmentId(null);
      setLoading(false);
    }

    getvehicleGlobalProductionSegmentList();

  }

  const handleSearch = (e) => {
    e.preventDefault();
    getvehicleGlobalProductionSegmentList();
  };

  useEffect(() => {
    getvehicleGlobalProductionSegmentList();
  }, [])

  async function handleReset(e) {
    e.preventDefault();
    setVehicleGlobalProductionSegment("");
    await getGlobalProductionSegmentList("").then(res => { setVehicleGlobalProductionSegmentList(res) });
  }

  async function getvehicleGlobalProductionSegmentList() {
    setLoading(true);
    try {
      await getGlobalProductionSegmentList(vehicleGlobalProductionSegment).then(res => {
        setVehicleGlobalProductionSegmentList(res)
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
      Notification('Global production segment saved successfully!', 'SUCCESS')
      getvehicleGlobalProductionSegmentList();
    }
    else {
      Notification(message, 'ERROR')
    }
  }
  
  const columns = [{
    dataField: "vehicleGlobalProductionSegmentId",
    text: "vehicleGlobalProductionSegmentId",
    sort: true,
    hidden: true,
    style: {
      width: '15%'
    }
  },
  {
    dataField: "vehicleGlobalProductionSegment",
    text: "Global Production Segment",
    sort: true,
    style: {
      width: '15%'
    }
  },
  {
    dataField: "description",
    text: "Description ",
    sort: true,
    style: {
      width: '77%',
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
        <a href={vehicleGlobalProductionSegmentList.value} style={{ display: 'inline-flex' }} >
          <button title="Edit" type="button" onClick={() => { setCurrentVehicleGlobalProductionSegmentId(columns.vehicleGlobalProductionSegmentId); handleShow() }} size="sm" className="icone-button"><i className="icon-pencil3 dark-grey"></i></button>
          <button title='Delete' type="button" onClick={() => { setCurrentVehicleGlobalProductionSegmentId(columns.vehicleGlobalProductionSegmentId); setShowConfirm(true) }} className="icone-button"><i className="icon-trash dark-grey"></i></button>
        </a>
      </div>
    )
  },
  ]
 
  return (
    <>
      {show && <AddEditGlobalProductionSegment onDataSave={onDataSave} vehicleGlobalProductionSegmentId={currentVehicleGlobalProductionSegmentId} />}
      <ToastContainer />
      <ListGroup>
        <ListGroup.Item>
          <Navbar collapseOnSelect expand="sm" variant="dark" className='search-card'>
            <Navbar.Brand style={{ color: 'black' }}><BsFileEarmarkText /> Global Production Segment </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto"></Nav>
              <Nav>
                <Navbar.Brand style={{ color: 'black' }}><Button className='btn' variant="danger" type='button' size="sm" onClick={() => { setCurrentVehicleGlobalProductionSegmentId(0); handleShow() }} >+ Add Global Production Segment</Button></Navbar.Brand>
              </Nav>
            </Navbar.Collapse>
          </Navbar >
        </ListGroup.Item>
        <ListGroup.Item>
          <Card className="search-panel-card">
            <Form onSubmit={(event) => handleSearch(event)}>
              <Row className="main-class">
                <Col xs={4} className='display-inline pl-0' >
                  <Form.Label className='display-inline search-label'>Global Production Segment</Form.Label>
                  <Form.Control type="text" value={vehicleGlobalProductionSegment} onChange={(e) => setVehicleGlobalProductionSegment(e.target.value)} />
                </Col>
                <Col xs={7} className='display-inline pl-2'>
                  <Button type="submit" className='btn btn-primary mr-5' onClick={(event) => handleSearch(event)} >Search</Button>
                  <Button onClick={(event) => handleReset(event)} className='btn btn-dft'>Reset</Button>
                </Col>
              </Row>
            </Form>
          </Card>
          <div className='tablecard'>
            <BootstrapTable size="sm"
              keyField={'vehicleGlobalProductionSegmentId'}
              id='tbl_vehicleGlobalProductionSegment'
              data={vehicleGlobalProductionSegmentList}
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
        message={"Are you sure you want to delete this global production segment?"}
        onSuccess={handleConfirm}
        onCancel={bootboxClose}
        onClose={bootboxClose}
      />
    </>
  )
}