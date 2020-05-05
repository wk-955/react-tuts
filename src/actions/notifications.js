import actionTypes from './actionTypes'
import { getNotifications } from '../requests'


const startNotificationPost = () => {
    return {
        type: actionTypes.START_NOTIFICATION_POST
    }
}


const finishNotificationPost = () => {
    return {
        type: actionTypes.FINISH_NOTIFICATION_POST
    }
}

export const getNotificationList = () => {
    return dispatch => {
        dispatch(startNotificationPost())
        getNotifications()
            .then(resp => {
                dispatch({
                    type: actionTypes.RECEIVE_NOTIFICATIONS,
                    payload: {
                        list: resp.list
                    }
                })
                dispatch(finishNotificationPost())
            })
        
    }
}

export const markNotificationAsRead = (id) => {
    return dispatch => {
        dispatch(startNotificationPost())
        setTimeout (() => {
            dispatch({
                type: actionTypes.MARK_NOTIFICATION_AS_READ,
                payload: {
                    id
                }
            })
            dispatch(finishNotificationPost())
        }, 1000)
    }
}

export const markAllNotificationsAsRead = () => {
    return dispatch => {
        dispatch(startNotificationPost())
        setTimeout (() => {
            dispatch({
                type: actionTypes.MARK_ALL_NOTIFICATIONS_AS_READ,
            })
            dispatch(finishNotificationPost())
        }, 1000)
        
    }
}