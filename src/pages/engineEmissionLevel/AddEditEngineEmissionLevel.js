import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { getEngineEmissionLevelDetail, addEngineEmissionLevel } from "../../services/EngineEmissionLevelService.js";
import { useLoading } from '../../LoadingContext.js';
import { Notification } from "../../components/Notification.js";

export default function AddEditEngineEmissionLevel(props) {

  const [show, setShow] = useState(true);
  const currentEngineEmissionLevelId = props.engineEmissionLevelId;
  const [engineEmissionLevel, setEngineEmissionLevel] = useState("");
  const [description, setDescription] = useState("");
  const [engineEmissionLevelErr, setEngineEmissionLevelErr] = useState(false);
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
        if (currentEngineEmissionLevelId != null && currentEngineEmissionLevelId != 0) {
          await getEngineEmissionLevelDetail(currentEngineEmissionLevelId).then(res => {
            setEngineEmissionLevel(res.engineEmissionLevel)
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
  }, [currentEngineEmissionLevelId])

  function EngineEmissionLevelHandler(e) {
    let item = e.target.value;
    if (item == null || item == "") {
      setEngineEmissionLevelErr(true)
    } else {
      setEngineEmissionLevelErr(false)
    }
    setEngineEmissionLevel(item);
  }

  async function SaveEngineEmissionLevel(e) {
    e.preventDefault();
    setLoading(true);
    let message = '';
    let validate = true;

    try {
      if (engineEmissionLevel == undefined || engineEmissionLevel.trim() == null || engineEmissionLevel.trim() == "") {
        validate = false;
        setEngineEmissionLevelErr(true);
        return;
      }
      else {
        setEngineEmissionLevelErr(false);
      }

      await addEngineEmissionLevel(currentEngineEmissionLevelId, engineEmissionLevel, description).then(res => {
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
          {currentEngineEmissionLevelId == null || currentEngineEmissionLevelId == 0 ? <Modal.Title>Add Engine Emission Level</Modal.Title> : <Modal.Title>Update Engine Emission Level</Modal.Title>}
        </Modal.Header>
        <Form onSubmit={SaveEngineEmissionLevel}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label className="mb-1">Engine Emission Level</Form.Label>
              <Form.Control type="text" autoComplete="off" name="engineEmissionLevel" id="engineEmissionLevel"
                value={engineEmissionLevel} disabled={currentEngineEmissionLevelId == null || currentEngineEmissionLevelId == 0 ? false : true} onChange={EngineEmissionLevelHandler} />{engineEmissionLevelErr ? <span style={{ color: 'red' }}>Please enter engine emission level</span> : null}
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