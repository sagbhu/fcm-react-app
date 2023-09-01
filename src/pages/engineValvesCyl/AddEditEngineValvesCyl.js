import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { getValvesCylDetail, addValvesCyl } from "../../services/EngineValvesCylService.js";
import { useLoading } from '../../LoadingContext.js';
import { Notification } from "../../components/Notification.js";

export default function AddEditEngineValvesCyl(props) {

  const [show, setShow] = useState(true);
  const currentValvesCylId = props.engineValvesCylId;
  const [engineValvesCyl, setEngineValvesCyl] = useState("");
  const [description, setDescription] = useState("");
  const [engineValvesCylErr, setEngineValvesCylErr] = useState(false);
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
        if (currentValvesCylId != null && currentValvesCylId != 0) {
          await getValvesCylDetail(currentValvesCylId).then(res => {
            setEngineValvesCyl(res.engineValvesCyl)
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
  }, [currentValvesCylId])

  function EngineValvesCylHandler(e) {
    let item = e.target.value;
    if (item == null || item == "") {
      setEngineValvesCylErr(true)
    } else {
      setEngineValvesCylErr(false)
    }
    setEngineValvesCyl(item);
  }

  async function SaveEngineValvesCyl(e) {
    e.preventDefault();
    setLoading(true);
    let message = '';
    let validate = true;

    try {
      if (engineValvesCyl == undefined || engineValvesCyl.trim() == null || engineValvesCyl.trim() == "") {
        validate = false;
        setEngineValvesCylErr(true);
        return;
      }
      else {
        setEngineValvesCylErr(false);
      }

      await addValvesCyl(currentValvesCylId, engineValvesCyl, description).then(res => {
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
          {currentValvesCylId == null || currentValvesCylId == 0 ? <Modal.Title>Add Engine valves cyl</Modal.Title> : <Modal.Title>Update Engine valves cyl</Modal.Title>}
        </Modal.Header>
        <Form onSubmit={SaveEngineValvesCyl}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label className="mb-1">Engine valves cyl</Form.Label>
              <Form.Control type="text" autoComplete="off" name="fueltype" id="fueltype"
                value={engineValvesCyl} disabled={currentValvesCylId == null || currentValvesCylId == 0 ? false : true} onChange={EngineValvesCylHandler} />{engineValvesCylErr ? <span style={{ color: 'red' }}>Please enter engine valves cyl</span> : null}
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