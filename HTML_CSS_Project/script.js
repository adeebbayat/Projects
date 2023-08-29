// Greetings based on time

var dateGreeting = Date();
if (dateGreeting[16] + dateGreeting[17] < 12) {
  var greetingPlace = document.querySelector("#greeting");
  greetingPlace.innerText = "Good Morning!";
}
if (
  dateGreeting[16] + dateGreeting[17] < 17 &&
  dateGreeting[16] + dateGreeting[17] >= 12
) {
  var greetingPlace = document.querySelector("#greeting");
  greetingPlace.innerText = "Good Afternoon!";
}
if (
  dateGreeting[16] + dateGreeting[17] < 24 &&
  dateGreeting[16] + dateGreeting[17] >= 17
) {
  var greetingPlace = document.querySelector("#greeting");
  greetingPlace.innerText = "Good Evening!";
}

function greeting() {
  var dateGreeting = Date();
  if (dateGreeting[16] + dateGreeting[17] < 12) {
    var greetingName = "Good Morning";
  }
  if (
    dateGreeting[16] + dateGreeting[17] < 17 &&
    dateGreeting[16] + dateGreeting[17] >= 12
  ) {
    var greetingName = "Good Afternoon";
  }
  if (
    dateGreeting[16] + dateGreeting[17] < 24 &&
    dateGreeting[16] + dateGreeting[17] >= 17
  ) {
    var greetingName = "Good Evening";
  }
  return greetingName;
}

// Login

function goToCurrentBalance(){
  
  if(document.querySelector("#oneDay").innerText == "1D" && document.querySelector("#loginButton").innerText == "Logout"){
    alert("Already on Current Balance Page")
    return;
  }
  if (document.querySelector("#loginButton").innerText == "Login") {
    alert("Log In to View Balance History")
    return;
}
  if (document.querySelector("#loginButton").innerText == "Logout") {
    reproduceOriginalContent();
    var greetingName = greeting()
    var username = "User";
    var name1 = document.querySelector("#greeting");
    name1.innerText =
      greetingName +"!";
    var login1 = document.querySelector("#loginButton");
    login1.innerText = "Logout";
    var currentBalance = document.querySelector("#currentBalance");
    currentBalance.innerText = "Current Balance: $2,560,000.00";
    

    // Graph
    var trace1 = {
      x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      y: [
        0, 10000, 20000, 40000, 80000, 160000, 320000, 640000, 1280000, 2560000,
      ],
      type: "line",
    };

    var data = [trace1];
    var layout = {
      autosize: false,
      width: 500,
      height: 300,
      margin: {
        l: 0,
        r: 0,
        b: 0,
        t: 0,
        pad: 0,
      },
    };

    Plotly.newPlot("bigGraph", data, layout, { displayModeBar: false });

    var mainHiLo = document.querySelector("#belowGraphHiLo");
    mainHiLo.innerText = "Hi: $2,560,000 Lo: $0";

}}

function reproduceOriginalContent(){
  var greetingRemove = document.querySelector("#greeting");
  var currentBalanceRemove = document.querySelector("#currentBalance");
  var belowGraphHiLoRemove = document.querySelector("#belowGraphHiLo");
  var oneDayRemove = document.querySelector("#oneDay");
  var oneWeekRemove = document.querySelector("#oneWeek");
  var oneMonthRemove = document.querySelector("#oneMonth");
  var threeMonthRemove = document.querySelector("#threeMonth");
  var oneYearRemove = document.querySelector("#oneYear");
  var twoYearRemove = document.querySelector("#twoYear");
  var maxRemove = document.querySelector("#max");
  
  oneDayRemove.innerText = "1D";
  oneWeekRemove.innerText = "1W";
  oneMonthRemove.innerText = "1M";
  threeMonthRemove.innerText = "3M";
  oneYearRemove.innerText = "1Y";
  twoYearRemove.innerText = "2Y";
  maxRemove.innerText = "Max";
  currentBalanceRemove.innerText = `Current Balance: $2,560,000`;
  
}

