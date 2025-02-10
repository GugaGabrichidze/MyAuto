import "./MainPage.css"
import {useEffect, useState} from "react";
import axios from "axios";

function MainPage() {
    const[AutoData, setAutoData] = useState([]);
    useEffect(() => {
        // API-დან მონაცემების მიღება (ავტომობილები, ტრაქტორები, მოტო)
        axios.get("https://api2.myauto.ge/ka/products/")
            .then((response) => {
                const CarData = response.data.items;
            });
    },);





return (
    <>
    <div className="MainPage">
        <div className={"selects"}>
            <select className={"select1"}>
                <option>ბოლო სამი საათი</option>
            </select>
            <select className={"select2"}>
                <option>თარიღი კლებადი</option>
                <option>თარიღი ზრდადი</option>
                <option>ფასი კლებადი</option>
                <option>ფასი ზრდადი</option>
                <option>გარბენი კლებადი</option>
                <option>გარბენი ზრდადი</option>
            </select>
        </div>
        <div>
            {AutoData.map((brand) => (
            <img src= "key={brand.photo} value={brand.photo}>
                {brand.title}"/>))}
            {AutoData.map((brand) => (
            <h2 key={barnd.car_model} value={brand.car_model}>123123123</h2>))}
            {AutoData.map((brand) => (
            <p></p>))}
            {AutoData.map((brand) => (
                <p></p>))}
            {AutoData.map((brand) => (
                <p></p>))}
            {AutoData.map((brand) => (
                <p></p>))}
        </div>
    </div>
    </>
);
}

export default MainPage;