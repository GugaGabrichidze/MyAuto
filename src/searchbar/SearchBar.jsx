import "./searchBar.css";
import { useEffect, useState } from "react";
import axios from "axios";


function SearchBar({ MyAutoData, setActiveButton, activeButton, CategoryData }) {
    const [modelData, setModelData] = useState([]);
    const [selectedManId, setSelectedManId] = useState(""); // აირჩეული მწარმოებლის ID

    useEffect(() => {
        if (selectedManId) {
            axios.get(`https://api2.myauto.ge/ka/getManModels?man_id=${selectedManId}`)
                .then((response) => {
                    if (response.data.data) {
                        setModelData(response.data.data);
                    }
                })
                .catch((error) => console.error("მონაცემების წამოღების შეცდომა:", error));
        }
    }, [selectedManId]);

    return (
        <div className="main">
            {/* ღილაკები კატეგორიის მიხედვით */}
            <div className="carButtons">
                {["car", "tractor", "moto"].map((type) => {
                    let buttonClass = `${type}button`;
                    if (activeButton === type) {
                        buttonClass += " active";
                    }

                    return (
                        <button key={type} className={buttonClass} onClick={() => setActiveButton(type)}>
                            <img src={`src/searchbar/Logos/${type}.svg`} alt={type} />
                        </button>
                    );
                })}
            </div>

            {/* ფილტრების ნაწილი */}
            <div className="selects">
                <p className="selectname">გარიგების ტიპი</p>
                <select>
                    <option>იყიდება</option>
                </select>

                <p className="selectname">მწარმოებელი</p>
                <select onChange={(e) => setSelectedManId(e.target.value)}>
                    <option value="">ყველა მწარმოებელი</option>
                    {MyAutoData.map((brand) => (
                        <option key={brand.man_id} value={brand.man_id}>
                            {brand.man_name}
                        </option>
                    ))}
                </select>

                <p className="selectname">ყველა მოდელი</p>
                <select>
                    <option value="">მოდელი</option>
                    {modelData.map((carmodel) => (
                        <option key={carmodel.model_id} value={carmodel.model_id}>
                            {carmodel.model_name}
                        </option>
                    ))}
                </select>

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
                <input type="text" placeholder="დან" />
                <span>-</span>
                <input type="text" placeholder="მდე" />
            </div>

            <button className="searchbutton">ძებნა</button>
        </div>
    );
}

export default SearchBar;
