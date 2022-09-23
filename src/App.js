import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [namesList, setNamesList] = useState([]);
  const baseUrl = 'http://localhost:4000';

  return (
    <div className="App" data-test-id="guest">
      <br />
      <div>
        <form
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          First Name:
          <input
            placeholder="First Name"
            value={firstName}
            onChange={(event) => {
              setFirstName(event.currentTarget.value);
            }}
          />
          <br />
          Last Name:
          <input
            placeholder="Last Name"
            value={lastName}
            onChange={(event) => {
              setLastName(event.currentTarget.value);
            }}
          />
          <br />
          <button
            onClick={() =>
              setNamesList([...namesList, `${firstName} ${lastName}`])
            }
          >
            {' '}
            Add to Guest List{' '}
          </button>
        </form>
      </div>
      <div>
        <h2> Guest List </h2>
        {namesList.map((nameList) => {
          return (
            <div key={nameList}>
              <div>{nameList}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;

// useEffect
