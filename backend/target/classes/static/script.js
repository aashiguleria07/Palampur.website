/* =========================================================
   PALAMPUR PREMIUM WEBSITE
   script.js
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       1. LOAD PLACES FROM SPRING BOOT BACKEND
    ===================================================== */

    const placesContainer =
        document.getElementById("places-container");

    if (placesContainer) {

        fetch("/places")

            .then(response => {

                if (!response.ok) {
                    throw new Error(
                        "Unable to load places from server."
                    );
                }

                return response.json();
            })

            .then(places => {

                placesContainer.innerHTML = "";

                if (!places || places.length === 0) {

                    placesContainer.innerHTML = `
                        <div class="loading-card">
                            <div class="loading-icon">
                                <i class="fa-solid fa-mountain-sun"></i>
                            </div>

                            <h3>No destinations found</h3>

                            <p>
                                Please try again later.
                            </p>
                        </div>
                    `;

                    return;
                }


                /* -----------------------------------------
                   Icons for different Palampur places
                ----------------------------------------- */

                const icons = {

                    "Dhauladhar Mountains":
                        "fa-mountain",

                    "Tea Gardens":
                        "fa-leaf",

                    "Neugal Khad":
                        "fa-water",

                    "Andretta Village":
                        "fa-palette",

                    "Bir-Billing":
                        "fa-parachute-box",

                    "Tashi Jong":
                        "fa-place-of-worship"

                };


                /* -----------------------------------------
                   Create destination cards
                ----------------------------------------- */

                places.forEach((place, index) => {

                    const card =
                        document.createElement("article");

                    card.className = "place-card";

                    const icon =
                        icons[place.name] ||
                        "fa-location-dot";


                    card.innerHTML = `

                        <div class="place-icon">
                            <i class="fa-solid ${icon}"></i>
                        </div>

                        <span style="
                            display:block;
                            color:#c49a5a;
                            font-size:9px;
                            letter-spacing:3px;
                            font-weight:700;
                            margin-bottom:8px;
                        ">
                            DESTINATION ${String(index + 1).padStart(2, "0")}
                        </span>

                        <h3>
                            ${place.name}
                        </h3>

                        <p>
                            ${place.info}
                        </p>

                    `;

                    placesContainer.appendChild(card);

                });

            })

            .catch(error => {

                console.error(
                    "Places API Error:",
                    error
                );

                placesContainer.innerHTML = `

                    <div class="loading-card">

                        <div class="loading-icon">
                            <i class="fa-solid fa-triangle-exclamation"></i>
                        </div>

                        <h3>
                            Unable to load destinations
                        </h3>

                        <p>
                            Please make sure the
                            Spring Boot server is running.
                        </p>

                    </div>

                `;

            });

    }


    /* =====================================================
       2. CONTACT FORM
    ===================================================== */

    const contactForm =
        document.getElementById("contactForm");

    const formMessage =
        document.getElementById("formMessage");


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            async (event) => {

                event.preventDefault();


                const name =
                    document.getElementById("name").value.trim();

                const email =
                    document.getElementById("email").value.trim();

                const message =
                    document.getElementById("message").value.trim();


                if (!name || !email || !message) {

                    formMessage.textContent =
                        "Please fill in all fields.";

                    formMessage.style.color =
                        "#b54a42";

                    return;
                }


                const submitButton =
                    contactForm.querySelector(
                        ".submit-button"
                    );


                submitButton.disabled = true;

                submitButton.innerHTML = `
                    Sending...
                    <i class="fa-solid fa-spinner fa-spin"></i>
                `;


                try {

                    const response =
                        await fetch("/contact", {

                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body: JSON.stringify({

                                name: name,

                                email: email,

                                message: message

                            })

                        });


                    if (!response.ok) {

                        throw new Error(
                            "Contact request failed."
                        );

                    }


                    const result =
                        await response.text();


                    formMessage.textContent =
                        result;

                    formMessage.style.color =
                        "#245b4c";


                    contactForm.reset();


                } catch (error) {

                    console.error(
                        "Contact Error:",
                        error
                    );

                    formMessage.textContent =
                        "Something went wrong. Please try again.";

                    formMessage.style.color =
                        "#b54a42";

                }


                submitButton.disabled = false;

                submitButton.innerHTML = `
                    Send Message
                    <i class="fa-solid fa-paper-plane"></i>
                `;

            }
        );

    }


    /* =====================================================
       3. BACK TO TOP BUTTON
    ===================================================== */

    const backToTop =
        document.getElementById("backToTop");


    if (backToTop) {

        window.addEventListener(
            "scroll",
            () => {

                if (window.scrollY > 500) {

                    backToTop.classList.add("show");

                } else {

                    backToTop.classList.remove("show");

                }

            }
        );


        backToTop.addEventListener(
            "click",
            () => {

                window.scrollTo({

                    top: 0,

                    behavior: "smooth"

                });

            }
        );

    }


    /* =====================================================
       4. SMOOTH NAVIGATION
    ===================================================== */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute("href");


                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }


                const target =
                    document.querySelector(targetId);


                if (target) {

                    event.preventDefault();


                    target.scrollIntoView({

                        behavior: "smooth",

                        block: "start"

                    });

                }

            }
        );

    });


    /* =====================================================
       5. CARD REVEAL ANIMATION
    ===================================================== */

    const animatedElements =
        document.querySelectorAll(
            ".place-card, .featured-card, .thing-card"
        );


    const observer =
        new IntersectionObserver(

            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.style.opacity = "1";

                        entry.target.style.transform =
                            "translateY(0)";

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },

            {
                threshold: 0.12
            }

        );


    animatedElements.forEach(element => {

        element.style.opacity = "0";

        element.style.transform =
            "translateY(25px)";

        element.style.transition =
            "opacity 0.7s ease, transform 0.7s ease";

        observer.observe(element);

    });


    /* =====================================================
       6. CURRENT YEAR IN FOOTER
    ===================================================== */

    const footer =
        document.querySelector(".footer-bottom");


    if (footer) {

        const year =
            new Date().getFullYear();

        footer.innerHTML =
            footer.innerHTML.replace(
                "2026",
                year
            );

    }


    /* =====================================================
       7. CONSOLE MESSAGE
    ===================================================== */

    console.log(
        "%c🏔️ Welcome to Palampur!",
        "color:#c49a5a;font-size:20px;font-weight:bold;"
    );

    console.log(
        "Palampur website frontend successfully loaded."
    );

});
