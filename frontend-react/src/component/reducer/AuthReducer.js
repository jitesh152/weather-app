export const authUserInitial = {userdata:'', isAuth: false};

export const authReducer = ( state, action ) => {

    switch ( action.type ) {

        case 'update' : return action.payload;
        case 'reset' : return authUserInitial;
        default : return state;
    }

}