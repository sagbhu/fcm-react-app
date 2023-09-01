import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { getFuelTypeDetail, addFuelType } from "../../services/FuelTypeService.js";
import { useLoading } from '../../LoadingContext.js';
import { Notification } from "../../components/Notification.js";

export default function AddEditFuelType(props) {

  const [show, setShow] = useState(true);
  const currentFuelTypeId = props.fuelTypeId;
  const [fuelType, setFuelType] = useState("");
  const [description, setDescription] = useState("");
  const [fueltypeErr, setFueltypeErr] = useState(false);
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
        if (currentFuelTypeId != null && currentFuelTypeId != 0) {
          await getFuelTypeDetail(currentFuelTypeId).then(res => {
            setFuelType(res.fuelType)
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
  }, [currentFuelTypeId])

  function FuleHandler(e) {
    let item = e.target.value;
    if (item == null || item == "") {
      setFueltypeErr(true)
    } else {
      setFueltypeErr(false)
    }
    setFuelType(item);
  }

  async function SaveFuelType(e) {
    e.preventDefault();
    setLoading(true);
    let message = '';
    let validate = true;

    try {
      if (fuelType == undefined || fuelType.trim() == null || fuelType.trim() == "") {
        validate = false;
        setFueltypeErr(true);
        return;
      }
      else {
        setFueltypeErr(false);
      }

      await addFuelType(currentFuelTypeId, fuelType, description).then(res => {
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
          {currentFuelTypeId == null || currentFuelTypeId == 0 ? <Modal.Title>Add Fuel Type</Modal.Title> : <Modal.Title>Update Fuel Type</Modal.Title>}
        </Modal.Header>
        <Form onSubmit={SaveFuelType}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label className="mb-1">Fuel Type</Form.Label>
              <Form.Control type="text" autoComplete="off" name="fueltype" id="fueltype"
                value={fuelType} disabled={currentFuelTypeId == null || currentFuelTypeId == 0 ? false : true} onChange={FuleHandler} />{fueltypeErr ? <span style={{ color: 'red' }}>Please enter fuel type</span> : null}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="mb-1">Description</Form.Label>
              <Form.Control type="description" autoComplete="off" name="description" id="description" 
                as="textarea" value={description} onChange={(e) => { setDescription(e.target.value) }}
               
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