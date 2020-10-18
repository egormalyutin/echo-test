import React, { useRef, useEffect, useState, ReactNode } from "react";

import { makeStyles } from "@material-ui/core/styles";

import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(2),
    borderRadius: "100%",
    border: `solid ${theme.spacing(0.5)}px ${theme.palette.primary.main}`,
    width: "100%",
    height: "100%",

    "& *": {
      padding: theme.spacing(1),
      width: "100%",
      height: "100%",
      objectFit: "cover",
      borderRadius: "100%",
    },
  },

  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

// Component which wraps its children into a circle with border.
export function Avatar({
  children,
  size,
}: {
  children: ReactNode;
  size: string;
}) {
  const classes = useStyles();

  return (
    <div className={classes.avatar} style={{ width: size, height: size }}>
      {children}
    </div>
  );
}

// Screen for taking a photo for avatar.
export default function CreateAvatar({
  onCreated,
}: {
  onCreated?: (image: string) => void;
}) {
  const classes = useStyles();

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [onClick, setOnClick] = useState();

  const [dialog, setDialog] = useState(false);

  const videoListener = useRef<() => void | null>();

  // Turn off the camera when component gets unmounted.
  useEffect(
    () => () => {
      const video = videoRef.current;
      if (!(video?.srcObject instanceof MediaStream)) return;

      video.pause();
      video.srcObject.getTracks().forEach((t) => t.stop());
      video.srcObject = null;
    },
    []
  );

  // Try to access the camera, and open the camera dialog otherwise.
  const tryCamera = () => {
    const width = 320;
    let height = 0;

    let streaming = false;

    const video = videoRef.current!;
    const canvas = canvasRef.current!;
    const context = canvas.getContext("2d")!;

    // Request access to the camera
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "user" }, audio: false })
      .then((stream) => {
        video.srcObject = stream;
        video.play();

        // Bravo, React.
        setOnClick(() => () => {
          if (!onCreated) return;

          canvas.width = width;
          canvas.height = height;

          context.drawImage(video, 0, 0, width, height);
          onCreated(canvas.toDataURL());
        });
      })
      .catch(() => setDialog(true));

    // Remove old event listener
    if (videoListener.current)
      video.removeEventListener("canplay", videoListener.current);

    videoListener.current = () => {
      if (!streaming) {
        // Resize the video to needed resolution.
        height = video.videoHeight / (video.videoWidth / width);
        video.width = width;
        video.height = height;

        streaming = true;
      }
    };

    video.addEventListener("canplay", videoListener.current);
  };

  // Try to access the camera on start
  useEffect(tryCamera, []);

  return (
    <div className={classes.paper}>
      <Avatar size="15rem">
        <video ref={videoRef} />
      </Avatar>

      <Button onClick={onClick}>Установить фото</Button>

      <canvas ref={canvasRef} style={{ display: "none" }} />

      <CameraDialog open={dialog} onClose={tryCamera} />
    </div>
  );
}

// Dialog that says "please allow the camera".
function CameraDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose?: () => void;
}) {
  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Камера</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Пожалуйста, разрешите использовать камеру
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Ок
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
