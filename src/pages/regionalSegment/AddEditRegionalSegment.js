import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { getRegionalSegmentDetail, addRegionalSegment } from "../../services/RegionalSegmentService.js";
import { useLoading } from '../../LoadingContext.js';
import { Notification } from "../../components/Notification.js";

export default function AddEditRegionalSegment(props) {

  const [show, setShow] = useState(true);
  const currentRegionalSegmentId = props.regionalSegmentId;
  const [regionalSegment, setRegionalSegment] = useState("");
  const [description, setDescription] = useState("");
  const [regionalSegmentErr, setRegionalSegmentErr] = useState(false);
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
        if (currentRegionalSegmentId != null && currentRegionalSegmentId != 0) {
          await getRegionalSegmentDetail(currentRegionalSegmentId).then(res => {
            setRegionalSegment(res.regionalSegment)
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
  }, [currentRegionalSegmentId])

  function FuleHandler(e) {
    let item = e.target.value;
    if (item == null || item == "") {
      setRegionalSegmentErr(true)
    } else {
      setRegionalSegmentErr(false)
    }
    setRegionalSegment(item);
  }

  async function SaveRegionalSegment(e) {
    e.preventDefault();
    setLoading(true);
    let message = '';
    let validate = true;

    try {
      if (regionalSegment == undefined || regionalSegment.trim() == null || regionalSegment.trim() == "") {
        validate = false;
        setRegionalSegmentErr(true);
        return;
      }
      else {
        setRegionalSegmentErr(false);
      }

      await addRegionalSegment(currentRegionalSegmentId, regionalSegment, description).then(res => {
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
          {currentRegionalSegmentId == null || currentRegionalSegmentId == 0 ? <Modal.Title>Add Regional Segment</Modal.Title> : <Modal.Title>Update Regional Segment</Modal.Title>}
        </Modal.Header>
        <Form onSubmit={SaveRegionalSegment}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label className="mb-1">Regional Segment</Form.Label>
              <Form.Control type="text" autoComplete="off" name="regionalSegment" id="regionalSegment"
                value={regionalSegment} disabled={currentRegionalSegmentId == null || currentRegionalSegmentId == 0 ? false : true} onChange={FuleHandler} />{regionalSegmentErr ? <span style={{ color: 'red' }}>Please enter regional segment</span> : null}
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