import React from 'react';
import Sortable from 'react-sortablejs';

const SharedGroup = ({items, setItems, splitItem, header, className}) => (
  <Sortable 
    className={className}
    options={{
      group: 'shared'
    }}
    onChange={(order) => setItems(order)}
  >
    {
      items.map((item, index) => (
        <div className="list-group-item" data-id={item} key={index}>
          {item.item} ${item.price}
          <button className="splitBtn btn" id={index} onClick={splitItem}>
            Split
          </button>
        </div>
      ))
    }
  </Sortable>
);

export default SharedGroup;