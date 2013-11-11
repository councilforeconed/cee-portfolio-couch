var util = (function () {
  
  var standards = {
    economics: [
      { standard: 1, topic: "Scarcity", description: "Productive resources are limited. Therefore, people cannot have all the goods and services they want; as a result, they must choose some things and give up others." },
      { standard: 2, topic: "Decision Making", description: "Effective decision making requires comparing the additional costs of alternatives with the additional benefits. Many choices involve doing a little more or a little less of something: few choices \"are all or nothing\" decisions." },
      { standard: 3, topic: "Allocation", description: "Different methods can be used to allocate goods and services. People acting individually or collectively must choose which methods to use to allocate different kinds of goods and services." },
      { standard: 4, topic: "Incentives", description: "People usually respond predictably to positive and negative incentives." },
      { standard: 5, topic: "Trade", description: "Voluntary exchange occurs only when all participating parties expect to gain. This is true for trade among individuals or organizations within a nation, and among individuals or organizations in different nations." },
      { standard: 6, topic: "Specialization", description: "When individuals, regions, and nations specialize in what they can produce at the lowest cost and then trade with others, both production and consumption increase. " },
      { standard: 7, topic: "Markets and Prices", description: "Markets exist when buyers and sellers interact. This interaction determines market prices and thereby allocates scarce goods and services." },
      { standard: 8, topic: "Role of Prices", description: "Prices send signals and provide incentives to buyers and sellers. When supply or demand changes, market prices adjust, affecting incentives. " },
      { standard: 9, topic: "Competition and Market Structure", description: "Competition among sellers usually lowers costs and prices, and encourages producers to produce what consumers are willing and able to buy. Competition among buyers increases prices and allocates goods and services to those people who are willing and able to pay the most for them. " },
      { standard: 10, topic: "Institutions", description: "Institutions evolve and are created to help individuals and groups accomplish their goals.  Banks, labor unions, markets, corporations, legal systems, and not-for-profit organizations are examples of important institutions.  A different kind of institution, clearly defined and enforced property rights, is essential to a market economy." },
      { standard: 11, topic: "Money and Inflation", description: "Money makes it easier to trade, borrow, save, invest, and compare the value of goods and services.  The amount of money in the economy affects the overall price level.  Inflation is an increase in the overall price level that reduces the value of money." },
      { standard: 12, topic: "Interest Rates", description: "Interest rates, adjusted for inflation, rise and fall to balance the amount saved with the amount borrowed, which affects the allocation of scarce resources between present and future uses." },
      { standard: 13, topic: "Income", description: "Income for most people is determined by the market value of the productive resources they sell. What workers earn primarily depends on the market value of what they produce." },
      { standard: 14, topic: "Entrepreneurship", description: "Entrepreneurs take on the calculated risk of starting new businesses, either by embarking on new ventures similar to existing ones or by introducing new innovations.  Entrepreneurial innovation is an important source of economic growth." },
      { standard: 15, topic: "Economic Growth", description: "Investment in factories, machinery, new technology, and in the health, education, and training of people stimulates economic growth and can raise future standards of living." },
      { standard: 16, topic: "Role of Government and Market Failure", description: "There is an economic role for government in a market economy whenever the benefits of a government policy outweigh its costs. Governments often provide for national defense, address environmental concerns, define and protect property rights, and attempt to make markets more competitive. Most government policies also have direct or indirect effects on people's incomes." },
      { standard: 17, topic: "Government Failure", description: "Costs of government policies sometimes exceed benefits. This may occur because of incentives facing voters, government officials, and government employees, because of actions by special interest groups that can impose costs on the general public, or because social goals other than economic efficiency are being pursued." },
      { standard: 18, topic: "Economic Fluctuations", description: "Fluctuations in a nation's overall levels of income, employment, and prices are determined by the interaction of spending and production decisions made by all households, firms, government agencies, and others in the economy.  Recessions occur when overall levels of income and employment decline." },
      { standard: 19, topic: "Unemployment and Inflation", description: "Unemployment imposes costs on individuals and the overall economy. Inflation, both expected and unexpected, also imposes costs on individuals and the overall economy.  Unemployment increases during recessions and decreases during recoveries." },
      { standard: 20, topic: "Fiscal and Monetary Policy", description: "Federal government budgetary policy and the Federal Reserve System's monetary policy influence the overall levels of employment, output, and prices." }
    ],
    'personal-finance': [
      { standard: 1, topic: "Financial Responsibility and Decision Making", description: "Apply reliable information and systematic decision making to personal financial decisions." },
      { standard: 2, topic: "Income and Careers", description: "Use a career plan to develop personal income potential." },
      { standard: 3, topic: "Planning and Money Management", description: "Organize personal finances and use a budget to manage cash flow." },
      { standard: 4, topic: "Credit and Debt", description: "Maintain creditworthiness, borrow at favorable terms, and manage debt." },
      { standard: 5, topic: "Risk Management and Insurance", description: "Use appropriate and cost-effective risk management strategies." },
      { standard: 6, topic: "Saving and Investing", description: "Implement a diversified investment strategy that is compatible with personal goals."}
    ]
  };
  
  var subjects = {
    'economics': 'Economics',
    'personal-finance': 'Personal Finance'
  };
  
  var colors = {
    'dark-blue': 'rgb(0,74,128)',
    'blue': 'rgb(0,113,188)',
    'light-blue': 'rgb(116,190,233)',
    'dark-green': 'rgb(88,113,39)',
    'green': 'rgb(127,181,57)',
    'light-green': 'rbg(202,219,42)',
  }
  
  function applyOpacityToColor(color, opacity) {
    return 'rgba(' + color.match(/\d+,\d+,\d+/)[0] + ',' + opacity + ')';
  }
  
  return {
    parseSubject: function (subject) {
      return subjects[subject];
    },
    parseStandard: function(subject, standard) {
      return standards[subject][standard - 1];
    },
    applyColorsToData: function(color, dataset) {
      dataset.fillColor = applyOpacityToColor(colors[color], 0.5);
      dataset.strokeColor = applyOpacityToColor(colors[color], 1);
      dataset.pointColor = applyOpacityToColor(colors[color], 1);
      pointStrokeColor = "#fff";
      return dataset;
    },
    subjectColor: function (subject) {
      if (subject === 'personal-finance') return 'dark-blue';
      if (subject === 'economics') return 'dark-green';
    },
    color: function(color) {
      return colors[color];
    },
    capitalize: function (string) {
      return string[0].toUpperCase() + string.slice(1);
    },
    ifLoggedIn: function (successCallback, failureCallback, epicFailureCallback) {
      $.couch.session({
        success: function (response) {
          if (response.userCtx.name) {
            if (typeof successCallback === "function") successCallback(response.userCtx.name);
          } else {
            if (typeof failureCallback === "function") failureCallback();
          }
        },
        error: function (response) {
          if (typeof epicFailureCallback === "function")  epicFailureCallback(response);
        }
      })
    },
    notLoggedIn: function () {
      console.log('You are not logged in.')
    }
  }
  
})();