import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
// import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import BookmarkAdd from '@mui/icons-material/BookmarkAddOutlined';
import BackupImage from '../images/No-Photo-Available.jpg'
import HomePopup from '../components/HomePopup';
import BookmarkUpdate from '../components/BookmarkUpdate'


export default function BasicCard(props) {

  return (
    <Card variant="outlined" sx={{ width: 320, xs: 'center' }} style={{ background: '#272727' }}>
      {/* <ThemeProvider theme={darkTheme}> */}
      <Typography level="h2" fontSize="md" sx={{ mb: 0.5, color: 'white' }}>
        {(props.data.address.line)} <br />
        {(props.data.address.city) + ", " + (props.data.address.state_code)}
      </Typography>

      {/* <BookmarkUpdate id={props.id} bmids={props.bmids}/> */}

      <AspectRatio minHeight="120px" maxHeight="200px" sx={{ my: 2 }}>
        <img
          src={(props.data.photo?.href).replace("http","https") || BackupImage }
          srcSet=""
          loading="lazy"
          alt=""
        />
      </AspectRatio>
      <Box sx={{ display: 'flex', color: 'white' }}>
        <div>
          <Typography level="body3">Total price:</Typography>
          <Typography fontSize="lg" fontWeight="lg">
            ${(props.data.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </Typography>
        </div>
        <Box
        sx={{ ml: 'auto', color: 'white'}}
        >
          <HomePopup data={props.id} 
          id={(props.data.address.line) + ", " + 
          (props.data.address.city) + ", " + 
          (props.data.address.state_code)} />
        </Box>
        {/* <Button

          variant="solid"
          size="sm"
          color="primary"
          aria-label="Explore Bahamas Islands"
          sx={{ ml: 'auto', fontWeight: 600 }}
        >
          Explore
        </Button> */}
      </Box>
      {/* </ThemeProvider> */}
    </Card>
  );
}