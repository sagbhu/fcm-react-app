import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { getValvetrainDetail, addValvetrain } from "../../services/EngineValvetrainService.js";
import { useLoading } from '../../LoadingContext.js';
import { Notification } from "../../components/Notification.js";

export default function AddEditEngineValvetrain(props) {

  const [show, setShow] = useState(true);
  const currentValvetrainId = props.engineValvetrainId ;
  const [engineValvetrain, setEngineValvetrain] = useState("");
  const [description, setDescription] = useState("");
  const [engineValvetrainErr, setEngineValvetrainErr] = useState(false);
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
        if (currentValvetrainId != null && currentValvetrainId != 0) {
          await getValvetrainDetail (currentValvetrainId).then(res => {
            setEngineValvetrain(res.engineValvetrain)
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
  }, [currentValvetrainId])

  function EngineValvetrainHandler(e) {
    let item = e.target.value;
    if (item == null || item == "") {
      setEngineValvetrainErr(true)
    } else {
      setEngineValvetrainErr(false)
    }
    setEngineValvetrain(item);
  }

  async function SaveEngineValvetrain(e) {
    e.preventDefault();
    setLoading(true);
    let message = '';
    let validate = true;

    try {
      if (engineValvetrain == undefined || engineValvetrain.trim() == null || engineValvetrain.trim() == "") {
        validate = false;
        setEngineValvetrainErr(true);
        return;
      }
      else {
        setEngineValvetrainErr(false);
      }

      await addValvetrain (currentValvetrainId, engineValvetrain, description).then(res => {
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
          {currentValvetrainId == null || currentValvetrainId == 0 ? <Modal.Title>Add Engine Valvetrain</Modal.Title> : <Modal.Title>Update Engine Valvetrain</Modal.Title>}
        </Modal.Header>
        <Form onSubmit={SaveEngineValvetrain}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label className="mb-1">Engine Valvetrain</Form.Label>
              <Form.Control type="text" autoComplete="off" name="fueltype" id="fueltype"
                value={engineValvetrain} disabled={currentValvetrainId == null || currentValvetrainId == 0 ? false : true} onChange={EngineValvetrainHandler} />{engineValvetrainErr ? <span style={{ color: 'red' }}>Please enter engine valvetrain</span> : null}
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