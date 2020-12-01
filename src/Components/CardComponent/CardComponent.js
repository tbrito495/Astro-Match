import React, { useState, useEffect } from "react";
import axios from "axios"
import {DivButtons} from "./styled"
import Profile from "../Profile/Profile";
import Matches from "../Matches/Matches";
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from "@material-ui/core/CardActionArea";
import Button from "@material-ui/core/Button";

import {
    DivBody, 
   } from "./styled"

   const useStyles = makeStyles({
    root: {
      width: 450,
      minHeight:250,
    }
});

export default function CardComponent() {
    const [change,setChange] =useState(true)
    const [profile, setProfile] =useState([])
    const classes = useStyles();

    useEffect(()=>{
        getProfile()
    }, []);
    const getProfile = () => {
        axios
        .get("https://us-central1-missao-newton.cloudfunctions.net/astroMatch/Thiago/person")
        .then(response => {
            setProfile(response.data.profile)
        })
        .catch(error=>{
            console.log(error)
        })
    }
    
    const changePage = () =>{
        setChange(!change)
       }
    const deleteMatch = () =>{
        const body = {id:profile.id}
        axios.put("https://us-central1-missao-newton.cloudfunctions.net/astroMatch/Thiago/clear")
        .then(response =>{
            console.log(response)
        })
        .catch(error =>{
            console.log(error)
        })
    }

    return(
        <DivBody>
            <Card className={classes.root}>
                <DivButtons>
                <Button variant="contained" onClick={changePage}>Mudar Pagina</Button>
                <Button variant="contained" onClick={deleteMatch}>Limpar Matches</Button>
                </DivButtons>
            <CardActionArea>
                {change? <Profile/>: <Matches/>}
            </CardActionArea>
            </Card>
        </DivBody>

    )   

}

