var React = require('react');
var ReactDom = require('react-dom');
var PhotoExplorer = require('./components/PhotoExplorer');
ReactDom.render(<PhotoExplorer serverIP="127.0.0.1" folder="D:/images" />,document.querySelector("#folderBrowser"));