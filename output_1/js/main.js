document.addEventListener('DOMContentLoaded', () => {
    
    // Select Form Elements
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const statusDiv = document.getElementById('formStatus');

    // Handle Form Submission
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // 1. UI Loading State
            const originalBtnText = submitBtn.innerText;
            submitBtn.innerText = 'Sending...';
            submitBtn.disabled = true;
            statusDiv.innerText = '';
            statusDiv.className = 'form-status';

            // 2. Gather Data (Payload: name, email, phone, message)
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                message: document.getElementById('message').value
            };

            try {
                // 3. Fetch API Request
                const response = await fetch('http://localhost:8000/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                // 4. Handle Response
                if (response.ok) {
                    // Success
                    statusDiv.innerText = 'Message sent successfully! We will be in touch.';
                    statusDiv.classList.add('status-success');
                    contactForm.reset();
                } else {
                    // Server Error
                    const errorData = await response.json().catch(() => ({}));
                    throw new Error(errorData.message || 'Server responded with an error.');
                }

            } catch (error) {
                // 5. Handle Network/Logic Errors
                console.error('Submission Error:', error);
                statusDiv.innerText = 'Failed to send message. Please try again later.';
                statusDiv.classList.add('status-error');
            } finally {
                // 6. Reset UI State
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }

    // Optional: Simple Scroll Animation Observer
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all cards and section titles
    document.querySelectorAll('.glass-card, .section-title').forEach(el => {
        el.style.opacity = '0'; // Initial state for JS animation
        observer.observe(el);
    });
});