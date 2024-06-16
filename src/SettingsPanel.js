import React, { useEffect, useState } from 'react';

const SettingsPanel = ({ selectedNode, updateNodeLabel, setSelectedNode, setIsSettingsPanelOpen }) => {
  const [input, setInput] = useState(selectedNode?.data?.label)

  const updateHandler = () => {
    updateNodeLabel(input)
  }

  const backBtnHandler= () => {
    setSelectedNode(null)
    setIsSettingsPanelOpen(false)
  }


  useEffect(()=> {
    setInput(selectedNode?.data?.label)
  }, [selectedNode])



  return (
    <aside className="settings-panel">
      <div className='heading setting-heading'>
      <span className="material-symbols-outlined icon" onClick={backBtnHandler}>
        arrow_back
      </span>
      <div>
        Settings Panel
      </div>
      </div>
      {selectedNode ? <div className='main'>
        <div className="description">Edit the label of the selected node:</div>
        <textarea rows="5"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={updateHandler} className='update-btn' disabled={input === selectedNode.data.label}>Update</button>
      </div> : (
        <div className='main'>
          <div className="description">Select a node to edit its label, Click on a node to select it.</div>
        </div>
      )}
    </aside>
  );
};

export default SettingsPanel;
