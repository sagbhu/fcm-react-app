import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { getRegistrationTypeDetail, addRegistrationType } from "../../services/RegistrationTypeService.js";
import 'react-toastify/dist/ReactToastify.css';
import { useLoading } from '../../LoadingContext.js';
import { Notification } from "../../components/Notification.js";

export default function AddEditRegistrationType(props) {
  const [show, setShow] = useState(true);
  const currentRegistrationTypeId = props.registrationTypeId;
  const [registrationType, setRegistrationType] = useState("");
  const [description, setDescription] = useState("");
  const [registrationTypeErr, setRegistrationTypeErr] = useState(false);
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
        setLoading(true);
        setDataLoading(true);
        if (currentRegistrationTypeId != null && currentRegistrationTypeId != 0) {
          getRegistrationTypeDetail(currentRegistrationTypeId).then(res => {
            setRegistrationType(res.registrationType)
            setDescription(res.description)
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
  }, [currentRegistrationTypeId])

  function RegistrationHandler(e) {
    let item = e.target.value;
    if (item == null || item == "") {
      setRegistrationTypeErr(true)
    } else {
      setRegistrationTypeErr(false)
    }
    setRegistrationType(item);
  }

  async function SaveRegistrationType(e) {
    e.preventDefault();
    setLoading(true);
    let message = '';
    let validate = true;
    try {
      if (registrationType == undefined || registrationType.trim() == null || registrationType.trim() == "") {
        validate = false;
        setRegistrationTypeErr(true);
        return;
      }
      else {
        setRegistrationTypeErr(false);
      }

      await addRegistrationType(currentRegistrationTypeId, registrationType, description).then(res => {
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
          {currentRegistrationTypeId == null || currentRegistrationTypeId == 0 ? <Modal.Title>Add Registration Type</Modal.Title> : <Modal.Title>Update Registration Type</Modal.Title>}
        </Modal.Header>
        <Form onSubmit={(event) => SaveRegistrationType(event)}>
          <Modal.Body>

            <Form.Group className="mb-3">
              <Form.Label className="mb-1">Registration Type</Form.Label>
              <Form.Control type="text" autoComplete="off" name="fuelType" id="fuelType"
                value={registrationType} disabled={currentRegistrationTypeId == null || currentRegistrationTypeId == 0 ? false : true} onChange={RegistrationHandler} />{registrationTypeErr ? <span style={{ color: 'red' }}>Please enter registration type</span> : null}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="mb-1">Description</Form.Label>
              <Form.Control type="description" autoComplete="off" name="description" id="description"
                as="textarea" value={description} onChange={(e) => { setDescription(e.target.value) }}
                style={{ height: '100px' }}
              />
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