import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { getEngineLayoutDetail, addEngineLayout } from "../../services/EngineLayoutService.js";
import { useLoading } from '../../LoadingContext.js';
import { Notification } from "../../components/Notification.js";

export default function AddEditEngineLayout(props) {

  const [show, setShow] = useState(true);
  const currentEngineLayoutId = props.engineLayoutId;
  const [engineLayout, setEngineLayout] = useState("");
  const [description, setDescription] = useState("");
  const [engineLayoutErr, setEngineLayoutErr] = useState(false);
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
        if (currentEngineLayoutId != null && currentEngineLayoutId != 0) {
          await getEngineLayoutDetail(currentEngineLayoutId).then(res => {
            setEngineLayout(res.engineLayout)
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
  }, [currentEngineLayoutId])

  function EngineLayoutHandler(e) {
    let item = e.target.value;
    if (item == null || item == "") {
      setEngineLayoutErr(true)
    } else {
      setEngineLayoutErr(false)
    }
    setEngineLayout(item);
  }

  async function SaveEngineLayout(e) {
    e.preventDefault();
    setLoading(true);
    let message = '';
    let validate = true;

    try {
      if (engineLayout == undefined || engineLayout.trim() == null || engineLayout.trim() == "") {
        validate = false;
        setEngineLayoutErr(true);
        return;
      }
      else {
        setEngineLayoutErr(false);
      }

      await addEngineLayout(currentEngineLayoutId, engineLayout, description).then(res => {
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
          {currentEngineLayoutId == null || currentEngineLayoutId == 0 ? <Modal.Title>Add Engine Layout</Modal.Title> : <Modal.Title>Update Engine Layout</Modal.Title>}
        </Modal.Header>
        <Form onSubmit={SaveEngineLayout}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label className="mb-1">Engine Layout</Form.Label>
              <Form.Control type="text" autoComplete="off" name="engineLayout" id="engineLayout"
                value={engineLayout} disabled={currentEngineLayoutId == null || currentEngineLayoutId == 0 ? false : true} onChange={EngineLayoutHandler} />{engineLayoutErr ? <span style={{ color: 'red' }}>Please enter engine layout</span> : null}
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