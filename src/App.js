import './App.scss';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./components/Header/Header";
import Items from "./components/Items/Items";
import ItemsEdit from "./components/ItemsEdit/ItemsEdit";

export const MainRoutes = {
    home: {
        path: "/",
        element: <Items />
    },
    edit: {
        path: "/edit",
        element: <ItemsEdit />
    }
}

function App() {
  return (
    <BrowserRouter>
        <Header />
        <Routes>
            {
                Object.values(MainRoutes).map(
                    ({path, element}, index) => {
                        return <Route key={index} path={path} element={element}/>
                    }
                )
            }
            <Route path={"/*"} element={<Items />}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
