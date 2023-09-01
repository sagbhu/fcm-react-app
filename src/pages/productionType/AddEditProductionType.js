import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { getProductionTypeDetail, addProductionType } from "../../services/ProductionTypeService.js";
import { useLoading } from '../../LoadingContext.js';
import { Notification } from "../../components/Notification.js";

export default function AddEditProductionType(props) {

  const [show, setShow] = useState(true);
  const currentProductionTypeId = props.productionTypeId;
  const [productionType, setProductionType] = useState("");
  const [description, setDescription] = useState("");
  const [productionTypeErr, setProductionTypeErr] = useState(false);
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
        if (currentProductionTypeId != null && currentProductionTypeId != 0) {
          await getProductionTypeDetail(currentProductionTypeId).then(res => {
            setProductionType(res.productionType)
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
  }, [currentProductionTypeId])

  function ProductionTypeHandler(e) {
    let item = e.target.value;
    if (item == null || item == "") {
      setProductionTypeErr(true)
    } else {
      setProductionTypeErr(false)
    }
    setProductionType(item);
  }

  async function SaveProductionType(e) {
    e.preventDefault();
    setLoading(true);
    let message = '';
    let validate = true;

    try {
      if (productionType == undefined || productionType.trim() == null || productionType.trim() == "") {
        validate = false;
        setProductionTypeErr(true);
        return;
      }
      else {
        setProductionTypeErr(false);
      }

      await addProductionType(currentProductionTypeId, productionType, description).then(res => {
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
          {currentProductionTypeId == null || currentProductionTypeId == 0 ? <Modal.Title>Add Production Type</Modal.Title> : <Modal.Title>Update Production Type</Modal.Title>}
        </Modal.Header>
        <Form onSubmit={SaveProductionType}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label className="mb-1">Production Type</Form.Label>
              <Form.Control type="text" autoComplete="off" name="productionType" id="productionType"
                value={productionType} disabled={currentProductionTypeId == null || currentProductionTypeId == 0 ? false : true} onChange={ProductionTypeHandler} />{productionTypeErr ? <span style={{ color: 'red' }}>Please enter production type</span> : null}
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