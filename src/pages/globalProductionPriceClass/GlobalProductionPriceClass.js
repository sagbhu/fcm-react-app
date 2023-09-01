import '../../assets/styles/App.css';
import 'react-toastify/dist/ReactToastify.css';
import ListGroup from 'react-bootstrap/ListGroup';
import React, { useState, useEffect } from "react";
import { Nav, Navbar, Button, Form, Col, Row, Card } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { BsFileEarmarkText } from "react-icons/bs";
import { getVehicleProductionPriceClassList, deleteVehicleProductionPriceClass } from "../../services/GlobalProductionPriceClassService"
import AddEditGlobalProductionPriceClass from '../globalProductionPriceClass/AddEditGlobalProductionPriceClass'
import Bootbox from 'bootbox-react'
import { Notification } from "../../components/Notification.js";
import { useLoading } from '../../LoadingContext.js';

export default function GlobalProductionPriceClass() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [currentVehicleProductionPriceClassId, setCurrentVehicleProductionPriceClassId] = useState(null);
  const [vehicleProductionPriceClassList, setVehicleProductionPriceClassList] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const bootboxClose = () => setShowConfirm(false);
  const [vehicleProductionPriceClass, setVehicleProductionPriceClass] = useState("");
  const { setLoading } = useLoading();


  // async function handleConfirm() {
  //   var response = await deleteUser(currentUserId).then(res => res);
  //   if (response == 'SUCCESS') {
  //     Notification('User Deleted Successfully!', 'success')
  //   }
  //   setCurrentUserId(null);
  //   setShowConfirm(false);
  //   getUserDataList();
  // }



  async function handleConfirm() {
    let message = '';
    setShowConfirm(false);
    setLoading(true);
    try {
      await deleteVehicleProductionPriceClass(currentVehicleProductionPriceClassId).then(res => { message = res });
    }
    catch (error) {
      message = error.message;
    }
    finally {
      if (message == 'SUCCESS') {
        Notification('Global production price class deleted successfully!', 'success')
      } else {
        Notification(message, 'ERROR')
      }
      setCurrentVehicleProductionPriceClassId(null);
      setLoading(false);
    }

    getvehicleProductionPriceClassList();

  }

  const handleSearch = (e) => {
    e.preventDefault();
    getvehicleProductionPriceClassList();
  };

  useEffect(() => {
    getvehicleProductionPriceClassList();
  }, [])

  async function handleReset(e) {
    e.preventDefault();
    setVehicleProductionPriceClass("");
    await getVehicleProductionPriceClassList("").then(res => { setVehicleProductionPriceClassList(res) });
  }

  async function getvehicleProductionPriceClassList() {
    setLoading(true);
    try {
      await getVehicleProductionPriceClassList(vehicleProductionPriceClass).then(res => {
        setVehicleProductionPriceClassList(res)
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
      Notification('Global production price class saved successfully!', 'SUCCESS')
      getvehicleProductionPriceClassList();
    }
    else {
      Notification(message, 'ERROR')
    }
  }
  
  const columns = [
    {
      dataField: "vehicleProductionPriceClassId",
      text: "vehicleProductionPriceClassId",
      sort: true,
      hidden: true,
      style: {
        width: '15%'
      }
    },
    {
    dataField: "vehicleProductionPriceClass",
    text: "Global Production Price Class",
    sort: true,
    style: {
      width: '12%'
    }
  },
  {
    dataField: "description",
    text: "Description ",
    sort: true,
    style: {
      width: '80%',
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
        <a href={vehicleProductionPriceClassList.value} style={{ display: 'inline-flex' }} >
          <button title="Edit" type="button" onClick={() => { setCurrentVehicleProductionPriceClassId(columns.vehicleProductionPriceClassId); handleShow() }} size="sm" className="icone-button"><i className="icon-pencil3 dark-grey"></i></button>
          <button title='Delete' type="button" onClick={() => { setCurrentVehicleProductionPriceClassId(columns.vehicleProductionPriceClassId); setShowConfirm(true) }} className="icone-button"><i className="icon-trash dark-grey"></i></button>
        </a>
      </div>
    )
  },
  ]
 
  return (
    <>
      {show && <AddEditGlobalProductionPriceClass onDataSave={onDataSave} vehicleProductionPriceClassId={currentVehicleProductionPriceClassId} />}
      <ToastContainer />
      <ListGroup>
        <ListGroup.Item>
          <Navbar collapseOnSelect expand="sm" variant="dark" className='search-card'>
            <Navbar.Brand style={{ color: 'black' }}><BsFileEarmarkText /> Global Production Price Class </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto"></Nav>
              <Nav>
                <Navbar.Brand style={{ color: 'black' }}><Button className='btn' variant="danger" type='button' size="sm" onClick={() => { setCurrentVehicleProductionPriceClassId(0); handleShow() }} >+ Add Global Production Price Class</Button></Navbar.Brand>
              </Nav>
            </Navbar.Collapse>
          </Navbar >
        </ListGroup.Item>
        <ListGroup.Item>
          <Card className="search-panel-card">
            <Form onSubmit={(event) => handleSearch(event)}>
              <Row className="main-class">
                <Col xs={4} className='display-inline pl-0' >
                  <Form.Label className='display-inline search-label'>Global Production Price Class</Form.Label>
                  <Form.Control type="text" value={vehicleProductionPriceClass} onChange={(e) => setVehicleProductionPriceClass(e.target.value)} />
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
              keyField={'vehicleProductionPriceClassId'}
              id='tbl_vehicleProductionPriceClass'
              data={vehicleProductionPriceClassList}
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
        message={"Are you sure you want to delete this global production price class?"}
        onSuccess={handleConfirm}
        onCancel={bootboxClose}
        onClose={bootboxClose}
      />
    </>
  )
}