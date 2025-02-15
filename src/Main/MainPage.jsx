import "./MainPage.css";
import { useEffect, useState } from "react";
import axios from "axios";

function MainPage() {
    const [AutoData, setAutoData] = useState([]);

    useEffect(() => {
        axios.get("https://api2.myauto.ge/ka/products/")
            .then((response) => {
                if (response.data && response.data.data) {
                    setAutoData(response.data.data.items);
                }
            })
    }, []);


    return (
        <div className="MainPage">
            {/* ფილტრების ნაწილი */}
            <div className="selects">
                <select className="select1">
                    <option>ბოლო 3 საათი</option>
                </select>
                <select className="select2">
                    <option>თარიღი კლებადი</option>
                    <option>თარიღი ზრდადი</option>
                    <option>ფასი კლებადი</option>
                    <option>ფასი ზრდადი</option>
                    <option>გარბენი კლებადი</option>
                    <option>გარბენი ზრდადი</option>
                </select>
            </div>

            {/* მანქანების სია */}
            <div className="car-list">
                {AutoData.map((car) => (
                    <div key={car.car_id} className="car-item">
                        <img src={`https://static.myauto.ge/${car.photo}`} alt={car.car_model} className="car-image" />
                        <div className="car-info">
                            <h2>{car.car_model}</h2>
                            <p>{car.year} წელი : {car.prod_year} კმ : {car.car_run_km}</p>
                            <p className="car-price">{car.price_usd} $</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MainPage;
