import BookmarkAdd from '@mui/icons-material/BookmarkAddOutlined';
import BookmarkAdded from '@mui/icons-material/BookmarkAddedOutlined';
import IconButton from '@mui/joy/IconButton';
import { useState } from 'react';   
import axios from 'axios';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function BookmarkUpdate({ id, bmids })  {
    const { user } = useSelector((state) => state.auth)
    const [isMarked, setIsMarked] = useState(false)

    // Checks if email and id already exists
    // If it exists return true else false
    useEffect(() => {
        let mark = false
        if ( bmids.includes(id.toString()) )  {
            mark = true;
        }
        setIsMarked(mark);
    }, []);
    

    const handleClick = useCallback(async () => {        
        const config =  {
            headers: { Authorization: `Bearer ${user.token}` }
        }
    
        const userData = {
            email : user.email,
            homeID : id.toString()
        }

        if ( isMarked ) {
            // User has indicated to remove bookmark
            // Make a call to backend to remove the home with above user data
            // and home data
            config.data = userData
            await axios.delete("/homes", config)
            .then( function (res) {
                const result = res.data;
                JSON.stringify(result, null, 4);
            }).catch(function(error){
                console.error(error)
            })
        }   else    {
            // User has indicated to add bookmark
            // Make a call to backend to add the home with above user data
            // and home data
            await axios.post("/homes", userData, config)
            .then( function (res) {
                const result = res.data;
                JSON.stringify(result, null, 4);
            }).catch(function(error){
                console.error(error)
            })
        }
        
        setIsMarked(!isMarked)
 
    });

    return(
        <IconButton
            aria-label="bookmark Bahamas Islands"
            variant="plain"
            color="neutral"
            size="sm"
            sx={{ position: 'absolute', top: '0.5rem', right: '0.5rem' }}
            onClick={()=>handleClick()}
        >
        {isMarked && <BookmarkAdded sx={{color: 'grey'}}/>}
        {!isMarked && <BookmarkAdd sx={{color: 'white'}}/>}
        </IconButton>
    )
}