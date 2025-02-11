import React, { useState, useEffect, useRef } from "react";

const HomePage = (props) => {
  const { setFile, setAudioStream } = props;

  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [audioChunks, setAudioChunks] = useState([]);
  const [duration, setDuration] = useState(0);

  const mediaRecorder = useRef(null);
  const mimeType = "audio/webm";

  async function startRecording() {
    let tempStream;

    console.log("Start recording");

    try {
      const streamData = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });
      tempStream = streamData;
    } catch (err) {
      console.log(err.message);
      return;
    }

    setRecordingStatus('recording')

    const media = new MediaRecorder(tempStream, { type: mimeType });

    mediaRecorder.current = media;

    mediaRecorder.current.start();

    let localAudioChunks = [];
    mediaRecorder.current.ondataavailable = (event) => {
      if (typeof event.data === "undefined") {
        return;
      }
      if (event.data.size === 0) {
        return;
      }
      localAudioChunks.push(event.data);
    };
    setAudioChunks(localAudioChunks);
  }

  async function stopRecording() {
    setRecordingStatus("inactive");
    console.log("Stop recording");

    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: mimeType });
      setAudioStream(audioBlob);
      setAudioChunks([]);
      setDuration(0);
    };
  }

  useEffect(() => {
    if (recordingStatus === "inactive") {
      return;
    }

    const interval = setInterval(() => {
      setDuration((curr) => curr + 1);
    }, 1000);

    return () => clearInterval(interval);
  });

  return (
    <div>
      <main className="flex-1 flex flex-col text-center pb-20 gap-3 justify-center p-4">
        <h1 className="font-semibold text-5xl">
          Trans<span className="text-blue-400 bold">late </span>It!
        </h1>

        <h3 className="font-medium">
          Record
          <span className="text-blue-400">&rarr;</span>Transcribe
          <span className="text-blue-400">&rarr;</span>Translate
        </h3>
        <button 
        onClick={recordingStatus === 'recording' ? stopRecording : startRecording} 
        className="flex items-center text-base justify-between gap-4 mx-auto w-72 max-w-full my-4 specialBtn px-4 py-2 rounded-xl">
          <p>{recordingStatus === 'inactive' ? 'Record' : `Stop recording`}</p>
          <div className='flex items-center gap-2'>
                     {/* {duration !== 0 && (
                        <p className='text-sm'>{duration}s</p>
                    )}  */}
                    <i className={"fa-solid duration-200 fa-microphone " + (recordingStatus === 'recording' ? ' text-rose-300' : "")}></i>
                </div>
        </button>
        <p className="text-base">
          Or{" "}
          <label
            className="text-blue-500 
    hover:text-orange-400 duration-200
    cursor-pointer"
          >
            upload{" "}
            <input
              onChange={(e) => {
                const tempFile = e.target.files[0];
                setFile(tempFile);
                console.log(tempFile);
              }}
              className="hidden"
              type="file"
              accept=".mp3,.wave"
            />{" "}
          </label>
          a mp3 file
        </p>
        <p className="italic text-slate-500">Free now & Free Forever</p>
      </main>
    </div>
  );
};

export default HomePage;
