import React from 'react'

const Topbar = ({handleSave}) => {
  return (
    <div className='topbar'>
        <div className='main'>
            <div></div>
            <div className='title'>Chatbot Flow Builder</div>
            <div className='action'>
                <button className='save-btn' onClick={handleSave}>
                    <span className="material-symbols-outlined icon">
                        save
                    </span>
                    Save
                </button>
            </div>
        </div>
    </div>
  )
}

export default Topbar