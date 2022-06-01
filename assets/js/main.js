(function ($) {

    /**
   * Easy selector helper function
   */
    const select = (el, all = false) => {
        el = el.trim()
        if (all) {
            return [...document.querySelectorAll(el)]
        } else {
            return document.querySelector(el)
        }
    }

    /**
   * Easy on scroll event listener 
   */
    const onscroll = (el, listener) => {
        el.addEventListener('scroll', listener)
    }


    /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
    let selectHeader = select('#header')
    if (selectHeader) {
        const headerScrolled = () => {
            if (window.scrollY > 100) {
                selectHeader.classList.add('header-scrolled')
            } else {
                selectHeader.classList.remove('header-scrolled')
            }
        }
        window.addEventListener('load', headerScrolled)
        onscroll(document, headerScrolled)
    }

    /**
   * Accordion
   */

    $(".accordion a").click(function (j) {
        var dropDown = $(this).closest("li").find("p");

        $(this).closest(".accordion").find("p").not(dropDown).slideUp();

        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
        } else {
            $(this).closest(".accordion").find("a.active").removeClass("active");
            $(this).addClass("active");
        }

        dropDown.stop(false, true).slideToggle();

        j.preventDefault();
    });

    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $("#scroll").fadeIn();
        } else {
            $("#scroll").fadeOut();
        }
    });
    $("#scroll").click(function () {
        $("html, body").animate({ scrollTop: 0 }, 600);
        return false;
    });



    /**
     * Navbar links active state on scroll
     */
    let navbarlinks = select("#navbar .scrollto", true);
    const navbarlinksActive = () => {
        let position = window.scrollY + 200;
        navbarlinks.forEach((navbarlink) => {
            if (!navbarlink.hash) return;
            let section = select(navbarlink.hash);
            if (!section) return;
            if (
                position >= section.offsetTop &&
                position <= section.offsetTop + section.offsetHeight
            ) {
                navbarlink.classList.add("active");
            } else {
                navbarlink.classList.remove("active");
            }
        });
    };
    window.addEventListener("load", navbarlinksActive);
    onscroll(document, navbarlinksActive);

    /**
     * Back to top button
     */
    let backtotop = select(".back-to-top");
    if (backtotop) {
        const toggleBacktotop = () => {
            if (window.scrollY > 100) {
                backtotop.classList.add("active");
            } else {
                backtotop.classList.remove("active");
            }
        };
        window.addEventListener("load", toggleBacktotop);
        onscroll(document, toggleBacktotop);
    }

    const menu = document.querySelector(".menu");
    const nav = document.querySelector(".navbar");
    const btn = document.querySelector(".nav-tgl");
    const menuItems = document.querySelectorAll(".nav-link");
    btn.addEventListener("click", (evt) => {
        menu.classList.toggle("active");
        nav.classList.toggle("active");
        menuItems.forEach(function (menuItem) {
            menuItem.classList.toggle("mobile");
        });
    });

    menuItems.forEach(function (menuItem) {
        menuItem.addEventListener("click", (evt) => {
            if (menuItem.classList.contains("mobile")) {
                menu.classList.toggle("active");
                nav.classList.toggle("active");
                menuItems.forEach(function (menuItem) {
                    menuItem.classList.toggle("mobile");
                });
            }
        });
    });


    /**
     * About Carousel
     */

    const delay = 5000; //ms

    const slides = document.querySelector(".slides");
    const slidesCount = slides.childElementCount;
    const maxLeft = (slidesCount - 1) * 100 * -1;

    let current = 0;

    function changeSlide(next = true) {
        if (next) {
            current += current > maxLeft ? -100 : current * -1;
        } else {
            current = current < 0 ? current + 100 : maxLeft;
        }

        slides.style.left = current + "%";
    }

    let autoChange = setInterval(changeSlide, delay);
    const restart = function () {
        clearInterval(autoChange);
        autoChange = setInterval(changeSlide, delay);
    };

    // Controls
    document.querySelector(".next-slide").addEventListener("click", function () {
        changeSlide();
        restart();
    });

    document.querySelector(".prev-slide").addEventListener("click", function () {
        changeSlide(false);
        restart();
    });
})(jQuery);
