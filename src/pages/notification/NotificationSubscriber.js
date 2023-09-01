import 'react-toastify/dist/ReactToastify.css';
import ListGroup from 'react-bootstrap/ListGroup';
import React, { useState, useEffect } from "react";
import { Nav, Navbar, Button, Form, Col, Row, Card } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { BsFileEarmarkText } from "react-icons/bs";
import { getNotificationList, deleteNotification } from "../../services/NotificationSubscriberService.js";
import AddEditNotificationSubscriber from '../notification/AddEditNotificationSubscriber.js';
import Bootbox from 'bootbox-react'
import { Notification } from "../../components/Notification.js";
import { useLoading } from '../../LoadingContext.js';
import Select from 'react-select';
import { HiOutlineBellAlert } from "react-icons/hi2";

export default function NotificationSubscriber() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [currentNotificationId, setCurrentNotificationId] = useState(null);
  const [notificationList, setNotificationList] = useState([]);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [notificationType, setNotificationType] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const bootboxClose = () => setShowConfirm(false);
  const { setLoading } = useLoading();

  const Notificationdata = [
    { label: "Company Mapping Notification", value: "COMPANY_MAPPING_NOTIFICATION" },
    { label: "Reference Data Notification", value: "REFERENCE_DATA_NOTIFICATION" },
    { label: "Bad Data Notification - GADT", value: "BAD_DATA_NOTIFICATION_GADT" },
    { label: "Bad Data Notification - VF", value: "BAD_DATA_NOTIFICATION_VF" },
    { label: "No File Available Notification - GADT", value: "NO_FILE_AVAILABLE_NOTIFICATION_GADT" },
  ];

  async function handleConfirm() {
    let message = '';
    setShowConfirm(false);
    setLoading(true);
    try {
      await deleteNotification(currentNotificationId).then(res => { message = res });
    }
    catch (error) {
      message = error.message;
    }
    finally {
      if (message == 'SUCCESS') {
        Notification('Notification subscriber deleted successfully!', 'success')
      } else {
        Notification(message, 'ERROR')
      }
      setCurrentNotificationId(null);
      setLoading(false);
    }
    getnotificationSubscriberList();
  }

  const handleSearch = (e) => {
    e.preventDefault();
    getnotificationSubscriberList();
  };

  useEffect(() => {
    getnotificationSubscriberList();
  }, [])

  async function handleReset(e) {
    setNotificationType("");
    setUserName("");
    setUserEmail("");
    await getNotificationList(notificationType, userName, userEmail).then(res => { 
      res.forEach((item)=> {
        const notification = Notificationdata.find(x=> x.value == item.notificationType);
        item.notificationTypeLable = notification.label;
      })
      setNotificationList(res) 
    });
  }

  async function getnotificationSubscriberList() {
    setLoading(true);
    try {
      await getNotificationList(notificationType, userName, userEmail).then(res => {
        res.forEach((item)=> {
          const notification = Notificationdata.find(x=> x.value == item.notificationType);
          item.notificationTypeLable = notification.label;
        })
        setNotificationList(res)
      });
    }
    catch (error) {
    }
    finally {
      setLoading(false);
    }
  }

  function NotificationHandler(e) {
    let item = e.value;
    setNotificationType(item);
  }

  function onDataSave(isSubmitted, message) {
    handleClose();
    if (isSubmitted && message.toUpperCase() == "SUCCESS") {
      Notification('Notification subscriber saved successfully!', 'SUCCESS')
      getnotificationSubscriberList();
    }
    else {
      Notification(message, 'ERROR')
    }
  }

  const columns = [
    {
      dataField: "notificationSubscriberId",
      text: "notificationSubscriberId",
      sort: true,
      hidden: true,
      style: {
        width: '10%'
      }
    },
    {
    dataField: "userName",
    text: "User Name",
    sort: true,
    style: {
      width: '10%'
    }
  },
  {
    dataField: "userEmail",
    text: "User Email",
    sort: true,
    style: {
      width: '62%'
    }
  },
  {
    dataField: "notificationTypeLable",
    text: "Notification Type",
    sort: true,
    style: {
      width: '20%'
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
        <a href={notificationList.value} style={{ display: 'inline-flex' }} >
          <button title="Edit" type="button" onClick={() => { setCurrentNotificationId(columns.notificationSubscriberId); handleShow() }} size="sm" className="icone-button"><i className="icon-pencil3 dark-grey"></i></button>
          <button title='Delete' type="button" onClick={() => { setCurrentNotificationId(columns.notificationSubscriberId); setShowConfirm(true) }} className="icone-button"><i className="icon-trash dark-grey"></i></button>
        </a>
      </div>
    )
  },
  ]

  return (
    <>
      {show && <AddEditNotificationSubscriber onDataSave={onDataSave} notificationSubscriberId={currentNotificationId} />}
      <ToastContainer />
      <ListGroup>
        <ListGroup.Item>
          <Navbar collapseOnSelect expand="sm" variant="dark" className='search-card'>
            <Navbar.Brand style={{ color: 'black' }}><HiOutlineBellAlert /> Notification Subscriber</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto"></Nav>
              <Nav>
                <Navbar.Brand style={{ color: 'black' }}><Button className='btn' variant="danger" type='button' size="sm" onClick={() => { setCurrentNotificationId(0); handleShow() }} >+ Add Notification Subscriber</Button></Navbar.Brand>
              </Nav>
            </Navbar.Collapse>
          </Navbar >
        </ListGroup.Item>
        <ListGroup.Item>
          <Card className="search-panel-card">
            <Form onSubmit={(event) => handleSearch(event)}>
              <Row className="main-class">
                <Col sm={3} className='display-inline pl-0'>
                  <Form.Label className='display-inline search-label'>User Name</Form.Label>
                  <Form.Control type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
                </Col>

                <Col sm={3} className='display-inline pl-2'>
                  <Form.Label className='display-inline search-label'>User Email</Form.Label>
                  <Form.Control type="text" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
                </Col>

                <Col sm={3} className='display-inline pl-2'>
                  <Form.Label className='display-inline search-label'>Notification Type</Form.Label>
                  <Col xs={9} className='pl-0'>
                    <Form.Group>
                      <Select onChange={NotificationHandler} options={Notificationdata} defaultMenuIsOpen={false} id="notificationType" > </Select>
                    </Form.Group>
                  </Col>
                </Col>

                <Col sm={2} className='display-inline pl-2' >
                  <Button className='btn btn-primary mr-5' type="submit" onClick={(event) => handleSearch(event)}>Search</Button>
                  <Button onClick={(event) => handleReset(event)} type="submit" className='btn btn-dft'>Reset</Button>
                </Col>
              </Row>
            </Form>
          </Card>
          <div className='tablecard'>
            <BootstrapTable size="sm"
              keyField={'notificationSubscriberId'}
              id='tbl_notification'
              data={notificationList}
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
        message={"Are you sure you want to delete this notification subscriber?"}
        onSuccess={handleConfirm}
        onCancel={bootboxClose}
        onClose={bootboxClose}
      />
    </>
  )
}