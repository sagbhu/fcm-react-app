import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { getEngineFuelSystemDetail, addEngineFuelSystem } from "../../services/EngineFuelSystemService.js";
import { useLoading } from '../../LoadingContext.js';
import { Notification } from "../../components/Notification.js";

export default function AddEditEngineFuelSystem(props) {

  const [show, setShow] = useState(true);
  const currentEngineFuelSystemId = props.engineFuelSystemId;
  const [engineFuelSystem, setEngineFuelSystem] = useState("");
  const [description, setDescription] = useState("");
  const [engineFuelSystemErr, setEngineFuelSystemErr] = useState(false);
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
        if (currentEngineFuelSystemId != null && currentEngineFuelSystemId != 0) {
          await getEngineFuelSystemDetail(currentEngineFuelSystemId).then(res => {
            setEngineFuelSystem(res.engineFuelSystem)
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
  }, [currentEngineFuelSystemId])

  function EngineFuelSystemHandler(e) {
    let item = e.target.value;
    if (item == null || item == "") {
      setEngineFuelSystemErr(true)
    } else {
      setEngineFuelSystemErr(false)
    }
    setEngineFuelSystem(item);
  }

  async function SaveEngineFuelSystem(e) {
    e.preventDefault();
    setLoading(true);
    let message = '';
    let validate = true;

    try {
      if (engineFuelSystem == undefined || engineFuelSystem.trim() == null || engineFuelSystem.trim() == "") {
        validate = false;
        setEngineFuelSystemErr(true);
        return;
      }
      else {
        setEngineFuelSystemErr(false);
      }

      await addEngineFuelSystem(currentEngineFuelSystemId, engineFuelSystem, description).then(res => {
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
          {currentEngineFuelSystemId == null || currentEngineFuelSystemId == 0 ? <Modal.Title>Add Engine Fuel System</Modal.Title> : <Modal.Title>Update Engine Fuel System</Modal.Title>}
        </Modal.Header>
        <Form onSubmit={SaveEngineFuelSystem}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label className="mb-1">Engine Fuel System</Form.Label>
              <Form.Control type="text" autoComplete="off" name="engineFuelSystem" id="engineFuelSystem"
                value={engineFuelSystem} disabled={currentEngineFuelSystemId == null || currentEngineFuelSystemId == 0 ? false : true} onChange={EngineFuelSystemHandler} />{engineFuelSystemErr ? <span style={{ color: 'red' }}>Please enter engine fuel system</span> : null}
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