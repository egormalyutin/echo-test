import React, { useRef, useEffect, useState, ReactNode } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

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

// This component isn't intended to be unmounted.
export default function CreateAvatar() {
  const classes = useStyles();

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [onClick, setOnClick] = useState();

  const [blob, setBlob] = useState<string | undefined>();

  useEffect(() => {
    const width = 320;
    let height = 0;

    let streaming = false;

    const video = videoRef.current!;
    const canvas = canvasRef.current!;
    const context = canvas.getContext("2d")!;

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.log("An error occurred: " + err);
      });

    video.addEventListener(
      "canplay",
      () => {
        if (!streaming) {
          height = video.videoHeight / (video.videoWidth / width);
          video.height = height;

          streaming = true;
        }
      },
      false
    );

    // Bravo, React
    setOnClick(() => () => {
      console.log(123);

      canvas.width = width;
      canvas.height = height;

      context.drawImage(video, 0, 0, width, height);
      setBlob(canvas.toDataURL());
    });
  }, []);

  return (
    <div className={classes.paper}>
      <Avatar size="15rem">
        <video ref={videoRef} />
      </Avatar>

      <img src={blob} />
      <Button onClick={onClick}>Установить фото</Button>

      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
}
