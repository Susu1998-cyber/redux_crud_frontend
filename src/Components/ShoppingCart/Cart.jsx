import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Divider,
  Avatar,
  Stack,
} from "@mui/material";
import Navbar from "../Header/Navbar";

const Cart = () => {
  return (
    <>
      <Navbar />
      <Box sx={{ p: 3, bgcolor: "#f5f5f5", minHeight: "100vh" }}>
        <Card
          sx={{
            maxWidth: 800,
            mx: "auto",
            boxShadow: 4,
            borderRadius: 2,
          }}
        >
          <CardContent>
            {/* Title */}
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Your Cart
            </Typography>

            {/* Cart Items */}
            <Stack divider={<Divider />} spacing={2}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                py={1}
              >
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar
                    variant="rounded"
                    src="https://via.placeholder.com/80"
                    sx={{ width: 80, height: 80 }}
                  />
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Product Name
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Qty: 2
                    </Typography>
                  </Box>
                </Stack>
                <Typography variant="subtitle1" fontWeight="bold">
                  $49.99
                </Typography>
              </Stack>

              {/* Repeat Stack above for more products */}
            </Stack>

            {/* Summary */}
            <Box
              mt={4}
              display="flex"
              flexDirection="column"
              alignItems="flex-end"
            >
              <Typography variant="h6" fontWeight="bold" mb={2}>
                Subtotal: $99.98
              </Typography>
              <Stack direction="row" spacing={2}>
                <Button variant="contained" color="error">
                  Clear Cart
                </Button>
                <Button variant="contained" color="primary">
                  Checkout
                </Button>
              </Stack>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default Cart;
