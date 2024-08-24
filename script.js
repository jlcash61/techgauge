// Network Monitor
if (navigator.connection) {
    const networkDial = document.getElementById('network-dial');
    const networkLed = document.getElementById('network-led');

    function updateNetworkStatus() {
        const connectionType = navigator.connection.effectiveType;
        const speed = navigator.connection.downlink;

        networkDial.textContent = `${connectionType} (${speed}Mbps)`;
        networkLed.className = 'led ' + (speed > 2 ? 'green' : 'yellow');
    }

    updateNetworkStatus();
    navigator.connection.addEventListener('change', updateNetworkStatus);
}

// Battery Checker with Improved Handling
if (navigator.getBattery) {
    navigator.getBattery().then(function (battery) {
        const batteryDial = document.getElementById('battery-dial');
        const batteryLed = document.getElementById('battery-led');

        function updateBatteryStatus() {
            const level = battery.level * 100;
            const isCharging = battery.charging;

            // Update the dial rotation based on battery level
            batteryDial.style.transform = `rotate(${(level * 1.8) - 90}deg)`;
            // Change LED color based on charging status
            batteryLed.className = 'led ' + (isCharging ? 'green' : 'yellow');
        }

        updateBatteryStatus();
        battery.addEventListener('chargingchange', updateBatteryStatus);
        battery.addEventListener('levelchange', updateBatteryStatus);
    }).catch(function(error) {
        console.error("Battery API error: ", error);
        alert("Battery information is not available on this device.");
    });
} else {
    console.warn("Battery API not supported.");
    alert("Battery information is not available on this device.");
}
