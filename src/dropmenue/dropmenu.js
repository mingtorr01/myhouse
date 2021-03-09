import "./dropmenu.css"


function Dropmenu(props){
    const listname_hostpital =()=>{
        props.listname_change_props('hospital');
    }
    const listname_education =()=>{
        props.listname_change_props('education');
    }
    const listname_store =()=>{
        props.listname_change_props('store');
    }
    const listname_caps =()=>{
        props.listname_change_props('caps');
    }
    return(
        <div className="dropmenu_main">
            <a href="#" value="1" onClick={listname_hostpital}>의료</a>
            <a href="#" value="2" onClick={listname_education}>교육</a>
            <a href="#" value="3" onClick={listname_store}>편의</a>
            <a href="#" value="4" onClick={listname_caps}>치안</a>
        </div>
    )
}

export default Dropmenu