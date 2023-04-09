import React from "react";
import { Link } from "react-router-dom";
import CONSTANTS from "../../Constants.json";
import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

export default function Navbar({ balance }) {
  const navbarItems = ["Transactions", "Operations", "Breakdown"];
  const links = ["/", "/operations", "/breakdown"];

  const balanceColor = function () {
    return balance > CONSTANTS.POSITIVE_BALANCE ? "green" : "red";
  };

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar>
            <AccountBalanceIcon />
            Bank
            <Box  sx={{ flexGrow: 1, display: { xs: "none", md: "flex" , marginLeft: "10px" } }}>
              {navbarItems.map((item, index) => (
                <Link key={index} to={links[index]}>
                  <Button
                    key={item}
                    sx={{
                      border: '1px solid black',
                      my: 2,
                      color: "white",
                      display: "block",
                      "&:hover": {
                        backgroundColor: "primary.main",
                        opacity: [0.9, 0.8, 0.7],
                      },
                      mx: 2
                    }}
                  >
                    {item}
                  </Button>
                </Link>
              ))}
            </Box>
            <Typography sx={{color : balanceColor() , bgcolor: 'background.paper'}} >
              Balance : {balance}$
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
