gsap.registerPlugin(ScrollTrigger);

console.log("¡Script cargado!");

// Animamos todo lo que tenga la clase .parallax-img
gsap.to(".parallax-img", {
    y: 210, // Se desplazan Xpx hacia abajo
    ease: "none",
    scrollTrigger: {
        trigger: ".parallax-container",
        start: "top top", 
        end: "+=40", // El efecto dura Xpx de scroll
        scrub: 3,
        pin: true,    // Mantiene el contenedor fijo
        markers: true
    }
});

gsap.to(".parallax-img-reverse", {
    y: -150, // Se desplazan hacia abajo
    ease: "none",
    scrollTrigger: {
        trigger: ".parallax-container",
        start: "bottom bottom", 
        end: "-=1500", // El efecto dura Xpx de scroll
        scrub: 3,
        pin: true,    // Mantiene el contenedor fijo
        markers: true
    }
});

/*posible para mejorar el efecto de parallax en la sección de contacto, pero no se ve bien con el diseño actual, así que lo he comentado por ahora
gsap.to(".parallax-img-reverse2", {
    y: -300, // Se desplazan hacia abajo
    ease: "none",
    scrollTrigger: {
        trigger: ".parallax-container",
        start: "bottom bottom", 
        end: "-=80", // El efecto dura Xpx de scroll
        scrub: 3,
        pin: true,    // Mantiene el contenedor fijo
        markers: true
    }
});*/