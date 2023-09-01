import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { getUserDetail, addUser } from "../../services/UserService.js";
import { useLoading } from '../../LoadingContext.js';
import { Notification } from "../../components/Notification.js";

export default function AddEditUser(props) {
  const [show, setShow] = useState(true);
  const currentUserId = props.userId;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [firstNameErr, setFirstNameErr] = useState(false);
  const [lastNameErr, setLastNameErr] = useState(false);
  const [emailAddressErr, setEmailAddressErr] = useState(false);
  const [emailAddressValidation, setEmailAddressValidation] = useState("");
  const handleClose = () => setShow(false);
  const { setLoading } = useLoading();
  const [dataLoading, setDataLoading] = useState(false);

  useEffect(() => {
    if (!show) {
      props.onDataSave(false);
    }
  }, [show])

  useEffect(() => {
    (async function () {
      try {
        setDataLoading(true);
        setLoading(true);

        if (currentUserId != null && currentUserId != 0) {
          await getUserDetail(currentUserId).then(res => {
        
              setFirstName(res.firstName)
              setLastName(res.lastName)
              setEmailAddress(res.emailAddress)
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
  }, [currentUserId])





  // useEffect(() => {
  //   if (currentUserId != null) {
  //     getUserDetail(currentUserId).then(res => {
  //       setFirstName(res.firstName)
  //       setLastName(res.lastName)
  //       setEmailAddress(res.emailAddress)
  //     });
  //   }
  // }, [currentUserId])

  function FirstNameHandler(e) {
    let item = e.target.value;
    if (item == null || item == "") {
      setFirstNameErr(true)

    } else {
      setFirstNameErr(false)
    }
    setFirstName(item);
  }

  function LastNameHandler(e) {
    let item = e.target.value;
    if (item == null || item == "") {
      setLastNameErr(true)

    } else {
      setLastNameErr(false)
    }
    setLastName(item);
  }


  const emailRegex = /^[a-zA-Z0-9-.]+@+[a-zA-Z0-9]+.+[A-z]/;

  function EmailHandler(e) {
    let item = e.target.value;
    if (item == null || item == "") {
      setEmailAddressErr(true)
    } else if (!emailRegex.test(item)) {
      setEmailAddressErr(true)
    } else {
      setLastNameErr(false)
    }
    setEmailAddress(item);
  };

  async function SaveUser(e) {
    e.preventDefault();
    setLoading(true);
    let message = '';
    let validate = true;
    try {
      if (firstName == null || firstName == "") {
        setFirstNameErr(true);
        validate = false;
        return; 
      }
      else {
        setFirstNameErr(false);
      }

      if (lastName == null || lastName == "") {
        setLastNameErr(true);
        validate = false;
        return;
      }
      else {
        setLastNameErr(false);
      }

      if (emailAddress == null || emailAddress == "") {
        setEmailAddressErr(true);
        setEmailAddressValidation("Please enter email address")
        validate = false;
        return;
      }
      else if (!emailRegex.test(emailAddress)) {
        setEmailAddressValidation("Please enter valid email address")
        setEmailAddressErr(true);
        validate = false;
        return;
      } else {
        setEmailAddressErr(false);
      }

      await addUser(currentUserId, firstName, lastName, emailAddress).then(res => {
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
      };
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
          {currentUserId == null || currentUserId == 0 ? <Modal.Title>Add User</Modal.Title> : <Modal.Title>Update User</Modal.Title>}
        </Modal.Header>
        <Form onSubmit={(event) => SaveUser(event)}>
          <Modal.Body>

            <Form.Group className="mb-3">
              <Form.Label className="mb-1">First Name</Form.Label>
              <Form.Control type="text" autoComplete="off" name="firstName" id="firstName"
                value={firstName} onChange={FirstNameHandler} />{firstNameErr ? <span style={{ color: 'red' }}>Please enter first name</span> : null}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="mb-1">Last Name</Form.Label>
              <Form.Control type="lastName" autoComplete="off" name="lastName" id="lastName"
                value={lastName} onChange={LastNameHandler} />{lastNameErr ? <span style={{ color: 'red' }}>Please enter last name</span> : null}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="mb-1">Email Address</Form.Label>
              <Form.Control type="emailAddress" autoComplete="off" name="emailAddress" id="emailAddress"
                value={emailAddress} onChange={EmailHandler} />{emailAddressErr ? <span style={{ color: 'red' }}>{emailAddressValidation} </span> : null}
            </Form.Group>

          </Modal.Body>
          <Modal.Footer>
            <Button className='btn btn-dft mr-2' onClick={handleClose}>Close</Button>
            <Button className='btn btn-primary' type="submit">Save</Button> <ToastContainer />
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}