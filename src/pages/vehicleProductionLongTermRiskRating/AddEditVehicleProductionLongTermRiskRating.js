import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { getvehicleProductionLongTermRiskRatingDetail, addvehicleProductionLongTermRiskRating } from "../../services/VehicleProductionLongTermRiskRatingService.js";
import { useLoading } from '../../LoadingContext.js';
import { Notification } from "../../components/Notification.js";

export default function AddEditVehicleProductionLongTermRiskRatingId(props) {

  const [show, setShow] = useState(true);
  const currentvehicleProductionLongTermRiskRatingId = props.vehicleProductionLongTermRiskRatingId;
  const [vehicleProductionLongTermRiskRating, setVehicleProductionLongTermRiskRating] = useState("");
  const [description, setDescription] = useState("");
  const [vehicleProductionLongTermRiskRatingIdErr, setVehicleProductionLongTermRiskRatingIdErr] = useState(false);
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
        if (currentvehicleProductionLongTermRiskRatingId != null && currentvehicleProductionLongTermRiskRatingId != 0) {
          await getvehicleProductionLongTermRiskRatingDetail(currentvehicleProductionLongTermRiskRatingId).then(res => {
            setVehicleProductionLongTermRiskRating(res.vehicleProductionLongTermRiskRating)
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
  }, [currentvehicleProductionLongTermRiskRatingId])

  function VehicleProductionLongTermRiskRatingIdHandler(e) {
    let item = e.target.value;
    if (item == null || item == "") {
      setVehicleProductionLongTermRiskRatingIdErr(true)
    } else {
      setVehicleProductionLongTermRiskRatingIdErr(false)
    }
    setVehicleProductionLongTermRiskRating(item);
  }

  async function VehicleProductionLongTermRiskRating(e) {
    e.preventDefault();
    setLoading(true);
    let message = '';
    let validate = true;

    try {
      if (vehicleProductionLongTermRiskRating == undefined || vehicleProductionLongTermRiskRating.trim() == null || vehicleProductionLongTermRiskRating.trim() == "") {
        validate = false;
        setVehicleProductionLongTermRiskRatingIdErr(true);
        return;
      }
      else {
        setVehicleProductionLongTermRiskRatingIdErr(false);
      }

      await addvehicleProductionLongTermRiskRating(currentvehicleProductionLongTermRiskRatingId, vehicleProductionLongTermRiskRating, description).then(res => {
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
          {currentvehicleProductionLongTermRiskRatingId == null || currentvehicleProductionLongTermRiskRatingId == 0 ? <Modal.Title>Add Vehicle Production Long Term Risk Rating</Modal.Title> : <Modal.Title>Update Vehicle Production Long Term Risk Rating</Modal.Title>}
        </Modal.Header>
        <Form onSubmit={VehicleProductionLongTermRiskRating}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label className="mb-1">Vehicle Production Long Term Risk Rating</Form.Label>
              <Form.Control type="text" autoComplete="off" name="vehicleProductionLongTermRiskRating" id="vehicleProductionLongTermRiskRating"
                value={vehicleProductionLongTermRiskRating} disabled={currentvehicleProductionLongTermRiskRatingId == null || currentvehicleProductionLongTermRiskRatingId == 0 ? false : true} onChange={VehicleProductionLongTermRiskRatingIdHandler} />{vehicleProductionLongTermRiskRatingIdErr ? <span style={{ color: 'red' }}>Please enter vehicle production long term risk rating</span> : null}
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