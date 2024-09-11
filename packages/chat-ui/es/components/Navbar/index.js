import _extends from "@babel/runtime/helpers/esm/extends";
import React from 'react';
import clsx from 'clsx';
import { IconButton } from '../IconButton';
export var Navbar = function Navbar(props) {
  var className = props.className,
    title = props.title,
    logo = props.logo,
    leftContent = props.leftContent,
    rightContent = props.rightContent;
  return /*#__PURE__*/React.createElement("header", {
    className: clsx('Navbar', className)
  }, /*#__PURE__*/React.createElement("div", {
    className: "Navbar-left"
  }, leftContent && /*#__PURE__*/React.createElement(IconButton, _extends({
    size: "lg"
  }, leftContent))), /*#__PURE__*/React.createElement("div", {
    className: "Navbar-main"
  }, logo ? /*#__PURE__*/React.createElement("img", {
    className: "Navbar-logo",
    src: logo,
    alt: title
  }) : /*#__PURE__*/React.createElement("h2", {
    className: "Navbar-title"
  }, title)), /*#__PURE__*/React.createElement("div", {
    className: "Navbar-right"
  }, rightContent && /*#__PURE__*/React.createElement(IconButton, _extends({
    size: "lg"
  }, rightContent))));
};