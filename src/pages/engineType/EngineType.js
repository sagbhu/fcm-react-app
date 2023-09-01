import '../../assets/styles/App.css';
import React, { useState, useEffect, useFormik } from "react";
import { Nav, Navbar, Button, Form, Col, Row, Card, ListGroup } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { BsPencilFill, BsFileEarmarkText } from "react-icons/bs";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { getEngineList, deleteEngineType } from "../../services/EngineTypeService.js";
import AddEditEngineType from '../engineType/AddEditEngineType.js';
import Bootbox from 'bootbox-react';
import { Notification } from "../../components/Notification.js";
import { useLoading } from '../../LoadingContext.js';

export default function EngineType() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [currentEngineTypeId, setCurrentEngineTypeId] = useState(null);
  const [engineTypeList, setEngineTypeList] = useState([]);
  const [engineType, setEngineType] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const bootboxClose = () => setShowConfirm(false);
  const { setLoading } = useLoading();

  async function handleConfirm() {
    let message = '';
    setShowConfirm(false);
    setLoading(true);
    try {
      await deleteEngineType(currentEngineTypeId).then(res => { message = res });
    }
    catch (error) {
      message = error.message;
    }
    finally {
      if (message == 'SUCCESS') {
        Notification('Engine type deleted successfully!', 'success')
      } else {
        Notification(message, 'ERROR')
      }
      setCurrentEngineTypeId(null);
      setShowConfirm(false);
    }
    getEngineTypeList();
  }

  const handleSearch = (e) => {
    e.preventDefault();
    getEngineTypeList();
  };

  useEffect(() => {
    getEngineTypeList();
  }, [])

  async function handleReset(e) {
    e.preventDefault();
    setEngineType("");

    await getEngineList("").then(res => { setEngineTypeList(res) });
  }

  function onDataSave(isSubmitted, message) {
    handleClose();
    if (isSubmitted && message.toUpperCase() == "SUCCESS") {
      Notification('EngineType Saved Successfully!', 'SUCCESS')
      getEngineTypeList();
    }
    else {
      Notification(message, 'ERROR')
    }
  }


  function onDataSave(isSubmitted, message) {
    handleClose();
    if (isSubmitted && message.toUpperCase() == "SUCCESS") {
      Notification('Engine type saved successfully!', 'SUCCESS')
      getEngineTypeList();
    }
    else {
      Notification(message, 'ERROR')
    }
  }

  async function getEngineTypeList() {
    setLoading(true);
    try {
      await getEngineList(engineType).then(res => {
        setEngineTypeList(res)
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
      dataField: "engineTypeId",
      text: "engineTypeId",
      sort: true,
      hidden: true,
      style: {
        width: '10%'
      }
    },
    {
      dataField: "engineType",
      text: "Engine Type",
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
          <a href={engineTypeList.value} style={{ display: 'inline-flex' }}>

            <button title="Edit" type="button" onClick={() => { setCurrentEngineTypeId(columns.engineTypeId); handleShow() }} size="sm" className="icone-button"><i className="icon-pencil3 dark-grey"></i></button>
            <button title='Delete' type="button" onClick={() => { setCurrentEngineTypeId(columns.engineTypeId); setShowConfirm(true) }} className="icone-button"><i className="icon-trash dark-grey"></i></button>

          </a>
        </div>
      )
    },
  ]

  return (
    <>
      {show && <AddEditEngineType onDataSave={onDataSave} engineTypeId={currentEngineTypeId} />}
      <ToastContainer />
      <ListGroup>
        <ListGroup.Item>
          <Navbar collapseOnSelect expand="sm" variant="dark" className='search-card'>
            <Navbar.Brand style={{ color: 'black' }}><BsFileEarmarkText /> Engine Type </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto"></Nav>
              <Nav>
                <Navbar.Brand style={{ color: 'black' }}><Button variant="danger" className="btn" type='button' size="sm" onClick={() => { setCurrentEngineTypeId(0); handleShow() }} >+ Add Engine Type</Button></Navbar.Brand>
              </Nav>
            </Navbar.Collapse>
          </Navbar >
        </ListGroup.Item>
        <ListGroup.Item>

          <Card className="search-panel-card">
            <Form onSubmit={(event) => handleSearch(event)}>
              <Row className="main-class">
                <Col xs={3} className='display-inline pl-0'>
                  <Form.Label className='display-inline search-label'>Engine Type</Form.Label>
                  <Form.Control type="text" value={engineType} onChange={(e) => setEngineType(e.target.value)} />
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
                keyField={'engineTypeId'}
                id='tbl_engineType'
                data={engineTypeList}
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
        message={"Are you sure you want to delete this engine type?"}
        onSuccess={handleConfirm}
        onCancel={bootboxClose}
        onClose={bootboxClose}
      />

    </>
  )
}