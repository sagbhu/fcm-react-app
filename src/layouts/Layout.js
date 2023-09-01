import '../assets/styles/App.css';
import Header from './Header';
import Footer from './Footer';
import { useLoading } from "../LoadingContext";
import Loader from '../components/Loader';
import React from 'react';
import { useNavigate, Route, Routes } from 'react-router-dom';
import { LoginCallback, Security } from '@okta/okta-react';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import FuelType from '../pages/fuelType/FuelType';
import EngineType from '../pages/engineType/EngineType';
import Segment from '../pages/segment/Segment';
import PropulsionSystem from '../pages/propulsionSystem/PropulsionSystem';
import RegistrationType from '../pages/registrationType/RegistrationType';
import SubSegment from '../pages/subSegment/SubSegment';
import CarCompanyCapiqMapping from '../pages/carCompanyCapiqMapping/CarCompanyCapiqMapping';
import MakeCarCompanyMapping from '../pages/makeCarCompanyMapping/MakeCarCompanyMapping';
import StrategicGroupBrandCapiqMapping from '../pages/strategicGroupBrandCapiqMapping/StrategicGroupBrandCapiqMapping';
import User from '../pages/user/User';
import NotificationSubscriber from '../pages/notification/NotificationSubscriber';
import Login from '../layouts/Login';
import PrivateRoute from '../routes/PrivateRoute';
import { Navigate } from 'react-router-dom';
import VehicleArchitecture from '../pages/vehicleArchitecture/VehicleArchitecture';
import VehicleCarTruck from '../pages/vehicleCarTruck/VehicleCarTruck';
import VehicleBodyType from '../pages/vehicleBodyType/VehicleBodyType';
import VehicleOffType from '../pages/vehicleOffType/VehicleOffType';
import ProductionType from '../pages/productionType/ProductionType';
import RegionalSalesSegment from '../pages/regionalSalesSegment/RegionalSalesSegment';
import GlobalSalesSegment from '../pages/globalSalesSegment/GlobalSalesSegment';
import Country from '../pages/country/Country';
import VehcleAssemblyType from '../pages/vehicleAssemblyType/VehicleAssemblyType';
import GlobalProductionSegment from '../pages/globalProductionSegment/GlobalProductionSegment';
import GlobalProductionSubSegment from '../pages/globalProductionSubSegment/GlobalProductionSubSegment';
import GlobalProductionPriceClass from '../pages/globalProductionPriceClass/GlobalProductionPriceClass';
import VehicleProductionLongTermRiskRating from '../pages/vehicleProductionLongTermRiskRating/VehicleProductionLongTermRiskRating';
import VehicleProductionShortTermRiskRating from '../pages/vehicleProductionShortTermRiskRating/VehicleProductionShortTermRiskRating';
import VehicleProductionBodyStyle from '../pages/vehicleProductionBodyStyle/VehicleProductionBodyStyle';
import EngineConfiguration from '../pages/engineConfiguration/EngineConfiguration';
import EngineFuelType from '../pages/engineFuelType/EngineFuelType';
import EngineLayout from '../pages/engineLayout/EngineLayout';
import EnginePlatform from '../pages/enginePlatform/EnginePlatform';
import EngineEmissionLevel from '../pages/engineEmissionLevel/EngineEmissionLevel';
import EnginePropulsionSystemDesign from '../pages/enginePropulsionSystemDesign/EnginePropulsionSystemDesign';
import VehicleGvwRating from '../pages/vehicleGvwRating/VehicleGvwRating';
import VehicleCabType from '../pages/vehicleCabType/VehicleCabType';
import RegionalSegment from '../pages/regionalSegment/RegionalSegment';
import AlternativePropulsionSystemSubDesignArchitecture from '../pages/alternativePropulsionSystemSubDesignArchitecture/AlternativePropulsionSystemSubDesignArchitecture';
import EngineAspiration from '../pages/engineAspiration/EngineAspiration';
import EngineFuelSystem from '../pages/engineFuelSystem/EngineFuelSystem';
import TransmissionDesign from '../pages/transmissionDesign/TransmissionDesign';
import AlternativePropulsionBatteryType from '../pages/alternativePropulsionBatteryType/AlternativePropulsionBatteryType';
import AlternativePropulsionPxDefinition from '../pages/alternativePropulsionPxDefinition/AlternativePropulsionPxDefinition';
import Alternativepropulsionsystemsubdesign from '../pages/alternativepropulsionsystemsubdesign/Alternativepropulsionsystemsubdesign';
import EngineValveActuationType from '../pages/engineValveActuationType/EngineValveActuationType';
import EngineValvesCyl from '../pages/engineValvesCyl/EngineValvesCyl';
import EngineCylinderDeactivation from '../pages/engineCylinderDeactivation/EngineCylinderDeactivation';
import EngineValvetrain from '../pages/engineValvetrain/EngineValvetrain';
import TransmissionPlatform from '../pages/transmissionPlatform/TransmissionPlatform';
import TransmissionDriveType from '../pages/transmissionDriveType/TransmissionDriveType';
import PropulsionSystemDesign from '../pages/propulsionSystemDesign/PropulsionSystemDesign';
import RegSalesSegment from '../pages/regSalesSegment/RegSalesSegment';
import { userLogin } from "../services/UserService";
import axios from "axios";

