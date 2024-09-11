import React, { useState, useRef, useEffect, useImperativeHandle, useCallback, ReactElement } from 'react';
import clsx from 'clsx';
import { IconButton, IconButtonProps } from '../IconButton';
import { Recorder, RecorderProps } from '../Recorder';
import { Toolbar, ToolbarItemProps } from '../Toolbar';
import { AccessoryWrap } from './AccessoryWrap';
import { Popover } from '../Popover';
import { InputProps } from '../Input';
import { ToolbarItem } from './ToolbarItem';
import { ComposerInput } from './ComposerInput';
import { SendButton } from './SendButton';
import { Action } from './Action';
import toggleClass from '../../utils/toggleClass';
import LeftAction from './LeftAction';

export const CLASS_NAME_FOCUSING = 'S--focusing';

export type InputType = 'voice' | 'text';

export type ComposerProps = {
  wideBreakpoint?: string;
  text?: string;
  textOnce?: string;
  inputOptions?: InputProps;
  placeholder?: string;
  inputType?: InputType;
  onInputTypeChange?: (inputType: InputType) => void;
  recorder?: RecorderProps;
  onSend: (type: string, content: string) => void;
  onImageSend?: (file: File) => Promise<any>;
  onFocus?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  onChange?: (value: string, event: React.ChangeEvent<Element>) => void;
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  toolbar?: ToolbarItemProps[];
  onToolbarClick?: (item: ToolbarItemProps, event: React.MouseEvent) => void;
  onAccessoryToggle?: (isAccessoryOpen: boolean) => void;
  rightAction?: IconButtonProps;
  LeftAction?: any;
  disableSend: boolean;
  btnColor: string;
  voiceToText?: any;
  voiceToTextProps?: any;
  handleRecording: () => void;
  recordingContent: any,
  recordingProps: any,
  isShowRecording?: boolean
  skipButton?:any,
  skipButtonProps?:any
};

export interface ComposerHandle {
  setText: (text: string) => void;
}