function login() {
  reproduceOriginalContent();
  var greetingName = greeting();

  if (document.querySelector("#loginButton").innerText == "Login") {
    var username = prompt("Input Username:");
    var name1 = document.querySelector("#greeting");
    var firstLetter = username[0].toUpperCase();
    name1.innerText =
      greetingName + ", " + firstLetter + username.slice(1) + "!";
    var login1 = document.querySelector("#loginButton");
    login1.innerText = "Logout";
    var currentBalance = document.querySelector("#currentBalance");
    
    currentBalance.innerText = "Current Balance: $2,560,000.00";
    alert(`Welcome, ${firstLetter}${username.slice(1)}!`);

    // Graph
    var trace1 = {
      x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      y: [
        0, 10000, 20000, 40000, 80000, 160000, 320000, 640000, 1280000, 2560000,
      ],
      type: "line",
    };

    var data = [trace1];
    var layout = {
      autosize: false,
      width: 500,
      height: 300,
      margin: {
        l: 0,
        r: 0,
        b: 0,
        t: 0,
        pad: 0,
      },
    };

    Plotly.newPlot("bigGraph", data, layout, { displayModeBar: false });

    var mainHiLo = document.querySelector("#belowGraphHiLo");
    mainHiLo.innerText = "Hi: $2,560,000 Lo: $0";

    return;
  }
  if (document.querySelector("#loginButton").innerText == "Logout") {
    var currentBalance = document.querySelector("#currentBalance");
    currentBalance.innerText = "Current Balance: Hidden";
    var login1 = document.querySelector("#loginButton");
    login1.innerText = "Login";
    var name1 = document.querySelector("#greeting");
    name1.innerText = greetingName + "!";
    alert("Logout Succesful!");
    // Graph
    var trace1 = {
      x: [],
      y: [],
      type: "line",
    };

    var data = [trace1];
    var layout = {
      autosize: false,
      width: 500,
      height: 300,
      margin: {
        l: 0,
        r: 0,
        b: 0,
        t: 0,
        pad: 0,
      },
    };

    Plotly.newPlot("bigGraph", data, layout, { displayModeBar: false });

    var mainHiLo = document.querySelector("#belowGraphHiLo");
    mainHiLo.innerText = "Hi: (Hidden) Lo: (Hidden)";
    
    return;
  }
}

// STOCK API FUNCTIONALITY
// Select Date

function errorDate() {
  var dayCount = String(new Date().getDate()-1).padStart(2, '0')
  var monthCount = String(new Date().getMonth() + 1).padStart(2, '0')
  var yearCount = new Date().getFullYear()

  var dateTrade = yearCount + "-" + monthCount + "-" + dayCount;
  console.log(document.getElementById("date").value[3])
  console.log(yearCount.toString()[3])
  if (document.getElementById("date").value[3] > yearCount.toString()[3] && document.getElementById("date").value[3] < 7){
    alert("Please Input a Date in the Past")
  }
  if (document.getElementById("date").value == []) {
    alert("Please Input Date");
  }
}
async function selectDate() {
  var date = document.getElementById("date").value;
  var d = new moment(date, "YYYY-MM-DD");
  console.log(d._i);
  date = d._i;
  return date;
}

// Load Data
// window.addEventListener("load", myInit, true);
// async function myInit(){
//     await loadPriceAapl();
//     await loadPriceSpy();
//     await loadPriceGme();
//     await chartSpy();
//     await chartAapl();
//     await chartGme();
// };

// Provide Date
// var date = "2023-08-01";

// Calling APIs
async function locatePriceSpy() {
  var date = await selectDate();
  var stockData = await fetch(
    `https://api.polygon.io/v2/aggs/ticker/SPY/range/1/minute/${date}/${date}?adjusted=true&sort=asc&limit=390&apiKey=Npq9lfTHeBXirHQuuAcbxAD67AynKWWB`
  );
  var data = await stockData.json();
  return data;
}

async function locatePriceAapl() {
  var date = await selectDate();
  var stockData = await fetch(
    `https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/minute/${date}/${date}?adjusted=true&sort=asc&limit=390&apiKey=Npq9lfTHeBXirHQuuAcbxAD67AynKWWB`
  );
  var data = await stockData.json();
  return data;
}

