import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { getAlternativePropulsionSystemSubDesignArchitectureDetail, addAlternativePropulsionSystemSubDesignArchitecture } from "../../services/AlternativePropulsionSystemSubDesignArchitectureService.js";
import { useLoading } from '../../LoadingContext.js';
import { Notification } from "../../components/Notification.js";

export default function AddEditAlternativePropulsionSystemSubDesignArchitecture(props) {

  const [show, setShow] = useState(true);
  const currentAlternativePropulsionSystemSubDesignArchitectureId = props.alternativePropulsionSystemSubDesignArchitectureId;
  const [alternativePropulsionSystemSubDesignArchitecture, setAlternativePropulsionSystemSubDesignArchitecture] = useState("");
  
  const [alternativePropulsionPxDefinition, setAlternativePropulsionPxDefinition] = useState("");
  const [enginePropulsionSystem, setEnginePropulsionSystem] = useState("");
  const [example, setExample] = useState("");
  const [description, setDescription] = useState("");  
  const [alternativePropulsionSystemSubDesignArchitectureErr, setAlternativePropulsionSystemSubDesignArchitectureErr] = useState(false);
  const [alternativePropulsionPxDefinitionErr, setAlternativePropulsionPxDefinitionErr] = useState(false);
  const [enginePropulsionSystemErr, setEnginePropulsionSystemErr] = useState(false);
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
        if (currentAlternativePropulsionSystemSubDesignArchitectureId != null && currentAlternativePropulsionSystemSubDesignArchitectureId != 0) {
          await getAlternativePropulsionSystemSubDesignArchitectureDetail(currentAlternativePropulsionSystemSubDesignArchitectureId).then(res => {
            setAlternativePropulsionSystemSubDesignArchitecture(res.alternativePropulsionSystemSubDesignArchitecture)
            setAlternativePropulsionPxDefinition(res.alternativePropulsionPxDefinition)
            setEnginePropulsionSystem(res.enginePropulsionSystem)
            setExample(res.example)
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
  }, [currentAlternativePropulsionSystemSubDesignArchitectureId])

  function AlternativePropulsionSystemSubDesignArchitectureHandler(e) {
    let item = e.target.value;
    if (item == null || item == "") {
      setAlternativePropulsionSystemSubDesignArchitectureErr(true)
    } else {
      setAlternativePropulsionSystemSubDesignArchitectureErr(false)
    }
    setAlternativePropulsionSystemSubDesignArchitecture(item);
  }

  function AlternativePropulsionPxDefinitionHandler(e) {
    let item = e.target.value;
    if (item == null || item == "") {
      setAlternativePropulsionPxDefinitionErr(true)
    } else {
      setAlternativePropulsionPxDefinitionErr(false)
    }
    setAlternativePropulsionPxDefinition(item);
  }

  function enginePropulsionSystemHandler(e) {
    let item = e.target.value;
    if (item == null || item == "") {
      setEnginePropulsionSystemErr(true)
    } else {
      setEnginePropulsionSystemErr(false)
    }
    setEnginePropulsionSystem(item);
  }

  async function SaveAlternativePropulsionSystemSubDesignArchitecture(e) {
    e.preventDefault();
    setLoading(true);
    let message = '';
    let validate = true;

    try {
      if (alternativePropulsionSystemSubDesignArchitecture == undefined || alternativePropulsionSystemSubDesignArchitecture.trim() == null || alternativePropulsionSystemSubDesignArchitecture.trim() == "") {
        validate = false;
        setAlternativePropulsionSystemSubDesignArchitectureErr(true);
      }
      else {
        setAlternativePropulsionSystemSubDesignArchitectureErr(false);
      }
      if (alternativePropulsionPxDefinition == undefined || alternativePropulsionPxDefinition.trim() == null || alternativePropulsionPxDefinition.trim() == "") {
        validate = false;
        setAlternativePropulsionPxDefinitionErr(true);
      }
      else {
        setAlternativePropulsionPxDefinitionErr(false);
      }
      if (enginePropulsionSystem == undefined || enginePropulsionSystem.trim() == null || enginePropulsionSystem.trim() == "") {
        validate = false;
        setEnginePropulsionSystemErr(true);
      }
      else {
        setEnginePropulsionSystemErr(false);
      }
      if (!validate) {
        return;
      }
      await addAlternativePropulsionSystemSubDesignArchitecture(currentAlternativePropulsionSystemSubDesignArchitectureId, alternativePropulsionSystemSubDesignArchitecture, alternativePropulsionPxDefinition, enginePropulsionSystem, example, description ).then(res => {
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
          {currentAlternativePropulsionSystemSubDesignArchitectureId == null || currentAlternativePropulsionSystemSubDesignArchitectureId == 0 ? <Modal.Title>Add Alternative Propulsion System Sub Design Architecture</Modal.Title> : <Modal.Title>Update Alternative Propulsion System Sub Design Architecture</Modal.Title>}
        </Modal.Header>
        <Form onSubmit={SaveAlternativePropulsionSystemSubDesignArchitecture}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label className="mb-1">Alternative Propulsion System Sub Design Architecture</Form.Label>
              <Form.Control type="text" autoComplete="off" name="alternativePropulsionSystemSubDesignArchitecture" id="alternativePropulsionSystemSubDesignArchitecture"
                value={alternativePropulsionSystemSubDesignArchitecture} disabled={currentAlternativePropulsionSystemSubDesignArchitectureId == null || currentAlternativePropulsionSystemSubDesignArchitectureId == 0 ? false : true} onChange={AlternativePropulsionSystemSubDesignArchitectureHandler} />{alternativePropulsionSystemSubDesignArchitectureErr ? <span style={{ color: 'red' }}>Please enter alternative propulsion system sub design architecture</span> : null}
            </Form.Group>            
            <Form.Group className="mb-3">
              <Form.Label className="mb-1">Alternative Propulsion Px Definition</Form.Label>
              <Form.Control type="text" autoComplete="off" name="alternativePropulsionPxDefinition" id="alternativePropulsionPxDefinition"
                value={alternativePropulsionPxDefinition} disabled={currentAlternativePropulsionSystemSubDesignArchitectureId == null || currentAlternativePropulsionSystemSubDesignArchitectureId == 0 ? false : true} onChange={AlternativePropulsionPxDefinitionHandler} />{alternativePropulsionPxDefinitionErr ? <span style={{ color: 'red' }}>Please enter alternative propulsion Px definition</span> : null}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="mb-1">Engine Propulsion System</Form.Label>
              <Form.Control type="text" autoComplete="off" name="enginePropulsionSystem" id="enginePropulsionSystem"
                value={enginePropulsionSystem} disabled={currentAlternativePropulsionSystemSubDesignArchitectureId == null || currentAlternativePropulsionSystemSubDesignArchitectureId == 0 ? false : true} onChange={enginePropulsionSystemHandler} />{enginePropulsionSystemErr ? <span style={{ color: 'red' }}>Please enter engine propulsion system</span> : null}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="mb-1">Example</Form.Label>
              <Form.Control type="text" autoComplete="off" name="example" id="example"
                value={example} onChange={(e) => { setExample(e.target.value) }} />
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