import '../../assets/styles/App.css';
import 'react-toastify/dist/ReactToastify.css';
import ListGroup from 'react-bootstrap/ListGroup';
import React, { useState, useEffect } from "react";
import { Nav, Navbar, Button, Form, Col, Row, Card } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { BsFileEarmarkText } from "react-icons/bs";
import { getVehicleProductionShortTermRiskRatingList, deleteVehicleProductionShortTermRiskRating } from "../../services/VehicleProductionShortTermRiskRatingService.js"
import AddEditVehicleProductionShortTermRiskRating from '../vehicleProductionShortTermRiskRating/AddEditVehicleProductionShortTermRiskRating.js'
import Bootbox from 'bootbox-react'
import { Notification } from "../../components/Notification.js";
import { useLoading } from '../../LoadingContext.js';

export default function VehicleProductionShortTermRiskRating() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [currentVehicleProductionShortTermRiskRatingId, setCurrentVehicleProductionShortTermRiskRatingId] = useState(null);
  const [vehicleProductionShortTermRiskRatingList, setVehicleProductionShortTermRiskRatingList] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const bootboxClose = () => setShowConfirm(false);
  const [vehicleProductionShortTermRiskRating, setVehicleProductionShortTermRiskRating] = useState("");
  const { setLoading } = useLoading();

  async function handleConfirm() {
    let message = '';
    setShowConfirm(false);
    setLoading(true);
    try {
      await deleteVehicleProductionShortTermRiskRating(currentVehicleProductionShortTermRiskRatingId).then(res => { message = res });
    }
    catch (error) {
      message = error.message;
    }
    finally {
      if (message == 'SUCCESS') {
        Notification('Vehicle production short term risk rating deleted successfully!', 'success')
      } else {
        Notification(message, 'ERROR')
      }
      setCurrentVehicleProductionShortTermRiskRatingId(null);
      setLoading(false);
    }

    getvehicleProductionShortTermRiskRatingList();

  }

  const handleSearch = (e) => {
    e.preventDefault();
    getvehicleProductionShortTermRiskRatingList();
  };

  useEffect(() => {
    getvehicleProductionShortTermRiskRatingList();
  }, [])

  async function handleReset(e) {
    e.preventDefault();
    setVehicleProductionShortTermRiskRating("");
    await getVehicleProductionShortTermRiskRatingList("").then(res => { setVehicleProductionShortTermRiskRatingList(res) });
  }

  async function getvehicleProductionShortTermRiskRatingList() {
    setLoading(true);
    try {
      await getVehicleProductionShortTermRiskRatingList(vehicleProductionShortTermRiskRating).then(res => {
        setVehicleProductionShortTermRiskRatingList(res)
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
      Notification('Vehicle production short term risk rating saved successfully!', 'SUCCESS')
      getvehicleProductionShortTermRiskRatingList();
    }
    else {
      Notification(message, 'ERROR')
    }
  }

  
  const columns = [
    {
      dataField: "vehicleProductionShortTermRiskRatingId",
      text: "vehicleProductionShortTermRiskRatingId",
      sort: true,
      hidden: true
    },
    {
    dataField: "vehicleProductionShortTermRiskRating",
    text: "Vehicle Production Short Term Risk Rating",
    sort: true,
    style: {
      width: '17%'
    }
  },
  {
    dataField: "description",
    text: "Description ",
    sort: true,
    style: {
      width: '75%',
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
        <a href={vehicleProductionShortTermRiskRatingList.value} style={{ display: 'inline-flex' }} >
          <button title="Edit" type="button" onClick={() => { setCurrentVehicleProductionShortTermRiskRatingId(columns.vehicleProductionShortTermRiskRatingId); handleShow() }} size="sm" className="icone-button"><i className="icon-pencil3 dark-grey"></i></button>
          <button title='Delete' type="button" onClick={() => { setCurrentVehicleProductionShortTermRiskRatingId(columns.vehicleProductionShortTermRiskRatingId); setShowConfirm(true) }} className="icone-button"><i className="icon-trash dark-grey"></i></button>
        </a>
      </div>
    )
  },
  ]
 
  return (
    <>
      {show && <AddEditVehicleProductionShortTermRiskRating onDataSave={onDataSave} vehicleProductionShortTermRiskRatingId={currentVehicleProductionShortTermRiskRatingId} />}
      <ToastContainer />
      <ListGroup>
        <ListGroup.Item>
          <Navbar collapseOnSelect expand="sm" variant="dark" className='search-card'>
            <Navbar.Brand style={{ color: 'black' }}><BsFileEarmarkText /> Vehicle Production Short Term Risk Rating </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto"></Nav>
              <Nav>
                <Navbar.Brand style={{ color: 'black' }}><Button className='btn' variant="danger" type='button' size="sm" onClick={() => { setCurrentVehicleProductionShortTermRiskRatingId(0); handleShow() }} >+ Add Vehicle Production Short Term Risk Rating</Button></Navbar.Brand>
              </Nav>
            </Navbar.Collapse>
          </Navbar >
        </ListGroup.Item>
        <ListGroup.Item>
          <Card className="search-panel-card">
            <Form onSubmit={(event) => handleSearch(event)}>
              <Row className="main-class">
                <Col xs={4} className='display-inline pl-0' >
                  <Form.Label className='display-inline search-label'>Vehicle Production Short Term Risk Rating</Form.Label>
                  <Form.Control type="text" value={vehicleProductionShortTermRiskRating} onChange={(e) => setVehicleProductionShortTermRiskRating(e.target.value)} />
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
              keyField={'vehicleProductionShortTermRiskRatingId'}
              id='tbl_vehicleProductionShortTermRiskRating'
              data={vehicleProductionShortTermRiskRatingList}
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
        message={"Are you sure you want to delete this vehicle production short term risk rating?"}
        onSuccess={handleConfirm}
        onCancel={bootboxClose}
        onClose={bootboxClose}
      />
    </>
  )
}