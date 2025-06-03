import React, { Component } from 'react';

class TimeCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timings: ['7:00 am', '8:00 am', '9:00 am', '10:00 am', '11:00 pm', '12:00 pm', '1:00 pm', '2:00 pm', '3:00 pm', '4:00 pm', '5:00 pm', '6:00 pm', '7:00 pm', '8:00 pm'],
      activeIndex: 0,
      displayStartIndex: 0,
      displayEndIndex: 8,
      hoverIndex: -1,
    };
  }

  handleTimingClick = (index) => {
    this.setState({ activeIndex: index });
  };

  handleNextClick = () => {
    const { displayStartIndex, displayEndIndex, timings } = this.state;
    const lastIndex = timings.length - 1;

    if (displayEndIndex < lastIndex) {
      this.setState({
        displayStartIndex: displayStartIndex + 2,
        displayEndIndex: displayEndIndex + 2,
      });
    } else {
      this.setState({
        displayStartIndex: 0,
        displayEndIndex: 2,
      });
    }
  };

  handlePrevClick = () => {
    const { displayStartIndex, displayEndIndex, timings } = this.state;
    const lastIndex = timings.length - 1;

    if (displayStartIndex > 0) {
      this.setState({
        displayStartIndex: displayStartIndex - 2,
        displayEndIndex: displayEndIndex - 2,
      });
    } else {
      this.setState({
        displayStartIndex: lastIndex - 2,
        displayEndIndex: lastIndex,
      });
    }
  };

  handleMouseEnter = (index) => {
    this.setState({ hoverIndex: index });
  };

  handleMouseLeave = () => {
    this.setState({ hoverIndex: -1 });
  };

  render() {
    const { displayStartIndex, displayEndIndex, hoverIndex } = this.state;
    const displayedTimings = this.state.timings.slice(displayStartIndex, displayEndIndex + 1);

    return (
      <div className="carousel-slide zw_time_car">
        <div className="carousel slot" id="carousel0" style={{ scrollBehavior: "auto", marginLeft: "0px", zIndex: '5' }}>
          {displayStartIndex > 0 && (
            <button name="prev button" className="prev icon-left-arrow"
              type="button"
              onClick={this.handlePrevClick}
            >
            </button>
          )}
          <ul className='zw_time_slot'>
            {displayedTimings.map((timing, index) => (
              <li
                key={index}
                type="button"
                className={`poppins-regular zw_15 zw_text_color time-slot zw_white_bg ${index + displayStartIndex === this.state.activeIndex ? 'active' : ''
                  } ${index === hoverIndex ? 'hovered' : ''}`}
                onClick={() => this.handleTimingClick(index + displayStartIndex)}
                onMouseEnter={() => this.handleMouseEnter(index)}
                onMouseLeave={this.handleMouseLeave}
                style={{ marginRight: '8px', borderRadius: '4px' }}
              >
                {timing}
              </li>
            ))}
          </ul>
          {displayEndIndex < this.state.timings.length - 1 && (
            <button name="next button" className="next icon-right-arrow"
              type="button"
              onClick={this.handleNextClick}
            >
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default TimeCarousel;