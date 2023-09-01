import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { getVehicleCabTypeDetail, addVehicleCabType } from "../../services/VehicleCabTypeService.js";
import { useLoading } from '../../LoadingContext.js';
import { Notification } from "../../components/Notification.js";

export default function AddEditVehicleCabType(props) {

  const [show, setShow] = useState(true);
  const currentVehicleCabTypeId = props.vehicleCabTypeId;
  const [vehicleCabType, setVehicleCabType] = useState("");
  const [description, setDescription] = useState("");
  const [vehicleCabTypeErr, setVehicleCabTypeErr] = useState(false);
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
        if (currentVehicleCabTypeId != null && currentVehicleCabTypeId != 0) {
          await getVehicleCabTypeDetail(currentVehicleCabTypeId).then(res => {
            setVehicleCabType(res.vehicleCabType)
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
  }, [currentVehicleCabTypeId])

  function VehicleCabTypeHandler(e) {
    let item = e.target.value;
    if (item == null || item == "") {
      setVehicleCabTypeErr(true)
    } else {
      setVehicleCabTypeErr(false)
    }
    setVehicleCabType(item);
  }

  async function SaveVehicleCabType(e) {
    e.preventDefault();
    setLoading(true);
    let message = '';
    let validate = true;

    try {
      if (vehicleCabType == undefined || vehicleCabType.trim() == null || vehicleCabType.trim() == "") {
        validate = false;
        setVehicleCabTypeErr(true);
        return;
      }
      else {
        setVehicleCabTypeErr(false);
      }

      await addVehicleCabType(currentVehicleCabTypeId, vehicleCabType, description).then(res => {
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
          {currentVehicleCabTypeId == null || currentVehicleCabTypeId == 0 ? <Modal.Title>Add Vehicle Cab Type</Modal.Title> : <Modal.Title>Update Vehicle Cab Type</Modal.Title>}
        </Modal.Header>
        <Form onSubmit={SaveVehicleCabType}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label className="mb-1">Vehicle Cab Type</Form.Label>
              <Form.Control type="text" autoComplete="off" name="vehicleCabType" id="vehicleCabType"
                value={vehicleCabType} disabled={currentVehicleCabTypeId == null || currentVehicleCabTypeId == 0 ? false : true} onChange={VehicleCabTypeHandler} />{vehicleCabTypeErr ? <span style={{ color: 'red' }}>Please enter vehicle cab type</span> : null}
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