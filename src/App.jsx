import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./searchbar/SearchBar.jsx";
import MainPage from "./Main/MainPage.jsx";
function App() {
    // მდგომარეობა, რომელიც ინახავს ავტომობილების მონაცემებს პირველი API-დან
    const [MyAutoData, setMyAutoData] = useState([]);

    // მდგომარეობა, რომელიც აკონტროლებს აქტიურ ღილაკს (ავტომობილი, ტრაქტორი, მото)
    const [activeButton, setActiveButton] = useState("car");

    // მდგომარეობა, რომელიც ინახავს კატეგორიის მონაცემებს მეორე API-დან
    const [CategoryData, setCategoryData] = useState([]);

    // useEffect, რომელიც მიმდინარეობს აქტიური ღილაკის ცვლილებისას და იღებს მონაცემებს აქტიური კატეგორიის მიხედვით
    useEffect(() => {
        // API-დან მონაცემების მიღება (ავტომობილები, ტრაქტორები, მოტო)
        axios.get("https://static.my.ge/myauto/js/mans.json")
            .then((response) => {
                const allData = response.data;

                // მონაცემების ფილტრაცია აქტიური ღილაკის მიხედვით
                let filteredData = [];
                if (activeButton === "car") {
                    filteredData = allData.filter(item => item.is_car === "1");
                } else if (activeButton === "tractor") {
                    filteredData = allData.filter(item => item.is_spec === "1");
                } else if (activeButton === "moto") {
                    filteredData = allData.filter(item => item.is_moto === "1");
                }

                // ფილტრირებული მონაცემების განახლება
                setMyAutoData(filteredData);
            });
    }, [activeButton]); // ამ ეფექტის შესრულება ხდება მხოლოდ მაშინ, როდესაც activeButton შეიცვლება

    // useEffect, რომელიც მიმდინარეობს აქტიური ღილაკის ცვლილებისას და იღებს კატეგორიის მონაცემებს აქტიური კატეგორიის მიხედვით
    useEffect(() => {
        // API-დან კატეგორიის მონაცემების მიღება
        axios.get("https://api2.myauto.ge/ka/cats/get")
            .then((response) => {
                if (response.data && response.data.data) {
                    let catgrData = response.data.data;

                    // კატეგორიის მონაცემების ფილტრაცია აქტიური ღილაკის მიხედვით
                    let filteredCategoryData = [];
                    if (activeButton === "car") {
                        filteredCategoryData = catgrData.filter(item => item.category_type === 0);
                    } else if (activeButton === "tractor") {
                        filteredCategoryData = catgrData.filter(item => item.category_type === 1);
                    } else if (activeButton === "moto") {
                        filteredCategoryData = catgrData.filter(item => item.category_type === 2);
                    }

                    // ფილტრირებული კატეგორიის მონაცემების განახლება
                    setCategoryData(filteredCategoryData);
                }
            });
    }, [activeButton]);// ამ ეფექტის შესრულება ხდება მხოლოდ მაშინ, როდესაც activeButton შეიცვლება


    return (
        <>
        <div>
            {/* გადაცემა მონაცემების SearchBar კომპონენტში */}
            <SearchBar
                MyAutoData={MyAutoData} // ფილტრირებული ავტომობილების მონაცემები
                setActiveButton={setActiveButton} // ფუნქცია, რომ შეიცვალოს აქტიური ღილაკი
                activeButton={activeButton} // მიმდინარე აქტიური კატეგორიის ღილაკი
                CategoryData={CategoryData} // ფილტრირებული კატეგორიის მონაცემები
                setCategoryData={setCategoryData} // ფუნქცია კატეგორიის მონაცემების დასაწესებლად
            />
        </div>
            <div>
                <MainPage/>
            </div>
        </>
    );
}

export default App;
