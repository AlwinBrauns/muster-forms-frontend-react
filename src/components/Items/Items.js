import './Items.scss'
import {Fragment, useEffect, useState} from "react";
import {BackendService} from "../../services/backend.service";
import ItemsCard from "../ItemsCard/ItemsCard";
export default function Items(props){
    const [items, setItems] = useState([])
    useEffect(()=>{
        if(items.length===0) {
            BackendService.getAllItems().then(({data}) => {
                setItems(data)
            })
        }
    }, [items])
    return (
        <div className="Items">
            {
                items.map((item, index) => {
                    return <Fragment key={index}> <ItemsCard item={item} /> </Fragment>
                })
            }
        </div>
    )
}
