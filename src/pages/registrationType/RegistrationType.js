import React, { useState, useEffect, useFormik } from "react";
import { Nav, Navbar, Button, Form, Col, Row, Card, ListGroup } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { BsPencilFill, BsFileEarmarkText } from "react-icons/bs";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { getRegistrationList, deleteRegistrationType } from "../../services/RegistrationTypeService.js";
import AddEditRegistrationType from './AddEditRegistrationType.js';
import Bootbox from 'bootbox-react';
import { Notification } from "../../components/Notification.js";
import { useLoading } from '../../LoadingContext.js';

export default function RegistrationType() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [currentRegistrationTypeId, setCurrentRegistrationTypeId] = useState(null);
  const [registrationTypeList, setRegistrationTypeList] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [registrationType, setRegistrationType] = useState("");
  const bootboxClose = () => setShowConfirm(false);
  const { setLoading } = useLoading();

  async function handleConfirm() {
    let message = '';
    setShowConfirm(false);
    setLoading(true);
    try {
      await deleteRegistrationType(currentRegistrationTypeId).then(res => { message = res });
    }
    catch (error) {
      message = error.message;
    }
    finally {
      if (message == 'SUCCESS') {
        Notification('Registration type deleted successfully!', 'success')
      } else {
        Notification(message, 'ERROR')
      }
      setCurrentRegistrationTypeId(null);
      setShowConfirm(false);
    }
    getregistrationTypeList();
  }

  const handleSearch = (e) => {
    e.preventDefault();
    getregistrationTypeList();
  };

  async function handleReset(e) {
    e.preventDefault();
    setRegistrationType("");

    await getRegistrationList("").then(res => { setRegistrationTypeList(res) });
  }

  useEffect(() => {
    getregistrationTypeList();
  }, [])

  function onDataSave(isSubmitted, message) {
    handleClose();
    if (isSubmitted && message.toUpperCase() == "SUCCESS") {
      Notification('Registration type saved successfully!', 'SUCCESS')
      getregistrationTypeList();
    }
    else {
      Notification(message, 'ERROR')
    }
  }

  async function getregistrationTypeList() {
    setLoading(true);
    try {
      await getRegistrationList(registrationType).then(res => {
        setRegistrationTypeList(res)
      });
    }
    catch (error) {
    }
    finally {
      setLoading(false);
    }
  }
  
  const columns = [
    {
      dataField: "registrationTypeId",
      text: "registrationTypeId",
      sort: true,
      hidden: true,
      style: {
        width: '10%'
      }
    },
    {
    dataField: "registrationType",
    text: "Registration Type",
    sort: true,
    style: {
      width: '10%'
    }
  },
  {
    dataField: "description",
    text: "Description ",
    sort: true,
    style: {
      width: '82%'
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
        <a href={registrationTypeList.value} style={{ display: 'inline-flex' }}>
          <button title="Edit" type="button" onClick={() => { setCurrentRegistrationTypeId(columns.registrationTypeId); handleShow() }} size="sm" className="icone-button"><i className="icon-pencil3 dark-grey"></i></button>
          <button title='Delete' type="button" onClick={() => { setCurrentRegistrationTypeId(columns.registrationTypeId); setShowConfirm(true) }} className="icone-button"><i className="icon-trash dark-grey"></i></button>
        </a>
      </div>
    )
  },
  ]

  const defaultSorted = [{
    dataField: 'registrationType',
    order: 'asc'
  }];

  return (
    <>
      {show && <AddEditRegistrationType onDataSave={onDataSave} registrationTypeId={currentRegistrationTypeId} />}
      <ToastContainer />
      <ListGroup>
        <ListGroup.Item>
          <Navbar collapseOnSelect expand="sm" variant="dark" className='search-card'>
            <Navbar.Brand style={{ color: 'black' }}><BsFileEarmarkText /> Registration Type </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto"></Nav>
              <Nav>
                <Navbar.Brand style={{ color: 'black' }}><Button variant="danger" className="btn" type='button' size="sm" onClick={() => { setCurrentRegistrationTypeId(0); handleShow() }} >+ Add Registration Type</Button></Navbar.Brand>
              </Nav>
            </Navbar.Collapse>
          </Navbar >
        </ListGroup.Item>

        <ListGroup.Item>
          <Card className="search-panel-card">
            <Form onSubmit={(event) => handleSearch(event)}>
              <Row className="main-class">
                <Col xs={3} className='display-inline pl-0'>
                  <Form.Label className='display-inline search-label'>Registration Type</Form.Label>
                  <Form.Control type="text" value={registrationType} onChange={(e) => setRegistrationType(e.target.value)} />
                </Col>
                <Col xs={8} className='display-inline pl-2'>
                  <Button className='btn btn-primary mr-5' type="submit" onClick={(event) => handleSearch(event)}>Search</Button>
                  <Button onClick={(event) => handleReset(event)} className='btn btn-dft' type="submit">Reset</Button>
                </Col>
              </Row>
            </Form>
          </Card>

          <div className="tablecard" >
            <BootstrapTable size="sm"
              keyField={'registrationTypeId'}
              id='tbl_fuelType'
              data={registrationTypeList}
              columns={columns}
              striped
              hover
              condensed
              noDataIndication="No records found" 
              pagination={paginationFactory()}
            />
          </div>
        </ListGroup.Item>
      </ListGroup>
      <Bootbox show={showConfirm}
        type={"confirm"}
        message={"Are you sure you want to delete this registration type?"}
        onSuccess={handleConfirm}
        onCancel={bootboxClose}
        onClose={bootboxClose}
      />
    </>
  )
}