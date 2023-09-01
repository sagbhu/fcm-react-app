import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { getTransmissionDesignDetail, addTransmissionDesign } from "../../services/TransmissionDesignService.js";
import { useLoading } from '../../LoadingContext.js';
import { Notification } from "../../components/Notification.js";

export default function AddEditTransmissionDesign(props) {

  const [show, setShow] = useState(true);
  const currentTransmissionDesignId = props.transmissionDesignId;
  const [transmissionDesign, setTransmissionDesign] = useState("");
  const [transmissionSubDesign, setTransmissionSubDesign] = useState("");
  const [description, setDescription] = useState("");
  const [transmissionDesignErr, setTransmissionDesignErr] = useState(false);
  const [transmissionSubDesignErr, setTransmissionSubDesignErr] = useState(false);
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
        if (currentTransmissionDesignId != null && currentTransmissionDesignId != 0) {
          await getTransmissionDesignDetail(currentTransmissionDesignId).then(res => {
            setTransmissionDesign(res.transmissionDesign)
            setTransmissionSubDesign(res.transmissionSubDesign)
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
  }, [currentTransmissionDesignId])
 
  function TransmissionDesignHandler(e) {
    let item = e.target.value;
    if (item == null || item == "") {
      setTransmissionDesignErr(true)
    } else {
      setTransmissionDesignErr(false)
    }
    setTransmissionDesign(item);
  }
  function TransmissionSubDesignHandler(e) {
    let item = e.target.value;
    if (item == null || item == "") {
        setTransmissionSubDesignErr(true)
    } else {
        setTransmissionSubDesignErr(false)
    }
    setTransmissionSubDesign(item);
  }

async function SaveTransmissionDesign(e) {
    e.preventDefault();
    setLoading(true);
    let message = '';
    let validate = true;

    try {
      if (transmissionDesign == undefined || transmissionDesign.trim() == null || transmissionDesign.trim() == "") {
        validate = false;
        setTransmissionDesignErr(true);
      }
      else {
        setTransmissionDesignErr(false);
      }
      if (transmissionSubDesign == undefined || transmissionSubDesign.trim() == null || transmissionSubDesign.trim() == "") {
        validate = false;
        setTransmissionSubDesignErr(true);
      }
      else {
        setTransmissionSubDesignErr(false);
      }

      if(!validate){
        return;
    }
      await addTransmissionDesign(currentTransmissionDesignId, transmissionDesign, transmissionSubDesign, description).then(res => {
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
          {currentTransmissionDesignId == null || currentTransmissionDesignId == 0 ? <Modal.Title>Add Transmission Design</Modal.Title> : <Modal.Title>Update Transmission Design</Modal.Title>}
        </Modal.Header>
        <Form onSubmit={SaveTransmissionDesign}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label className="mb-1">Transmission Design</Form.Label>
              <Form.Control type="text" autoComplete="off" name="transmissionDesign" id="transmissionDesign"
                value={transmissionDesign} disabled={currentTransmissionDesignId == null || currentTransmissionDesignId == 0 ? false : true} onChange={TransmissionDesignHandler} />{transmissionDesignErr ? <span style={{ color: 'red' }}>Please enter transmission design</span> : null}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="mb-1">Transmission Sub Design</Form.Label>
              <Form.Control type="text" autoComplete="off" name="transmissionSubDesign" id="transmissionSubDesign"
                value={transmissionSubDesign} disabled={currentTransmissionDesignId == null || currentTransmissionDesignId == 0 ? false : true} onChange={TransmissionSubDesignHandler} />{transmissionSubDesignErr ? <span style={{ color: 'red' }}>Please enter transmission sub design</span> : null}
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