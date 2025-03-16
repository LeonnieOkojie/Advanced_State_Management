import { createContext, useReducer } from "react";

const NotificationContext = createContext();

const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'SHOW':
            return action.payload
        case 'HIDE':
            return ''
        default:
            return state
    }
}



export const NotificationContextProvider = ({children}) => {
    const [notification, dispatch] = useReducer(notificationReducer, '')

    return (
        <NotificationContext.Provider value={{notification, dispatch}}>
            {children}
        </NotificationContext.Provider>
    )
}

export default NotificationContext