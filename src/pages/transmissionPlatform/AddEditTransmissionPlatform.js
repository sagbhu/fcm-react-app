import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { getPlatformDetail, addPlatform } from "../../services/TransmissionPlatformService.js";
import { useLoading } from '../../LoadingContext.js';
import { Notification } from "../../components/Notification.js";

export default function AddEditTransmissionPlatform(props) {

  const [show, setShow] = useState(true);
  const currentPlatformId = props.transmissionPlatformId;
  const [transmissionPlatform, setTransmissionPlatform] = useState("");
  const [description, setDescription] = useState("");
  const [platformErr, setPlatformErr] = useState(false);
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
        if (currentPlatformId != null && currentPlatformId != 0) {
          await getPlatformDetail(currentPlatformId).then(res => {
            setTransmissionPlatform(res.transmissionPlatform)
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
  }, [currentPlatformId])

  function PlatformHandler(e) {
    let item = e.target.value;
    if (item == null || item == "") {
      setPlatformErr(true)
    } else {
      setPlatformErr(false)
    }
    setTransmissionPlatform(item);
  }

  async function SavePlatform(e) {
    e.preventDefault();
    setLoading(true);
    let message = '';
    let validate = true;

    try {
      if (transmissionPlatform == undefined || transmissionPlatform.trim() == null || transmissionPlatform.trim() == "") {
        validate = false;
        setPlatformErr(true);
        return;
      }
      else {
        setPlatformErr(false);
      }

      await addPlatform(currentPlatformId, transmissionPlatform, description).then(res => {
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
          {currentPlatformId == null || currentPlatformId == 0 ? <Modal.Title>Add Transmission Platform</Modal.Title> : <Modal.Title>Update Transmission Platform</Modal.Title>}
        </Modal.Header>
        <Form onSubmit={SavePlatform}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label className="mb-1">Transmission Platform</Form.Label>
              <Form.Control type="text" autoComplete="off" name="fueltype" id="fueltype"
                value={transmissionPlatform} disabled={currentPlatformId == null || currentPlatformId == 0 ? false : true} onChange={PlatformHandler} />{platformErr ? <span style={{ color: 'red' }}>Please enter transmission platform</span> : null}
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