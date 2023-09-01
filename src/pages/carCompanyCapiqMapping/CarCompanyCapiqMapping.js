import 'react-toastify/dist/ReactToastify.css';
import ListGroup from 'react-bootstrap/ListGroup';
import React, { useState, useEffect } from "react";
import { Nav, Navbar, NavDropdown, Button, Form, Modal, Col, Row, Container, Card } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { BsPencilFill, BsFileEarmarkCode } from "react-icons/bs";
import { getCapiqMappingList } from '../../services/CarCompanyCapiqMappingService.js';
import AddEditCapiqMapping from '../carCompanyCapiqMapping/AddEditCapiqMapping.js';
import { Notification } from "../../components/Notification.js";
import { useLoading } from '../../LoadingContext.js';
import Select from 'react-select';
import {mappingStatusData} from '../../config.js';

export default function CarCompanyCapiqMapping() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [currentCapiQMappingId, setCurrentCapiQMappingId] = useState(null);
  const [capiqMappingList, setCapiqMappingList] = useState([]);
  const [carCompanyName, setCarCompanyName] = useState("");
  const [capiqName, setCapiqName] = useState("");
  const [capiqId, setCapiqId] = useState("");
  const { setLoading } = useLoading();
  const [mappingStatus, setMappingStatus] = useState({label: "All", value: "0" });

  function StatusHandler(e) {    
    setMappingStatus(e);    
  }

  const handleSearch = (e) => {
    e.preventDefault();
    getCapiqMappingTypeList();
  };

  useEffect(() => {
    getCapiqMappingTypeList();
  }, [])

  async function handleReset(e) {
    // e.preventDefault();
    setMappingStatus({label: "All", value: "0" })
    setCarCompanyName("");
    setCapiqName("");
    setCapiqId("");
    await getCapiqMappingList(carCompanyName, capiqName, capiqId, mappingStatus.value).then(res => {
      setCapiqMappingList(res)
    });
  }

  async function getCapiqMappingTypeList() {
    setLoading(true);
    try {
      await getCapiqMappingList(carCompanyName, capiqName, capiqId, mappingStatus.value).then(res => {
        setCapiqMappingList(res)
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
      Notification('Car company capiq mapping saved successfully!', 'SUCCESS')
      getCapiqMappingTypeList();
    }
    else {
      Notification(message, 'ERROR')
    }
  }

  const columns = [
    {
      dataField: "carCompanyCapiqMappingId",
      text: "carCompanyCapiqMappingId",
      sort: true,
      hidden: true,
      style: {
        width: '15%'
      }
    },
    {
      dataField: "carCompanyName",
      text: "Car Company Name ",
      sort: true,
      style: {
        width: '15%'
      }
    },
    {
      dataField: "capiqId",
      text: "CAPIQ Id",
      sort: true,
      style: {
        width: '15%'
      }
    },
    {
      dataField: "capiqName",
      text: "CAPIQ Name ",
      sort: true,
      style: {
        width: '63%'
      }
    },
    {
      dataField: 'Action',
      text: 'Action',
      style: {
        padding: '3px',
        margin: '0px',
        width: '7%',
        textAlign: 'center'
      },
      headerStyle: { textAlign: 'center' },
      formatter: (cell, columns, rowIndex, extraData) => (
        <div>
          <a href={capiqMappingList.value} style={{ display: 'inline-flex' }}>
            <button title="Edit" type="button" onClick={() => { setCurrentCapiQMappingId(columns.carCompanyCapiqMappingId); handleShow() }} size="sm" className="icone-button"><i className="icon-pencil3 dark-grey"></i></button>
          </a>
        </div>
      )
    },]

  const setRowClass = (row, rowIndex) => {
    if (row.capiqId == '' || row.capiqId == null) {
      return 'selected-row';
    }
  };

  return (
    <>
      {show && <AddEditCapiqMapping onDataSave={onDataSave} carCompanyCapiqMappingId={currentCapiQMappingId} />}
      <ToastContainer />
      <ListGroup>
        <ListGroup.Item>
          <Navbar collapseOnSelect expand="sm" variant="dark" className='search-card'>
            <Navbar.Brand style={{ color: 'black' }}><BsFileEarmarkCode />  Car Company - CAPIQ Mapping</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto"></Nav>
              <Nav>
                <Navbar.Brand style={{ color: 'black' }}><Button variant="danger" className='btn' type='button' size="sm" onClick={() => { setCurrentCapiQMappingId(0); handleShow() }} >+ Add New Mapping</Button></Navbar.Brand>
              </Nav>
            </Navbar.Collapse>
          </Navbar >
        </ListGroup.Item>

        <ListGroup.Item>
          <Card className="search-panel-card">
            <Form onSubmit={(event) => handleSearch(event)}>
              <Row className="main-class">
                <Col className='display-inline pl-0' style={{ width: '30px', marginLeft: '0px' }}>
                  <Form.Label className='display-inline search-label'>Car Company Name</Form.Label>
                  <Form.Control className='defaultWidth' type="text" value={carCompanyName} onChange={(e) => setCarCompanyName(e.target.value)} />
                </Col>

                <Col className='display-inline pl-2' style={{ width: '30px', marginLeft: '60px' }}>
                  <Form.Label className='display-inline search-label'>CAPIQ Name</Form.Label>
                  <Form.Control className='defaultWidth' type="text" value={capiqName} onChange={(e) => setCapiqName(e.target.value)} />
                </Col>

                <Col className='display-inline pl-2' style={{ width: '30px', marginLeft: '23px' }}>
                  <Form.Label className='display-inline search-label'>CAPIQ Id</Form.Label>
                  <Form.Control className='defaultWidth' type="text" value={capiqId} onChange={(e) => setCapiqId(e.target.value)} />
                </Col>

                <Col className='display-inline pl-2' style={{ width: '30px', marginLeft: '0px' }}>
                  <Form.Label className='display-inline search-label'>Mapping Status</Form.Label>
                  <Form.Group className='defaultWidth'>
                    <Select
                      value = {mappingStatus}
                      options={mappingStatusData.map(({ label, value }) => ({ label: label, value: value }))}
                      onChange={StatusHandler}
                      defaultMenuIsOpen={false}
                      id="mappingStatus">
                    </Select>
                  </Form.Group>
                </Col>

                <Col className='display-inline pl-0' style={{ width: '30px', marginLeft: '50px' }} >
                  <Button className='btn btn-primary mr-5' type="submit" onClick={(event) => handleSearch(event)}>Search</Button>
                  <Button onClick={(event) => handleReset(event)} type="submit" className='btn btn-dft'>Reset</Button>
                </Col>
              </Row>
            </Form>
          </Card>

          <div className="tablecard" >
            <BootstrapTable size="sm"
              keyField={'carCompanyCapiqMappingId'}
              id='tbl_capiqMappingList'
              data={capiqMappingList}
              columns={columns}
              rowClasses={setRowClass}
              striped
              hover
              condensed
              noDataIndication="No records found"
              pagination={paginationFactory()}
            />
          </div>
        </ListGroup.Item>
      </ListGroup>
    </>
  )
}