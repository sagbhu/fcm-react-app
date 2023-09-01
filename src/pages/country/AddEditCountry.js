import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { getCountryNameDetail, addCountryName } from "../../services/CountryService.js";
import { useLoading } from '../../LoadingContext.js';
import { Notification } from "../../components/Notification.js";

export default function AddEditCountry(props) {

  const [show, setShow] = useState(true);
  const currentCountryId = props.countryId;
  const [countryName, setCountryName] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [countryNameErr, setCountryNameErr] = useState(false);
  const [countryCodeErr, setCountryCodeErr] = useState(false);
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
        if (currentCountryId != null && currentCountryId != 0) {
          await getCountryNameDetail(currentCountryId).then(res => {
            setCountryName(res.countryName)
            setCountryCode(res.iso2CountryCode)
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
  }, [currentCountryId])

  function CountryNameHandler(e) {
    let item = e.target.value;
    if (item == null || item == "") {
      setCountryNameErr(true)
    } else {
      setCountryNameErr(false)
    }
    setCountryName(item);
  }

  function CountryCodeHandler(e) {
    let item = e.target.value;
    if (item == null || item == "") {
        setCountryCodeErr(true)
    } else {
        setCountryCodeErr(false)
    }
    setCountryCode(item);
  }

  async function SaveCountryName(e) {
    e.preventDefault();
    setLoading(true);
    let message = '';
    let validate = true;

    try {
      if (countryName == undefined || countryName.trim() == null || countryName.trim() == "") {
        validate = false;
        setCountryNameErr(true);
      }
      else {
        setCountryNameErr(false);
      }
      if (countryCode == undefined || countryCode.trim() == null || countryCode.trim() == "") {
        validate = false;
        setCountryCodeErr(true);
      }
      else {
        setCountryCodeErr(false);
      }
      if(!validate){
        return;
      }

      await addCountryName(currentCountryId, countryName, countryCode).then(res => {
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
          {currentCountryId == null || currentCountryId == 0 ? <Modal.Title>Add Country</Modal.Title> : <Modal.Title>Update Country</Modal.Title>}
        </Modal.Header>
        <Form onSubmit={SaveCountryName}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label className="mb-1">Country Name</Form.Label>
              <Form.Control type="text" autoComplete="off" name="countryname" id="countryname"
                value={countryName} disabled={currentCountryId == null || currentCountryId == 0 ? false : true} onChange={CountryNameHandler} />{countryNameErr ? <span style={{ color: 'red' }}>Please enter country name</span> : null}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="mb-1">Country Code</Form.Label>
              <Form.Control type="text" autoComplete="off" name="countrycode" id="countrycode"
                value={countryCode}  onChange={CountryCodeHandler} />{countryCodeErr ? <span style={{ color: 'red' }}>Please enter country code</span> : null}
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