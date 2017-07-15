/**
 * Created by admin on 2017/6/1.
 */ 
import React from 'react';
import ReactDom from 'react-dom';
import Component1 from './components/productBox.jsx';
import PhotoReader from './PhotoReader.js';

require('../stylesheets/webgl.css'); // ‘ÿ»Î style.css

ReactDom.render(
    <Component1 />,
    document.getElementById('threeContainer')
);
