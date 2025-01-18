/* Timer display formatting. */

const TIMER_OPTIONS = {
    timeZone: "America/Chicago",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
};

/* Alert interval timing. */

FIVE_MINUTES = 5 * 60 * 1000 // PRODUCTION.
// FIVE_MINUTES = 10000 // -> for testing.

/* Centers content on 'RSI Meds Pushed' button. */

document.getElementById('firstRSIPush').scrollIntoView({
    behavior: "smooth",
    block: "center"
});  


/* Repopulates timer from shared URL string. */

let startTime
function initFromURL() {

    // Store URL string.
    const urlString = new URLSearchParams(window.location.search);
    
    // Check for valid Start Time in URL str.
    const urlStartTime = urlString.get('startTime');
    if (urlStartTime) { // if true -> timer started

        // Repopulate 'Start Time' and 'Elapsed Time' fields.
        startTime = parseInt(urlStartTime);
        const temp = new Date(startTime).toLocaleString('en-US', TIMER_OPTIONS);
        document.getElementById('startTimeValue').textContent = temp;

        // Update 'Elapsed Time' display in real-time.
        updateElapsedTime(); // Kickstart (likely unnecessary).
        timerInterval = setInterval(updateElapsedTime, 100);

        // Enable 'BLADE FIRST ENTERED MOUTH' button.
        switchButton1.disabled = false;


        /* NOTE: noMedRoute defaults to false. */
    }
    
    // Check if 'NO MEDS' button pressed in URL str.
    const urlNoMeds = urlString.get('noMeds');
    if (urlNoMeds === "true"){ // if true -> timer not started.

        // Init 'Reset' button.
        createReset();
    
        // Update status of buttons.
        noMeds.disabled = true; // Disable 'NO MEDS' button.
        document.getElementById('noRSIMeds').style.color = 'black';
        switchButton0.disabled = true; // Disable 'RSI MEDS PUSHED' button.
        switchButton1.disabled = false; // Enable 'BLADE FIRST ENTERED MOUTH' button.
        
        // Update user routing.
        noMedRoute = true;
    }

    // Check if 'RSI MEDS PUSHED' button pressed in URL str.
    const rsiMedsPushed = urlString.get('rsiMedsPushed');
    if (rsiMedsPushed === "true") {

        // Init 'Reset' button.
        createReset();

        // Get button timestamp data from URL.
        const rsiMedsPushedTime = urlString.get('rsiMedsPushedTime');
        const rsiMedsElapsedTime = urlString.get('rsiMedsElapsedTime');

        // Repopulate timestamp field for 'RSI MEDS PUSHED' button.
        document.getElementById('rsiMedsPushedValue').textContent = 
            `${rsiMedsElapsedTime} at ${rsiMedsPushedTime}`;
        document.getElementById('firstRSIPush').style.color = 'black';
        
        // Update status of buttons.
        noMeds.disabled = true; // Disable 'NO MEDS' button.
        switchButton0.disabled = true; // Disable 'RSI MEDS PUSHED' button.
        switchButton1.disabled = false; // Enable 'BLADE FIRST ENTERED MOUTH' button.
    }

    // Check if 'BLADE FIRST ENTERED MOUTH' button pressed in URL str.
    const bladeInserted = urlString.get('bladeInserted');
    if (bladeInserted === "true") {

        // Get button timestamp data from URL.
        const bladeInsertTime = urlString.get('bladeInsertTime');
        const bladeElapsedTime = urlString.get('bladeElapsedTime');

        // Repopulate timestamp field for 'BLADE FIRST ENTERED MOUTH' button.
        document.getElementById('bladeInsertedValue').textContent = 
            `${bladeElapsedTime} at ${bladeInsertTime}`;
        document.getElementById('switchButton1').style.color = 'black';

        // Update status of buttons.
        switchButton1.disabled = true; // Disable 'BLADE FIRST ENTERED MOUTH' button.
        switchButtonTube.disabled = false; // Enable 'TUBE PLACED IN AIRWAY' button.
    }

    // Check if 'TUBE PLACED IN AIRWAY' button pressed in URL str.
    const tubeInserted = urlString.get('tubeInserted');
    if (tubeInserted === 'true') {

        // Get button timestamp data from URL.
        const tubeInsertedTime = urlString.get('tubeInsertedTime');
        const tubeInsertedElapsed = urlString.get('tubeInsertedElapsed');

        // Repopulate timestamp field for 'TUBE PLACED IN AIRWAY' button.
        document.getElementById('tubeInsertedValue').textContent = 
            `${tubeInsertedElapsed} at ${tubeInsertedTime}`;
        document.getElementById('switchButtonTube').style.color = 'black';

        // Update status of buttons.
        switchButtonTube.disabled = true; // Disable 'TUBE PLACED IN AIRWAY' button.
        switchButton2.disabled = false; // Enable 'BLADE REMOVED FROM MOUTH' button.
    }

    // Check if 'BLADE REMOVED FROM MOUTH' button pressed in URL str.
    const bladeRemoved = urlString.get('bladeRemoved');
    if (bladeRemoved === "true") {

        // Get button timestamp data from URL.
        const bladeRemovalTime = urlString.get('bladeRemovalTime');
        const bladeRemElapsedTime = urlString.get('bladeRemElapsedTime');

        // Repopulate timestamp field for 'BLADE REMOVED FROM MOUTH' button.
        document.getElementById('bladeRemovedValue').textContent = 
            `${bladeRemElapsedTime} at ${bladeRemovalTime}`;
        document.getElementById('switchButton2').style.color = 'black';

        // Update status of buttons.
        switchButton2.disabled = true; // Disable 'BLADE REMOVED FROM MOUTH' button.
        switchButton3.disabled = false; // Enable 'FIRST BVM BREATH' button.
    }

    // Check if 'FIRST BVM BREATH' button pressed in URL str.
    const breathDelivered = urlString.get('breathDelivered');
    if (breathDelivered === "true") {

        // Get button timestamp data from URL.
        const breathDeliveredTime = urlString.get('breathDeliveredTime');
        const breathElapsedTime = urlString.get('breathElapsedTime');

        // Repopulate timestamp field for 'FIRST BVM BREATH' button.
        document.getElementById('breathDeliveredValue').textContent = 
            `${breathElapsedTime} at ${breathDeliveredTime}`;
        document.getElementById('switchButton3').style.color = 'black';

        // Update button status.
        switchButton3.disabled = true; // Disable 'FIRST BVM BREATH' button.

        // Get current alert iter from URL. If none -> init 0.
        const alertLoop = urlString.get('alertLoop');
        const alerts = parseInt(alertLoop) || 0;
        console.log(alerts); // -> for testing.
        
        // Find time (in ms) of 'FIRST BVM BREATH' and time since last alert pulse. 
        const breathTime = new Date(startTime + parseTimeString(breathElapsedTime));
        const elapsedTime = Date.now() - breathTime.getTime();

        // Determine curr alert iteration & time (in ms) to next iteration.
        const currAlert = Math.max(alerts, Math.floor(elapsedTime / FIVE_MINUTES)); // Round up iter.
        const timeToNextIter = FIVE_MINUTES - (elapsedTime % FIVE_MINUTES);

        // Alert user to 'TAKE VITALS' after each 5-min interval (5x).
        for (let i = currAlert; i < 5; i++) {

            // Delay loop to keep alignment with initial button press.
            const delayVal = (Math.max(0, i - currAlert) * FIVE_MINUTES) + timeToNextIter
            
            setTimeout(() => {

                // Update URL with curr alert loop.
                updateAlertLoop(i);
                console.log(i) // -> for testing

                // Pulse border glow effect (3x).
                triggerGlow();

            }, delayVal);
        }
    }


    /* Destructures 'breathElapsedTime' to milliseconds. */

    function parseTimeString(timeStr) {
        const [hours, minutes, seconds] = timeStr.split(':').map(Number);
        return 1000 * ((hours * 3600) + (minutes * 60) + seconds);
    }
}


