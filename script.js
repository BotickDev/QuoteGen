const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');


let apiQuotes = [];


function showLoadingSpinner() {
	loader.hidden = false;
	quoteContainer.hidden = true;
}


function removeLoadingSpinner() {
	quoteContainer.hidden = false;
	loader.hidden = true;
}

//Show New Quote
function newQuote(){

	showLoadingSpinner();

	// Pick a randome quote from apiQuotes array
	const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  // Check if Author field is blank and replace it with 'Unknown'
	if (!quote.author) {
		authorText.textContent = 'Unknown';
	}	else {
		authorText.textContent = quote.author;
	}

	// Check Quote length to determine styling
	if (quote.text.length > 60) {
		quoteText.classList.add('long-quote');
	} else {
		quoteText.classList.remove('long-quote');

	}

	// Set Quote, Hide Loader
	quoteText.textContent = quote.text;
	removeLoadingSpinner() ;

	// Pick a randome quote from localQuotes array
	// const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
  // console.log(quote);

}



// Get Quotes From Api

async function getQuote() {

	showLoadingSpinner();

	const apiUrl = 'https://type.fit/api/quotes';

	try {

		const response = await fetch(apiUrl);
		apiQuotes = await response.json();
		newQuote();
	} catch(error) {
		console.log('whoops,no quote', error);
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

getQuote();


// LocalQuote On Load
// newQuote();