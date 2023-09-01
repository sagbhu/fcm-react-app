import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { getVehicleCarTruckDetail, addVehicleCarTruck } from "../../services/VehicleCarTruckService.js";
import { useLoading } from '../../LoadingContext.js';
import { Notification } from "../../components/Notification.js";

export default function AddEditVehicleCarTruck(props) {

  const [show, setShow] = useState(true);
  const currentVehicleCarTruckId = props.vehicleCarTruckId;
  const [vehicleCarTruck, setVehicleCarTruck] = useState("");
  const [description, setDescription] = useState("");
  const [vehicleCarTruckErr, setVehicleCarTruckErr] = useState(false);
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
        if (currentVehicleCarTruckId != null && currentVehicleCarTruckId != 0) {
          await getVehicleCarTruckDetail(currentVehicleCarTruckId).then(res => {
            setVehicleCarTruck(res.vehicleCarTruck)
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
  }, [currentVehicleCarTruckId])

  function VehicleCarTruckHandler(e) {
    let item = e.target.value;
    if (item == null || item == "") {
      setVehicleCarTruckErr(true)
    } else {
      setVehicleCarTruckErr(false)
    }
    setVehicleCarTruck(item);
  }

  async function SaveVehicleCarTruck(e) {
    e.preventDefault();
    setLoading(true);
    let message = '';
    let validate = true;

    try {
      if (vehicleCarTruck == undefined || vehicleCarTruck.trim() == null || vehicleCarTruck.trim() == "") {
        validate = false;
        setVehicleCarTruckErr(true);
        return;
      }
      else {
        setVehicleCarTruckErr(false);
      }

      await addVehicleCarTruck(currentVehicleCarTruckId, vehicleCarTruck, description).then(res => {
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
          {currentVehicleCarTruckId == null || currentVehicleCarTruckId == 0 ? <Modal.Title>Add Vehicle Car Truck</Modal.Title> : <Modal.Title>Update Vehicle Car Truck</Modal.Title>}
        </Modal.Header>
        <Form onSubmit={SaveVehicleCarTruck}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label className="mb-1">Vehicle Car Truck</Form.Label>
              <Form.Control type="text" autoComplete="off" name="vehicleCarTruck" id="vehicleCarTruck"
                value={vehicleCarTruck} disabled={currentVehicleCarTruckId == null || currentVehicleCarTruckId == 0 ? false : true} onChange={VehicleCarTruckHandler} />{vehicleCarTruckErr ? <span style={{ color: 'red' }}>Please enter vehicle car truck</span> : null}
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