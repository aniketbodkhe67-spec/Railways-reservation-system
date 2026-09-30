/* =====================================================
   RAILCONNECT - RAILWAY RESERVATION SYSTEM
   FRONTEND JAVASCRIPT
===================================================== */


/* =====================================================
   STATION DATA
===================================================== */

const stations = [

    "Mumbai",

    "Delhi",

    "Pune",

    "Kolkata",

    "Chandigarh",

    "Ahmedabad",

    "Bengaluru",

    "Chennai",

    "Hyderabad",

    "Jaipur",

    "Lucknow",

    "Bhopal",

    "Nagpur",

    "Surat",

    "Goa"

];


/* =====================================================
   DOM ELEMENTS
===================================================== */

const searchForm =
    document.getElementById("searchForm");

const fromInput =
    document.getElementById("from");

const toInput =
    document.getElementById("to");

const journeyDate =
    document.getElementById("journeyDate");

const swapBtn =
    document.getElementById("swapBtn");

const fromSuggestions =
    document.getElementById(
        "fromSuggestions"
    );

const toSuggestions =
    document.getElementById(
        "toSuggestions"
    );

const mobileMenuBtn =
    document.getElementById(
        "mobileMenuBtn"
    );

const navbar =
    document.querySelector(".navbar");

const loginModal =
    document.getElementById(
        "loginModal"
    );

const registerModal =
    document.getElementById(
        "registerModal"
    );

const toast =
    document.getElementById("toast");

const toastMessage =
    document.getElementById(
        "toastMessage"
    );


/* =====================================================
   SET MINIMUM DATE
===================================================== */

function setMinimumDate() {

    const today =
        new Date();

    const year =
        today.getFullYear();

    const month =
        String(
            today.getMonth() + 1
        ).padStart(2, "0");

    const day =
        String(
            today.getDate()
        ).padStart(2, "0");

    const formattedDate =
        `${year}-${month}-${day}`;

    journeyDate.min =
        formattedDate;

    journeyDate.value =
        formattedDate;
}

setMinimumDate();


/* =====================================================
   STATION SUGGESTIONS
===================================================== */

function showSuggestions(
    input,
    container
) {

    const value =
        input.value
            .trim()
            .toLowerCase();

    if (!value) {

        container.style.display =
            "none";

        return;
    }

    const matches =
        stations.filter(
            station =>
                station
                    .toLowerCase()
                    .includes(value)
        );

    if (!matches.length) {

        container.style.display =
            "none";

        return;
    }

    container.innerHTML =
        matches
            .slice(0, 6)
            .map(
                station => `
                    <div
                        class="suggestion-item"
                        data-station="${station}"
                    >
                        📍 ${station}
                    </div>
                `
            )
            .join("");

    container.style.display =
        "block";

    container
        .querySelectorAll(
            ".suggestion-item"
        )
        .forEach(item => {

            item.addEventListener(
                "click",
                () => {

                    input.value =
                        item.dataset.station;

                    container.style.display =
                        "none";
                }
            );

        });
}


fromInput.addEventListener(
    "input",
    () => {

        showSuggestions(
            fromInput,
            fromSuggestions
        );

    }
);


toInput.addEventListener(
    "input",
    () => {

        showSuggestions(
            toInput,
            toSuggestions
        );

    }
);


/* =====================================================
   CLOSE SUGGESTIONS
===================================================== */

document.addEventListener(
    "click",
    event => {

        if (
            !event.target.closest(
                ".input-group"
            )
        ) {

            fromSuggestions.style.display =
                "none";

            toSuggestions.style.display =
                "none";
        }

    }
);


/* =====================================================
   SWAP STATIONS
===================================================== */

swapBtn.addEventListener(
    "click",
    () => {

        const fromValue =
            fromInput.value;

        fromInput.value =
            toInput.value;

        toInput.value =
            fromValue;

        showToast(
            "Stations swapped successfully"
        );

    }
);


/* =====================================================
   SEARCH FORM
===================================================== */

searchForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();

        const from =
            fromInput.value.trim();

        const to =
            toInput.value.trim();

        const date =
            journeyDate.value;

        const travelClass =
            document.getElementById(
                "travelClass"
            ).value;

        const passengers =
            document.getElementById(
                "passengers"
            ).value;


        /* Validation */

        if (!from || !to) {

            showToast(
                "Please select departure and arrival stations."
            );

            return;
        }


        if (
            from.toLowerCase() ===
            to.toLowerCase()
        ) {

            showToast(
                "Departure and arrival stations cannot be the same."
            );

            return;
        }


        if (!date) {

            showToast(
                "Please select a journey date."
            );

            return;
        }


        /*
         * For now this is frontend-only.
         * Later replace this with:
         *
         * window.location.href =
         * "/search.html?...";
         *
         * or an API request.
         */

        const searchData = {

            from: from,

            to: to,

            date: date,

            travelClass:
                travelClass,

            passengers:
                passengers

        };


        console.log(
            "Train Search:",
            searchData
        );


        showToast(
            `Searching trains from ${from} to ${to}...`
        );


        /*
         * Demo behavior.
         *
         * In the next stage this will open
         * the actual train-results page.
         */

        setTimeout(
            () => {

                alert(
                    `Train Search\n\n` +
                    `From: ${from}\n` +
                    `To: ${to}\n` +
                    `Date: ${date}\n` +
                    `Class: ${travelClass}\n` +
                    `Passengers: ${passengers}\n\n` +
                    `Train results will be connected to the backend next.`
                );

            },
            400
        );

    }
);


