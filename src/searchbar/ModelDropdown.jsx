import { useState, useEffect, useRef } from "react";
import "./ModelDropdown.css";

function ModelDropdown({ selectedManId, selectedModels, setSelectedModels, modelData }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleCheckboxChange = (model_id) => {
        if (selectedModels.includes(model_id)) {
            setSelectedModels(selectedModels.filter((id) => id !== model_id));
        } else {
            setSelectedModels([...selectedModels, model_id]);
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
        <div className="model-dropdown" ref={dropdownRef}>
            <button className="dropdown-toggle" onClick={toggleDropdown}>
                {selectedModels.length > 0
                    ? `არჩეულია (${selectedModels.length})`
                    : "აირჩიე მოდელი"}
            </button>
            {isOpen && (
                <div className="dropdown-menu">
                    {modelData.map((model) => (
                        <label key={model.model_id} className="checkbox-label">
                            <input
                                type="checkbox"
                                checked={selectedModels.includes(model.model_id)}
                                onChange={() => handleCheckboxChange(model.model_id)}
                            />
                            {model.model_name}
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ModelDropdown;
