import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { getEngineFuelTypeDetail, addEngineFuelType } from "../../services/EngineFuelTypeService.js";
import 'react-toastify/dist/ReactToastify.css';
import { useLoading } from '../../LoadingContext.js';
import { Notification } from "../../components/Notification.js";


export default function AddEditEngineFuelType(props) {
  const [show, setShow] = useState(true);
  const currentEngineFuelTypeId = props.engineFuelTypeId;
  const [engineFuelType, setEngineFuelType] = useState("");
  const [description, setDescription] = useState("");
  const [engineFuelTypeErr, setEngineFuelTypeErr] = useState(false);
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
        if (currentEngineFuelTypeId != null && currentEngineFuelTypeId != 0) {
          getEngineFuelTypeDetail(currentEngineFuelTypeId).then(res => {
            setEngineFuelType(res.engineFuelType)
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
  }, [currentEngineFuelTypeId])



  function EngineFuelTypeHandler(e) {
    let item = e.target.value;
    if ((item == null || item == "")) {
      setEngineFuelTypeErr(true)

    } else {
      setEngineFuelTypeErr(false)
    }
    setEngineFuelType(item);
  }

  async function SaveEngineFuelType(e) {
    e.preventDefault();
    setLoading(true);
    let message = '';
    let validate = true;
    try {
      if (engineFuelType == undefined || engineFuelType.trim() == null || engineFuelType.trim() == "") {
        validate = false;
        setEngineFuelTypeErr(true);
        return;
      }
      else {
        setEngineFuelTypeErr(false);
      }


      await addEngineFuelType(currentEngineFuelTypeId, engineFuelType, description).then(res => {
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
          {currentEngineFuelTypeId == null || currentEngineFuelTypeId == 0 ? <Modal.Title>Add Engine Fuel Type</Modal.Title> : <Modal.Title>Update Engine Fuel Type</Modal.Title>}
        </Modal.Header>
        <Form onSubmit={(event) => SaveEngineFuelType(event)}>
          <Modal.Body>

            <Form.Group className="mb-3">
              <Form.Label className="mb-1">Engine Fuel Type</Form.Label>
              <Form.Control type="text" autoComplete="off" name="engineFuelType" id="engineFuelType"
                value={engineFuelType} disabled={currentEngineFuelTypeId == null || currentEngineFuelTypeId == 0 ? false : true} onChange={EngineFuelTypeHandler} />{engineFuelTypeErr ? <span style={{ color: 'red' }}>Please enter engine fuel type</span> : null}
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