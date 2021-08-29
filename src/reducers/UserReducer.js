

const userInitialValues = {
    isLogin: localStorage.getItem('token') || false,
    serverErrors: {}
}

const UserReducer = (state = userInitialValues, action) => {
    switch(action.type){

        default : {
            return {...state}
        }
    }
    
}

export default UserReducer