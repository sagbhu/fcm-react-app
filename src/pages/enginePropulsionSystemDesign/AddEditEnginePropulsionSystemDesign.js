import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { getEnginePropulsionSystemDesignDetail, addEnginePropulsionSystemDesign } from "../../services/EnginePropulsionSystemDesignService.js";
import { useLoading } from '../../LoadingContext.js';
import { Notification } from "../../components/Notification.js";

export default function AddEditEnginePropulsionSystemDesign(props) {

  const [show, setShow] = useState(true);
  const currentEnginePropulsionSystemDesignId = props.enginePropulsionSystemDesignId;
  const [enginePropulsionSystemDesign, setEnginePropulsionSystemDesign] = useState("");
  const [description, setDescription] = useState("");
  const [enginePropulsionSystemDesignErr, setEnginePropulsionSystemDesignErr] = useState(false);
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
        if (currentEnginePropulsionSystemDesignId != null && currentEnginePropulsionSystemDesignId != 0) {
          await getEnginePropulsionSystemDesignDetail(currentEnginePropulsionSystemDesignId).then(res => {
            setEnginePropulsionSystemDesign(res.enginePropulsionSystemDesign)
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
  }, [currentEnginePropulsionSystemDesignId])

  function EnginePropulsionSystemDesignHandler(e) {
    let item = e.target.value;
    if (item == null || item == "") {
      setEnginePropulsionSystemDesignErr(true)
    } else {
      setEnginePropulsionSystemDesignErr(false)
    }
    setEnginePropulsionSystemDesign(item);
  }

  async function SaveEnginePropulsionSystemDesign(e) {
    e.preventDefault();
    setLoading(true);
    let message = '';
    let validate = true;

    try {
      if (enginePropulsionSystemDesign == undefined || enginePropulsionSystemDesign.trim() == null || enginePropulsionSystemDesign.trim() == "") {
        validate = false;
        setEnginePropulsionSystemDesignErr(true);
        return;
      }
      else {
        setEnginePropulsionSystemDesignErr(false);
      }

      await addEnginePropulsionSystemDesign(currentEnginePropulsionSystemDesignId, enginePropulsionSystemDesign, description).then(res => {
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
          {currentEnginePropulsionSystemDesignId == null || currentEnginePropulsionSystemDesignId == 0 ? <Modal.Title>Add Engine Propulsion System Design</Modal.Title> : <Modal.Title>Update Engine Propulsion System Design</Modal.Title>}
        </Modal.Header>
        <Form onSubmit={SaveEnginePropulsionSystemDesign}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label className="mb-1">Engine Propulsion System Design</Form.Label>
              <Form.Control type="text" autoComplete="off" name="fueltype" id="fueltype"
                value={enginePropulsionSystemDesign} disabled={currentEnginePropulsionSystemDesignId == null || currentEnginePropulsionSystemDesignId == 0 ? false : true} onChange={EnginePropulsionSystemDesignHandler} />{enginePropulsionSystemDesignErr ? <span style={{ color: 'red' }}>Please enter engine propulsion system design</span> : null}
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