import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { getVehicleGvwRatingDetail, addVehicleGvwRating } from "../../services/VehicleGvwRatingService.js";
import { useLoading } from '../../LoadingContext.js';
import { Notification } from "../../components/Notification.js";

export default function AddEditVehicleGvwRating(props) {

  const [show, setShow] = useState(true);
  const currentVehicleGvwRatingId = props.vehicleGvwRatingId;
  const [vehicleGvwRating, setVehicleGvwRating] = useState("");
  const [description, setDescription] = useState("");
  const [vehicleGvwRatingErr, setVehicleGvwRatingErr] = useState(false);
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
        if (currentVehicleGvwRatingId != null && currentVehicleGvwRatingId != 0) {
          await getVehicleGvwRatingDetail(currentVehicleGvwRatingId).then(res => {
            setVehicleGvwRating(res.vehicleGvwRating)
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
  }, [currentVehicleGvwRatingId])

  function VehicleGvwRatingHandler(e) {
    let item = e.target.value;
    if (item == null || item == "") {
      setVehicleGvwRatingErr(true)
    } else {
      setVehicleGvwRatingErr(false)
    }
    setVehicleGvwRating(item);
  }

  async function SaveVehicleGvwRating(e) {
    e.preventDefault();
    setLoading(true);
    let message = '';
    let validate = true;

    try {
      if (vehicleGvwRating == undefined || vehicleGvwRating.trim() == null || vehicleGvwRating.trim() == "") {
        validate = false;
        setVehicleGvwRatingErr(true);
        return;
      }
      else {
        setVehicleGvwRatingErr(false);
      }

      await addVehicleGvwRating(currentVehicleGvwRatingId, vehicleGvwRating, description).then(res => {
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
          {currentVehicleGvwRatingId == null || currentVehicleGvwRatingId == 0 ? <Modal.Title>Add Vehicle GVW Rating</Modal.Title> : <Modal.Title>Update Vehicle GVW Rating</Modal.Title>}
        </Modal.Header>
        <Form onSubmit={SaveVehicleGvwRating}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label className="mb-1">Vehicle GVW Rating</Form.Label>
              <Form.Control type="text" autoComplete="off" name="vehicleGvwRating" id="vehicleGvwRating"
                value={vehicleGvwRating} disabled={currentVehicleGvwRatingId == null || currentVehicleGvwRatingId == 0 ? false : true} onChange={VehicleGvwRatingHandler} />{vehicleGvwRatingErr ? <span style={{ color: 'red' }}>Please enter vehicle gvw rating</span> : null}
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