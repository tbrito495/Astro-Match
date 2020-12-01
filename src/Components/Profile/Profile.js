import React, { useState, useEffect } from "react";
import axios from "axios"
import {DivProfile,
        DivImage,
        DivButtons
} from "./Styled"
import {makeStyles} from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from '@material-ui/core/CardContent';
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from '@material-ui/icons/Favorite';
import ClearIcon from '@material-ui/icons/Clear';


const useStyles = makeStyles({
    media:{minHeight:600,
        minWidth:450   
   },
    root:{
    minHeight:100
}
});

export default function Profile() {
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
    const choosePerson = () =>{
        const body = {id:profile.id, choice: true}
        axios
        .post("https://us-central1-missao-newton.cloudfunctions.net/astroMatch/Thiago/choose-person",body)
        .then(response=>{
            console.log(response)
        })
        .catch(error =>{
            console.log(error)
        })
    }   
    const match = () =>{
        getProfile()
        choosePerson()
    }
    if(profile === null){
        return(
            <p>Loading</p>
        )
    }
  return (
    <DivProfile>
        <DivImage>
        <CardMedia
            className={classes.media}
            image={profile.photo}
        />
        </DivImage>
        <CardContent className={classes.root}>
            <Typography variant="h5" component="h2">{profile.name}, {profile.age}</Typography>
            <Typography variant="body2" component="p">{profile.bio}</Typography>
            <DivButtons>
                <Button variant="contained" onClick={()=>getProfile()}><ClearIcon></ClearIcon></Button>
                <Button variant="contained"onClick={match}><FavoriteIcon></FavoriteIcon></Button>
            </DivButtons>
        </CardContent>
    </DivProfile>
  );
}

