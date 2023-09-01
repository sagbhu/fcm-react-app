import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { getVehicleProductionBodyStyleDetail, addVehicleProductionBodyStyle } from "../../services/VehicleProductionBodyStyleService.js";
import { useLoading } from '../../LoadingContext.js';
import { Notification } from "../../components/Notification.js";

export default function AddEditVehicleProductionBodyStyle(props) {

  const [show, setShow] = useState(true);
  const currentVehicleProductionBodyStyleId = props.vehicleProductionBodyStyleId;
  const [vehicleProductionBodyStyle, setVehicleProductionBodyStyle] = useState("");
  const [description, setDescription] = useState("");
  const [example, setExample] = useState("");
  const [numberOfArticulatingDoors, setNumberOfArticulatingDoors] = useState("");
  const [rearDoor, setRearDoor] = useState("");
  const [vehicleProductionBodyStyleErr, setVehicleProductionBodyStyleErr] = useState(false);
  const [numberOfArticulatingDoorsErr, setNumberOfArticulatingDoorsErr] = useState(false);
  const [rearDoorErr, setRearDoorErr] = useState(false);
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
        if (currentVehicleProductionBodyStyleId != null && currentVehicleProductionBodyStyleId != 0) {
          await getVehicleProductionBodyStyleDetail(currentVehicleProductionBodyStyleId).then(res => {
            setVehicleProductionBodyStyle(res.vehicleProductionBodyStyle)
            setDescription(res.description)
            setExample(res.example)
            setNumberOfArticulatingDoors(res.numberOfArticulatingDoors)
            setRearDoor(res.rearDoor)
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
  }, [currentVehicleProductionBodyStyleId])

  function VehicleProductionBodyStyleHandler(e) {
    let item = e.target.value;
    if (item == null || item == "") {
      setVehicleProductionBodyStyleErr(true)
    } else {
      setVehicleProductionBodyStyleErr(false)
    }
    setVehicleProductionBodyStyle(item);
  }

  function NumberOfArticulatingDoorsHandler(e) {
    let item = e.target.value;
    if (item == null || item == "") {
      setNumberOfArticulatingDoorsErr(true)
    } else {
      setNumberOfArticulatingDoorsErr(false)
    }
    setNumberOfArticulatingDoors(item);
  }

  function rearDoorHandler(e) {
    let item = e.target.value;
    if (item == null || item == "") {
      setRearDoorErr(true)
    } else {
      setRearDoorErr(false)
    }
    setRearDoor(item);
  }

  async function SaveVehicleProductionBodyStyle(e) {
    e.preventDefault();
    setLoading(true);
    let message = '';
    let validate = true;

    try {
      if (vehicleProductionBodyStyle == undefined || vehicleProductionBodyStyle.trim() == null || vehicleProductionBodyStyle.trim() == "") {
        validate = false;
        setVehicleProductionBodyStyleErr(true);
      }
      else {
        setVehicleProductionBodyStyleErr(false);
      }
      if (numberOfArticulatingDoors == undefined || numberOfArticulatingDoors.trim() == null || numberOfArticulatingDoors.trim() == "") {
        validate = false;
        setNumberOfArticulatingDoorsErr(true);
      }
      else {
        setNumberOfArticulatingDoorsErr(false);
      }
      if (rearDoor == undefined || rearDoor.trim() == null || rearDoor.trim() == "") {
        validate = false;
        setRearDoorErr(true);
      }
      else {
        setRearDoorErr(false);
      }
      if (!validate) {
        return;
      }
      await addVehicleProductionBodyStyle(currentVehicleProductionBodyStyleId, vehicleProductionBodyStyle, description, example, numberOfArticulatingDoors, rearDoor).then(res => {
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
          {currentVehicleProductionBodyStyleId == null || currentVehicleProductionBodyStyleId == 0 ? <Modal.Title>Add Vehicle Production Body Style</Modal.Title> : <Modal.Title>Update Vehicle Production Body Style</Modal.Title>}
        </Modal.Header>
        <Form onSubmit={SaveVehicleProductionBodyStyle}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label className="mb-1">Vehicle Production Body Style</Form.Label>
              <Form.Control type="text" autoComplete="off" name="fueltype" id="fueltype"
                value={vehicleProductionBodyStyle} disabled={currentVehicleProductionBodyStyleId == null || currentVehicleProductionBodyStyleId == 0 ? false : true} onChange={VehicleProductionBodyStyleHandler} />{vehicleProductionBodyStyleErr ? <span style={{ color: 'red' }}>Please enter production body style</span> : null}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="mb-1">Number Of Articulating Doors</Form.Label>
              <Form.Control type="text" autoComplete="off" name="numberOfArticulatingDoors" id="numberOfArticulatingDoors"
                value={numberOfArticulatingDoors} onChange={NumberOfArticulatingDoorsHandler} />{numberOfArticulatingDoorsErr ? <span style={{ color: 'red' }}>Please enter number of articulating doors</span> : null}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="mb-1">Rear Door</Form.Label>
              <Form.Control type="text" autoComplete="off" name="rearDoor" id="rearDoor"
                value={rearDoor} onChange={rearDoorHandler} />{rearDoorErr ? <span style={{ color: 'red' }}>Please enter rear door</span> : null}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="mb-1">Example</Form.Label>
              <Form.Control type="text" autoComplete="off" name="example" id="example"
                value={example} onChange={(e) => { setExample(e.target.value) }} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="mb-1">Description</Form.Label>
              <Form.Control type="description" autoComplete="off" name="description" id="description"
                as="textarea" value={description} onChange={(e) => { setDescription(e.target.value) }}
                style={{ height: '100px' }}/>
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