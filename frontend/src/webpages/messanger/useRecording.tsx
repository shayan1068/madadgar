import { useState, useEffect } from 'react';
import RecordRTC, { Options } from 'recordrtc';

type RecordingState = {
  recording: boolean;
  recordedBlob: Blob | null;
  startRecording: () => void;
  stopRecording: () => void;
  timeElapsed: number;
};

const useRecording = (handleRecordedBlob: (blob: Blob) => void): RecordingState => {
  const [recordRTC, setRecordRTC] = useState<RecordRTC | null>(null);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [recording, setRecording] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);

  const startRecording = () => {
    const options: Options = {
      mimeType: 'audio/wav', 
      numberOfAudioChannels: 1,
      recorderType: RecordRTC.StereoAudioRecorder,
      desiredSampRate: 16000,
    };
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const record = new RecordRTC(stream, options);
      record.startRecording();
      setRecordRTC(record);
      setRecording(true);
      setStartTime(Date.now());
    });
  };

  const stopRecording = () => {
    if (recordRTC) {
      recordRTC.stopRecording(() => {
        const blob = recordRTC.getBlob();
        setRecordedBlob(blob); 
        handleRecordedBlob(blob);
        setRecording(false);
        setStartTime(null);
      });
    }
  };

  useEffect(() => {
    let interval: any;
    if (recording) {
      interval = setInterval(() => {
        const now = Date.now();
        setTimeElapsed(Math.floor((now - startTime!) / 1000));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [recording, startTime]);

  return { recording, recordedBlob, startRecording, stopRecording, timeElapsed };
};

export default useRecording;
