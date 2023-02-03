import {useState} from 'react';
import axios from 'axios';
import { useCallback } from 'react';
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Card from '../components/Card';
import Spinner from '../components/Spinner';

const Dashboard = () => {
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)
  useEffect(() => {

    if (!user) {
      navigate('/login')
    }

  }, [user, navigate])
  const [data, setData] = useState([]);
  const [zip, setZip] = useState('');
  const [isLoading_Img, setIsLoading] = useState(false);
  const [err, setErr] = useState('');

  const triggerAPI = useCallback(async () => {
    // Functionality used for bookmark component
    const config =  {
      headers: { Authorization: `Bearer ${user.token}` },
      params : { email : user.email }
    }
    var homeids = []
    await axios.get("/homes/", config)
    .then( function (res) {
        setErr(false);
        const result = res.data;
        JSON.stringify(result, null, 4);
        for ( var container in result)  {
          homeids.push(result[container].homeID)
        }
    }).catch(function(error){
        setErr(true)
        console.error(error)
    })

    // Use async await instead of chained promise
    setIsLoading(true);
    var body = {zip : zip}
    await axios.post("/api", body)
    .then( function (res) {
      setErr(false)
      const result = res.data;
      // console.log(result)
      JSON.stringify(result, null, 4);
      result['bmids'] = homeids;
      setData(result);
    }).catch(function(error){
      setErr(true)
      console.error(error)
    })

    setIsLoading(false);
    
  }, [zip]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    triggerAPI();
  }, [triggerAPI])

  const handleChange = useCallback((event) => {
    setZip(event.target.value);
  }, []);

  return (
    <div>
      {err && <h2>{err}</h2>}
      <h1>Welcome {user && user.name}</h1>

      <form
      onSubmit={handleSubmit}> 
        <div class="search">
          <input 
          class="round"
          type="zipcode" 
          value={zip}
          placeholder="Enter Zipcode"
          onChange={handleChange}
          />
          <input type="submit" class="corner" value="Fetch Data" />
          {/* <button class="corner" type="submit">Fetch Data</button> */}
        </div>
      </form> 

      {isLoading_Img && <Spinner/>}

      <div className="container">
        <div className="row">
          {data.properties?.map((prop, index) => {
            return(
                  <div key={index} className={prop.permalink}>
                    {prop.listings?.map( (list , index) => {
                      if(!list.photo_count > 0){
                        return false;
                      }else{
                        return (
                          <div class="float-container">
                            <div class="float-child">
                              <Card key={index} data={list} id={prop.id} bmids={data.bmids}/>
                            </div>
                          </div>
                        )
                      }
                    })}
                  </div>
                );
          })}
          </div>
      </div>
    </div>
  );
};

export default Dashboard;