async function locatePriceGme() {
  var date = await selectDate();
  var stockData = await fetch(
    `https://api.polygon.io/v2/aggs/ticker/GME/range/1/minute/${date}/${date}?adjusted=true&sort=asc&limit=390&apiKey=Npq9lfTHeBXirHQuuAcbxAD67AynKWWB`
  );
  var data = await stockData.json();
  return data;
}

// Prices

// SPY Price

async function findPriceSpy() {
  // var stockData = await fetch(`https://api.polygon.io/v2/aggs/ticker/SPY/range/1/minute/2023-${date}/2023-${date}?adjusted=true&sort=asc&limit=390&apiKey=Npq9lfTHeBXirHQuuAcbxAD67AynKWWB`);
  // var data = await stockData.json();
  var data = await locatePriceSpy();
  var closingPrice = data.results[data.results.length - 1].c;
  return closingPrice;
}

async function loadPriceSpy() {
  var price = document.querySelector("#spyPrice");
  var priceActual = await findPriceSpy();
  price.innerText = "SPY: $" + Math.ceil(priceActual * 100) / 100;
}

// AAPL Price
async function findPriceAapl() {
  // var stockData = await fetch(`https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/minute/2023-${date}/2023-${date}?adjusted=true&sort=asc&limit=390&apiKey=Npq9lfTHeBXirHQuuAcbxAD67AynKWWB`);
  // var data = await stockData.json();
  var data = await locatePriceAapl();
  var closingPrice = data.results[data.results.length - 1].c;
  console.log(data.results[0].c);
  return closingPrice;
}

async function loadPriceAapl() {
  var price = document.querySelector("#aaplPrice");
  var priceActual = await findPriceAapl();
  price.innerText = "AAPL: $" + Math.ceil(priceActual * 100) / 100;
}

// GME Price

async function findPriceGme() {
  // var stockData = await fetch(`https://api.polygon.io/v2/aggs/ticker/GME/range/1/minute/2023-${date}/2023-${date}?adjusted=true&sort=asc&limit=390&apiKey=Npq9lfTHeBXirHQuuAcbxAD67AynKWWB`);
  // var data = await stockData.json();
  var data = await locatePriceGme();
  var closingPrice = data.results[data.results.length - 1].c;
  console.log(data.results[0].c);
  return closingPrice;
}

async function loadPriceGme() {
  var price = document.querySelector("#gmePrice");
  var priceActual = await findPriceGme();
  price.innerText = "GME: $" + Math.ceil(priceActual * 100) / 100;
}

// Charts

// Spy Chart

var trace1 = {
  x: [],
  y: [],
  type: "line",
};

var data = [trace1];
var layout = {
  autosize: false,
  width: 240,
  height: 100,
  margin: {
    l: 0,
    r: 0,
    b: 0,
    t: 0,
    pad: 0,
  },
};

Plotly.newPlot("spyChart", data, layout, { displayModeBar: false });

async function chartSpy() {
  var closePrice = [];
  // var stockData = await fetch(`https://api.polygon.io/v2/aggs/ticker/SPY/range/1/minute/2023-${date}/2023-${date}?adjusted=true&sort=asc&limit=390&apiKey=Npq9lfTHeBXirHQuuAcbxAD67AynKWWB`);
  // var data = await stockData.json();
  var data = await locatePriceSpy();
  for (var i = 0; i < data.count; i++) {
    closePrice[i] = data.results[i].c;
  }

  var xaxis = [];
  for (var i = 0; i < data.count; i++) {
    xaxis[i] = i + 1;
  }

  var trace1 = {
    x: xaxis,
    y: closePrice,
    type: "line",
  };

  var data = [trace1];
  var layout = {
    autosize: false,
    width: 240,
    height: 100,
    margin: {
      l: 0,
      r: 0,
      b: 0,
      t: 0,
      pad: 0,
    },
  };
  Plotly.newPlot("spyChart", data, layout, { displayModeBar: false });
}

// AAPL Chart

var trace1 = {
  x: [],
  y: [],
  type: "line",
};

var data = [trace1];
var layout = {
  autosize: false,
  width: 240,
  height: 100,
  margin: {
    l: 0,
    r: 0,
    b: 0,
    t: 0,
    pad: 0,
  },
};

