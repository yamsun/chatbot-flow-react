import React from 'react';

export default ({setIsSettingsPanelOpen}) => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const openSettingsPanel = () => {
    setIsSettingsPanelOpen(true)
  }

  return (
    <aside className='node-panel'>
      <div className='heading'>
        <div>
          Nodes Panel
        </div>
        <span className="material-symbols-outlined icon" onClick={openSettingsPanel}>
          settings
        </span>
      </div>
      <div className='main'>
        <div className="description">You can drag these nodes to the pane on the right.</div>
        <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'input')} draggable>
        <span className="material-symbols-outlined">
          chat
        </span>
          Message Node
        </div>
        <div className="dndnode disable" >
          Node type 2
        </div>
        <div className="dndnode disable" >
          Node type 3
        </div>
      </div>
    </aside>
  );
};
