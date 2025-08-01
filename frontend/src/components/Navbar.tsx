import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          AI Interview Screener
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to="/">
            Dashboard
          </Button>
          <Button color="inherit" component={Link} to="/upload-jd">
            Upload JD
          </Button>
          <Button color="inherit" component={Link} to="/upload-candidates">
            Upload Candidates
          </Button>
          <Button color="inherit" component={Link} to="/create-campaign">
            Create Campaign
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
