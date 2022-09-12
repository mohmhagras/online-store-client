import React from "react";
import ArrowLeft from "../../images/arrow-left.svg";
import { GlobalContext } from "../../context/GlobalContext";

export default class Gallery extends React.Component {
  state = {
    selectedImageIndex: 0,
  };
  static contextType = GlobalContext;
  incrementImage = () => {
    const images = this.props.images;
    this.setState((prevState) => {
      if (prevState.selectedImageIndex === images.length - 1)
        return { selectedImageIndex: 0 };
      else return { selectedImageIndex: prevState.selectedImageIndex + 1 };
    });
  };
  decrementImage = () => {
    const images = this.props.images;

    this.setState((prevState) => {
      if (prevState.selectedImageIndex === 0)
        return { selectedImageIndex: images.length - 1 };
      else return { selectedImageIndex: prevState.selectedImageIndex - 1 };
    });
  };
  render() {
    const { modifyItemQuantity } = this.context;
    const { images, quantity, productIndexInCart } = this.props;
    const index = this.state.selectedImageIndex;
    return (
      <div className="cart-gallery">
        <div className="item-quantity">
          <button
            onClick={() => modifyItemQuantity(productIndexInCart, "increase")}
          >
            +
          </button>
          <p className="item-quantity-text">{quantity}</p>
          <button
            onClick={() => modifyItemQuantity(productIndexInCart, "decrease")}
          >
            -
          </button>
        </div>
        <div className="cart-slider">
          <img src={images[index]} width={200} height={290} alt="" />
          {images.length > 1 && (
            <div className="cart-slider-arrows">
              <div className="cart-slider-arrow" onClick={this.decrementImage}>
                <img src={ArrowLeft} alt="" />
              </div>
              <div className="cart-slider-arrow">
                <img src={ArrowLeft} alt="" onClick={this.incrementImage} />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
