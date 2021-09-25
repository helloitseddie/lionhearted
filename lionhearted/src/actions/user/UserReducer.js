export const currentUser = (state = {}, action) => {
    switch(action.type){
        case "SET_USER":
            return {
                ...state,
                user: action.payload,
                loggedIn: true
            }
        default:
            return state
    }
}
