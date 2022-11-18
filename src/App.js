import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const baseUrl = 'http://localhost:4000';
  const [guests, setGuests] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  const [checkBoxValue, setCheckBoxValue] = useState(false);

  async function fetchGuest() {
    const response = await fetch(`${baseUrl}/guests`);
    const allGuests = await response.json();

    setGuests(allGuests);
  }

  useEffect(() => {
    fetchGuest().catch(() => {});
  }, []);

  // LOADING: ~1:17:00

  // useEffect(() => {
  //   if (guests) {
  //     setIsLoading(false);
  //   }
  // }, [guests]);
  // if (isLoading) return <div>is Loading</div>;

  async function postGuest() {
    const response = await fetch(`${baseUrl}/guests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
      }),
    });
    const createdGuest = await response.json();
    console.log(createdGuest);
    setGuests([...guests, createdGuest]);
  }

  async function updateGuest() {
    const response = await fetch(`${baseUrl}/guests/1`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ attending: true }),
    });
    const updatedGuest = await response.json();
  }

  useEffect(() => {
    updateGuest().catch(() => {});
  }, []);

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
          <br />
          <button onClick={() => postGuest()}> Add to Guest List </button>
        </form>
      </div>
      <div>
        <h2> Guest List </h2>
        <u> Name | Attending </u>
        {guests.map((guest) => {
          return (
            <div key={guest.id}>
              <div>
                {guest.firstName} {guest.lastName}{' '}
                <input
                  checked={checkBoxValue}
                  type="checkbox"
                  // aria-label= `${firstName} ${lastName attending status`
                  onChange={(event) =>
                    setCheckBoxValue(event.currentTarget.checked)
                  }
                />
                <button> remove </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;

// useEffect
