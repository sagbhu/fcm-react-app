import '../../assets/styles/App.css';
import 'react-toastify/dist/ReactToastify.css';
import ListGroup from 'react-bootstrap/ListGroup';
import React, { useState, useEffect } from "react";
import { Nav, Navbar, Button, Form, Col, Row, Card } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { BsFileEarmarkText } from "react-icons/bs";
import { getBatteryTypeList, deleteBatteryType } from "../../services/AlternativePropulsionBatteryTypeService"
import AddEditAlternativePropulsionBatteryType from '../alternativePropulsionBatteryType/AddEditAlternativePropulsionBatteryType.js'
import Bootbox from 'bootbox-react'
import { Notification } from "../../components/Notification.js";
import { useLoading } from '../../LoadingContext.js';

export default function AlternativePropulsionBatteryType() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [currentBatteryTypeId, setCurrentBatteryTypeId] = useState(null);
  const [batteryTypeList, setBatteryTypeList] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const bootboxClose = () => setShowConfirm(false);
  const [alternativepropulsionbatterytype, setAlternativepropulsionbatterytype] = useState("");

  const { setLoading } = useLoading();

  async function handleConfirm() {
    let message = '';
    setShowConfirm(false);
    setLoading(true);
    try {
      await deleteBatteryType(currentBatteryTypeId).then(res => { message = res });
    }
    catch (error) {
      message = error.message;
    }
    finally {
      if (message == 'SUCCESS') {
        Notification('Alternative Propulsion battery type deleted successfully!', 'success')
      } else {
        Notification(message, 'ERROR')
      }
      setCurrentBatteryTypeId(null);
      setLoading(false);
    }

    getPropulsionBatteryList();

  }

  const handleSearch = (e) => {
    e.preventDefault();
    getPropulsionBatteryList();
  };

  useEffect(() => {
    getPropulsionBatteryList();
  }, [])

  async function handleReset(e) {
    e.preventDefault();
    setAlternativepropulsionbatterytype("");
    await getBatteryTypeList("").then(res => { setBatteryTypeList(res) });
  }

  async function getPropulsionBatteryList() {
    setLoading(true);
    try {
      await getBatteryTypeList(alternativepropulsionbatterytype).then(res => {
        setBatteryTypeList(res)
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
      Notification('alternative propulsion battery type saved successfully!', 'SUCCESS')
      getPropulsionBatteryList();
    }
    else {
      Notification(message, 'ERROR')
    }
  }

  const columns = [{
    dataField: "alternativePropulsionBatteryTypeId",
    text: "alternativePropulsionBatteryTypeId",
    sort: true,
    hidden: true,
    style: {
      width: '14%'
    }
  },{
    dataField: "alternativePropulsionBatteryType",
    text: "Alternative Propulsion Battery Type",
    sort: true,
    style: {
      width: '14%'
    }
  },
  {
    dataField: "description",
    text: "Description ",
    sort: true,
    style: {
      width: '78%',
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
        <a href={batteryTypeList.value} style={{ display: 'inline-flex' }} >
          <button title="Edit" type="button" onClick={() => { setCurrentBatteryTypeId(columns.alternativePropulsionBatteryTypeId); handleShow() }} size="sm" className="icone-button"><i className="icon-pencil3 dark-grey"></i></button>
          <button title='Delete' type="button" onClick={() => { setCurrentBatteryTypeId(columns.alternativePropulsionBatteryTypeId); setShowConfirm(true) }} className="icone-button"><i className="icon-trash dark-grey"></i></button>
        </a>
      </div>
    )
  },
  ]
 
  return (
    <>
      {show && <AddEditAlternativePropulsionBatteryType onDataSave={onDataSave} alternativePropulsionBatteryTypeId={currentBatteryTypeId} />}
      <ToastContainer />
      <ListGroup>
        <ListGroup.Item>
          <Navbar collapseOnSelect expand="sm" variant="dark" className='search-card'>
            <Navbar.Brand style={{ color: 'black' }}><BsFileEarmarkText /> Alternative Propulsion Battery Type </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto"></Nav>
              <Nav>
                <Navbar.Brand style={{ color: 'black' }}><Button className='btn' variant="danger" type='button' size="sm" onClick={() => { setCurrentBatteryTypeId(0); handleShow() }} >+ Add Alternative Propulsion Battery Type</Button></Navbar.Brand>
              </Nav>
            </Navbar.Collapse>
          </Navbar >
        </ListGroup.Item>
        <ListGroup.Item>
          <Card className="search-panel-card">
            <Form onSubmit={(event) => handleSearch(event)}>
              <Row className="main-class">
                <Col xs={4} className='display-inline pl-0' >
                  <Form.Label className='display-inline search-label'>Alternative Propulsion Battery Type</Form.Label>
                  <Form.Control type="text" value={alternativepropulsionbatterytype} onChange={(e) => setAlternativepropulsionbatterytype(e.target.value)} />
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
              keyField={'alternativePropulsionBatteryTypeId'}
              id='tbl_batteryType'
              data={batteryTypeList}
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
        message={"Are you sure you want to delete this alternative propulsion battery type?"}
        onSuccess={handleConfirm}
        onCancel={bootboxClose}
        onClose={bootboxClose}
      />
    </>
  )
}