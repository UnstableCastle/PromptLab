import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    CircularProgress,
    alpha,
} from "@mui/material";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import { DeleteOutlineOutlined } from "@mui/icons-material";

const DeleteConfirmationDialog = ({
    open,
    onClose,
    onConfirm,
    isDeleting = false,
}) => {
    return (
        <Dialog
            open={open}
            // Prevent clicking outside to close if the API call is in progress
            onClose={!isDeleting ? onClose : undefined}
            PaperProps={{
                sx: {
                    borderRadius: 4, // Matches the PromptItem border radius
                    p: 1,
                    minWidth: { xs: 300, sm: 400 },
                    boxShadow: `0 14px 35px ${alpha("#1e1b4b", 0.1)}`,
                },
            }}
        >
            <DialogTitle
                sx={{
                    fontWeight: 700,
                    color: "#1e1b4b",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    pb: 1,
                }}
            >
                <WarningAmberRoundedIcon sx={{ color: "#ef4444" }} />
                Delete Post
            </DialogTitle>

            <DialogContent>
                <DialogContentText sx={{ color: "text.secondary", mt: 1, lineHeight: 1.6 }}>
                    Are you sure you want to delete this post? This action cannot be undone
                    and the post will be permanently removed from your portfolio.
                </DialogContentText>
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 2, pt: 1 }}>
                <Button
                    onClick={onClose}
                    disabled={isDeleting}
                    sx={{
                        color: "#64748b",
                        "&:hover": { bgcolor: alpha("#4f46e5", 0.08) },
                        borderRadius: 2,
                        textTransform: "none",
                        fontWeight: 600,
                        px: 3,
                    }}
                >
                    Cancel
                </Button>
                <Button
                    onClick={onConfirm}
                    disabled={isDeleting}
                    variant="contained"
                    disableElevation
                    startIcon={!isDeleting && <DeleteOutlineOutlined />}
                    sx={{
                        bgcolor: "#ef4444",
                        color: "#fff",
                        "&:hover": { bgcolor: "#dc2626" },
                        borderRadius: 2,
                        textTransform: "none",
                        fontWeight: 600,
                        px: 3,
                        minWidth: 110,
                    }}
                >
                    {isDeleting ? (
                        <CircularProgress size={24} color="inherit" />
                    ) : (
                        "Delete"
                    )}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteConfirmationDialog;