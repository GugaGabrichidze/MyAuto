import './searchBar.css'
function SearchBar(){
    return(
        <>
            <div className={"main"}>
                <div className={"carButtons"}></div>
                <button className={"carbutton"}><img src={"src/searchbar/Logos/car.png"}></img></button>
                <button className={"tractorbutton"}><img src={"src/searchbar/Logos/tractor.png"}></img></button>
                <button className={"motobutton"}> <img src={"src/searchbar/Logos/moto.png"}></img></button>
                <div className={"selects"}>
                    <p className={"selectname"}>გარიგების ტიპი</p>
                    <div><select><option>იყიდება</option></select></div>
                    <div><p className={"selectname"}>მწარმოებელი</p></div>
                    <div><select><option>ყველა მწარმოებელი</option></select></div>
                    <div><p className={"selectname"}>კატეგორია</p></div>
                    <div><select><option>ყველა კატეგორია</option></select></div>
                </div>
                <div className={"fasi"}>
                <div><p>ფასი</p>
                    <button>Euro</button>
                    <button>Gel</button>
                </div>
                    <div className={"inputprices"}></div>
                <input type={"text"} placeholder={"დან"}></input>
                <input type={"text"} placeholder={"მდე"}></input>
                </div>
                <button className={"searchbutton"}>ძებნა</button>
            </div>

        </>
    )
}

export default SearchBar;