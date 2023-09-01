import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { getVehicleArchitectureDetail, addVehicleArchitecture } from "../../services/VehicleArchitectureService.js";
import { useLoading } from '../../LoadingContext.js';
import { Notification } from "../../components/Notification.js";

export default function AddEditVehicleArchitecture(props) {

  const [show, setShow] = useState(true);
  const currentVehicleArchitectureId = props.vehicleArchitectureId;
  const [vehicleArchitecture, setVehicleArchitecture] = useState("");
  const [description, setDescription] = useState("");
  const [vehicleArchitectureErr, setVehicleArchitectureErr] = useState(false);
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
        if (currentVehicleArchitectureId != null && currentVehicleArchitectureId != 0) {
          await getVehicleArchitectureDetail(currentVehicleArchitectureId).then(res => {
            setVehicleArchitecture(res.vehicleArchitecture)
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
  }, [currentVehicleArchitectureId])

  function VehicleArchitectureHandler(e) {
    let item = e.target.value;
    if (item == null || item == "") {
      setVehicleArchitectureErr(true)
    } else {
      setVehicleArchitectureErr(false)
    }
    setVehicleArchitecture(item);
  }

  async function SaveVehicleArchitecture(e) {
    e.preventDefault();
    setLoading(true);
    let message = '';
    let validate = true;

    try {
      if (vehicleArchitecture == undefined || vehicleArchitecture.trim() == null || vehicleArchitecture.trim() == "") {
        validate = false;
        setVehicleArchitectureErr(true);
        return;
      }
      else {
        setVehicleArchitectureErr(false);
      }

      await addVehicleArchitecture(currentVehicleArchitectureId, vehicleArchitecture, description).then(res => {
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
          {currentVehicleArchitectureId == null || currentVehicleArchitectureId == 0 ? <Modal.Title>Add Vehicle Architecture</Modal.Title> : <Modal.Title>Update Vehicle Architecture</Modal.Title>}
        </Modal.Header>
        <Form onSubmit={SaveVehicleArchitecture}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label className="mb-1">Vehicle Architecture</Form.Label>
              <Form.Control type="text" autoComplete="off" name="vehicleArchitecture" id="vehicleArchitecture"
                value={vehicleArchitecture} disabled={currentVehicleArchitectureId == null || currentVehicleArchitectureId == 0 ? false : true} onChange={VehicleArchitectureHandler} />{vehicleArchitectureErr ? <span style={{ color: 'red' }}>Please enter vehicle architecture</span> : null}
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