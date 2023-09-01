import 'react-toastify/dist/ReactToastify.css';
import ListGroup from 'react-bootstrap/ListGroup';
import React, { useState, useEffect } from "react";
import { Nav, Navbar, Button, Form, Col, Row, Card } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { BsFileEarmarkCode } from "react-icons/bs";
import { getMakeCarMappingList } from '../../services/MakeCarCompanyMappingService.js';
import AddEditMakeCarMapping from '../makeCarCompanyMapping/AddEditMakeCarMapping.js';
import { Notification } from "../../components/Notification.js";
import { useLoading } from '../../LoadingContext.js';
import Select from 'react-select';
import {mappingStatusData} from '../../config.js';

export default function MakeCarCompanyMapping() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [currentMakeCarMappingId, setCurrentMakeCarMappingId] = useState(null);
  const [makeCarMappingList, setMakeCarMappingList] = useState([]);
  const [make, setMake] = useState("");
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
    getMakeCarMappingTypeList();
  };

  useEffect(() => {
    getMakeCarMappingTypeList();
  }, [])

  async function handleReset(e) {
    setMappingStatus({label: "All", value: "0" })
    setMake("");
    setCarCompanyName("");
    setCapiqName("");
    setCapiqId("");
    await getMakeCarMappingList(make, carCompanyName, capiqName, capiqId, mappingStatus.value).then(res => { setMakeCarMappingList(res) });
  }

  function onDataSave(isSubmitted, message) {
    handleClose();
    if (isSubmitted && message.toUpperCase() == "SUCCESS") {
      Notification('Make-car company mapping saved successfully!', 'SUCCESS')
      getMakeCarMappingTypeList();
    }
    else {
      Notification(message, 'ERROR')
    }
  }

  async function getMakeCarMappingTypeList() {
    setLoading(true);
    try {
      await getMakeCarMappingList(make, carCompanyName, capiqName, capiqId, mappingStatus.value).then(res => {
        setMakeCarMappingList(res)
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
      dataField: "makeCarCompanyMappingId",
      text: "makeCarCompanyMappingId",
      sort: true,
      hidden: true,
      style: {
        width: '15%'
      }
    },
    {
      dataField: "make",
      text: "Make",
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
      dataField: "carCompanyName",
      text: "Car Company Name ",
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
        width: '48%'
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
          <a href={makeCarMappingList.value} style={{ display: 'inline-flex' }}>
            <button title="Edit" type="button" onClick={() => { setCurrentMakeCarMappingId(columns.makeCarCompanyMappingId); handleShow() }} size="sm" className="icone-button"><i className="icon-pencil3 dark-grey"></i></button>
          </a>
        </div>
      )
    },
  ]

  const setRowClass = (row, rowIndex) => {
    if (row.carCompanyCapiqMappingId == '' || row.carCompanyCapiqMappingId == null) {
      return 'selected-row';
    }
  };

  return (
    <>
      {show && <AddEditMakeCarMapping onDataSave={onDataSave} makeCarCompanyMappingId={currentMakeCarMappingId} />}
      <ToastContainer />
      <ListGroup>
        <ListGroup.Item>
          <Navbar collapseOnSelect expand="sm" variant="dark" className='search-card'>
            <Navbar.Brand style={{ color: 'black' }}><BsFileEarmarkCode /> Make - Car Company Mapping </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto"></Nav>
              <Nav>
                <Navbar.Brand style={{ color: 'black' }}><Button variant="danger" className='btn' type='button' size="sm" onClick={() => { setCurrentMakeCarMappingId(0); handleShow() }} >+ Add New Mapping</Button></Navbar.Brand>
              </Nav>
            </Navbar.Collapse>
          </Navbar >
        </ListGroup.Item>

        <ListGroup.Item>
          <Card className="search-panel-card">
            <Form onSubmit={(event) => handleSearch(event)} className="main-class">
              <Row >
              <Col className='display-inline pl-6' style={{ width: '20%', flex: 'none',marginLeft: '1px'}}>
                  <Form.Label className='display-inline search-label'>Make</Form.Label>
                  <Form.Control style={{marginLeft: '48px'}} type="text" value={make} onChange={(e) => setMake(e.target.value)} />
                </Col>

                <Col className='display-inline pl-2' style={{width:'30px', flex: 'none',marginLeft: '4px'}}>
                  <Form.Label className='display-inline search-label'>Car Company Name</Form.Label>
                  <Form.Control className='defaultWidth' type="text" value={carCompanyName} onChange={(e) => setCarCompanyName(e.target.value)} />
                </Col>
              </Row>

              <Row className="mt-10">
              <Col className='display-inline pl-0' style={{ width: '30px', marginLeft:'12px'}}>
                  <Form.Label className='display-inline search-label'>CAPIQ Name</Form.Label>
                  <Form.Control style={{marginLeft: '2px'}} className='defaultWidth' type="text" value={capiqName} onChange={(e) => setCapiqName(e.target.value)} />
                </Col>

                <Col className='display-inline pl-2' style={{ width: '30px', marginLeft:'25px'}}>
                  <Form.Label className='display-inline search-label'>CAPIQ Id</Form.Label>
                  <Form.Control style={{marginLeft: '61px'}} className='defaultWidth' type="text" value={capiqId} onChange={(e) => setCapiqId(e.target.value)} />
                </Col>

                <Col className='display-inline pl-2' style={{ width: '30px', marginLeft:'58px'}}>
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

                <Col className='display-inline pl-2' style={{ width: '30px', left:'33px'}}>
                <Button className='btn btn-primary mr-5' type="submit" onClick={(event) => handleSearch(event)}>Search</Button>
                    <Button onClick={(event) => handleReset(event)} className='btn btn-dft' type='submit'>Reset</Button>
                </Col>

                <Col className='display-inline pl-2' style={{ width: '30px' }}>
                
                </Col>
              </Row>

            </Form>
          </Card>

          <div className="tablecard">
            <BootstrapTable size="sm"
              keyField={'makeCarCompanyMappingId'}
              id='tbl_makeCarMappingList'
              data={makeCarMappingList}
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