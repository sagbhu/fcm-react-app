import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { getVehicleProductionPriceClassDetail, addVehicleProductionPriceClass } from "../../services/GlobalProductionPriceClassService.js";
import { useLoading } from '../../LoadingContext.js';
import { Notification } from "../../components/Notification.js";

export default function AddEditGlobalProductionPriceClass(props) {

  const [show, setShow] = useState(true);
  const currentVehicleProductionPriceClassId = props.vehicleProductionPriceClassId;
  const [vehicleProductionPriceClass, setVehicleProductionPriceClass] = useState("");
  const [description, setDescription] = useState("");
  const [vehicleProductionPriceClassErr, setVehicleProductionPriceClassErr] = useState(false);
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
        if (currentVehicleProductionPriceClassId != null && currentVehicleProductionPriceClassId != 0) {
          await getVehicleProductionPriceClassDetail(currentVehicleProductionPriceClassId).then(res => {
            setVehicleProductionPriceClass(res.vehicleProductionPriceClass)
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
  }, [currentVehicleProductionPriceClassId])

  function FuleHandler(e) {
    let item = e.target.value;
    if (item == null || item == "") {
      setVehicleProductionPriceClassErr(true)
    } else {
      setVehicleProductionPriceClassErr(false)
    }
    setVehicleProductionPriceClass(item);
  }

  async function SaveVehicleProductionPriceClass(e) {
    e.preventDefault();
    setLoading(true);
    let message = '';
    let validate = true;

    try {
      if (vehicleProductionPriceClass == undefined || vehicleProductionPriceClass.trim() == null || vehicleProductionPriceClass.trim() == "") {
        validate = false;
        setVehicleProductionPriceClassErr(true);
        return;
      }
      else {
        setVehicleProductionPriceClassErr(false);
      }

      await addVehicleProductionPriceClass(currentVehicleProductionPriceClassId, vehicleProductionPriceClass, description).then(res => {
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
          {currentVehicleProductionPriceClassId == null || currentVehicleProductionPriceClassId == 0 ? <Modal.Title>Add Global Production Price Class </Modal.Title> : <Modal.Title>Update Global Production Price Class </Modal.Title>}
        </Modal.Header>
        <Form onSubmit={SaveVehicleProductionPriceClass}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label className="mb-1">Global Production Price Class </Form.Label>
              <Form.Control type="text" autoComplete="off" name="vehicleProductionPriceClass" id="vehicleProductionPriceClass"
                value={vehicleProductionPriceClass} disabled={currentVehicleProductionPriceClassId == null || currentVehicleProductionPriceClassId == 0 ? false : true} onChange={FuleHandler} />{vehicleProductionPriceClassErr ? <span style={{ color: 'red' }}>Please enter global production price class</span> : null}
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