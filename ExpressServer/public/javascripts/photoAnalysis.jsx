var React = require('react');
var ReactDom = require('react-dom');
var PhotoExplorer = require('../components/PhotoExplorer.jsx');
require("../components/css/PhotoExplorer.css"); // 载入 style.css
ReactDom.render(<PhotoExplorer serverIP="127.0.0.1:3000" folder="E:/images" />,document.querySelector("#folderBrowser"));