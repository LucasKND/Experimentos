document.addEventListener("DOMContentLoaded", () => {
    // Accordion functionality
    const accordionHeaders = document.querySelectorAll(".accordion-header");
    
    accordionHeaders.forEach((header) => {
        header.addEventListener("click", () => {
            const accordion = header.parentElement;
            accordion.classList.toggle("active");
        });
    });

    // Navigation active state
    const navLinks = Array.from(document.querySelectorAll("nav a[href^='#']"));
    if (navLinks.length === 0) {
        return;
    }

    const sections = navLinks
        .map((link) => document.querySelector(link.getAttribute("href")))
        .filter((section) => section instanceof HTMLElement);

    if (sections.length === 0) {
        return;
    }

    // Marca o primeiro item como ativo até que o observer atualize.
    navLinks[0].classList.add("ativo");
    navLinks[0].setAttribute("aria-current", "true");

    const observer = new IntersectionObserver(
        (entries) => {
            entries
                .filter((entry) => entry.isIntersecting)
                .forEach((entry) => {
                    const id = `#${entry.target.id}`;
                    navLinks.forEach((link) => {
                        const isActive = link.getAttribute("href") === id;
                        link.classList.toggle("ativo", isActive);
                        if (isActive) {
                            link.setAttribute("aria-current", "true");
                        } else {
                            link.removeAttribute("aria-current");
                        }
                    });
                });
        },
        {
            rootMargin: "0px 0px -55% 0px",
            threshold: 0.4,
        }
    );

    sections.forEach((section) => observer.observe(section));
});
