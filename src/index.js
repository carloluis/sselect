import React from 'react';
import ReactDOM from 'react-dom';
import SearchSelect from './components/SearchSelect';
import ClickOutside from './components/ClickOutside';
import SimpleSelect from './components/simple-select/SimpleSelect';
import withLifehooks from './components/withLifehooks';

const root_dom = document.getElementById('app');
window.root_dom = root_dom;

let items = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];

const Sep = ({top=20}) => <div style={{paddingTop:top}} />

const WLH = withLifehooks({
	componentWillMount: () => console.log('WLH: componentWillMount'),
	componentDidMount: () => console.log('WLH: componentDidMount'),
	componentWillReceiveProps: () => console.log('WLH: componentWillReceiveProps'),
	shouldComponentUpdate: () => console.log('WLH: shouldComponentUpdate'),
	componentWillUpdate: () => console.log('WLH: componentWillUpdate'),
	componentDidUpdate: () => console.log('WLH: componentDidUpdate'),
	componentWillUnmount: () => console.log('WLH: componentWillUnmount')
})(SimpleSelect);

class App extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			items: [{ value: 1, text: 'uno' }, { value: 2, text: 'dos' }]
		};
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick(e){
		let len = this.state.items.length;
		this.setState({
			items: [...this.state.items, {value: len, text: 'text:'+len}]
		});
	}
	render(){
		return (
			<div className='example' >
				<h4>ClickOutside>SearchSelect</h4>
				<ClickOutside node={root_dom} onClickOutside={()=>console.log('SearchSelect 1')}>
					<SearchSelect items={items} />	
				</ClickOutside>
				<Sep top={200} />

				<h4>SearchSelect</h4>
				<SearchSelect items={items} />
				<Sep top={200} />
				<h4>SimpleSelect</h4>
				<SimpleSelect style={{width:200}} />

				<Sep top={200} />
				<WLH style={{width:200}} items={this.state.items} />
				<Sep top={200} />
				<input type="button" value="CHANGE ITEMS" onClick={this.handleClick}/>
			</div>
		);
	}
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);
