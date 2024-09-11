"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var LeftAction = function LeftAction(_ref) {
  var handleRecording = _ref.handleRecording,
    startRecording = _ref.startRecording;
  var handleClick = function handleClick() {
    if (handleRecording) handleRecording();
    startRecording();
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      cursor: "pointer"
    },
    onClick: handleClick
  }, /*#__PURE__*/_react.default.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "54",
    height: "54",
    viewBox: "0 0 54 54",
    fill: "none"
  }, /*#__PURE__*/_react.default.createElement("rect", {
    width: "54",
    height: "54",
    rx: "8",
    fill: "#2B4078",
    "fill-opacity": "0.1"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "M27.0434 32.1838C28.0941 32.1805 29.1009 31.7586 29.84 31.0105C30.5791 30.2624 30.9886 29.2511 30.9796 28.2003V18.9363C30.9796 16.7628 29.2168 15 27.0434 15C24.8699 15 23.1071 16.7628 23.1071 18.9363V28.2003C23.0981 29.2511 23.5076 30.2624 24.2467 31.0105C24.9858 31.7586 25.9927 32.1805 27.0434 32.1838ZM24.7755 18.9846C24.7755 17.7314 25.7913 16.7167 27.0434 16.7167C28.2955 16.7167 29.3113 17.7314 29.3113 18.9846V28.2003C29.3113 29.4524 28.2955 30.4683 27.0434 30.4683C25.7913 30.4683 24.7755 29.4524 24.7755 28.2003V18.9846ZM34.0868 28.2003C34.0845 29.9204 33.4523 31.5819 32.3093 32.8678C31.1664 34.1548 29.5925 34.9782 27.8838 35.1841V38.1596C27.8838 38.6231 27.5069 39 27.0434 39C26.5799 39 26.2031 38.6231 26.2031 38.1596V35.2201C24.4886 35.0143 22.909 34.1851 21.7651 32.8903C20.6221 31.5966 19.9933 29.9272 20.0001 28.2004C20.0001 27.7358 20.3758 27.36 20.8393 27.36C21.3039 27.36 21.6796 27.7358 21.6796 28.2004C21.6796 30.1162 22.7022 31.887 24.3616 32.8454C26.0209 33.8038 28.066 33.8039 29.7254 32.8454C31.3848 31.8869 32.4073 30.1162 32.4073 28.2004C32.4073 27.7358 32.783 27.36 33.2477 27.36C33.7112 27.36 34.0868 27.7357 34.0868 28.2003Z",
    fill: "#2B3F79"
  })));
};
var _default = exports.default = LeftAction;