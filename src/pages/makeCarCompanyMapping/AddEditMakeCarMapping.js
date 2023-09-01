import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import { getMakeCarMappingDetail, bindCarCompanyName, addMakeCarMapping } from "../../services/MakeCarCompanyMappingService.js";
import { useLoading } from '../../LoadingContext.js';
import Select from 'react-select';
import { Notification } from "../../components/Notification.js";



export default function AddEditMakeCarMapping(props) {

  const [show, setShow] = useState(true);
  const currentMakeCarMappingId = props.makeCarCompanyMappingId;
  const [make, setMake] = useState("");
  const [makeErr, setMakeErr] = useState(false);
  const [carErr, setCarErr] = useState(false);
  const [carCompanyCapiqMappingId, setCarCompanyCapiqMappingId] = useState("");
  const [carCompanyNameList, setCarCompanyNameList] = useState([]);
  const handleClose = () => setShow(false);
  const [carCompanyName, setCarCompanyName] = useState();
  const { setLoading } = useLoading();
  const [dataLoading, setDataLoading] = useState(false);
  let selectedCarCompanyName = "";

  useEffect(() => {
    if (!show) {
      props.onDataSave(false);
    }
  }, [show])
  // let defaultval;
  useEffect(() => {
    (async function () {
      try {
        setDataLoading(true);
        setLoading(true);

        if (currentMakeCarMappingId != null && currentMakeCarMappingId != "") {
          await getMakeCarMappingDetail(currentMakeCarMappingId).then(res => {
            setCarCompanyCapiqMappingId(res.carCompanyCapiqMappingId)
            setMake(res.make)
            setCarCompanyName(res.carCompanyName)
            selectedCarCompanyName = res.carCompanyName;
          });

        }
        await bindCarCompanyNameList();
      }
      catch (error) {

      }
      finally {
        setDataLoading(false);
        setLoading(false);
      }

    })();
  }, [currentMakeCarMappingId])

  async function bindCarCompanyNameList() {
    setLoading(true);
    try {
      await bindCarCompanyName().then(res => {
        setCarCompanyNameList(res)
      });
    }
    catch (error) {
    }
    finally {
      setLoading(false);
    }
  }

  function MakeCarMappingHandler(e) {
    let item = e.value;
    if (item == null || item == "") {
      setCarErr(true);
    } else {
      setCarErr(false)
    }
    setCarCompanyCapiqMappingId(item);
  }

  function MakeMappingHandler(e) {
    let item = e.target.value;
    if (item == null || item == "") {
      setMakeErr(true)
    } else {
      setMakeErr(false)
    }
    setMake(item);
  }

  async function SaveMakeCarMapping(e) {
    e.preventDefault();
    setLoading(true);
    let message = '';
    let validation = true;

    try {
      if (make.trim() == null || make.trim() == "") {
        validation = false;
        setMakeErr(true);
      }
      else {
        setMakeErr(false);
      }

      if (carCompanyCapiqMappingId == null || carCompanyCapiqMappingId == "") {
        validation = false;
        setCarErr(true);
      }
      else {
        setCarErr(false);
      }
      
      if (!validation) {
        return;
      }

      await addMakeCarMapping(currentMakeCarMappingId, make, carCompanyCapiqMappingId, carCompanyName).then(res => {
        message = res.toString();
      });
    }
    catch (error) {
      message = error.message;
    }
    finally {
      setLoading(false);
      if (validation) {
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
          {currentMakeCarMappingId == null || currentMakeCarMappingId == 0 ? <Modal.Title>Add Make - Car Company Mapping</Modal.Title> : <Modal.Title>Update Make Car Company Mapping</Modal.Title>}
        </Modal.Header>
        <Form onSubmit={SaveMakeCarMapping}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label className="mb-1">Make</Form.Label>
              <Form.Control type="text" autoComplete="off" name="make" id="make"
                value={make} onChange={MakeMappingHandler} />{makeErr ? <span style={{ color: 'red' }}>Please enter make</span> : null}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="mb-1">Car Company</Form.Label>
              <br></br>
              <Select
                options={carCompanyNameList.map(({ carCompanyCapiqMappingId, carCompanyName ,capiqId}) => ({ label: carCompanyName +" ("+ capiqId+")", value: carCompanyCapiqMappingId }))}
                onChange={MakeCarMappingHandler}
                defaultValue={{ label: carCompanyName }}
                defaultMenuIsOpen={false}
                id="carCompanyCapiqMappingId">
              </Select>
              {carErr ? <span style={{ color: 'red' }}>Please select car company</span> : null}
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