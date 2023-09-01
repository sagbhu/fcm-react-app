import '../../assets/styles/App.css';
import 'react-toastify/dist/ReactToastify.css';
import ListGroup from 'react-bootstrap/ListGroup';
import React, { useState, useEffect } from "react";
import { Nav, Navbar, Button, Form, Col, Row, Card } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { BsFileEarmarkText } from "react-icons/bs";
import { getRegSalesSegmentList, deleteRegSalesSegment } from "../../services/RegSalesSegmentService.js"
import AddEditRegSalesSegment from '../regSalesSegment/AddEditRegSalesSegment.js'
import Bootbox from 'bootbox-react'
import { Notification } from "../../components/Notification.js";
import { useLoading } from '../../LoadingContext.js';

export default function RegSalesSegment() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [currentRegSalesSegmentId, setCurrentRegSalesSegmentId] = useState(null);
  const [regSalesSegmentList, setRegSalesSegmentList] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const bootboxClose = () => setShowConfirm(false);
  const [regSalesSegment, setRegSalesSegment] = useState("");
  const [regSalesPriceClass, setRegSalesPriceClass] = useState("");
  const { setLoading } = useLoading();
  
  async function handleConfirm() {
    let message = '';
    setShowConfirm(false);
    setLoading(true);
    try {
      await deleteRegSalesSegment(currentRegSalesSegmentId).then(res => { message = res });
    }
    catch (error) {
      message = error.message;
    }
    finally {
      if (message == 'SUCCESS') {
        Notification('Reg sales segment deleted successfully!', 'success')
      } else {
        Notification(message, 'ERROR')
      }
      setCurrentRegSalesSegmentId(null);
      setLoading(false);
    }

    getregSalesSegmentList();

  }

  const handleSearch = (e) => {
    e.preventDefault();
    getregSalesSegmentList();
  };

  useEffect(() => {
    getregSalesSegmentList();
  }, [])

  async function handleReset(e) {
    e.preventDefault();
    setRegSalesSegment("");
    setRegSalesPriceClass("");
    await getRegSalesSegmentList('', '').then(res => { setRegSalesSegmentList(res) });
  }

  async function getregSalesSegmentList() {
    setLoading(true);
    try {
      await getRegSalesSegmentList(regSalesSegment, regSalesPriceClass).then(res => {
        setRegSalesSegmentList(res)
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
      Notification('Reg sales segment saved successfully!', 'SUCCESS')
      getregSalesSegmentList();
    }
    else {
      Notification(message, 'ERROR')
    }
  }
  
  const columns = [
    {
      dataField: "regSalesSegmentId",
      text: "regSalesSegmentId",
      sort: true,
      hidden: true
    },
    {
    dataField: "regSalesSegment",
    text: "Reg Sales Segment",
    sort: true,
    style: {
      width: '9%'
    }
  },
  {
    dataField: "regSalesPriceClass",
    text: "Reg Sales Price Class ",
    sort: true,
    style: {
      width: '10%',
      textAlign: 'left'
    }
  },
  {
    dataField: "description",
    text: "Description ",
    sort: true,
    style: {
      width: '73%',
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
        <a href={regSalesSegmentList.value} style={{ display: 'inline-flex' }} >
          <button title="Edit" type="button" onClick={() => { setCurrentRegSalesSegmentId(columns.regSalesSegmentId); handleShow() }} size="sm" className="icone-button"><i className="icon-pencil3 dark-grey"></i></button>
          <button title='Delete' type="button" onClick={() => { setCurrentRegSalesSegmentId(columns.regSalesSegmentId); setShowConfirm(true) }} className="icone-button"><i className="icon-trash dark-grey"></i></button>
        </a>
      </div>
    )
  },
  ]
 
  return (
    <>
      {show && <AddEditRegSalesSegment onDataSave={onDataSave} regSalesSegmentId={currentRegSalesSegmentId} />}
      <ToastContainer />
      <ListGroup>
        <ListGroup.Item>
          <Navbar collapseOnSelect expand="sm" variant="dark" className='search-card'>
            <Navbar.Brand style={{ color: 'black' }}><BsFileEarmarkText /> Reg Sales Segment </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto"></Nav>
              <Nav>
                <Navbar.Brand style={{ color: 'black' }}><Button className='btn' variant="danger" type='button' size="sm" onClick={() => { setCurrentRegSalesSegmentId(0); handleShow() }} >+ Add Reg Sales Segment</Button></Navbar.Brand>
              </Nav>
            </Navbar.Collapse>
          </Navbar >
        </ListGroup.Item>
        <ListGroup.Item>
          <Card className="search-panel-card">
            <Form onSubmit={(event) => handleSearch(event)}>
              <Row className="main-class">
                <Col xs={3} className='display-inline pl-0' >
                  <Form.Label className='display-inline search-label'>Reg Sales Segment</Form.Label>
                  <Form.Control type="text" value={regSalesSegment} onChange={(e) => setRegSalesSegment(e.target.value)} />
                </Col>
                <Col xs={3} className='display-inline pl-0' >
                  <Form.Label className='display-inline search-label'>Reg Sales Price Class</Form.Label>
                  <Form.Control type="text" value={regSalesPriceClass} onChange={(e) => setRegSalesPriceClass(e.target.value)} />
                </Col>
                <Col xs={3} className='display-inline pl-2'>
                  <Button type="submit" className='btn btn-primary mr-5' onClick={(event) => handleSearch(event)} >Search</Button>
                  <Button onClick={(event) => handleReset(event)} className='btn btn-dft'>Reset</Button>
                </Col>
              </Row>
            </Form>
          </Card>
          <div className='tablecard'>
            <BootstrapTable size="sm"
              keyField={'regSalesSegmentId'}
              id='tbl_regSalesSegment'
              data={regSalesSegmentList}
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
        message={"Are you sure you want to delete this reg sales segment?"}
        onSuccess={handleConfirm}
        onCancel={bootboxClose}
        onClose={bootboxClose}
      />
    </>
  )
}