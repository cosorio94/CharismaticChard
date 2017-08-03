import React from 'react';
import Sortable from 'react-sortablejs';

const SharedGroup = ({items, setItems, splitItem, className, onRemove, onUpdate, onAdd}) => (
  <Sortable 
    className = {"row sortableList " + className}
    options={{
      group: 'shared',
      pull: true,
      put: true
    }}
    // onChange={(order, sortable, event) => {
    //   console.log(order);
    //   console.log(sortable);
    //   console.log(event);
    //   console.log('old:', event.oldIndex);
    //   console.log('new:', event.newIndex);
    //   console.log('from: ', event.from);
    //   setItems(order)
    // }}
    onRemove={(order, sortable, event) => {
      onRemove(event);
    }}
    onUpdate={(order, sortable, event) => {
      onUpdate(event);
    }}
    onAdd={(order, sortable, event) => {
      onAdd(event);
    }}
  >
    {
      items.map((item, index) => (
        <div className="list-group-item" data-id={index} key={index}>
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