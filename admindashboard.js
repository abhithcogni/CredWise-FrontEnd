$(document).ready(function() {

    // Initialize tooltips (if any)
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    })

    // --- Chart.js Setup ---

    // Chart Colors
    const primaryColor = '#0d6efd';
    const successColor = '#198754';
    const warningColor = '#ffc107';
    const dangerColor = '#dc3545';
    const infoColor = '#0dcaf0';
    const secondaryColor = '#6c757d';
    const lightColor = '#f8f9fa';
    const darkColor = '#212529';

    // 1. Loan Performance Chart (Bar Chart)
    const loanPerformanceCtx = document.getElementById('loanPerformanceChart').getContext('2d');
    if (loanPerformanceCtx) {
        new Chart(loanPerformanceCtx, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: 'New Loans (₹k)',
                    data: [120, 150, 180, 130, 160, 190, 210, 180, 150, 170, 200, 220],
                    backgroundColor: primaryColor,
                    borderColor: primaryColor,
                    borderWidth: 1,
                    borderRadius: 5,
                    hoverBackgroundColor: primaryColor,
                    barPercentage: 0.7,
                    categoryPercentage: 0.7
                },
                {
                    label: 'Repayments (₹k)',
                    data: [100, 110, 140, 100, 120, 150, 170, 140, 110, 130, 160, 180],
                    backgroundColor: successColor,
                    borderColor: successColor,
                    borderWidth: 1,
                    borderRadius: 5,
                    hoverBackgroundColor: successColor,
                    barPercentage: 0.7,
                    categoryPercentage: 0.7
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: '#e9ecef' // Lighter grid lines
                        },
                        ticks: {
                            callback: function(value) {
                                return '₹' + value + 'k';
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false // Hide x-axis grid lines
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            usePointStyle: true,
                            pointStyle: 'circle'
                        }
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed.y !== null) {
                                    label += '$' + context.parsed.y + 'k';
                                }
                                return label;
                            }
                        }
                    }
                },
                interaction: {
                    mode: 'index',
                    intersect: false,
                },
            }
        });
    }


    // 2. Loan Status Distribution Chart (Doughnut Chart)
    const loanStatusCtx = document.getElementById('loanStatusChart').getContext('2d');
    if (loanStatusCtx) {
        new Chart(loanStatusCtx, {
            type: 'doughnut',
            data: {
                labels: ['Active', 'Paid Off', 'Pending', 'Overdue'],
                datasets: [{
                    label: 'Loan Status',
                    data: [345, 1200, 28, 12], // Corresponds to summary card values
                    backgroundColor: [
                        primaryColor,
                        successColor,
                        warningColor,
                        dangerColor
                    ],
                    borderColor: [ // Add border for better separation
                        '#fff',
                        '#fff',
                        '#fff',
                        '#fff'
                    ],
                    borderWidth: 2,
                    hoverOffset: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '70%', // Makes it a doughnut chart
                plugins: {
                    legend: {
                        display: false // Custom legend is below the chart
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed !== null) {
                                    label += context.parsed;
                                }
                                return label;
                            }
                        }
                    }
                }
            }
        });
    }

});