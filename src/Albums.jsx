import config from './config.json'
import React from 'react'

import AlbumInfo from './AlbumInfo.jsx'
import AlbumTile from './AlbumTile.jsx'

class Albums extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			albums: [],
      		lastChildId: null,
			viewportWidth: window.innerWidth
		};

		$.getJSON('/data/all.json', (result) => {
			this.setState({
				albums: result
			});
		});

		this.calcRows = this.calcRows.bind(this);
		this.calcNumPerRow = this.calcNumPerRow.bind(this);
		this.renderRow = this.renderRow.bind(this);
	}
	calcNumPerRow(){
		var imageWidth = config.IMAGE_WIDTH + config.IMAGE_MARGIN * 2;
		return Math.floor(this.state.viewportWidth / imageWidth);
	}
	calcRows(){
		var numPerRow = this.calcNumPerRow();

		var rows = this.state.albums.reduce((rows, album, index) => {
			if (index % numPerRow === 0){
				rows.push([]);
			}
			rows[rows.length - 1].push(album);
			return rows;
		}, []);

		return rows;
	}
	componentDidMount () {
		window.addEventListener('resize', () => {
			this.setState({ viewportWidth: window.innerWidth })
		})
	}
	componentWillReceiveProps(newProps){
		var oldId = this.props.params._id;
		if (oldId && newProps.params._id !== oldId){
			this.setState({ lastChildId: oldId });
		}
	}
	renderRow(row, j){
		var albums = row.map((album, i) => {
			return (
				<AlbumTile album={album} key={i} params={this.props.params} />
			)
		});


	    var currentId = this.props.params._id
	    var { lastChildId } = this.state
	    var hasCurrent = row.filter(album => album._id === currentId).length > 0
	    var hadCurrent = row.filter(album => album._id === lastChildId).length > 0
	    var sameRow = hasCurrent && hadCurrent

		return (
			<div key={j}>
				{albums}
		        {hasCurrent ? <AlbumInfo params={this.props.params} albums={this.state.albums} /> : null}
		        {(hadCurrent && !sameRow) ? <AlbumInfo params={{_id: lastChildId}} albums={this.state.albums} old={true} /> : null}
			</div>
		)
	}
	render(){
		return (
			<div>
				{this.calcRows().map(this.renderRow)}
			</div>
		);
	}
}

export default Albums