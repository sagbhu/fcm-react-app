import React, { useState, useEffect } from "react";
import { Nav, Navbar, Button, Form, Modal, Col, Row, Card, ListGroup } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { BsPencilFill, BsFileEarmarkText } from "react-icons/bs";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { getPropulsionList, deletePropulsionSystem } from "../../services/PropulsionSystemService.js";
import AddEditPropulsionSystem from './AddEditPropulsionSystem.js';
import Bootbox from 'bootbox-react';
import { Notification } from "../../components/Notification.js";
import { useLoading } from '../../LoadingContext.js';

export default function PropulsionSystem() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [currentpropulsionSystemId, setCurrentpropulsionSystemId] = useState(null);
  const [propulsionSystemList, setPropulsionSystemList] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [propulsionSystem, setPropulsionSystem] = useState("");
  const bootboxClose = () => setShowConfirm(false);
  const { setLoading } = useLoading();

  async function handleConfirm() {
    let message = '';
    setShowConfirm(false);
    setLoading(true);
    try {
      await deletePropulsionSystem(currentpropulsionSystemId).then(res => { message = res });
    }
    catch (error) {
      message = error.message;
    }
    finally {
      if (message == 'SUCCESS') {
        Notification('propulsion system deleted successfully!', 'success')
      } else {
        Notification(message, 'ERROR')
      }
      setCurrentpropulsionSystemId(null);
      setShowConfirm(false);
    }
    getPropulsionSystemList();
  }


  const handleSearch = (e) => {
    e.preventDefault();
    getPropulsionSystemList();
  };
  async function handleReset(e) {
    e.preventDefault();
    setPropulsionSystem("");

    await getPropulsionList("").then(res => { setPropulsionSystemList(res) });
  }
  useEffect(() => {
    getPropulsionSystemList();
  }, [])

  function onDataSave(isSubmitted, message) {
    handleClose();
    if (isSubmitted && message.toUpperCase() == "SUCCESS") {
      Notification('Propulsion system saved successfully!', 'SUCCESS')
      getPropulsionSystemList();
    }
    else {
      Notification(message, 'ERROR')
    }
  }

  async function getPropulsionSystemList() {
    setLoading(true);
    try {
      await getPropulsionList(propulsionSystem).then(res => {
        setPropulsionSystemList(res)
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
      dataField: "propulsionSystemId",
      text: "propulsionSystemId",
      sort: true,
      hidden: true,
      style: {
        width: '10%'
      }
    },
    {
    dataField: "propulsionSystem",
    text: "Propulsion System",
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
        <a href={propulsionSystemList.value} style={{ display: 'inline-flex' }}>
          <button title="Edit" type="button" onClick={() => { setCurrentpropulsionSystemId(columns.propulsionSystemId); handleShow() }} size="sm" className="icone-button"><i className="icon-pencil3 dark-grey"></i></button>
          <button title='Delete' type="button" onClick={() => { setCurrentpropulsionSystemId(columns.propulsionSystemId); setShowConfirm(true) }} className="icone-button"><i className="icon-trash dark-grey"></i></button>
        </a>
      </div>
    )
  },
  ]

  return (
    <>
      {show && <AddEditPropulsionSystem onDataSave={onDataSave} propulsionSystemId={currentpropulsionSystemId} />}
      <ToastContainer />
      <ListGroup>
        <ListGroup.Item>
          <Navbar collapseOnSelect expand="sm" variant="dark" className='search-card'>
            <Navbar.Brand style={{ color: 'black' }}><BsFileEarmarkText /> Propulsion System </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto"></Nav>
              <Nav>
                <Navbar.Brand style={{ color: 'black' }}><Button variant="danger" className="btn" type='button' size="sm" onClick={() => { setCurrentpropulsionSystemId(0); handleShow() }} >+ Add Propulsion </Button></Navbar.Brand>
              </Nav>
            </Navbar.Collapse>
          </Navbar >
        </ListGroup.Item>
        <ListGroup.Item>

          <Card className="search-panel-card">
            <Form onSubmit={(event) => handleSearch(event)}>
              <Row className="main-class">
                <Col xs={3} className='display-inline pl-0'>
                  <Form.Label className='display-inline search-label'> Propulsion System</Form.Label>
                  <Form.Control type="text" value={propulsionSystem} onChange={(e) => setPropulsionSystem(e.target.value)} />
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
              keyField={'propulsionSystemId'}
              id='tbl_propulsionSystem'
              data={propulsionSystemList}
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
        message={"Are you sure you want to delete this propulsion system?"}
        onSuccess={handleConfirm}
        onCancel={bootboxClose}
        onClose={bootboxClose}
      />
    </>
  )
}