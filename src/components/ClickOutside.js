import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const DEF_STYLES = { display: 'inline-block' };

export default class ClickOutside extends Component {
	constructor(props){
		super(props);
		this.handleDocClick = this.handleDocClick.bind(this);
	}
	componentDidMount() {
		this.props.node.addEventListener('click', this.handleDocClick);
	}
	componentWillUnmount() {
		this.props.node.removeEventListener('click', this.handleDocClick);
	}
	handleDocClick(e){
		const area = ReactDOM.findDOMNode(this.refs.area);
		const area_ = this.refs.area;
		console.log([area, area_].map(a=>a.contains(e.target)));

		if(!this.refs.area.contains(e.target)){
			this.props.onClickOutside(e);
		}
	}
	render() {
		let styles = { ...DEF_STYLES, ...this.props.style };
		return (
			<div ref='area' style={styles}>
				{this.props.children}
			</div>
		);
	}
}

ClickOutside.propTypes = {
	node: React.PropTypes.object, // container
	onClickOutside: React.PropTypes.func.isRequired
};
ClickOutside.defaultProps = {
	node: window.document
};