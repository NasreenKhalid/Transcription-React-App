import React from 'react'

const FileDisplay = (props ) => {
  const {audioStream,file,handleAudioReset,   handleFormSubmission} = props;
  return (
    <main className='flex-1 flex flex-col text-center pb-20 gap-3 justify-center p-4'>
     
     <h1 className='font-medium text-4xl'>Your<span className='text-blue-400'>File</span></h1>
     <div className='flex mx-auto items-center gap-2'>
      <h3 className='font-semibold'>Name: </h3>
      <p>{file ? file?.name : 'Custom Audio'}</p>

</div> 
<div className='flex items-center gap-4 justify-around'>
  <button className='text-slate-400 rounded-lg bg-slate-300 px-4 py-2
  hover:text-blue-700 duration-500
  '
  onClick={handleAudioReset}
  >Reset</button>
  <button onClick={handleFormSubmission} className='specialBtn px-4 py-2 rounded-lg text-blue-400'>
    <p>Transcribe</p>
    <i className='fa-solid fa-pen-nib'></i>
  </button>

</div>
     
      </main>


)

}

export default FileDisplay
