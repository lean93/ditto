import React from 'react'
import { notification, Icon } from 'antd'

notification.config({
  placement: 'bottomRight'
});

export const notifySuccess = (title, msg) => {
  notification.success({
      message: title,
      description: msg,
      style : { backgroundColor : 'greenyellow', color : 'black'}
  })
};

export const notifyError = (title, msg) => {
    notification.error({
        message: title,
        description: msg
    })
};

export const notifyWarning = (title, msg) => {
    notification.warning({
        message: title,
        description: msg,
        duration: 5,
        style : { backgroundColor : 'yellow', color : 'black'}
    })
};

export const notifyCritical = (title, msg) => {
  notification.error({
    message: title,
    description: msg,
    duration: 5,
    style : { backgroundColor : '#ff5b5b', color : 'white'}
  })
};

export const notifyForbiddem = (title, msg) => {
    notification.open({
      message: <b><i>{title}</i></b>,
      description: <b style ={{color:'white'}}>{msg}</b>,
      duration: 5,
      placement: 'topRight',
      style : { backgroundColor : '#F9A094'},
      icon: <Icon type="warning" style={{color:"#F1442C"}}/>
    })
  };