/* Updates URL with curr alert loop iteration. */

function updateAlertLoop(alertIter) {
    const url = new URL(window.location);
    url.searchParams.set('alertLoop', alertIter.toString());
    window.history.pushState({}, "", url);
}


/* Triggers pulsing glow effect to alert user. */

function triggerGlow() {
    const glowEffect = document.querySelector('.borderGlow');
    for (let pings = 0; pings < 3; pings++) {
        setTimeout(() => {
            glowEffect.classList.add('glow-active');
            setTimeout(() => {
                glowEffect.classList.remove('glow-active');
            }, 1000);
        }, 1500 * pings);
    }
}


/* Starts timer following button press. */

function startTimer() {

    // Get start time.
    startTime = Date.now();

    // Update 'Start Time' field.
    updateStartTime();

    // Update 'Elapsed Time' field.
    updateElapsedTime();
    timerInterval = setInterval(updateElapsedTime, 100);

    // Push 'startTime' to URL.
    const url = new URL(window.location);
    url.searchParams.set('startTime', startTime.toString());
    window.history.pushState({}, '', url);
}


/* Gets current time in CST. */

function getCurrTime(date = new Date(), options = TIMER_OPTIONS) {
    return date.toLocaleString('en-US', options);
}


/* Updates 'Start Time' field on timer display */

function updateStartTime() {
    const cstTime = getCurrTime(undefined, TIMER_OPTIONS);
    document.getElementById('startTimeValue').textContent = cstTime;
}


/* Updates 'Elapsed Time' field on timer display */

