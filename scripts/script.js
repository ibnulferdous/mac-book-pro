let discount = 0

// Update primary total
function updatePrimaryTotal() {
    const ids = ["base-cost", "ram-cost", "ssd-cost", "shipping-cost"]
    let costsArray = []
    let total = 0
    let finalTotal = 0
    
    for(id of ids) {
        const idValues = parseInt(document.getElementById(id).innerText)
        costsArray.push(idValues)
    }

    // Updating the total variable
    costsArray.forEach(element => total += element)

    // primary-total update in html 
    document.getElementById("primary-total").innerText = total

    if(discount == 5) {
        finalTotal = total - (total / discount)
    } else {
        finalTotal = total
    }

    // final-price update in html
    document.getElementById("final-price").innerText = finalTotal
}

// Function for config button events
function buttonEvents(btnId, removeClassIdArray, textId, cost) {
    document.getElementById(btnId).addEventListener("click", function(e) {
        // Add or remove class on click
        if(!e.target.classList.contains("active")) {
            e.target.classList.add("active")

            // Remove active class from other button(s)
            for(id of removeClassIdArray) {
                document.getElementById(id).classList.remove("active")
            }
        } 
    
        document.getElementById(textId).innerText = cost
        updatePrimaryTotal()
    })
}

// Ram Buttons
buttonEvents("8gb-ram", ["16gb-ram"], "ram-cost", 0)
buttonEvents("16gb-ram", ["8gb-ram"], "ram-cost", 180)

// SSD Buttons
buttonEvents("256gb-ssd", ["512gb-ssd", "1000gb-ssd"], "ssd-cost", 0)
buttonEvents("512gb-ssd", ["256gb-ssd", "1000gb-ssd"], "ssd-cost", 100)
buttonEvents("1000gb-ssd", ["256gb-ssd", "512gb-ssd"], "ssd-cost", 180)

// Delivery Cost Buttons
buttonEvents("normal-shipping", ["fast-shipping"], "shipping-cost", 0)
buttonEvents("fast-shipping", ["normal-shipping"], "shipping-cost", 20)


// Promo code button event
document.getElementById("promo-submit").addEventListener("click", function(e) {
    const promoInput = document.getElementById("promo-input").value
    const successMessage = document.getElementById("success-message")
    const failedMessage = document.getElementById("failed-message")

    if(promoInput == "stevekaku") {
        successMessage.classList.remove("d-none")
        failedMessage.classList.add("d-none")
        discount = 5

        updatePrimaryTotal()
    } else {
        failedMessage.classList.remove("d-none")
        successMessage.classList.add("d-none")
    }

    document.getElementById("promo-input").value = ""
})


