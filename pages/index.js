import Head from 'next/head';
import dynamic from 'next/dynamic';

// Helper
import { Request } from '../http/http';

// Components
import Item, { ItemHeading } from '../components/list/Item';
import { ModalContent } from '../components/modal/Modal';

const Modal = dynamic(() => import('../components/modal/Modal'), {
  ssr: false,
});

export default function Home({ translation }) {
  const [data, setData] = React.useState(translation || []);
  const [showModal, setShowModal] = React.useState(false);
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState({});
  const [value, setValue] = React.useState('');
  const [key, setKey] = React.useState('');
  const [text, setText] = React.useState('');
  const [refreshing, setRefreshing] = React.useState(false);

  React.useEffect(() => {
    console.log(data, '=====> data');
  }, [data]);

  React.useEffect(() => {
    if (!showAddModal) {
      setKey('');
      setText('');
    }
  }, [showAddModal]);

  React.useEffect(() => {
    if (refreshing) {
      fetchContent('/api/translation');
    }
  }, [refreshing]);

  const fetchContent = async (url) => {
    setRefreshing(true);
    const res = await fetch(url);
    const data = await res.json();
    setData(data);
    setRefreshing(false);
  };

  const updateValue = async (body) => {
    const url = '/api/translation';
    const res = await fetch(url, {
      method: 'PATCH',
      body: JSON.stringify(body),
    });
    const data = await res.json();
    alert(data.message);
    setShowModal(false);
    setShowAddModal(false);
  };

  const onRefreshHandler = () => {
    setRefreshing(true);
  };
  return (
    <div>
      <Head>
        <title>FITCO WCMS</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='home__section'>
        <h1>Translation</h1>
        <ItemHeading />
        {data.map((item, index) => {
          return (
            <Item
              item={item}
              key={index}
              index={index}
              onClickEdit={() => {
                setShowModal(true);
                setSelectedItem(item);
                setValue(item.text);
              }}
            />
          );
        })}
        <a
          className='btn mtop2 mright1'
          onClick={(e) => {
            e.preventDefault();
            setShowAddModal(true);
          }}
        >
          + Add new translation
        </a>
        <a
          className='btn mtop2'
          onClick={(e) => {
            e.preventDefault();
            onRefreshHandler();
          }}
        >
          Refresh
        </a>
      </div>

      {showModal && (
        <Modal>
          <ModalContent
            onCloseModal={() => {
              setShowModal(false);
            }}
          >
            <h3>Edit Text</h3>
            <form>
              <input
                type='text'
                name='name'
                className='question'
                id='nme'
                required
                autoComplete='off'
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                }}
              />
              <label htmlFor='nme'>
                <span>{selectedItem.key}</span>
              </label>
            </form>
            <div className='action__group'>
              <a
                className='btn mtop2 mright1'
                onClick={(e) => {
                  e.preventDefault();
                  const body = {
                    [selectedItem.key]: value,
                  };
                  updateValue(body);
                }}
              >
                Edit Translation
              </a>
              <a
                className='btn'
                onClick={(e) => {
                  e.preventDefault();
                  setShowModal(false);
                }}
              >
                Close
              </a>
            </div>
          </ModalContent>
        </Modal>
      )}

      {showAddModal && (
        <Modal>
          <ModalContent
            onCloseModal={() => {
              setShowAddModal(false);
            }}
          >
            <h3>Add new translation</h3>
            <form>
              <div className='mbot1'>
                <input
                  type='text'
                  name='name'
                  className='question mbot1'
                  id='kkey'
                  required
                  autoComplete='off'
                  value={key}
                  onChange={(e) => {
                    setKey(e.target.value);
                  }}
                />
                <label htmlFor='kkey'>
                  <span>Key</span>
                </label>
              </div>
              <input
                type='text'
                name='name'
                className='question'
                id='val'
                required
                autoComplete='off'
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                }}
              />
              <label htmlFor='val'>
                <span>Value</span>
              </label>
            </form>
            <div className='action__group'>
              <a
                className='btn mtop2 mright1'
                onClick={(e) => {
                  e.preventDefault();
                  const body = {
                    [key]: text,
                  };
                  updateValue(body);
                }}
              >
                Add Translation
              </a>
              <a
                className='btn'
                onClick={(e) => {
                  e.preventDefault();
                  setShowAddModal(false);
                }}
              >
                Close
              </a>
            </div>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  const url = '/api/static/file/translation';
  const params = {
    format: 'array',
  };
  const { data } = await Request(url, 'GET', params, {}, {});
  console.log(data, '==== SERVER SIDE');
  return {
    props: {
      translation: data,
    },
  };
}
