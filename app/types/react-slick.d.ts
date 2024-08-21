declare module 'react-slick' {
    import * as React from 'react';
  
    export interface Settings {
      dots?: boolean;
      infinite?: boolean;
      speed?: number;
      slidesToShow?: number;
      slidesToScroll?: number;
      arrows?: boolean;
      autoplay?: boolean;
      pauseOnHover?: boolean;
      // Add any other settings you need
    }
  
    export default class Slider extends React.Component<Settings> {}
  }
  