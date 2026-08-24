/* ============================
   LANDING PAGE
============================ */

const rocket = document.getElementById("rocket");

if (rocket) {
    rocket.addEventListener("click", () => {

        rocket.classList.add("launch");

        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 1800);

    });
}


/* ============================
   DASHBOARD
============================ */

const container = document.getElementById("rocket-container");

if (container) {
    fetchLaunches();
}

// Fetch data from API
async function fetchLaunches() {

    try {

        container.innerHTML = "<h2>Loading launches...</h2>";

        const response = await fetch(
            "https://ll.thespacedevs.com/2.2.0/launch/upcoming/?limit=9"
        );

        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }

        const data = await response.json();

        displayLaunches(data.results);

    } catch (error) {

        console.error(error);

        container.innerHTML = "<h2>Unable to load launches.</h2>";

    }

}


// Display Launches
function displayLaunches(launches) {

    container.innerHTML = "";

    launches.forEach((launch) => {

        let badgeColor = "#0f5132";

        if (launch.status.name === "Go") {

            badgeColor = "#0f5132";

        } else if (
            launch.status.name === "To Be Determined" ||
            launch.status.name === "To Be Confirmed"
        ) {

            badgeColor = "#8a6d00";

        } else {

            badgeColor = "#7d1d1d";

        }

        const image = launch.image
            ? launch.image
            : "rocket.jpg";

        const card = document.createElement("div");

        card.className = "rocket-card";

        card.innerHTML = `

            <div class="status"
                 style="background:${badgeColor};">

                ${launch.status.name}

            </div>

            <div class="rocket-image">

                <img
                    src="${image}"
                    alt="${launch.name}"
                    style="width:100%; height:200px; object-fit:cover; border-radius:12px;">

            </div>

            <h2>${launch.name}</h2>

            <p class="launch-date">
                📅 ${new Date(launch.net).toDateString()}
            </p>

            <p class="rocket-status">
                Status : ${launch.status.name}
            </p>

        `;

        container.appendChild(card);

    });

}