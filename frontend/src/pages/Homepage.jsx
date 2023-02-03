import {useState} from 'react';
import axios from 'axios';
import { useCallback } from 'react';
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Card from '../components/HomeCard';
import Spinner from '../components/Spinner';
import Logo from '../images/logo-no-background.png'
import home from '../images/home.jpeg'

const Homepage = () => {
    const [data, setData] = useState([]);
    const [isLoading_Img, setIsLoading] = useState(false);
    const [err, setErr] = useState('');

    const retrieveHomeIDs = useCallback(async () => {

        setIsLoading(true);

        // Retrieve all homeaids user has bookmarked
        var homeids = [{homeID: "4716493315"}, {homeID: "6857688282"}, {homeID: "6429429908"}, {homeID: "9925068734"}, {homeID: "5253471085"}]
        // config.params = userData
        // await axios.get("/homes/", config)
        // .then( function (res) {
        //     setErr(false);
        //     const result = res.data;
        //     JSON.stringify(result, null, 4);
        //     homeids = result;
        // }).catch(function(error){
        //     setErr(true)
        //     console.error(error)
        // })

        // Iterate over each homeID and call api for that house
        // Append result onto data object
        let vals = {
            properties : [],
            bmids : []
        }

        for ( const homeID in homeids )  {
        await axios.post("/singleHome", { homeID : homeids[homeID].homeID })
        .then( function (res) {
            setErr(false)
            const result = res.data
            JSON.stringify(result, null, 4)
            vals.properties.push(result.property)
            vals.bmids.push(homeids[homeID].homeID);
        }).catch(function(error){
            setErr(true)
            console.error(error)
        })
        }
        setData(vals)

        setIsLoading(false);

    }, []);

    useEffect(() => {

        retrieveHomeIDs()

    }, [])
    return (
        <>
            <img src={Logo} alt="react logo" />
            <div class='intro' style={{ backgroundImage: home }}>
                {/* <h1>Welcome to Realest Estate</h1> */}
                <h1>Checkout out a few of our homes below</h1>
                {/* <p>It is as simple as the click of a button, just enter the zip code of the desired location of your residence and browse away. You can bookmark your favorite Real Estates with the book mark symbol in the top right of the card. If it is greyed out then it is already bookmarked, and you can head down to Favorites tab in the header to view your bookmarked Estates.</p> */}
            </div>
            {isLoading_Img && <Spinner/>}
            <div className="container">
                <div className="row">
                {data.properties?.map((prop, index) => {
                    return(
                        <div key={index} className={prop.permalink}>
                            {prop.listings?.map( (list , index) => {
                            return (
                                <div class="float-container">
                                    <div class="float-child">
                                        <Card key={index} data={list} id={prop.id} bmids={data.bmids}/>
                                    </div>
                                </div>
                            )
                            })}
                        </div>
                        );
                })}
                </div>
            </div>
        </>
    );
}

export default Homepage