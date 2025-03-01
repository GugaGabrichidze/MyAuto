import "./searchBar.css";
import { useState, useEffect } from "react";
import axios from "axios";
import ManufacturerDropdown from "./ManufacturerDropdown";
import ModelDropdown from "./ModelDropdown";

function SearchBar({
                       MyAutoData,
                       setActiveButton,
                       activeButton,
                       CategoryData,
                       setFilteredData,
                       handleFilterByPrice,
                       handleFilterByManufacturerAndModel,
                   }) {
    const [modelData, setModelData] = useState([]);
    const [selectedManufacturers, setSelectedManufacturers] = useState([]);
    const [selectedModels, setSelectedModels] = useState([]);
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    useEffect(() => {
        if (selectedManufacturers.length === 1) {
            axios
                .get(`https://api2.myauto.ge/ka/getManModels?man_id=${selectedManufacturers[0]}`)
                .then((response) => {
                    if (response.data.data) {
                        setModelData(response.data.data);
                    }
                });
        } else {
            setModelData([]);
        }
    }, [selectedManufacturers]);

    const handleApplyFilters = () => {
        // console.log("Selected manufacturers:", selectedManufacturers);
        // console.log("Selected models:", selectedModels);

        handleFilterByManufacturerAndModel(selectedManufacturers, selectedModels);
        handleFilterByPrice(minPrice, maxPrice);
    };

    return (
        <div className="main">
            <div className="carButtons">
                {["car", "tractor", "moto"].map((type) => {
                    let buttonClass = `${type}button`;
                    if (activeButton === type) {
                        buttonClass += " active";
                    }

                    return (
                        <button
                            key={type}
                            className={buttonClass}
                            onClick={() => setActiveButton(type)}
                        >
                            <img src={`src/searchbar/Logos/${type}.svg`} alt={type} />
                        </button>
                    );
                })}
            </div>

            <div className="selects">
                <p className="selectname">გარიგების ტიპი</p>
                <select>
                    <option>იყიდება</option>
                </select>

                <p className="selectname">მწარმოებელი</p>
                <ManufacturerDropdown
                    MyAutoData={MyAutoData}
                    selectedManufacturers={selectedManufacturers}
                    setSelectedManufacturers={setSelectedManufacturers}
                />

                <p className="selectname">მოდელი</p>
                <ModelDropdown
                    selectedManId={selectedManufacturers[0]}
                    selectedModels={selectedModels}
                    setSelectedModels={setSelectedModels}
                    modelData={modelData}
                />

                <p className="selectname">კატეგორია</p>
                <select>
                    <option value="">ყველა კატეგორია</option>
                    {CategoryData.map((category) => (
                        <option key={category.category_id} value={category.category_id}>
                            {category.title}
                        </option>
                    ))}
                </select>
            </div>

            <div className="prices">
                <input
                    placeholder="დან₾"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                />
                <span className="price-span">-</span>
                <input
                    placeholder="მდე₾"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                />
            </div>

            <button className="searchbutton" onClick={handleApplyFilters}>
                ძებნა
            </button>
        </div>
    );
}

export default SearchBar;
