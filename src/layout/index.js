import { useState, useRef } from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import * as React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";

import { Button, Divider, Drawer, IconButton } from "@mui/material";
import { Explore, Menu } from "@mui/icons-material";
import AppMap from "../map";
import Cuboid from "../cuboid";

let imageURL =
  "https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/-121.45146305479662,38.54670827618573,10.159349345124639,0,0/400x400?access_token=pk.eyJ1IjoicmFqcHBhcmFiIiwiYSI6ImNsbDF3NWY4ZjI1amczcG16ZWExY3d2NWEifQ.XzYjKWzCfu-2K7blroEuig";

const AppLayout = () => {
  let initial = {
    latitude: 19.155,
    longitude: 72.994,
    zoom: 9,
    pitch: 0,
    antialias: true,
  };
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [viewport, setViewport] = useState(initial);

  const mapRef = useRef();

  // ** Hooks
  const theme = useTheme();
  const lgAbove = useMediaQuery(theme.breakpoints.up("lg"));

  // ** Vars
  const leftSidebarWidth = 260;

  const handleLeftSidebarToggle = () => setLeftSidebarOpen(!leftSidebarOpen);

  const DialogBox = () => {
    const [openDialog, handleDisplay] = React.useState(false);
    function convertToCuboid() {
      var canvas = document
        .getElementsByClassName("mapboxgl-canvas-container")[0]
        .querySelector("canvas");
      console.log(canvas.toDataURL());
      imageURL = canvas.toDataURL();

      openDialogBox();
    }
    const handleClose = () => {
      handleDisplay(false);
    };

    const openDialogBox = () => {
      handleDisplay(true);
    };

    const divStyle = {
      display: "flex",
      felxDirection: "row",
      position: "absolute",
      right: "0px",
      bottom: "0px",
      // padding: "1rem",
    };
    const confirmButtonStyle = {
      width: "5rem",
      height: "1.5rem",
      fontsize: "1rem",
      backgroundColor: "grey",
      color: "black",
      margin: "5px",
      borderRadius: "10px",
      border: "1px solid black",
    };
    return (
      <>
        <Button onClick={convertToCuboid} variant="contained">
          Convert To Cuboid
        </Button>
        <Dialog onClose={handleClose} open={openDialog}>
          <DialogTitle>Preview Map </DialogTitle>
          <Cuboid imageURL={imageURL} />
          <br></br>
          <div style={divStyle}>
            <Button style={confirmButtonStyle} onClick={handleClose}>
              Cancel
            </Button>
          </div>
        </Dialog>
      </>
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        borderRadius: 1,
        overflow: "hidden",
        position: "relative",
        boxShadow: 6,
        width: "95%",
        height: "92vh",
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Drawer
        open={leftSidebarOpen}
        onClose={handleLeftSidebarToggle}
        variant={lgAbove ? "permanent" : "temporary"}
        ModalProps={{
          disablePortal: true,
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          zIndex: 9,
          display: "block",
          position: lgAbove ? "static" : "absolute",
          "& .MuiDrawer-paper": {
            boxShadow: "none",
            width: leftSidebarWidth,
            zIndex: lgAbove ? 2 : "drawer",
            position: lgAbove ? "static" : "absolute",
          },
          "& .MuiBackdrop-root": {
            position: "absolute",
          },
        }}
      >
        <Box
          sx={{
            px: 2,
            py: 3,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Explore color="primary" sx={{ fontSize: "3rem" }} />
          <DialogBox />
        </Box>
      </Drawer>

      <Box
        sx={{
          width: "100%",
          overflow: "hidden",
          position: "relative",
          "& .ps__rail-y": { zIndex: 5 },
        }}
      >
        <Box sx={{ height: "100%", backgroundColor: "background.paper" }}>
          <Box sx={{ px: 5, py: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
              {lgAbove ? null : (
                <IconButton
                  onClick={handleLeftSidebarToggle}
                  sx={{ mr: 1, ml: -2 }}
                >
                  <Menu fontSize="small" />
                </IconButton>
              )}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Explore color="primary" sx={{ fontSize: "3rem" }} />
              </Box>
            </Box>
          </Box>
          <Divider sx={{ m: 0 }} />
          <Box sx={{ height: "100%", zIndex: 999 }}>
            <AppMap
              mapRef={mapRef}
              viewport={viewport}
              setViewport={setViewport}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AppLayout;
