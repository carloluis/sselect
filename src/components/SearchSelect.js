import React from 'react'
import BaseComponent from './BaseComponent'

class SearchSelect extends BaseComponent{
    constructor(props){
        super(props);
        this._bind('documentClickHandler', 'onInputChange', 'onInputClick', 'onItemClick', 'onKeyDown', 'onRemoveValue');
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
        this.setState({ search: e.target.value, overitem:0, show:true });
    }
    onKeyDown(e){
        //console.log(e.keyCode, e);
        let {show, overitem, search} = this.state;
        let items = this.filterItems(this.props.items, search);

        switch(e.keyCode){
            case 13: //enter
                if(show){
                    this.setState({value: items[overitem], show: false});
                }else{
                    this.setState({show: true});
                }
                break;
            case 27: //scape
                if(show){
                    this.setState({show: false});
                }else{
                    this.setState({value: ''});
                }
            break;
            case 40: //down
                let next = show? (overitem + 1) % items.length: overitem;
                this.setState({overitem: next, show:true});
            break;
            case 38: //up
                let prev = show? (overitem>0? overitem-1: items.length-1): overitem;
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
    onRemoveValue(e){
        this.setState({value: ''});
    }
    filterItems(items, pattern){
        return items.filter(item => item.includes(pattern));
    }
    renderItems({show, value, search, overitem}){
        let styles = {
            display: show? 'block':'none',
            width: 'inherit',
            maxHeight: '200px',
            overflow: 'auto'
        };

        let litems = this.filterItems(this.props.items, search)
            .map((item, index)=><li key={item} style={{backgroundColor: index==overitem?'lightgray':'', paddingLeft: 10}}
            onMouseEnter={()=>this.setState({overitem:index})}>{item}</li>);

        return (
            <ul className="dropdown-menu" style={styles} onClick={this.onItemClick}>
                {litems.length? litems: <li style={{paddingLeft: 10}} onClick={(e)=>e.stopPropagation()}>no results found...</li>}
            </ul>
        );
    }
    render(){
        let { search, value, show } = this.state;
        let text = show? search: value;
        let spanstyles = {
            position: 'absolute', right: 30, top: 0, bottom: 0,
            height: 14, margin: 'auto', fontSize: 14, cursor: 'pointer',
            color: '#ccc', zIndex:2
        };

        return (
            <div className='input-group' style={{width:400}} tabIndex="0" 
                onClick={this.onInputClick} onKeyDown={this.onKeyDown} >
                <input type="text" className="form-control" placeholder="search..." 
                    onChange={this.onInputChange} value={text} />
                <span className="clearer glyphicon glyphicon-triangle-bottom" style={{...spanstyles, right:10, fontSize: 16}} />
                {!show && value && 
                    <span className="glyphicon glyphicon-remove" style={spanstyles} onClick={this.onRemoveValue} /> }       
                {this.renderItems(this.state)}
            </div>
        )
    }
}

//SearchSelect.displayName='SSelect';

export default SearchSelect;
