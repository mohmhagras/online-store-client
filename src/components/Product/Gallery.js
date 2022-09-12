import React from "react";

export default class Gallery extends React.Component {
  state = {
    selectedImageIndex: 0,
  };
  selectImage = (newIndex) => {
    this.setState({ selectedImageIndex: newIndex });
  };
  render() {
    const { images } = this.props;
    const { selectedImageIndex } = this.state;
    return (
      <div className="gallery">
        <div className="side-images">
          {images.map((image, index) => {
            return (
              <img
                src={image}
                width={80}
                height={80}
                alt="product"
                key={index}
                style={{ cursor: "pointer" }}
                className={index === selectedImageIndex ? "selected-image" : ""}
                onClick={() => this.selectImage(index)}
              />
            );
          })}
        </div>
        <img
          src={images[selectedImageIndex]}
          className="main-image"
          alt="product main"
        />
      </div>
    );
  }
}
