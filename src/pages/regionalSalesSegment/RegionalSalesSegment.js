import 'react-toastify/dist/ReactToastify.css';
import ListGroup from 'react-bootstrap/ListGroup';
import React, { useState, useEffect } from "react";
import { Nav, Navbar, Button, Form, Col, Row, Card } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { BsFileEarmarkText } from "react-icons/bs";
import { getRegionalSalesSegmentList, deleteRegionalSalesSegment } from "../../services/RegionalSalesSegmentService.js"
import AddEditRegionalSalesSegment from '../regionalSalesSegment/AddEditRegionalSalesSegment.js'
import Bootbox from 'bootbox-react'
import { Notification } from "../../components/Notification.js";
import { useLoading } from '../../LoadingContext.js';

export default function RegionalSalesSegment() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [currentRegionalSalesSegmentId, setCurrentRegionalSalesSegmentId] = useState(null);
    const [regionalSalesSegmentList, setRegionalSalesSegmentList] = useState([]);
    const [showConfirm, setShowConfirm] = useState(false);
    const bootboxClose = () => setShowConfirm(false);
    const [vehicleRegionalSalesSegment, setVehicleRegionalSalesSegment] = useState("");
    const [vehicleSalesRegion, setVehicleSalesRegion] = useState("");
    const [vehicleRegionalSalesSubSegment, setVehicleRegionalSalesSubSegment] = useState("");
    const [vehicleRegionalSalesPriceClass, setVehicleRegionalSalesPriceClass] = useState("");
    const [architecture, setArchitecture] = useState("");
    const [bodyType, setBodyType] = useState("");
    const [description, setDescription] = useState("");
    const [tonsDividedByLoadVolume, setTonsDividedByLoadVolume] = useState("");
    const [oah, setOah] = useState("");
    const [oal, setOal] = useState("");
    const [oalMax, setOalMax] = useState("");
    const [oalMin, setOalMin] = useState("");
    const [parameters, setParameters] = useState("");
    const [wis, setWis] = useState("");
    const { setLoading } = useLoading();

    async function handleConfirm() {
        let message = '';
        setShowConfirm(false);
        setLoading(true);
        try {
            await deleteRegionalSalesSegment(currentRegionalSalesSegmentId).then(res => { message = res });
        }
        catch (error) {
            message = error.message;
        }
        finally {
            if (message == 'SUCCESS') {
                Notification('Regional sales segment deleted successfully!', 'success')
            } else {
                Notification(message, 'ERROR')
            }
            setCurrentRegionalSalesSegmentId(null);
            setLoading(false);
        }

        getregionalSalesSegmentList();

    }

    const handleSearch = (e) => {
        e.preventDefault();
        getregionalSalesSegmentList();
    };

    useEffect(() => {
        getregionalSalesSegmentList();
    }, [])

    async function handleReset(e) {
        setVehicleSalesRegion("");
        setVehicleRegionalSalesSegment("");
        setVehicleRegionalSalesSubSegment("");
        setVehicleRegionalSalesPriceClass("");
        await getRegionalSalesSegmentList(vehicleRegionalSalesSegment, vehicleSalesRegion, vehicleRegionalSalesSubSegment, vehicleRegionalSalesPriceClass).then(res => { setRegionalSalesSegmentList(res) });
    }

    async function getregionalSalesSegmentList() {
        setLoading(true);
        try {
            await getRegionalSalesSegmentList(vehicleRegionalSalesSegment, vehicleSalesRegion, vehicleRegionalSalesSubSegment, vehicleRegionalSalesPriceClass).then(res => {
                setRegionalSalesSegmentList(res)
            });
        }
        catch (error) {
        }
        finally {
            setLoading(false);
        }
    }

    function onDataSave(isSubmitted, message) {
        handleClose();
        if (isSubmitted && message.toUpperCase() == "SUCCESS") {
            Notification('Regional sales segment saved successfully!', 'SUCCESS')
            getregionalSalesSegmentList();
        }
        else {
            Notification(message, 'ERROR')
        }
    }
    
    const columns = [
        {
            dataField: "vehicleRegionalSalesSegmentId",
            text: "vehicleRegionalSalesSegmentId",
            sort: true,
            hidden: true,
            style: {
                width: '10%'
            }
        },
        {
        dataField: "vehicleSalesRegion",
        text: "Vehicle Sales Region",
        sort: true,
        style: {
            width: '10%'
        }
    },
    {
        dataField: "vehicleRegionalSalesSegment",
        text: "Regional Sales Segment",
        sort: true,
        style: {
            width: '10%'
        }
    },
    {
        dataField: "vehicleRegionalSalesSubSegment",
        text: "Regional Sales Sub Segment",
        sort: true,
        style: {
            width: '8%'
        }
    },
    {
        dataField: "vehicleRegionalSalesPriceClass",
        text: "Regional Sales Price Class",
        sort: true,
        style: {
            width: '8%'
        }
    },
    {
        dataField: "architecture",
        text: "Architecture",
        sort: true,
        style: {
            width: '5%'
        }
    },
    {
        dataField: "bodyType",
        text: "Body Type",
        sort: true,
        style: {
            width: '5%'
        }
    },
    {
        dataField: "description",
        text: "Description",
        sort: true,
        style: {
            width: '5%'
        }
    },
    {
        dataField: "gvwTonsDividedByLoadVolume",
        text: "Tons Divided By Load Volume",
        sort: true,
        style: {
            width: '10%'
        }
    },
    {
        dataField: "oah",
        text: "Oah",
        sort: true,
        style: {
            width: '5%'
        }
    },
    {
        dataField: "oal",
        text: "Oal",
        sort: true,
        style: {
            width: '5%'
        }
    },
    {
        dataField: "oalMax",
        text: "Oal Max",
        sort: true,
        style: {
            width: '5%'
        }
    },
    {
        dataField: "oalMin",
        text: "oal Min",
        sort: true,
        style: {
            width: '5%'
        }
    },
    {
        dataField: "parameters",
        text: "Parameters",
        sort: true,
        style: {
            width: '7%'
        }
    },
    {
        dataField: "wis",
        text: "Wis",
        sort: true,
        style: {
            width: '5%'
        }
    },
    {
        dataField: 'Action',
        text: 'Action',
        style: {
            padding: '3px',
            margin: '0px',
            width: '8%',
            textAlign: 'center'
        },
        headerStyle: { textAlign: 'center' },
        formatter: (cell, columns, rowIndex, extraData) => (
            <div>
                <a href={regionalSalesSegmentList.value} style={{ display: 'inline-flex' }} >
                    <button title="Edit" type="button" onClick={() => { setCurrentRegionalSalesSegmentId(columns.vehicleRegionalSalesSegmentId); handleShow() }} size="sm" className="icone-button"><i className="icon-pencil3 dark-grey"></i></button>
                    <button title='Delete' type="button" onClick={() => { setCurrentRegionalSalesSegmentId(columns.vehicleRegionalSalesSegmentId); setShowConfirm(true) }} className="icone-button"><i className="icon-trash dark-grey"></i></button>
                </a>
            </div>
        )
    },
    ]

    return (
        <>
            {show && <AddEditRegionalSalesSegment onDataSave={onDataSave} vehicleRegionalSalesSegmentId={currentRegionalSalesSegmentId} />}
            <ToastContainer />
            <ListGroup>
                <ListGroup.Item>
                    <Navbar collapseOnSelect expand="sm" variant="dark" className='search-card'>
                        <Navbar.Brand style={{ color: 'black' }}><BsFileEarmarkText /> Regional Sales Segment </Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto"></Nav>
                            <Nav>
                                <Navbar.Brand style={{ color: 'black' }}><Button className='btn' variant="danger" type='button' size="sm" onClick={() => { setCurrentRegionalSalesSegmentId(0); handleShow() }} >+ Add Regional Sales Segment</Button></Navbar.Brand>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar >
                </ListGroup.Item>
                <ListGroup.Item>
                    <Card className="search-panel-card">
                 

                        <Form onSubmit={(event) => handleSearch(event)} className="main-class">
              <Row >
                <Col xs={4} className='display-inline mr-0' >
                  <Col xs={4}  className='p-0'>
                    <Form.Label>Vehicle Sales Region</Form.Label>
                  </Col>
                  <Col xs={8} >
                  <Form.Control type="text" value={vehicleSalesRegion} onChange={(e) => setVehicleSalesRegion(e.target.value)} />
                  </Col>
                </Col>

                <Col xs={4} className='display-inline mr-0' style={{width: '40.33%'}}>
                  <Col xs={4} >
                    <Form.Label >Regional Sales Segment</Form.Label>
                  </Col>
                  <Col xs={8}  >
                  <Form.Control type="text" value={vehicleRegionalSalesSegment} onChange={(e) => setVehicleRegionalSalesSegment(e.target.value)} />
                  </Col>
                </Col>
              </Row>
              <Row style={{ marginTop: '10px' }}>

                <Col xs={4} className='display-inline mr-0'>
                  <Col xs={4}  className='p-0'>
                    <Form.Label>Regional Sales Sub Segment</Form.Label>
                  </Col>
                  <Col xs={8} >
                  <Form.Control type="text" value={vehicleRegionalSalesSubSegment} onChange={(e) => setVehicleRegionalSalesSubSegment(e.target.value)} />
                  </Col>
                </Col>

                <Col xs={4} className='display-inline mr-0' style={{width: '40.33%'}} >
                  <Col xs={4} >
                    <Form.Label>Regional Sales Price Class</Form.Label>
                  </Col>
                  <Col xs={8}>
                  <Form.Control type="text" value={vehicleRegionalSalesPriceClass} onChange={(e) => setVehicleRegionalSalesPriceClass(e.target.value)} />
                  </Col>
                </Col>
                <Col  className='display-inline mr-0 p-0' xs={3}>
                    <Button className='btn btn-primary mr-5' type="submit" onClick={(event) => handleSearch(event)}>Search</Button>
                    <Button onClick={(event) => handleReset(event)} className='btn btn-dft' type='submit'>Reset</Button>
                  </Col>
              </Row>
            </Form>

                    </Card>
                    <div className='tablecard'>
                        <BootstrapTable size="sm"
                            keyField={'vehicleRegionalSalesSegmentId'}
                            id='tbl_regionalSalesSegment'
                            data={regionalSalesSegmentList}
                            columns={columns}
                            striped
                            hover
                            condensed
                            noDataIndication="No records found"
                            pagination={paginationFactory({
                                sizePerPageList: [10, 20, 30, 50]
                            })}
                        />
                    </div>


                </ListGroup.Item>
            </ListGroup>


            <Bootbox show={showConfirm}
                type={"confirm"}
                message={"Are you sure you want to delete this regional sales segment?"}
                onSuccess={handleConfirm}
                onCancel={bootboxClose}
                onClose={bootboxClose}
            />
        </>
    )
}