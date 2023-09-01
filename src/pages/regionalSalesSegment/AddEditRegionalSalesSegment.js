import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { getRegionalSalesSegmentDetail, addRegionalSalesSegment } from "../../services/RegionalSalesSegmentService.js";
import { useLoading } from '../../LoadingContext.js';
import { Notification } from "../../components/Notification.js";

export default function AddEditRegionalSalesSegment(props) {

  const [show, setShow] = useState(true);
  const currentRegionalSalesSegmentId = props.vehicleRegionalSalesSegmentId;
  // const currentVehicleSaleRegionId = props.vehicleSalesRegionId;
  const [regionalSalesSegment, setRegionalSalesSegment] = useState("");
  const [vehicleSalesRegion, setVehicleSalesRegion] = useState("");
  const [regionalSalesSubSegment, setRegionalSalesSubSegment] = useState("");
  const [regionalSalesPriceClass, setRegionalSalesPriceClass] = useState("");
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
  const [regionalSalesSegmentErr, setRegionalSalesSegmentErr] = useState(false);
  const [vehicleSalesRegionErr, setVehicleSalesRegionErr] = useState(false);
  const [regionalSalesSubSegmentErr, setRegionalSalesSubSegmentErr] = useState(false);
  const [regionalSalesPriceClassErr, setRegionalSalesPriceClassErr] = useState(false);
  const [architectureErr, setArchitectureErr] = useState(false);
  const [bodyTypeErr, setBodyTypeErr] = useState(false);
  const [tonsDividedByLoadVolumeErr, setTonsDividedByLoadVolumeErr] = useState(false);
  const [oahErr, setOahErr] = useState(false);
  const [oalErr, setOalErr] = useState(false);
  const [oalMaxErr, setOalMaxErr] = useState(false);
  const [oalMinErr, setOalMinErr] = useState(false);
  const [parametersErr, setParametersErr] = useState(false);
  const [wisErr, setWisErr] = useState(false);


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
        if (currentRegionalSalesSegmentId != null && currentRegionalSalesSegmentId != 0) {
          await getRegionalSalesSegmentDetail(currentRegionalSalesSegmentId).then(res => {
            setVehicleSalesRegion(res.vehicleSalesRegion)
            setRegionalSalesSegment(res.vehicleRegionalSalesSegment)
            setRegionalSalesSubSegment(res.vehicleRegionalSalesSubSegment)
            setRegionalSalesPriceClass(res.vehicleRegionalSalesPriceClass)
            setArchitecture(res.architecture)
            setBodyType(res.bodyType)
            setDescription(res.description)
            setTonsDividedByLoadVolume(res.gvwTonsDividedByLoadVolume)
            setOah(res.oah)
            setOal(res.oal)
            setOalMax(res.oalMax)
            setOalMin(res.oalMin)
            setParameters(res.parameters)
            setWis(res.wis)
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
  }, [currentRegionalSalesSegmentId])

  function RegionalSalesSegmentHandler(e) {
    let item = e.target.value;
    if (item == null || item == "") {
      setRegionalSalesSegmentErr(true)
    } else {
      setRegionalSalesSegmentErr(false)
    }
    setRegionalSalesSegment(item);
  }

  function VehicleSalesRegionHandler(e) {
    let item = e.target.value;
    if (item == null || item == "") {
      setVehicleSalesRegionErr(true)
    } else {
      setVehicleSalesRegionErr(false)
    }
    setVehicleSalesRegion(item);
  }

  function RegionalSalesSubSegmentHandler(e) {
    let item = e.target.value;
    if (item == null || item == "") {
      setRegionalSalesSubSegmentErr(true)
    } else {
      setRegionalSalesSubSegmentErr(false)
    }
    setRegionalSalesSubSegment(item);
  }

  function RegionalSalesPriceClassHandler(e) {
    let item = e.target.value;
    if (item == null || item == "") {
      setRegionalSalesPriceClassErr(true)
    } else {
      setRegionalSalesPriceClassErr(false)
    }
    setRegionalSalesPriceClass(item);
  }

  function ArchitectureHandler(e) {
    let item = e.target.value;
    if (item == null || item == "") {
      setArchitectureErr(true)
    } else {
      setArchitectureErr(false)
    }
    setArchitecture(item);
  }

  function BodyTypeHandler(e) {
    let item = e.target.value;
    if (item == null || item == "") {
      setBodyTypeErr(true)
    } else {
      setBodyTypeErr(false)
    }
    setBodyType(item);
  }

  function TonsDividedByLoadVolumeHandler(e) {
    let item = e.target.value;
    if (item == null || item == "") {
      setTonsDividedByLoadVolumeErr(true)
    } else {
      setTonsDividedByLoadVolumeErr(false)
    }
    setTonsDividedByLoadVolume(item);
  }

  function OahHandler(e) {
    let item = e.target.value;
    if (item == null || item == "") {
      setOahErr(true)
    } else {
      setOahErr(false)
    }
    setOah(item);
  }

  function OalHandler(e) {
    let item = e.target.value;
    if (item == null || item == "") {
      setOalErr(true)
    } else {
      setOalErr(false)
    }
    setOal(item);
  }

  function OalMaxHandler(e) {
    let item = e.target.value;
    if (item == null || item == "") {
      setOalMaxErr(true)
    } else {
      setOalMaxErr(false)
    }
    setOalMax(item);
  }

  function OalMinHandler(e) {
    let item = e.target.value;
    if (item == null || item == "") {
      setOalMinErr(true)
    } else {
      setOalMinErr(false)
    }
    setOalMin(item);
  }

  function ParametersHandler(e) {
    let item = e.target.value;
    if (item == null || item == "") {
      setParametersErr(true)
    } else {
      setParametersErr(false)
    }
    setParameters(item);
  }

  function WisHandler(e) {
    let item = e.target.value;
    if (item == null || item == "") {
      setWisErr(true)
    } else {
      setWisErr(false)
    }
    setWis(item);
  }

  async function SaveRegionalSalesSegment(e) {
    e.preventDefault();
    setLoading(true);
    let message = '';
    let validate = true;

    try {
      if (vehicleSalesRegion == undefined || vehicleSalesRegion.trim() == null || vehicleSalesRegion.trim() == "") {
        validate = false;
        setVehicleSalesRegionErr(true);
      }
      else {
        setVehicleSalesRegionErr(false);
      }
      if (regionalSalesSegment == undefined || regionalSalesSegment.trim() == null || regionalSalesSegment.trim() == "") {
        validate = false;
        setRegionalSalesSegmentErr(true);
      }
      else {
        setRegionalSalesSegmentErr(false);
      }
      if (regionalSalesSubSegment == undefined || regionalSalesSubSegment.trim() == null || regionalSalesSubSegment.trim() == "") {
        validate = false;
        setRegionalSalesSubSegmentErr(true);
      }
      else {
        setRegionalSalesSubSegmentErr(false);
      }
      if (regionalSalesPriceClass == undefined || regionalSalesPriceClass.trim() == null || regionalSalesPriceClass.trim() == "") {
        validate = false;
        setRegionalSalesPriceClassErr(true);
      }
      else {
        setRegionalSalesPriceClassErr(false);
      }
      if (!validate) {
        return;
      }

      await addRegionalSalesSegment(currentRegionalSalesSegmentId, vehicleSalesRegion, regionalSalesSegment, regionalSalesSubSegment, regionalSalesPriceClass, architecture, bodyType, description, tonsDividedByLoadVolume, oah, oal, oalMax, oalMin, parameters, wis).then(res => {
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
        size="lg"
        className="main-class lg2"
      >
        <Modal.Header closeButton>
          {currentRegionalSalesSegmentId == null || currentRegionalSalesSegmentId == 0 ? <Modal.Title>Add Regional Sales Segment</Modal.Title> : <Modal.Title>Update Regional Sales Segment</Modal.Title>}
        </Modal.Header>
        <Form onSubmit={SaveRegionalSalesSegment}>
          <Modal.Body>
            <div className="row">
              <Form.Group className="mb-3 col-md-4">
                <Form.Label className="mb-1">Vehicle Sales Region</Form.Label>
                <Form.Control type="text" autoComplete="off" name="vehicleSalesRegion" id="vehicleSalesRegion"
                  value={vehicleSalesRegion} disabled={currentRegionalSalesSegmentId == null || currentRegionalSalesSegmentId == 0 ? false : true} onChange={VehicleSalesRegionHandler} />{vehicleSalesRegionErr ? <span style={{ color: 'red' }}>Please enter vehicle sales region</span> : null}
              </Form.Group>

              <Form.Group className="mb-3 col-md-4">
                <Form.Label className="mb-1">Regional Sales Segment</Form.Label>
                <Form.Control type="text" autoComplete="off" name="regionalSalesSegment" id="regionalSalesSegment"
                  value={regionalSalesSegment} disabled={currentRegionalSalesSegmentId == null || currentRegionalSalesSegmentId == 0 ? false : true} onChange={RegionalSalesSegmentHandler} />{regionalSalesSegmentErr ? <span style={{ color: 'red' }}>Please enter regional sales segment</span> : null}
              </Form.Group>

              <Form.Group className="mb-3 col-md-4">
                <Form.Label className="mb-1">Regional Sales Sub Segment</Form.Label>
                <Form.Control type="text" autoComplete="off" name="regionalSalesSubSegment" id="regionalSalesSubSegment"
                  value={regionalSalesSubSegment} disabled={currentRegionalSalesSegmentId == null || currentRegionalSalesSegmentId == 0 ? false : true} onChange={RegionalSalesSubSegmentHandler} />{regionalSalesSubSegmentErr ? <span style={{ color: 'red' }}>Please enter regional sales sub segment</span> : null}
              </Form.Group>

              <Form.Group className="mb-3 col-md-4">
                <Form.Label className="mb-1">Regional Sales Price Class</Form.Label>
                <Form.Control type="text" autoComplete="off" name="regionalSalesPriceClass" id="regionalSalesPriceClass"
                  value={regionalSalesPriceClass} disabled={currentRegionalSalesSegmentId == null || currentRegionalSalesSegmentId == 0 ? false : true} onChange={RegionalSalesPriceClassHandler} />{regionalSalesPriceClassErr ? <span style={{ color: 'red' }}>Please enter regional sales price class</span> : null}
              </Form.Group>

              <Form.Group className="mb-3 col-md-4">
                <Form.Label className="mb-1">Architecture</Form.Label>
                <Form.Control type="text" autoComplete="off" name="architecture" id="architecture"
                  value={architecture} onChange={ArchitectureHandler} />{architectureErr ? <span style={{ color: 'red' }}>Please enter architecture</span> : null}
              </Form.Group>

              <Form.Group className="mb-3 col-md-4">
                <Form.Label className="mb-1">Body Type</Form.Label>
                <Form.Control type="text" autoComplete="off" name="bodyType" id="bodyType"
                  value={bodyType} onChange={BodyTypeHandler} />{bodyTypeErr ? <span style={{ color: 'red' }}>Please enter body type</span> : null}
              </Form.Group>

              <Form.Group className="mb-3 col-md-4">
                <Form.Label className="mb-1">Tons Divided By Load Volume</Form.Label>
                <Form.Control type="text" autoComplete="off" name="tonsDividedByLoadVolume" id="tonsDividedByLoadVolume"
                  value={tonsDividedByLoadVolume} onChange={TonsDividedByLoadVolumeHandler} />{tonsDividedByLoadVolumeErr ? <span style={{ color: 'red' }}>Please enter tons divided by load volume</span> : null}
              </Form.Group>

              <Form.Group className="mb-3 col-md-4">
                <Form.Label className="mb-1">Oah</Form.Label>
                <Form.Control type="text" autoComplete="off" name="oah" id="oah"
                  value={oah} onChange={OahHandler} />{oahErr ? <span style={{ color: 'red' }}>Please enter oah</span> : null}
              </Form.Group>

              <Form.Group className="mb-3 col-md-4">
                <Form.Label className="mb-1">Oal</Form.Label>
                <Form.Control type="text" autoComplete="off" name="oal" id="oal"
                  value={oal} onChange={OalHandler} />{oalErr ? <span style={{ color: 'red' }}>Please enter oal</span> : null}
              </Form.Group>

              <Form.Group className="mb-3 col-md-4">
                <Form.Label className="mb-1">Oal Max</Form.Label>
                <Form.Control type="text" autoComplete="off" name="oalMax" id="oalMax"
                  value={oalMax} onChange={OalMaxHandler} />{oalMaxErr ? <span style={{ color: 'red' }}>Please enter oalmax</span> : null}
              </Form.Group>

              <Form.Group className="mb-3 col-md-4">
                <Form.Label className="mb-1">Oal Min</Form.Label>
                <Form.Control type="text" autoComplete="off" name="oalMin" id="oalMin"
                  value={oalMin} onChange={OalMinHandler} />{oalMinErr ? <span style={{ color: 'red' }}>Please enter oalmin</span> : null}
              </Form.Group>

              <Form.Group className="mb-3 col-md-4">
                <Form.Label className="mb-1">Parameters</Form.Label>
                <Form.Control type="text" autoComplete="off" name="parameters" id="parameters"
                  value={parameters} onChange={ParametersHandler} />{parametersErr ? <span style={{ color: 'red' }}>Please enter parameters</span> : null}
              </Form.Group>

              <Form.Group className="mb-3 col-md-4">
                <Form.Label className="mb-1">Wis</Form.Label>
                <Form.Control type="text" autoComplete="off" name="wis" id="wis"
                  value={wis} onChange={WisHandler} />{wisErr ? <span style={{ color: 'red' }}>Please enter wis</span> : null}
              </Form.Group>
              <Form.Group className="mb-3 col-md-8">
                <Form.Label className="mb-1">Description</Form.Label>
                <Form.Control type="text" autoComplete="off" name="description" id="description"
                  as="textarea" value={description} onChange={(e) => { setDescription(e.target.value) }}
                  style={{ height: '100px' }}
                />
              </Form.Group>
            </div>
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