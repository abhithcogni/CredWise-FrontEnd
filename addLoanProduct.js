$(document).ready(function () {
    $('#loanProductForm').on('submit', function (e) {
        e.preventDefault(); // Prevent default form submission

        // Basic Form Validation (Bootstrap 5 handles some of this with 'required' attribute)
        let isValid = true;
        $('#loanProductForm [required]').each(function () {
            if ($(this).is(':invalid') || ($(this).val() === null || $(this).val().trim() === '')) { // Check for null for select
                isValid = false;
                $(this).addClass('is-invalid');
                // Find the closest .mb-4 or .col-md-6 to add error class for better visibility
                $(this).closest('.mb-4, .col-md-6').find('.form-label').addClass('text-danger');
            } else {
                $(this).removeClass('is-invalid').addClass('is-valid');
                $(this).closest('.mb-4, .col-md-6').find('.form-label').removeClass('text-danger');
            }
        });

        // Specific validation for amounts
        const minAmountVal = parseFloat($('#minAmount').val());
        const maxAmountVal = parseFloat($('#maxAmount').val());

        if (!isNaN(minAmountVal) && !isNaN(maxAmountVal) && minAmountVal >= maxAmountVal) {
            alert("Minimum loan amount cannot be greater than or equal to the maximum loan amount.");
            $('#minAmount').addClass('is-invalid').removeClass('is-valid');
            $('#maxAmount').addClass('is-invalid').removeClass('is-valid');
            isValid = false;
        }

        if (!isValid) {
            // Find first invalid field and focus
            $('#loanProductForm .is-invalid').first().focus();
            // alert("Please fill in all required fields correctly."); // Optional: alert already shown for amount
            return;
        }

        // Collect form data
        const productName = $('#productName').val();
        const interestRate = $('#interestRate').val();
        const minAmount = $('#minAmount').val();
        const maxAmount = $('#maxAmount').val();
        const tenure = $('#tenure').val();
        const description = $('#productDescription').val();
        const loanType = $('#loanType').val();

        console.log("New Loan Product Details (Stylish Version):");
        console.log("Product Name:", productName);
        console.log("Interest Rate:", interestRate + "%");
        console.log("Min Amount:", "$" + minAmount);
        console.log("Max Amount:", "$" + maxAmount);
        console.log("Tenure:", tenure + " months");
        console.log("Description:", description);
        console.log("Loan Type:", loanType);

        // Placeholder for actual submission logic (e.g., AJAX call)
        // $.ajax({ ... });

        alert("Loan product details collected! Check the console. (Implement actual submission to backend)");

        // Optionally reset form and clear validation states after "submission"
        // $('#loanProductForm')[0].reset();
        // $('#loanProductForm .is-valid').removeClass('is-valid');
        // $('#loanProductForm .is-invalid').removeClass('is-invalid');
        // $('#loanProductForm .form-label').removeClass('text-danger');
    });

    // Remove validation classes on input change
    $('#loanProductForm input, #loanProductForm select, #loanProductForm textarea').on('input change', function () {
        $(this).removeClass('is-invalid is-valid');
        $(this).closest('.mb-4, .col-md-6').find('.form-label').removeClass('text-danger');
    });

    // Handle cancel button
    $('.btn-outline-secondary.stylish-button').on('click', function () {
        if (confirm("Are you sure you want to cancel? Any unsaved changes will be lost.")) {
            $('#loanProductForm')[0].reset();
            $('#loanProductForm .is-valid').removeClass('is-valid');
            $('#loanProductForm .is-invalid').removeClass('is-invalid');
            $('#loanProductForm .form-label').removeClass('text-danger');
            // Optionally redirect or perform other actions
            // window.location.href = "previous-page.html";
            alert("Form cancelled and reset.");
        }
    });
});