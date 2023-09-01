import logo from '../assets/images/logo.svg';
import { Navbar, Badge, Nav, Form, NavDropdown, NavItem } from 'react-bootstrap';

import { Dropdown } from 'react-bootstrap';
import { ImUser, ImKey } from "react-icons/im";
import { AiOutlineLogout, AiOutlineUser } from 'react-icons/ai';
import { RxGear, RxStack } from 'react-icons/rx';
import { BsFileEarmarkText, BsFileEarmarkCode } from "react-icons/bs";
import { HiOutlineBellAlert } from "react-icons/hi2";
import { RiHome2Line } from "react-icons/ri";
import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';

export default function Header() {

  const { oktaAuth, authState } = useOktaAuth();
  const login = async () => {    
    await oktaAuth.signInWithRedirect();
  }
  const userName = oktaAuth?.authStateManager?._authState?.idToken?.claims?.name;
  const logout = async () => {    
    const basename = window.location.origin;
    await oktaAuth.signOut({ postLogoutRedirectUri: basename });
    localStorage.removeItem('auth_token');
  }
  
  return (
    authState?.isAuthenticated ?
      (<>
        <Navbar bg="light">
          <Navbar.Brand href="#home" style={{ marginLeft: '20px' }}>
            <img src={logo} width="150" height="40" className="d-inline-block align-top mt-2" alt="React Bootstrap logo" style={{ margin: '5px' }} />
          </Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
          </Navbar.Collapse>
          <Dropdown style={{ marginRight: "20px" }}>
            <Dropdown.Toggle variant="bg-primary" id="dropdown-basic" className='action-top' >
              <Badge bg="danger" className='img-cricle' >{userName?.split(" ").at(0).substring(0, 1) + userName?.split(" ").at(1).substring(0, 1)}</Badge>
              <span>{userName}</span>
            </Dropdown.Toggle>
            <Dropdown.Menu className="action-dropdown" style={{ marginLeft: "106px", marginTop: "0px", borderRadius: "inherit", fontSize: "13px" }}>
              {/* <Dropdown.Item href="#/action-1"><ImUser style={{ marginRight: "6px" }} /> Profile</Dropdown.Item>
            <Dropdown.Item href="#/action-2"><ImKey style={{ marginRight: "6px" }} /> Change Password</Dropdown.Item>
            <Dropdown.Divider /> */}
              <Dropdown.Item as={Link} onClick={logout}><AiOutlineLogout style={{ marginRight: "6px" }} /> Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar>

        <div className="container-fluid" style={{ padding: '0px' }}>
          <Navbar className="navbar-menu" variant="dark">
            <Link to={'/'} className='nav-link-dashboard'><RiHome2Line style={{ color: 'white', marginRight: '2px' }} /> Dashboard </Link>
            <Dropdown >
              <Dropdown.Toggle variant="bg-primary" className='action-top nav-dropdown-text navbar-dropdown-menu'>
                <RxGear style={{ marginRight: "6px" }} />Company Mapping
              </Dropdown.Toggle>
              <Dropdown.Menu className="action-dropdown" style={{ marginLeft: "91px", marginTop: '0px', borderRadius: "inherit", fontSize: "13px" }}>
                <Dropdown.Item as={Link} to="/car-company-capiq-mapping" style={{ padding: "8px" }}><BsFileEarmarkCode style={{ marginRight: "5px" }} />Car Company CAPIQ Mapping</Dropdown.Item>
                <Dropdown.Item as={Link} to="/make-car-company-mapping" style={{ padding: "8px" }}><BsFileEarmarkCode style={{ marginRight: "5px" }} />Make Car Company Mapping</Dropdown.Item>
                <Dropdown.Item as={Link} to="/strategic-group-brand-capiq-mapping" style={{ padding: "8px" }}><BsFileEarmarkCode style={{ marginRight: "5px" }} />Strategic Group Brand CAPIQ Mapping</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown >
              <Dropdown.Toggle variant="bg-primary" className='action-top nav-dropdown-text navbar-dropdown-menu'>
                <RxStack style={{ marginRight: "6px" }} />GADT Reference Data
              </Dropdown.Toggle>
              <Dropdown.Menu className="action-dropdown" style={{ marginLeft: "91px", marginTop: '0px', borderRadius: "inherit", fontSize: "13px" }}>
                <Dropdown.Item as={Link} to="/registration-type" style={{ padding: "8px" }}><BsFileEarmarkText style={{ marginRight: "5px" }} />Registration Type</Dropdown.Item>
                <Dropdown.Item as={Link} to="/segment" style={{ padding: "8px" }}><BsFileEarmarkText style={{ marginRight: "5px" }} />Segment</Dropdown.Item>
                <Dropdown.Item as={Link} to="/sub-segment" style={{ padding: "8px" }}><BsFileEarmarkText style={{ marginRight: "5px" }} />Sub Segment</Dropdown.Item>
                <Dropdown.Item as={Link} to="/propulsion-system" style={{ padding: "8px" }}><BsFileEarmarkText style={{ marginRight: "5px" }} />Propulsion System</Dropdown.Item>
                <Dropdown.Item as={Link} to="/engine-type" style={{ padding: "8px" }}><BsFileEarmarkText style={{ marginRight: "5px" }} />Engine Type</Dropdown.Item>
                <Dropdown.Item as={Link} to="/fuel-type" style={{ padding: "8px" }}><BsFileEarmarkText style={{ marginRight: "5px" }} />Fuel Type</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <ul className="nav navbar-nav">
              <Dropdown>
                <li>
                  <Dropdown.Toggle variant="bg-primary" className='action-top nav-dropdown-text navbar-dropdown-menu dropdown-toggle' data-toggle="dropdown">
                    <RxStack style={{ marginRight: "5px" }} />VF Reference Data
                  </Dropdown.Toggle>

                  <ul className="dropdown-menu  multi-column columns-3" style={{ marginTop: '0px', borderRadius: "inherit", fontSize: "13px" }}>
                    <div className="row">

                      <div className="col-xs-12" style={{ width: '20%' }}>
                        <ul className="multi-column-dropdown">
                          <div className="p-2 mb-1 pl-0 pr-0" style={{ backgroundColor: '#efefef', textAlign: 'center' }}>Global</div>
                          <li><Dropdown.Item as={Link} to="/country" style={{ padding: "8px" }}><BsFileEarmarkText style={{ marginRight: "5px" }} /> Country</Dropdown.Item></li>
                        </ul>
                      </div>

                      <div className="col-xs-12" style={{ width: '20%' }}>
                        <ul className="multi-column-dropdown">
                          <div className="p-2 mb-1 pl-0 pr-0" style={{ backgroundColor: '#efefef', textAlign: 'center' }}>Vehicle Forecast </div>
                          <li><Dropdown.Item as={Link} to="/vehicle-body-type" style={{ padding: "8px" }}><BsFileEarmarkText style={{ marginRight: "5px" }} />Vehicle Body Type</Dropdown.Item></li>
                          <li><Dropdown.Item as={Link} to="/vehicle-assembly-type" style={{ padding: "8px" }}><BsFileEarmarkText style={{ marginRight: "5px" }} />Vehicle Assembly Type</Dropdown.Item></li>
                          <li><Dropdown.Item as={Link} to="/global-production-segment" style={{ padding: "8px" }}><BsFileEarmarkText style={{ marginRight: "5px" }} />Global Production Segment</Dropdown.Item></li>
                          <li><Dropdown.Item as={Link} to="/Engine_configuration" style={{ padding: "8px" }}><BsFileEarmarkText style={{ marginRight: "5px" }} />Engine Configuration</Dropdown.Item></li>
                          <li><Dropdown.Item as={Link} to="/Engine_fuel_type" style={{ padding: "8px" }}><BsFileEarmarkText style={{ marginRight: "5px" }} />Engine Fuel Type</Dropdown.Item></li>
                          <li><Dropdown.Item as={Link} to="/Engine_layout" style={{ padding: "8px" }}><BsFileEarmarkText style={{ marginRight: "5px" }} />Engine Layout</Dropdown.Item></li>
                          <li><Dropdown.Item as={Link} to="/engine_aspirationt" style={{ padding: "8px" }}><BsFileEarmarkText style={{ marginRight: "5px" }} />Engine Aspiration</Dropdown.Item></li>
                          <li><Dropdown.Item as={Link} to="/engine_fuel_system" style={{ padding: "8px" }}><BsFileEarmarkText style={{ marginRight: "5px" }} />Engine Fuel System</Dropdown.Item></li>
                          <li><Dropdown.Item as={Link} to="/alternative_propulsion_battery_type" style={{ padding: "8px" }}><BsFileEarmarkText style={{ marginRight: "5px" }} />Alternative Propulsion Battery Type</Dropdown.Item></li>
                          <li><Dropdown.Item as={Link} to="/alternative_propulsion_px_definition" style={{ padding: "8px" }}><BsFileEarmarkText style={{ marginRight: "5px" }} />Alternative Propulsion Px Definition</Dropdown.Item></li>
                          <li><Dropdown.Item as={Link} to="/alternative_propulsion_system_sub_design" style={{ padding: "8px" }}><BsFileEarmarkText style={{ marginRight: "5px" }} />Alternative Propulsion System Sub Design</Dropdown.Item></li>
                        </ul>
                      </div>

                      <div className="col-xs-12" style={{ width: '40%' }}>
                        <ul className="multi-column-dropdown">
                          <div className="p-2 mb-1 pl-0 pr-0" style={{ backgroundColor: '#efefef', textAlign: 'center' }}>Light Vehicle Forecast</div>
                          <div className="row">
                            <div className=" col-md-6 col-xs-6 pr-0">
                              <ul className="multi-column-dropdown m-0 p-0">
                                <li><Dropdown.Item as={Link} to="/propulsion_system_design" style={{ padding: "8px" }}><BsFileEarmarkText style={{ marginRight: "5px" }} />Propulsion System Design</Dropdown.Item></li>
                                <li><Dropdown.Item as={Link} to="/vehicle-architecture" style={{ padding: "8px" }}><BsFileEarmarkText style={{ marginRight: "5px" }} />Vehicle Architecture</Dropdown.Item></li>
                                <li><Dropdown.Item as={Link} to="/vehicle-car-truck" style={{ padding: "8px" }}><BsFileEarmarkText style={{ marginRight: "5px" }} />Vehicle Car Truck</Dropdown.Item></li>
                                <li><Dropdown.Item as={Link} to="/global-Sales-Segment" style={{ padding: "8px" }}><BsFileEarmarkText style={{ marginRight: "5px" }} />Global Sales Segment</Dropdown.Item></li>
                                <li><Dropdown.Item as={Link} to="/regional-sales-segment" style={{ padding: "8px" }}><BsFileEarmarkText style={{ marginRight: "5px" }} />Regional Sales Segment</Dropdown.Item></li>
                                <li><Dropdown.Item as={Link} to="/vehicle-off-type" style={{ padding: "8px" }}><BsFileEarmarkText style={{ marginRight: "5px" }} />Vehicle Off Type</Dropdown.Item></li>
                                <li><Dropdown.Item as={Link} to="/production-type" style={{ padding: "8px" }}><BsFileEarmarkText style={{ marginRight: "5px" }} />Production Type</Dropdown.Item></li>
                                <li><Dropdown.Item as={Link} to="/vehicle-production-body-style" style={{ padding: "8px" }}><BsFileEarmarkText style={{ marginRight: "5px" }} />Vehicle Production Body Style</Dropdown.Item></li>
                                <li><Dropdown.Item as={Link} to="/global-production-sub-segment" style={{ padding: "8px" }}><BsFileEarmarkText style={{ marginRight: "5px" }} />Global Production Sub Segment</Dropdown.Item></li>
                                <li><Dropdown.Item as={Link} to="/global-production-price-class" style={{ padding: "8px" }}><BsFileEarmarkText style={{ marginRight: "5px" }} />Global Production Price Class</Dropdown.Item></li>
                                <li><Dropdown.Item as={Link} to="/vehicle-production-short-term-risk-rating" style={{ padding: "8px" }}><BsFileEarmarkText style={{ marginRight: "5px" }} />Vehicle Production Short Term Risk Rating</Dropdown.Item></li>
                              </ul>
                            </div>
                            <div className="col-md-6 col-xs-6 pl-0">
                              <ul className="multi-column-dropdown m-0 p-0">
                                <li><Dropdown.Item as={Link} to="/vehicle-production-long-term-risk-rating" style={{ padding: "8px" }}><BsFileEarmarkText style={{ marginRight: "5px" }} />Vehicle Production Long Term Risk Rating</Dropdown.Item></li>
                                <li><Dropdown.Item as={Link} to="/reg-sales-segment" style={{ padding: "8px" }}><BsFileEarmarkText style={{ marginRight: "5px" }} />Reg Sales Segment</Dropdown.Item></li>
                                <li><Dropdown.Item as={Link} to="/engine_valve_actuation_type" style={{ padding: "8px" }}><BsFileEarmarkText style={{ marginRight: "5px" }} />Engine Valve Actuation Type</Dropdown.Item></li>
                                <li><Dropdown.Item as={Link} to="/engine_valves_cyl" style={{ padding: "8px" }}><BsFileEarmarkText style={{ marginRight: "5px" }} />Engine Valves Cyl</Dropdown.Item></li>
                                <li><Dropdown.Item as={Link} to="/engine_valvetrain" style={{ padding: "8px" }}><BsFileEarmarkText style={{ marginRight: "5px" }} />Engine Valvetrain</Dropdown.Item></li>
                                <li><Dropdown.Item as={Link} to="/engine_cylinder_deactivation" style={{ padding: "8px" }}><BsFileEarmarkText style={{ marginRight: "5px" }} />Engine Cylinder Deactivation</Dropdown.Item></li>
                                <li><Dropdown.Item as={Link} to="/transmission_platform" style={{ padding: "8px" }}><BsFileEarmarkText style={{ marginRight: "5px" }} />Transmission Platform</Dropdown.Item></li>
                                <li><Dropdown.Item as={Link} to="/transmission_drive_type" style={{ padding: "8px" }}><BsFileEarmarkText style={{ marginRight: "5px" }} />Transmission Drive Type</Dropdown.Item></li>
                                <li><Dropdown.Item as={Link} to="/transmission_design" style={{ padding: "8px" }}><BsFileEarmarkText style={{ marginRight: "5px" }} />Transmission Design</Dropdown.Item></li>
                                <li><Dropdown.Item as={Link} to="/alternative_propulsion_system_sub_design_architecture" style={{ padding: "8px" }}><BsFileEarmarkText style={{ marginRight: "5px" }} />Alternative Propulsion System Sub Design Architecture</Dropdown.Item></li>
                              </ul>
                            </div>
                          </div>
                        </ul>
                      </div>

                      <div className=" col-xs-12" style={{ width: '20%' }}>
                        <ul className="multi-column-dropdown">
                          <div className="p-2 mb-1 pl-0 pr-0" style={{ backgroundColor: '#efefef', textAlign: 'center' }}>Medium Heavy Vehicle Forecast</div>
                          <li><Dropdown.Item as={Link} to="/vehicle_gvw_rating" style={{ padding: "8px" }}><BsFileEarmarkText style={{ marginRight: "5px" }} />Vehicle Gvw Rating</Dropdown.Item></li>
                          <li><Dropdown.Item as={Link} to="/vehicle_cab_type" style={{ padding: "8px" }}><BsFileEarmarkText style={{ marginRight: "5px" }} />Vehicle Cab Type</Dropdown.Item></li>
                          <li><Dropdown.Item as={Link} to="/regional_segment" style={{ padding: "8px" }}><BsFileEarmarkText style={{ marginRight: "5px" }} />Regional Segment</Dropdown.Item></li>
                          <li><Dropdown.Item as={Link} to="/engine_propulsion_system_design" style={{ padding: "8px" }}><BsFileEarmarkText style={{ marginRight: "5px" }} />Engine Propulsion System Design</Dropdown.Item></li>
                          <li><Dropdown.Item as={Link} to="/engine_platform" style={{ padding: "8px" }}><BsFileEarmarkText style={{ marginRight: "5px" }} />Engine Platform</Dropdown.Item></li>
                          <li><Dropdown.Item as={Link} to="/engine_emission_level" style={{ padding: "8px" }}><BsFileEarmarkText style={{ marginRight: "5px" }} />Engine Emission Level</Dropdown.Item></li>
                        </ul>
                      </div>

                    </div>
                  </ul>
                </li>
              </Dropdown>
            </ul>

            <Link className='nav-link-class' to={'/user'} style={{ marginLeft: '15px', marginRight: '12px' }}><AiOutlineUser style={{ color: 'white', marginRight: '2px' }} /> User </Link>
            <Link className='nav-link-class' to={'/notification'} style={{ marginLeft: '11px', marginRight: '5px' }}><HiOutlineBellAlert style={{ color: 'white', marginRight: '2px' }} /> Notification Subscriber</Link></Navbar>
        </div>
      </>) : (<div>  </div>)
  );
}