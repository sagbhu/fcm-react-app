import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { getEngineAspirationDetail, addEngineAspiration } from "../../services/EngineAspirationService.js";
import { useLoading } from '../../LoadingContext.js';
import { Notification } from "../../components/Notification.js";

export default function AddEditEngineAspiration(props) {

  const [show, setShow] = useState(true);
  const currentEngineAspirationId = props.engineAspirationId;
  const [engineAspiration, setEngineAspiration] = useState("");
  const [description, setDescription] = useState("");
  const [engineAspirationErr, setEngineAspirationErr] = useState(false);
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
        if (currentEngineAspirationId != null && currentEngineAspirationId != 0) {
          await getEngineAspirationDetail(currentEngineAspirationId).then(res => {
            setEngineAspiration(res.engineAspiration)
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
  }, [currentEngineAspirationId])

  function EngineAspirationHandler(e) {
    let item = e.target.value;
    if (item == null || item == "") {
      setEngineAspirationErr(true)
    } else {
      setEngineAspirationErr(false)
    }
    setEngineAspiration(item);
  }

  async function SaveEngineAspiration(e) {
    e.preventDefault();
    setLoading(true);
    let message = '';
    let validate = true;

    try {
      if (engineAspiration == undefined || engineAspiration.trim() == null || engineAspiration.trim() == "") {
        validate = false;
        setEngineAspirationErr(true);
        return;
      }
      else {
        setEngineAspirationErr(false);
      }

      await addEngineAspiration(currentEngineAspirationId, engineAspiration, description).then(res => {
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
          {currentEngineAspirationId == null || currentEngineAspirationId == 0 ? <Modal.Title>Add Engine Aspiration</Modal.Title> : <Modal.Title>Update Engine Aspiration</Modal.Title>}
        </Modal.Header>
        <Form onSubmit={SaveEngineAspiration}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label className="mb-1">Engine Aspiration</Form.Label>
              <Form.Control type="text" autoComplete="off" name="fueltype" id="fueltype"
                value={engineAspiration} disabled={currentEngineAspirationId == null || currentEngineAspirationId == 0 ? false : true} onChange={EngineAspirationHandler} />{engineAspirationErr ? <span style={{ color: 'red' }}>Please enter engine aspiration</span> : null}
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