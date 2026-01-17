// --- Tab Navigation Logic ---
var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

function opentab(tabname) {
    // defined 'tablink' and 'tabcontent' with let to avoid global scope pollution
    for (let tablink of tablinks) {
        tablink.classList.remove("active-link");
    }
    for (let tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab");
    }
    
    // Note: This relies on the global 'event' object. 
    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
}

// --- Side Menu Logic ---
var sidemenu = document.getElementById("sidemenu");

function openmenu() {
    sidemenu.style.right = "0";
}

function closemenu() {
    sidemenu.style.right = "-200px";
}

// --- Google Sheets Form Submission ---
const scriptURL = 'https://script.google.com/macros/s/AKfycby2YNw6KEAS5P_SVnOGablebLk66v8gKYntdHuDx2IiUv0NO9Lg8z0GF7Im6YkATdyp/exec';
const form = document.forms['submit-to-google-sheet'];
const msg = document.getElementById("msg");

if (form) {
    form.addEventListener('submit', e => {
        e.preventDefault();
        fetch(scriptURL, { method: 'POST', body: new FormData(form) })
            .then(response => {
                msg.innerHTML = "Thank you for your message. We will get back to you soon.";
                setTimeout(function () {
                    msg.innerHTML = "";
                }, 5000);
                form.reset(); // Fixed typo: changed .result() to .reset()
            })
            .catch(error => console.error('Error!', error.message));
    });
}