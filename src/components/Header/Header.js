import './Header.scss'
import {Link} from "react-router-dom";
export default function Header(props){
    return (
        <div className="Header">
            <nav>
                <ul>
                    <li><Link to={"/"}>Home</Link></li>
                    <li><Link to={"/edit"}>Edit</Link></li>
                </ul>
            </nav>
        </div>
    )
}
