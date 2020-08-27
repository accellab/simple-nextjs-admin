const Item = ({ item, index, onClickEdit }) => {
  return (
    <div className='list__item'>
      <div className='list__item--row w40 center'>
        <p>{index + 1}</p>
      </div>
      <div className='list__item--row w200'>
        <p>{item.key}</p>
      </div>
      <div className='list__item--row wfull'>
        <p>{item.text}</p>
      </div>
      <div className='list__item--row wfull'>
        <a
          onClick={(e) => {
            e.preventDefault();
            onClickEdit();
          }}
        >
          Edit
        </a>
      </div>
    </div>
  );
};

export const ItemHeading = () => {
  return (
    <div className='list__item'>
      <div className='list__item--row w40 center'>
        <p className='item-heading'>No.</p>
      </div>
      <div className='list__item--row w200'>
        <p className='item-heading'>Key</p>
      </div>
      <div className='list__item--row wfull'>
        <p className='item-heading'>Text</p>
      </div>
      <div className='list__item--row wfull'>
        <p className='item-heading'>Action</p>
      </div>
    </div>
  );
};

export default Item;
