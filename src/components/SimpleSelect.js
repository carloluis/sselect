import React, { Component } from 'react';
import ClickOutside from './ClickOutside';

const ITEMS = [
	{ value: 1, text: 'uno' },
	{ value: 2, text: 'dos' },
	{ value: 'html', text: '<b>bold</b>'}
];

const ITEM = { text: '' };

const SPIN_STYLES = {
	position: 'absolute',
	cursor: 'pointer',
	margin: 'auto',
	color: '#ccc',
	fontSize:16,
	right:10,
	top: 0,
	bottom: 0,
	height: 14,
	zIndex:4
};
const X_STYLES = {
	...SPIN_STYLES,
	fontSize: 14,
	right: 30
};
const getListStyles = (visible) => ({
	display: visible? 'block':'none',
	maxHeight: 190,
	minWidth: 30,
	width: 'inherit',
	overflow: 'auto',
	cursor: 'pointer'
});

export class SimpleSelect extends Component {
	constructor(props){
		super(props);
		this.state = {
			searchTerm: '',
			item: props.item,
			open: false
		};
		this.handleClickOut = this.handleClickOut.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.removeItem = this.removeItem.bind(this);
	}
	handleClickOut(e){
		this.setState({ open: false });
	}
	handleClick(e){
		this.setState({ open: !this.state.open });
	}
	handleChange(e){
		e.stopPropagation();
		this.setState({ searchTerm: e.target.value });
	}
	removeItem(){
		this.setState({ item: ITEM });
	}
	_render(open, items){
		return (
			<ul className="dropdown-menu" style={getListStyles(open)}>
				{ items.filter(item=>item.text.includes(this.state.searchTerm))
					.map((item, i) => <li key={i} value={item.value} onClick={()=>this.setState({item})}><a>{item.text}</a></li>) }
			</ul>
		);
	}
	render() {
		let { open, searchTerm, item, item: { text } } = this.state;
		let value = open? searchTerm: text;
		let { style, items } = this.props;

		return (
			<ClickOutside onClickOutside={this.handleClickOut}>
				<div className="input-group" style={style} onClick={this.handleClick}>
					<input type="text" className="form-control" onChange={this.handleChange} value={value} />
					<span className="glyphicon glyphicon-triangle-bottom" style={SPIN_STYLES} />
					{ !open && value && <span className="glyphicon glyphicon-remove" style={X_STYLES} onClick={this.removeItem}/> }
					{ this._render(open, items) }
				</div>
			</ClickOutside>
		);
	}
}

SimpleSelect.propTypes = {
	items: React.PropTypes.arrayOf(React.PropTypes.shape({
		value: React.PropTypes.any,
		text: React.PropTypes.any
	})),
	item: React.PropTypes.shape({
		value: React.PropTypes.any,
		text: React.PropTypes.any
	})
};
SimpleSelect.defaultProps = {
	items: ITEMS,
	item: ITEM
};



export default SimpleSelect;