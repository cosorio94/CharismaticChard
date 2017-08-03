import React from 'react';
import Sortable from 'react-sortablejs';

const SharedGroup = ({items, onChange, splitItem, className, debtorIndex}) => {
  const splitBtn = (index) => {
    var splitBtn;
    if (splitItem !== null) {
      splitBtn = (
        <button className="splitBtn btn" id={index} onClick={splitItem}>
          Split
        </button>
      );
    }
    return splitBtn;
  }

  return (
    <Sortable 
      className = {"row sortableList " + className}
      options={{
        group: 'shared',
        pull: true,
        put: true
      }}
      onChange={(order, sortable, event) => {
        onChange(order, debtorIndex);
      }}
    >
      {
        items.map((item, index) => (
          <div className="list-group-item" data-id={item.name + ' ' + item.price} key={index}>
            {item.name} ${(Number(item.price)).toFixed(2)} {splitBtn(index)}
          </div>
        ))
      }
    </Sortable>
  );
};

export default SharedGroup;