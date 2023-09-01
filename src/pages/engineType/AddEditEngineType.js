import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { getEngineTypeDetail, addEngineType } from "../../services/EngineTypeService.js";
import 'react-toastify/dist/ReactToastify.css';
import { useLoading } from '../../LoadingContext.js';
import { Notification } from "../../components/Notification.js";


export default function AddEditEngineType(props) {
  const [show, setShow] = useState(true);
  const currentEngineTypeId = props.engineTypeId;
  const [engineType, setEngineType] = useState("");
  const [description, setDescription] = useState("");
  const [engineTypeErr, setEngineTypeErr] = useState(false);
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
        if (currentEngineTypeId != null && currentEngineTypeId != 0) {
          getEngineTypeDetail(currentEngineTypeId).then(res => {
            setEngineType(res.engineType)
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
  }, [currentEngineTypeId])



  function EngineHandler(e) {
    let item = e.target.value;
    if ((item == null || item == "")) {
      setEngineTypeErr(true)

    } else {
      setEngineTypeErr(false)
    }
    setEngineType(item);
  }

  async function SaveEngineType(e) {
    e.preventDefault();
    setLoading(true);
    let message = '';
    let validate = true;
    try {
      if (engineType == undefined || engineType.trim() == null || engineType.trim() == "") {
        validate = false;
        setEngineTypeErr(true);
        return;
      }
      else {
        setEngineTypeErr(false);
      }


      await addEngineType(currentEngineTypeId, engineType, description).then(res => {
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
          {currentEngineTypeId == null || currentEngineTypeId == 0 ? <Modal.Title>Add Engine Type</Modal.Title> : <Modal.Title>Update Engine Type</Modal.Title>}
        </Modal.Header>
        <Form onSubmit={(event) => SaveEngineType(event)}>
          <Modal.Body>

            <Form.Group className="mb-3">
              <Form.Label className="mb-1">Engine Type</Form.Label>
              <Form.Control type="text" autoComplete="off" name="engineType" id="engineType"
                value={engineType} disabled={currentEngineTypeId == null || currentEngineTypeId == 0 ? false : true} onChange={EngineHandler} />{engineTypeErr ? <span style={{ color: 'red' }}>Please enter engine type</span> : null}
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
            <Button className='btn btn-primary mr-1' type="submit">Save</Button> <ToastContainer />
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}