import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { getSegmentDetail, addSegment } from "../../services/SegmentService.js"
import 'react-toastify/dist/ReactToastify.css';
import { useLoading } from '../../LoadingContext.js';
import { Notification } from "../../components/Notification.js";

export default function AddEditSegment(props) {
  const [show, setShow] = useState(true);
  const currentSegmentId = props.segmentId;
  const [segment, setSegment] = useState("");
  const [description, setDescription] = useState("");
  const [segmentErr, setSegmentErr] = useState(false);
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
        if (currentSegmentId != null && currentSegmentId != 0) {
          getSegmentDetail(currentSegmentId).then(res => {
            setSegment(res.segment)
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
  }, [currentSegmentId])

  function SegmentHandler(e) {
    let item = e.target.value;
    if (item == null || item == "") {
      setSegmentErr(true)

    } else {
      setSegmentErr(false)
    }
    setSegment(item);
  }

  // async function SaveSegment(e) {
  //   e.preventDefault();
  //   if (segment == null || segment == "" || (segment && segment.length < 3)) {
  //     setSegmentErr(true);
  //     return;
  //   }
  //   else {
  //     setSegmentErr(false);
  //   }

  //   let isSuccess = false;
  //   await addSegment(currentSegmentId, segment, description).then(res => {
  //     if (res == "SUCCESS") {
  //       isSuccess = true;
  //     }
  //   });
  //   props.onDataSave(true, isSuccess);
  // }

  async function SaveSegment(e) {
    e.preventDefault();
    setLoading(true);
    let message = '';
    let validate = true;
    try {
      if (segment == undefined || segment.trim() == null || segment.trim() == "") {
        validate = false;
        setSegmentErr(true);
        return;
      }
      else {
        setSegmentErr(false);
      }

      await addSegment(currentSegmentId, segment, description).then(res => {
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
          {currentSegmentId == null || currentSegmentId == 0 ? <Modal.Title>Add Segment</Modal.Title> : <Modal.Title>Update Segment</Modal.Title>}
        </Modal.Header>
        <Form onSubmit={(event) => SaveSegment(event)}>
          <Modal.Body>

            <Form.Group className="mb-3">
              <Form.Label className="mb-1">Segment Type</Form.Label>
              <Form.Control type="text" autoComplete="off" name="segment" id="segment"
                value={segment} disabled={currentSegmentId == null || currentSegmentId == 0 ? false : true} onChange={SegmentHandler} />{segmentErr ? <span style={{ color: 'red' }}>Please enter segment</span> : null}
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