import React from 'react'

var items = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten']; //todo: to props

class SearchSelect extends React.Component{
    constructor(props){
        super(props);
        this.documentClickHandler = this.documentClickHandler.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.onInputClick = this.onInputClick.bind(this);
        this.onItemClick = this.onItemClick.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.state = {
            value: '',
            show: false,
            search: '',
            overitem:0
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
        this.setState({ search: e.target.value });
    }
    onKeyDown(e){
        //console.log(e.keyCode, e);
        let overitem = this.state.overitem;
        switch(e.keyCode){
            case 13: //enter
                console.log('enter', e);
                this.setState({value: items[overitem]});
            case 27: //escape
                this.setState({show: false});
            break;
            case 40: //down
                console.log('down');
                let next = (overitem + 1) % items.length;
                this.setState({overitem: next, show:true});
            break;
            case 38: //up
                console.log('up');
                let prev = overitem>0? overitem-1: items.length-1;
                this.setState({overitem: prev, show:true});
            break;
        }
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
    renderItems({show, value, search, overitem}){
        let styles = {
            display: show? 'block':'none',
            width: 'inherit',
            maxHeight: '200px',
            overflow: 'auto'
        };

        return (
            <ul className="dropdown-menu" style={styles} onClick={this.onItemClick}>
                {items.filter(item => item.includes(search))
                    .map((item, index)=><li key={item} style={{backgroundColor: index==overitem?'lightgray':'', paddingLeft: 10}}
                    onMouseEnter={()=>this.setState({overitem:index})}>{item}</li>)}
            </ul>
        );
    }
    render(){
        let { search, value, show } = this.state;
        let text = show? search: value;
        return (
            <div className='input-group' style={{width:400}} tabIndex="0" 
                onClick={this.onInputClick} onFocus={this.onInputClick} onKeyDown={this.onKeyDown} >
                <input type="text" className="form-control" placeholder="search..." 
                    onChange={this.onInputChange} value={text} />
                <span className="clearer glyphicon glyphicon-triangle-bottom form-control-feedback" />
                {!show && value && <span className="glyphicon glyphicon-remove" 
                    style={{position: 'absolute', right: 40, top: 0, bottom: 0,
                        height: 14, margin: 'auto', fontSize: 16, cursor: 'pointer',
                        color: '#ccc', zIndex:2}}
                    onClick={()=>this.setState({value: ''})}/> }       
                {this.renderItems(this.state)}
            </div>
        )
    }
}

//SearchSelect.displayName='SSelect';

export default SearchSelect;