export const Composer = React.forwardRef<ComposerHandle, ComposerProps>((props, ref) => {
  const {
    text: initialText = '',
    textOnce: oTextOnce,
    inputType: initialInputType = 'text',
    wideBreakpoint,
    placeholder: oPlaceholder = '请输入...',
    recorder = {},
    onInputTypeChange,
    onFocus,
    onBlur,
    onChange,
    onSend,
    voiceToText: VoiceToText,
    voiceToTextProps,
    disableSend = false,
    onImageSend,
    onAccessoryToggle,
    toolbar = [],
    onToolbarClick,
    rightAction,
    // LeftAction,
    inputOptions,
    btnColor,
    // refreshLabel,
    handleRecording,
    recordingContent: RecordingContent,
    recordingProps,
    isShowRecording,
    skipButton:SkipButton,
    skipButtonProps
  } = props;


  const [text, setText] = useState(initialText);
  const [textOnce, setTextOnce] = useState('');
  const [placeholder, setPlaceholder] = useState(oPlaceholder);
  const [inputType, setInputType] = useState(initialInputType || 'text');
  const [isAccessoryOpen, setAccessoryOpen] = useState(false);
  const [accessoryContent, setAccessoryContent] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null!);
  const focused = useRef(false);
  const blurTimer = useRef<any>();
  const popoverTarget = useRef<any>();
  const isMountRef = useRef(false);
  const [isWide, setWide] = useState(false);

  useEffect(() => {
    const mq =
      wideBreakpoint && window.matchMedia
        ? window.matchMedia(`(min-width: ${wideBreakpoint})`)
        : false;

    function handleMq(e: MediaQueryListEvent) {
      setWide(e.matches);
    }

    setWide(mq && mq.matches);

    if (mq) {
      mq.addListener(handleMq);
    }
    return () => {
      if (mq) {
        mq.removeListener(handleMq);
      }
    };
  }, [wideBreakpoint]);

  useEffect(() => {
    toggleClass('S--wide', isWide);
    if (!isWide) {
      setAccessoryContent('');
    }
  }, [isWide]);

  useEffect(() => {
    if (isMountRef.current && onAccessoryToggle) {
      onAccessoryToggle(isAccessoryOpen);
    }
  }, [isAccessoryOpen, onAccessoryToggle]);

  useEffect(() => {
    if (oTextOnce) {
      setTextOnce(oTextOnce);
      setPlaceholder(oTextOnce);
    } else {
      setTextOnce('');
      setPlaceholder(oPlaceholder);
    }
  }, [oPlaceholder, oTextOnce]);

  useEffect(() => {
    isMountRef.current = true;
  }, []);

  useImperativeHandle(ref, () => ({
    setText,
  }));

  const handleInputTypeChange = useCallback(() => {
    const isVoice = inputType === 'voice';
    const nextType = isVoice ? 'text' : 'voice';
    setInputType(nextType);

    if (isVoice) {
      const input = inputRef.current;
      input.focus();
      // eslint-disable-next-line no-multi-assign
      input.selectionStart = input.selectionEnd = input.value.length;
    }
    if (onInputTypeChange) {
      onInputTypeChange(nextType);
    }
  }, [inputType, onInputTypeChange]);

  const handleInputFocus = useCallback(
    (e: React.FocusEvent<HTMLTextAreaElement>) => {
      clearTimeout(blurTimer.current);
      toggleClass(CLASS_NAME_FOCUSING, false);
      focused.current = true;

      if (onFocus) {
        onFocus(e);
      }
    },
    [onFocus],
  );

  const handleInputBlur = useCallback(
    (e: React.FocusEvent<HTMLTextAreaElement>) => {
      blurTimer.current = setTimeout(() => {
        toggleClass(CLASS_NAME_FOCUSING, false);
        focused.current = false;
      }, 0);

      if (onBlur) {
        onBlur(e);
      }
    },
    [onBlur],
  );

  const send = useCallback(() => {
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

  const handleInputKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (!e.shiftKey && e.keyCode === 13) {
        send();
        e.preventDefault();
      }
    },
    [send],
  );

  const handleTextChange = useCallback(
    (value: string, e: React.ChangeEvent) => {
      setText(value);

      if (onChange) {
        onChange(value, e);
      }
    },
    [onChange],
  );

  const handleSendBtnClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      send();
      e.preventDefault();
    },
    [send],
  );

  const handleAccessoryToggle = useCallback(() => {
    setAccessoryOpen(!isAccessoryOpen);
  }, [isAccessoryOpen]);

  const handleAccessoryBlur = useCallback(() => {
    setTimeout(() => {
      setAccessoryOpen(false);
      setAccessoryContent('');
    });
  }, []);

  const handleToolbarClick = useCallback(
    (item: ToolbarItemProps, e: React.MouseEvent) => {
      if (onToolbarClick) {
        onToolbarClick(item, e);
      }
      if (item.render) {
        popoverTarget.current = e.currentTarget;
        setAccessoryContent(item.render);
      }
    },
    [onToolbarClick],
  );

  const handlePopoverClose = useCallback(() => {
    setAccessoryContent('');
  }, []);

  const isInputText = inputType === 'text';
  const inputTypeIcon = isInputText ? 'volume-circle' : 'keyboard-circle';
  const hasToolbar = toolbar.length > 0;

  const inputProps = {
    ...inputOptions,
    value: text,
    inputRef,
    placeholder,
    onFocus: handleInputFocus,
    onBlur: handleInputBlur,
    onKeyDown: handleInputKeyDown,
    onChange: handleTextChange,
    onImageSend,
  };

  if (isWide) {
    return (
      <div className="Composer Composer--lg">
        {hasToolbar &&
          toolbar.map((item) => (
            <ToolbarItem item={item} onClick={(e) => handleToolbarClick(item, e)} key={item.type} />
          ))}
        {accessoryContent && (
          <Popover
            active={!!accessoryContent}
            target={popoverTarget.current}
            onClose={handlePopoverClose}
          >
            {accessoryContent}
          </Popover>
        )}
        <div>
          <div className="Composer-inputWrap" style={{ border: `2px solid ${btnColor}`, borderRadius: '12px' }}>
            <ComposerInput invisible={false} {...inputProps} disabled={disableSend} />
          </div>
          <SendButton btnColor={btnColor} onClick={handleSendBtnClick} disabled={!text || disableSend} />
        </div>
      </div>
    );
  }

  return (
 
    <>
   {skipButtonProps && SkipButton && <SkipButton {...skipButtonProps} setInputMsg={setText} />}
      <div className="Composer"
        style={{
          border: '2px solid #E8ECEF',
          backgroundColor: '#FFF',
          padding: '10px',
          margin: '10px 27px',
          borderRadius: "8px",
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {<RecordingContent {...recordingProps} setInputMsg={setText} />}

        {recorder.canRecord && (
          <Action
            className="Composer-inputTypeBtn"
            data-icon={inputTypeIcon}
            icon={inputTypeIcon}
            onClick={handleInputTypeChange}
            aria-label={isInputText ? 'Switch to voice input' : 'Switch to keyboard input'}
          />
        )}
        {!isShowRecording && <div className="Composer-inputWrap" >
          <ComposerInput invisible={!isInputText} {...inputProps} disabled={disableSend} />
          {!isInputText && <Recorder {...recorder} />}
        </div>}
        {!text && rightAction && <Action {...rightAction} />}
        {!isShowRecording && <button onClick={handleSendBtnClick} disabled={disableSend || !text} style={{ cursor: 'pointer', borderRadius: '8px', backgroundColor: '#2B4078', marginLeft: '8px', padding: '11px 10px' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M16.0001 25.3334V6.66675M16.0001 6.66675L6.66675 16.0001M16.0001 6.66675L25.3334 16.0001" stroke="#FEFEFE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>}
        {hasToolbar && (
          <Action
            className={clsx('Composer-toggleBtn', {
              active: isAccessoryOpen,
            })}
            icon="plus-circle"
            onClick={handleAccessoryToggle}
            aria-label={isAccessoryOpen ? 'Close Toolbar' : 'Expand Toolbar'}
          />
        )}
        {/* {(text || textOnce ) && <SendButton btnColor={btnColor} onClick={handleSendBtnClick} disabled={disableSend} />} */}
      </div>
      {isAccessoryOpen && (
        <AccessoryWrap onClickOutside={handleAccessoryBlur}>
          {accessoryContent || <Toolbar items={toolbar} onClick={handleToolbarClick} />}
        </AccessoryWrap>
      )}
    </>);
});
