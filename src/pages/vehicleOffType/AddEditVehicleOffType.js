import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { getVehicleOffTypeDetail, addVehicleOffType } from "../../services/VehicleOffTypeService.js";
import { useLoading } from '../../LoadingContext.js';
import { Notification } from "../../components/Notification.js";

export default function AddEditVehicleOffType(props) {

  const [show, setShow] = useState(true);
  const currentVehicleOffTypeId = props.vehicleOffTypeId;
  const [vehicleOffType, setVehicleOffType] = useState("");
  const [description, setDescription] = useState("");
  const [vehicleOffTypeErr, setVehicleOffTypeErr] = useState(false);
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
        if (currentVehicleOffTypeId != null && currentVehicleOffTypeId != 0) {
          await getVehicleOffTypeDetail(currentVehicleOffTypeId).then(res => {
            setVehicleOffType(res.vehicleOffType)
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
  }, [currentVehicleOffTypeId])

  function VehicleOffTypeHandle(e) {
    let item = e.target.value;
    if (item == null || item == "") {
      setVehicleOffTypeErr(true)
    } else {
      setVehicleOffTypeErr(false)
    }
    setVehicleOffType(item);
  }

  async function SaveVehicleOffType(e) {
    e.preventDefault();
    setLoading(true);
    let message = '';
    let validate = true;

    try {
      if (vehicleOffType == undefined || vehicleOffType.trim() == null || vehicleOffType.trim() == "") {
        validate = false;
        setVehicleOffTypeErr(true);
        return;
      }
      else {
        setVehicleOffTypeErr(false);
      }

      await addVehicleOffType(currentVehicleOffTypeId, vehicleOffType, description).then(res => {
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
          {currentVehicleOffTypeId == null || currentVehicleOffTypeId == 0 ? <Modal.Title>Add Vehicle Off Type</Modal.Title> : <Modal.Title>Update Vehicle Off Type</Modal.Title>}
        </Modal.Header>
        <Form onSubmit={SaveVehicleOffType}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label className="mb-1">Vehicle Off Type</Form.Label>
              <Form.Control type="text" autoComplete="off" name="vehicleOffType" id="vehicleOffType"
                value={vehicleOffType} disabled={currentVehicleOffTypeId == null || currentVehicleOffTypeId == 0 ? false : true} onChange={VehicleOffTypeHandle} />{vehicleOffTypeErr ? <span style={{ color: 'red' }}>Please enter vehicle off type</span> : null}
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