import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { addRegSalesSegment } from "../../services/RegSalesSegmentService.js"
import { getRegSalesSegmentDetail } from "../../services/RegSalesSegmentService.js"
import { useLoading } from '../../LoadingContext.js';
import { Notification } from "../../components/Notification.js";

export default function AddEditRegSalesSegment(props) {

  const [show, setShow] = useState(true);
  const currentRegSalesSegmentId = props.regSalesSegmentId;
  const [regSalesSegment, setRegSalesSegment] = useState("");
  const [regSalesPriceClass, setRegSalesPriceClass] = useState("");
  const [description, setDescription] = useState("");
  const [regSalesSegmentErr, setRegSalesSegmentErr] = useState(false);
  const [regSalesPriceClassErr, setRegSalesPriceClassErr] = useState(false);
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
        if (currentRegSalesSegmentId != null && currentRegSalesSegmentId != 0) {
          await getRegSalesSegmentDetail(currentRegSalesSegmentId).then(res => {
            setRegSalesSegment(res.regSalesSegment)
            setRegSalesPriceClass(res.regSalesPriceClass)
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
  }, [currentRegSalesSegmentId])

  function RegSalesSegmentHandler(e) {
    let item = e.target.value;
    if (item == null || item == "") {
      setRegSalesSegmentErr(true)
    } else {
      setRegSalesSegmentErr(false)
    }
    setRegSalesSegment(item);
  }
  function RegSalesPriceClassHandler(e) {
    let item = e.target.value;
    if (item == null || item == "") {
      setRegSalesPriceClassErr(true)
    } else {
      setRegSalesPriceClassErr(false)
    }
    setRegSalesPriceClass(item);
  }

  async function SaveRegSalesSegment(e) {
    e.preventDefault();
    setLoading(true);
    let message = '';
    let validate = true;

    try {
      if (regSalesSegment == undefined || regSalesSegment.trim() == null || regSalesSegment.trim() == "") {
        validate = false;
        setRegSalesSegmentErr(true);
      }
      else {
        setRegSalesSegmentErr(false);
      }
      if (regSalesPriceClass == undefined || regSalesPriceClass.trim() == null || regSalesPriceClass.trim() == "") {
        validate = false;
        setRegSalesPriceClassErr(true);
      }
      else {
        setRegSalesPriceClassErr(false);
      }
      if (!validate) {
        return;
      }
      await addRegSalesSegment(currentRegSalesSegmentId, regSalesSegment, regSalesPriceClass, description).then(res => {
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
          {currentRegSalesSegmentId == null || currentRegSalesSegmentId == 0 ? <Modal.Title>Add Reg Sales Segment</Modal.Title> : <Modal.Title>Update Reg Sales Segment</Modal.Title>}
        </Modal.Header>
        <Form onSubmit={SaveRegSalesSegment}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label className="mb-1">Reg Sales Segment</Form.Label>
              <Form.Control type="text" autoComplete="off" name="regSalesSegment" id="regSalesSegment"
                value={regSalesSegment} disabled={currentRegSalesSegmentId == null || currentRegSalesSegmentId == 0 ? false : true} onChange={RegSalesSegmentHandler} />{regSalesSegmentErr ? <span style={{ color: 'red' }}>Please enter reg sales segment</span> : null}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="mb-1">Reg Sales Price Class</Form.Label>
              <Form.Control type="text" autoComplete="off" name="regSalesPriceClass" id="regSalesPriceClass"
                value={regSalesPriceClass} disabled={currentRegSalesSegmentId == null || currentRegSalesSegmentId == 0 ? false : true} onChange={RegSalesPriceClassHandler} />{regSalesPriceClassErr ? <span style={{ color: 'red' }}>Please enter reg sales price class</span> : null}
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