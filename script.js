const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');




let apiQuotes = [];

//Show New Quote
function newQuote(){

	// Pick a randome quote from apiQuotes array
	const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  // Check if Author field is blank and replace it with 'Unknown'
	if (!quote.author) {

		authorText.textContent = 'Unknown';

	}	else {

		authorText.textContent = quote.author;

	}

	// Check Quote length to determine styling

	if (quote.text.length > 120) {

		quoteText.classList.add('long-quote');

	} else {

		quoteText.classList.remove('long-quote');

	}

	quoteText.textContent = quote.text;


	// Pick a randome quote from localQuotes array
	// const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
  // console.log(quote);

}


// Get Quotes From Api

async function getQuotes() {
	const apiUrl = 'https://type.fit/api/quotes';

	try {

		const response = await fetch(apiUrl);
		apiQuotes = await response.json();
		newQuote();

	} catch(error) {
		alert(error);
		//Catch Erro Here
	}
}

// Tweet Quote

function tweetQuote() {

	const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
	window.open(twitterUrl, '_blanck');

}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuotes();


// LocalQuote On Load
// newQuote();