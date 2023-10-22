import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Edit } from '@material-ui/icons';
import { Button, Typography } from '@material-ui/core';
import { WebSocketConnection } from 'src/services/web-socket/web-socket';
import { CardWidget } from 'src/components/share/card-widget';
import { environment } from '../../../../environments/environment';
import { useStyle } from './people-counter.style';
import { PeopleCounterProps } from './people-counter.props';

const PeopleCounter: React.FC<PeopleCounterProps> = ({
  title,
  setTitle,
  setFullHeight,
  setMenuItems,
}) => {
  const classes = useStyle();
  const { t } = useTranslation();

  const [ isSocketConnected, setIsSocketConnected ] = useState(false);
  const [ socketInstance, setSocketInstance ] = useState(null);
  const [ branchConfig, setBranchConfig ] = useState({ max: '-', current: '-' });
  const [ branchConfigTemp, setBranchConfigTemp ] = useState(undefined);
  const [ contentEditable, setContentEditable ] = useState(false);

  useEffect(() => {
    if (isSocketConnected) return;
    setSocketInstance(
        new WebSocketConnection<any>({ baseURL: environment.socketAddress })
    );

    setBranchConfig({ max: '50', current: '2' });
  }, []);

  useEffect(() => {
    setTitle(!title ? 'people.widgetTitle' : title);
    setFullHeight(true);
    setMenuItems([
      {
        clickHandler: handleEditMode,
        icon: Edit,
        label: 'widget.edit',
      },
    ]);
  }, []);

  /** Set Branch Config After Each Change For Temp Value  **/
  useEffect(() => {
    setBranchConfigTemp(branchConfig);
  }, [branchConfig]);

  /** Listen To Socket After Socket Instance Create **/
  useEffect(() => {
    if (socketInstance !== null) {
      socketInstance.onSocketOpened(() => {
        setIsSocketConnected(true);
      });

      socketInstance.onSocketMessage((res: any) => {
        const log = JSON.parse(res.data).message;
      });
    }
  }, [socketInstance]);

  /** Emit Message On Socket Channel When Connect **/
  useEffect(() => {
    if (isSocketConnected) {
      socketInstance.emitSocketMessage({ message: 'Kooft' });
    }
  }, [isSocketConnected]);

  /** Select All Text Inside of HTML Element **/
  const selectAllValue = () => {
    if (!contentEditable) return;
    document.execCommand('selectAll', false, null);
  };

  /**
   * Update Cursor Position When Typing in EditableContent
   * @param {Object} tag
   * @param {number} offset
   */
  const updateCursorPosition = (tag: any, offset: number) => {
    const setPos: any = document.createRange();
    const set: any = window.getSelection();
    setPos.setStart(tag.childNodes[0], offset);
    setPos.collapse(true);
    set.removeAllRanges();
    set.addRange(setPos);
    tag.focus();
  };

  /** Change Editable Mode **/
  const handleEditMode = () => {
    setContentEditable(true);
  };

  /**
   * Update Current Value View When EditableMode is Active
   * @param {Object} event
   */
  const handleChangeCurrentValue = (event: any) => {
    const PrevCurrentValue: string = event.target.textContent;
    const Regex: RegExp = new RegExp('^[0-9]+$');
    if (Regex.test(PrevCurrentValue) || PrevCurrentValue === '') {
      event.target.innerText = PrevCurrentValue;
    } else {
      event.target.innerText = 0;
    }
    setBranchConfigTemp({
      current: event.target.innerText,
      max: branchConfigTemp.max,
    });
    if (event.target.innerText.length > 0) {
      updateCursorPosition(event.target, event.target.innerText.length);
    }
  };

  /**
   * Update Max Value View When EditableMode is Active
   * @param {Object} event
   */
  const handleChangeMaxValue = (event: any) => {
    const PrevCurrentValue: string = event.target.textContent;
    const Regex: RegExp = new RegExp('^[0-9]+$');
    if (Regex.test(PrevCurrentValue) || PrevCurrentValue === '') {
      event.target.innerText = PrevCurrentValue;
    } else {
      event.target.innerText = 0;
    }
    setBranchConfigTemp({
      current: branchConfigTemp.current,
      max: event.target.innerText,
    });
    if (event.target.innerText.length > 0) {
      updateCursorPosition(event.target, event.target.innerText.length);
    }
  };

  /** Call API To Save Config **/
  const saveConfig = () => {
    setContentEditable(false);
    setBranchConfig(branchConfigTemp);
  };

  return (
    <>
      <div className={classes.wrapper}>
        <Typography
          suppressContentEditableWarning={true}
          contentEditable={contentEditable}
          className={classes.variable}
          onClick={selectAllValue}
          onInput={handleChangeCurrentValue}
          data-type="variable"
          component="p"
        >
          {branchConfig.current}
        </Typography>
        <span className={classes.constant}> /</span>
        <Typography
          suppressContentEditableWarning={true}
          contentEditable={contentEditable}
          className={classes.constant}
          onClick={selectAllValue}
          onInput={handleChangeMaxValue}
          data-type="const"
          component="p"
        >
          {branchConfig.max}
        </Typography>
      </div>
      {contentEditable && (
        <div className={classes.editFooter}>
          <Button
            variant="contained"
            size="medium"
            color="primary"
            onClick={saveConfig}
          >
            { t('people.saveBtn') }
          </Button>
        </div>
      )}
    </>
  );
};

const Wrapper = CardWidget<PeopleCounterProps>(PeopleCounter, {
  centerContent: true,
  breakPoints: {
    lg: {
      x: 0,
      y: 0,
      w: 6,
      h: 10,
      minW: 6,
      minH: 10,
    },
    md: {
      x: 0,
      y: 0,
      w: 6,
      h: 5,
      minW: 6,
      minH: 5,
    },
    sm: {
      x: 0,
      y: 0,
      w: 3,
      h: 5,
      minW: 2,
      minH: 5,
    },
    xs: {
      x: 0,
      y: 0,
      w: 12,
      h: 5,
      minW: 1,
      minH: 5,
    },
    xxs: {
      x: 0,
      y: 0,
      w: 12,
      h: 5,
      minW: 1,
      minH: 5,
    },
  },
});

export { Wrapper as PeopleCounter };
