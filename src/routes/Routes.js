import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FuelType from '../pages/fuelType/FuelType';
import EngineType from '../pages/engineType/EngineType';
import Segment from '../pages/segment/Segment';
import PropulsionSystem from '../pages/propulsionSystem/PropulsionSystem';
import RegistrationType from '../pages/registrationType/RegistrationType';
import SubSegment from '../pages/subSegment/SubSegment';
import CarCompanyCapiqMapping from '../pages/carCompanyCapiqMapping/CarCompanyCapiqMapping';
import MakeCarCompanyMapping from '../pages/makeCarCompanyMapping/MakeCarCompanyMapping';
import User from '../pages/user/User';

import { LoginCallback } from '@okta/okta-react';
import { SecureRoute } from '@okta/okta-react';
import Login from '../layouts/Login';
import React from 'react';

export default function AppRoutes() {
  return (
    <div className="container-fluid" style={{ padding: '0px', backgroundColor: '#f5f5f5' }}>
    </div>
  );
}



