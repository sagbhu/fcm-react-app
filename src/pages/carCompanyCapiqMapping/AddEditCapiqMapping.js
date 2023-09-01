import React, { useState, useEffect } from "react";
import { Nav, Navbar, NavDropdown, Button, Form, Modal, Col, Row, Container, Card, Table } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { getKenshoRecords, getCapiqMappingDetail, addCapiqMapping } from '../../services/CarCompanyCapiqMappingService.js';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { useLoading } from '../../LoadingContext.js';
import { BiCheckboxChecked } from "react-icons/bi";
import { Notification } from "../../components/Notification.js";

export default function AddEditCapiqMapping(props) {

  const [show, setShow] = useState(true);
  const currentCapiqId = props.carCompanyCapiqMappingId;
  const [capiqId, setCapiqId] = useState("");
  const [capiqName, setCapiqName] = useState("");
  const [capiqNameErr, setCapiqNameErr] = useState("");
  const [carCompanyName, setCarCompanyName] = useState("");
  const [carCompanyNameErr, setCarCompanyNameErr] = useState("");
  const [capiqIdErr, setCapiqIdErr] = useState(false);
  const handleClose = () => setShow(false);
  const [capiqMappingList, setCapiqMappingList] = useState([]);
  const { setLoading } = useLoading();
  const [dataLoading, setDataLoading] = useState(false);
  const [kenshoRecords, setKenshoRecords] = useState([]);
  let carname = "";

  useEffect(() => {
    if (!show) {
      props.onDataSave(false);
    }
  }, [show])

  useEffect(() => {
    CapiqMappingDetail();
  }, [currentCapiqId])

  const columns = [
    {
      dataField: "carCompanyName",
      text: "Car Company Name ",
      sort: true,
      style: {
        width: '16%'
      },
      formatter: (cell, columns, rowIndex, extraData) => (
        carCompanyName
      )
    },
    {
      dataField: "knowledge_base_name",
      text: "Knowledge Base Name ",
      sort: true,
      style: {
        width: '55%'
      },
    },
    {
      dataField: "knowledge_base_uid",
      text: "Knowledge Base UID ",
      sort: true,
      style: {
        width: '14%',
        textAlign: 'center'
      },
      headerStyle: { textAlign: 'center' },
    },
    {
      dataField: "link_score",
      text: "Link Score ",
      sort: true,
      style: {
        width: '10%',
        textAlign: 'center'
      },
      headerStyle: { textAlign: 'center' },
      formatter: (cell, columns, rowIndex, extraData) => (
        (parseFloat(columns.link_score) * 100).toFixed(2).toString()
      )
    }
  ]

  async function CapiqMappingDetail() {
    try {
      setLoading(true);
      setDataLoading(true);
      if (currentCapiqId != null && currentCapiqId != 0) {
        await getCapiqMappingDetail(currentCapiqId).then(res => {
          setCarCompanyName(res.carCompanyName)
          setCapiqName(res.capiqName)
          setCapiqId(res.capiqId)
          carname = res.carCompanyName;
        });
        await getKenshoRecordList();
      };
    }
    catch (error) {

    }
    finally {
      setTimeout(() => {
        setDataLoading(false);  
        setLoading(false);      
      }, 1200);
    }
  }

  async function getKenshoRecordList() {
    setLoading(true);
    try {
      if ((carname != null && carname != "") || (carCompanyName != null && carCompanyName != "")) {
        await getKenshoRecords(carCompanyName != "" && carCompanyName != null ? carCompanyName : carname, setKenshoRecords)
      };
    }
    catch (error) {
    }
    finally {setTimeout(() => {      
      setLoading(false);      
    }, 1200);
    }
  }

  function carHandler(e) {
    let item = e.target.value;
    if (item == null || item == "") {
      setCarCompanyNameErr(true)

    } else {
      setCarCompanyNameErr(false)
    }
    setCarCompanyName(item);
  }

  function capiqNameHandler(e) {
    let item = e.target.value;
    if (item == null || item == "") {
      setCapiqNameErr(true)

    } else {
      setCapiqNameErr(false)
    }
    setCapiqName(item);
  }

  function capiqIdHandler(e) {
    let item = e.target.value;
    if (item == null || item == "") {
      setCapiqIdErr(true)

    } else {
      setCapiqIdErr(false)
    }
    setCapiqId(item);
  }

  async function SaveCapiqMapping(e) {
    e.preventDefault();
    setLoading(true);
    let message = '';
    let validation = true;

    try {

      if (carCompanyName == undefined || carCompanyName == null || carCompanyName == "") {
        validation = false;
        setCarCompanyNameErr(true);
      }
      else {
        setCarCompanyNameErr(false);
      }

      if (capiqName == null || capiqName == "") {
        validation = false;
        setCapiqNameErr(true);
      }
      else {
        setCapiqNameErr(false);
      }

      if (capiqId == null || capiqId == "") {
        validation = false;
        setCapiqIdErr(true);
      }
      else {
        setCapiqIdErr(false);
      }

      if (!validation) {
        return;
      }

      await addCapiqMapping(currentCapiqId, capiqId, capiqName, carCompanyName).then(res => {
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

  function onKeyDownHandler(e) {
    if (e.keyCode === 13) {
      getKenshoRecordList();
    }
  };

  const selectRow = {    
    mode: 'radio',
    selectionHeaderRenderer: (e) => 'Action',
    selectionRenderer: ({ }) => (
      <button type="button" class="btn btn-primary" style= {{ padding: '3px', margin: '0px',  textAlign: 'center' }}>Select</button>
    ),
    selectColumnPosition: 'right',
    classes: 'selected',
   
    onSelect: (row, isSelect, rowIndex, e) => {
      capiqNameHandler({ target: { value: row.knowledge_base_name }});
      capiqIdHandler({ target: { value: row.knowledge_base_uid } });
      console.log(row.id);
      console.log(isSelect);
      console.log(rowIndex);
      console.log(e);
    },
    //clickToSelect: true
  };

  return (
    <>
      <Modal
        show={show && !dataLoading}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg2"
        className="main-class"
      >
        <Modal.Header closeButton>
          {currentCapiqId == null || currentCapiqId == 0 ? <Modal.Title>Add Car Company - CAPIQ Mapping</Modal.Title> : <Modal.Title>Update Car Company - CAPIQ Mapping</Modal.Title>}
        </Modal.Header>

        <Form onSubmit={SaveCapiqMapping}>

          <Card className="search-panel-card">
            <Form >
              <Row className="main-class" style={{ margin: '20px 0px !important;' }}   >
                <Col sm={3} style={{ paddingLeft: '0px' }} >
                  <Form.Label className=' search-label'>Car Company Name</Form.Label>
                  <Form.Control type="text" autoComplete="off" name="carCompanyName" id="carCompanyName"
                    value={carCompanyName} onChange={carHandler} onKeyDown={onKeyDownHandler} disabled={currentCapiqId == null || currentCapiqId == 0 ? false : true} />{carCompanyNameErr ? <span style={{ color: 'red' }}>Please enter Car Company Name</span> : null}
                </Col>

                <Col sm={5} className="pl-2">
                  <Form.Label className=' search-label'>CAPIQ Name</Form.Label>
                  <Form.Control type="text" autoComplete="off" name="capiqName" id="capiqName"
                    value={capiqName} onChange={capiqNameHandler} disabled={true} />{capiqNameErr ? <span style={{ color: 'red' }}>Please enter Capiq Name</span> : null}
                </Col>

                <Col sm={2} className="pl-2">
                  <Form.Label className=' search-label'>CAPIQ Id</Form.Label>
                  <Form.Control type="text" autoComplete="off" name="capiqId" id="capiqId"
                    value={capiqId} onChange={capiqIdHandler} disabled={true} />{capiqIdErr ? <span style={{ color: 'red' }}>Please enter Capiq Id</span> : null}
                </Col>

                <Col sm={2} className="pr-0 buttoncapiq pl-2" style={{ textAlign: 'right'}}>
                  <Button className='btn btn-primary mr-5' style={{ marginTop: '22px' }} onClick={getKenshoRecordList} >Get CAPIQ Records</Button>
                </Col>

              </Row>
            </Form>
          </Card>

          <Row className="main-class">
            <Col xs={40}>
              <div className="modalcard" style={{height: "492.25px"}}>
                <BootstrapTable size="lg"
                  keyField="knowledge_base_uid"
                  id='tbl_kenshoRecord'
                  data={kenshoRecords}
                  columns={columns}
                  selectRow={ selectRow }
                  striped
                  hover
                  condensed
                  noDataIndication="No records found" 
                  pagination={paginationFactory({
                    sizePerPageList: [5, 10],
                    sizePerPage: [10]
                  })
                  }
                />
              </div>
            </Col>
          </Row>

          <Modal.Footer>
            <Button className='btn btn-dft mr-2' onClick={handleClose}>Close</Button>
            <Button className='btn btn-primary' type="submit" >Save</Button> <ToastContainer />
          </Modal.Footer>
        </Form>
      </Modal>

    </>
  );
}