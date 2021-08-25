import React from "react";

export default function Review({ content }) {
  const checked = {
    color: "orange",
  };

  const starsCreation = (score) => {
    let stars = [];
    let complete = 5 - score;

    for (let i = 0; i < score; i++)
      stars.push(<span class="fa fa-star" style={checked}></span>);

    if (complete !== 0)
      for (let i = 0; i < complete; i++)
        stars.push(<span class="fa fa-star"></span>);

    return stars;
  };

  return (
    <div>
      <div className="container mt-5">
        <div>
          <hr />
          <div>{starsCreation(content.score)}</div>
          <div>{content.date}</div>
          <div>{content.description}</div>
        </div>
      </div>
    </div>
  );
}
