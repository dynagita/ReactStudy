import React, { useReducer } from 'react';
import Grid from '@material-ui/core/Grid'
import Button from '../../component/Button';
import TextBox from '../../component/TextBox';
import {passwordIsValid} from '../../rules/RegisterRules';
import {reducer} from '../../reducer/user/reducer';
import { useDialogContext } from '../../context/DialogContext';
import { DialogActions } from "@material-ui/core";
import {changePassword} from "../../services/UserService";
import { useUserContext } from '../../context/UserContext';
import { useToastContext } from '../../context/ToastDialogContext';
import Load from '../../component/Load';

export default function ChangePassword(){    
   
    const initialState ={
        Password: '',
        ConfirmPassword: '',
        PasswordError: '',
        ShowLoad: true
    }    

    const [screenState, dispatch] = useReducer(reducer,initialState);   

    const [userState, userDispatch] = useUserContext();

    const [dialog, dispatchDialog, showModal] = useDialogContext();

    const [toastState, toastDispatch, showToast] = useToastContext();

    const handleChange = prop => e => {
        let value = e.target.value;

        if(prop === "confirmpassword"){
            passwordIsValid(screenState.Password, value, dispatch);
        }

        dispatch({Type: prop, Payload: value});
    };

    function closeModal(){
      showModal({open: false})
    }

    function handleChangePasswordClick(){
        dispatch({Type: "showload", Payload: false});
        
        let user = {
            Password: screenState.Password,
            ConfirmPassword: screenState.ConfirmPassword,
            Email: userState.User.Email
        };        

        let promisse = changePassword(user);
        promisse.then(res => {
            let result = res.data;
            if(result.success)
            {
                showToast({type: 'success', show: true, timems: 2000, title: 'Change Password Successfull', message: 'Password has been changed.', closeCallback: closeModal});
                dispatch({Type: "showload", Payload: true});
            }else{
                showToast({type: 'error', show: true, timems: 3000, title: 'Change Password Error', message: result.error});
                dispatch({Type: "showload", Payload: true});
            }
        })
        .catch(error =>{
            showToast({type: 'error', show: true, timems: 3000, title: 'Change Password Error', message: "Not expected error has ocurred. Try again, if errors persist contact support."});
            dispatch({Type: "showload", Payload: true});
        });
    }

    return(        
        <div>
            <div  hidden={!screenState.ShowLoad}>
                <Grid container spacing={3}>
                    <Grid item xs={12} >
                        <TextBox value={screenState.Password} 
                        label={"New Password"} 
                        onChange={handleChange("password")}  
                        fullWidth={true} 
                        type="password"/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextBox value={screenState.ConfirmPassword} 
                        label={"Confirm Password"} 
                        onChange={handleChange("confirmpassword")}
                        fullWidth={true} 
                        type="password"
                        error={screenState.PasswordError !== ""}
                        helperText={screenState.PasswordError}/>
                    </Grid>            
                </Grid>
                <DialogActions>
                    <Button color="primary" onClick={closeModal}>
                        Close
                    </Button>         
                    {"  "}
                    <Button color="primary" onClick={handleChangePasswordClick}>
                        Change Password
                    </Button>
                </DialogActions>
            </div>
            <div  hidden={screenState.ShowLoad}>
                <Load />
            </div>
        </div>
    );

}