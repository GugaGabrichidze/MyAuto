import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./searchbar/SearchBar.jsx";
import MainPage from "./Main/MainPage.jsx";

function App() {
    const [MyAutoData, setMyAutoData] = useState([]); // ავტომობილების მონაცემები
    const [activeButton, setActiveButton] = useState("car"); // აქტიური ღილაკი
    const [CategoryData, setCategoryData] = useState([]); // კატეგორიის მონაცემები
    const [filteredData, setFilteredData] = useState([]); // ფილტრირებული მონაცემები

    useEffect(() => {
        axios.get("https://static.my.ge/myauto/js/mans.json")
            .then((response) => {
                const allData = response.data;
                let filteredData = [];
                if (activeButton === "car") {
                    filteredData = allData.filter(item => item.is_car === "1");
                } else if (activeButton === "tractor") {
                    filteredData = allData.filter(item => item.is_spec === "1");
                } else if (activeButton === "moto") {
                    filteredData = allData.filter(item => item.is_moto === "1");
                }
                setMyAutoData(filteredData);
                setFilteredData(filteredData); // დამახსოვრეთ მონაცემები
            });
    }, [activeButton]);

    useEffect(() => {
        axios.get("https://api2.myauto.ge/ka/cats/get")
            .then((response) => {
                if (response.data && response.data.data) {
                    const catgrData = response.data.data;
                    let filteredCategoryData = [];
                    if (activeButton === "car") {
                        filteredCategoryData = catgrData.filter(item => item.category_type === 0);
                    } else if (activeButton === "tractor") {
                        filteredCategoryData = catgrData.filter(item => item.category_type === 1);
                    } else if (activeButton === "moto") {
                        filteredCategoryData = catgrData.filter(item => item.category_type === 2);
                    }
                    setCategoryData(filteredCategoryData);
                }
            });
    }, [activeButton]);

    return (
        <div>
            <SearchBar
                MyAutoData={MyAutoData}
                setActiveButton={setActiveButton}
                activeButton={activeButton}
                CategoryData={CategoryData}
                setFilteredData={setFilteredData}
            />
            <MainPage
                AutoData={filteredData.length > 0 ? filteredData : MyAutoData}
                setFilteredData={setFilteredData}
                MyAutoData={MyAutoData}
                CategoryData={CategoryData}
                activeButton={activeButton}
                setActiveButton={setActiveButton}
            />
        </div>
    );
}

export default App;
