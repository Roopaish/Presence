'use client'

import Button from "@/components/Button";
import { saveImages } from "@/providers/student";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

export default function SubmitImages() {
  const [images, setImages] = useState<{ src: string }[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pathname = usePathname()
  const [cameraState, setCameraState] = useState<"none" | "clicking" | "finished">("none")

  const { mutate, isLoading } = useMutation({
    mutationKey: "save-images",
    mutationFn: saveImages,
    onSuccess: () => {
      toast.success("Images saved successfully")
    },
    onError: () => {
      toast.error("Error saving images")
    }
  })

  useEffect(() => {
    let stream: MediaStream | null = null;

    const turnOnCamera = () => {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch(error => toast.error("Error accessing camera"));
    };

    const turnOffCamera = () => {
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
        stream.removeTrack(tracks[0]);
      }
      window.location.reload();
    };

    if (pathname === "/submit-images") {
      turnOnCamera();
    } else {
      turnOffCamera();
    }

    return () => {
      turnOffCamera();
    };
  }, [pathname])

  const captureImages = () => {
    const numberOfImages = 10;
    const captureInterval = 1000; // Capture every 100ms
    const captureDuration = captureInterval * numberOfImages; // Capture for 10 seconds
    setCameraState("clicking")
    setImages([]);

    const captureImage = () => {
      if (!canvasRef?.current || !videoRef?.current) return;
      const context = canvasRef.current.getContext('2d');

      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;

      if (!context) return;
      context.drawImage(
        videoRef.current,
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );

      const tempCanvas = document.createElement('canvas');
      const tempContext = tempCanvas.getContext('2d');

      tempCanvas.width = videoRef.current.videoWidth;
      tempCanvas.height = videoRef.current.videoHeight;

      if (!tempContext) return;
      tempContext.drawImage(
        canvasRef.current,
        0,
        0,
        tempCanvas.width,
        tempCanvas.height
      );

      const photo = new Image();

      photo.src = tempCanvas.toDataURL('image/jpeg');
      setImages(prevImages => [...prevImages, photo]);

      videoRef.current.style.border = '4px solid red';
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.style.border = 'none';
        }
      }, 10);

      const audio = new Audio('capture_sound.mp3');
      audio.play();
    };

    const stopCapture = () => {
      clearInterval(captureIntervalId);
      if (videoRef.current) {
        videoRef.current.style.border = 'none';
      }
      setCameraState("finished")
    };

    const captureIntervalId = setInterval(captureImage, captureInterval);

    setTimeout(stopCapture, captureDuration);
  };

  const handleCaptureButtonClick = () => {
    captureImages();
  };

  const handleSubmitImages = () => {
    confirm("Are you sure you want to submit these images? This is going to take some time") &&
      mutate({ images })
  }

  return (
    <main>
      <section className="grid md:gap-10 grid-cols-5 ">
        <div className="col-span-5 md:col-span-3 rounded-md overflow-hidden relative">
          <video ref={videoRef} autoPlay width="100%" height="100%" style={{
            transform: "rotateY(180deg)"
          }} />
          <canvas ref={canvasRef} className="absolute" />
        </div>
        <div className="col-span-5 row-start-1 md:row-auto md:col-span-2">
          <h3 className="text-2xl font-extrabold">Submit your images</h3>
          <p className="mt-5 mb-5 text-lg font-normal">
            Please show different emotions and different side of your faces in
            every 1s of interval.
          </p>
          <span>
            <img
              src="images/emotion.gif"
              alt=""
              className="w-full sm:max-w-xs"
            ></img>
          </span>
          <div className="mt-4 md:block hidden">
            <Button onClick={handleCaptureButtonClick}
              disabled={cameraState == "clicking"}
            >{cameraState == "finished" ? "Capture Again" : "Capture Images"}</Button>
          </div>
        </div>
      </section>
      <div className="mt-4 md:hidden block">
        <Button onClick={handleCaptureButtonClick}
          disabled={cameraState == "clicking"}
        >{cameraState == "finished" ? "Capture Again" : "Capture Images"}</Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-9">
        {images.map((image, index) => (
          <img key={index} src={image.src} alt={`Image ${index + 1}`} />
        ))}
      </div>

      {
        images && images.length > 0 && (
          <Button isLoading={isLoading} onClick={handleSubmitImages}>Upload Images</Button>
        )
      }
    </main >
  );
}
