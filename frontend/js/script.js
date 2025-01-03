const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav a');

window.addEventListener('scroll', () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        }
    });
}); 

menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
});   

const downloadButton = document.getElementById('downloadResume');

  downloadButton.addEventListener('click', async () => {
    try {
      const response = await fetch('http://localhost:5000/download-resume', {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch the resume.');
      }

      // Convert the response to a blob
      const blob = await response.blob();

      // Create a temporary URL for the blob
      const url = window.URL.createObjectURL(blob);

      // Create an anchor element to trigger the download
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Aman-resume.pdf'; // Set the file name for download
      document.body.appendChild(a);
      a.click();
      a.remove();

      // Revoke the temporary URL to free up memory
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading the resume:', error);
      alert('Something went wrong. Please try again.');
    }
  });

  //contact form 

  document.getElementById('contactForm').addEventListener('submit' , async (e) => {
    e.preventDefault();

    const formData = {
      name: e.target.FullName.value,
      email: e.target.Email.value,
      mobile: e.target.Mobile.value,
      subject: e.target.subject.value,
      message: e.target.Massage.value
    };

    try {
      const response = await fetch(' http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Message sent successfully!');
        e.target.reset();
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Something went wrong. Please try again.');

    }
  })