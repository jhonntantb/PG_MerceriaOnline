
import React, { useState } from 'react';
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption
} from 'reactstrap';
import './Carrusel.css'



const Carrousel = (props) => {
    const items = props.images
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);
    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === props.images.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    }

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? props.images.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    }

    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
    }
    var key=0;
    const slides = items.map((item) => {
        key++;
        return (

            <CarouselItem 
                class="container"
                onExiting={() => setAnimating(true)}
                onExited={() => setAnimating(false)}
                key={item.id}
            >
                <img class="carrusel" src={item.image_url} alt={item.altText} width="100%" height="500rem" />
                <CarouselCaption key={key*10} captionText={item.caption} captionHeader={item.caption} />
            </CarouselItem>

        );
    });


    return (
        <Carousel
            activeIndex={activeIndex}
            next={next}
            previous={previous}
        >
            <CarouselIndicators items={props.images} activeIndex={activeIndex} onClickHandler={goToIndex} />
            {slides}
            <CarouselControl direction="prev" onClickHandler={previous} />
            <CarouselControl direction="next" onClickHandler={next} />
        </Carousel>
    );
}

export default Carrousel;