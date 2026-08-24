/* ============================
   LANDING PAGE
============================ */

const rocket = document.getElementById("rocket");

if (rocket) {
    rocket.addEventListener("click", () => {
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

let allLaunches = [];


/* Start Dashboard */

if (container) {
    fetchLaunches();
}


/* ============================
   FETCH LAUNCHES
============================ */

async function fetchLaunches() {

    try {

        container.innerHTML = `
            <div class="loading">
                <h2>Loading missions...</h2>
                <p>Connecting to SpaceX mission database</p>
            </div>
        `;

        const response = await fetch(
            "https://ll.thespacedevs.com/2.2.0/launch/upcoming/?limit=20"
        );

        if (!response.ok) {
            throw new Error("Failed to fetch launches");
        }

        const data = await response.json();

        allLaunches = data.results;

        updateStats(allLaunches);
        displayLaunches(allLaunches);

        setupSearch();
        setupFilter();

    } catch (error) {

        console.error(error);

        container.innerHTML = `
            <div class="error">
                <h2>Unable to load missions</h2>
                <p>Please check your internet connection and try again.</p>
                <button onclick="fetchLaunches()">
                    Retry
                </button>
            </div>
        `;
    }
}


/* ============================
   DISPLAY LAUNCHES
============================ */

function displayLaunches(launches) {

    container.innerHTML = "";

    if (launches.length === 0) {

        container.innerHTML = `
            <div class="no-results">
                <h2>No missions found</h2>
                <p>Try another search or filter.</p>
            </div>
        `;

        return;
    }


    launches.forEach((launch) => {

        const status = launch.status?.name || "Unknown";

        const image = launch.image || "rocket.jpg";

        const launchDate = launch.net
            ? new Date(launch.net).toDateString()
            : "Date unavailable";


        const card = document.createElement("article");

        card.className = "rocket-card";


        card.innerHTML = `

            <div class="status">
                ${status}
            </div>

            <div class="rocket-image">

                <img
                    src="${image}"
                    alt="${launch.name}"
                    loading="lazy"
                >

            </div>

            <div class="card-content">

                <h2>${launch.name}</h2>

                <p class="launch-date">
                    ${launchDate}
                </p>

                <p class="rocket-status">
                    Status: ${status}
                </p>

                <button
                    class="details-btn"
                    type="button"
                >
                    View Mission
                </button>

            </div>
        `;


        /* Card interaction */

        card.addEventListener("click", () => {

            showMissionDetails(launch);

        });


        container.appendChild(card);

    });
}


/* ============================
   SEARCH
============================ */

function setupSearch() {

    const searchInput =
        document.getElementById("searchInput");

    if (!searchInput) return;


    searchInput.addEventListener("input", (event) => {

        const searchValue =
            event.target.value.toLowerCase().trim();


        const filtered = allLaunches.filter((launch) =>
            launch.name.toLowerCase().includes(searchValue)
        );


        displayLaunches(filtered);

    });
}


/* ============================
   FILTER
============================ */

function setupFilter() {

    const filterSelect =
        document.getElementById("filterSelect");

    if (!filterSelect) return;


    filterSelect.addEventListener("change", (event) => {

        const value = event.target.value;


        if (value === "all") {

            displayLaunches(allLaunches);
            return;

        }


        const filtered = allLaunches.filter((launch) => {

            const status =
                launch.status?.name?.toLowerCase() || "";

            if (value === "upcoming") {
                return true;
            }

            if (value === "completed") {
                return status.includes("success");
            }

            return true;

        });


        displayLaunches(filtered);

    });
}


/* ============================
   STATS
============================ */

function updateStats(launches) {

    const total =
        document.getElementById("totalMissions");

    const upcoming =
        document.getElementById("upcomingMissions");

    const completed =
        document.getElementById("completedMissions");


    if (total) {
        total.textContent = launches.length;
    }

    if (upcoming) {
        upcoming.textContent = launches.length;
    }

    if (completed) {
        completed.textContent = "0";
    }
}


/* ============================
   MISSION DETAILS
============================ */

function showMissionDetails(launch) {

    const modal =
        document.getElementById("missionModal");

    if (!modal) return;


    const name =
        document.getElementById("modalMissionName");

    const date =
        document.getElementById("modalDate");

    const status =
        document.getElementById("modalStatus");

    const rocketName =
        document.getElementById("modalRocket");

    const link =
        document.getElementById("modalLink");


    name.textContent =
        launch.name || "Unknown Mission";


    date.textContent =
        launch.net
            ? new Date(launch.net).toLocaleString()
            : "Unavailable";


    status.textContent =
        launch.status?.name || "Unknown";


    rocketName.textContent =
        launch.rocket?.configuration?.full_name ||
        "Unknown Rocket";


    if (launch.vidURLs?.length) {

        link.href = launch.vidURLs[0];
        link.style.display = "inline-block";

    } else {

        link.style.display = "none";

    }


    modal.hidden = false;

}


/* ============================
   CLOSE MODAL
============================ */

const closeModal =
    document.getElementById("closeModal");


if (closeModal) {

    closeModal.addEventListener("click", () => {

        const modal =
            document.getElementById("missionModal");

        modal.hidden = true;

    });

}


/* Close modal by clicking outside */

const missionModal =
    document.getElementById("missionModal");


if (missionModal) {

    missionModal.addEventListener("click", (event) => {

        if (event.target === missionModal) {

            missionModal.hidden = true;

        }

    });

}


/* Close modal with Escape */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape" && missionModal) {

        missionModal.hidden = true;

    }

});
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