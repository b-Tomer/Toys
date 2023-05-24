import React, { useState } from "react";
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function GoogleMap() {

    const [coordinates, setCoordinates] = useState({ lat: 32.156509, lng: 34.847252 })
    const [zoom, setZoom] = useState(9)
    const tlv = { lat: 32.0853, lng: 34.7818 }
    const batYam = { lat: 32.016499, lng: 34.750278 }
    const hadera = { lat: 32.434048, lng: 34.919651 }
    function handleClick({ lat, lng }) {
        setZoom(20)
        console.log(zoom);
        setCoordinates({ lat, lng })
    }

    return (
        // Important! Always set the container height explicitly
        <div style={{ height: '400px', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyAaC8_t37idTPsW4-NCvOjZL_TeAyTuDX4" }}
                defaultCenter={coordinates}
                defaultZoom={zoom}
                center={coordinates}
                onClick={handleClick}
            >
                <AnyReactComponent {...tlv} text="📌" />
                <AnyReactComponent {...batYam} text="📌" />
                <AnyReactComponent {...hadera} text="📌" />
            </GoogleMapReact>
        </div>
    );
}


// import React, {PropTypes, Component} from 'react/addons';
// import shouldPureComponentUpdate from 'react-pure-render/function';
// import controllable from 'react-controllables';

// import GoogleMap from 'google-map-react';
// import MyGreatPlaceWithControllableHover from './my_great_place_with_controllable_hover.jsx';

// import {K_SIZE} from './my_great_place_with_controllable_hover_styles.js';

// @controllable(['center', 'zoom', 'hoverKey', 'clickKey'])
// export default class EventsMapPage extends Component {
//   static propTypes = {
//     center: PropTypes.array, // @controllable
//     zoom: PropTypes.number, // @controllable
//     hoverKey: PropTypes.string, // @controllable
//     clickKey: PropTypes.string, // @controllable
//     onCenterChange: PropTypes.func, // @controllable generated fn
//     onZoomChange: PropTypes.func, // @controllable generated fn
//     onHoverKeyChange: PropTypes.func, // @controllable generated fn

//     greatPlaces: PropTypes.array
//   };

//   static defaultProps = {
//     center: [59.838043, 30.337157],
//     zoom: 9,
//     greatPlaces: [
//       {id: 'A', lat: 59.955413, lng: 30.337844},
//       {id: 'B', lat: 59.724, lng: 30.080}
//     ]
//   };

//   shouldComponentUpdate = shouldPureComponentUpdate;

//   constructor(props) {
//     super(props);
//   }

//   _onBoundsChange = (center, zoom /* , bounds, marginBounds */) => {
//     this.props.onCenterChange(center);
//     this.props.onZoomChange(zoom);
//   }

//   _onChildClick = (key, childProps) => {
//     this.props.onCenterChange([childProps.lat, childProps.lng]);
//   }

//   _onChildMouseEnter = (key /*, childProps */) => {
//     this.props.onHoverKeyChange(key);
//   }

//   _onChildMouseLeave = (/* key, childProps */) => {
//     this.props.onHoverKeyChange(null);
//   }


//   render() {
//     const places = this.props.greatPlaces
//       .map(place => {
//         const {id, ...coords} = place;

//         return (
//           <MyGreatPlaceWithControllableHover
//             key={id}
//             {...coords}
//             text={id}
//             // use your hover state (from store, react-controllables etc...)
//             hover={this.props.hoverKey === id} />
//         );
//       });

//     return (
//        <GoogleMap
//         apiKey={"AIzaSyAaC8_t37idTPsW4-NCvOjZL_TeAyTuDX4"}
//         center={this.props.center}
//         zoom={this.props.zoom}
//         hoverDistance={K_SIZE / 2}
//         onBoundsChange={this._onBoundsChange}
//         onChildClick={this._onChildClick}
//         onChildMouseEnter={this._onChildMouseEnter}
//         onChildMouseLeave={this._onChildMouseLeave}
//         >
//         {places}
//       </GoogleMap>
//     );
//   }
// }