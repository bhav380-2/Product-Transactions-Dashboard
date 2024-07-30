import React from 'react';
import '../css/header.css';

const Header = (props) => {
    const { handleMonth, handleSearch, month, search } = props;
    return (
        <header>
            <div className="header-logo"><span>Transactions</span> <span>Dashboard</span></div>
            <div className="header-actions">
                <select value={month} onChange={e => handleMonth(Number(e.target.value))}>
                    {[...Array(12).keys()].map(i => (
                        <option key={i} value={i + 1}>
                            {new Date(0, i).toLocaleString('default', { month: 'long' })}
                        </option>
                    ))}
                </select>
                <input
                    type="text"
                    placeholder="Search transactions..."
                    value={search}
                    onChange={e => handleSearch(e.target.value)}
                />
            </div>
        </header>
    )
}
export default Header;