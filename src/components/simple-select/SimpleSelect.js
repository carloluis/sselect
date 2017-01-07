import React, { Component } from 'react';
import ClickOutside from '../ClickOutside';
import * as styles from './select.css';

const ITEMS = [
	{ value: 1, text: 'uno' },
	{ value: 2, text: 'dos' },
	{ value: 3, text: '<b>bold</b>'},
	{ value: 4, text: '<i>italic</i>'}
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

const KEY_CODES = {
	ENTER: 13,
	ESCAPE: 27,
	DOWN: 40,
	UP: 38
};

const createMarkup = (markup) => ({ __html: markup });

const ListItem = ({ item, item:{value, text}, onItemClick, onItemMouseEnter, index, selected, overItem }) => (
	<li value={value} onClick={() => onItemClick(item)} onMouseEnter={()=>onItemMouseEnter(index, item)} 
		style={{ backgroundColor: (index===overItem && '#f5f5f5') || (item===selected && '#f0f0f0')}}>
		<span className={styles.item} dangerouslySetInnerHTML={createMarkup(text)} />
	</li>
);

const ListItems = ({ open, items, onItemClick, onItemMouseEnter, selected, overItem }) => (
	<ul className="dropdown-menu" style={getListStyles(open)}>
		{ items.map((item, index) => <ListItem key={index} {...{item, onItemClick, onItemMouseEnter, index, selected, overItem}} />) }
	</ul>
);

export class SimpleSelect extends Component {
	constructor(props){
		super(props);
		this.state = {
			searchTerm: '',
			item: props.item,
			open: false,
			index: 0
		};
		this.handleClickOut = this.handleClickOut.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.removeItem = this.removeItem.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.handleItemClick = this.handleItemClick.bind(this);
		this.handleItemMouseEnter = this.handleItemMouseEnter.bind(this);
	}
	handleClickOut(e){
		this.setState({ open: false });
	}
	handleKeyDown(e){
		let { open, index, item, searchTerm } = this.state;
		let { items } = this.props;
		let items_ = this.filter(items, searchTerm);

		switch (e.keyCode) {
			case KEY_CODES.ENTER:
				this.setState({ open: !open, item: items_[index] });
				break;
			case KEY_CODES.ESCAPE:
				this.setState({ open: false, item: open? item: ITEM });
				break;
			case KEY_CODES.DOWN:
				let next = (index + 1*open) % items_.length;
				this.setState({ open: true, index: next });
				break;
			case KEY_CODES.UP:
				let prev = (index || items_.length) - 1;
				this.setState({ open: true, index: prev });
				break;
		}
	}
	handleClick(e){
		this.setState({ open: !this.state.open });
	}
	handleItemClick(item){
		this.setState({ item });
	}
	handleItemMouseEnter(index, item){
		this.setState({ index });
	}
	handleChange(e){
		e.stopPropagation();
		this.setState({ searchTerm: e.target.value });
	}
	removeItem(){
		this.setState({ item: ITEM });
	}
	filter(items, searchTerm){
		return items.filter(item => item.text.includes(searchTerm));
	}
	_render(open, items, searchTerm){
		return (
			<ul className="dropdown-menu" style={getListStyles(open)}>
				{ this.filter(items, searchTerm)
					.map((item, i) => <li key={i} value={item.value} onClick={()=>this.setState({item})}><a>{item.text}</a></li>) }
			</ul>
		);
	}
	render() {
		let { open, searchTerm, item, item: { text }, index } = this.state;
		let value = open? searchTerm: text;
		let { style, items } = this.props;
		let filteredItems = this.filter(items, searchTerm);

		return (
			<ClickOutside onClickOutside={this.handleClickOut}>
				<div className="input-group" style={style} onClick={this.handleClick} onKeyDown={this.handleKeyDown} tabIndex="0">
					<div className="form-control" dangerouslySetInnerHTML={createMarkup(value)} style={{ display: open? 'none': 'inline-block' }} />
					<input type="text" className="form-control" onChange={this.handleChange} value={value} style={{ display: open? 'inline-block': 'none' }} />
					<span className="glyphicon glyphicon-triangle-bottom" style={SPIN_STYLES} />
					{ !open && value && <span className="glyphicon glyphicon-remove" style={X_STYLES} onClick={this.removeItem}/> }
					<ListItems items={filteredItems} onItemClick={this.handleItemClick} onItemMouseEnter={this.handleItemMouseEnter} open={open} overItem={index} selected={item} />
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