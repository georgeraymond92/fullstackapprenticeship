import React from 'react';
import { View, Image, TouchableOpacity, Animated, Easing } from 'react-native';
import Pulse from './Pulse';


export default class LocationPulseLoader extends React.Component {
	_isMounted = true;
	constructor(props) {
		super(props);
	
		this.state = {
			circles: []
		};

		this.counter = 1;
		this.setInterval = null;
		this.anim = new Animated.Value(1);
	}

	componentDidMount() {
		this.setCircleInterval();
		this._isMounted = true;
	}

	setCircleInterval() {
		this.setInterval = setInterval(this.addCircle.bind(this), this.props.interval);
		this.addCircle();
	}

	addCircle() {
		if (this._isMounted) {

			this.setState({ circles: [...this.state.circles, this.counter] });
			this.counter++;
		}
	}

	componentWillUnmount() {
		this._isMounted = false
	}

	render() {
		const { size, avatar, avatarBackgroundColor, interval } = this.props;

		return (
			<View style={{
				flex: 1,
				backgroundColor: 'transparent',
				justifyContent: 'center',
				alignItems: 'center',
			}}>
				{this.state.circles.map((circle) => (
					<Pulse
						key={circle}
						{...this.props}
					/>
				))}

				<TouchableOpacity
					activeOpacity={1}
					// onPressIn={this.onPressIn.bind(this)}
					// onPressOut={this.onPressOut.bind(this)}
					style={{
						transform: [{
							scale: this.anim
						}]
					}}
				>
					<Image
						source={avatar}
						style={{
							width: size,
							height: size,
							borderRadius: size/2,
							backgroundColor: avatarBackgroundColor
						}}
					/>
				</TouchableOpacity>
			</View>
		);
	}	
}

// LocationPulseLoader.propTypes = {
//   interval: React.PropTypes.number,
//   size: React.PropTypes.number,
//   pulseMaxSize: React.PropTypes.number,
//   avatar: React.PropTypes.string.isRequired,
//   avatarBackgroundColor: React.PropTypes.string,
//   pressInValue: React.PropTypes.number,
//   pressDuration: React.PropTypes.number,
//   borderColor: React.PropTypes.string,
//   backgroundColor: React.PropTypes.string,
//   getStyle: React.PropTypes.func,
// };

LocationPulseLoader.defaultProps = {
  interval: 2000,
  size: 100,
  pulseMaxSize: 250,
  avatar: undefined,
  avatarBackgroundColor: 'white',
  pressInValue: 0.8,
  pressDuration: 150,
  pressInEasing: Easing.in,
  pressOutEasing: Easing.in,
  borderColor: '#D8335B',
  backgroundColor: '#ED225B55',
  getStyle: undefined,
};

