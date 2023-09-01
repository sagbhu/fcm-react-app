import '../../assets/styles/App.css';
import 'react-toastify/dist/ReactToastify.css';
import ListGroup from 'react-bootstrap/ListGroup';
import React, { useState, useEffect } from "react";
import { Nav, Navbar, Button, Form, Col, Row, Card } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { BsFileEarmarkText } from "react-icons/bs";
import { getDriveList, deleteDrive } from "../../services/TransmissionDriveTypeService.js"
import AddEditTransmissionDriveType from '../transmissionDriveType/AddEditTransmissionDriveType.js'
import Bootbox from 'bootbox-react'
import { Notification } from "../../components/Notification.js";
import { useLoading } from '../../LoadingContext.js';

export default function TransmissionDriveType() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [currentTransmissionDriveTypeId, setCurrentTransmissionDriveTypeId] = useState(null);
  const [driveList, setDriveList] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const bootboxClose = () => setShowConfirm(false);
  const [transmissionDriveType, setTransmissionDriveType] = useState("");
  const { setLoading } = useLoading();

  async function handleConfirm() {
    let message = '';
    setShowConfirm(false);
    setLoading(true);
    try {
      await deleteDrive(currentTransmissionDriveTypeId).then(res => { message = res });
    }
    catch (error) {
      message = error.message;
    }
    finally {
      if (message == 'SUCCESS') {
        Notification('Transmission drive type deleted successfully!', 'success')
      } else {
        Notification(message, 'ERROR')
      }
      setCurrentTransmissionDriveTypeId(null);
      setLoading(false);
    }
    getTransmissionDriveTypeList();
  }

  const handleSearch = (e) => {
    e.preventDefault();
    getTransmissionDriveTypeList();
  };

  useEffect(() => {
    getTransmissionDriveTypeList();
  }, [])

  async function handleReset(e) {
    e.preventDefault();
    setTransmissionDriveType("");
    await getDriveList("").then(res => { setDriveList(res) });
  }

  async function getTransmissionDriveTypeList() {
    setLoading(true);
    try {
      await getDriveList(transmissionDriveType).then(res => {
        setDriveList(res)
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
      Notification('Transmission drive type saved successfully!', 'SUCCESS')
      getTransmissionDriveTypeList();
    }
    else {
      Notification(message, 'ERROR')
    }
  }

  
  const columns = [
    {
      dataField: "transmissionDriveTypeId",
      text: "transmissionDriveTypeId",
      sort: true,
      hidden: true,
      style: {
        width: '11%'
      }
    },
    {
    dataField: "transmissionDriveType",
    text: "Transmission Drive Type",
    sort: true,
    style: {
      width: '11%'
    }
  },
  {
    dataField: "description",
    text: "Description ",
    sort: true,
    style: {
      width: '81%',
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
        <a href={driveList.value} style={{ display: 'inline-flex' }} >
          <button title="Edit" type="button" onClick={() => { setCurrentTransmissionDriveTypeId(columns.transmissionDriveTypeId); handleShow() }} size="sm" className="icone-button"><i className="icon-pencil3 dark-grey"></i></button>
          <button title='Delete' type="button" onClick={() => { setCurrentTransmissionDriveTypeId(columns.transmissionDriveTypeId); setShowConfirm(true) }} className="icone-button"><i className="icon-trash dark-grey"></i></button>
        </a>
      </div>
    )
  },
  ]
 
  return (
    <>
      {show && <AddEditTransmissionDriveType onDataSave={onDataSave} transmissionDriveTypeId={currentTransmissionDriveTypeId} />}
      <ToastContainer />
      <ListGroup>
        <ListGroup.Item>
          <Navbar collapseOnSelect expand="sm" variant="dark" className='search-card'>
            <Navbar.Brand style={{ color: 'black' }}><BsFileEarmarkText /> Transmission Drive Type </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto"></Nav>
              <Nav>
                <Navbar.Brand style={{ color: 'black' }}><Button className='btn' variant="danger" type='button' size="sm" onClick={() => { setCurrentTransmissionDriveTypeId(0); handleShow() }} >+ Add Transmission Drive Type</Button></Navbar.Brand>
              </Nav>
            </Navbar.Collapse>
          </Navbar >
        </ListGroup.Item>
        <ListGroup.Item>
          <Card className="search-panel-card">
            <Form onSubmit={(event) => handleSearch(event)}>
              <Row className="main-class">
                <Col xs={3} className='display-inline pl-0' >
                  <Form.Label className='display-inline search-label'>Transmission Drive Type</Form.Label>
                  <Form.Control type="text" value={transmissionDriveType} onChange={(e) => setTransmissionDriveType(e.target.value)} />
                </Col>
                <Col xs={8} className='display-inline pl-2'>
                  <Button type="submit" className='btn btn-primary mr-5' onClick={(event) => handleSearch(event)} >Search</Button>
                  <Button onClick={(event) => handleReset(event)} className='btn btn-dft'>Reset</Button>
                </Col>
              </Row>
            </Form>
          </Card>
          <div className='tablecard'>
            <BootstrapTable size="sm"
              keyField={'transmissionDriveTypeId'}
              id='tbl_drive'
              data={driveList}
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
        message={"Are you sure you want to delete this transmission drive type?"}
        onSuccess={handleConfirm}
        onCancel={bootboxClose}
        onClose={bootboxClose}
      />
    </>
  )
}