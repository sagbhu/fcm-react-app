import React, { useState, useEffect } from "react";
import { Nav, Navbar, NavDropdown, Button, Form, Modal, Col, Row, Container, Card, Table } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { getStrategicGroupBrandCapiqMappingDetail, addStrategicGroupBrandCapiqMapping } from '../../services/StrategicGroupBrandCapiqMappingService.js';
import {bindCarCompanyName} from '../../services/MakeCarCompanyMappingService.js';

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { useLoading } from '../../LoadingContext.js';
import { BiCheckboxChecked } from "react-icons/bi";
import { Notification } from "../../components/Notification.js";
import Select from 'react-select';

export default function AddEditStrategicGroupBrandCapiqMapping(props) {
  const [show, setShow] = useState(true);
  const currentCarCompanyMappingId = props.strategicGroupBrandCarCompanyMappingId;
  const [strategicGroup, setStrategicGroup] = useState("");
  const [strategicGroupErr, setStrategicGroupErr] = useState(false);

  const [brand, setBrand] = useState("");
  const [brandErr, setBrandErr] = useState(false);

  const [capiqErr, setCapiqErr] = useState(false);

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

        if (currentCarCompanyMappingId != null && currentCarCompanyMappingId != "") {
          await getStrategicGroupBrandCapiqMappingDetail(currentCarCompanyMappingId).then(res => {
            setCarCompanyCapiqMappingId(res.carCompanyCapiqMappingId)
            setStrategicGroup(res.strategicGroup)
            setBrand(res.brand)
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
  }, [currentCarCompanyMappingId])

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

  function CapiqHandler(e) {
    let item = e.value;
    if (item == null || item == "") {
      setCapiqErr(true);
    } else {
      setCapiqErr(false)
    }
    setCarCompanyCapiqMappingId(item);
  }

  function StrategicGroupHandler(e) {
    let item = e.target.value;
    if (item == null || item == "") {
      setStrategicGroupErr(true);
    } else {
      setStrategicGroupErr(false)
    }
    setStrategicGroup(item);
  }

  function BrandHandler(e) {
    let item = e.target.value;
    if (item == null || item == "") {
      setBrandErr(true)
    } else {
      setBrandErr(false)
    }
    setBrand(item);
  }

  async function SaveStrategicGroupBrandCAPIQMapping(e) {
    e.preventDefault();
    setLoading(true);
    let message = '';
    let validation = true;

    try {
      if (strategicGroup.trim() == null || strategicGroup.trim() == "") {
        validation = false;
        setStrategicGroupErr(true);
      }
      else {
        setStrategicGroupErr(false);
      }

      if (brand.trim() == null || brand.trim() == "") {
        validation = false;
        setBrandErr(true);
      }
      else {
        setBrandErr(false);
      }


      if (carCompanyCapiqMappingId == null || carCompanyCapiqMappingId == "") {
        validation = false;
        setCapiqErr(true);
      }
      else {
        setCapiqErr(false);
      }

      if (!validation) {
        return;
      }

      await addStrategicGroupBrandCapiqMapping(currentCarCompanyMappingId, strategicGroup, brand, carCompanyCapiqMappingId,carCompanyName).then(res => {
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
          {currentCarCompanyMappingId == null || currentCarCompanyMappingId == 0 ? <Modal.Title>Add Strategic Group - Brand - CAPIQ Mapping </Modal.Title> : <Modal.Title>Update Strategic Group - Brand - CAPIQ Mapping</Modal.Title>}
        </Modal.Header>
        <Form onSubmit={SaveStrategicGroupBrandCAPIQMapping}>
        
          <Modal.Body>
          

            <Form.Group className="mb-3">
              <Form.Label className="mb-1">Strategic Group</Form.Label>
              <Form.Control type="text" autoComplete="off" name="brand" id="brand"
                value={strategicGroup} disabled={currentCarCompanyMappingId == null || currentCarCompanyMappingId == 0 ? false : true} onChange={StrategicGroupHandler} />{strategicGroupErr ? <span style={{ color: 'red' }}>Please enter strategic group</span> : null}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="mb-1">Brand</Form.Label>
              <Form.Control type="text" autoComplete="off" name="brand" id="brand"
                value={brand} disabled={currentCarCompanyMappingId == null || currentCarCompanyMappingId == 0 ? false : true} onChange={BrandHandler} />{brandErr ? <span style={{ color: 'red' }}>Please enter brand</span> : null}
            </Form.Group>


            <Form.Group className="mb-3">
              <Form.Label className="mb-1">Capiq Id</Form.Label>
              <br></br>
              <Select
                options={carCompanyNameList.map(({ carCompanyCapiqMappingId, carCompanyName ,capiqId}) => ({ label: carCompanyName +" ("+ capiqId+")", value: carCompanyCapiqMappingId }))}
                onChange={CapiqHandler}
                defaultValue={{ label: carCompanyName }}
                defaultMenuIsOpen={false}
                id="carCompanyCapiqMappingId">
              </Select>
              {capiqErr ? <span style={{ color: 'red' }}>Please select CAPIQ Id</span> : null}
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