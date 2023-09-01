import '../../assets/styles/App.css';
import 'react-toastify/dist/ReactToastify.css';
import ListGroup from 'react-bootstrap/ListGroup';
import React, { useState, useEffect } from "react";
import { Nav, Navbar, Button, Form, Col, Row, Card } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { BsFileEarmarkText } from "react-icons/bs";
import { getEnginePropulsionSystemDesignList, deleteEnginePropulsionSystemDesign } from "../../services/EnginePropulsionSystemDesignService.js"
import AddEditEnginePropulsionSystemDesign from '../enginePropulsionSystemDesign/AddEditEnginePropulsionSystemDesign.js'
import Bootbox from 'bootbox-react'
import { Notification } from "../../components/Notification.js";
import { useLoading } from '../../LoadingContext.js';

export default function EnginePropulsionSystemDesign() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [currentEnginePropulsionSystemDesignId, setCurrentEnginePropulsionSystemDesignId] = useState(null);
  const [enginePropulsionSystemDesignList, setEnginePropulsionSystemDesignList] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const bootboxClose = () => setShowConfirm(false);
  const [enginePropulsionSystemDesign, setEnginePropulsionSystemDesign] = useState("");
  const { setLoading } = useLoading();

  async function handleConfirm() {
    let message = '';
    setShowConfirm(false);
    setLoading(true);
    try {
      await deleteEnginePropulsionSystemDesign(currentEnginePropulsionSystemDesignId).then(res => { message = res });
    }
    catch (error) {
      message = error.message;
    }
    finally {
      if (message == 'SUCCESS') {
        Notification('Engine propulsion system design deleted successfully!', 'success')
      } else {
        Notification(message, 'ERROR')
      }
      setCurrentEnginePropulsionSystemDesignId(null);
      setLoading(false);
    }

    getenginePropulsionSystemDesignList();

  }

  const handleSearch = (e) => {
    e.preventDefault();
    getenginePropulsionSystemDesignList();
  };

  useEffect(() => {
    getenginePropulsionSystemDesignList();
  }, [])

  async function handleReset(e) {
    e.preventDefault();
    setEnginePropulsionSystemDesign("");
    await getEnginePropulsionSystemDesignList("").then(res => { setEnginePropulsionSystemDesignList(res) });
  }

  async function getenginePropulsionSystemDesignList() {
    setLoading(true);
    try {
      await getEnginePropulsionSystemDesignList(enginePropulsionSystemDesign).then(res => {
        setEnginePropulsionSystemDesignList(res)
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
      Notification('Engine propulsion system design saved successfully!', 'SUCCESS')
      getenginePropulsionSystemDesignList();
    }
    else {
      Notification(message, 'ERROR')
    }
  }
  
  const columns = [
    {
      dataField: "enginePropulsionSystemDesignId",
      text: "enginePropulsionSystemDesignId",
      sort: true,
      hidden: true,
      style: {
        width: '14%'
      }
    },{
    dataField: "enginePropulsionSystemDesign",
    text: "Engine Propulsion System Design",
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
        <a href={enginePropulsionSystemDesignList.value} style={{ display: 'inline-flex' }} >
          <button title="Edit" type="button" onClick={() => { setCurrentEnginePropulsionSystemDesignId(columns.enginePropulsionSystemDesignId); handleShow() }} size="sm" className="icone-button"><i className="icon-pencil3 dark-grey"></i></button>
          <button title='Delete' type="button" onClick={() => { setCurrentEnginePropulsionSystemDesignId(columns.enginePropulsionSystemDesignId); setShowConfirm(true) }} className="icone-button"><i className="icon-trash dark-grey"></i></button>
        </a>
      </div>
    )
  },
  ]
 
  return (
    <>
      {show && <AddEditEnginePropulsionSystemDesign onDataSave={onDataSave} enginePropulsionSystemDesignId={currentEnginePropulsionSystemDesignId} />}
      <ToastContainer />
      <ListGroup>
        <ListGroup.Item>
          <Navbar collapseOnSelect expand="sm" variant="dark" className='search-card'>
            <Navbar.Brand style={{ color: 'black' }}><BsFileEarmarkText /> Engine Propulsion System Design </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto"></Nav>
              <Nav>
                <Navbar.Brand style={{ color: 'black' }}><Button className='btn' variant="danger" type='button' size="sm" onClick={() => { setCurrentEnginePropulsionSystemDesignId(0); handleShow() }} >+ Add Engine Propulsion System Design</Button></Navbar.Brand>
              </Nav>
            </Navbar.Collapse>
          </Navbar >
        </ListGroup.Item>
        <ListGroup.Item>
          <Card className="search-panel-card">
            <Form onSubmit={(event) => handleSearch(event)}>
              <Row className="main-class">
                <Col xs={4} className='display-inline pl-0' >
                  <Form.Label className='display-inline search-label'>Engine Propulsion System Design</Form.Label>
                  <Form.Control type="text" value={enginePropulsionSystemDesign} onChange={(e) => setEnginePropulsionSystemDesign(e.target.value)} />
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
              keyField={'enginePropulsionSystemDesignId'}
              id='tbl_enginePropulsionSystemDesign'
              data={enginePropulsionSystemDesignList}
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
        message={"Are you sure you want to delete this engine propulsion system design?"}
        onSuccess={handleConfirm}
        onCancel={bootboxClose}
        onClose={bootboxClose}
      />
    </>
  )
}