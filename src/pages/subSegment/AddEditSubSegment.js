import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { getSubSegmentDetail, addSubSegment } from "../../services/SubSegmentService.js";
import 'react-toastify/dist/ReactToastify.css';
import { useLoading } from '../../LoadingContext.js';
import { Notification } from "../../components/Notification.js";

export default function AddEditSalesSubSegment(props) {
  const [show, setShow] = useState(true);
  const currentSubSegmentId = props.subSegmentId;
  const [subSegment, setSubSegment] = useState("");
  const [description, setDescription] = useState("");
  const [subSegmentErr, setSubSegmentErr] = useState(false);
  const handleClose = () => setShow(false);
  const { setLoading } = useLoading();
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
        if (currentSubSegmentId != null && currentSubSegmentId != 0) {
          getSubSegmentDetail(currentSubSegmentId).then(res => {
            setSubSegment(res.subSegment)
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
  }, [currentSubSegmentId])

  function SegmentHandler(e) {
    let item = e.target.value;
    if (item == null || item == "") {
      setSubSegmentErr(true)

    } else {
      setSubSegmentErr(false)
    }
    setSubSegment(item);
  }

  async function SaveSubSegment(e) {
    e.preventDefault();
    setLoading(true);
    let message = '';
    let validate = true;
    try {
      if (subSegment == undefined || subSegment.trim() == null || subSegment.trim() == "") {
        validate = false;
        setSubSegmentErr(true);
        return;
      }
      else {
        setSubSegmentErr(false);
      }

      await addSubSegment(currentSubSegmentId, subSegment, description).then(res => {
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
          {currentSubSegmentId == null || currentSubSegmentId == 0 ? <Modal.Title>Add Sub Segment</Modal.Title> : <Modal.Title>Update Sub Segment</Modal.Title>}
        </Modal.Header>
        <Form onSubmit={(event) => SaveSubSegment(event)}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label className="mb-1">Sub Segment</Form.Label>
              <Form.Control type="text" autoComplete="off" name="subSegment" id="subSegment"
                value={subSegment} disabled={currentSubSegmentId == null || currentSubSegmentId == 0 ? false : true} onChange={SegmentHandler} />{subSegmentErr ? <span style={{ color: 'red' }}>Please enter sub segment</span> : null}
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
            <Button className='btn btn-dft mr-2' onClick={handleClose}>Close</Button>
            <Button className='btn btn-primary' type="submit">Save</Button> <ToastContainer />
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}