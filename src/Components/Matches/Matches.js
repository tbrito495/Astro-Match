import React, { useState, useEffect } from "react";
import axios from "axios"
import {MatchCard, DivMatch} from "./styled"

export default function Matches() {
    const [match,setMatch] =useState([])
    useEffect(()=>{
        getMatches()
    }, []);

    const getMatches = () => {
        axios
        .get("https://us-central1-missao-newton.cloudfunctions.net/astroMatch/Thiago/matches")
        .then(response => {
            setMatch(response.data.matches)
            console.log(response)
        })
        .catch(error=>{
            console.log(error)
        })
    }

  return (
    <MatchCard>
        {match.map((matchs)=>{
            return(
                <DivMatch key={matchs.id}>
                    <img src={matchs.photo}></img>
                    <p>{matchs.name}</p>
                </DivMatch>
                )
                })}
    </MatchCard>
  );
}


