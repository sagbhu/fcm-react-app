import '../../assets/styles/App.css';
import 'react-toastify/dist/ReactToastify.css';
import ListGroup from 'react-bootstrap/ListGroup';
import React, { useState, useEffect } from "react";
import { Nav, Navbar, Button, Form, Col, Row, Card } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { BsFileEarmarkText } from "react-icons/bs";
import { getTransmissionDesignList, deleteTransmissionDesign } from "../../services/TransmissionDesignService.js";
import AddEditTransmissionDesign from './AddEditTransmissionDesign';
import Bootbox from 'bootbox-react';
import { Notification } from "../../components/Notification.js";
import { useLoading } from '../../LoadingContext.js';

export default function TransmissionDesign() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [currentTransmissionDesignId, setCurrentTransmissionDesignId] = useState(null);
  const [transmissionDesignList, setTransmissionDesignList] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const bootboxClose = () => setShowConfirm(false);
  const [transmissionDesign, setTransmissionDesign] = useState("");
  const [transmissionSubDesign, setTransmissionSubDesign] = useState("");
  const { setLoading } = useLoading();

  async function handleConfirm() {
    let message = '';
    setShowConfirm(false);
    setLoading(true);
    try {
      await deleteTransmissionDesign(currentTransmissionDesignId).then(res => { message = res });
    }
    catch (error) {
      message = error.message;
    }
    finally {
      if (message == 'SUCCESS') {
        Notification('Transmission design deleted successfully!', 'success')
      } else {
        Notification(message, 'ERROR')
      }
      setCurrentTransmissionDesignId(null);
      setLoading(false);
    }

    gettransmissionDesignList();

  }

  const handleSearch = (e) => {
    e.preventDefault();
    gettransmissionDesignList();
  };

  useEffect(() => {
    gettransmissionDesignList();
  }, [])

  async function handleReset(e) {
    // e.preventDefault();
    setTransmissionDesign("");
    setTransmissionSubDesign("");
    await getTransmissionDesignList('', '').then(res => { setTransmissionDesignList(res) });
  }

  async function gettransmissionDesignList() {
    setLoading(true);
    try {
      await getTransmissionDesignList(transmissionDesign, transmissionSubDesign).then(res => {
        setTransmissionDesignList(res)
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
      Notification('Transmission design saved successfully!', 'SUCCESS')
      gettransmissionDesignList();
    }
    else {
      Notification(message, 'ERROR')
    }
  }
  
  const columns = [
    {
      dataField: "transmissionDesignId",
      text: "transmissionDesignId",
      sort: true,
      hidden: true,
      style: {
        width: '10%'
      }
    },
    {
    dataField: "transmissionDesign",
    text: "Transmission Design",
    sort: true,
    style: {
      width: '10%'
    }
  },
  {
    dataField: "transmissionSubDesign",
    text: "Transmission Sub Design",
    sort: true,
    style: {
      width: '11%',
      textAlign: 'left'
    }
  },
  {
    dataField: "description",
    text: "Description ",
    sort: true,
    style: {
      width: '71%',
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
        <a href={transmissionDesignList.value} style={{ display: 'inline-flex' }} >
          <button title="Edit" type="button" onClick={() => { setCurrentTransmissionDesignId(columns.transmissionDesignId); handleShow() }} size="sm" className="icone-button"><i className="icon-pencil3 dark-grey"></i></button>
          <button title='Delete' type="button" onClick={() => { setCurrentTransmissionDesignId(columns.transmissionDesignId); setShowConfirm(true) }} className="icone-button"><i className="icon-trash dark-grey"></i></button>
        </a>
      </div>
    )
  },
  ]
 
  return (
    <>
      {show && <AddEditTransmissionDesign onDataSave={onDataSave} transmissionDesignId={currentTransmissionDesignId} />}
      <ToastContainer />
      <ListGroup>
        <ListGroup.Item>
          <Navbar collapseOnSelect expand="sm" variant="dark" className='search-card'>
            <Navbar.Brand style={{ color: 'black' }}><BsFileEarmarkText /> Transmission Design </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto"></Nav>
              <Nav>
                <Navbar.Brand style={{ color: 'black' }}><Button className='btn' variant="danger" type='button' size="sm" onClick={() => { setCurrentTransmissionDesignId(0); handleShow() }} >+ Add Transmission Design</Button></Navbar.Brand>
              </Nav>
            </Navbar.Collapse>
          </Navbar >
        </ListGroup.Item>
        <ListGroup.Item>
          <Card className="search-panel-card">
            <Form onSubmit={(event) => handleSearch(event)}>
              <Row className="main-class">
                <Col xs={3} className='display-inline pl-0' >
                  <Form.Label className='display-inline search-label'>Transmission Design</Form.Label>
                  <Form.Control type="text" value={transmissionDesign} onChange={(e) => setTransmissionDesign(e.target.value)} />
                </Col>
                <Col xs={3} className='display-inline pl-0' >
                  <Form.Label className='display-inline search-label'>Transmission Sub Design</Form.Label>
                  <Form.Control type="text" value={transmissionSubDesign} onChange={(e) => setTransmissionSubDesign(e.target.value)} />
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
              keyField={'transmissionDesignId'}
              id='tbl_transmissionDesign'
              data={transmissionDesignList}
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
        message={"Are you sure you want to delete this transmission design?"}
        onSuccess={handleConfirm}
        onCancel={bootboxClose}
        onClose={bootboxClose}
      />
    </>
  )
}