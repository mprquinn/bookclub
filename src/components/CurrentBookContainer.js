import React, { Component } from 'react';

class CurrentBookContainer extends Component {
  render() {
    return (
      <div className="current-book">
        <h2 className="current-book__title">Temple of the Golden Pavillion</h2>
        <img src="https://images.gr-assets.com/books/1342696904l/62798.jpg" alt="Temple of the Golden Pavillion"/>
        <p className="current-book__description">
					Mizoguchi, an ostracized stutterer, develops a childhood fascination with Kyoto’s famous Golden Temple. While an acolyte at the temple, he fixates on the structure’s aesthetic perfection and it becomes his one and only object of desire. But as Mizoguchi begins to perceive flaws in the temple, he determines that the only true path to beauty lies in an act of horrific violence. Based on a real incident that occurred in 1950, The Temple of the Golden Pavilion brilliantly portrays the passions and agonies of a young man in postwar Japan, bringing to the subject the erotic imagination and instinct for the dramatic moment that marked Mishima as one of the towering makers of modern fiction. With an introduction by Donald Keene; Translated from the Japanese by Ivan Morris.
        </p>
      </div>
    );
  }
}

export default CurrentBookContainer;
