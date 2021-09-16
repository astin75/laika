import React, { Component } from 'react'
import { NotificationsProvider } from '@mantine/notifications';
import Route from './route'
import './assets/sass/style.scss'

export const App = () => {
    return (
        <React.Fragment>
            <NotificationsProvider>
            <Route />
            </NotificationsProvider>
        </React.Fragment>
    );
};

