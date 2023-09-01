import 'react-toastify/dist/ReactToastify.css';
import ListGroup from 'react-bootstrap/ListGroup';
import React, { useState, useEffect } from "react";
import { Nav, Navbar, Button, Form, Col, Row, Card } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { BsFileEarmarkText } from "react-icons/bs";
import { getAlternativePropulsionSystemSubDesignArchitectureList, deleteAlternativePropulsionSystemSubDesignArchitecture } from "../../services/AlternativePropulsionSystemSubDesignArchitectureService.js"
import AddEditAlternativePropulsionSystemSubDesignArchitecture from '../alternativePropulsionSystemSubDesignArchitecture/AddEditAlternativePropulsionSystemSubDesignArchitecture.js'
import Bootbox from 'bootbox-react'
import { Notification } from "../../components/Notification.js";
import { useLoading } from '../../LoadingContext.js';

export default function AlternativePropulsionSystemSubDesignArchitecture() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [currentAlternativePropulsionSystemSubDesignArchitectureId, setAlternativePropulsionSystemSubDesignArchitectureId] = useState(null);
  const [alternativePropulsionSystemSubDesignArchitectureList, setAlternativePropulsionSystemSubDesignArchitectureList] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const bootboxClose = () => setShowConfirm(false);
  const [alternativePropulsionPxDefinition, setAlternativePropulsionPxDefinition] = useState("");
  const [enginePropulsionSystem, setEnginePropulsionSystem] = useState("");
  const [alternativePropulsionSystemSubDesignArchitecture, setAlternativePropulsionSystemSubDesignArchitecture] = useState("");
  const { setLoading } = useLoading();

  async function handleConfirm() {
    let message = '';
    setShowConfirm(false);
    setLoading(true);
    try {
      await deleteAlternativePropulsionSystemSubDesignArchitecture(currentAlternativePropulsionSystemSubDesignArchitectureId).then(res => { message = res });
    }
    catch (error) {
      message = error.message;
    }
    finally {
      if (message == 'SUCCESS') {
        Notification('Alternative propulsion system sub design architecture deleted successfully!', 'success')
      } else {
        Notification(message, 'ERROR')
      }
      setAlternativePropulsionSystemSubDesignArchitectureId(null);
      setLoading(false);
    }

    getalternativePropulsionSystemSubDesignArchitectureList();

  }

  const handleSearch = (e) => {
    e.preventDefault();
    getalternativePropulsionSystemSubDesignArchitectureList();
  };

  useEffect(() => {
    getalternativePropulsionSystemSubDesignArchitectureList();
  }, [])

  async function handleReset(e) {
    // e.preventDefault();
    setAlternativePropulsionSystemSubDesignArchitecture("");
    setAlternativePropulsionPxDefinition("");
    setEnginePropulsionSystem("");
    await getAlternativePropulsionSystemSubDesignArchitectureList(alternativePropulsionSystemSubDesignArchitecture, alternativePropulsionPxDefinition, enginePropulsionSystem).then(res => { setAlternativePropulsionSystemSubDesignArchitectureList(res) });
  }

  async function getalternativePropulsionSystemSubDesignArchitectureList() {
    setLoading(true);
    try {
      await getAlternativePropulsionSystemSubDesignArchitectureList(alternativePropulsionSystemSubDesignArchitecture, alternativePropulsionPxDefinition, enginePropulsionSystem).then(res => {
        setAlternativePropulsionSystemSubDesignArchitectureList(res)
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
      Notification('Alternative propulsion system sub design architecture saved successfully!', 'SUCCESS')
      getalternativePropulsionSystemSubDesignArchitectureList();
    }
    else {
      Notification(message, 'ERROR')
    }
  }
 
  const columns = [{
    dataField: "alternativePropulsionSystemSubDesignArchitectureId",
    text: "alternativePropulsionSystemSubDesignArchitectureId",
    sort: true,
    hidden: true,
    style: {
      width: '23%'
    }
  },{
    dataField: "alternativePropulsionSystemSubDesignArchitecture",
    text: "Alternative Propulsion System Sub Design Architecture",
    sort: true,
    style: {
      width: '23%'
    }
  },
  {
    dataField: "alternativePropulsionPxDefinition",
    text: "Alternative Propulsion Px Definition ",
    sort: true,
    style: {
      width: '15%',
      textAlign: 'left'
    }
  },
  {
    dataField: "enginePropulsionSystem",
    text: "Engine Propulsion System",
    sort: true,
    style: {
      width: '12%',
      textAlign: 'left'
    }
  },
  {
    dataField: "example",
    text: "Example",
    sort: true,
    style: {
      width: '8%',
      textAlign: 'left'
    }
  },
  {
    dataField: "description",
    text: "Description ",
    sort: true,
    style: {
      width: '44%',
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
        <a href={alternativePropulsionSystemSubDesignArchitectureList.value} style={{ display: 'inline-flex' }} >
          <button title="Edit" type="button" onClick={() => { setAlternativePropulsionSystemSubDesignArchitectureId(columns.alternativePropulsionSystemSubDesignArchitectureId); handleShow() }} size="sm" className="icone-button"><i className="icon-pencil3 dark-grey"></i></button>
          <button title='Delete' type="button" onClick={() => { setAlternativePropulsionSystemSubDesignArchitectureId(columns.alternativePropulsionSystemSubDesignArchitectureId); setShowConfirm(true) }} className="icone-button"><i className="icon-trash dark-grey"></i></button>
        </a>
      </div>
    )
  },
  ]
 
  return (
    <>
      {show && <AddEditAlternativePropulsionSystemSubDesignArchitecture onDataSave={onDataSave} alternativePropulsionSystemSubDesignArchitectureId={currentAlternativePropulsionSystemSubDesignArchitectureId} />}
      <ToastContainer />
      <ListGroup>
        <ListGroup.Item>
          <Navbar collapseOnSelect expand="sm" variant="dark" className='search-card'>
            <Navbar.Brand style={{ color: 'black' }}><BsFileEarmarkText /> Alternative Propulsion System Sub Design Architecture </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto"></Nav>
              <Nav>
                <Navbar.Brand style={{ color: 'black' }}><Button className='btn' variant="danger" type='button' size="sm" onClick={() => { setAlternativePropulsionSystemSubDesignArchitectureId(0); handleShow() }} >+ Add Alternative Propulsion System Sub Design Architecture</Button></Navbar.Brand>
              </Nav>
            </Navbar.Collapse>
          </Navbar >
        </ListGroup.Item>
        <ListGroup.Item>
          <Card className="search-panel-card">

            <Form onSubmit={(event) => handleSearch(event)} className="main-class">
              <Row >
                <Col xs={5} className='display-inline' >
                  <Col xs={6} className='p-0'>
                    <Form.Label>Alternative Propulsion System Sub Design Architecture</Form.Label>
                  </Col>
                  <Col xs={7}>
                  <Form.Control type="text" value={alternativePropulsionSystemSubDesignArchitecture} onChange={(e) => setAlternativePropulsionSystemSubDesignArchitecture(e.target.value)} />
                  </Col>
                </Col>

                <Col xs={5} className='display-inline'>
                  <Col xs={5} style={{ marginLeft: '53px' }}>
                    <Form.Label >Alternative Propulsion Px Definition</Form.Label>
                  </Col>
                  <Col xs={7} className='p-0 pl-0'>
                  <Form.Control type="text" value={alternativePropulsionPxDefinition} onChange={(e) => setAlternativePropulsionPxDefinition(e.target.value)} />
                  </Col>
                </Col>
              </Row>
              <Row style={{ marginTop: '10px' }}>

                <Col xs={5} className='display-inline'>
                  <Col xs={6}  className='p-0'>
                  <Form.Label className='display-inline search-label'>Engine Propulsion System</Form.Label>
                  </Col>
                  <Col xs={7}>
                  <Form.Control type="text" value={enginePropulsionSystem} onChange={(e) => setEnginePropulsionSystem(e.target.value)} />
                  </Col>
                </Col>

                <Col xs={4} className='display-inline'>
                  <Col xs={4} style={{ marginLeft: '53px' }}>
                    <Button className='btn btn-primary mr-5' type="submit" onClick={(event) => handleSearch(event)}>Search</Button>
                    <Button onClick={(event) => handleReset(event)} className='btn btn-dft' type='submit'>Reset</Button>
                  </Col>
                </Col>
              </Row>
            </Form>

          </Card>
          <div className='tablecard'>
            <BootstrapTable size="sm"
              keyField={'alternativePropulsionSystemSubDesignArchitectureId'}
              id='tbl_alternativePropulsionSystemSubDesignArchitecture'
              data={alternativePropulsionSystemSubDesignArchitectureList}
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
        message={"Are you sure you want to delete this alternative propulsion system sub design architecture?"}
        onSuccess={handleConfirm}
        onCancel={bootboxClose}
        onClose={bootboxClose}
      />
    </>
  )
}