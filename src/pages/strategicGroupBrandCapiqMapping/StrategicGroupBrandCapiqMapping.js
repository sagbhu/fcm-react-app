import 'react-toastify/dist/ReactToastify.css';
import ListGroup from 'react-bootstrap/ListGroup';
import React, { useState, useEffect } from "react";
import { Nav, Navbar, NavDropdown, Button, Form, Modal, Col, Row, Container, Card } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { BsPencilFill, BsFileEarmarkCode } from "react-icons/bs";
import { getStrategicGroupBrandCapiqMappingList } from '../../services/StrategicGroupBrandCapiqMappingService.js';
import AddEditStrategicGroupBrandCapiqMapping from '../strategicGroupBrandCapiqMapping/AddEditStrategicGroupBrandCapiqMapping.js';
import { Notification } from "../../components/Notification.js";
import { useLoading } from '../../LoadingContext.js';
import Select from 'react-select';
import {mappingStatusData} from '../../config.js';

export default function StrategicGroupBrandCapiqMapping() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const [currentCarCompanyMappingId, setCurrentCarCompanyMappingId] = useState(null);
  const [groupBrandCapiqMappingList, setGroupBrandCapiqMappingList] = useState([]);
  const [strategicGroup, setStrategicGroup] = useState("");
  const [brand, setBrand] = useState("");
  const [capiqId, setCapiqId] = useState("");
  const { setLoading } = useLoading();
  const [mappingStatus, setMappingStatus] = useState({label: "All", value: "0" });

  function StatusHandler(e) {
    setMappingStatus(e);   
  }


  const handleSearch = (e) => {
    e.preventDefault();
    getGroupBrandCapiqMappingList();
  };

  useEffect(() => {
    getGroupBrandCapiqMappingList();
  }, [])

  async function handleReset(e) {
    // e.preventDefault();
    setMappingStatus({label: "All", value: "0" })
    setStrategicGroup("");
    setBrand("");
    setCapiqId("");
    await getStrategicGroupBrandCapiqMappingList(strategicGroup, brand, capiqId, mappingStatus.value).then(res => {
      setGroupBrandCapiqMappingList(res)
    });
  }

  async function getGroupBrandCapiqMappingList() {
    setLoading(true);
    try {
      await getStrategicGroupBrandCapiqMappingList(strategicGroup, brand, capiqId, mappingStatus.value).then(res => {
        setGroupBrandCapiqMappingList(res)
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
      Notification('Strategic group brand capiq mapping saved successfully!', 'SUCCESS')
      getGroupBrandCapiqMappingList();
    }
    else {
      Notification(message, 'ERROR')
    }
  }
  
  const columns = [
    {
      dataField: "strategicGroupBrandCarCompanyMappingId",
      text: "strategicGroupBrandCarCompanyMappingId",
      sort: true,
      hidden: true,
      style: {
        width: '15%'
      }
    },
    {
      dataField: "strategicGroup",
      text: "Strategic Group",
      sort: true,
      style: {
        width: '15%'
      }
    },
    {
      dataField: "brand",
      text: "Brand",
      sort: true,
      style: {
        width: '15%'
      }
    },
    {
      dataField: "capiqId",
      text: "CAPIQ Id ",
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
          <a href={groupBrandCapiqMappingList.value} style={{ display: 'inline-flex' }}>
            <button title="Edit" type="button" onClick={() => { setCurrentCarCompanyMappingId(columns.strategicGroupBrandCarCompanyMappingId); handleShow() }} size="sm" className="icone-button"><i className="icon-pencil3 dark-grey"></i></button>
          </a>
        </div>
      )
    },]

  const setRowClass = (row, rowIndex) => {
    if (row.carCompanyCapiqMappingId == '' || row.carCompanyCapiqMappingId == null) {
      return 'selected-row';
    }
  };

  return (
    <>
      {show && <AddEditStrategicGroupBrandCapiqMapping onDataSave={onDataSave} strategicGroupBrandCarCompanyMappingId={currentCarCompanyMappingId} />}
      <ToastContainer />
      <ListGroup>
        <ListGroup.Item>
          <Navbar collapseOnSelect expand="sm" variant="dark" className='search-card'>
            <Navbar.Brand style={{ color: 'black' }}><BsFileEarmarkCode /> Strategic Group - Brand - CAPIQ Mapping</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto"></Nav>
              <Nav>
                <Navbar.Brand style={{ color: 'black' }}><Button variant="danger" className='btn' type='button' size="sm" onClick={() => { setCurrentCarCompanyMappingId(0); handleShow() }} >+ Add New Mapping</Button></Navbar.Brand>
              </Nav>
            </Navbar.Collapse>
          </Navbar >
        </ListGroup.Item>

        <ListGroup.Item>
          <Card className="search-panel-card">
            <Form onSubmit={(event) => handleSearch(event)}>
              <Row className="main-class">
                <Col className='display-inline pl-0' style={{width:'30px', marginLeft:'0px'}}>
                  <Form.Label className='display-inline search-label'>Strategic Group</Form.Label>
                  <Form.Control className='defaultWidth' type="text" value={strategicGroup} onChange={(e) => setStrategicGroup(e.target.value)} />
                </Col>

                <Col className='display-inline pl-2' style={{width:'30px', marginLeft:'-10px'}}>
                <Form.Label className='display-inline search-label'>Brand</Form.Label>
                  <Form.Control className='defaultWidth' type="text" value={brand} onChange={(e) => setBrand(e.target.value)} />
                </Col>

                <Col  className='display-inline pl-2' style={{width:'30px', marginLeft:'-65px'}}>
                  <Form.Label className='display-inline search-label'>CAPIQ Id</Form.Label>
                  <Form.Control className='defaultWidth' type="text" value={capiqId} onChange={(e) => setCapiqId(e.target.value)} />
                </Col>

                <Col className='display-inline pl-2' style={{width:'30px', marginLeft:'-45px'}}>
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

                <Col className='display-inline pl-0' style={{width:'30px', marginLeft:'2px'}} >
                  <Button className='btn btn-primary mr-5' type="submit" onClick={(event) => handleSearch(event)}>Search</Button>
                  <Button onClick={(event) => handleReset(event)} type="submit" className='btn btn-dft'>Reset</Button>
                </Col>
              </Row>
            </Form>
          </Card>

          <div className="tablecard" >
            <BootstrapTable size="sm"
              keyField={'strategicGroupBrandCarCompanyMappingId'}
              id='tbl_capiqMappingList'
              data={groupBrandCapiqMappingList}
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