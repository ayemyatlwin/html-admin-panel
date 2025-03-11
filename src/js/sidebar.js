document.addEventListener("DOMContentLoaded", function () {
  const menuItems = document.querySelectorAll("#menu > li");
  const currentURL = window.location.href.split(/[?#]/)[0];

  menuItems.forEach((menuItem) => {
    const dropdown = menuItem.querySelector(".dropdown");
    const toggleDropdownlist = menuItem.querySelector(".menu-link");

    if (dropdown) {
      const dropdownLinks = dropdown.querySelectorAll(".sub-link");
      let isActive = false;

      dropdownLinks.forEach((link) => {
        const linkURL = new URL(link.href, window.location.origin).pathname;
        if (currentURL.includes(linkURL)) {
          isActive = true;
          link.classList.add("!text-secondary");
          toggleDropdownlist.classList.add("bg-menuHover", "dark:bg-meta-4");
        }
      });

      if (isActive && currentURL !== window.location.origin) {
        dropdown.classList.remove("hidden");
        const dropdownIcon =
          toggleDropdownlist.querySelector("svg:nth-of-type(2)");
        dropdownIcon.classList.add("rotate-180");
        toggleDropdownlist.classList.add("bg-menuHover", "dark:bg-meta-4");
      } else {
        dropdown.classList.add("hidden");
        toggleDropdownlist.classList.remove("bg-menuHover", "dark:bg-meta-4");
      }

      toggleDropdownlist.addEventListener("click", () => {
        // Close all other dropdowns
        menuItems.forEach((item) => {
          const otherDropdown = item.querySelector(".dropdown");
          const otherDropdownIcon = item.querySelector("svg:nth-of-type(2)");

          if (otherDropdown && otherDropdown !== dropdown) {
            otherDropdown.classList.add("hidden");
            otherDropdownIcon.classList.remove("rotate-180");
          }
        });
        const isCurrentlyOpen = !dropdown.classList.contains("hidden");

        // Toggle the clicked dropdown
        if (!isCurrentlyOpen) {
          dropdown.classList.remove("hidden");
          const dropdownIcon =
            toggleDropdownlist.querySelector("svg:nth-of-type(2)");
          dropdownIcon.classList.add("rotate-180");
        } else {
          dropdown.classList.add("hidden");
          const dropdownIcon =
            toggleDropdownlist.querySelector("svg:nth-of-type(2)");
          dropdownIcon.classList.remove("rotate-180");
        }
      });
    } else {
      const link = menuItem.querySelector(".menu-link");
      const linkURL = new URL(link.href, window.location.origin).pathname;
      if (currentURL.includes(linkURL)) {
        link.classList.add("!text-secondary");
        link.classList.add("bg-menuHover", "dark:bg-meta-4");
      }
    }
  });
});
