
import React from 'react'
import ReactDOM from 'react-dom'
import getColor from './Colors.jsx'

class AlbumInfo extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			height: this.props.old ? 'auto' : 0,
			animate: false
		}
		this.animate = this.animate.bind(this)
	}

	componentDidMount () {
		this.animate()
	}

	componentWillReceiveProps () {
		this.setState({animate: true})
	}

	componentWillMount(){
		var album = this.props.albums.filter((album) => { return album._id === this.props.params._id})[0]
		getColor(album.image).then((color) => {
			this.setState({color: color});
		})
	}

	componentDidUpdate () {
		if (this.state.animate) {
			this.animate()
			this.setState({animate: false})
			var album = this.props.albums.filter((album) => { return album._id === this.props.params._id})[0]
			getColor(album.image).then((color) => {
				this.setState({color: color});
			})
		}

	}

	animate () {
		var el = ReactDOM.findDOMNode(this.refs.container);
		var height = el && el.offsetHeight
		this.setState({ height: height }, () => {
			if (this.props.old) {
				setTimeout(() => {
					this.setState({height: 0})
				}, 10)
			}
		})
	}

	render(){
		var colors = this.state.color || {bg: '#fff'};

		var album = this.props.albums.filter((album) => { return album._id === this.props.params._id})[0]
		var tracks = album.tracks.map((track, i) => {
			return (
				<li key={i}>{track.name} ({track.duration})</li>
			)
		});

		var styles = {
			height: this.state.height,
			transition: 'all 500ms ease',
			overflow: 'hidden',
			backgroundColor: colors.bg,
			color: '#fff'
		}

		return (
			<div style={styles}>
				<div ref="container" style={{padding: 50}}>
					<h1 style={{margin: '0 0 20px 0'}}>{album.title}</h1>
					<div style={{WebkitColumnCount: 2}}>
						<ol style={{margin: 0}}>{tracks}</ol>
					</div>
				</div>
			</div>
		)
	}
}


export default AlbumInfo