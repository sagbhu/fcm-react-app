import React, { useState, useEffect } from "react";
import { Nav, Navbar, Button, Form, Col, Row, Card, ListGroup } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { getUserList, deleteUser } from "../../services/UserService.js";
import AddEditUser from './AddEditUser.js';
import Bootbox from 'bootbox-react';
import { Notification } from "../../components/Notification.js";
import { useLoading } from '../../LoadingContext.js';
import {  AiOutlineUser } from 'react-icons/ai';

export default function User() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [UserList, setUserList] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const bootboxClose = () => setShowConfirm(false);
  const { setLoading } = useLoading();

  async function handleConfirm() {
    var response = await deleteUser(currentUserId).then(res => res);
    if (response == 'SUCCESS') {
      Notification('User deleted successfully!', 'success')
    }
    setCurrentUserId(null);
    setShowConfirm(false);
    getUserDataList();
  }
  const handleSearch = (e) => {
    e.preventDefault();
    getUserDataList();
  };

  async function handleReset(e) {
    e.preventDefault();
    setName("");
    setEmail("");
    await getUserList("",'').then(res => { setUserList(res) });
  }

  useEffect(() => {
    getUserDataList();
  }, [])

  function onDataSave(isSubmitted, message) {
    handleClose();
    if (isSubmitted && message.toUpperCase() == "SUCCESS") {
      Notification('User saved successfully!', 'SUCCESS')
      getUserDataList();
    }
    else {
      Notification(message, 'ERROR')
    }
  }

  async function getUserDataList() {
    setLoading(true);
    try {
      await getUserList(name,email).then(res => {
        setUserList(res)
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
      dataField: "userId",
      text: "userId",
      sort: true,
      hidden: true,
      style: {
        width: '10%'
      }
    },
    {
      dataField: "firstName",
      text: "First Name ",
      sort: true,
      style: {
        width: '10%'
      }
    },
    {
      dataField: "lastName",
      text: "Last Name ",
      sort: true,
      style: {
        width: '10%'
      }
    },
    {
      dataField: "emailAddress",
      text: "Email Address ",
      sort: true,
      style: {
        width: '72%'
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
          <a href={UserList.value} style={{ display: 'inline-flex' }}>
            <button title="Edit" type="button" onClick={() => { setCurrentUserId(columns.userId); handleShow() }} size="sm" className="icone-button"><i className="icon-pencil3 dark-grey"></i></button>
            <button title='Delete' type="button" onClick={() => { setCurrentUserId(columns.userId); setShowConfirm(true) }} className="icone-button"><i className="icon-trash dark-grey"></i></button>
          </a>
        </div>
      )
    },
  ]

  const defaultSorted = [{
    dataField: 'userId',
    order: 'asc'
  }];

  return (
    <>
      {show && <AddEditUser onDataSave={onDataSave} userId={currentUserId} />}
      <ToastContainer />
      <ListGroup>
        <ListGroup.Item>
          <Navbar collapseOnSelect expand="sm" variant="dark" className='search-card'>
            <Navbar.Brand style={{ color: 'black' }}><AiOutlineUser /> User</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto"></Nav>
              <Nav>
                <Navbar.Brand style={{ color: 'black' }}><Button variant="danger" className="btn" type='button' size="sm" onClick={() => { setCurrentUserId(0); handleShow() }} >+ Add User</Button></Navbar.Brand>
              </Nav>
            </Navbar.Collapse>
          </Navbar >
        </ListGroup.Item>
        <ListGroup.Item>
          <Card className="search-panel-card">
            <Form onSubmit={(event) => handleSearch(event)}>
              <Row className="main-class">
                <Col xs={3} className='display-inline pl-0' >
                  <Form.Label className='display-inline search-label'>First Name</Form.Label>
                  <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </Col>

                <Col xs={3} className='display-inline pl-0' >
                  <Form.Label className='display-inline search-label'>Email Address</Form.Label>
                  <Form.Control type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Col>

                <Col xs={4} className='display-inline pl-2'>
                  <Button className='btn btn-primary mr-5' type="submit" onClick={(event) => handleSearch(event)}>Search</Button>
                  <Button onClick={(event) => handleReset(event)} className='btn btn-dft' type="submit">Reset</Button>
                </Col>
              </Row>
            </Form>
          </Card>

          <div className="tablecard">
            <BootstrapTable size="sm"
              keyField={'userId'}
              id='tbl_fuelType'
              data={UserList}
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
        message={"Are you sure you want to delete this user?"}
        onSuccess={handleConfirm}
        onCancel={bootboxClose}
        onClose={bootboxClose}
      />
    </>
  )
}