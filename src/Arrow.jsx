import React from 'react'
import getColor from './Colors.jsx'

class Arrow extends React.Component {
	constructor(props){
		super(props);
		this.state = {};
	}
	componentWillMount(){
		var album = this.props.album;
		getColor(album.image).then((color) => {
			this.setState({color: color});
		})
	}
	render () {
		var color = this.state.color && this.state.color.bg || 'transparent';
		var styles = {
			width: 0,
			height: 0,
			borderLeft: '10px solid transparent',
			borderRight: '10px solid transparent',
			borderBottom: `10px solid ${color}`,
			marginLeft: 75,
			marginTop: -10,
			position: 'absolute',
			transition: 'all 500ms ease'
		}
		return <div style={styles}/>
	}
}


export default Arrow;