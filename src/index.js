import React from 'react'
import ReactDOM from 'react-dom'
import SearchSelect from './components/SearchSelect'

let items = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];

let example = (
    <div className='example'>
        <SearchSelect items={items} />
    </div>
);

ReactDOM.render(
    example,
    document.getElementById('app')
);
