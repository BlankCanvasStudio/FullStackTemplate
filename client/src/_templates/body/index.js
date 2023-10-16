import * as React from 'react';
import { Outlet } from "react-router-dom";

import NavBar from '../../_components/navbar/navbar';
import ScrollTop from '../../_components/topbutton/topbutton';

import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { ScrollRestoration } from 'react-router-dom';

import './main.css';

class MainTemplatePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            recently_visited:[],
        }
    }

    render() {
        return (
            <div id="main" className="main-container">
                <ScrollRestoration />
                <NavBar recentlyVisited={this.state.recently_visited} />
                <div className="content-body" style={{backgroundColor:"#505378"}}>
                    <div id="back-to-top-anchor"></div>
                    <Outlet />
                    <ScrollTop>
                        <Fab size="small" aria-label="scroll back to top">
                            <KeyboardArrowUpIcon />
                        </Fab>
                    </ScrollTop>
                </div>
            </div>
        );
    }
}

export default MainTemplatePage;
