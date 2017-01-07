import React from 'react';
import ReactDOM from 'react-dom';
import SearchSelect from './components/SearchSelect';
import ClickOutside from './components/ClickOutside';
import SimpleSelect from './components/simple-select/SimpleSelect';

const root_dom = document.getElementById('app');
window.root_dom = root_dom;

let items = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];

const Sep = ({top=20}) => <div style={{paddingTop:top}} />

let example = (
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
	</div>
);

ReactDOM.render(
    example,
    document.getElementById('app')
);
