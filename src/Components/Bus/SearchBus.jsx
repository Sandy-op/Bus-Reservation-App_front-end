import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../Styles/SearchBus.css';

export default function SearchBus() {
  let [from, setFrom] = useState("");
  let [to, setTo] = useState("");
  let [dateOfDeparture, setDate] = useState("");
  let [buses, setBuses] = useState([]);
  let [fromSuggestions, setFromSuggestions] = useState([]);
  let [toSuggestions, setToSuggestions] = useState([]);
  let [searched, setSearched] = useState(false); // New state to check if a search was performed
  let navigate = useNavigate();

  const fromInputRef = useRef();
  const toInputRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (fromInputRef.current && !fromInputRef.current.contains(event.target)) {
        setFromSuggestions([]);
      }
      if (toInputRef.current && !toInputRef.current.contains(event.target)) {
        setToSuggestions([]);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fetchPlaces = (input, setSuggestions) => {
    if (input.length > 0) {
      axios.get(`https://nominatim.openstreetmap.org/search`, {
        params: {
          q: input,
          format: 'json',
          addressdetails: 1,
          limit: 10,
          countrycodes: 'IN',
        }
      })
      .then((res) => {
        const cities = res.data.filter((place) =>
          place.type === 'city' || 
          place.type === 'state' ||
          place.type === 'administrative'
        );
        setSuggestions(cities);
      })
      .catch((err) => {
        console.log(err);
      });
    } else {
      setSuggestions([]);
    }
  };

  const handleFromChange = (e) => {
    setFrom(e.target.value);
    fetchPlaces(e.target.value, setFromSuggestions);
  };

  const handleToChange = (e) => {
    setTo(e.target.value);
    fetchPlaces(e.target.value, setToSuggestions);
  };

  const handleSuggestionClick = (suggestion, setFunction, setSuggestions) => {
    setFunction(suggestion.display_name);
    setSuggestions([]);
  };

  function searchBus(e) {
    e.preventDefault();
    axios.get(`http://localhost:8080/api/buses/find?from=${from}&to=${to}&dateOfDeparture=${dateOfDeparture}`)
      .then(res => {
        console.log(res.data.data);
        setBuses(res.data.data);
        setSearched(true); 
        setFromSuggestions([]);
        setToSuggestions([]);
      })
      .catch((err) => {
        console.log(err);
        setSearched(true);
      });
  }

  function bookbus(id) {
    navigate(`/bookbus/${id}`);
  }

  return (
    <div className='SearchBus'>
      <form onSubmit={searchBus} action="">
        <div className="input-container" ref={fromInputRef}>
          <input type="text" required value={from} onChange={handleFromChange} placeholder='Enter the From Location' />
          {fromSuggestions.length > 0 && (
            <ul className="dropdown">
              {fromSuggestions.map((suggestion, index) => (
                <li key={index} className="dropdown-item" onClick={() => handleSuggestionClick(suggestion, setFrom, setFromSuggestions)}>
                  {suggestion.display_name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="input-container" ref={toInputRef}>
          <input type="text" required value={to} onChange={handleToChange} placeholder='Enter the To Location' />
          {toSuggestions.length > 0 && (
            <ul className="dropdown">
              {toSuggestions.map((suggestion, index) => (
                <li key={index} className="dropdown-item" onClick={() => handleSuggestionClick(suggestion, setTo, setToSuggestions)}>
                  {suggestion.display_name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <input type="date" required value={dateOfDeparture} onChange={(e) => { setDate(e.target.value) }} placeholder='Enter the Date of Departure ' />
        <button>Search</button>
      </form>
      {searched && buses.length === 0 ? (
        <h2 style={{ margin: "15px", color: "red"}}>No buses available for this route</h2>
      ) : (
        <div>
          {buses.map((item) => (
            <div className="bus_list" key={item.id}>
              <h4>{item.name}</h4>
              <i>Seats : {item.seats}</i>
              <p>From : {item.from}</p>
              <p>To : {item.to}</p>
              <p>Date : {item.dateOfDeparture}</p>
              <span>Bus Number : {item.bus_number}</span>
              <button className='btn btn-danger' onClick={() => { bookbus(item.id) }}>Book Bus</button>
            </div>
          ))}
        </div>
      )}
      <h1 style={{ margin: "15px" }}>Bus Booking Discount Offers</h1>
    </div>
  );
}
