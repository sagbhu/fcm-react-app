import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { getDriveDetail, addDrive } from "../../services/TransmissionDriveTypeService.js"
import { useLoading } from '../../LoadingContext.js';
import { Notification } from "../../components/Notification.js";

export default function AddEditTransmissionDriveType(props) {

  const [show, setShow] = useState(true);
  const currentTransmissionDriveTypeId = props.transmissionDriveTypeId;
  const [transmissionDriveType, setTransmissionDriveType] = useState("");
  const [description, setDescription] = useState("");
  const [driveTypeErr, setDriveTypeErr] = useState(false);
  const handleClose = () => setShow(false);
  const { loading, setLoading } = useLoading();
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
        if (currentTransmissionDriveTypeId != null && currentTransmissionDriveTypeId != 0) {
          await getDriveDetail(currentTransmissionDriveTypeId).then(res => {
            setTransmissionDriveType(res.transmissionDriveType)
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
  }, [currentTransmissionDriveTypeId])

  function DriveTypeHandler(e) {
    let item = e.target.value;
    if (item == null || item == "") {
      setDriveTypeErr(true)
    } else {
      setDriveTypeErr(false)
    }
    setTransmissionDriveType(item);
  }

  async function SaveDriveType(e) {
    e.preventDefault();
    setLoading(true);
    let message = '';
    let validate = true;

    try {
      if (transmissionDriveType == undefined || transmissionDriveType.trim() == null || transmissionDriveType.trim() == "") {
        validate = false;
        setDriveTypeErr(true);
        return;
      }
      else {
        setDriveTypeErr(false);
      }

      await addDrive(currentTransmissionDriveTypeId, transmissionDriveType, description).then(res => {
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
          {currentTransmissionDriveTypeId == null || currentTransmissionDriveTypeId == 0 ? <Modal.Title>Add Transmission Drive Type</Modal.Title> : <Modal.Title>Update Transmission Drive Type</Modal.Title>}
        </Modal.Header>
        <Form onSubmit={SaveDriveType}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label className="mb-1">Transmission Drive Type</Form.Label>
              <Form.Control type="text" autoComplete="off" name="fueltype" id="fueltype"
                value={transmissionDriveType} disabled={currentTransmissionDriveTypeId == null || currentTransmissionDriveTypeId == 0 ? false : true} onChange={DriveTypeHandler} />{driveTypeErr ? <span style={{ color: 'red' }}>Please enter transmission drive type</span> : null}
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
            <Button className='btn btn-dft mr-2' onClick={handleClose}> Close</Button>
            <Button className='btn btn-primary' type="submit">Save</Button> <ToastContainer />
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}