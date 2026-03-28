import { useSelector, useDispatch } from 'react-redux';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, IconButton, Typography, Box 
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {type RootState } from '../store/store';
import { removeFromCart, updateQuantity } from '../store/cartSlice';

export default function Cart() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const totalCartPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  if (cartItems.length === 0) return <Typography variant="h5" sx={{ p: 3 }}>Your cart is empty.</Typography>;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Shopping Cart</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right">Total</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <img src={item.image} alt={item.title} style={{ width: 50, height: 50, objectFit: 'contain' }} />
                  <Typography variant="body2" sx={{ maxWidth: 200 }} noWrap title={item.title}>{item.title}</Typography>
                </TableCell>
                <TableCell align="right">${item.price.toFixed(2)}</TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}><RemoveIcon /></IconButton>
                  {item.quantity}
                  <IconButton onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}><AddIcon /></IconButton>
                </TableCell>
                <TableCell align="right">${(item.price * item.quantity).toFixed(2)}</TableCell>
                <TableCell align="center">
                  <IconButton color="error" onClick={() => dispatch(removeFromCart(item.id))}><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <Typography variant="h5">Total: ${totalCartPrice.toFixed(2)}</Typography>
      </Box>
    </Box>
  );
}