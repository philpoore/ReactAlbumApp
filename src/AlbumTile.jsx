import React from 'react'
import {Link} from 'react-router'
import config from './config.json'
import Arrow from './Arrow.jsx'

class AlbumTile extends React.Component {
	render(){
		var current = this.props.album._id === this.props.params._id;
		var wrapStyles = {
			width: config.IMAGE_WIDTH,
			height: config.IMAGE_WIDTH,
			backgroundImage: 'url(' + this.props.album.image + ')',
			backgroundSize: 'cover',
			margin: config.IMAGE_MARGIN,
			display: 'inline-block',
			transform: current ? 'scale(1.1)' : null

		}
		return (
			<div style={{display: 'inline-block'}}>
				<Link to={`/album/${this.props.album._id}`} style={wrapStyles} />
				{current ? <Arrow album={this.props.album} /> : null}
			</div>
		)
	}
}

export default AlbumTile;