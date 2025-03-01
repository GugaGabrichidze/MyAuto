import { useState, useEffect, useRef } from "react";
import "./ManufacturerDropdown.css";

function ManufacturerDropdown({ MyAutoData, selectedManufacturers, setSelectedManufacturers }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleCheckboxChange = (man_id) => {
        if (selectedManufacturers.includes(man_id)) {
            setSelectedManufacturers(selectedManufacturers.filter((id) => id !== man_id));
        } else {
            setSelectedManufacturers([...selectedManufacturers, man_id]);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="manufacturer-dropdown" ref={dropdownRef}>
            <button className="dropdown-toggle" onClick={toggleDropdown}>
                {selectedManufacturers.length > 0
                    ? `არჩეულია (${selectedManufacturers.length})`
                    : "აირჩიე მწარმოებელი"}
            </button>
            {isOpen && (
                <div className="dropdown-menu">
                    {MyAutoData.map((brand) => (
                        <label key={brand.man_id} className="checkbox-label">
                            <input
                                type="checkbox"
                                checked={selectedManufacturers.includes(brand.man_id)}
                                onChange={() => handleCheckboxChange(brand.man_id)}
                            />
                            {brand.man_name}
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ManufacturerDropdown;
