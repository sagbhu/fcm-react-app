import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { getVehicleBodyTypeDetail, addVehicleBodyType } from "../../services/VehicleBodyTypeService.js";
import { useLoading } from '../../LoadingContext.js';
import { Notification } from "../../components/Notification.js";

export default function AddEditVehicleBodyType(props) {

  const [show, setShow] = useState(true);
  const currentVehicleBodyTypeId = props.vehicleBodyTypeId;
  const [vehicleBodyType, setVehicleBodyType] = useState("");
  const [description, setDescription] = useState("");
  const [example, setExample] = useState("");
  const [vehicleBodyTypeErr, setVehicleBodyTypeErr] = useState(false);
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
        if (currentVehicleBodyTypeId != null && currentVehicleBodyTypeId != 0) {
          await getVehicleBodyTypeDetail(currentVehicleBodyTypeId).then(res => {
            setVehicleBodyType(res.vehicleBodyType)
            setDescription(res.description)
            setExample(res.example)
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
  }, [currentVehicleBodyTypeId])

  function FuleHandler(e) {
    let item = e.target.value;
    if (item == null || item == "") {
      setVehicleBodyTypeErr(true)
    } else {
      setVehicleBodyTypeErr(false)
    }
    setVehicleBodyType(item);
  }

  async function SaveVehicleBodyType(e) {
    e.preventDefault();
    setLoading(true);
    let message = '';
    let validate = true;

    try {
      if (vehicleBodyType == undefined || vehicleBodyType.trim() == null || vehicleBodyType.trim() == "") {
        validate = false;
        setVehicleBodyTypeErr(true);
        return;
      }
      else {
        setVehicleBodyTypeErr(false);
      }

      await addVehicleBodyType(currentVehicleBodyTypeId, vehicleBodyType, description, example).then(res => {
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
          {currentVehicleBodyTypeId == null || currentVehicleBodyTypeId == 0 ? <Modal.Title>Add Vehicle Body Type</Modal.Title> : <Modal.Title>Update Vehicle Body Type</Modal.Title>}
        </Modal.Header>
        <Form onSubmit={SaveVehicleBodyType}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label className="mb-1">Vehicle Body Type</Form.Label>
              <Form.Control type="text" autoComplete="off" name="vehicleBodyType" id="vehicleBodyType"
                value={vehicleBodyType} disabled={currentVehicleBodyTypeId == null || currentVehicleBodyTypeId == 0 ? false : true} onChange={FuleHandler} />{vehicleBodyTypeErr ? <span style={{ color: 'red' }}>Please enter body type</span> : null}
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