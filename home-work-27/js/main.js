const slider = (function () {
    /*
     * State
     */
    const state = {
        duration: 0,
        numberOfSlides: 0,
        mode: "play",
        currentIndex: 0,
        elements: {
            container: null,
            list: null,
            items: null,
            points: {
                container: null,
                items: null,
            },
            buttons: {
                prev: null,
                next: null,
                play: null,
            },
        },
        setElements({ container, items }) {
            this.elements.container = document.querySelector(container);
            this.elements.items = document.querySelectorAll(items);
        },
        setNumberOfSlides() {
            this.numberOfSlides = this.elements.items.length;
        },
        generatePoints() {
            const pointsTemplate = new Array(this.numberOfSlides)
                .fill(0)
                .reduce((template, _, index) => {
                    return `${template}<span data-index='${index}'></span>`;
                }, "");

            this.elements.points.container.innerHTML = pointsTemplate;
            this.elements.points.items = this.elements.points.container.children;
        },
        initElements(elements) {
            this.elements.list = document.getElementById("slider-list");
            this.elements.buttons.prev = document.getElementById("slider-prev");
            this.elements.buttons.next = document.getElementById("slider-next");
            this.elements.buttons.play = document.getElementById("slider-play");
            this.elements.points.container = document.getElementById("slider-points");

            state.setElements(elements);
            state.setNumberOfSlides();
            state.generatePoints();
        }
    };

    const getIndex = () => state.currentIndex;
    const setIndex = (index) => (state.currentIndex = index);
    const increaseIndex = () => ++state.currentIndex;
    const decreaseIndex = () => --state.currentIndex;
    const toggleMode = () => (state.mode = state.mode === "play" ? "pause" : "play");

    /*
     * Navigation
     */
    const navigation = (function () {
        const getStep = (index) => {
            return (index - state.numberOfSlides * Math.floor(index / state.numberOfSlides));
        };

        const stepHandlers = {
            next() {
                return getStep(increaseIndex());
            },
            prev() {
                return getStep(decreaseIndex());
            },
            moveTo(index) {
                return getStep(setIndex(Number(index)));
            },
            current() {
                return getStep(getIndex());
            },
        };

        return {
            init() {
                return {
                    step: stepHandlers,
                };
            },
        };
    })();

    /*
     * Events
     */
    const events = (function () {
        let prev = null;
        let next = null;
        let play = null;
        let points = null;
        let slides = null;

        let keydownFn = null;
        let prevFn = null;
        let prevKeyFn = null;
        let nextFn = null;
        let nextKeyFn = null;
        let playFn = null;
        let pointsFn = null;
        let mousedownFn = null;
        let mouseupFn = null;
        let timer = null;

        const clickEvent = {
            onPrev(handlePrev) {
                prevFn = handlePrev;
                prev.addEventListener("click", prevFn);
            },
            onNext(handleNext) {
                nextFn = handleNext;
                next.addEventListener("click", nextFn);
            },
            onPlay(handlePlay) {
                playFn = () => {
                    handlePlay(toggleMode());
                };

                play.addEventListener("click", playFn);
            },
            onPoint(handlePoint) {
                pointsFn = (e) => {
                    const point = e.target.closest("span");
                    if (!point) {
                        return;
                    }
                    
                    handlePoint(point.dataset.index);
                };

                points.container.addEventListener("click", pointsFn);
            },
        };

        const keyEvent = {
            onKey({ prev, next }) {
                prevKeyFn = prev;
                nextKeyFn = next;

                keydownFn = function (e) {
                    switch (e.code) {
                        case 'ArrowLeft':
                            prevKeyFn();
                            break;
                        case 'ArrowRight':
                            nextKeyFn();
                            break;
                    }
                };

                document.addEventListener('keydown', keydownFn);
            }
        };

        const swipesEvent = (swipes) => {
            let startPositionX = 0;
            const getX = (e) => e.touches?.[0].clientX ?? e.changedTouches?.[0].clientX ?? e.clientX;

            mousedownFn = (e) => {
                e.preventDefault();

                startPositionX = getX(e);
            };

            mouseupFn = (e) => {
                e.preventDefault();

                getX(e) < startPositionX ? swipes.next(): swipes.prev();

                startPositionX = 0;
            };

            slides.addEventListener("mousedown", mousedownFn);
            slides.addEventListener("mouseup", mouseupFn);
            slides.addEventListener("touchstart", mousedownFn);
            slides.addEventListener("touchend", mouseupFn);
        };

        const intervalEvent = {
            start(handleInterval, duration) {
                timer = setInterval(handleInterval, duration);
            },
            stop() {
                clearInterval(timer);
            },
        };

        return {
            init() {
                prev = state.elements.buttons.prev;
                next = state.elements.buttons.next;
                play = state.elements.buttons.play;
                points = state.elements.points;
                slides = state.elements.list;

                return {
                    click: clickEvent,
                    key: keyEvent,
                    swipe: swipesEvent,
                    interval: intervalEvent,
                };
            },
            destroy() {
                document.removeEventListener("keydown", keydownFn);
                prev.removeEventListener("click", prevFn);
                next.removeEventListener("click", nextFn);
                play.removeEventListener("click", playFn);
                points.container.removeEventListener("click", pointsFn);
                slides.removeEventListener("mousedown", mousedownFn);
                slides.removeEventListener("mouseup", mouseupFn);
                slides.removeEventListener("touchstart", mousedownFn);
                slides.removeEventListener("touchend", mouseupFn);

                intervalEvent.stop();
                
                prev = null;
                next = null;
                play = null;
                points = null;
                slides = null;

                keydownFn = null;
                prevFn = null;
                prevKeyFn = null;
                nextFn = null;
                nextKeyFn = null;
                pointsFn = null;
                mousedownFn = null;
                mouseupFn = null;
                timer = null;
            },
        };
    })();

    /*
     * Render
     */
    const render = (function () {
        const renderSlide = ({ prevIndex, currentIndex }) => {
            state.elements.items[prevIndex].style.opacity = 0;
            state.elements.items[currentIndex].style.opacity = 1;
        };

        const renderPoints = ({ prevIndex, currentIndex }) => {
            state.elements.points.items[prevIndex].classList.remove("active");
            state.elements.points.items[currentIndex].classList.add("active");
        };

        const renderHandlers = {
            render(currentStep, action = () => {}) {
                const prevIndex = currentStep();
                action();
                const currentIndex = currentStep();

                renderSlide({
                    prevIndex,
                    currentIndex,
                });
                renderPoints({
                    prevIndex,
                    currentIndex,
                });
            },
            renderPlay(mode) {
                const iconTag = state.elements.buttons.play.children[0];

                iconTag.classList.toggle("fa-circle-pause");
                iconTag.classList.toggle("fa-circle-play");
            },
        };

        return {
            init() {
                return {
                    handler: renderHandlers,
                };
            },
        };
    })();

    /*
     * Slider
     */
    const init = (elements, options = { duration: 1000 }) => {
        // Init State
        state.duration = options.duration;

        // Init Elements
        state.initElements(elements);

        // Init Navigation
        const navigationInitiation = navigation.init();

        // Init Events
        const eventsInitiation = events.init();

        // Init Render
        const renderInitiation = render.init();

        // Handlers navigation
        const handlePrev = () => renderInitiation.handler.render( navigationInitiation.step.current, navigationInitiation.step.prev);
        const handleNext = () => renderInitiation.handler.render( navigationInitiation.step.current, navigationInitiation.step.next);
        const navigationHandlers = { prev: handlePrev, next: handleNext };

        // Init first render
        renderInitiation.handler.render(navigationInitiation.step.current);

        // Launch Events
        eventsInitiation.click.onPrev(handlePrev);

        eventsInitiation.click.onNext(handleNext);

        eventsInitiation.click.onPlay((mode) => {
            renderInitiation.handler.renderPlay(mode);

            if (mode === "pause") {
                eventsInitiation.interval.stop();
            } else {
                eventsInitiation.interval.start(handleNext, state.duration);
            }
        });

        eventsInitiation.click.onPoint((i) => {
            renderInitiation.handler.render(navigationInitiation.step.current, () => navigationInitiation.step.moveTo(i));
        });

        eventsInitiation.key.onKey(navigationHandlers);
        eventsInitiation.swipe(navigationHandlers);

        eventsInitiation.interval.start(handleNext, state.duration);
    };

    return {
        init,
        destroy() {
            events.destroy();
        }
    };
})();
