import actionTypes from '../actions/actionTypes'

const initState = {
    isLoading: false,
    list: [{
        id: 1,
        title: '消息1',
        desc: '消息1:111111111111111111111111111',
        hasRead: false
    },{
        id: 2,
        title: '消息2',
        desc: '消息2:222222222222222222222222222',
        hasRead: false
    }]
}


export default (state = initState, action) => {
    switch(action.type) {
        case actionTypes.RECEIVE_NOTIFICATIONS:
            return {
                ...state,
                list: action.payload.list
            }
        case actionTypes.START_NOTIFICATION_POST:
            return {
                ...state,
                isLoading: true
            }
        case actionTypes.FINISH_NOTIFICATION_POST:
            return {
                ...state,
                isLoading: false
            }
        case actionTypes.MARK_NOTIFICATION_AS_READ:
            const newList = state.list.map(item => {
                if (item.id === action.payload.id) {
                    item.hasRead = true
                }
                return item
            })
            return {
                ...state,
                list: newList
            }
        case actionTypes.MARK_ALL_NOTIFICATIONS_AS_READ:
            return {
                ...state,
                list: state.list.map(item => {
                    item.hasRead = true
                    return item
                })
            }
        default:
            return state
    }
}

