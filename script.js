
// TAB CODE 
function openTabemi(eventt1, tabNamee2) {
    let i, tabb, tablist;
    tabb = document.getElementsByClassName("tabb");
    
    for (i = 0; i < tabb.length; i++) {
      tabb[i].style.display = "none";
    }
    tablist = document.getElementsByClassName("tablist");
    for (i = 0; i < tablist.length; i++) {
        tablist[i].classList.remove("active");

    }
    document.getElementById(tabNamee2).style.display = "block";
    eventt1.currentTarget.classList.add("active");
  }

  document.getElementById('emitab1').style.display = "block";
 
//   TAB CODE 


// HOME LOAN JS CODE======================================================

var P = 500000; // Default loan amount
var R = 7; // Default interest rate
var N = 5; // Default loan tenure
var pie, line;

var loan_amt_slider = document.getElementById("loan-amount");
var loan_amt_input = document.getElementById("loan-amount-input");
var loan_period_slider = document.getElementById("loan-period");
var loan_period_input = document.getElementById("loan-period-input");
var int_rate_slider = document.getElementById("interest-rate");
var int_rate_input = document.getElementById("interest-rate-input");

// Update loan amount
loan_amt_slider.addEventListener("input", updateLoanAmountFromSlider);
loan_amt_input.addEventListener("input", updateLoanAmountFromInput);

function updateLoanAmountFromSlider(event) {
	loan_amt_input.value = event.target.value;
	updateLoanAmount();
}

function updateLoanAmountFromInput(event) {
	loan_amt_slider.value = event.target.value;
	updateLoanAmount();
}

function updateLoanAmount() {
	P = parseFloat(loan_amt_input.value);
	displayDetails();
}

// Update loan period
loan_period_slider.addEventListener("input", updateLoanPeriodFromSlider);
loan_period_input.addEventListener("input", updateLoanPeriodFromInput);

function updateLoanPeriodFromSlider(event) {
	loan_period_input.value = event.target.value;
	updateLoanPeriod();
}

function updateLoanPeriodFromInput(event) {
	loan_period_slider.value = event.target.value;
	updateLoanPeriod();
}

function updateLoanPeriod() {
	N = parseFloat(loan_period_input.value);
	displayDetails();
}

// Update interest rate
int_rate_slider.addEventListener("input", updateInterestRateFromSlider);
int_rate_input.addEventListener("input", updateInterestRateFromInput);

function updateInterestRateFromSlider(event) {
	int_rate_input.value = event.target.value;
	updateInterestRate();
}

function updateInterestRateFromInput(event) {
	int_rate_slider.value = event.target.value;
	updateInterestRate();
}

function updateInterestRate() {
	R = parseFloat(int_rate_input.value);
	displayDetails();
}

// Calculate loan details
function calculateLoanDetails(p, r, emi) {
	let totalInterest = 0;
	let yearlyInterest = [];
	let yearPrincipal = [];
	let years = [];
	let year = 1;
	let [counter, principal, interes] = [0, 0, 0];
	while (p > 0) {
		let interest = parseFloat(p) * parseFloat(r);
		p = parseFloat(p) - (parseFloat(emi) - interest);
		totalInterest += interest;
		principal += parseFloat(emi) - interest;
		interes += interest;
		if (++counter == 12) {
			years.push(year++);
			yearlyInterest.push(parseInt(interes));
			yearPrincipal.push(parseInt(principal));
			counter = 0;
		}
	}
	line.data.datasets[0].data = yearPrincipal;
	line.data.datasets[1].data = yearlyInterest;
	line.data.labels = years;
	return totalInterest;
}

// Display loan details
function displayDetails() {
	let r = parseFloat(R) / 1200;
	let n = parseFloat(N) * 12;

	let num = parseFloat(P) * r * Math.pow(1 + r, n);
	let denom = Math.pow(1 + r, n) - 1;
	let emi = parseFloat(num) / parseFloat(denom);

	let payabaleInterest = calculateLoanDetails(P, r, emi);

	let opts = '{style: "decimal", currency: "en"}';

	document.querySelector("#cp").innerText =
		parseFloat(P).toLocaleString("en", opts) + "";

	document.querySelector("#ci").innerText =
		parseFloat(payabaleInterest).toLocaleString("en", opts) + "";

	document.querySelector("#ct").innerText =
		parseFloat(parseFloat(P) + parseFloat(payabaleInterest)).toLocaleString(
			"en",
			opts
		) + "";

	document.querySelector("#price").innerText =
		parseFloat(emi).toLocaleString("en", opts) + "";

	pie.data.datasets[0].data[0] = P;
	pie.data.datasets[0].data[1] = payabaleInterest;
	pie.update();
	line.update();
}

// Initialize everything
function initialize() {
	loan_amt_input.value = P;
	loan_amt_slider.value = P;
	loan_period_input.value = N;
	loan_period_slider.value = N;
	int_rate_input.value = R;
	int_rate_slider.value = R;

	line = new Chart(document.getElementById("lineChart"), {
		data: {
			datasets: [
				{
					type: "line",
					label: "Yearly Principal paid",
					borderColor: "rgb(54, 162, 235)",
					data: []
				},
				{
					type: "line",
					label: "Yearly Interest paid",
					borderColor: "rgb(255, 99, 132)",
					data: []
				}
			],
			labels: []
		},
		options: {
			plugins: {
				title: {
					display: true,
					text: "Yearly Payment Breakdown"
				}
			},
			scales: {
				x: {
					title: {
						color: "grey",
						display: true,
						text: "Years Passed"
					}
				},
				y: {
					title: {
						color: "grey",
						display: true,
						text: "Money in ."
					}
				}
			}
		}
	});

	pie = new Chart(document.getElementById("pieChart"), {
		type: "doughnut",
		data: {
			labels: ["Principal Loan Amount", "Total Interest"],
			datasets: [
				{
					label: "Home Loan Details",
					data: [P, 0],
					backgroundColor: ["rgb(136, 168, 37)", "rgb(237, 140, 43)"],
					hoverOffset: 4
				}
			]
		},
		options: {
			plugins: {
				title: {
					display: true,
					text: "Break-up of Total Payment"
				}
			}
		}
	});

	displayDetails();
}

initialize();
// -------

// =========================================================================
// ============================================================================