Plotly.newPlot("aaplChart", data, layout, { displayModeBar: false });

async function chartAapl() {
  var closePrice = [];
  // var stockData = await fetch(`https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/minute/2023-${date}/2023-${date}?adjusted=true&sort=asc&limit=390&apiKey=Npq9lfTHeBXirHQuuAcbxAD67AynKWWB`);
  // var data = await stockData.json();
  var data = await locatePriceAapl();
  for (var i = 0; i < data.count; i++) {
    closePrice[i] = data.results[i].c;
  }

  var xaxis = [];
  for (var i = 0; i < data.count; i++) {
    xaxis[i] = i + 1;
  }

  var trace1 = {
    x: xaxis,
    y: closePrice,
    type: "line",
  };

  var data = [trace1];
  var layout = {
    autosize: false,
    width: 240,
    height: 100,
    margin: {
      l: 0,
      r: 0,
      b: 0,
      t: 0,
      pad: 0,
    },
  };
  Plotly.newPlot("aaplChart", data, layout, { displayModeBar: false });
}

// GME Chart

var trace1 = {
  x: [],
  y: [],
  type: "line",
};

var data = [trace1];
var layout = {
  autosize: false,
  width: 240,
  height: 100,
  margin: {
    l: 0,
    r: 0,
    b: 0,
    t: 0,
    pad: 0,
  },
};

Plotly.newPlot("gmeChart", data, layout, { displayModeBar: false });

async function chartGme() {
  var closePrice = [];
  // var stockData = await fetch(`https://api.polygon.io/v2/aggs/ticker/GME/range/1/minute/2023-${date}/2023-${date}?adjusted=true&sort=asc&limit=390&apiKey=Npq9lfTHeBXirHQuuAcbxAD67AynKWWB`);
  // var data = await stockData.json();
  var data = await locatePriceGme();
  for (var i = 0; i < data.count; i++) {
    closePrice[i] = data.results[i].c;
  }
  console.log(data);

  var xaxis = [];
  for (var i = 0; i < data.count; i++) {
    xaxis[i] = i + 1;
  }

  var trace1 = {
    x: xaxis,
    y: closePrice,
    type: "line",
  };

  var data = [trace1];
  var layout = {
    autosize: false,
    width: 240,
    height: 100,
    margin: {
      l: 0,
      r: 0,
      b: 0,
      t: 0,
      pad: 0,
    },
  };
  Plotly.newPlot("gmeChart", data, layout, { displayModeBar: false });
}

// Hi Lows
async function hiLoSpy() {
  var date = await selectDate();
  var stockData = await fetch(
    `https://api.polygon.io/v1/open-close/SPY/${date}?adjusted=true&apiKey=Npq9lfTHeBXirHQuuAcbxAD67AynKWWB`
  );
  var data = await stockData.json();
  var spyHiLo = document.querySelector("#stockHiLoSpy");
  spyHiLo.innerText = `Hi: $${Math.ceil(data.high * 100) / 100} Lo: $${
    Math.ceil(data.low * 100) / 100
  }`;
}

async function hiLoAapl() {
  var date = await selectDate();
  var stockData = await fetch(
    `https://api.polygon.io/v1/open-close/AAPL/${date}?adjusted=true&apiKey=Npq9lfTHeBXirHQuuAcbxAD67AynKWWB`
  );
  var data = await stockData.json();
  var spyHiLo = document.querySelector("#stockHiLoAapl");
  spyHiLo.innerText = `Hi: $${Math.ceil(data.high * 100) / 100} Lo: $${
    Math.ceil(data.low * 100) / 100
  }`;
}

async function hiLoGme() {
  var date = await selectDate();
  var stockData = await fetch(
    `https://api.polygon.io/v1/open-close/GME/${date}?adjusted=true&apiKey=Npq9lfTHeBXirHQuuAcbxAD67AynKWWB`
  );
  var data = await stockData.json();
  var spyHiLo = document.querySelector("#stockHiLoGme");
  spyHiLo.innerText = `Hi: $${Math.ceil(data.high * 100) / 100} Lo: $${
    Math.ceil(data.low * 100) / 100
  }`;
}

// Current Balance Graph

