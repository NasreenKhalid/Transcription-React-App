import React,{useState} from 'react'
import Translation from './Translation'
import Transcription from './Transcription'

const Information = (props) => {
const [tab,setTab] = useState('transcription')


const {output} = props

  return (
    <div>
   <main className='flex-1 flex flex-col text-center pb-20 gap-3 justify-center p-4'>
     
     <h1 className='font-medium text-4xl'>Your <span className='text-blue-400'>Transcription</span></h1>
 
 <div className='flex items-center gap-2 mx-auto rounded-full bg-white rounded border-blue-400'>
  <button onClick={()=>{setTab('transcription')}} className={'px-4 py-1 font-medium' + (tab === 'transcription' ? ' bg-blue-300 text-white' : ' text-blue-400 hover:text-blue-600')}>Transcription</button>
  <button onClick={()=>{setTab('translation')}} className={'px-4 py-1 font-medium' + (tab === 'translation' ? ' bg-blue-300 text-white' : ' text-blue-400 hover:text-blue-600')}>Translation</button>

 </div>
 {tab === 'transcription' ? <Transcription {...props}/> : <Translation {...props}/>}
      </main>
    </div>
  )
}

export default Information
