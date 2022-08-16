import React, { Component } from 'react';

class SearchBar extends Component {
	constructor(props) {
		super(props);
	}

	state = {  }

	render() { 
		return (
			<p className="lead">
				<form autocomplete="off">
					<div className="input-group w-50 mx-auto">
						<div className="dropdown">
							<button className="btn btn-secondary btn-lg dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							  Search by
							</button>
							<div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
								<p className="dropdown-item">Kanji</p>
								<p className="dropdown-item">Radical</p>
								<p className="dropdown-item">Meaning</p>
							</div>
						</div>
						<input id="searchBar" type="text" className="form-control" placeholder="Search" />
						<input id="searchBtn" type="submit" className="btn btn-primary btn-lg fw-bold" value="Search" />
					</div>
				</form>
			</p>
		);
	}
}
 
export default SearchBar;