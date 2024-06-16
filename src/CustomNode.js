// CustomNode.js
import React from 'react';
import { Handle } from 'reactflow';

const CustomNode = ({ data, selected }) => {


    const nodeStyle = {
        outline: selected ? '2px solid rgb(50, 103, 248)' : '1px solid #ddd',
        boxShadow: selected ? '0px 0px 14px rgba(50, 103, 248, 0.5)' : 'none',
      };

  return (
    <div style={{ padding: '0px', border: '1px solid #ddd', borderRadius: '5px', backgroundColor: '#fff', ...nodeStyle }}>
      <div className='node' style={{ display: 'flex', alignItems: 'center' }}>
        <div className='node-top'>
            <div>
                <span className="material-symbols-outlined icon">chat</span>
                <div className='node-heading'>Send Message</div>
            </div>
            <img className='whatsapp' width={18} height={18} src="https://play-lh.googleusercontent.com/bYtqbOcTYOlgc6gqZ2rwb8lptHuwlNE75zYJu6Bn076-hTmvd96HH-6v7S0YUAAJXoJN=w240-h480-rw"/>
        </div>
        <div className='node-content' style={{ margin: 0 }}>{truncateText(data?.label)}</div>
      </div>
      <Handle
        type="target"
        position="left"
        style={{ background: '#555' }}
      />
      <Handle
        type="source"
        position="right"
        style={{ background: '#555' }}
      />
    </div>
  );
};

const truncateText = (text, maxLength = 20) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    } else {
      return text;
    }
  };

export default CustomNode;
