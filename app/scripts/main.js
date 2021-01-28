/*
 *
 *  Web Starter Kit
 *  Copyright 2015 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */

/* eslint-env browser */
(function () {
  "use strict";

  // Check to make sure service workers are supported in the current browser,
  // and that the current page is accessed from a secure origin. Using a
  // service worker from an insecure origin will trigger JS console errors. See
  // http://www.chromium.org/Home/chromium-security/prefer-secure-origins-for-powerful-new-features

  const isLocalhost = Boolean(
    window.location.hostname === "localhost" ||
      // [::1] is the IPv6 localhost address.
      window.location.hostname === "[::1]" ||
      // 127.0.0.1/8 is considered localhost for IPv4.
      window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
      )
  );

  if (
    "serviceWorker" in navigator &&
    (window.location.protocol === "https:" || isLocalhost)
  ) {
    navigator.serviceWorker
      .register("service-worker.js")
      .then(function (registration) {
        // updatefound is fired if service-worker.js changes.
        registration.onupdatefound = function () {
          // updatefound is also fired the very first time the SW is installed,
          // and there's no need to prompt for a reload at that point.
          // So check here to see if the page is already controlled,
          // i.e. whether there's an existing service worker.
          if (navigator.serviceWorker.controller) {
            // The updatefound event implies that registration.installing is set
            // https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-container-updatefound-event
            const installingWorker = registration.installing;

            installingWorker.onstatechange = function () {
              switch (installingWorker.state) {
                case "installed":
                  // At this point, the old content will have been purged and the
                  // fresh content will have been added to the cache.
                  // It's the perfect time to display a "New content is
                  // available; please refresh." message in the page's interface.
                  break;

                case "redundant":
                  throw new Error(
                    "The installing " + "service worker became redundant."
                  );

                default:
                // Ignore
              }
            };
          }
        };
      })
      .catch(function (e) {
        console.error("Error during service worker registration:", e);
      });
  }

  // Your custom JavaScript goes here
})();

let moreBacon = () => {
  let baconImage = new Image();
  baconImage.src =
    "http://media.washtimes.com.s3.amazonaws.com/media/image/2015/02/23/bacon.jpg";
  baconImage.style.width = "100%";
  baconImage.style.height = "100%";
  document.getElementById("baconContainer").appendChild(baconImage);
};

// Form Validation - task 3
const form = document.getElementById("form");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const email = document.getElementById("email");
const postalCode = document.getElementById("postalCode");
const phoneNumber = document.getElementById("phoneNumber");
const creditCardNumber = document.getElementById("creditCardNumber");
const securityCode = document.getElementById("securityCode");
const expirationDate = document.getElementById("expirationDate");

form.addEventListener("submit", (e) => {
  let messages = [];
  if (firstName.value === "" || firstName.value === null) {
    messages.push("First name is required");
  }
  if (lastName.value === "" || lastName.value === null) {
    messages.push("Last name is required");
  }
  if (validateEmail(email.value) === false) {
    messages.push("Please enter a valid email address");
  }
  if (postalCode.value.length !== 5 || isNaN(postalCode.value)) {
    messages.push("Please enter a valid postal code");
  }
  if (validatePhoneNumber(phoneNumber.value) === false) {
    messages.push("Please enter a valid phone number");
  }
  if (validateCreditCard(creditCardNumber.value) === false) {
    messages.push("Please enter a valid credit card number");
  }
  if (securityCode.value.length !== 3 || isNaN(securityCode.value)) {
    messages.push("Please enter a valid security code");
  }
  if (validateExpirationDate(expirationDate.value) === false) {
    messages.push("Please enter a valid expiration date");
  }
  if (messages.length > 0) {
    e.preventDefault();
    if (document.getElementsByClassName("error").length == 0) {
      let error = document.createElement("div");
      error.classList = "error submitMessage";
      error.innerText = messages[0];
      form.appendChild(error);
    } else {
      document.getElementsByClassName("error")[0].innerText = messages[0];
    }
  } else {
    e.preventDefault();
    let success = document.createElement("div");
    success.classList = "success submitMessage";
    success.innerText = "Success!";
    form.appendChild(success);
    document.getElementsByClassName("error")[0].remove();
  }
});

function validateEmail(mail) {
  return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
    mail
  );
}

function validatePhoneNumber(number) {
  return /^\(?([0-9]{3})\)?[-]?([0-9]{3})[-]?([0-9]{3})$/.test(number);
}

function validateCreditCard(number) {
  return /^\(?([0-9]{4})\)?[-]?([0-9]{4})[-]?([0-9]{4})[-]?([0-9]{4})$/.test(
    number
  );
}

function validateExpirationDate(number) {
  return /^(?:0?[1-9]|1[0-2]) *\/ *[1-9][0-9]$/.test(number);
}
