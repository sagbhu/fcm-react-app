import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { addValveActuation, getValveActuationDetail } from "../../services/EngineValveActuationTypeService.js";
import { useLoading } from '../../LoadingContext.js';
import { Notification } from "../../components/Notification.js";

export default function AddEditEngineValveActuationType(props) {

  const [show, setShow] = useState(true);
  const currentValveActuationId = props.engineValveActuationTypeId;
  const [engineValveActuationType, setEngineValveActuationType] = useState("");
  const [description, setDescription] = useState("");
  const [actuationTypeErr, setActuationTypeErr] = useState(false);
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
        if (currentValveActuationId != null && currentValveActuationId != 0) {
          await getValveActuationDetail(currentValveActuationId).then(res => {
            setEngineValveActuationType(res.engineValveActuationType)
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
  }, [currentValveActuationId])

  function ActuationTypeHandler(e) {
    let item = e.target.value;
    if (item == null || item == "") {
      setActuationTypeErr(true)
    } else {
      setActuationTypeErr(false)
    }
    setEngineValveActuationType(item);
  }

  async function SaveActuationType(e) {
    e.preventDefault();
    setLoading(true);
    let message = '';
    let validate = true;

    try {
      if (engineValveActuationType == undefined || engineValveActuationType.trim() == null || engineValveActuationType.trim() == "") {
        validate = false;
        setActuationTypeErr(true);
        return;
      }
      else {
        setActuationTypeErr(false);
      }

      await addValveActuation(currentValveActuationId, engineValveActuationType, description).then(res => {
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
          {currentValveActuationId == null || currentValveActuationId == 0 ? <Modal.Title>Add Engine Valve Actuation Type</Modal.Title> : <Modal.Title>Update Engine Valve Actuation Type</Modal.Title>}
        </Modal.Header>
        <Form onSubmit={SaveActuationType}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label className="mb-1">Engine Valve Actuation Type</Form.Label>
              <Form.Control type="text" autoComplete="off" name="fueltype" id="fueltype"
                value={engineValveActuationType} disabled={currentValveActuationId == null || currentValveActuationId == 0 ? false : true} onChange={ActuationTypeHandler} />{actuationTypeErr ? <span style={{ color: 'red' }}>Please enter engine valve actuation type</span> : null}
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