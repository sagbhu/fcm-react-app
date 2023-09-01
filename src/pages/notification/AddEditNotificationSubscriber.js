import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { getNotificationDetail, addNotification } from "../../services/NotificationSubscriberService.js";
import { useLoading } from '../../LoadingContext.js';
import { Notification } from "../../components/Notification.js";
import Select from 'react-select';

export default function AddEditNotificationSubscriber(props) {

  const [show, setShow] = useState(true);
  const currentNotificationId = props.notificationSubscriberId;
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [notificationType, setNotificationType] = useState("");
  const [userId, setUserId] = useState("");
  const [userNameErr, setUserNameErr] = useState(false);
  const [userEmailErr, setUserEmailErr] = useState(false);
  const [notificationTypeErr, setNotificationTypeErr] = useState(false);

  const handleClose = () => setShow(false);
  const { loading, setLoading } = useLoading();
  const [dataLoading, setDataLoading] = useState(false);
  const [defaultNotificationType, setdefaultNotificationType] = useState("");

  const Notificationdata = [
    { label: "Company Mapping Notification", value: "COMPANY_MAPPING_NOTIFICATION" },
    { label: "Reference Data Notification", value: "REFERENCE_DATA_NOTIFICATION" },
    { label: "Bad Data Notification - GADT", value: "BAD_DATA_NOTIFICATION_GADT" },
    { label: "Bad Data Notification - VF", value: "BAD_DATA_NOTIFICATION_VF" },
    { label: "No File Available Notification - GADT", value: "NO_FILE_AVAILABLE_NOTIFICATION_GADT" },
  ];

  useEffect(() => {
    if (!show) {
      props.onDataSave(false);
    }
  }, [show])

  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        setDataLoading(true);
        if (currentNotificationId != null && currentNotificationId != 0) {
          await getNotificationDetail(currentNotificationId).then(res => {
            setUserName(res.userName)
            setUserEmail(res.userEmail)
            setNotificationType(res.notificationType)
            const notificationType = Notificationdata?.find(x=> x.value === res.notificationType);
            if(notificationType){
              setdefaultNotificationType(notificationType);
            }
          });
        }
      }
      catch (error) {

      }
      finally {
        setTimeout(() => {
          setDataLoading(false);  
          setLoading(false);      
        }, 1200);
      }
    })();
  }, [currentNotificationId])

  function NameHandler(e) {
    let item = e.target.value;
    if (item == null || item == "") {
      setUserNameErr(true)
    } else {
      setUserNameErr(false)
    }
    setUserName(item);
  }

  function EmailHandler(e) {
    let item = e.target.value;
    if (item == null || item == "") {
      setUserEmailErr(true)
    } else {
      setUserEmailErr(false)
    }
    setUserEmail(item);
  }

  function NotificationHandler(e) {
    let item = e.value;
    if (item == null || item == "") {
      setNotificationTypeErr(true);
    } else {
      setNotificationTypeErr(false);
    }
    setNotificationType(item);
    const notificationType = Notificationdata?.find(x=> x.value === item);
            if(notificationType){
              setdefaultNotificationType(notificationType);
            }
  }


  async function SaveNotification(e) {
    e.preventDefault();
    setLoading(true);
    let message = '';
    let validate = true;

    try {
      if (userName == undefined || userName.trim() == null || userName.trim() == "") {
        validate = false;
        setUserNameErr(true);
        return;
      }
      else {
        setUserNameErr(false);
      }

      if (userEmail == undefined || userEmail.trim() == null || userEmail.trim() == "") {
        validate = false;
        setUserEmailErr(true);
        return;
      }
      else {
        setUserEmailErr(false);
      }

      if (notificationType == undefined || notificationType == null || notificationType == "") {
        validate = false;
        setNotificationTypeErr(true);
      }
      else {
        setNotificationTypeErr(false);
      }
      if (!validate) {
        return;
      }

      await addNotification(currentNotificationId, userId, userName, userEmail, notificationType).then(res => {
        message = res.toString();
      });
    }
    catch (error) {
      message = error.message;
    }
    finally {
      setLoading(false);
      if (validate) {
        if (message == "SUCCESS") {
          props.onDataSave(true, message);
        }
        else {
          Notification(message, 'ERROR')
        }
      }
    }
  }

  return (
    <>
      <Modal
         show={show && !dataLoading}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        className="main-class"
      >
        <Modal.Header closeButton>
          {currentNotificationId == null || currentNotificationId == 0 ? <Modal.Title>Add Notification Subscriber</Modal.Title> : <Modal.Title>Update Notification Subscriber</Modal.Title>}
        </Modal.Header>
        <Form onSubmit={SaveNotification}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label className="mb-1">User Name</Form.Label>
              <Form.Control type="text" autoComplete="off" name="userName" id="userName"
                value={userName} onChange={NameHandler} />{userNameErr ? <span style={{ color: 'red' }}>Please enter user name</span> : null}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="mb-1">User Email</Form.Label>
              <Form.Control type="text" autoComplete="off" name="userEmail" id="userEmail"
                value={userEmail} onChange={EmailHandler} />{userEmailErr ? <span style={{ color: 'red' }}>Please enter user email</span> : null}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="mb-1">Notification Type</Form.Label>
              <br></br>
              <Select
                options={Notificationdata}
                onChange={NotificationHandler}
                value={defaultNotificationType}
                defaultMenuIsOpen={false}
                id="notificationType">
              </Select>
              {notificationTypeErr ? <span style={{ color: 'red' }}>Please select notification subscriber</span> : null}
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button className='btn btn-dft mr-2' onClick={handleClose}> Close</Button>
            <Button className='btn btn-primary' type="submit">Save</Button> <ToastContainer />
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}