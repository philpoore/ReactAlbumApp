import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route } from 'react-router'
import Albums from './Albums.jsx'
import AlbumInfo from './AlbumInfo.jsx'

var routes = (
	<Router>
		<Route path='/' component={Albums} >
			<Route path='/album/:_id' component={AlbumInfo} />
		</Route>
	</Router>
)

ReactDOM.render(routes, document.getElementById('app'));

export default routes