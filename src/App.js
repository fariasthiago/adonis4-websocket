import './App.css';
import { useState, useEffect } from 'react';
import connection from './lib/socket';
import { ROOM_CREATE } from './actions';

function App() {
  const [data, setData] = useState({});

  var subscription = '';

  useEffect(() => {
    connection.connect();

    // storing the subscription in the global variable
    // passing the incoming data handler fn as a second argument
    subscription = connection.subscribe(`socket-attendance`, handleMessageAdd);

    // loading existing messages
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const room = await ROOM_CREATE();
      setData({messages: room.rows});
    } catch (error) {
      alert(error)
    }
  };

  function handleMessageAdd (message) {
    const { type, data } = message;

    // you could handle various types here, like deleting or editing a message
    switch (type) {
      case 'socket-attendance:newMessage':
        setData(prevState => ({
          messages: [...prevState.messages, data]
        }));
        break;

      case 'socket-attendance:update':
        // ATUALIZA AQUI O ATENDIMENTO

        // setData(prevState => ({
        //   messages: [...prevState.messages, data]
        // }));
        break;
      default:

    }
  };


  return (
    <div className="App">
      <header className="App-header">
        {data.messages !== undefined && data.messages.length > 0 &&
          data.messages.map(item => (
            <div key={item.id}>{item.id} - {item.status}</div>
        ))}    
      </header>
    </div>
  );
}

export default App;
