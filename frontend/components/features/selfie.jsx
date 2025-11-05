import React, { useRef, useEffect, useState, useCallback } from "react";
import { getAuthData } from "@/utils/getAuthData";

// Safely loads a <script> only once
function loadScriptOnce(src, id) {
  return new Promise((resolve, reject) => {
    if (document.getElementById(id)) return resolve();
    const script = document.createElement("script");
    script.async = true;
    script.src = src;
    script.id = id;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.body.appendChild(script);
  });
}

export default function SelfieModal({ isOpen, onClose }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [faceDetected, setFaceDetected] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [stream, setStream] = useState(null);
  const [detecting, setDetecting] = useState(false);
  const [mediaPipeReady, setMediaPipeReady] = useState(false);
  const [message, setMessage] = useState("")

  // Ensures MediaPipe FaceDetection is loaded only once
  const loadFaceDetectionScript = useCallback(async () => {
    await loadScriptOnce(
      "https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/face_detection.js",
      "face-detection-lib"
    );
    if (!window.FaceDetection) {
      throw new Error("MediaPipe FaceDetection not found on window.");
    }
    setMediaPipeReady(true);
  }, []);

  // Handles webcam stream and MediaPipe loading
  useEffect(() => {
    let localStream;
    if (isOpen) {
      setFaceDetected(false);
      setVideoReady(false);
      setDetecting(false);
      setMediaPipeReady(false);

      // 1. Start webcam
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((mediaStream) => {
          setStream(mediaStream);
          localStream = mediaStream;
          if (videoRef.current) {
            videoRef.current.srcObject = mediaStream;
          }
        })
        .catch(() => {
          alert("Unable to access camera.");
        });

      // 2. Load MediaPipe FaceDetection
      loadFaceDetectionScript();
    }
    // Cleanup on unmount or modal close
    return () => {
      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop());
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      setStream(null);
      setFaceDetected(false);
      setVideoReady(false);
      setDetecting(false);
      setMediaPipeReady(false);
    };
    // eslint-disable-next-line
  }, [isOpen, loadFaceDetectionScript]);

  // Wait until both video AND MediaPipe are ready, then start detection
  useEffect(() => {
    if (!isOpen || !videoReady || !mediaPipeReady) return;
    let stopped = false;
    setFaceDetected(false);

    // Initialize MediaPipe FaceDetection
    const faceDetection = new window.FaceDetection({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`,
    });
    faceDetection.setOptions({ model: "short", minDetectionConfidence: 0.6 });

    faceDetection.onResults((results) => {
      let detected = (
        results.detections &&
        results.detections.length > 0 &&
        results.detections[0].V &&
        results.detections[0].V[0] &&
        results.detections[0].V[0].ga > 0.6
      );
      setFaceDetected(detected);
    });

    async function processFrame() {
      if (
        stopped ||
        !videoRef.current ||
        videoRef.current.readyState !== 4 ||
        videoRef.current.videoWidth === 0 ||
        videoRef.current.videoHeight === 0
      )
        return;
      try {
        setDetecting(true);
        await faceDetection.send({ image: videoRef.current });
        setDetecting(false);
      } catch (err) {
        setDetecting(false);
        console.error("Detection error:", err);
      }
      if (!stopped && isOpen) requestAnimationFrame(processFrame);
    }

    requestAnimationFrame(processFrame);

    // Cleanup on stop
    return () => {
      stopped = true;
    };
    // eslint-disable-next-line
  }, [isOpen, videoReady, mediaPipeReady]);

  // Video is ready when it has loaded metadata and can play
  const handleCanPlay = () => {
    setVideoReady(true);
  };

  const handleCapture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (
      !video ||
      !canvas ||
      video.videoWidth === 0 ||
      video.videoHeight === 0
    ) {
      alert("Video or canvas not ready!");
      return;
    }
    if (!faceDetected) {
      alert("No face detected. Try again.");
      return;
    }
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0);
    console.log("Captured image from video.");
    canvas.toBlob(async (blob) => {
      if (!blob) {
        alert("Failed to capture image.");
        return;
      }

      console.log("Captured blob:", blob);
      console.log("Sending request...");

      const auth = getAuthData()
      const user = auth.user

      // Prepare form data
      const formData = new FormData();
      formData.append('image', blob, 'selfie.jpg');
      formData.append("user_id", user._id)
      formData.append("user_name", user.name)
      formData.append("user_email", user.email)

      try {
        const response = await fetch('http://localhost:8000/analysis/analyze', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          setMessage("Selfie uploaded successfully!");
          console.log("Upload response:", await response.json());
          window.location.href = "/analysis/report";
        } else {
          setMessage("Upload failed. Please try again.");
        }
      } catch (error) {
        setMessage("Error uploading selfie.");
        console.error("Upload error:", error);
      }

      onClose();
    }, 'image/jpeg', 0.95);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gradient-to-br from-[#F6F7DD] via-[#F6F7DD] to-[#DECFAC] bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 md:w-[50%] w-[90%] h-[80%] md:h-[90%]">
        <h2 className="text-xl font-semibold mb-4">Take a Selfie To Continue With Skin Analysis</h2>
        <h2 className="text-xl text-green-500 font-semibold mb-4">{message}</h2>
        <video
          ref={videoRef}
          autoPlay
          muted
          width={400}
          height={300}
          className={`rounded-md border mb-4 transition-all md:w-full md:h-[85%] w-full h-[80%] ${
            faceDetected ? "border-green-500" : "border-red-500"
          }`}
          onCanPlay={handleCanPlay}
        />
        <canvas ref={canvasRef} style={{ display: "none" }} />
        <div className="flex justify-between items-center">
          <button
            onClick={handleCapture}
            className={`py-2 px-4 rounded text-white font-medium focus:outline-none
              ${
                faceDetected && videoReady && !detecting
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            disabled={!faceDetected || !videoReady || detecting}
          >
            {detecting
              ? "Detecting..."
              : faceDetected && videoReady
              ? "Take Selfie"
              : "No Face Found"}
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded ml-3"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