// 1D
function oneDay() {
  var trace1 = {
    x: [9, 10],
    y: [1280000, 2560000],
    type: "line",
  };

  var data = [trace1];
  var layout = {
    autosize: false,
    width: 500,
    height: 300,
    margin: {
      l: 0,
      r: 0,
      b: 0,
      t: 0,
      pad: 0,
    },
  };

  var loginText = document.querySelector("#loginButton");
  if (loginText.innerText == "Logout") {
    Plotly.newPlot("bigGraph", data, layout, { displayModeBar: false });
    var mainHiLo = document.querySelector("#belowGraphHiLo");
    mainHiLo.innerText = "Hi: $2,560,000 Lo: $1,280,000";
  }
  if (loginText.innerText == "Login") {
    alert("Log In to View Balance History");
  }
}

// 1W
function oneWeek() {
  var trace1 = {
    x: [8, 9, 10],
    y: [640000, 1280000, 2560000],
    type: "line",
  };

  var data = [trace1];
  var layout = {
    autosize: false,
    width: 500,
    height: 300,
    margin: {
      l: 0,
      r: 0,
      b: 0,
      t: 0,
      pad: 0,
    },
  };

  var loginText = document.querySelector("#loginButton");
  if (loginText.innerText == "Logout") {
    Plotly.newPlot("bigGraph", data, layout, { displayModeBar: false });
    var mainHiLo = document.querySelector("#belowGraphHiLo");
    mainHiLo.innerText = "Hi: $2,560,000 Lo: $640,000";
  }
  if (loginText.innerText == "Login") {
    alert("Log In to View Balance History");
  }
}

// 1M
function oneMonth() {
  var trace1 = {
    x: [7, 8, 9, 10],
    y: [320000, 640000, 1280000, 2560000],
    type: "line",
  };

  var data = [trace1];
  var layout = {
    autosize: false,
    width: 500,
    height: 300,
    margin: {
      l: 0,
      r: 0,
      b: 0,
      t: 0,
      pad: 0,
    },
  };

  var loginText = document.querySelector("#loginButton");
  if (loginText.innerText == "Logout") {
    Plotly.newPlot("bigGraph", data, layout, { displayModeBar: false });
    var mainHiLo = document.querySelector("#belowGraphHiLo");
    mainHiLo.innerText = "Hi: $2,560,000 Lo: $320,000";
  }
  if (loginText.innerText == "Login") {
    alert("Log In to View Balance History");
  }
}

// 3M
function threeMonth() {
  var trace1 = {
    x: [6, 7, 8, 9, 10],
    y: [160000, 320000, 640000, 1280000, 2560000],
    type: "line",
  };

  var data = [trace1];
  var layout = {
    autosize: false,
    width: 500,
    height: 300,
    margin: {
      l: 0,
      r: 0,
      b: 0,
      t: 0,
      pad: 0,
    },
  };

  var loginText = document.querySelector("#loginButton");
  if (loginText.innerText == "Logout") {
    Plotly.newPlot("bigGraph", data, layout, { displayModeBar: false });
    var mainHiLo = document.querySelector("#belowGraphHiLo");
    mainHiLo.innerText = "Hi: $2,560,000 Lo: $160,000";
  }
  if (loginText.innerText == "Login") {
    alert("Log In to View Balance History");
  }
}

// 1Y
function oneYear() {
  var trace1 = {
    x: [5, 6, 7, 8, 9, 10],
    y: [80000, 160000, 320000, 640000, 1280000, 2560000],
    type: "line",
  };

  var data = [trace1];
  var layout = {
    autosize: false,
    width: 500,
    height: 300,
    margin: {
      l: 0,
      r: 0,
      b: 0,
      t: 0,
      pad: 0,
    },
  };

  var loginText = document.querySelector("#loginButton");
  if (loginText.innerText == "Logout") {
    Plotly.newPlot("bigGraph", data, layout, { displayModeBar: false });
    var mainHiLo = document.querySelector("#belowGraphHiLo");
    mainHiLo.innerText = "Hi: $2,560,000 Lo: $80,000";
  }
  if (loginText.innerText == "Login") {
    alert("Log In to View Balance History");
  }
}

