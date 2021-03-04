import React, {useEffect, useReducer} from 'react';
import PageHeader from '../../component/PageHeader';
import Container from '@material-ui/core/Container';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';
import TextBox from '../../component/TextBox';
import DateTimePicker from '../../component/DateTimePicker';
import Button from '../../component/Button';
import {get, put} from '../../services/UserService';
import{useUserContext} from '../../context/UserContext';
import ChangePassword from '../user/ChangePassword';
import {useDialogContext } from '../../context/DialogContext';
import {useToastContext} from '../../context/ToastDialogContext';
import {userScreenReducer} from '../../reducer/user/reducer';

export default function EditUser()
{
    let initialState = {
        Id: 0,
        Name: "",
        LastName: "",
        Borndate: new Date(1990, 1, 1),
        Email: "",
    }
    const [dialog, dispatchDialog, showModal] = useDialogContext();

    const [toast, dispatchToast, showToast] = useToastContext();

    const [state, dispatch] = useUserContext();

    const [values, screenDispatch] = useReducer(userScreenReducer, initialState);

    useEffect(() => {
      if(state !== null && state.User.Email !== ""){
        get(state.User.Email)
        .then(response => response.data)
        .then(res => {
            if(res !== null && res !== undefined){
              screenDispatch({Prop: 'Id', Payload: res.id});
              screenDispatch({Prop: 'Name', Payload: res.name});
              screenDispatch({Prop: 'LastName', Payload: res.lastName});
              screenDispatch({Prop: 'Email', Payload: res.email});
              screenDispatch({Prop: 'BornDate', Payload: res.bornDate});
            }
        });            
      }      
    },[screenDispatch]);

    let handleCloseToast = function(){
      showModal({load: true, show: false});
    }
      const handleChange = prop => event => {    
        screenDispatch({Prop: prop, Payload: event.target.value });
      };              

      const handleChangePassword = () =>{
        showModal({title: "Change Password", load: false, body: <ChangePassword />, show: true});
      }

      const handleSaveChanges = () =>{
        showModal({load: true, show: true});
        let data = {
            "id": 0,
            "name": values.Name,
            "lastName": values.LastName,
            "bornDate": values.BornDate,
            "email": values.Email,
        };
        let promisse = put(data);
        promisse.
        then(res=>{
          let result = res.data;          
          if(result.success){
            showToast({type: 'success', show: true, timems: 2000, title: 'User Changes', message: 'User data has been changed.', closeCallback: handleCloseToast});
          }else{
            showToast({type: 'error', show: true, timems: 3000, title: 'User Changes Error', message: result.error, closeCallback: handleCloseToast});
          }          
        })
        .catch(error => {
          showToast({type: 'error', show: true, timems: 5000, title: 'User Changes Error', message: error, closeCallback: handleCloseToast});
        });
      }

    return (           
        <Container>
            <PageHeader text="Edit User" icon={<EditIcon />}/> 
            <Grid container spacing={3}>
            <Grid item xs={12} sm={6} >          
              <TextBox id="Name" label="Name" onChange={handleChange("Name")} value={values.Name} fullWidth />
            </Grid>
            <Grid item xs={12} sm={6} >          
              <TextBox id="LastName" label="Last Name" onChange={handleChange("LastName")} value={values.LastName} fullWidth/>
            </Grid>            
            <Grid item xs={12} sm={6}>
              <TextBox id="Email" label="E-mail" onChange={handleChange("Email")} value={values.Email} fullWidth />
            </Grid>
            <Grid item xs={12} sm={6} >          
            <DateTimePicker value={values.BornDate} type="Date" label="Born Date" readyOnly={true}/>
            </Grid>                                                  
         </Grid>  
         <br />
         <div style={{textAlign: 'right'}}>
            <Button variant="contained" color="primary" onClick={handleChangePassword}>
              Change Password
            </Button>
            {"  "}
            <Button variant="contained" color="primary" onClick={handleSaveChanges}>
              Save Change
            </Button>
         </div>
        </Container>
    );
}