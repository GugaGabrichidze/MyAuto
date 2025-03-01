import "./MainPage.css";
import { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "../searchbar/SearchBar.jsx";

function MainPage({ CategoryData, MyAutoData }) {
    const [AutoData, setAutoData] = useState([]);  // ავტომობილების მონაცემები
    const [filteredData, setFilteredData] = useState([]);  // ფილტრირებული მონაცემები
    const [activeButton, setActiveButton] = useState("car");  // აქტიური ღილაკი
    const [sortOption, setSortOption] = useState("date_desc");  // გადაფილტრული მონაცემების სორტირება

    useEffect(() => {
        // მონაცემების ჩამოტვირთვა API-დან
        axios.get("https://api2.myauto.ge/ka/products/")
            .then((response) => {
                if (response.data && response.data.data) {
                    setAutoData(response.data.data.items);  // ავტომობილების დასაწყისი
                    setFilteredData(response.data.data.items);  // ფილტრირებული მონაცემები
                }
            });
    }, []);

    // მონაცემების სორტირება
    const handleSortChange = (option) => {
        setSortOption(option);
        let sortedData = [...filteredData];

        switch (option) {
            case "date_desc":
                sortedData.sort((a, b) => new Date(b.prod_year) - new Date(a.prod_year));
                break;
            case "date_asc":
                sortedData.sort((a, b) => new Date(a.prod_year) - new Date(b.prod_year));
                break;
            case "price_desc":
                sortedData.sort((a, b) => b.price_usd - a.price_usd);
                break;
            case "price_asc":
                sortedData.sort((a, b) => a.price_usd - b.price_usd);
                break;
            case "mileage_desc":
                sortedData.sort((a, b) => b.car_run_km - a.car_run_km);
                break;
            case "mileage_asc":
                sortedData.sort((a, b) => a.car_run_km - b.car_run_km);
                break;
            default:
                break;
        }
        setFilteredData(sortedData);  // განახლებული მონაცემები
    };

    // ფასი ფილტრის ამოქმედება
    const handleFilterByPrice = (minPrice, maxPrice) => {
        let filteredCars = AutoData.filter(car => {
            const price = parseFloat(car.price_usd);
            if (isNaN(price)) return false;
            let min = minPrice ? parseFloat(minPrice) : -Infinity;
            let max = maxPrice ? parseFloat(maxPrice) : Infinity;
            return price >= min && price <= max;
        });
        setFilteredData(filteredCars);  // ფილტრი გამოტანა
    };

    // მწარმოებლისა და მოდელის მიხედვით ფილტრი
    const handleFilterByManufacturerAndModel = (selectedManufacturers, selectedModels) => {
        let filteredCars = AutoData.filter(car => {
            const isManufacturerMatch = selectedManufacturers.length === 0 || selectedManufacturers.includes(car.man_id.toString());
            const isModelMatch = selectedModels.length === 0 || selectedModels.includes(car.model_id.toString());

            return isManufacturerMatch && isModelMatch;
        });
        setFilteredData(filteredCars);
    };


    const getGearType = (gearType) => {
        switch (gearType) {
            case 1:
                return "მექანიკა";
            case 2:
                return "ავტომატიკა";
            case 3:
                return "ტიპტრონიკა";
        }
    };


    const getFuelTypes = (fuelType) => {
        switch (fuelType) {
            case 2:
                return "ბენზინი";
            case 3:
                return "დიზელი";
            case 4:
                return "ელექტრო";
            case 5:
                return "ჰიბრიდი";
            case 6:
                return "ბუნებრივი გაზი";
            case 7:
                return "თხევადი გაზი";
            case 8:
                return "წყალბადი";
            case 9:
                return "პლაგინ ჰიბრიდი";
        }
    };


    const getDoorType = (doorType) => {
        switch (doorType) {
            case 1:
                return "კუპე";
            case 2:
                return "სედანი";
        }
    };

    return (
        <div className="MainPage">
            {/* ძიების კომპონენტი */}
            <SearchBar
                MyAutoData={MyAutoData}
                setFilteredData={setFilteredData}
                activeButton={activeButton}
                setActiveButton={setActiveButton}
                CategoryData={CategoryData}
                handleFilterByPrice={handleFilterByPrice}
                handleFilterByManufacturerAndModel={handleFilterByManufacturerAndModel}
            />

            {/* სორტირების ფორმები */}
            <div className="selects">
                <select className="select1">
                    <option>ბოლო 3 საათი</option>
                </select>
                <select className="select2" onChange={(e) => handleSortChange(e.target.value)}>
                    <option value="date_desc">თარიღი კლებადი</option>
                    <option value="date_asc">თარიღი ზრდადი</option>
                    <option value="price_desc">ფასი კლებადი</option>
                    <option value="price_asc">ფასი ზრდადი</option>
                    <option value="mileage_desc">გარბენი კლებადი</option>
                    <option value="mileage_asc">გარბენი ზრდადი</option>
                </select>
            </div>

            {/* ავტომობილების ჩამონათვალი */}
            <div className="car-list">
                {filteredData.length > 0 ? (
                    filteredData.map((car) => (
                        <div key={car.car_id} className="car-item">
                            <img className="car-image"
                                 src={`https://static.my.ge/myauto/photos/${car.photo}/thumbs/${car.car_id}_1.jpg?v=${car.photo_ver}`}
                                 alt={car.car_model} />
                            <div className="car-info">
                                <h3>Car Name</h3>
                                <div className="p-list">
                                    <p><img src="/engine.svg" /> {(car.engine_volume / 1000).toFixed(1)} {getFuelTypes(car.fuel_type_id)}</p>
                                    <p><img src="/gear.svg" alt="gear"/> {getGearType(car.gear_type_id)}</p>
                                    <p>წელი : {car.prod_year}</p>
                                    <p><img src="/km_run.svg" alt="Kilometer Run Icon" /> {car.car_run_km} კმ</p>
                                    <p>კატეგორია: {getDoorType(car.door_type_id)}</p>
                                </div>
                                <p className="car-price">{car.price_usd} $</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>მონაცემები არ არსებობს</p>
                )}
            </div>
        </div>
    );
}

export default MainPage;
