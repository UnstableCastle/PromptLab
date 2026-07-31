import { Backdrop, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";

const GlobalLoader = () => {
  const loading = useSelector((state) => state.loader.loading);

  return (
    <Backdrop
      open={loading}
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1000,
      }}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default GlobalLoader;
