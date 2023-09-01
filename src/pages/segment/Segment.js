import React, { useState, useEffect, useFormik } from "react";
import { Nav, Navbar, Button, Form, Col, Row, Card, ListGroup } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { BsPencilFill, BsFileEarmarkText } from "react-icons/bs";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { getSegmentList, deleteSegment } from "../../services/SegmentService.js";
import AddEditSegment from './AddEditSegment.js';
import Bootbox from 'bootbox-react';
import { Notification } from "../../components/Notification.js";
import { useLoading } from '../../LoadingContext.js';

export default function Segment() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [currentSegmentId, setCurrentSegmentId] = useState(null);
  const [segmentList, setSegmentList] = useState([]);
  const [segment, setSegment] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const bootboxClose = () => setShowConfirm(false);
  const { setLoading } = useLoading();

  async function handleConfirm() {
    let message = '';
    setShowConfirm(false);
    setLoading(true);
    try {
      await deleteSegment(currentSegmentId).then(res => { message = res });
    }
    catch (error) {
      message = error.message;
    }
    finally {
      if (message == 'SUCCESS') {
        Notification('Segment type deleted successfully!', 'success')
      } else {
        Notification(message, 'ERROR')
      }
      setCurrentSegmentId(null);
      setShowConfirm(false);
    }
    getsegmentList();
  }

  const handleSearch = (e) => {
    e.preventDefault();
    getsegmentList();
  };

  useEffect(() => {
    getsegmentList();
  }, [])

  async function handleReset(e) {
    e.preventDefault();
    setSegment("");
    await getSegmentList("").then(res => { setSegmentList(res) });
  }

  function onDataSave(isSubmitted, message) {
    handleClose();
    if (isSubmitted && message.toUpperCase() == "SUCCESS") {
      Notification('Segment saved successfully!', 'SUCCESS')
      getsegmentList();
    }
    else {
      Notification(message, 'ERROR')
    }
  }

  async function getsegmentList() {
    setLoading(true);
    try {
      await getSegmentList(segment).then(res => {
        setSegmentList(res)
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
      dataField: "segmentId",
      text: "segmentId",
      sort: true,
      hidden: true,
      style: {
        width: '10%'
      }
    },
    {
    dataField: "segment",
    text: "Segment ",
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
      width: '82%'
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
        <a href={segmentList.value} style={{ display: 'inline-flex' }}>
          <button title="Edit" type="button" onClick={() => { setCurrentSegmentId(columns.segmentId); handleShow() }} size="sm" className="icone-button"><i className="icon-pencil3 dark-grey"></i></button>
          <button title='Delete' type="button" onClick={() => { setCurrentSegmentId(columns.segmentId); setShowConfirm(true) }} className="icone-button"><i className="icon-trash dark-grey"></i></button>
        </a>
      </div>
    )
  },
  ]

  return (
    <>
      {show && <AddEditSegment onDataSave={onDataSave} segmentId={currentSegmentId} />}
      <ToastContainer />
      <ListGroup>
        <ListGroup.Item>
          <Navbar collapseOnSelect expand="sm" variant="dark" className='search-card'>
            <Navbar.Brand style={{ color: 'black' }}><BsFileEarmarkText /> Segment</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto"></Nav>
              <Nav>
                <Navbar.Brand style={{ color: 'black' }}><Button variant="danger" className="btn" type='button' size="sm" onClick={() => { setCurrentSegmentId(0); handleShow() }} >+ Add Segment </Button></Navbar.Brand>
              </Nav>
            </Navbar.Collapse>
          </Navbar >
        </ListGroup.Item>


        <ListGroup.Item>
          <Card className="search-panel-card">
            <Form onSubmit={(event) => handleSearch(event)}>
              <Row className="main-class">
                <Col xs={3} className='display-inline pl-0'>
                  <Form.Label className='display-inline search-label'>Segment</Form.Label>
                  <Form.Control type="text" value={segment} onChange={(e) => setSegment(e.target.value)} />
                </Col>
                <Col xs={8} className='display-inline pl-2'>
                  <Button className='btn btn-primary mr-5' type="submit" onClick={(event) => handleSearch(event)}>Search</Button>
                  <Button onClick={(event) => handleReset(event)} className='btn btn-dft'>Reset</Button>
                </Col>
              </Row>
            </Form>
          </Card>
          <div className="tablecard" >
            <BootstrapTable size="sm"
              keyField={'segmentId'}
              id='tbl_segment'
              data={segmentList}
              columns={columns}
              striped
              hover
              condensed
              noDataIndication="No records found" 
              pagination={paginationFactory()}
            />
          </div>
        </ListGroup.Item>
      </ListGroup>

      <Bootbox show={showConfirm}
        type={"confirm"}
        message={"Are you sure you want to delete this segment?"}
        onSuccess={handleConfirm}
        onCancel={bootboxClose}
        onClose={bootboxClose}
      />
    </>
  )
}