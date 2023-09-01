import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { getGlobalSalesSegmentDetail, addGlobalSalesSegment } from "../../services/GlobalSalesSegmentServices.js";
import { useLoading } from '../../LoadingContext.js';
import { Notification } from "../../components/Notification.js";

export default function AddEditGlobalSalesSegment(props) {

  const [show, setShow] = useState(true);
  const currentVehicleGlobalSalesSegmentId = props.vehicleGlobalSalesSegmentId;

  const [vehicleGlobalSalesSegment, setVehicleGlobalSalesSegment] = useState("");
  const [vehicleGlobalSalesSubSegment, setVehicleGlobalSalesSubSegment] = useState("");
  const [vehicleGlobalSalesPriceClass, setVehicleGlobalSalesPriceClass] = useState("");
  const [description, setDescription] = useState("");
  const [vehicleSizeInMm, setVehicleSizeInMm] = useState("");
  const [price, setPrice] = useState("");
  const [gvm, setGvm] = useState("");
  const [dataLoading, setDataLoading] = useState(false);

  const [vehicleGlobalSalesSegmentErr, setVehicleGlobalSalesSegmentErr] = useState(false);
  const [vehicleGlobalSalesSubSegmentErr, setVehicleGlobalSalesSubSegmentErr] = useState(false);
  const [vehicleGlobalSalesPriceClassErr, setVehicleGlobalSalesPriceClassErr] = useState(false);
  // const [descriptionErr, setDescriptionErr] = useState(false);
  const [priceErr, setPriceErr] = useState(false);
  const handleClose = () => setShow(false);
  const { loading, setLoading } = useLoading();

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
        if (currentVehicleGlobalSalesSegmentId != null && currentVehicleGlobalSalesSegmentId != 0) {
          await getGlobalSalesSegmentDetail(currentVehicleGlobalSalesSegmentId).then(res => {
            setVehicleGlobalSalesSegment(res.vehicleGlobalSalesSegment)
            setVehicleGlobalSalesSubSegment(res.vehicleGlobalSalesSubSegment)
            setVehicleGlobalSalesPriceClass(res.vehicleGlobalSalesPriceClass)
            setVehicleSizeInMm(res.vehicleSizeInMm)
            setPrice(res.price)
            setGvm(res.gvm)
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
  }, [currentVehicleGlobalSalesSegmentId])

  function SalesSegmentHandler(e) {
    let item = e.target.value;
    if (item == null || item == "") {
      setVehicleGlobalSalesSegmentErr(true)
    } else {
      setVehicleGlobalSalesSegmentErr(false)
    }
    setVehicleGlobalSalesSegment(item);
  }

  
  function SalesSubSegmentHandler(e) {
    let item = e.target.value;
    if (item == null || item == "") {
      setVehicleGlobalSalesSubSegmentErr(true)
    } else {
      setVehicleGlobalSalesSubSegmentErr(false)
    }
    setVehicleGlobalSalesSubSegment(item);
  }

  
  function SalesPriceClassHandler(e) {
    let item = e.target.value;
    if (item == null || item == "") {
      setVehicleGlobalSalesPriceClassErr(true)
    } else {
      setVehicleGlobalSalesPriceClassErr(false)
    }
    setVehicleGlobalSalesPriceClass(item);
  }

  async function SaveGlobalSalesSegment(e) {
    e.preventDefault();
    setLoading(true);
    let message = '';
    let validate = true;

    try {
      if (vehicleGlobalSalesSegment == undefined || vehicleGlobalSalesSegment.trim() == null || vehicleGlobalSalesSegment.trim() == "") {
        validate = false;
        setVehicleGlobalSalesSegmentErr(true);
      }
      else {
        setVehicleGlobalSalesSegmentErr(false);
      }

      if (vehicleGlobalSalesSubSegment == undefined || vehicleGlobalSalesSubSegment.trim() == null || vehicleGlobalSalesSubSegment.trim() == "") {
        validate = false;
        setVehicleGlobalSalesSubSegmentErr(true);
      }
      else {
        setVehicleGlobalSalesSubSegmentErr(false);
      }

      if (vehicleGlobalSalesPriceClass == undefined || vehicleGlobalSalesPriceClass.trim() == null || vehicleGlobalSalesPriceClass.trim() == "") {
        validate = false;
        setVehicleGlobalSalesPriceClassErr(true);
      }
      else {
        setVehicleGlobalSalesPriceClassErr(false);
      }

if(!validate){
  return;
}

      await addGlobalSalesSegment(currentVehicleGlobalSalesSegmentId,vehicleGlobalSalesSegment, vehicleGlobalSalesSubSegment, vehicleGlobalSalesPriceClass,vehicleSizeInMm, price, gvm, description).then(res => {
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
          {currentVehicleGlobalSalesSegmentId == null || currentVehicleGlobalSalesSegmentId == 0 ? <Modal.Title>Add Global Sales Segment</Modal.Title> : <Modal.Title>Update Global Sales Segment</Modal.Title>}
        </Modal.Header>
        <Form onSubmit={SaveGlobalSalesSegment}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label className="mb-1">Vehicle Global Sales Segment</Form.Label>
              <Form.Control type="text" autoComplete="off" name="vehicleGlobalSalesSegment" id="vehicleGlobalSalesSegment"
                value={vehicleGlobalSalesSegment}  disabled={currentVehicleGlobalSalesSegmentId == null || currentVehicleGlobalSalesSegmentId == 0 ? false : true}  onChange={SalesSegmentHandler} />{vehicleGlobalSalesSegmentErr ? <span style={{ color: 'red' }}>Please enter vehicle global sales segment</span> : null}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="mb-1">Vehicle Global Sales Sub Segment</Form.Label>
              <Form.Control type="text" autoComplete="off" name="vehicleGlobalSalesSubSegment" id="vehicleGlobalSalesSubSegment"
                value={vehicleGlobalSalesSubSegment}  disabled={currentVehicleGlobalSalesSegmentId == null || currentVehicleGlobalSalesSegmentId == 0 ? false : true}  onChange={SalesSubSegmentHandler} />{vehicleGlobalSalesSubSegmentErr ? <span style={{ color: 'red' }}>Please enter vehicle global sales sub segment</span> : null}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="mb-1">Vehicle Global Sales Price Class</Form.Label>
              <Form.Control type="text" autoComplete="off" name="vehicleGlobalSalesPriceClass" id="vehicleGlobalSalesPriceClass"
                value={vehicleGlobalSalesPriceClass}  disabled={currentVehicleGlobalSalesSegmentId == null || currentVehicleGlobalSalesSegmentId == 0 ? false : true}  onChange={SalesPriceClassHandler} />{vehicleGlobalSalesPriceClassErr ? <span style={{ color: 'red' }}>Please enter vehicle global sales priceclass</span> : null}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="mb-1">VehicleSizeInMm</Form.Label>
              <Form.Control type="text" autoComplete="off" name="vehicleSizeInMm" id="vehicleSizeInMm"
                value={vehicleSizeInMm} onChange={(e) => { setVehicleSizeInMm(e.target.value) }} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="mb-1">Price</Form.Label>
              <Form.Control type="text" autoComplete="off" name="price" id="price"
                value={price} onChange={(e) => { setPrice(e.target.value) }} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="mb-1">Gvm</Form.Label>
              <Form.Control type="text" autoComplete="off" name="gvm" id="gvm"
                value={gvm} onChange={(e) => { setGvm(e.target.value) }} />
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