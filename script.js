function toggleMode() {
    const body = document.body;
    body.classList.toggle("dark-mode");

    if (body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('nav a'); // Menu links
    const darkModeToggle = document.querySelector('.dark-mode-toggle'); // Dark mode button
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);

    function closeMenu() {
        nav.classList.remove('active');
        overlay.classList.remove('active');
    }

    menuToggle.addEventListener('click', function(event) {
        nav.classList.toggle('active');
        overlay.classList.toggle('active');
        event.stopPropagation();
    });

    document.addEventListener('click', function(event) {
        if (!nav.contains(event.target) && !menuToggle.contains(event.target)) {
            closeMenu();
        }
    });

    overlay.addEventListener('click', function() {
        closeMenu();
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMenu();
        });
    });

    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            toggleMode();
            closeMenu(); 
        });
    }

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const textElement = document.querySelector(".typing-text");
    const texts = ["Aspiring Web Developer", "Aspiring Web Designer"];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentText = texts[textIndex];
        if (isDeleting) {
            textElement.innerHTML = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            textElement.innerHTML = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        let speed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentText.length) {
            setTimeout(() => {
                isDeleting = true;
                textElement.style.borderRight = "none"; 
            }, 1000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
        }

        setTimeout(type, speed);
    }

    type();
});
