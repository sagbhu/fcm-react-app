import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { getGlobalProductionSubSegmentDetail, addGlobalProductionSubSegment } from "../../services/GlobalProductionSubSegmentService.js";
import { useLoading } from '../../LoadingContext.js';
import { Notification } from "../../components/Notification.js";

export default function AddEditGlobalProductionSubSegment(props) {

  const [show, setShow] = useState(true);
  const currentVehicleGlobalProductionSubSegmentId = props.vehicleGlobalProductionSubSegmentId;
  const [vehicleGlobalProductionSubSegment, setVehicleGlobalProductionSubSegment] = useState("");
  const [description, setDescription] = useState("");
  const [globalProductionSubSegmentErr, setGlobalProductionSubSegmentErr] = useState(false);
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
        if (currentVehicleGlobalProductionSubSegmentId != null && currentVehicleGlobalProductionSubSegmentId != 0) {
          await getGlobalProductionSubSegmentDetail(currentVehicleGlobalProductionSubSegmentId).then(res => {
            setVehicleGlobalProductionSubSegment(res.vehicleGlobalProductionSubSegment)
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
  }, [currentVehicleGlobalProductionSubSegmentId])

  function FuleHandler(e) {
    let item = e.target.value;
    if (item == null || item == "") {
      setGlobalProductionSubSegmentErr(true)
    } else {
      setGlobalProductionSubSegmentErr(false)
    }
    setVehicleGlobalProductionSubSegment(item);
  }

  async function SaveVehicleGlobalProductionSubSegment(e) {
    e.preventDefault();
    setLoading(true);
    let message = '';
    let validate = true;

    try {
      if (vehicleGlobalProductionSubSegment == undefined || vehicleGlobalProductionSubSegment.trim() == null || vehicleGlobalProductionSubSegment.trim() == "") {
        validate = false;
        setGlobalProductionSubSegmentErr(true);
        return;
      }
      else {
        setGlobalProductionSubSegmentErr(false);
      }

      await addGlobalProductionSubSegment(currentVehicleGlobalProductionSubSegmentId, vehicleGlobalProductionSubSegment, description).then(res => {
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
          {currentVehicleGlobalProductionSubSegmentId == null || currentVehicleGlobalProductionSubSegmentId == 0 ? <Modal.Title>Add Global Production Sub Segment</Modal.Title> : <Modal.Title>Update Global Production Sub Segment</Modal.Title>}
        </Modal.Header>
        <Form onSubmit={SaveVehicleGlobalProductionSubSegment}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label className="mb-1">Global Production Sub Segment</Form.Label>
              <Form.Control type="text" autoComplete="off" name="vehicleGlobalProductionSubSegment" id="vehicleGlobalProductionSubSegment"
                value={vehicleGlobalProductionSubSegment} disabled={currentVehicleGlobalProductionSubSegmentId == null || currentVehicleGlobalProductionSubSegmentId == 0 ? false : true} onChange={FuleHandler} />{globalProductionSubSegmentErr ? <span style={{ color: 'red' }}>Please enter global production sub segment</span> : null}
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