// 5Y
function fiveYear() {
  var trace1 = {
    x: [3, 4, 5, 6, 7, 8, 9, 10],
    y: [20000, 40000, 80000, 160000, 320000, 640000, 1280000, 2560000],
    type: "line",
  };

  var data = [trace1];
  var layout = {
    autosize: false,
    width: 500,
    height: 300,
    margin: {
      l: 0,
      r: 0,
      b: 0,
      t: 0,
      pad: 0,
    },
  };

  var loginText = document.querySelector("#loginButton");
  if (loginText.innerText == "Logout") {
    Plotly.newPlot("bigGraph", data, layout, { displayModeBar: false });
    var mainHiLo = document.querySelector("#belowGraphHiLo");
    mainHiLo.innerText = "Hi: $2,560,000 Lo: $20,000";
  }
  if (loginText.innerText == "Login") {
    alert("Log In to View Balance History");
  }
}

// Max
function max() {
  var trace1 = {
    x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    y: [
      0, 10000, 20000, 40000, 80000, 160000, 320000, 640000, 1280000, 2560000,
    ],
    type: "line",
  };

  var data = [trace1];
  var layout = {
    autosize: false,
    width: 500,
    height: 300,
    margin: {
      l: 0,
      r: 0,
      b: 0,
      t: 0,
      pad: 0,
    },
  };

  var loginText = document.querySelector("#loginButton");
  if (loginText.innerText == "Logout") {
    Plotly.newPlot("bigGraph", data, layout, { displayModeBar: false });
    var mainHiLo = document.querySelector("#belowGraphHiLo");
    mainHiLo.innerText = "Hi: $2,560,000 Lo: $0";
  }
  if (loginText.innerText == "Login") {
    alert("Log In to View Balance History");
  }
}
// Initial Graph of Nothing
var trace1 = {
  x: [],
  y: [],
  type: "line",
};

var data = [trace1];
var layout = {
  autosize: false,
  width: 500,
  height: 300,
  margin: {
    l: 0,
    r: 0,
    b: 0,
    t: 0,
    pad: 0,
  },
};

Plotly.newPlot("bigGraph", data, layout, { displayModeBar: false });



// tradeSmall Button

async function tradeSpy() {
  var dayCount = String(new Date().getDate()).padStart(2, '0')
  var monthCount = String(new Date().getMonth() + 1).padStart(2, '0')
  var yearCount = new Date().getFullYear()

  var dateTrade = yearCount + "-" + monthCount + "-" + dayCount;
  var loginText = document.querySelector("#loginButton");
  if (loginText.innerText == "Logout") {
    var stockTrade = "SPY";
    var stockDataTrade = await fetch(
      `https://api.polygon.io/v2/aggs/ticker/${stockTrade}/range/1/minute/${dateTrade}/${dateTrade}?adjusted=true&sort=asc&limit=390&apiKey=Npq9lfTHeBXirHQuuAcbxAD67AynKWWB`
    );
    var dataTrade = await stockDataTrade.json();
    var sharesTrade =
      prompt(`Enter How Many Shares of $${stockTrade} to Purchase: 
(${stockTrade} Current Price: $${dataTrade.results[0].c})`);
    alert("Trade will cost $" + dataTrade.results[0].c * sharesTrade);
  }
  if (loginText.innerText == "Login") {
    alert("Must be Logged In to Trade");
  }
}

async function tradeAapl() {
  var dayCount = String(new Date().getDate()).padStart(2, '0')
  var monthCount = String(new Date().getMonth() + 1).padStart(2, '0')
  var yearCount = new Date().getFullYear()

  var dateTrade = yearCount + "-" + monthCount + "-" + dayCount;
  var loginText = document.querySelector("#loginButton");
  if (loginText.innerText == "Logout") {
    var stockTrade = "AAPL";
    var stockDataTrade = await fetch(
      `https://api.polygon.io/v2/aggs/ticker/${stockTrade}/range/1/minute/${dateTrade}/${dateTrade}?adjusted=true&sort=asc&limit=390&apiKey=Npq9lfTHeBXirHQuuAcbxAD67AynKWWB`
    );
    var dataTrade = await stockDataTrade.json();
    var sharesTrade =
      prompt(`Enter How Many Shares of $${stockTrade} to Purchase: 
(${stockTrade} Current Price: $${dataTrade.results[0].c})`);
    alert("Trade will cost $" + dataTrade.results[0].c * sharesTrade);
  }
  if (loginText.innerText == "Login") {
    alert("Must be Logged In to Trade");
  }
}

