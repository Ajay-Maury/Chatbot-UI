import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
import React, { useState, useRef, useEffect, useImperativeHandle, useCallback } from 'react';
import clsx from 'clsx';
import { Recorder } from '../Recorder';
import { Toolbar } from '../Toolbar';
import { AccessoryWrap } from './AccessoryWrap';
import { Popover } from '../Popover';
import { ToolbarItem } from './ToolbarItem';
import { ComposerInput } from './ComposerInput';
import { SendButton } from './SendButton';
import { Action } from './Action';
import toggleClass from '../../utils/toggleClass';
export var CLASS_NAME_FOCUSING = 'S--focusing';
export var Composer = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _props$text = props.text,
    initialText = _props$text === void 0 ? '' : _props$text,
    oTextOnce = props.textOnce,
    _props$inputType = props.inputType,
    initialInputType = _props$inputType === void 0 ? 'text' : _props$inputType,
    wideBreakpoint = props.wideBreakpoint,
    _props$placeholder = props.placeholder,
    oPlaceholder = _props$placeholder === void 0 ? '请输入...' : _props$placeholder,
    _props$recorder = props.recorder,
    recorder = _props$recorder === void 0 ? {} : _props$recorder,
    onInputTypeChange = props.onInputTypeChange,
    onFocus = props.onFocus,
    onBlur = props.onBlur,
    onChange = props.onChange,
    onSend = props.onSend,
    VoiceToText = props.voiceToText,
    voiceToTextProps = props.voiceToTextProps,
    _props$disableSend = props.disableSend,
    disableSend = _props$disableSend === void 0 ? false : _props$disableSend,
    onImageSend = props.onImageSend,
    onAccessoryToggle = props.onAccessoryToggle,
    _props$toolbar = props.toolbar,
    toolbar = _props$toolbar === void 0 ? [] : _props$toolbar,
    onToolbarClick = props.onToolbarClick,
    rightAction = props.rightAction,
    inputOptions = props.inputOptions,
    btnColor = props.btnColor,
    handleRecording = props.handleRecording,
    RecordingContent = props.recordingContent,
    recordingProps = props.recordingProps,
    isShowRecording = props.isShowRecording,
    SkipButton = props.skipButton,
    skipButtonProps = props.skipButtonProps;
  var _useState = useState(initialText),
    _useState2 = _slicedToArray(_useState, 2),
    text = _useState2[0],
    setText = _useState2[1];
  var _useState3 = useState(''),
    _useState4 = _slicedToArray(_useState3, 2),
    textOnce = _useState4[0],
    setTextOnce = _useState4[1];
  var _useState5 = useState(oPlaceholder),
    _useState6 = _slicedToArray(_useState5, 2),
    placeholder = _useState6[0],
    setPlaceholder = _useState6[1];
  var _useState7 = useState(initialInputType || 'text'),
    _useState8 = _slicedToArray(_useState7, 2),
    inputType = _useState8[0],
    setInputType = _useState8[1];
  var _useState9 = useState(false),
    _useState10 = _slicedToArray(_useState9, 2),
    isAccessoryOpen = _useState10[0],
    setAccessoryOpen = _useState10[1];
  var _useState11 = useState(''),
    _useState12 = _slicedToArray(_useState11, 2),
    accessoryContent = _useState12[0],
    setAccessoryContent = _useState12[1];
  var inputRef = useRef(null);
  var focused = useRef(false);
  var blurTimer = useRef();
  var popoverTarget = useRef();
  var isMountRef = useRef(false);
  var _useState13 = useState(false),
    _useState14 = _slicedToArray(_useState13, 2),
    isWide = _useState14[0],
    setWide = _useState14[1];
  useEffect(function () {
    var mq = wideBreakpoint && window.matchMedia ? window.matchMedia("(min-width: ".concat(wideBreakpoint, ")")) : false;
    function handleMq(e) {
      setWide(e.matches);
    }
    setWide(mq && mq.matches);
    if (mq) {
      mq.addListener(handleMq);
    }
    return function () {
      if (mq) {
        mq.removeListener(handleMq);
      }
    };
  }, [wideBreakpoint]);
  useEffect(function () {
    toggleClass('S--wide', isWide);
    if (!isWide) {
      setAccessoryContent('');
    }
  }, [isWide]);
  useEffect(function () {
    if (isMountRef.current && onAccessoryToggle) {
      onAccessoryToggle(isAccessoryOpen);
    }
  }, [isAccessoryOpen, onAccessoryToggle]);
  useEffect(function () {
    if (oTextOnce) {
      setTextOnce(oTextOnce);
      setPlaceholder(oTextOnce);
    } else {
      setTextOnce('');
      setPlaceholder(oPlaceholder);
    }
  }, [oPlaceholder, oTextOnce]);
  useEffect(function () {
    isMountRef.current = true;
  }, []);
  useImperativeHandle(ref, function () {
    return {
      setText: setText
    };
  });
  var handleInputTypeChange = useCallback(function () {
    var isVoice = inputType === 'voice';
    var nextType = isVoice ? 'text' : 'voice';
    setInputType(nextType);
    if (isVoice) {
      var input = inputRef.current;
      input.focus();
      // eslint-disable-next-line no-multi-assign
      input.selectionStart = input.selectionEnd = input.value.length;
    }
    if (onInputTypeChange) {
      onInputTypeChange(nextType);
    }
  }, [inputType, onInputTypeChange]);
  var handleInputFocus = useCallback(function (e) {
    clearTimeout(blurTimer.current);
    toggleClass(CLASS_NAME_FOCUSING, false);
    focused.current = true;
    if (onFocus) {
      onFocus(e);
    }
  }, [onFocus]);
  var handleInputBlur = useCallback(function (e) {
    blurTimer.current = setTimeout(function () {
      toggleClass(CLASS_NAME_FOCUSING, false);
      focused.current = false;
    }, 0);
    if (onBlur) {
      onBlur(e);
    }
  }, [onBlur]);
  var send = useCallback(function () {
    if (text) {
      onSend('text', text);
      setText('');
    } else if (textOnce) {
      onSend('text', textOnce);
    }
    if (textOnce) {
      setTextOnce('');
      setPlaceholder(oPlaceholder);
    }
    if (focused.current) {
      inputRef.current.focus();
    }
  }, [oPlaceholder, onSend, text, textOnce]);
  var handleInputKeyDown = useCallback(function (e) {
    if (!e.shiftKey && e.keyCode === 13) {
      send();
      e.preventDefault();
    }
  }, [send]);
  var handleTextChange = useCallback(function (value, e) {
    setText(value);
    if (onChange) {
      onChange(value, e);
    }
  }, [onChange]);
  var handleSendBtnClick = useCallback(function (e) {
    send();
    e.preventDefault();
  }, [send]);
  var handleAccessoryToggle = useCallback(function () {
    setAccessoryOpen(!isAccessoryOpen);
  }, [isAccessoryOpen]);
  var handleAccessoryBlur = useCallback(function () {
    setTimeout(function () {
      setAccessoryOpen(false);
      setAccessoryContent('');
    });
  }, []);
  var handleToolbarClick = useCallback(function (item, e) {
    if (onToolbarClick) {
      onToolbarClick(item, e);
    }
    if (item.render) {
      popoverTarget.current = e.currentTarget;
      setAccessoryContent(item.render);
    }
  }, [onToolbarClick]);
  var handlePopoverClose = useCallback(function () {
    setAccessoryContent('');
  }, []);
  var isInputText = inputType === 'text';
  var inputTypeIcon = isInputText ? 'volume-circle' : 'keyboard-circle';
  var hasToolbar = toolbar.length > 0;
  var inputProps = _objectSpread(_objectSpread({}, inputOptions), {}, {
    value: text,
    inputRef: inputRef,
    placeholder: placeholder,
    onFocus: handleInputFocus,
    onBlur: handleInputBlur,
    onKeyDown: handleInputKeyDown,
    onChange: handleTextChange,
    onImageSend: onImageSend
  });
  if (isWide) {
    return /*#__PURE__*/React.createElement("div", {
      className: "Composer Composer--lg"
    }, hasToolbar && toolbar.map(function (item) {
      return /*#__PURE__*/React.createElement(ToolbarItem, {
        item: item,
        onClick: function onClick(e) {
          return handleToolbarClick(item, e);
        },
        key: item.type
      });
    }), accessoryContent && /*#__PURE__*/React.createElement(Popover, {
      active: !!accessoryContent,
      target: popoverTarget.current,
      onClose: handlePopoverClose
    }, accessoryContent), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "Composer-inputWrap",
      style: {
        border: "2px solid ".concat(btnColor),
        borderRadius: '12px'
      }
    }, /*#__PURE__*/React.createElement(ComposerInput, _extends({
      invisible: false
    }, inputProps, {
      disabled: disableSend
    }))), /*#__PURE__*/React.createElement(SendButton, {
      btnColor: btnColor,
      onClick: handleSendBtnClick,
      disabled: !text || disableSend
    })));
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, skipButtonProps && SkipButton && /*#__PURE__*/React.createElement(SkipButton, _extends({}, skipButtonProps, {
    setInputMsg: setText
  })), /*#__PURE__*/React.createElement("div", {
    className: "Composer",
    style: {
      border: '2px solid #E8ECEF',
      backgroundColor: '#FFF',
      padding: '10px',
      margin: '10px 27px',
      borderRadius: "8px",
      display: 'flex',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(RecordingContent, _extends({}, recordingProps, {
    setInputMsg: setText
  })), recorder.canRecord && /*#__PURE__*/React.createElement(Action, {
    className: "Composer-inputTypeBtn",
    "data-icon": inputTypeIcon,
    icon: inputTypeIcon,
    onClick: handleInputTypeChange,
    "aria-label": isInputText ? 'Switch to voice input' : 'Switch to keyboard input'
  }), !isShowRecording && /*#__PURE__*/React.createElement("div", {
    className: "Composer-inputWrap"
  }, /*#__PURE__*/React.createElement(ComposerInput, _extends({
    invisible: !isInputText
  }, inputProps, {
    disabled: disableSend
  })), !isInputText && /*#__PURE__*/React.createElement(Recorder, recorder)), !text && rightAction && /*#__PURE__*/React.createElement(Action, rightAction), !isShowRecording && /*#__PURE__*/React.createElement("button", {
    onClick: handleSendBtnClick,
    disabled: disableSend || !text,
    style: {
      cursor: 'pointer',
      borderRadius: '8px',
      backgroundColor: '#2B4078',
      marginLeft: '8px',
      padding: '11px 10px'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "32",
    height: "32",
    viewBox: "0 0 32 32",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M16.0001 25.3334V6.66675M16.0001 6.66675L6.66675 16.0001M16.0001 6.66675L25.3334 16.0001",
    stroke: "#FEFEFE",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }))), hasToolbar && /*#__PURE__*/React.createElement(Action, {
    className: clsx('Composer-toggleBtn', {
      active: isAccessoryOpen
    }),
    icon: "plus-circle",
    onClick: handleAccessoryToggle,
    "aria-label": isAccessoryOpen ? 'Close Toolbar' : 'Expand Toolbar'
  })), isAccessoryOpen && /*#__PURE__*/React.createElement(AccessoryWrap, {
    onClickOutside: handleAccessoryBlur
  }, accessoryContent || /*#__PURE__*/React.createElement(Toolbar, {
    items: toolbar,
    onClick: handleToolbarClick
  })));
});