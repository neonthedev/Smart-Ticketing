// Get Element value
function getElementValue(elementId) {
  const elementField = document.getElementById(elementId);
  const elementInnerText = elementField.innerText;
  const elementInnerValue = parseInt(elementInnerText);
  return elementInnerValue;
}

// Set Element Value
function setElementText(elementId, value) {
  const elementField = document.getElementById(elementId);
  elementField.innerText = value;
}

//get coupon Code
function getCouponCode(elementId) {
  const elementField = document.getElementById(elementId);
  const elementInnerText = elementField.innerText;
  const TextUpperCase = elementInnerText.toUpperCase();
  return TextUpperCase;
}

// Main Functionality
let count = 0;
let currentPrice = 0;
const targetElements = document.getElementsByClassName("seats");

for (const element of targetElements) {
  element.addEventListener("click", function handleSelect() {
    element.disabled = true;
    count++;
    //Stop After4 click
    if (count > 4) {
      alert("You can only purchase up to four tickets.");
      return;
    }
    if (count === 4) {
      document.getElementById("apply-btn").disabled = false;
      document.getElementById("input-field").disabled = false;
    }

    setElementText("seat-count", count);
    element.style.backgroundColor = "#1DD100";
    element.style.color = "white";

    const seatDeductedValue = getElementValue("seat-deduct") - 1;
    // console.log(seatDeductedValue);
    setElementText("seat-deduct", seatDeductedValue);

    // Appending
    const containerDiv1 = document.getElementById("container-div-1");
    const containerDiv2 = document.getElementById("container-div-2");
    const containerDiv3 = document.getElementById("container-div-3");

    const p1 = document.createElement("p");
    p1.innerText = this.innerText;
    // console.log(p1.innerText);

    const p2 = document.createElement("p");
    p2.innerText = "Economy Class";

    const p3 = document.createElement("p");
    p3.innerText = getElementValue("per-seat-price");

    containerDiv1.appendChild(p1);
    containerDiv2.appendChild(p2);
    containerDiv3.appendChild(p3);

    // total setting
    currentPrice = getElementValue("per-seat-price") + currentPrice;
    // console.log(currentPrice);
    setElementText("total-price", currentPrice);
    setElementText("grand-total-price", currentPrice);

    const inputNumber = document.getElementById("number-input");
    const seatSelected = getElementValue("seat-count");
    console.log(seatSelected);

    inputNumber.addEventListener("keyup", function (event) {
      const inputNumberValue = event.target.value;
      console.log(inputNumberValue);
      console.log(typeof inputNumberValue);

      if (inputNumberValue !== "" && !isNaN(inputNumberValue) && seatSelected >= 1) {
        document.getElementById("next-btn").disabled = false;
      } else {
        document.getElementById("next-btn").disabled = true;
      }
    });
  });
}

const btn = document.getElementById("apply-btn");
btn.addEventListener("click", function () {
  document.getElementById("apply-btn").style.backgroundColor = "gray";
  const couponInputFiled = document.getElementById("input-field");
  const inputCoupon = couponInputFiled.value.toUpperCase();
  // console.log(inputCoupon);
  const firstCoupon = getCouponCode("coupon-code-1");
  const secondCoupon = getCouponCode("coupon-code-2");

  if (inputCoupon === firstCoupon) {
    const grandTotalInitial = getElementValue("grand-total-price");
    const discountPrice = grandTotalInitial * 0.15;
    // console.log(discountPrice)
    const discountedGrandTotal = grandTotalInitial - discountPrice;
    // console.log(discountedGrandTotal);
    setElementText("grand-total-price", discountedGrandTotal);
    document.getElementById("apply-btn").classList.add("hidden");
    document.getElementById("input-field").classList.add("hidden");
    // document.getElementById('apply-btn').disabled = true;
    // document.getElementById('input-field').disabled = true;

    const discountContainer = document.getElementById("discount-container");

    const text1 = document.createElement("h1");
    text1.innerText = "Discount";
    const text2 = document.createElement("h1");
    text2.innerText = "BDT" + " " + discountPrice;

    discountContainer.appendChild(text1);
    discountContainer.appendChild(text2);

    document.getElementById("input-field").value = "";
  }

  if (inputCoupon === secondCoupon) {
    const grandTotalInitial = getElementValue("grand-total-price");
    const discountPrice = grandTotalInitial * 0.2;
    const discountedGrandTotal = grandTotalInitial - discountPrice;
    setElementText("grand-total-price", discountedGrandTotal);
    document.getElementById("apply-btn").classList.add("hidden");
    document.getElementById("input-field").classList.add("hidden");
    // document.getElementById('apply-btn').disabled = true;
    // document.getElementById('input-field').disabled = true;

    const discountContainer = document.getElementById("discount-container");

    const text1 = document.createElement("h1");
    text1.innerText = "Discount";
    const text2 = document.createElement("h1");
    text2.innerText = discountPrice + " " + "BDT";

    discountContainer.appendChild(text1);
    discountContainer.appendChild(text2);
    document.getElementById("input-field").value = "";
  }
  if (inputCoupon !== firstCoupon && inputCoupon !== secondCoupon) {
    alert('Wrong Coupon Code! Enter "NEW15" OR "Couple 20"');
    document.getElementById("apply-btn").disabled = false;
    document.getElementById("input-field").disabled = false;

    document.getElementById("apply-btn").style.backgroundColor = "#1DD100";
    document.getElementById("input-field").style.color = "red";
  }
});
const continueButton = document.querySelector("#continue");

continueButton.addEventListener("click", () => {
  location.reload();
});