/* =====================================================
   POPULAR ROUTE SELECTION
===================================================== */

function selectRoute(
    from,
    to
) {

    fromInput.value =
        from;

    toInput.value =
        to;

    scrollToSearch();

    showToast(
        `${from} → ${to} selected`
    );
}


/* =====================================================
   SCROLL TO SEARCH
===================================================== */

function scrollToSearch() {

    document
        .getElementById("home")
        .scrollIntoView({
            behavior: "smooth"
        });

    setTimeout(
        () => {

            fromInput.focus();

        },
        600
    );
}


/* =====================================================
   LOGIN MODAL
===================================================== */

function openLogin() {

    closeModals();

    loginModal.classList.add(
        "show"
    );

    document.body.style.overflow =
        "hidden";
}


function openRegister() {

    closeModals();

    registerModal.classList.add(
        "show"
    );

    document.body.style.overflow =
        "hidden";
}


function closeModals() {

    loginModal.classList.remove(
        "show"
    );

    registerModal.classList.remove(
        "show"
    );

    document.body.style.overflow =
        "";
}


function switchToRegister() {

    closeModals();

    openRegister();
}


function switchToLogin() {

    closeModals();

    openLogin();
}


/* =====================================================
   CLOSE MODAL ON BACKDROP
===================================================== */

loginModal.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            loginModal
        ) {

            closeModals();

        }

    }
);


registerModal.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            registerModal
        ) {

            closeModals();

        }

    }
);


/* =====================================================
   ESCAPE KEY
===================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key ===
            "Escape"
        ) {

            closeModals();

        }

    }
);


/* =====================================================
   LOGIN FORM
===================================================== */

document
    .getElementById("loginForm")
    .addEventListener(
        "submit",
        event => {

            event.preventDefault();

            const email =
                document.getElementById(
                    "loginEmail"
                ).value;

            showToast(
                `Login request received for ${email}`
            );

            /*
             * Later:
             *
             * fetch("/api/auth/login", {
             *     method: "POST",
             *     ...
             * });
             */

            setTimeout(
                () => {

                    closeModals();

                },
                1200
            );

        }
    );


/* =====================================================
   REGISTER FORM
===================================================== */

document
    .getElementById("registerForm")
    .addEventListener(
        "submit",
        event => {

            event.preventDefault();

            const name =
                document.getElementById(
                    "registerName"
                ).value;

            showToast(
                `Welcome ${name}! Registration received.`
            );

            /*
             * Later:
             *
             * fetch("/api/auth/register", {
             *     method: "POST",
             *     ...
             * });
             */

            setTimeout(
                () => {

                    closeModals();

                },
                1200
            );

        }
    );


/* =====================================================
   MOBILE MENU
===================================================== */

mobileMenuBtn.addEventListener(
    "click",
    () => {

        navbar.classList.toggle(
            "mobile-open"
        );

    }
);


/* =====================================================
   MOBILE NAVIGATION
===================================================== */

document
    .querySelectorAll(
        ".nav-menu a"
    )
    .forEach(link => {

        link.addEventListener(
            "click",
            () => {

                navbar.classList.remove(
                    "mobile-open"
                );

            }
        );

    });


/* =====================================================
   TOAST NOTIFICATION
===================================================== */

let toastTimer;


function showToast(
    message
) {

    clearTimeout(
        toastTimer
    );

    toastMessage.textContent =
        message;

    toast.classList.add(
        "show"
    );

    toastTimer =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            3000
        );
}


/* =====================================================
   NAVBAR ACTIVE LINK
===================================================== */

const sections =
    document.querySelectorAll(
        "section[id]"
    );

const navLinks =
    document.querySelectorAll(
        ".nav-menu a"
    );

window.addEventListener(
    "scroll",
    () => {

        let current = "";

        sections.forEach(
            section => {

                const sectionTop =
                    section.offsetTop - 120;

                if (
                    window.scrollY >=
                    sectionTop
                ) {

                    current =
                        section.getAttribute(
                            "id"
                        );
                }

            }
        );

        navLinks.forEach(
            link => {

                link.classList.remove(
                    "active"
                );

                if (
                    link.getAttribute(
                        "href"
                    ) ===
                    `#${current}`
                ) {

                    link.classList.add(
                        "active"
                    );

                }

            }
        );

    }
);


/* =====================================================
   CONSOLE MESSAGE
===================================================== */

console.log(
    "%c🚆 RailConnect Railway Reservation System",
    "color:#075985;font-size:18px;font-weight:bold;"
);

console.log(
    "Frontend initialized successfully."
);