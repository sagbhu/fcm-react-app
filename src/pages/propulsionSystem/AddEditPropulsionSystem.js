import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { getPropulsionSystemDetail, addPropulsionSystem } from "../../services/PropulsionSystemService.js";
import 'react-toastify/dist/ReactToastify.css';
import { useLoading } from '../../LoadingContext.js';
import { Notification } from "../../components/Notification.js";

export default function AddEditPropulsionSystem(props) {
  const [show, setShow] = useState(true);
  const currentPropulsionSystemId = props.propulsionSystemId;
  const [propulsionSystem, setPropulsionSystem] = useState("");
  const [description, setDescription] = useState("");
  const [propulsionSystemErr, setPropulsionSystemErr] = useState(false);
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
        if (currentPropulsionSystemId != null && currentPropulsionSystemId != 0) {
          getPropulsionSystemDetail(currentPropulsionSystemId).then(res => {
            setPropulsionSystem(res.propulsionSystem)
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
  }, [currentPropulsionSystemId])

  function PropulsionHandler(e) {
    let item = e.target.value;
    if (item == null || item == "") {
      setPropulsionSystemErr(true)

    } else {
      setPropulsionSystemErr(false)
    }
    setPropulsionSystem(item);
  }

  async function SavePropulsionSystem(e) {
    e.preventDefault();
    setLoading(true);
    let message = '';
    let validate = true;
    try {
      if (propulsionSystem == undefined || propulsionSystem.trim() == null || propulsionSystem.trim() == "") {
        validate = false;
        setPropulsionSystemErr(true);
        return;
      }
      else {
        setPropulsionSystemErr(false);
      }

      await addPropulsionSystem(currentPropulsionSystemId, propulsionSystem, description).then(res => {
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
          {currentPropulsionSystemId == null || currentPropulsionSystemId == 0 ? <Modal.Title>Add Propulsion System </Modal.Title> : <Modal.Title>Update Propulsion System </Modal.Title>}
        </Modal.Header>
        <Form onSubmit={(event) => SavePropulsionSystem(event)}>
          <Modal.Body>

            <Form.Group className="mb-3">
              <Form.Label className="mb-1">Propulsion System</Form.Label>
              <Form.Control type="text" autoComplete="off" name="propulsionSystem" id="propulsionSystem"
                value={propulsionSystem} disabled={currentPropulsionSystemId == null || currentPropulsionSystemId == 0 ? false : true} onChange={PropulsionHandler} />{propulsionSystemErr ? <span style={{ color: 'red' }}>Please enter propulsion system</span> : null}
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