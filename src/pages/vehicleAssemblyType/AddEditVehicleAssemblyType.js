import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { getVehicleAssemblyTypeDetail, addVehicleAssemblyType } from "../../services/VehicleAssemblyTypeService.js";
import { useLoading } from '../../LoadingContext.js';
import { Notification } from "../../components/Notification.js";

export default function AddEditVehicleAssemblyType(props) {

  const [show, setShow] = useState(true);
  const currentVehicleAssemblyTypeId = props.vehicleAssemblyTypeId;
  const [vehicleAssemblyType, setVehicleAssemblyType] = useState("");
  const [description, setDescription] = useState("");
  const [vehicleAssemblyTypeErr, setVehicleAssemblyTypeErr] = useState(false);
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
        if (currentVehicleAssemblyTypeId != null && currentVehicleAssemblyTypeId != 0) {
          await getVehicleAssemblyTypeDetail(currentVehicleAssemblyTypeId).then(res => {
            setVehicleAssemblyType(res.vehicleAssemblyType)
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
  }, [currentVehicleAssemblyTypeId])

  function VehicleAssemblyTypeHandler(e) {
    let item = e.target.value;
    if (item == null || item == "") {
      setVehicleAssemblyTypeErr(true)
    } else {
      setVehicleAssemblyTypeErr(false)
    }
    setVehicleAssemblyType(item);
  }

  async function SaveVehicleAssemblyType(e) {
    e.preventDefault();
    setLoading(true);
    let message = '';
    let validate = true;

    try {
      if (vehicleAssemblyType == undefined || vehicleAssemblyType.trim() == null || vehicleAssemblyType.trim() == "") {
        validate = false;
        setVehicleAssemblyTypeErr(true);
        return;
      }
      else {
        setVehicleAssemblyTypeErr(false);
      }

      await addVehicleAssemblyType(currentVehicleAssemblyTypeId, vehicleAssemblyType, description).then(res => {
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
          {currentVehicleAssemblyTypeId == null || currentVehicleAssemblyTypeId == 0 ? <Modal.Title>Add Vehicle Assembly Type</Modal.Title> : <Modal.Title>Update Vehicle Assembly Type</Modal.Title>}
        </Modal.Header>
        <Form onSubmit={SaveVehicleAssemblyType}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label className="mb-1">Vehicle Assembly Type</Form.Label>
              <Form.Control type="text" autoComplete="off" name="vehicleAssemblyType" id="vehicleAssemblyType"
                value={vehicleAssemblyType} disabled={currentVehicleAssemblyTypeId == null || currentVehicleAssemblyTypeId == 0 ? false : true} onChange={VehicleAssemblyTypeHandler} />{vehicleAssemblyTypeErr ? <span style={{ color: 'red' }}>Please enter vehicle assembly type</span> : null}
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