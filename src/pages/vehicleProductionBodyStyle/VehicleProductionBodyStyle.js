import '../../assets/styles/App.css';
import 'react-toastify/dist/ReactToastify.css';
import ListGroup from 'react-bootstrap/ListGroup';
import React, { useState, useEffect } from "react";
import { Nav, Navbar, Button, Form, Col, Row, Card } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { BsFileEarmarkText } from "react-icons/bs";
import { getVehicleProductionBodyStyleList, deleteVehicleProductionBodyStyle } from "../../services/VehicleProductionBodyStyleService.js"
import AddEditVehicleProductionBodyStyle from '../vehicleProductionBodyStyle/AddEditVehicleProductionBodyStyle.js'
import Bootbox from 'bootbox-react'
import { Notification } from "../../components/Notification.js";
import { useLoading } from '../../LoadingContext.js';

export default function VehicleProductionBodyStyle() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [currentVehicleProductionBodyStyleId, setCurrentVehicleProductionBodyStyleId] = useState(null);
  const [vehicleProductionBodyStyleList, setVehicleProductionBodyStyleList] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const bootboxClose = () => setShowConfirm(false);

  const [vehicleProductionBodyStyle, setVehicleProductionBodyStyle] = useState("");
  const [numberOfArticulatingDoors, setNumberOfArticulatingDoorsStyle] = useState("");
  const [rearDoor, setRearDoor] = useState("");
  const { setLoading } = useLoading();

  async function handleConfirm() {
    let message = '';
    setShowConfirm(false);
    setLoading(true);
    try {
      await deleteVehicleProductionBodyStyle(currentVehicleProductionBodyStyleId).then(res => { message = res });
    }
    catch (error) {
      message = error.message;
    }
    finally {
      if (message == 'SUCCESS') {
        Notification('Vehicle production body style deleted successfully!', 'success')
      } else {
        Notification(message, 'ERROR')
      }
      setCurrentVehicleProductionBodyStyleId(null);
      setLoading(false);
    }

    getvehicleProductionBodyStyleList();

  }

  const handleSearch = (e) => {
    e.preventDefault();
    getvehicleProductionBodyStyleList();
  };

  useEffect(() => {
    getvehicleProductionBodyStyleList();
  }, [])

  async function handleReset(e) {
    // e.preventDefault();
    setVehicleProductionBodyStyle("");
    setNumberOfArticulatingDoorsStyle("");
    setRearDoor("");
    await getVehicleProductionBodyStyleList(vehicleProductionBodyStyle, numberOfArticulatingDoors, rearDoor).then(res => { setVehicleProductionBodyStyleList(res) });
  }

  async function getvehicleProductionBodyStyleList() {
    setLoading(true);
    try {
      await getVehicleProductionBodyStyleList(vehicleProductionBodyStyle, numberOfArticulatingDoors, rearDoor).then(res => {
        setVehicleProductionBodyStyleList(res)
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
      Notification('Vehicle production body style saved successfully!', 'SUCCESS')
      getvehicleProductionBodyStyleList();
    }
    else {
      Notification(message, 'ERROR')
    }
  }

  const columns = [
    {
      dataField: "vehicleProductionBodyStyleId",
      text: "vehicleProductionBodyStyleId",
      sort: true,
      hidden: true,
    },
    {
    dataField: "vehicleProductionBodyStyle",
    text: "Vehicle production body style",
    sort: true,
    style: {
      width: '8%'
    }
  },
  {
    dataField: "numberOfArticulatingDoors",
    text: "Number Of Articulating Doors",
    sort: true,
    style: {
      width: '10%',
      textAlign: 'left'
    }
  },
  {
    dataField: "rearDoor",
    text: "Rear Door",
    sort: true,
    style: {
      width: '6%',
      textAlign: 'left'
    }
  },
  {
    dataField: "example",
    text: "Example",
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
      width: '63%',
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
        <a href={vehicleProductionBodyStyleList.value} style={{ display: 'inline-flex' }} >
          <button title="Edit" type="button" onClick={() => { setCurrentVehicleProductionBodyStyleId(columns.vehicleProductionBodyStyleId); handleShow() }} size="sm" className="icone-button"><i className="icon-pencil3 dark-grey"></i></button>
          <button title='Delete' type="button" onClick={() => { setCurrentVehicleProductionBodyStyleId(columns.vehicleProductionBodyStyleId); setShowConfirm(true) }} className="icone-button"><i className="icon-trash dark-grey"></i></button>
        </a>
      </div>
    )
  },
  ]
 
  return (
    <>
      {show && <AddEditVehicleProductionBodyStyle onDataSave={onDataSave} vehicleProductionBodyStyleId={currentVehicleProductionBodyStyleId} />}
      <ToastContainer />
      <ListGroup>
        <ListGroup.Item>
          <Navbar collapseOnSelect expand="sm" variant="dark" className='search-card'>
            <Navbar.Brand style={{ color: 'black' }}><BsFileEarmarkText /> Vehicle Production Body Style </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto"></Nav>
              <Nav>
                <Navbar.Brand style={{ color: 'black' }}><Button className='btn' variant="danger" type='button' size="sm" onClick={() => { setCurrentVehicleProductionBodyStyleId(0); handleShow() }} >+ Add Vehicle production body style</Button></Navbar.Brand>
              </Nav>
            </Navbar.Collapse>
          </Navbar >
        </ListGroup.Item>
        <ListGroup.Item>
          <Card className="search-panel-card">
            <Form onSubmit={(event) => handleSearch(event)}>
              <Row className="main-class">
                <Col sm={3} className='display-inline pl-0'>
                <Form.Label className='display-inline search-label'>Vehicle production body style</Form.Label>
                   <Form.Control type="text" value={vehicleProductionBodyStyle} onChange={(e) => setVehicleProductionBodyStyle(e.target.value)} />
                </Col>

                <Col sm={4} className='display-inline pl-2'>
                  <Form.Label className='display-inline search-label'>Number Of Articulating Doors </Form.Label>
                  <Form.Control type="text" value={numberOfArticulatingDoors} onChange={(e) => setNumberOfArticulatingDoorsStyle(e.target.value)} />
                </Col>

                <Col sm={3} className='display-inline pl-2'>
                  <Form.Label className='display-inline search-label'>Rear Door</Form.Label>
                  <Form.Control type="text" value={rearDoor} onChange={(e) => setRearDoor(e.target.value)} />
                </Col>

                <Col sm={1} className='display-inline pl-2'>
                  <Button className='btn btn-primary mr-5' type="submit" onClick={(event) => handleSearch(event)}>Search</Button>
                  <Button onClick={(event) => handleReset(event)} type="submit" className='btn btn-dft'>Reset</Button>
                </Col>
              </Row>
            </Form>
           
          </Card>
          <div className='tablecard'>
            <BootstrapTable size="sm"
              keyField={'vehicleProductionBodyStyleId'}
              id='tbl_vehicleProductionBodyStyle'
              data={vehicleProductionBodyStyleList}
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
        message={"Are you sure you want to delete this vehicle production body style?"}
        onSuccess={handleConfirm}
        onCancel={bootboxClose}
        onClose={bootboxClose}
      />
    </>
  )
}