async function tradeGme() {
  var dayCount = String(new Date().getDate()).padStart(2, '0')
  var monthCount = String(new Date().getMonth() + 1).padStart(2, '0')
  var yearCount = new Date().getFullYear()

  var dateTrade = yearCount + "-" + monthCount + "-" + dayCount;
  
  var loginText = document.querySelector("#loginButton");
  if (loginText.innerText == "Logout") {
    var stockTrade = "GME";
    var stockDataTrade = await fetch(
      `https://api.polygon.io/v2/aggs/ticker/${stockTrade}/range/1/minute/${dateTrade}/${dateTrade}?adjusted=true&sort=asc&limit=390&apiKey=Npq9lfTHeBXirHQuuAcbxAD67AynKWWB`
    );
    var dataTrade = await stockDataTrade.json();
    var sharesTrade =
      prompt(`Enter How Many Shares of $${stockTrade} to Purchase: 
(${stockTrade} Current Price: $${dataTrade.results[0].c})`);
    alert("Trade will cost $" + dataTrade.results[0].c * sharesTrade);
  }
  if (loginText.innerText == "Login") {
    alert("Must be Logged In to Trade");
  }
}

// Market is Up/Down
var isUpOrDown = Math.random();
if (isUpOrDown < 0.5) {
  var upDown = document.querySelector("#textnode");
  upDown.innerText = "Down";
  upDown.style.color = "red";
  upDown.style.margin = "35px 0px 0px 0px";
}

var speed = 1000;
var t = setInterval(function () {
  var slideSource = document.getElementById("textnode");
  slideSource.classList.toggle("fade");
}, speed);
// Highlighting

function highlightTrade() {
  var tradeVar = document.querySelector("#trade");
  tradeVar.style.background = "rgb(235,235,235)";
}
function unhighlightTrade() {
  var tradeVar = document.querySelector("#trade");
  tradeVar.style.background = "rgb(245,245,245)";
}

function highlight(element) {
  element.style.background = "rgb(235,235,235)";
}

function unhighlight(element) {
  element.style.background = "rgb(245,245,245)";
}

function unhighlightWhite(element) {
  element.style.background = "rgb(255,255,255)";
}

// Stock Viewer

