import './ItemsCard.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
export default function ItemsCard(props){
    return (
        <div className="ItemsCard">
            <div className="header">
                <h3>{props.item.title}</h3>
            </div>
            <div className="body">
                <img />
                <div className="description">
                    <p>{props.item.description}</p>
                </div>
                {props.item.elements.length?<div className="elements">
                    <h4>Elements</h4>
                    <ul>
                        {
                            props.item.elements.map((element, index) => (
                                <li key={index}>
                                    <h5>{element.title}</h5>
                                    <p>{element.amount}</p>
                                </li>
                            ))
                        }
                    </ul>
                </div>:null}
            </div>
            <div className="actions">
                <div className="add">
                    <FontAwesomeIcon icon={faShoppingCart} className={"icon"}></FontAwesomeIcon>
                    <input type="button" value="" />
                </div>
            </div>
        </div>
    )
}
