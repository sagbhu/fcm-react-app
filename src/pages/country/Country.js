import '../../assets/styles/App.css';
import 'react-toastify/dist/ReactToastify.css';
import ListGroup from 'react-bootstrap/ListGroup';
import React, { useState, useEffect } from "react";
import { Nav, Navbar, Button, Form, Col, Row, Card } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { BsFileEarmarkText } from "react-icons/bs";
import { getCountryNameList, deleteCountryName } from "../../services/CountryService.js"
import AddEditCountry from '../country/AddEditCountry.js'
import Bootbox from 'bootbox-react'
import { Notification } from "../../components/Notification.js";
import { useLoading } from '../../LoadingContext.js';

export default function Country() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [currentCountryId, setCurrentCountryId] = useState(null);
  const [countryNameList, setCountryNameList] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const bootboxClose = () => setShowConfirm(false);
  const [countryName, setCountryName] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const { setLoading } = useLoading();

  async function handleConfirm() {
    let message = '';
    setShowConfirm(false);
    setLoading(true);
    try {
      await deleteCountryName(currentCountryId).then(res => { message = res });
    }
    catch (error) {
      message = error.message;
    }
    finally {
      if (message == 'SUCCESS') {
        Notification('Country deleted successfully!', 'success')
      } else {
        Notification(message, 'ERROR')
      }
      setCurrentCountryId(null);
      setLoading(false);
    }

    getcountryNameList();

  }

  const handleSearch = (e) => {
    e.preventDefault();
    getcountryNameList();
  };

  useEffect(() => {
    getcountryNameList();
  }, [])

  async function handleReset(e) {
    e.preventDefault();
    setCountryName("");
    setCountryCode("");
    await getCountryNameList('', '').then(res => { setCountryNameList(res) });
  }

  async function getcountryNameList() {
    setLoading(true);
    try {
      await getCountryNameList(countryName, countryCode).then(res => {
        setCountryNameList(res)
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
      Notification('Country saved successfully!', 'SUCCESS')
      getcountryNameList();
    }
    else {
      Notification(message, 'ERROR')
    }
  }
  
  const columns = [
    {
      dataField: "countryId",
      text: "countryId",
      sort: true,
      hidden: true,
      style: {
        width: '46%'
      }
    },
    {
    dataField: "countryName",
    text: "Country Name",
    sort: true,
    style: {
      width: '46%'
    }
  },
  {
    dataField: "iso2CountryCode",
    text: "Country Code",
    sort: true,
    style: {
      width: '46%',
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
        <a href={countryNameList.value} style={{ display: 'inline-flex' }} >
          <button title="Edit" type="button" onClick={() => { setCurrentCountryId(columns.countryId); handleShow() }} size="sm" className="icone-button"><i className="icon-pencil3 dark-grey"></i></button>
          <button title='Delete' type="button" onClick={() => { setCurrentCountryId(columns.countryId); setShowConfirm(true) }} className="icone-button"><i className="icon-trash dark-grey"></i></button>
        </a>
      </div>
    )
  },
  ]
 
  return (
    <>
      {show && <AddEditCountry onDataSave={onDataSave} countryId={currentCountryId} />}
      <ToastContainer />
      <ListGroup>
        <ListGroup.Item>
          <Navbar collapseOnSelect expand="sm" variant="dark" className='search-card'>
            <Navbar.Brand style={{ color: 'black' }}><BsFileEarmarkText /> Country </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto"></Nav>
              <Nav>
                <Navbar.Brand style={{ color: 'black' }}><Button className='btn' variant="danger" type='button' size="sm" onClick={() => { setCurrentCountryId(0); handleShow() }} >+ Add Country</Button></Navbar.Brand>
              </Nav>
            </Navbar.Collapse>
          </Navbar >
        </ListGroup.Item>
        <ListGroup.Item>
          <Card className="search-panel-card">
            <Form onSubmit={(event) => handleSearch(event)}>
              <Row className="main-class">
                <Col xs={3} className='display-inline pl-0' >
                  <Form.Label className='display-inline search-label'>Country Name</Form.Label>
                  <Form.Control type="text" value={countryName} onChange={(e) => setCountryName(e.target.value)} />
                </Col>
                <Col xs={3} className='display-inline pl-0' >
                  <Form.Label className='display-inline search-label'>Country Code</Form.Label>
                  <Form.Control type="text" value={countryCode} onChange={(e) => setCountryCode(e.target.value)} />
                </Col>

                <Col xs={5} className='display-inline pl-2'>
                  <Button type="submit" className='btn btn-primary mr-5' onClick={(event) => handleSearch(event)} >Search</Button>
                  <Button onClick={(event) => handleReset(event)} className='btn btn-dft'>Reset</Button>
                </Col>
              </Row>
            </Form>
          </Card>
          <div className='tablecard'>
            <BootstrapTable size="sm"
              keyField={'countryId'}
              id='tbl_countryName'
              data={countryNameList}
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
        message={"Are you sure you want to delete this country?"}
        onSuccess={handleConfirm}
        onCancel={bootboxClose}
        onClose={bootboxClose}
      />
    </>
  )
}