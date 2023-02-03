import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import AwesomeSlider from 'react-awesome-slider';
import "react-awesome-slider/dist/styles.css";
import 'react-awesome-slider/dist/custom-animations/cube-animation.css';

export default function ScrollDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');
  const [data, setData] = useState([]);
  const [isLoading_Img, setIsLoading] = useState(false);

  
  const handleClickOpen = (scrollType) => () => {
    triggerAPI();
    setOpen(true);
    setScroll(scrollType);
  };

  const triggerAPI = async () => {
    // Use async await instead of chained promise
    setIsLoading(true);
    var body = {homeID : props.data}
    await axios.post("/singleHome", body)
    .then( function (res) {
      const result = res.data;
      JSON.stringify(result, null, 4);
      setData(result);
      // console.log(result);

    }).catch(function(error){
      console.error(error)
    })

    setIsLoading(false);
    
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    
    <div>
      {!open ? (
              <Button
              onClick={handleClickOpen('paper')}
              variant="contained"
              size="sm"
              color="primary"
              aria-label="Explore Bahamas Islands"
              sx={{ ml: 'auto', fontWeight: 600 }}
              >
              Explore
            </Button>
      ) : (
        <>
      <Dialog
        // fullWidth={fullWidth}
        maxWidth="lg"
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >

            <DialogTitle id="scroll-dialog-title">{props.id}</DialogTitle>
            <DialogContent dividers={scroll === 'paper'}>
              <DialogContentText
                id="scroll-dialog-description"
                ref={descriptionElementRef}
                tabIndex={-1}
              >
                {isLoading_Img && <Spinner/>}
                <div class='imageSliderContainer'>
                <div class='imageSlider'>
                  <AwesomeSlider animation="cubeAnimation">
                    
                    {data.property ? (
                      // console.log(data.property.listings[0].photo?.href)
                      data.property.listings[0].photos?.map((photo) => {
                        return <div data-src={photo.href} />
                      })

                      
                    ) : (
                      <>
                      </>
                    ) }
                  </AwesomeSlider>
                </div>
                </div>
                <div class='description'>
                {data.property ? (
                  <>
                  <p>{data.property.listings[0].description}</p>
                  <br />
                  <div className='HouseDetails'>
                    Lot Square Foot: {data.property.listings[0].lot_sqft}
                    <br />
                    Beds: {data.property.listings[0].beds}
                    <br />
                    Baths: {data.property.listings[0].baths}
                    <br />
                    Property Type: {data.property.listings[0].prop_type.replace("_", " ").split(' ')
                                                                                          .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                                                                                          .join(' ')}

                  </div>
                  </> ) : ( <></> ) }
                  </div>
              </DialogContentText>
            </DialogContent>

        <DialogActions id="scroll-dialog-title">
          <Button sx={{color: 'white'}} onClick={handleClose}>Exit</Button>
          {/* <Button sx={{color: 'white'}} onClick={handleClose}>Faviorte</Button> */}
        </DialogActions>
      </Dialog>
      </>
      )}
    </div>
  );
  
}