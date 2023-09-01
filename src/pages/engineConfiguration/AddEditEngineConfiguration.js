import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { getEngineConfigurationDetail, addEngineConfiguration } from "../../services/EngineConfigurationService.js";
import { useLoading } from '../../LoadingContext.js';
import { Notification } from "../../components/Notification.js";

export default function AddEditEngineConfiguration(props) {

  const [show, setShow] = useState(true);
  const currentEngineConfigurationId = props.engineConfigurationId;
  const [engineConfiguration, setEngineConfiguration] = useState("");
  const [description, setDescription] = useState("");
  const [engineConfigurationErr, setEngineConfigurationErr] = useState(false);
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
        if (currentEngineConfigurationId != null && currentEngineConfigurationId != 0) {
          await getEngineConfigurationDetail(currentEngineConfigurationId).then(res => {
            setEngineConfiguration(res.engineConfiguration)
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
  }, [currentEngineConfigurationId])

  function EngineConfigurationHandler(e) {
    let item = e.target.value;
    if (item == null || item == "") {
      setEngineConfigurationErr(true)
    } else {
      setEngineConfigurationErr(false)
    }
    setEngineConfiguration(item);
  }

  async function SaveEngineConfiguration(e) {
    e.preventDefault();
    setLoading(true);
    let message = '';
    let validate = true;

    try {
      if (engineConfiguration == undefined || engineConfiguration.trim() == null || engineConfiguration.trim() == "") {
        validate = false;
        setEngineConfigurationErr(true);
        return;
      }
      else {
        setEngineConfigurationErr(false);
      }

      await addEngineConfiguration(currentEngineConfigurationId, engineConfiguration, description).then(res => {
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
          {currentEngineConfigurationId == null || currentEngineConfigurationId == 0 ? <Modal.Title>Add Engine Configuration</Modal.Title> : <Modal.Title>Update Engine Configuration</Modal.Title>}
        </Modal.Header>
        <Form onSubmit={SaveEngineConfiguration}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label className="mb-1">Engine Configuration</Form.Label>
              <Form.Control type="text" autoComplete="off" name="engineConfiguration" id="engineConfiguration"
                value={engineConfiguration} disabled={currentEngineConfigurationId == null || currentEngineConfigurationId == 0 ? false : true} onChange={EngineConfigurationHandler} />{engineConfigurationErr ? <span style={{ color: 'red' }}>Please enter engine configuration</span> : null}
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