function updateElapsedTime() {
    const {hours, minutes, seconds } = getTimeComponents();
    document.getElementById('elapsedTimeValue').textContent =
        `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
}


/* Maintain HH:MM:SS format with 0's. */ 

function padZero(num) {
    return num.toString().padStart(2, '0');
}


/* Gets HH:MM:SS elems from time in milliseconds. */

function getTimeComponents() {

    // Get secs -> round to match 'Start Time' and 'Elapsed Time' fields.
    const roundedSecs = Math.floor((Date.now() - startTime) / 1000);

    // Get whole hrs, mins, secs.
    const hours = Math.floor(roundedSecs / 3600);
    const minutes = Math.floor((roundedSecs % 3600) / 60);
    const seconds = roundedSecs % 60;

    return { hours, minutes, seconds };
}


/* Records current time and provide str for timestamp. */

function recordTime() {

    // Get ms -> round to match 'Start Time' and 'Elapsed Time' fields.
    const milliseconds = Date.now() - startTime;
    const roundedMillis = Math.floor(milliseconds / 1000) * 1000;

    // Convert elems to formatted strings for timestamping. 
    const currDate = new Date(Date.now() + roundedMillis - milliseconds); // O_O
    const currTimeStr = getCurrTime(currDate, options = TIMER_OPTIONS);
    const { hours, minutes, seconds } = getTimeComponents();
    const elapsedTimeStr = `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
    
    return { elapsedTimeStr, currTimeStr };
}


/* Creates 'Reset' button on timer interface.*/

function createReset() {

    // Create button.
    const resetButton = document.createElement('button');
    resetButton.id = 'switchReset';
    resetButton.textContent = 'Reset';
    
    // Quick-fix for formatting on page.
    const spacer = document.createElement('br');
    const divContent = document.querySelector('.content');
    divContent.insertAdjacentElement('beforeEnd', spacer)
    divContent.insertAdjacentElement('beforeEnd', resetButton);

    // Double-tap reset -> safety mechanism.
    let taps = 0;
    document.getElementById('switchReset').addEventListener('click', function() {
        taps++;
        
        if (taps === 1) {
            this.textContent = 'Confirm Reset';
            this.style.backgroundColor = 'rgb(255, 110, 250)';
            
            setTimeout(() => {
                taps = 0;
                this.textContent = 'Reset';
                this.style.backgroundColor = 'rgb(255, 80, 80)';
            }, 3000);
    
        } else if (taps === 2) {
            initFromURL(true);
            this.style.backgroundColor = '';
            const baseURL = window.location.href.split('?')[0]; // Cut all items after '?'.
            window.parent.location = baseURL; // Reload page.
        }
    });
};


/* Button Logic */

// Get respective button IDs.
const switchButton0 = document.getElementById('firstRSIPush'); // 'RSI MEDS PUSHED'.

const noMeds = document.getElementById('noRSIMeds'); // 'NO MEDS'.
let noMedRoute = false;

const switchButton1 = document.getElementById('switchButton1'); // 'BLADE FIRST ENTERED MOUTH'.
switchButton1.disabled = true;

const switchButtonTube = document.getElementById('switchButtonTube'); // 'TUBE PLACED IN AIRWAY'.
switchButtonTube.disabled = true

const switchButton2 = document.getElementById('switchButton2'); // 'BLADE REMOVED FROM MOUTH'.
switchButton2.disabled = true;

const switchButton3 = document.getElementById('switchButton3'); // 'FIRST BVM BREATH'.
switchButton3.disabled = true;

// Listen for button press for 'NO MEDS'.
noMeds.addEventListener('click', function (){
    
    // Update text styling.
    document.getElementById('noRSIMeds').style.color = 'black';

    // Update status of buttons.
    noMeds.disabled = true;
    switchButton0.disabled = true;
    switchButton1.disabled = false; // Enable 'BLADE FIRST ENTERED MOUTH' button.
    noMedRoute = true; // Disable RSI Meds route.
    
    // Create 'Reset' button.
    createReset();

    // Push route data to URL.
    const url = new URL(window.location);
    url.searchParams.set('noMeds', true);
    window.history.pushState({}, '', url);
});

// Listen for button press for 'RSI MEDS PUSHED'.
switchButton0.addEventListener('click', function() {
    
    // Init timer.
    startTimer();

    // Add timestamp.
    const {elapsedTimeStr, currTimeStr} = recordTime();
    document.getElementById('rsiMedsPushedValue').textContent = elapsedTimeStr + " at " + currTimeStr;

    // Update text styling.
    this.style.color = 'black'; 
    
    // Update status of buttons.
    this.disabled = true; // Disable 'RSI MEDS PUSHED' button.
    noMeds.disabled = true; // Disable 'NO MEDS' button.
    switchButton1.disabled = false; // Enable 'BLADE FIRST ENTERED MOUTH' button.

    // Create 'Reset' button.
    createReset();

    // Push timestamp data to URL.
    const url = new URL(window.location);
    url.searchParams.set('rsiMedsPushed', 'true');
    url.searchParams.set('rsiMedsPushedTime', currTimeStr);
    url.searchParams.set('rsiMedsElapsedTime', elapsedTimeStr);
    window.history.pushState({}, '', url);
});

