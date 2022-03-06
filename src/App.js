import React, { useState, useEffect } from 'react'
import QuoteContent from './components/quoteContent';
import './index.css';
import { COLORS } from './components/constants'


const App = () => {
  const [quotes, setQuotes] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState(true);

  useEffect(() => {
    // Runs after the first render() lifecycle
    try {
      CSS.registerProperty({
        name: '--color1',
        initialValue: COLORS[0],
        syntax: '<color>',
        inherits: false
      });
      CSS.registerProperty({
        name: '--color2',
        initialValue: COLORS[4],
        syntax: '<color>',
        inherits: false
      });
    } catch (e) {
      console.log(e)
    }
    fetchQuotes();
  }, []);

  function fetchQuotes() {
    return fetch('https://type.fit/api/quotes')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        setQuotes(responseJson);
        setLoadingStatus(false);
      })
      .catch((error) => {
        setQuotes([]);
        setLoadingStatus(false);
        console.error(error);
      });
  }

  return (
    <React.Fragment>
      {loadingStatus ? '' : quotes.length !== 0 ? <QuoteContent quotes={quotes} /> : ''}
    </React.Fragment>
  );
}

export default App;