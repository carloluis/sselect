import React, { Component } from 'react';

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
	onClickOutside: React.PropTypes.func.isRequired,
	node: React.PropTypes.object,
};
ClickOutside.defaultProps = {
	node: window.document
};