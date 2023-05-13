var studentCodes = {}; // Initialize an empty object to store student codes and names

function loadStudentCodes() {
    fetch('studentCodes.json') // Fetch the JSON file
        .then(response => response.json()) // Parse the response as JSON
        .then(data => {
            studentCodes = data; // Assign the data to studentCodes object
        })
        .catch(error => {
            console.error('Error loading student codes:', error);
        });
}

function checkCode() {
    var inputCode = document.getElementById('studentCodeInput').value;
    var studentName = studentCodes[inputCode];

    if (studentName) {
        var resultText = 'คำใบ้  :   ' + studentName + '.';
        var currentIndex = 0;
        var resultElement = document.getElementById('result');

        document.getElementById('formContainer').classList.add('hidden');
        setTimeout(function() {
            var typingInterval = setInterval(function() {
                if (currentIndex < resultText.length) {
                    resultElement.innerText += resultText[currentIndex];
                    currentIndex++;
                } else {
                    clearInterval(typingInterval);
                }
            }, 100);
        }, 1000); // Add a 1-second delay before starting the typing effect
    } else {
        document.getElementById('result').innerText = 'ใส่รหัสนักศึกษาไม่ถูกต้อง';
    }

    setTimeout(function() {
        document.getElementById('result').style.opacity = "1";
        document.getElementById('backButton').style.display = "block";
    }, 1000);
}

function goBack() {
    document.getElementById('result').style.opacity = "0";
    document.getElementById('backButton').style.display = "none";
    setTimeout(function(){
        document.getElementById('formContainer').classList.remove('hidden');
    }, 1000);
}

var countDownDate = new Date("May 15, 2023 00:00:00").getTime();
var countdownInterval = setInterval(updateCountdown, 1000);

function updateCountdown() {
    var now = new Date().getTime();
    var distance = countDownDate - now;
    
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Get the time element and update its text content
    var timeElement = document.getElementById("time");
    timeElement.textContent = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
    
    if (distance < 0) {
        clearInterval(countdownInterval);
        timeElement.textContent = "EXPIRED";
    }
}

window.onload = function() {
    setTimeout(function() {
        document.getElementById('loading').style.display = 'none';
        document.querySelector('.container').style.opacity = '1';
    }, 2000);
    loadStudentCodes();
    updateCountdown(); // Call the function on page load
}
