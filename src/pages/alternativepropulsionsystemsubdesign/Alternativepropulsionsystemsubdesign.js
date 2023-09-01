import '../../assets/styles/App.css';
import 'react-toastify/dist/ReactToastify.css';
import ListGroup from 'react-bootstrap/ListGroup';
import React, { useState, useEffect } from "react";
import { Nav, Navbar, Button, Form, Col, Row, Card } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { BsFileEarmarkText } from "react-icons/bs";
import { getSubDesignList, deleteSubDesign } from "../../services/AlternativepropulsionsystemsubdesignService.js";
import AddEditAlternativepropulsionsystemsubdesign from '../alternativepropulsionsystemsubdesign/AddEditAlternativepropulsionsystemsubdesign.js';
import Bootbox from 'bootbox-react'
import { Notification } from "../../components/Notification.js";
import { useLoading } from '../../LoadingContext.js';

export default function Alternativepropulsionsystemsubdesign() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [currentSystemSubDesignId, setCurrentSystemSubDesignId] = useState(null);
  const [systemSubDesignList, setSystemSubDesignList] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const bootboxClose = () => setShowConfirm(false);
  const [alternativePropulsionSystemSubDesign, setAlternativePropulsionSystemSubDesign] = useState("");
  const { setLoading } = useLoading();

  async function handleConfirm() {
    let message = '';
    setShowConfirm(false);
    setLoading(true);
    try {
      await deleteSubDesign(currentSystemSubDesignId).then(res => { message = res });
    }
    catch (error) {
      message = error.message;
    }
    finally {
      if (message == 'SUCCESS') {
        Notification('Alternative propulsion system sub design deleted successfully!', 'success')
      } else {
        Notification(message, 'ERROR')
      }
      setCurrentSystemSubDesignId(null);
      setLoading(false);
    }

    getSystemSubDesignList();

  }

  const handleSearch = (e) => {
    e.preventDefault();
    getSystemSubDesignList();
  };

  useEffect(() => {
    getSystemSubDesignList();
  }, [])

  async function handleReset(e) {
    e.preventDefault();
    setAlternativePropulsionSystemSubDesign("");
    await getSubDesignList("").then(res => { setSystemSubDesignList(res) });
  }

  async function getSystemSubDesignList() {
    setLoading(true);
    try {
      await getSubDesignList(alternativePropulsionSystemSubDesign).then(res => {
        setSystemSubDesignList(res)
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
      Notification('Alternative propulsion system sub design saved successfully!', 'SUCCESS')
      getSystemSubDesignList();
    }
    else {
      Notification(message, 'ERROR')
    }
  }
  
  const columns = [{
    dataField: "alternativePropulsionSystemSubDesignId",
    text: "alternativePropulsionSystemSubDesignId",
    sort: true,
    hidden: true,
    style: {
      width: '17%'
    }
  },
  {
    dataField: "alternativePropulsionSystemSubDesign",
    text: "Alternative Propulsion System Sub Design",
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
        <a href={systemSubDesignList.value} style={{ display: 'inline-flex' }} >
          <button title="Edit" type="button" onClick={() => { setCurrentSystemSubDesignId(columns.alternativePropulsionSystemSubDesignId); handleShow() }} size="sm" className="icone-button"><i className="icon-pencil3 dark-grey"></i></button>
          <button title='Delete' type="button" onClick={() => { setCurrentSystemSubDesignId(columns.alternativePropulsionSystemSubDesignId); setShowConfirm(true) }} className="icone-button"><i className="icon-trash dark-grey"></i></button>
        </a>
      </div>
    )
  },
  ]
 
  return (
    <>
      {show && <AddEditAlternativepropulsionsystemsubdesign onDataSave={onDataSave} alternativePropulsionSystemSubDesignId={currentSystemSubDesignId} />}
      <ToastContainer />
      <ListGroup>
        <ListGroup.Item>
          <Navbar collapseOnSelect expand="sm" variant="dark" className='search-card'>
            <Navbar.Brand style={{ color: 'black' }}><BsFileEarmarkText /> Alternative Propulsion System Sub Design </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto"></Nav>
              <Nav>
                <Navbar.Brand style={{ color: 'black' }}><Button className='btn' variant="danger" type='button' size="sm" onClick={() => { setCurrentSystemSubDesignId(0); handleShow() }} >+ Add Alternative Propulsion System Sub Design</Button></Navbar.Brand>
              </Nav>
            </Navbar.Collapse>
          </Navbar >
        </ListGroup.Item>
        <ListGroup.Item>
          <Card className="search-panel-card">
            <Form onSubmit={(event) => handleSearch(event)}>
              <Row className="main-class">
                <Col xs={4} className='display-inline pl-0' >
                  <Form.Label className='display-inline search-label'>Alternative Propulsion System Sub Design</Form.Label>
                  <Form.Control type="text" value={alternativePropulsionSystemSubDesign} onChange={(e) => setAlternativePropulsionSystemSubDesign(e.target.value)} />
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
              keyField={'alternativePropulsionSystemSubDesignId'}
              id='tbl_systemSubDesign'
              data={systemSubDesignList}
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
        message={"Are you sure you want to delete this alternative propulsion system sub design?"}
        onSuccess={handleConfirm}
        onCancel={bootboxClose}
        onClose={bootboxClose}
      />
    </>
  )
}