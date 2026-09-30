/* =========================================================
   PRIMA AGRO LANCAR
   MAIN JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {


  /* =======================================================
     MOBILE NAVIGATION
     ======================================================= */

  const menuToggle =
    document.getElementById("menuToggle");

  const mainNav =
    document.getElementById("mainNav");


  if (menuToggle && mainNav) {

    /* OPEN / CLOSE MENU */

    menuToggle.addEventListener("click", () => {

      const isOpen =
        mainNav.classList.toggle("open");


      menuToggle.classList.toggle(
        "open",
        isOpen
      );


      menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );


      menuToggle.setAttribute(
        "aria-label",
        isOpen
          ? "Tutup menu navigasi"
          : "Buka menu navigasi"
      );


      document.body.classList.toggle(
        "menu-open",
        isOpen
      );

    });


    /* CLOSE MENU WHEN NAV LINK IS CLICKED */

    mainNav
      .querySelectorAll("a")
      .forEach(link => {

        link.addEventListener("click", () => {

          mainNav.classList.remove("open");

          menuToggle.classList.remove("open");


          menuToggle.setAttribute(
            "aria-expanded",
            "false"
          );


          menuToggle.setAttribute(
            "aria-label",
            "Buka menu navigasi"
          );


          document.body.classList.remove(
            "menu-open"
          );

        });

      });

  }


  /* =======================================================
     ACTIVE NAVIGATION
     ======================================================= */

  const currentPage =
    window.location.pathname
      .split("/")
      .pop() || "index.html";


  /*
   * Hanya menu navigasi utama yang mendapatkan
   * class "active".
   *
   * Tombol "Hubungi Kami" (.nav-cta) tidak
   * ikut menjadi active meskipun href-nya
   * sama dengan contact.html.
   */

  document
    .querySelectorAll(
      ".main-nav a:not(.nav-cta)"
    )
    .forEach(link => {

      const linkPage =
        link.getAttribute("href");


      if (linkPage === currentPage) {

        link.classList.add("active");

        link.setAttribute(
          "aria-current",
          "page"
        );

      }

    });


  /* =======================================================
     HEADER SCROLL
     ======================================================= */

  const header =
    document.getElementById("siteHeader");


  const handleHeaderScroll = () => {

    if (!header) return;


    if (window.scrollY > 20) {

      header.classList.add("scrolled");

    } else {

      header.classList.remove("scrolled");

    }

  };


  window.addEventListener(
    "scroll",
    handleHeaderScroll,
    {
      passive: true
    }
  );


  handleHeaderScroll();


  /* =======================================================
     SCROLL REVEAL
     ======================================================= */

  const revealElements =
    document.querySelectorAll(".reveal");


  if (
    "IntersectionObserver" in window &&
    revealElements.length
  ) {

    const observer =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (entry.isIntersecting) {

              entry.target.classList.add(
                "visible"
              );


              observer.unobserve(
                entry.target
              );

            }

          });

        },
        {
          threshold: 0.12
        }
      );


    revealElements.forEach(element => {

      observer.observe(element);

    });

  } else {

    revealElements.forEach(element => {

      element.classList.add(
        "visible"
      );

    });

  }


  /* =======================================================
     BACK TO TOP
     ======================================================= */

  const backToTop =
    document.getElementById("backToTop");


  if (backToTop) {

    const handleBackToTopVisibility = () => {

      if (window.scrollY > 500) {

        backToTop.classList.add("show");

      } else {

        backToTop.classList.remove("show");

      }

    };


    window.addEventListener(
      "scroll",
      handleBackToTopVisibility,
      {
        passive: true
      }
    );


    handleBackToTopVisibility();


    backToTop.addEventListener(
      "click",
      () => {

        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });

      }
    );

  }


  /* =======================================================
     PRODUCT FILTER
     ======================================================= */

  const filterButtons =
    document.querySelectorAll(
      ".filter-btn"
    );


  const productCards =
    document.querySelectorAll(
      ".product-card"
    );


  if (
    filterButtons.length &&
    productCards.length
  ) {

    filterButtons.forEach(button => {

      button.addEventListener(
        "click",
        () => {


          /* RESET FILTER BUTTONS */

          filterButtons.forEach(btn => {

            btn.classList.remove(
              "active"
            );

          });


          /* ACTIVE BUTTON */

          button.classList.add(
            "active"
          );


          const filter =
            button.dataset.filter;


          /* FILTER PRODUCT CARDS */

          productCards.forEach(card => {

            const category =
              card.dataset.category;


            if (
              filter === "all" ||
              category === filter
            ) {

              card.classList.remove(
                "hidden"
              );

            } else {

              card.classList.add(
                "hidden"
              );

            }

          });

        }
      );

    });

  }


  /* =======================================================
     MODAL HELPER
     ======================================================= */

  function openModal(modal) {

    if (!modal) return;


    modal.classList.add("open");


    modal.setAttribute(
      "aria-hidden",
      "false"
    );


    document.body.classList.add(
      "modal-open"
    );


    document.body.style.overflow =
      "hidden";

  }


  function closeModal(modal) {

    if (!modal) return;


    modal.classList.remove("open");


    modal.setAttribute(
      "aria-hidden",
      "true"
    );


    /*
     * Restore page scrolling only when
     * no other modal is open.
     */

    const openModals =
      document.querySelectorAll(
        ".modal.open"
      );


    if (!openModals.length) {

      document.body.classList.remove(
        "modal-open"
      );

      document.body.style.overflow =
        "";

    }

  }


  /* =======================================================
     PRODUCT MODAL
     ======================================================= */

  const productModal =
    document.getElementById(
      "productModal"
    );


  const modalProductImage =
    document.getElementById(
      "modalProductImage"
    );


  const modalProductName =
    document.getElementById(
      "modalProductName"
    );


  const modalProductType =
    document.getElementById(
      "modalProductType"
    );


  const modalProductDescription =
    document.getElementById(
      "modalProductDescription"
    );


  const askProductBtn =
    document.getElementById(
      "askProductBtn"
    );


  document
    .querySelectorAll(
      ".product-detail-btn"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          const card =
            button.closest(
              ".product-card"
            );


          if (
            !card ||
            !productModal
          ) {
            return;
          }


          const name =
            card.dataset.name || "";


          const type =
            card.dataset.type || "";


          const description =
            card.dataset.description || "";


          const image =
            card.dataset.image || "";


          /* PRODUCT IMAGE */

          if (
            modalProductImage &&
            image
          ) {

            modalProductImage.src =
              image;

            modalProductImage.alt =
              name;

          }


          /* PRODUCT NAME */

          if (modalProductName) {

            modalProductName.textContent =
              name;

          }


          /* PRODUCT TYPE */

          if (modalProductType) {

            modalProductType.textContent =
              type;

          }


          /* PRODUCT DESCRIPTION */

          if (
            modalProductDescription
          ) {

            modalProductDescription
              .textContent =
              description;

          }


          /* ASK PRODUCT BUTTON */

          if (askProductBtn) {

            askProductBtn.href =
              `contact.html?subject=${encodeURIComponent(
                "Pertanyaan Produk: " + name
              )}`;

          }


          openModal(
            productModal
          );

        }
      );

    });


  /* =======================================================
     CAREER MODAL
     ======================================================= */

  const jobModal =
    document.getElementById(
      "jobModal"
    );


  const modalJobPosition =
    document.getElementById(
      "modalJobPosition"
    );


  const modalJobLocation =
    document.getElementById(
      "modalJobLocation"
    );


  const modalJobEmployment =
    document.getElementById(
      "modalJobEmployment"
    );


  const modalJobDescription =
    document.getElementById(
      "modalJobDescription"
    );


  const applyJobBtn =
    document.getElementById(
      "applyJobBtn"
    );


  const positionApplied =
    document.getElementById(
      "positionApplied"
    );


  document
    .querySelectorAll(
      ".job-detail-btn"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          const card =
            button.closest(
              ".job-card"
            );


          if (
            !card ||
            !jobModal
          ) {
            return;
          }


          const position =
            card.dataset.position || "";


          const location =
            card.dataset.location || "";


          const employment =
            card.dataset.employment || "";


          const description =
            card.dataset.description || "";


          /* POSITION */

          if (modalJobPosition) {

            modalJobPosition.textContent =
              position;

          }


          /* LOCATION */

          if (modalJobLocation) {

            modalJobLocation.textContent =
              "📍 " + location;

          }


          /* EMPLOYMENT */

          if (modalJobEmployment) {

            modalJobEmployment.textContent =
              "● " + employment;

          }


          /* DESCRIPTION */

          if (modalJobDescription) {

            modalJobDescription.textContent =
              description;

          }


          /* SAVE POSITION */

          if (applyJobBtn) {

            applyJobBtn.dataset.position =
              position;

          }


          openModal(
            jobModal
          );

        }
      );

    });


  /* =======================================================
     APPLY JOB
     ======================================================= */

  if (applyJobBtn) {

    applyJobBtn.addEventListener(
      "click",
      () => {

        const position =
          applyJobBtn.dataset.position;


        /* SET SELECTED POSITION */

        if (
          positionApplied &&
          position
        ) {

          positionApplied.value =
            position;

        }


        /* CLOSE MODAL */

        closeModal(
          jobModal
        );


        /* SCROLL TO RECRUITMENT FORM */

        const recruitment =
          document.getElementById(
            "recruitment"
          );


        if (recruitment) {

          setTimeout(
            () => {

              recruitment.scrollIntoView({
                behavior: "smooth",
                block: "start"
              });

            },
            150
          );

        }

      }
    );

  }


  /* =======================================================
     MODAL CLOSE BUTTON
     ======================================================= */

  document
    .querySelectorAll(
      ".modal-close"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          const modal =
            button.closest(
              ".modal"
            );


          closeModal(
            modal
          );

        }
      );

    });


  /* =======================================================
     MODAL OVERLAY
     ======================================================= */

  document
    .querySelectorAll(
      ".modal-overlay"
    )
    .forEach(overlay => {

      overlay.addEventListener(
        "click",
        () => {

          const modal =
            overlay.closest(
              ".modal"
            );


          closeModal(
            modal
          );

        }
      );

    });


  /* =======================================================
     KEYBOARD ESCAPE
     ======================================================= */

  document.addEventListener(
    "keydown",
    event => {

      if (event.key !== "Escape") {
        return;
      }


      /* CLOSE MOBILE NAV */

      if (
        mainNav &&
        mainNav.classList.contains("open")
      ) {

        mainNav.classList.remove(
          "open"
        );


        if (menuToggle) {

          menuToggle.classList.remove(
            "open"
          );


          menuToggle.setAttribute(
            "aria-expanded",
            "false"
          );


          menuToggle.setAttribute(
            "aria-label",
            "Buka menu navigasi"
          );

        }


        document.body.classList.remove(
          "menu-open"
        );

      }


      /* CLOSE MODALS */

      document
        .querySelectorAll(
          ".modal.open"
        )
        .forEach(modal => {

          closeModal(
            modal
          );

        });

    }
  );


  /* =======================================================
     FILE INPUT DISPLAY
     ======================================================= */

  const fileInputs = [

    {
      input: "cv",
      output: "cvName"
    },

    {
      input: "coverLetter",
      output: "coverLetterName"
    },

    {
      input: "supportingDocs",
      output: "supportingDocsName"
    }

  ];


  fileInputs.forEach(item => {

    const input =
      document.getElementById(
        item.input
      );


    const output =
      document.getElementById(
        item.output
      );


    if (
      !input ||
      !output
    ) {
      return;
    }


    input.addEventListener(
      "change",
      () => {

        if (
          !input.files ||
          !input.files.length
        ) {

          output.textContent =
            "Belum ada file dipilih";

          return;

        }


        const names =
          Array.from(
            input.files
          )
          .map(file => file.name)
          .join(", ");


        output.textContent =
          names;

      }
    );

  });


  /* =======================================================
     RECRUITMENT FORM
     ======================================================= */

  const recruitmentForm =
    document.getElementById(
      "recruitmentForm"
    );


  const recruitmentSuccess =
    document.getElementById(
      "recruitmentSuccess"
    );


  if (recruitmentForm) {

    recruitmentForm.addEventListener(
      "submit",
      event => {

        event.preventDefault();


        /* HTML VALIDATION */

        if (
          !recruitmentForm.checkValidity()
        ) {

          recruitmentForm.reportValidity();

          return;

        }


        /* SHOW SUCCESS MESSAGE */

        if (
          recruitmentSuccess
        ) {

          recruitmentSuccess.hidden =
            false;


          recruitmentSuccess.scrollIntoView({
            behavior: "smooth",
            block: "center"
          });

        }


        /* RESET FORM */

        recruitmentForm.reset();


        /* RESET FILE NAME DISPLAY */

        fileInputs.forEach(item => {

          const output =
            document.getElementById(
              item.output
            );


          if (output) {

            output.textContent =
              "Belum ada file dipilih";

          }

        });

      }
    );

  }


  /* =======================================================
     CONTACT FORM
     ======================================================= */

  const contactForm =
    document.getElementById(
      "contactForm"
    );


  const contactSuccess =
    document.getElementById(
      "contactSuccess"
    );


  if (contactForm) {

    contactForm.addEventListener(
      "submit",
      event => {

        event.preventDefault();


        /* HTML VALIDATION */

        if (
          !contactForm.checkValidity()
        ) {

          contactForm.reportValidity();

          return;

        }


        /* SHOW SUCCESS MESSAGE */

        if (
          contactSuccess
        ) {

          contactSuccess.hidden =
            false;


          contactSuccess.scrollIntoView({
            behavior: "smooth",
            block: "center"
          });

        }


        /* RESET FORM */

        contactForm.reset();

      }
    );

  }


  /* =======================================================
     CONTACT QUERY PREFILL
     ======================================================= */

  const params =
    new URLSearchParams(
      window.location.search
    );


  const subject =
    params.get("subject");


  const subjectInput =
    document.getElementById(
      "subject"
    );


  if (
    subject &&
    subjectInput
  ) {

    subjectInput.value =
      subject;

  }


  /* =======================================================
     INITIALIZE MODALS
     ======================================================= */

  document
    .querySelectorAll(".modal")
    .forEach(modal => {

      if (
        !modal.classList.contains(
          "open"
        )
      ) {

        modal.setAttribute(
          "aria-hidden",
          "true"
        );

      }

    });


});