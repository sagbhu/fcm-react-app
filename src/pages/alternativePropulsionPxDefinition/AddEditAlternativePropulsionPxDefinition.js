import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { addPxDefinition, getPxDefinitionDetail } from "../../services/AlternativepropulsionpxdefinitionService.js";
import { useLoading } from '../../LoadingContext.js';
import { Notification } from "../../components/Notification.js";

export default function AddEditAlternativePropulsionPxDefinition(props) {

  const [show, setShow] = useState(true);
  const currentPxDefinitionId = props.alternativePropulsionPxDefinitionId;
  const [alternativePropulsionPxDefinition, setAlternativePropulsionPxDefinition] = useState("");
  const [description, setDescription] = useState("");
  const [pxDefinitionErr, setPxDefinitionErr] = useState(false);
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
        if (currentPxDefinitionId != null && currentPxDefinitionId != 0) {
          await getPxDefinitionDetail(currentPxDefinitionId).then(res => {
            setAlternativePropulsionPxDefinition(res.alternativePropulsionPxDefinition)
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
  }, [currentPxDefinitionId])

  function DefinitionHandler(e) {
    let item = e.target.value;
    if (item == null || item == "") {
      setPxDefinitionErr(true)
    } else {
      setPxDefinitionErr(false)
    }
    setAlternativePropulsionPxDefinition(item);
  }

  async function SavePxDefinition(e) {
    e.preventDefault();
    setLoading(true);
    let message = '';
    let validate = true;

    try {
      if (alternativePropulsionPxDefinition == undefined || alternativePropulsionPxDefinition.trim() == null || alternativePropulsionPxDefinition.trim() == "") {
        validate = false;
        setPxDefinitionErr(true);
        return;
      }
      else {
        setPxDefinitionErr(false);
      }

      await addPxDefinition(currentPxDefinitionId, alternativePropulsionPxDefinition, description).then(res => {
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
          {currentPxDefinitionId == null || currentPxDefinitionId == 0 ? <Modal.Title>Add Alternative Propulsion Px Definition</Modal.Title> : <Modal.Title>Update Alternative Propulsion Px Definition</Modal.Title>}
        </Modal.Header>
        <Form onSubmit={SavePxDefinition}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label className="mb-1">Alternative Propulsion Px Definition</Form.Label>
              <Form.Control type="text" autoComplete="off" name="fueltype" id="fueltype"
                value={alternativePropulsionPxDefinition} disabled={currentPxDefinitionId == null || currentPxDefinitionId == 0 ? false : true} onChange={DefinitionHandler} />{pxDefinitionErr ? <span style={{ color: 'red' }}>Please enter alternative propulsion px definition</span> : null}
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