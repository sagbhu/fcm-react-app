import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { getSystemDesignDetail, addSystemDesign } from "../../services/PropulsionSystemDesignService.js";
import { useLoading } from '../../LoadingContext.js';
import { Notification } from "../../components/Notification.js";

export default function AddEditPropulsionSystemDesign(props) {

  const [show, setShow] = useState(true);
  const currentSystemDesignId = props.propulsionSystemDesignId ;
  const [propulsionSystemDesign, setPropulsionSystemDesign] = useState("");
  const [description, setDescription] = useState("");
  const [systemDesignErr, setSystemDesignErr] = useState(false);
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
        if (currentSystemDesignId != null && currentSystemDesignId != 0) {
          await getSystemDesignDetail(currentSystemDesignId).then(res => {
            setPropulsionSystemDesign(res.propulsionSystemDesign)
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
  }, [currentSystemDesignId])

  function SystemDesignHandler(e) {
    let item = e.target.value;
    if (item == null || item == "") {
      setSystemDesignErr(true)
    } else {
      setSystemDesignErr(false)
    }
    setPropulsionSystemDesign(item);
  }

  async function SaveSystemDesign(e) {
    e.preventDefault();
    setLoading(true);
    let message = '';
    let validate = true;

    try {
      if (propulsionSystemDesign == undefined || propulsionSystemDesign.trim() == null || propulsionSystemDesign.trim() == "") {
        validate = false;
        setSystemDesignErr(true);
        return;
      }
      else {
        setSystemDesignErr(false);
      }

      await addSystemDesign(currentSystemDesignId, propulsionSystemDesign, description).then(res => {
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
          {currentSystemDesignId == null || currentSystemDesignId == 0 ? <Modal.Title>Add Propulsion System Design</Modal.Title> : <Modal.Title>Update Propulsion System Design</Modal.Title>}
        </Modal.Header>
        <Form onSubmit={SaveSystemDesign}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label className="mb-1">Propulsion System Design</Form.Label>
              <Form.Control type="text" autoComplete="off" name="fueltype" id="fueltype"
                value={propulsionSystemDesign} disabled={currentSystemDesignId == null || currentSystemDesignId == 0 ? false : true} onChange={SystemDesignHandler} />{systemDesignErr ? <span style={{ color: 'red' }}>Please enter propulsion system design</span> : null}
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