import '../../assets/styles/App.css';
import 'react-toastify/dist/ReactToastify.css';
import ListGroup from 'react-bootstrap/ListGroup';
import React, { useState, useEffect } from "react";
import { Nav, Navbar, Button, Form, Col, Row, Card } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { BsFileEarmarkText } from "react-icons/bs";
import { getValvesCylList, deleteValvesCyl } from "../../services/EngineValvesCylService";
import AddEditEngineValvesCyl from '../engineValvesCyl/AddEditEngineValvesCyl.js';
import Bootbox from 'bootbox-react'
import { Notification } from "../../components/Notification.js";
import { useLoading } from '../../LoadingContext.js';

export default function EngineValvesCyl() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [currentValvesCylId, setcurrentValvesCylId] = useState(null);
  const [valvesCylList, setValvesCylList] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const bootboxClose = () => setShowConfirm(false);
  const [engineValvesCyl, setEngineValvesCyl] = useState("");
  const { setLoading } = useLoading();

  async function handleConfirm() {
    let message = '';
    setShowConfirm(false);
    setLoading(true);
    try {
      await deleteValvesCyl(currentValvesCylId).then(res => { message = res });
    }
    catch (error) {
      message = error.message;
    }
    finally {
      if (message == 'SUCCESS') {
        Notification('Engine valves cyl deleted successfully!', 'success')
      } else {
        Notification(message, 'ERROR')
      }
      setcurrentValvesCylId(null);
      setLoading(false);
    }

    getEngineValvesCylList();

  }

  const handleSearch = (e) => {
    e.preventDefault();
    getEngineValvesCylList();
  };

  useEffect(() => {
    getEngineValvesCylList();
  }, [])

  async function handleReset(e) {
    e.preventDefault();
    setEngineValvesCyl("");
    await getValvesCylList("").then(res => { setValvesCylList(res) });
  }

  async function getEngineValvesCylList() {
    setLoading(true);
    try {
      await getValvesCylList(engineValvesCyl).then(res => {
        setValvesCylList(res)
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
      Notification('Engine valves cyl saved successfully!', 'SUCCESS')
      getEngineValvesCylList();
    }
    else {
      Notification(message, 'ERROR')
    }
  }
  
  const columns = [
    {
      dataField: "engineValvesCylId",
      text: "engineValvesCylId",
      sort: true,
      hidden: true,
      style: {
        width: '10%'
      }
    },{
    dataField: "engineValvesCyl",
    text: "Engine Valves Cyl",
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
      width: '82%',
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
        <a href={valvesCylList.value} style={{ display: 'inline-flex' }} >
          <button title="Edit" type="button" onClick={() => { setcurrentValvesCylId(columns.engineValvesCylId); handleShow() }} size="sm" className="icone-button"><i className="icon-pencil3 dark-grey"></i></button>
          <button title='Delete' type="button" onClick={() => { setcurrentValvesCylId(columns.engineValvesCylId); setShowConfirm(true) }} className="icone-button"><i className="icon-trash dark-grey"></i></button>
        </a>
      </div>
    )
  },
  ]
 
  return (
    <>
      {show && <AddEditEngineValvesCyl onDataSave={onDataSave} engineValvesCylId={currentValvesCylId} />}
      <ToastContainer />
      <ListGroup>
        <ListGroup.Item>
          <Navbar collapseOnSelect expand="sm" variant="dark" className='search-card'>
            <Navbar.Brand style={{ color: 'black' }}><BsFileEarmarkText /> Engine Valves Cyl </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto"></Nav>
              <Nav>
                <Navbar.Brand style={{ color: 'black' }}><Button className='btn' variant="danger" type='button' size="sm" onClick={() => { setcurrentValvesCylId(0); handleShow() }} >+ Add Engine Valves Cyl</Button></Navbar.Brand>
              </Nav>
            </Navbar.Collapse>
          </Navbar >
        </ListGroup.Item>
        <ListGroup.Item>
          <Card className="search-panel-card">
            <Form onSubmit={(event) => handleSearch(event)}>
              <Row className="main-class">
                <Col xs={3} className='display-inline pl-0' >
                  <Form.Label className='display-inline search-label'>Engine Valves Cyl</Form.Label>
                  <Form.Control type="text" value={engineValvesCyl} onChange={(e) => setEngineValvesCyl(e.target.value)} />
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
              keyField={'engineValvesCylId'}
              id='tbl_valvesCylList'
              data={valvesCylList}
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
        message={"Are you sure you want to delete this engine valves cyl?"}
        onSuccess={handleConfirm}
        onCancel={bootboxClose}
        onClose={bootboxClose}
      />
    </>
  )
}