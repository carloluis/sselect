import React from 'react'

var items = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten']; //todo: to props

class SearchSelect extends React.Component{
    constructor(props){
        super(props);
        this.documentClickHandler = this.documentClickHandler.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.onInputClick = this.onInputClick.bind(this);
        this.onItemClick = this.onItemClick.bind(this);
        this.state = {
            value: '',
            show: false
        };
    }
    componentDidMount(){
        // click outside component...
        document.addEventListener("click", this.documentClickHandler);
    }
    componentWillUnmount(){
        document.removeEventListener("click", this.documentClickHandler);
    }
    documentClickHandler(){
        if(this.state.show){ // ... => hide
            this.setState({ show: false });
        }
    }
    onInputChange(e){
        // value to search for..
        this.setState({ value: e.target.value });
    }
    onInputClick(e){
        // show options..
        e.nativeEvent.stopImmediatePropagation();
        this.setState({ show: true });
    }
    onItemClick(e){
        e.nativeEvent.stopImmediatePropagation();
        e.stopPropagation();
        this.setState({
            value: e.target.innerText,
            show:false
        });
    }
    renderItems({show, value}){
        let styles = {
            display: 'block',
            width: 'inherit',
            maxHeight: '200px',
            overflow: 'auto'
        };

        return show? (
            <ul className="dropdown-menu" style={styles} onClick={this.onItemClick}>
                {items.filter(i=>i.includes(value)).map((item, index)=><li key={item}>{item}</li>)}
            </ul>
        ): null;
    }
    render(){
        return (
            <div className='input-group' style={{width:400}} tabIndex="0" 
                onClick={this.onInputClick} onFocus={this.onInputClick} >
                <input type="text" className="form-control" placeholder="search..."                    
                    onChange={this.onInputChange} value={this.state.value} />
                <div className="input-group-addon">
                    <span className="caret"/>
                </div>
                {this.renderItems(this.state)}
            </div>
        )
    }
}

export default SearchSelect;