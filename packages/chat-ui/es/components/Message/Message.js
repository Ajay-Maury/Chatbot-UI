import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["renderMessageContent"];
import React from 'react';
import clsx from 'clsx';
import { SystemMessage } from './SystemMessage';
import { Avatar } from '../Avatar';
import { Time } from '../Time';
import { Typing } from '../Typing';
var Message = function Message(props) {
  var _content$data, _content$data2, _content$data3, _content$data4, _content$data5;
  var _props$renderMessageC = props.renderMessageContent,
    renderMessageContent = _props$renderMessageC === void 0 ? function () {
      return null;
    } : _props$renderMessageC,
    msg = _objectWithoutProperties(props, _excluded);
  var type = msg.type,
    content = msg.content,
    _msg$user = msg.user,
    user = _msg$user === void 0 ? {} : _msg$user,
    id = msg._id,
    _msg$position = msg.position,
    position = _msg$position === void 0 ? 'left' : _msg$position,
    _msg$hasTime = msg.hasTime,
    hasTime = _msg$hasTime === void 0 ? true : _msg$hasTime,
    createdAt = msg.createdAt;
  var name = user.name;
  if (type === 'system') {
    return /*#__PURE__*/React.createElement(SystemMessage, {
      content: content.text,
      action: content.action
    });
  }
  var isRL = (content === null || content === void 0 || (_content$data = content.data) === null || _content$data === void 0 ? void 0 : _content$data.position) === 'right' || (content === null || content === void 0 || (_content$data2 = content.data) === null || _content$data2 === void 0 ? void 0 : _content$data2.position) === 'left';
  return /*#__PURE__*/React.createElement("div", {
    className: clsx('Message', position),
    "data-id": id,
    "data-type": type
  }, hasTime && createdAt && /*#__PURE__*/React.createElement("div", {
    className: "Message-meta"
  }, /*#__PURE__*/React.createElement(Time, {
    date: createdAt
  })), /*#__PURE__*/React.createElement("div", {
    className: "Message-main"
  }, isRL && content !== null && content !== void 0 && (_content$data3 = content.data) !== null && _content$data3 !== void 0 && (_content$data3 = _content$data3.user) !== null && _content$data3 !== void 0 && _content$data3.avatar ? /*#__PURE__*/React.createElement(Avatar, {
    src: content === null || content === void 0 || (_content$data4 = content.data) === null || _content$data4 === void 0 || (_content$data4 = _content$data4.user) === null || _content$data4 === void 0 ? void 0 : _content$data4.avatar,
    alt: 'profile',
    url: user === null || user === void 0 ? void 0 : user.url
  }) : /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: (content === null || content === void 0 || (_content$data5 = content.data) === null || _content$data5 === void 0 ? void 0 : _content$data5.position) === 'left' ? '40px' : ''
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "Message-inner"
  }, isRL && name && /*#__PURE__*/React.createElement("div", {
    className: "Message-author"
  }, name), /*#__PURE__*/React.createElement("div", {
    className: "Message-content",
    role: "alert",
    "aria-live": "assertive",
    "aria-atomic": "false"
  }, type === 'typing' ? /*#__PURE__*/React.createElement(Typing, null) : renderMessageContent(msg)))));
};
export default /*#__PURE__*/React.memo(Message);