import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { getEnginePlatformDetail, addEnginePlatform } from "../../services/EnginePlatformService.js";
import { useLoading } from '../../LoadingContext.js';
import { Notification } from "../../components/Notification.js";

export default function AddEditEnginePlatform(props) {

  const [show, setShow] = useState(true);
  const currentEnginePlatformId = props.enginePlatformId;
  const [enginePlatform, setEnginePlatform] = useState("");
  const [description, setDescription] = useState("");
  const [engineplatformErr, setEnginePlatformErr] = useState(false);
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
        if (currentEnginePlatformId != null && currentEnginePlatformId != 0) {
          await getEnginePlatformDetail(currentEnginePlatformId).then(res => {
            setEnginePlatform(res.enginePlatform)
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
  }, [currentEnginePlatformId])

  function EnginePlatformHandler(e) {
    let item = e.target.value;
    if (item == null || item == "") {
      setEnginePlatformErr(true)
    } else {
      setEnginePlatformErr(false)
    }
    setEnginePlatform(item);
  }

  async function SaveEnginePlatform(e) {
    e.preventDefault();
    setLoading(true);
    let message = '';
    let validate = true;

    try {
      if (enginePlatform == undefined || enginePlatform.trim() == null || enginePlatform.trim() == "") {
        validate = false;
        setEnginePlatformErr(true);
        return;
      }
      else {
        setEnginePlatformErr(false);
      }

      await addEnginePlatform(currentEnginePlatformId, enginePlatform, description).then(res => {
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
          {currentEnginePlatformId == null || currentEnginePlatformId == 0 ? <Modal.Title>Add Engine Platform</Modal.Title> : <Modal.Title>Update Engine Platform</Modal.Title>}
        </Modal.Header>
        <Form onSubmit={SaveEnginePlatform}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label className="mb-1">Engine Platform</Form.Label>
              <Form.Control type="text" autoComplete="off" name="enginePlatform" id="enginePlatform"
                value={enginePlatform} disabled={currentEnginePlatformId == null || currentEnginePlatformId == 0 ? false : true} onChange={EnginePlatformHandler} />{engineplatformErr ? <span style={{ color: 'red' }}>Please enter engine platform</span> : null}
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