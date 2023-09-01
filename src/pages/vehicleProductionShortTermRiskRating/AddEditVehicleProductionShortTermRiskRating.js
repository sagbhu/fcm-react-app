import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { getVehicleProductionShortTermRiskRatingDetail, addVehicleProductionShortTermRiskRating } from "../../services/VehicleProductionShortTermRiskRatingService.js";
import { useLoading } from '../../LoadingContext.js';
import { Notification } from "../../components/Notification.js";

export default function AddEditVehicleProductionShortTermRiskRating(props) {

  const [show, setShow] = useState(true);
  const currentvehicleProductionShortTermRiskRatingId = props.vehicleProductionShortTermRiskRatingId;
  const [vehicleProductionShortTermRiskRating, setVehicleProductionShortTermRiskRating] = useState("");
  const [description, setDescription] = useState("");
  const [vehicleProductionShortTermRiskRatingErr, setVehicleProductionShortTermRiskRatingErr] = useState(false);
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
        if (currentvehicleProductionShortTermRiskRatingId != null && currentvehicleProductionShortTermRiskRatingId != 0) {
          await getVehicleProductionShortTermRiskRatingDetail(currentvehicleProductionShortTermRiskRatingId).then(res => {
            setVehicleProductionShortTermRiskRating(res.vehicleProductionShortTermRiskRating)
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
  }, [currentvehicleProductionShortTermRiskRatingId])

  function VehicleProductionShortTermRiskRatingHandler(e) {
    let item = e.target.value;
    if (item == null || item == "") {
      setVehicleProductionShortTermRiskRatingErr(true)
    } else {
      setVehicleProductionShortTermRiskRatingErr(false)
    }
    setVehicleProductionShortTermRiskRating(item);
  }

  async function SaveFuelType(e) {
    e.preventDefault();
    setLoading(true);
    let message = '';
    let validate = true;

    try {
      if (vehicleProductionShortTermRiskRating == undefined || vehicleProductionShortTermRiskRating.trim() == null || vehicleProductionShortTermRiskRating.trim() == "") {
        validate = false;
        setVehicleProductionShortTermRiskRatingErr(true);
        return;
      }
      else {
        setVehicleProductionShortTermRiskRatingErr(false);
      }

      await addVehicleProductionShortTermRiskRating(currentvehicleProductionShortTermRiskRatingId, vehicleProductionShortTermRiskRating, description).then(res => {
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
          {currentvehicleProductionShortTermRiskRatingId == null || currentvehicleProductionShortTermRiskRatingId == 0 ? <Modal.Title>Add Vehicle Production Short Term Risk Rating</Modal.Title> : <Modal.Title>Update Vehicle Production Short Term Risk Rating</Modal.Title>}
        </Modal.Header>
        <Form onSubmit={SaveFuelType}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label className="mb-1">Vehicle Production Short Term Risk Rating</Form.Label>
              <Form.Control type="text" autoComplete="off" name="vehicleProductionShortTermRiskRating" id="vehicleProductionShortTermRiskRating"
                value={vehicleProductionShortTermRiskRating} disabled={currentvehicleProductionShortTermRiskRatingId == null || currentvehicleProductionShortTermRiskRatingId == 0 ? false : true} onChange={VehicleProductionShortTermRiskRatingHandler} />{vehicleProductionShortTermRiskRatingErr ? <span style={{ color: 'red' }}>Please enter vehicle production short term risk rating</span> : null}
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