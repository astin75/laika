import React, { Component } from 'react';
import Route from './route';
import './assets/sass/style.scss';
import { RecoilRoot } from 'recoil';

export const App = () => {
  return (
    <RecoilRoot>
      <React.Fragment>
        <Route />
      </React.Fragment>
    </RecoilRoot>
  );
};