const oktaAuth = new OktaAuth({
  issuer: 'https://dev-29948533.okta.com/oauth2/default',
  clientId: '0oa9sclx8tGMS6ISb5d7',
  redirectUri: window.location.origin + '/login/result'
});

export default function Layout() {
  const { loading } = useLoading();
  const navigate = useNavigate();  
  
  const restoreOriginalUri = async (_oktaAuth, originalUri) => {    
    navigate(toRelativeUrl(originalUri, window.location.origin), { replace: true })
    localStorage.setItem('auth_token', _oktaAuth.authStateManager._authState.accessToken.accessToken);
    axios.defaults.headers.common = {'Authorization': localStorage.getItem('auth_token')}
    
    var response = await userLogin(_oktaAuth.authStateManager._authState.idToken.claims.name.split(" ").at(0), _oktaAuth.authStateManager._authState.idToken.claims.name.split(" ").at(1), _oktaAuth.authStateManager._authState.idToken.claims.email, _oktaAuth.authStateManager._authState.accessToken.accessToken)    
    localStorage.setItem('userDetail', JSON.stringify(response));
  };
  
  const onAuthRequired = function () {
    navigate('/login')
  }
  
  return (
    <>
      <Security oktaAuth={oktaAuth}
        restoreOriginalUri={restoreOriginalUri}
        onAuthRequired={onAuthRequired}>
        {loading && <Loader />}
        <Header />
        <main className="main-class">     
          <Routes>
            <Route path="/" exact={true} element={<Login />} />
            <Route path="/login" exact={true} element={<Login />} />
            <Route path="/login/result" exact={true} element={<LoginCallback />} />
            
            <Route path="/fuel-type" element={<PrivateRoute><FuelType /></PrivateRoute>} />
            <Route path="/engine-type" exact={true} element={<PrivateRoute><EngineType /></PrivateRoute>} />
            <Route path="/segment" exact={true} element={<PrivateRoute><Segment /></PrivateRoute>} />
            <Route path="/propulsion-system" exact={true} element={<PrivateRoute><PropulsionSystem /></PrivateRoute>} />
            <Route path="/registration-type" exact={true} element={<PrivateRoute><RegistrationType /></PrivateRoute>} />
            <Route path='/sub-segment' exact={true} element={<PrivateRoute><SubSegment /></PrivateRoute>} />
            <Route path='/car-company-capiq-mapping' exact={true} element={<PrivateRoute><CarCompanyCapiqMapping /></PrivateRoute>} />
            <Route path='/make-car-company-mapping' exact={true} element={<PrivateRoute><MakeCarCompanyMapping /></PrivateRoute>} />
            <Route path='/strategic-group-brand-capiq-mapping' exact={true} element={<PrivateRoute><StrategicGroupBrandCapiqMapping /></PrivateRoute>} />
            <Route path='/user' exact={true} element={<PrivateRoute><User /></PrivateRoute>} />
            <Route path='/notification' exact={true} element={<PrivateRoute><NotificationSubscriber /></PrivateRoute>} />
            <Route path='/vehicle-architecture' exact={true} element={<PrivateRoute><VehicleArchitecture /></PrivateRoute>} />
            <Route path='/vehicle-car-truck' exact={true} element={<PrivateRoute><VehicleCarTruck /></PrivateRoute>} />
            <Route path='/vehicle-body-type' exact={true} element={<PrivateRoute><VehicleBodyType /></PrivateRoute>} />
            <Route path='/vehicle-off-type' exact={true} element={<PrivateRoute><VehicleOffType /></PrivateRoute>} />
            <Route path='/production-type' exact={true} element={<PrivateRoute><ProductionType /></PrivateRoute>} />
            <Route path='/regional-sales-segment' exact={true} element={<PrivateRoute><RegionalSalesSegment /></PrivateRoute>} />
            <Route path='/global-sales-segment' exact={true} element={<PrivateRoute><GlobalSalesSegment /></PrivateRoute>} />
            <Route path='/country' exact={true} element={<PrivateRoute><Country /></PrivateRoute>} />
            <Route path='/vehicle-assembly-type' exact={true} element={<PrivateRoute><VehcleAssemblyType /></PrivateRoute>} />
            <Route path='/vehicle-production-body-style' exact={true} element={<PrivateRoute><VehicleProductionBodyStyle /></PrivateRoute>} />
            <Route path='/global-production-segment' exact={true} element={<PrivateRoute><GlobalProductionSegment /></PrivateRoute>} />
            <Route path='/global-production-sub-segment' exact={true} element={<PrivateRoute><GlobalProductionSubSegment /></PrivateRoute>} />
            <Route path='/global-production-price-class' exact={true} element={<PrivateRoute><GlobalProductionPriceClass /></PrivateRoute>} />
            <Route path='/vehicle-production-long-term-risk-rating' exact={true} element={<PrivateRoute><VehicleProductionLongTermRiskRating /></PrivateRoute>} />
            <Route path='/vehicle-production-short-term-risk-rating' exact={true} element={<PrivateRoute><VehicleProductionShortTermRiskRating /></PrivateRoute>} />
            <Route path='/engine_configuration' exact={true} element={<PrivateRoute><EngineConfiguration /></PrivateRoute>} />
            <Route path='/engine_aspirationt' exact={true} element={<PrivateRoute><EngineAspiration /></PrivateRoute>} />
            <Route path='/engine_fuel_system' exact={true} element={<PrivateRoute><EngineFuelSystem /></PrivateRoute>} />
            <Route path='/transmission_design' exact={true} element={<PrivateRoute><TransmissionDesign /></PrivateRoute>} />
            <Route path='/alternative_propulsion_battery_type' exact={true} element={<PrivateRoute><AlternativePropulsionBatteryType /></PrivateRoute>} />
            <Route path='/alternative_propulsion_px_definition' exact={true} element={<PrivateRoute><AlternativePropulsionPxDefinition /></PrivateRoute>} />
            <Route path='/alternative_propulsion_system_sub_design' exact={true} element={<PrivateRoute><Alternativepropulsionsystemsubdesign /></PrivateRoute>} />
            <Route path='/engine_valve_actuation_type' exact={true} element={<PrivateRoute><EngineValveActuationType /></PrivateRoute>} />
            <Route path='/engine_valves_cyl' exact={true} element={<PrivateRoute><EngineValvesCyl /></PrivateRoute>} />
            <Route path='/engine_cylinder_deactivation' exact={true} element={<PrivateRoute><EngineCylinderDeactivation /></PrivateRoute>} />
            <Route path='/engine_valvetrain' exact={true} element={<PrivateRoute><EngineValvetrain /></PrivateRoute>} />
            <Route path='/transmission_platform' exact={true} element={<PrivateRoute><TransmissionPlatform /></PrivateRoute>} />
            <Route path='/transmission_drive_type' exact={true} element={<PrivateRoute><TransmissionDriveType /></PrivateRoute>} />
            <Route path='/engine_configuration' exact={true} element={<PrivateRoute><EngineConfiguration /></PrivateRoute>} />
            <Route path='/engine_fuel_type' exact={true} element={<PrivateRoute><EngineFuelType /></PrivateRoute>} />
            <Route path='/engine_layout' exact={true} element={<PrivateRoute><EngineLayout /></PrivateRoute>} />
            <Route path='/engine_platform' exact={true} element={<PrivateRoute><EnginePlatform /></PrivateRoute>} />
            <Route path='/engine_emission_level' exact={true} element={<PrivateRoute><EngineEmissionLevel /></PrivateRoute>} />
            <Route path='/engine_propulsion_system_design' exact={true} element={<PrivateRoute><EnginePropulsionSystemDesign /></PrivateRoute>} />
            <Route path='/vehicle_gvw_rating' exact={true} element={<PrivateRoute><VehicleGvwRating /></PrivateRoute>} />
            <Route path='/vehicle_cab_type' exact={true} element={<PrivateRoute><VehicleCabType /></PrivateRoute>} />
            <Route path='/regional_segment' exact={true} element={<PrivateRoute><RegionalSegment /></PrivateRoute>} />
            <Route path='/alternative_propulsion_system_sub_design_architecture' exact={true} element={<PrivateRoute><AlternativePropulsionSystemSubDesignArchitecture /></PrivateRoute>} />
            <Route path='/propulsion_system_design' exact={true} element={<PrivateRoute><PropulsionSystemDesign /></PrivateRoute>} />
            <Route path='/reg-sales-segment' exact={true} element={<PrivateRoute><RegSalesSegment /></PrivateRoute>} />
            <Route path='*' element={<Navigate to="/login" />} />
          </Routes>
        </main>
        <Footer />
      </Security>
    </>
  );
}


