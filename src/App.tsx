import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { type RootState } from './store/store';
import { AppBar, Toolbar, Typography, Button, Badge, Box } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Home from './pages/Home';
import Cart from './pages/cart';

function Navigation() {
  const cartItemsCount = useSelector((state: RootState) => 
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
  );

  return (
    <AppBar position="static" sx={{ mb: 2 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          React Shop
        </Typography>
        <Button color="inherit" component={Link} to="/">Home</Button>
        <Button color="inherit" component={Link} to="/cart">
          <Badge badgeContent={cartItemsCount} color="error">
            <ShoppingCartIcon />
          </Badge>
        </Button>
      </Toolbar>
    </AppBar>
  );
}

function App() {
  return (
    <Router>
      <Navigation />
      <Box sx={{ maxWidth: 1400, margin: '0 auto' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;