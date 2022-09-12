import React from "react";
import ArrowLeft from "../../images/arrow-left.svg";
import { GlobalContext } from "../../context/GlobalContext";

export default class MiniGallery extends React.Component {
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
      <div className="cart-gallery small">
        <div className="item-quantity">
          <button
            className="small"
            onClick={() => modifyItemQuantity(productIndexInCart, "increase")}
          >
            +
          </button>
          <p className="item-quantity-text">{quantity}</p>
          <button
            className="small"
            onClick={() => modifyItemQuantity(productIndexInCart, "decrease")}
          >
            -
          </button>
        </div>
        <div className="cart-slider">
          <img src={images[index]} width={120} height={190} alt="" />
        </div>
      </div>
    );
  }
}