function submitStock() {
  var submitStockA = document.querySelector('input[name="stockName"]').value;
  return submitStockA;
}
async function stockView() {
  if (submitStock() == []) {
    alert("Please Input Stock Ticker");
    return;
  }
  
  var dayCount = String(new Date().getDate()-1).padStart(2, '0')
  var monthCount = String(new Date().getMonth() + 1).padStart(2, '0')
  var yearCount = new Date().getFullYear()

  var trueDate = yearCount + "-" + monthCount + "-" + dayCount;


  var greetingRemove = document.querySelector("#greeting");
  var currentBalanceRemove = document.querySelector("#currentBalance");
  var belowGraphHiLoRemove = document.querySelector("#belowGraphHiLo");
  var oneDayRemove = document.querySelector("#oneDay");
  var oneWeekRemove = document.querySelector("#oneWeek");
  var oneMonthRemove = document.querySelector("#oneMonth");
  var threeMonthRemove = document.querySelector("#threeMonth");
  var oneYearRemove = document.querySelector("#oneYear");
  var twoYearRemove = document.querySelector("#twoYear");
  var maxRemove = document.querySelector("#max");

  oneDayRemove.innerText = "";
  oneWeekRemove.innerText = "";
  oneMonthRemove.innerText = "";
  threeMonthRemove.innerText = "";
  oneYearRemove.innerText = "";
  twoYearRemove.innerText = "";
  maxRemove.innerText = "";
  currentBalanceRemove.innerText = `Graph for ${trueDate}`;
  

  var closePrice = [];
  var stockData = await fetch(
    `https://api.polygon.io/v2/aggs/ticker/${submitStock().toUpperCase()}/range/1/minute/${trueDate}/${trueDate}?adjusted=true&sort=asc&limit=390&apiKey=Npq9lfTHeBXirHQuuAcbxAD67AynKWWB`
  );
  var data = await stockData.json();
  for (var i = 0; i < data.count; i++) {
    closePrice[i] = data.results[i].c;
  }

  var xaxis = [];
  for (var i = 0; i < data.count; i++) {
    xaxis[i] = i + 1;
  }

  var trace1 = {
    x: xaxis,
    y: closePrice,
    type: "line",
  };

  var data = [trace1];
  var layout = {
    autosize: false,
    width: 550,
    height: 350,
    margin: {
      l: 0,
      r: 0,
      b: 0,
      t: 0,
      pad: 0,
    },
  };

  var stockDataExtra = await fetch(
    `https://api.polygon.io/v1/open-close/${submitStock().toUpperCase()}/${trueDate}?adjusted=true&apiKey=Npq9lfTHeBXirHQuuAcbxAD67AynKWWB`
  );
  var dataExtra = await stockDataExtra.json();

  belowGraphHiLoRemove.innerText = `Hi: $${
    Math.ceil(dataExtra.high * 100) / 100
  } Lo: $${Math.ceil(dataExtra.low * 100) / 100}`;
  greetingRemove.innerText = `${submitStock().toUpperCase()}: $${Math.ceil(closePrice[closePrice.length-1] * 100) / 100}`;
  Plotly.newPlot("bigGraph", data, layout, { displayModeBar: false });
}


// Trade

async function trade() {
  var dayCount = String(new Date().getDate()).padStart(2, '0')
  var monthCount = String(new Date().getMonth() + 1).padStart(2, '0')
  var yearCount = new Date().getFullYear()

  var dateTrade = yearCount + "-" + monthCount + "-" + dayCount;
  
      var loginText = document.querySelector("#loginButton");
      if (loginText.innerText == "Logout") {
        var stockTrade = prompt("Enter Which Stock to Purchase:");
        stockTrade = stockTrade.toUpperCase();
        var stockDataTrade = await fetch(
          `https://api.polygon.io/v2/aggs/ticker/${stockTrade}/range/1/minute/${dateTrade}/${dateTrade}?adjusted=true&sort=asc&limit=390&apiKey=Npq9lfTHeBXirHQuuAcbxAD67AynKWWB`
        );
        var dataTrade = await stockDataTrade.json();
        var sharesTrade =
          prompt(`Enter How Many Shares of $${stockTrade} to Purchase: 
(${stockTrade} Current Price: $${dataTrade.results[0].c})`);
        alert("Trade will cost $" + Math.ceil(dataTrade.results[0].c * sharesTrade * 100) / 100);
      }
      if (loginText.innerText == "Login") {
        alert("Must be Logged In to Trade");
      }
}

async function tradeKnownStock(){

  
  var dayCount = String(new Date().getDate()-1).padStart(2, '0')
  var monthCount = String(new Date().getMonth() + 1).padStart(2, '0')
  var yearCount = new Date().getFullYear()

  var dateTrade = yearCount + "-" + monthCount + "-" + dayCount;
    var loginText = document.querySelector("#loginButton");
        if (loginText.innerText == "Logout") {
          var stockDataTrade = await fetch(
            `https://api.polygon.io/v2/aggs/ticker/${submitStock().toUpperCase()}/range/1/minute/${dateTrade}/${dateTrade}?adjusted=true&sort=asc&limit=390&apiKey=Npq9lfTHeBXirHQuuAcbxAD67AynKWWB`
          );
          var dataTrade = await stockDataTrade.json();
          var sharesTrade =
            prompt(`Enter How Many Shares of $${submitStock().toUpperCase()} to Purchase: 
(${submitStock().toUpperCase()} Current Price: $${dataTrade.results[0].c})`);
          alert("Trade will cost $" + Math.ceil(dataTrade.results[0].c * sharesTrade * 100) / 100);
        }
        if (loginText.innerText == "Login") {
          alert("Must be Logged In to Trade");
        }


}





