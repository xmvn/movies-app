import React from 'react'
import { Tabs } from 'antd'

const Header = ({ handleChange, selectedTab, setSelectedTab }) => {
  const items = [
    { label: 'Search', key: 'item-1' },
    { label: 'Rated', key: 'item-2' },
  ]

  const handleTabChange = (activeKey) => {
    const selectedItem = items.find((item) => item.key === activeKey)
    setSelectedTab(selectedItem.label)
  }

  return (
    <header>
      <div className="header-buttons">
        <Tabs items={items} onChange={handleTabChange} />
      </div>
      <div className="header-search">
        {selectedTab === 'Search' && (
          <input type="text" placeholder="Type to search..." onChange={(e) => handleChange(e.target.value)} />
        )}
      </div>
    </header>
  )
}
export default Header
