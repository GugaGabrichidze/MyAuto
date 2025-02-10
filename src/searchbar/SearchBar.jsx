import "./searchBar.css";

function SearchBar({ MyAutoData, setActiveButton, activeButton, CategoryData ,setCategoryData}) {
    return (
        <div className="main">
            {/* ღილაკები კატეგორიის მიხედვით */}
            <div className="carButtons">
                {["car", "tractor", "moto"].map((type) => {
                    // ღილაკის კლასის შექმნა, აქტიური ღილაკისთვის დამატებული "active" კლასი
                    let buttonClass = `${type}button`;
                    if (activeButton === type) {
                        buttonClass += " active";
                    }

                    return (
                        // თითოეული ღილაკის შექმნა
                        <button key={type} className={buttonClass} onClick={() => setActiveButton(type)}>
                            <img src={`src/searchbar/Logos/${type}.svg`} alt={type} />
                        </button>
                    );
                })}
            </div>

            {/* ფილტრების ნაწილი */}
            <div className="selects">
                {/* გარიგების ტიპი */}
                <p className="selectname">გარიგების ტიპი</p>
                <select>
                    <option>იყიდება</option>
                </select>

                {/* მწარმოებელი */}
                <p className="selectname">მწარმოებელი</p>
                <select>
                    <option>ყველა მწარმოებელი</option>
                    {/* მძღოლების (მწარმოებლების) არჩევა */}
                    {MyAutoData.map((brand) => (
                        <option key={brand.man_id}>{brand.man_name}</option>
                    ))}
                </select>

                {/* კატეგორია */}
                <p className="selectname">კატეგორია</p>
                <select>
                    <option>ყველა კატეგორია</option>
                    {/* კატეგორიის არჩევა */}
                    {CategoryData.map((category) => (
                        <option key={category.category_id} value={category.category_id}>
                            {category.title}
                        </option>
                    ))}
                </select>
            </div>

            {/* ფასები */}
            <div className="prices">
                {/* დაწყების და დამთავრების ფასის შეყვანა */}
                <input type="text" placeholder="დან" />
                <span>-</span>
                <input type="text" placeholder="მდე" />
            </div>

            {/* ძებნის ღილაკი */}
            <button className="searchbutton">ძებნა</button>
        </div>
    );
}

export default SearchBar;
