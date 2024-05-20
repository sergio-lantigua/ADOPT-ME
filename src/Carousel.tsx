import { Component, MouseEvent } from "react";

interface IProps {
  images: string[];
}

class Carousel extends Component<IProps> {
  state = {
    active: 0,
  };

  static defaultProps = {
    images: ["http://pets-images.dev-apis.com/pets/none.jpg"],
  };

  handleIndexClick = (e: MouseEvent<HTMLElement>) => {
    if (!(e.target instanceof HTMLElement)) {
      return;
    }

    if (e.target.dataset.index) {
      this.setState({
        active: parseInt(e.target.dataset.index),
      });
    }
  };

  render() {
    const { active } = this.state;
    const { images } = this.props;

    return (
      <div className="mt-2 flex h-[400px] items-center justify-around ">
        <img
          data-testid="hero"
          className="max-h-[400px] max-w-[90%] sm:max-w-[45%]"
          src={images[active]}
          alt="animal hero"
        />
        <div className="hidden sm:block sm:w-1/2">
          {images.map((photo, index) => (
            // eslint-disable-next-line
            <img
              data-testid={`thumbnail${index}`}
              onClick={this.handleIndexClick}
              data-index={index}
              key={photo}
              src={photo}
              className={
                "m-4 inline-block h-[100px] w-[100px] cursor-pointer rounded-full border-2 border-solid border-[#333] " +
                (index === active ? "opacity-50" : "")
              }
              alt="animal thumbnail"
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
