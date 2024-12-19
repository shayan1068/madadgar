import React from 'react';
import { BsMic, BsStop } from 'react-icons/bs';
import useRecording from './useRecording';
import "./../../css/style.css";
interface Props {
  handleRecordedBlob: (blob: Blob) => void;
}

const Play = ({ handleRecordedBlob }: Props) => {
  const { recording, recordedBlob, startRecording, stopRecording, timeElapsed } =
    useRecording(handleRecordedBlob);

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {recording ? (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <BsMic style={{ color: 'red', marginRight: '10px' }} />
            {timeElapsed}
          </div>
        ) : (
            <></>
        )}
      </div>
      <button onClick={recording ? stopRecording : startRecording} style={{ marginLeft: '10px' }} className="ms-3 messanagerSendButton">
        {recording ? <BsStop /> : <BsMic />}
      </button>
      <div style={{ flexGrow: 1 }}></div>
      {/* {recordedBlob && (
        <audio controls src={URL.createObjectURL(recordedBlob)} />
      )} */}
    </div>
  );
};

export default Play;
