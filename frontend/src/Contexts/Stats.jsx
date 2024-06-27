import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { SERVER_URL } from "../Constants/main";

export const Stats = createContext();

export const StatsProvider = ({ children }) => {

    const [stats, setStats] = useState(null);

    useEffect(_ => {
        axios.get(`${SERVER_URL}/home`)
        .then(res => {
            setStats(res.data)
        })
        .catch(err => {
            console.log(err);
        });
    }, [setStats]);

    return (
        <Stats.Provider value={{
            stats, setStats
        }}>
            {children}
        </Stats.Provider>
    );
}