// Listen for button press for 'BLADE FIRST ENTERED MOUTH'.
switchButton1.addEventListener('click', function() {
    
    // Init timer from button on 'NO MED' route.
    if (noMedRoute === true) {
        startTimer();
    }

    // Add timestamp.
    const {elapsedTimeStr, currTimeStr} = recordTime();
    document.getElementById('bladeInsertedValue').textContent = elapsedTimeStr + " at " + currTimeStr;

    // Update text styling.
    document.getElementById('switchButton1').style.color = 'black';

    // Update status of buttons.
    switchButton1.disabled = true; // Disable 'BLADE FIRST ENTERED MOUTH' button.
    switchButtonTube.disabled = false; // Enable 'TUBE PLACED IN AIRWAY' button.

    // Push timestamp data to URL.    
    const url = new URL(window.location);
    url.searchParams.set('bladeInserted', 'true');
    url.searchParams.set('bladeInsertTime', currTimeStr);
    url.searchParams.set('bladeElapsedTime', elapsedTimeStr);
    window.history.pushState({}, '', url);
});

// Listen for button press for 'TUBE PLACED IN AIRWAY'.
switchButtonTube.addEventListener('click', function() {
   
    // Add timestamp.
    const {elapsedTimeStr, currTimeStr} = recordTime();
    document.getElementById('tubeInsertedValue').textContent = elapsedTimeStr + " at " + currTimeStr;

    // Update text styling.
    document.getElementById('switchButtonTube').style.color = 'black';

    // Update status of buttons.
    switchButtonTube.disabled = true; // Disable 'TUBE PLACED IN AIRWAY' button.
    switchButton2.disabled = false; // Enable 'BLADE REMOVED FROM MOUTH' button.

    // Push timestamp data to URL.
    const url = new URL(window.location);
    url.searchParams.set('tubeInserted', true);
    url.searchParams.set('tubeInsertedTime', currTimeStr);
    url.searchParams.set('tubeInsertedElapsed', elapsedTimeStr);
    window.history.pushState({}, '', url);
});

// Listen for button press for 'BLADE REMOVED FROM MOUTH'.
switchButton2.addEventListener('click', function() {
   
    // Add timestamp.
    const {elapsedTimeStr, currTimeStr} = recordTime();
    document.getElementById('bladeRemovedValue').textContent = elapsedTimeStr + " at " + currTimeStr;

    // Update text styling.
    document.getElementById('switchButton2').style.color = 'black';

    // Update status of buttons.
    switchButton2.disabled = true; // Disable 'BLADE REMOVED FROM MOUTH' button.
    switchButton3.disabled = false; // Enable 'FIRST BVM BREATH' button.

    // Push timestamp data to URL.
    const url = new URL(window.location);
    url.searchParams.set('bladeRemoved', true);
    url.searchParams.set('bladeRemovalTime', currTimeStr);
    url.searchParams.set('bladeRemElapsedTime', elapsedTimeStr);
    window.history.pushState({}, '', url);
});

// Listen for button press for 'FIRST BVM BREATH'.
switchButton3.addEventListener('click', function() {

    // Add timestamp.
    const {elapsedTimeStr, currTimeStr} = recordTime();
    document.getElementById('breathDeliveredValue').textContent = elapsedTimeStr + " at " + currTimeStr;

    // Update text styling.
    document.getElementById('switchButton3').style.color = 'black';

    // Update button status.
    switchButton3.disabled = true; // Disable 'FIRST BVM BREATH' button.

    // Push timestamp data and alert loop iterations to URL.
    const url = new URL(window.location);
    url.searchParams.set('breathDelivered', 'true');
    url.searchParams.set('breathDeliveredTime', currTimeStr);
    url.searchParams.set('breathElapsedTime', elapsedTimeStr);
    url.searchParams.set('alertLoop', '0');
    window.history.pushState({}, '', url)

    // Alert user to 'TAKE VITALS' after each 5-min interval (5x).
    for (let i = 0; i < 5; i++) {

        setTimeout(() => {

            // Push curr alert loop to URL.
            url.searchParams.set('alertLoop', i.toString());
            window.history.pushState({}, '', url);

            // Pulse border glow effect (3x).
            triggerGlow();

        }, FIVE_MINUTES * (i + 1));
    }
});

document.addEventListener('DOMContentLoaded', initFromURL);