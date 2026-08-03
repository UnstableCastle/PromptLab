import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import AddIcon from "@mui/icons-material/Add";
import CTextField from "../../components/CTextField";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPost, sumbitPost } from "../../redux/dashboard/dashboardThunk";

const PRIMARY = "#4f46e5";

const CreatePost = () => {
  const [formData, setFormData] = useState({
    title: "",
    promptText: "",
    modelInfo: "",
  });

  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);

    const droppedFile = e.dataTransfer.files[0];

    if (droppedFile) {
      setFile(droppedFile);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    const payload = new FormData();
    payload.append(
      "postDetails",
      new Blob(
        [
          JSON.stringify({
            title: formData.title,
            promptText: formData.promptText,
            modelInfo: formData.modelInfo,
          }),
        ],
        {
          type: "application/json",
        },
      ),
    );

    if (file) {
      payload.append("file", file);
    }

    for (const [key, value] of payload.entries()) {
      console.log(key, value);
    }
    // Dispatch your API here
    await dispatch(createPost()).then(async (v) => {
      if (v.meta.requestStatus === "fulfilled") {
        await dispatch(
          sumbitPost({ id: v.payload.data?.id, payload: payload }),
        ).then((resp) => {
          if (resp.meta.requestStatus === "fulfilled") {
            navigate("/dashboard", { replace: true });
          }
        });
      }
    });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#F8FAFC",
        py: { xs: 3, md: 6 },
      }}
    >
      <Container maxWidth="md">
        {/* Header */}
        <Box mb={4}>
          <Typography variant="h4" fontWeight={700} color={PRIMARY}>
            Create Prompt
          </Typography>

          <Typography color="text.secondary" mt={1}>
            Share your prompt with the PromptLab community.
          </Typography>
        </Box>

        {/* Card */}
        <Card
          elevation={0}
          sx={{
            borderRadius: 4,
            border: "1px solid #E5E7EB",
            boxShadow: "0 8px 30px rgba(0,0,0,0.05)",
          }}
        >
          <CardContent sx={{ p: { xs: 3, md: 5 } }}>
            <Stack spacing={3}>
              {/* Title */}

              <CTextField
                fullWidth
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />

              {/* Prompt */}

              <CTextField
                fullWidth
                multiline
                rows={8}
                label="Prompt Text"
                name="promptText"
                value={formData.promptText}
                onChange={handleChange}
              />

              {/* Model */}

              <CTextField
                fullWidth
                label="Model Info"
                name="modelInfo"
                placeholder="Example: GPT-5.5, Claude Sonnet 4..."
                value={formData.modelInfo}
                onChange={handleChange}
              />

              {/* Upload */}

              <Box>
                <Typography fontWeight={600} mb={1}>
                  Attachment
                </Typography>

                <Box
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  sx={{
                    border: `2px dashed ${dragging ? PRIMARY : "#D1D5DB"}`,
                    borderRadius: 3,
                    bgcolor: dragging ? "#EEF2FF" : "#FAFAFA",
                    transition: ".3s",
                    cursor: "pointer",
                    p: { xs: 3, md: 5 },
                    textAlign: "center",

                    "&:hover": {
                      borderColor: PRIMARY,
                      bgcolor: "#EEF2FF",
                    },
                  }}
                >
                  <CloudUploadOutlinedIcon
                    sx={{
                      fontSize: 60,
                      color: PRIMARY,
                    }}
                  />

                  <Typography mt={2} fontWeight={600}>
                    {dragging
                      ? "Drop your file here"
                      : "Drag & Drop your file here"}
                  </Typography>

                  <Typography color="text.secondary" my={2}>
                    or
                  </Typography>

                  <Button
                    component="label"
                    variant="contained"
                    startIcon={<AddIcon />}
                    sx={{
                      bgcolor: PRIMARY,
                      textTransform: "none",
                      px: 3,
                      py: 1,

                      "&:hover": {
                        bgcolor: "#4338CA",
                      },
                    }}
                  >
                    Browse File
                    <input hidden type="file" onChange={handleFileChange} />
                  </Button>

                  <Typography
                    sx={{ marginTop: 1.5 }}
                    fontSize={14}
                    color="text.secondary"
                  >
                    Supports JPG, PNG, PDF, DOCX, ZIP
                  </Typography>
                </Box>

                {file && (
                  <Box
                    sx={{
                      bgcolor: "#EEF2FF",
                      marginTop: 1.5,
                      padding: 2,

                      borderRadius: 2,
                      border: "1px solid #C7D2FE",
                    }}
                  >
                    <Typography fontWeight={600} color={PRIMARY}>
                      Selected File
                    </Typography>

                    <Typography color="text.secondary">{file.name}</Typography>

                    <Typography variant="caption" color="text.secondary">
                      {(file.size / 1024).toFixed(2)} KB
                    </Typography>
                  </Box>
                )}
              </Box>

              {/* Buttons */}

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                justifyContent="flex-end"
              >
                <Button
                  variant="outlined"
                  sx={{
                    borderColor: PRIMARY,
                    color: PRIMARY,
                    textTransform: "none",
                    height: 48,

                    "&:hover": {
                      borderColor: PRIMARY,
                      bgcolor: "#EEF2FF",
                    },
                  }}
                >
                  Cancel
                </Button>

                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  sx={{
                    bgcolor: PRIMARY,
                    textTransform: "none",
                    height: 48,
                    px: 4,

                    "&:hover": {
                      bgcolor: "#4338CA",
                    },
                  }}
                >
                  Publish Prompt
                </Button>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default CreatePost;
