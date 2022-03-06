import React, { useState, useEffect } from 'react';
import { COLORS } from './constants'
import '../index.css'


const QuoteContent = ({ quotes }) => {
  const [randomQuote, setRandomQuote] = useState({});
  const [fadeProp, setFadeProp] = useState({ fade: 'fade-out' });
  const [colorIndexProp, setColorIndexProp] = useState(0);
  const [quoteBoxHeight, setQuoteBoxHeight] = useState(120);
  let textHeight = 0;
  try {
    textHeight = document.getElementById('dummy-text').scrollHeight;
  } catch (e) {
    console.log(e);
  }

  let authorHeight = 0;
  try {
    authorHeight = document.getElementById('author').scrollHeight;
  } catch (e) {
    console.log(e);
  }

  let buttonsHeight = 0;
  try {
    buttonsHeight = document.getElementsByClassName('buttons')[0].scrollHeight;
  } catch (e) {
    console.log(e);
  }

  // get quote on first load
  useEffect(() => {
    getQuote(quotes);
  }, []);

  // fade in on first load
  useEffect(() => {
    const t = setTimeout(() => {
      setFadeProp({
        fade: 'fade-in'
      })
    }, 1000);
    return () => clearInterval(t)
  }, [fadeProp])

  // set quote box height based on dummy hidden text
  useEffect(() => {
    setQuoteBoxHeight(Math.max(textHeight + authorHeight + buttonsHeight - 50, 120));
    console.log(`Quote Box target height: ${quoteBoxHeight}`);
  }, [textHeight]);

  // define delay function for async functions by piggybacking Promise
  const delay = ms => new Promise(res => setTimeout(res, ms));

  // get a random quote from JSON
  const getQuote = async (quotes) => {
    setFadeProp({ fade: 'fade-out' });
    await delay(500)

    let newColorIndex;
    // get random colorIndex
    do {
      newColorIndex = Math.floor(Math.random() * COLORS.length);
    } while (newColorIndex === colorIndexProp);
    setColorIndexProp(newColorIndex);
    document.querySelector('body').style.setProperty('--color1', COLORS[(colorIndexProp + 1) % COLORS.length]);
    document.querySelector('body').style.setProperty('--color2', COLORS[(colorIndexProp + Math.floor(Math.random() * COLORS.length)) % COLORS.length]);
    const buttonElements = document.getElementsByClassName('button');
    for (let i = 0, len = buttonElements.length; i < len; i++) {
      buttonElements[i].style.setProperty('--color1', COLORS[(colorIndexProp + 1) % COLORS.length]);
    }

    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    const text = randomQuote.text;
    const author = (randomQuote.author === "" || randomQuote.author === null) ? "Anonymous" : randomQuote.author;

    setRandomQuote(prevRandomQuote => {
      return {
        text: text,
        author: author
      };
    });
  }

  return (
    <React.Fragment>
      <div id="quote-content" className={"quote-content " + fadeProp.fade} style={{ height: quoteBoxHeight }}>
        <div className="inverted-comma">
        </div>
        <div id="text" className="text">{randomQuote.text}</div>
        <div id="author" className="author">{randomQuote.author}</div>
      </div>
      <div className="buttons">
        <a id="tweet-quote" className="tweet-quote button icon" href={`https://twitter.com/intent/tweet?text="${encodeURIComponent(randomQuote.text)}" — ${encodeURIComponent(randomQuote.author)}`}>
          <div><svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24">
            <title>Twitter</title>
            <path
              d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z">
            </path>
          </svg></div>
        </a>
        <div id="new-quote" className="new-quote button" onClick={() => getQuote(quotes)}>New Quote</div>
      </div>
      <div id="dummy-text" className="text">{randomQuote.text}</div>
    </React.Fragment>
  );
}

export default QuoteContent;