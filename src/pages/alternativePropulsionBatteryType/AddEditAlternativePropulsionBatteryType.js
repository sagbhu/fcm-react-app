import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { getBatteryTypeDetail, addBatteryType } from "../../services/AlternativePropulsionBatteryTypeService.js";
import { useLoading } from '../../LoadingContext.js';
import { Notification } from "../../components/Notification.js";

export default function AddEditAlternativePropulsionBatteryType(props) {

  const [show, setShow] = useState(true);
  const currentBatteryTypeId = props.alternativePropulsionBatteryTypeId;
  const [alternativePropulsionBatteryType, setAlternativePropulsionBatteryType] = useState("");
  const [description, setDescription] = useState("");
  const [batteryTypeErr, setBatteryTypeErr] = useState(false);
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
        if (currentBatteryTypeId != null && currentBatteryTypeId != 0) {
          await getBatteryTypeDetail(currentBatteryTypeId).then(res => {
            setAlternativePropulsionBatteryType(res.alternativePropulsionBatteryType)
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
  }, [currentBatteryTypeId])

  function BatteryTypeHandler(e) {
    let item = e.target.value;
    if (item == null || item == "") {
      setBatteryTypeErr(true)
    } else {
      setBatteryTypeErr(false)
    }
    setAlternativePropulsionBatteryType(item);
  }

  async function SaveAlternativePropulsionBatteryType(e) {
    e.preventDefault();
    setLoading(true);
    let message = '';
    let validate = true;

    try {
      if (alternativePropulsionBatteryType == undefined || alternativePropulsionBatteryType.trim() == null || alternativePropulsionBatteryType.trim() == "") {
        validate = false;
        setBatteryTypeErr(true);
        return;
      }
      else {
        setBatteryTypeErr(false);
      }

      await addBatteryType(currentBatteryTypeId, alternativePropulsionBatteryType, description).then(res => {
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
          {currentBatteryTypeId == null || currentBatteryTypeId == 0 ? <Modal.Title>Add Alternative Propulsion Battery Type</Modal.Title> : <Modal.Title>Update Alternative Propulsion Battery Type</Modal.Title>}
        </Modal.Header>
        <Form onSubmit={SaveAlternativePropulsionBatteryType}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label className="mb-1">Alternative Propulsion Battery Type</Form.Label>
              <Form.Control type="text" autoComplete="off" name="alternativePropulsionBatteryType" id="alternativePropulsionBatteryType"
                value={alternativePropulsionBatteryType} disabled={currentBatteryTypeId == null || currentBatteryTypeId == 0 ? false : true} onChange={BatteryTypeHandler} />{batteryTypeErr ? <span style={{ color: 'red' }}>Please enter alternative propulsion battery type</span> : null}
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