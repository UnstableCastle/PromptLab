import React, { useCallback, useEffect, useRef, useState } from "react";
import { Box, Alert, AlertTitle, IconButton, Collapse } from "@mui/material";
import { TransitionGroup } from "react-transition-group";
import CloseIcon from "@mui/icons-material/Close";
import toast from "../utils/toast";

const DEFAULT_DURATION = 4000;

function ToastContainer() {
  const [toasts, setToasts] = useState([]);
  const timers = useRef({});

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    clearTimeout(timers.current[id]);
    delete timers.current[id];
  }, []);

  const scheduleRemoval = useCallback(
    (id, duration) => {
      timers.current[id] = setTimeout(() => removeToast(id), duration);
    },
    [removeToast]
  );

  useEffect(() => {
    const unsubscribe = toast.subscribe(
      ({ type, message, title, duration = DEFAULT_DURATION }) => {
        const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
        setToasts((prev) => [...prev, { id, type, message, title, duration }]);
        scheduleRemoval(id, duration);
      }
    );

    return () => {
      unsubscribe();
      Object.values(timers.current).forEach(clearTimeout);
    };
  }, [scheduleRemoval]);

  const pauseTimer = (id) => clearTimeout(timers.current[id]);
  const resumeTimer = (id, duration) => scheduleRemoval(id, duration);

  return (
    <Box
      sx={{
        position: "fixed",
        top: { xs: 16, sm: 24 },
        right: { xs: 16, sm: 24 },
        left: { xs: 16, sm: "auto" },
        zIndex: (theme) => theme.zIndex.snackbar,
        display: "flex",
        flexDirection: "column",
        gap: 1.25,
        width: { xs: "auto", sm: 380 },
        pointerEvents: "none", // clicks pass through the empty gaps between toasts
      }}
    >
      <TransitionGroup component={null}>
        {toasts.map((t) => (
          <Collapse key={t.id} timeout={250}>
            <Alert
              severity={t.type}
              variant="filled"
              onMouseEnter={() => pauseTimer(t.id)}
              onMouseLeave={() => resumeTimer(t.id, t.duration)}
              action={
                <IconButton
                  size="small"
                  color="inherit"
                  onClick={() => removeToast(t.id)}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              }
              sx={{
                borderRadius: 2,
                boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                alignItems: "flex-start",
                pointerEvents: "auto",
                mb: 0,
              }}
            >
              {t.title && <AlertTitle sx={{ fontWeight: 700 }}>{t.title}</AlertTitle>}
              {t.message}
            </Alert>
          </Collapse>
        ))}
      </TransitionGroup>
    </Box>
  );
}

export default ToastContainer;