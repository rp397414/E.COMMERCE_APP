import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Grid, Card, CardMedia, CardContent, Typography, Button, 
  Select, MenuItem, FormControl, InputLabel, Slider, Box, CircularProgress
} from '@mui/material';
import { type AppDispatch, type RootState } from '../store/store';
import { fetchProducts } from '../store/productSlice';
import { addToCart } from '../store/cartSlice';

export default function Home() {
  const dispatch = useDispatch<AppDispatch>(); 
  const { items: products, status, error } = useSelector((state: RootState) => state.products);

  const [sortBy, setSortBy] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [minRating, setMinRating] = useState<number>(0);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // Filter
    result = result.filter(p => p.price <= maxPrice && p.rating.rate >= minRating);

    // Sort
    if (sortBy === 'price-asc') result.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-desc') result.sort((a, b) => b.price - a.price);
    if (sortBy === 'name-asc') result.sort((a, b) => a.title.localeCompare(b.title));
    if (sortBy === 'name-desc') result.sort((a, b) => b.title.localeCompare(a.title));

    return result;
  }, [products, sortBy, maxPrice, minRating]);

  if (status === 'loading') return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 5 }} />;
  if (status === 'failed') return <Typography color="error" align="center" mt={5}>Error: {error}</Typography>;

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', gap: 4, mb: 4, alignItems: 'center', flexWrap: 'wrap' }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Sort By</InputLabel>
          <Select value={sortBy} label="Sort By" onChange={(e) => setSortBy(e.target.value)}>
            <MenuItem value="">None</MenuItem>
            <MenuItem value="price-asc">Price: Low to High</MenuItem>
            <MenuItem value="price-desc">Price: High to Low</MenuItem>
            <MenuItem value="name-asc">Name: A to Z</MenuItem>
            <MenuItem value="name-desc">Name: Z to A</MenuItem>
          </Select>
        </FormControl>

        <Box sx={{ width: 200 }}>
          <Typography gutterBottom>Max Price: ${maxPrice}</Typography>
          <Slider value={maxPrice} min={0} max={1000} onChange={(_, val) => setMaxPrice(val as number)} />
        </Box>

        <Box sx={{ width: 200 }}>
          <Typography gutterBottom>Min Rating: {minRating} Stars</Typography>
          <Slider value={minRating} min={0} max={5} step={0.5} onChange={(_, val) => setMinRating(val as number)} />
        </Box>
      </Box>

      <Grid container spacing={3}>
        {filteredAndSortedProducts.map(product => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia component="img" height="200" image={product.image} alt={product.title} sx={{ objectFit: 'contain', p: 2 }} />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" noWrap title={product.title}>{product.title}</Typography>
                <Typography variant="h5" color="primary" sx={{ mt: 1 }}>${product.price.toFixed(2)}</Typography>
                <Typography variant="body2" color="text.secondary">Rating: {product.rating.rate} ({product.rating.count} reviews)</Typography>
              </CardContent>
              <Button variant="contained" fullWidth onClick={() => dispatch(addToCart(product))} sx={{ m: 1, width: 'calc(100% - 16px)' }}>
                Add to Cart
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}