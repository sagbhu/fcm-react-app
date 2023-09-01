import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { getGlobalProductionSegmentDetail, addGlobalProductionSegment } from "../../services/GlobalProductionSegmentService.js";
import { useLoading } from '../../LoadingContext.js';
import { Notification } from "../../components/Notification.js";

export default function AddEditGlobalProductionSegment(props) {

  const [show, setShow] = useState(true);
  const currentVehicleGlobalProductionSegmentId = props.vehicleGlobalProductionSegmentId;
  const [vehicleGlobalProductionSegment, setVehicleGlobalProductionSegment] = useState("");
  const [description, setDescription] = useState("");
  const [vehicleGlobalProductionSegmentErr, setVehicleGlobalProductionSegmentErr] = useState(false);
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
        if (currentVehicleGlobalProductionSegmentId != null && currentVehicleGlobalProductionSegmentId != 0) {
          await getGlobalProductionSegmentDetail(currentVehicleGlobalProductionSegmentId).then(res => {
            setVehicleGlobalProductionSegment(res.vehicleGlobalProductionSegment)
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
  }, [currentVehicleGlobalProductionSegmentId])

  function GlobalProductionSegmentHandler(e) {
    let item = e.target.value;
    if (item == null || item == "") {
      setVehicleGlobalProductionSegmentErr(true)
    } else {
      setVehicleGlobalProductionSegmentErr(false)
    }
    setVehicleGlobalProductionSegment(item);
  }

  async function SaveVehicleGlobalProductionSegment(e) {
    e.preventDefault();
    setLoading(true);
    let message = '';
    let validate = true;

    try {
      if (vehicleGlobalProductionSegment == undefined || vehicleGlobalProductionSegment.trim() == null || vehicleGlobalProductionSegment.trim() == "") {
        validate = false;
        setVehicleGlobalProductionSegmentErr(true);
        return;
      }
      else {
        setVehicleGlobalProductionSegmentErr(false);
      }

      await addGlobalProductionSegment(currentVehicleGlobalProductionSegmentId, vehicleGlobalProductionSegment, description).then(res => {
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
          {currentVehicleGlobalProductionSegmentId == null || currentVehicleGlobalProductionSegmentId == 0 ? <Modal.Title>Add Global Production Segment</Modal.Title> : <Modal.Title>Update Global Production Segment</Modal.Title>}
        </Modal.Header>
        <Form onSubmit={SaveVehicleGlobalProductionSegment}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label className="mb-1">Global Production Segment</Form.Label>
              <Form.Control type="text" autoComplete="off" name="vehicleGlobalProductionSegment" id="vehicleGlobalProductionSegment"
                value={vehicleGlobalProductionSegment} disabled={currentVehicleGlobalProductionSegmentId == null || currentVehicleGlobalProductionSegmentId == 0 ? false : true} onChange={GlobalProductionSegmentHandler} />{vehicleGlobalProductionSegmentErr ? <span style={{ color: 'red' }}>Please enter global production segment</span> : null}
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