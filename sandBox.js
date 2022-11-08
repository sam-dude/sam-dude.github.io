let tipPercent = document.getElementById("tip-percent");
let tipAmount = document.getElementById("tip-amount");
let totalBill = document.getElementById("total-bill");
let tip = document.getElementById("tip");
let price = document.getElementById("price");
let btn10 = document.getElementById("btn-10");
let btn15 = document.getElementById("btn-15");
let btn20 = document.getElementById("btn-20");
let btn25 = document.getElementById("btn-25");
let customBtn = document.getElementById("btn-custom");
let bill = document.getElementById("s-total-bill");

let btns = [btn10, btn15, btn20, btn25];

let contents = [tipAmount, tipPercent, totalBill, tip, price, bill];

// function to calculate tip in dollars
calculateTip = (tipPercent, Amount) => {
    return (tipPercent/100) * Amount;
};

//function to calculate tip in percent
calculateTipPercent = (percent) => {
    let tip1 = parseFloat(calculateTip(percent, price.value));
    tipAmount.innerHTML = Math.ceil(100 * tip1)/100; //converts to nearest hundredths
    if (tip1 == '0') {
       tipAmount.innerHTML = '00.00'
    };
    totalBill.innerHTML = totalBillSum(calculateTip(percent, price.value), price.value);
    if (isNaN(totalBill.innerHTML) || totalBill.innerHTML === "") {
        totalBill.innerHTML = '00.00'
    };
}

btns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        btn.classList.add("active");
        customBtn.classList.remove("active");
        //code to calulate tip on 10 percent
        if (btn == btn10) {
            calculateTipPercent(10);
        };
        //code to calculate tip on 15%
         if (btn == btn15) {
            calculateTipPercent(15);
        };
        //code to clalculate tip on 20 percent
         if (btn == btn20) {
            calculateTipPercent(20);
        }; 
        //code to calculate tip on 25 percent
        if (btn == btn25) {
            calculateTipPercent(25);
        }

        //return the unselected buttons
        let otherBtns = btns.filter((otherBtns) => {
            return otherBtns !== btn;
        });

        //remove the active class of unselected buttons
        otherBtns.forEach((btn) => {
            btn.classList.remove("active");
        })
    })
});


customBtn.addEventListener("click", (e) =>{
    console.log(e.target);
    customBtn.classList.add("active");
    btn10.classList.remove("active")
    btn15.classList.remove("active");
    btn20.classList.remove("active");
    btn25.classList.remove("active");
});


//function to sum tip and amount in dollars
totalBillSum = (tip, Amount) => {
    let sum = parseFloat(tip) + parseFloat(Amount);
    return Math.ceil(100 * sum)/100;
} 



//function to
function DisplayChange(newValue) {
    tipPercent.innerHTML = newValue + "%";
    
    let tip1 = parseFloat(calculateTip(newValue, price.value));
    tipAmount.innerHTML = Math.ceil(100 * tip1)/100; //converts to nearest hundredths
    if (tip1 == '0') {
        tipAmount.innerHTML = '00.00'
    }
    console.log(totalBillSum(calculateTip(newValue, price.value), price.value));
    totalBill.innerHTML = totalBillSum(calculateTip(newValue, price.value), price.value) ;

    if (isNaN(totalBill.innerHTML) || totalBill.innerHTML === "") {
        totalBill.innerHTML = '00.00'
    }
    
};

let tip_01 = tipAmount.innerHTML;

//split amount
let displaySplit = document.getElementById("spilt-display");
let minus = document.getElementById("minus");
let plus = document.getElementById("plus");
var button = [minus, plus];

ChangePrice = (newValue) => {
    totalBill.innerHTML = newValue ;
    bill.innerHTML = newValue;

    //resetting other values
    if (newValue === "") {
        totalBill.innerHTML = "00.00";
        bill.innerHTML = "00.00"
    }
    btns.forEach((btn) => {
        btn.classList.remove("active")
    });
    customBtn.classList.remove("active");
    tipAmount.innerHTML = "00.00";
    displaySplit.innerHTML = 0;
    displaySplit.value = 0;
};

//function to split tip
splitTip = (tip, divisor) => {
    return Math.ceil(100 * parseFloat(tip/divisor))/100;
}
//function to split bill
splitBill = (bill, divisor) => {
    let result = Math.ceil(100 * parseFloat(bill/divisor))/100;
    return result;
}

//defining the outside tip
button.forEach((btn) => {
    btn.addEventListener("click", () => {
        let tip = tipAmount.innerHTML;
        if (btn == plus) {
            let newDisplay = parseFloat(displaySplit.innerHTML) + 1;
            displaySplit.innerHTML = newDisplay;
            if (displaySplit.innerHTML >= 15){
                displaySplit.innerHTML = 15;
            }
            let splitTipResult = splitTip(tip, displaySplit.innerHTML);
            tipAmount.innerHTML = splitTipResult;
            let splitBillResult = splitBill(price.value, displaySplit.innerHTML);
            console.log(splitBillResult);
            bill.innerHTML = splitBillResult;
            totalBill.innerHTML = parseFloat(tipAmount.innerHTML) + parseFloat(bill.innerHTML);

        }; if (btn == minus) {
            let newDisplay = parseFloat(displaySplit.innerHTML) - 1;
            displaySplit.innerHTML = newDisplay;
            if (displaySplit.innerHTML <= 1){
                displaySplit.innerHTML = 1;
            }
            let splitTipResult = Math.ceil(100* (parseFloat(tipAmount.innerHTML) * (parseFloat(displaySplit.innerHTML) + 1)))/100;
            tipAmount.innerHTML = splitTipResult;
            let splitBillResult = splitBill(price.value, displaySplit.innerHTML);
            console.log(splitBillResult);
            bill.innerHTML = splitBillResult;
            totalBill.innerHTML = Math.ceil(100 * parseFloat(tipAmount.innerHTML) + parseFloat(bill.innerHTML))/100 ;
        };        
        console.log(displaySplit.innerHTML);
        

        if (splitBillResult = 0) {
            bill.innerHTML = "00.00"
        };
    });
});

//reset content
let resetBtn = document.getElementById("reset-btn");

resetBtn.addEventListener("click", () => {
    contents.forEach((content) => {
        content.innerHTML = "00.00"
    });
    displaySplit.innerHTML = 0 ;
    price.value = ""; 
})
