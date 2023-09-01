import 'react-toastify/dist/ReactToastify.css';
import ListGroup from 'react-bootstrap/ListGroup';
import React, { useState, useEffect } from "react";
import { Nav, Navbar, Button, Form, Col, Row, Card } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { BsFileEarmarkText } from "react-icons/bs";
import { getProductionTypeList, deleteProductionType } from "../../services/ProductionTypeService.js"
import AddEditProductionType from '../productionType/AddEditProductionType.js'
import Bootbox from 'bootbox-react'
import { Notification } from "../../components/Notification.js";
import { useLoading } from '../../LoadingContext.js';

export default function ProductionType() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [currentProductionTypeId, setCurrentProductionTypeId] = useState(null);
  const [productionTypeList, setProductionTypeList] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const bootboxClose = () => setShowConfirm(false);
  const [productionType, setProductionType] = useState("");
  const { setLoading } = useLoading();

  async function handleConfirm() {
    let message = '';
    setShowConfirm(false);
    setLoading(true);
    try {
      await deleteProductionType(currentProductionTypeId).then(res => { message = res });
    }
    catch (error) {
      message = error.message;
    }
    finally {
      if (message == 'SUCCESS') {
        Notification('Production type deleted successfully!', 'success')
      } else {
        Notification(message, 'ERROR')
      }
      setCurrentProductionTypeId(null);
      setLoading(false);
    }

    getproductionTypeList();

  }

  const handleSearch = (e) => {
    e.preventDefault();
    getproductionTypeList();
  };

  useEffect(() => {
    getproductionTypeList();
  }, [])

  async function handleReset(e) {
    e.preventDefault();
    setProductionType("");
    await getProductionTypeList("").then(res => { setProductionTypeList(res) });
  }

  async function getproductionTypeList() {
    setLoading(true);
    try {
      await getProductionTypeList(productionType).then(res => {
        setProductionTypeList(res)
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
      Notification('Production type saved successfully!', 'SUCCESS')
      getproductionTypeList();
    }
    else {
      Notification(message, 'ERROR')
    }
  }

  const columns = [
    {
      dataField: "productionTypeId",
      text: "productionTypeId",
      sort: true,
      hidden: true,
      style: {
        width: '10%'
      }
    },
    {
    dataField: "productionType",
    text: "Production Type",
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
        <a href={productionTypeList.value} style={{ display: 'inline-flex' }} >
          <button title="Edit" type="button" onClick={() => { setCurrentProductionTypeId(columns.productionTypeId); handleShow() }} size="sm" className="icone-button"><i className="icon-pencil3 dark-grey"></i></button>
          <button title='Delete' type="button" onClick={() => { setCurrentProductionTypeId(columns.productionTypeId); setShowConfirm(true) }} className="icone-button"><i className="icon-trash dark-grey"></i></button>
        </a>
      </div>
    )
  },
  ]
 
  return (
    <>
      {show && <AddEditProductionType onDataSave={onDataSave} productionTypeId={currentProductionTypeId} />}
      <ToastContainer />
      <ListGroup>
        <ListGroup.Item>
          <Navbar collapseOnSelect expand="sm" variant="dark" className='search-card'>
            <Navbar.Brand style={{ color: 'black' }}><BsFileEarmarkText /> Production Type </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto"></Nav>
              <Nav>
                <Navbar.Brand style={{ color: 'black' }}><Button className='btn' variant="danger" type='button' size="sm" onClick={() => { setCurrentProductionTypeId(0); handleShow() }} >+ Add Production Type</Button></Navbar.Brand>
              </Nav>
            </Navbar.Collapse>
          </Navbar >
        </ListGroup.Item>
        <ListGroup.Item>
          <Card className="search-panel-card">
            <Form onSubmit={(event) => handleSearch(event)}>
              <Row className="main-class">
                <Col xs={3} className='display-inline pl-0' >
                  <Form.Label className='display-inline search-label'>Production Type</Form.Label>
                  <Form.Control type="text" value={productionType} onChange={(e) => setProductionType(e.target.value)} />
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
              keyField={'productionTypeId'}
              id='tbl_productionType'
              data={productionTypeList}
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
        message={"Are you sure you want to delete this production type?"}
        onSuccess={handleConfirm}
        onCancel={bootboxClose}
        onClose={bootboxClose}
      />
    </>
  )
}