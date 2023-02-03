import {useState} from 'react';
import axios from 'axios';
import { useCallback } from 'react';
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Card from '../components/Card';
import Spinner from '../components/Spinner';

const Favorites = () => {
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {

    if (!user) {
      navigate('/login')
    }

  }, [user, navigate])

  const [data, setData] = useState([]);
  const [isLoading_Img, setIsLoading] = useState(false);
  const [err, setErr] = useState('');

  const retrieveHomeIDs = useCallback(async () => {
    const config =  {
      headers: { Authorization: `Bearer ${user.token}` }
    }

    const userData = {
      email : user.email
    }

    setIsLoading(true);

    // Retrieve all homeaids user has bookmarked
    var homeids = []
    config.params = userData
    await axios.get("/homes/", config)
    .then( function (res) {
        setErr(false);
        const result = res.data;
        JSON.stringify(result, null, 4);
        homeids = result;
        // console.log(result)
    }).catch(function(error){
        setErr(true)
        // console.error(error)
    })

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
    <div>
      {err && <h2>{err}</h2>}
      <h1>Welcome {user && user.name}</h1>
      <h2>Bookmarked Homes:</h2>

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
    </div>
  );
};

export default Favorites;