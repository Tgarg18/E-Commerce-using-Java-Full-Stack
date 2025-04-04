import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
} from "@mui/material";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { clearWishlist, fetchWishlist, removeFromWishlist } from "../../../State/Wishlist/Action";
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import { useNavigate } from "react-router-dom";

const Wishlist = () => {
  const dispatch = useDispatch();
  const [list, setList] = useState([]);
  const { wishlist } = useSelector((store) => store);
  const navigate = useNavigate();

  const handleRemoveFromWishlist = (productId) => {
    dispatch(removeFromWishlist(productId));
    setList(prevList => prevList.filter(item => item.id !== productId));
  };

  const handleClearWishlist = () => {
    dispatch((clearWishlist(setList)));
  };

  useEffect(() => {
    dispatch(fetchWishlist(setList));
  }, []);

  const formatCategoryName = (category) => {
    const parts = [];
    let currentCategory = category;
    while (currentCategory) {
      const formattedName = currentCategory.name
        .split('_')
        .filter((word, index) => !(index === 0 && (word.startsWith('men') || word.startsWith('women'))))
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      parts.push(formattedName);
      currentCategory = currentCategory.parentCategory;
    }
    return parts.reverse().join(' / ');
  };

  return (
    <Box sx={{ minHeight: "100vh", py: 5, px: { xs: 1, sm: 3 }, backgroundColor: "#f9f9f9" }}>
      <Typography variant="h4" sx={{
        fontWeight: "bold",
        textAlign: "center",
        mb: 4,
        fontSize: { xs: "1.75rem", sm: "2.125rem" }
      }}>
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#9155fd] to-[#563295]">Your Wishlist</span>
      </Typography>
      {
        list?.length > 0 ?
          <Grid container justifyContent="flex-end" sx={{ px: { xs: 1, sm: 2 }, maxWidth: 1200, margin: "0 auto" }}>
            <Button onClick={handleClearWishlist} color='secondary' variant='contained' sx={{ px: '2rem', py: '0.5rem', bgcolor: "#9155fd", ":hover": { bgcolor: "#563295" } }} startIcon={<RemoveCircleOutlineOutlinedIcon />}>
              Clear Wishlist
            </Button>
          </Grid>
          :
          null
      }

      {list?.length === 0 ? (
        <Typography variant="h6" sx={{ textAlign: "center", color: "gray" }}>
          Your wishlist is empty. Start adding your favorite items!
        </Typography>
      ) : (
        <Grid container spacing={3} sx={{ px: { xs: 1, sm: 2 }, maxWidth: 1200, margin: "0 auto" }}>
          {list?.map((item, index) => (
            <Grid item xs={12} key={index}>
              <Card sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                borderRadius: "12px",
                boxShadow: 3,
                p: 1,
                transition: "transform 0.2s",
                "&:hover": { transform: "translateY(-2px)" }
              }}>
                {/* Product Image */}
                <CardMedia
                  component="img"
                  image={item?.imageUrl}
                  alt={item?.title}
                  sx={{
                    width: { xs: "100%", sm: 200 },
                    height: { xs: 200, sm: 200 },
                    objectFit: "cover",
                    borderRadius: "8px",
                    flexShrink: 0
                  }}
                  draggable={false}
                />

                {/* Product Details */}
                <CardContent sx={{
                  flex: 1,
                  p: { xs: 1, sm: 2 },
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between"
                }}>
                  <Box>
                    <Typography variant="h6" sx={{
                      fontWeight: "bold",
                      mb: 1,
                      fontSize: { xs: "1.1rem", sm: "1.25rem" },
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical"
                    }}>
                      {item?.title}
                    </Typography>

                    <Typography variant="body2" color="textSecondary" sx={{
                      mb: 1,
                      fontSize: { xs: "0.875rem", sm: "0.9rem" }
                    }}>
                      Brand: {item?.brand} | Color: {item?.color}
                    </Typography>

                    <Typography variant="body1" sx={{ mb: 1 }}>
                      <strong>₹{item?.discountedPrice}</strong>{" "}
                      <span style={{ textDecoration: "line-through", color: "gray" }}>₹{item?.price}</span>{" "}
                      <span style={{ color: "green" }}>({item?.discountPercent}% off)</span>
                    </Typography>

                    <Typography variant="body2" color="textSecondary" sx={{
                      mb: 2,
                      fontSize: { xs: "0.875rem", sm: "0.9rem" },
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap"
                    }}>
                      Category: {formatCategoryName(item?.category)}
                    </Typography>
                  </Box>

                  {/* Action Buttons */}
                  <Box sx={{
                    display: "flex",
                    justifyContent: "end",
                    alignItems: "center",
                    gap: 1,
                    pt: { xs: 1, sm: 0 }
                  }}>
                    <Button onClick={() => navigate(`/product/${item?.id}`)} color='secondary' variant='contained' sx={{ px: '2rem', py: '0.5rem', bgcolor: "#9155fd", ":hover": { bgcolor: "#563295" } }} startIcon={<VisibilityOutlinedIcon />}>
                      View the Product
                    </Button>
                    <Button onClick={() => handleRemoveFromWishlist(item?.id)} color='secondary' variant='contained' sx={{ px: '2rem', py: '0.5rem', bgcolor: "#ffffff", color: "#9155fd", ":hover": { bgcolor: "#e5e5e5", fontWeight: "bold" } }}>
                      <FavoriteOutlinedIcon sx={{ color: "#9155fd", mr: 1 }} />
                      <span className='font-semibold'>Remove From Wishlist</span>
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Wishlist;