import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { getDeactivationDetail, addDeactivation } from "../../services/EngineCylinderDeactivationService.js"
import { useLoading } from '../../LoadingContext.js';
import { Notification } from "../../components/Notification.js";

export default function AddEditEngineCylinderDeactivation(props) {

  const [show, setShow] = useState(true);
  const currentDeactivationId = props.engineCylinderDeactivationId;
  const [engineCylinderDeactivation, setEngineCylinderDeactivation] = useState("");
  const [description, setDescription] = useState("");
  const [deactivationErr, setDeactivationErr] = useState(false);
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
        if (currentDeactivationId != null && currentDeactivationId != 0) {
          await getDeactivationDetail(currentDeactivationId).then(res => {
            setEngineCylinderDeactivation(res.engineCylinderDeactivation)
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
  }, [currentDeactivationId])

  function DeactivationHandler(e) {
    let item = e.target.value;
    if (item == null || item == "") {
      setDeactivationErr(true)
    } else {
      setDeactivationErr(false)
    }
    setEngineCylinderDeactivation(item);
  }

  async function SaveDeactivation(e) {
    e.preventDefault();
    setLoading(true);
    let message = '';
    let validate = true;

    try {
      if (engineCylinderDeactivation == undefined || engineCylinderDeactivation.trim() == null || engineCylinderDeactivation.trim() == "") {
        validate = false;
        setDeactivationErr(true);
        return;
      }
      else {
        setDeactivationErr(false);
      }

      await addDeactivation(currentDeactivationId, engineCylinderDeactivation, description).then(res => {
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
          {currentDeactivationId == null || currentDeactivationId == 0 ? <Modal.Title>Add Engine Cylinder Deactivation</Modal.Title> : <Modal.Title>Update Engine Cylinder Deactivation</Modal.Title>}
        </Modal.Header>
        <Form onSubmit={SaveDeactivation}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label className="mb-1">Engine Cylinder Deactivation</Form.Label>
              <Form.Control type="text" autoComplete="off" name="fueltype" id="fueltype"
                value={engineCylinderDeactivation} disabled={currentDeactivationId == null || currentDeactivationId == 0 ? false : true} onChange={DeactivationHandler} />{deactivationErr ? <span style={{ color: 'red' }}>Please enter engine cylinder deactivation</span> : null}
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