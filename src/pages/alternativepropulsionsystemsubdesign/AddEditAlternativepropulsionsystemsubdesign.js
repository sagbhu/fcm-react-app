import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { getSubDesignDetail, addSubDesign} from "../../services/AlternativepropulsionsystemsubdesignService.js";
import { useLoading } from '../../LoadingContext.js';
import { Notification } from "../../components/Notification.js";

export default function AddEditAlternativepropulsionsystemsubdesign(props) {

  const [show, setShow] = useState(true);
  const currentSystemSubDesignId = props.alternativePropulsionSystemSubDesignId;
  const [alternativePropulsionSystemSubDesign, setAlternativePropulsionSystemSubDesign] = useState("");
  const [description, setDescription] = useState("");
  const [SubDesignErr, setSubDesignErr] = useState(false);
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
        if (currentSystemSubDesignId != null && currentSystemSubDesignId != 0) {
          await getSubDesignDetail(currentSystemSubDesignId).then(res => {
            setAlternativePropulsionSystemSubDesign(res.alternativePropulsionSystemSubDesign)
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
  }, [currentSystemSubDesignId])

  function SubDesignHandler(e) {
    let item = e.target.value;
    if (item == null || item == "") {
      setSubDesignErr(true)
    } else {
      setSubDesignErr(false)
    }
    setAlternativePropulsionSystemSubDesign(item);
  }

  async function SaveSubDesign(e) {
    e.preventDefault();
    setLoading(true);
    let message = '';
    let validate = true;

    try {
      if (alternativePropulsionSystemSubDesign == undefined || alternativePropulsionSystemSubDesign.trim() == null || alternativePropulsionSystemSubDesign.trim() == "") {
        validate = false;
        setSubDesignErr(true);
        return;
      }
      else {
        setSubDesignErr(false);
      }

      await addSubDesign(currentSystemSubDesignId, alternativePropulsionSystemSubDesign, description).then(res => {
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
          {currentSystemSubDesignId == null || currentSystemSubDesignId == 0 ? <Modal.Title>Add Alternative Propulsion System Sub Design</Modal.Title> : <Modal.Title>Update Alternative Propulsion System Sub Design</Modal.Title>}
        </Modal.Header>
        <Form onSubmit={SaveSubDesign}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label className="mb-1">Alternative Propulsion System Sub Design</Form.Label>
              <Form.Control type="text" autoComplete="off" name="fueltype" id="fueltype"
                value={alternativePropulsionSystemSubDesign} disabled={currentSystemSubDesignId == null || currentSystemSubDesignId == 0 ? false : true} onChange={SubDesignHandler} />{SubDesignErr ? <span style={{ color: 'red' }}>Please enter alternative propulsion system sub design</span> : null}
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