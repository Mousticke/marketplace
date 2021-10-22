import React, { useCallback } from 'react'
import { Header } from 'decentraland-ui'
import { Sections } from '../../modules/routing/types'
import { Section } from '../../modules/vendor/decentraland'
import { VendorName } from '../../modules/vendor/types'
import { getPartners } from '../../modules/vendor/utils'
import { Menu } from '../Menu'
import { MenuItem } from '../Menu/MenuItem'
import { NFTSectionsMenuItems } from '../Vendor/decentraland/NFTSections/NFTSections'
import { VendorMenu } from '../Vendor/VendorMenu'
import { Props } from './AccountSidebar.types'

import './AccountSidebar.css'

const AccountSidebar = ({
  address,
  section,
  isCurrentAddress,
  onBrowse
}: Props) => {
  const handleOnBrowse = useCallback(
    (vendor: VendorName, section: string) => {
      onBrowse({ vendor, section, address })
    },
    [address, onBrowse]
  )

  const decentraland = VendorName.DECENTRALAND

  return (
    <div className="NFTSidebar">
      {isCurrentAddress ? (
        <div className="CurrentAccountSidebar">
          <Menu>
            <Header sub>MY ASSETS</Header>
            <MenuItem
              key={Sections.decentraland.COLLECTIONS}
              value={Sections.decentraland.COLLECTIONS}
              currentValue={section}
              onClick={section => handleOnBrowse(decentraland, section)}
            />
            <NFTSectionsMenuItems
              sections={[
                Sections.decentraland.LAND,
                Sections.decentraland.WEARABLES,
                Sections.decentraland.ENS
              ]}
              section={section as Section}
              onSectionClick={section => handleOnBrowse(decentraland, section)}
            />
          </Menu>
          <Menu>
            <Header sub>MY STORE</Header>
            <MenuItem
              key={Sections.decentraland.ON_SALE}
              value={Sections.decentraland.ON_SALE}
              currentValue={section}
              onClick={section => handleOnBrowse(decentraland, section)}
            />
            <MenuItem
              key={Sections.decentraland.SALES}
              value={Sections.decentraland.SALES}
              currentValue={section}
              onClick={section => handleOnBrowse(decentraland, section)}
            />
            <MenuItem
              key={Sections.decentraland.SETTINGS}
              value={Sections.decentraland.SETTINGS}
              currentValue={section}
              onClick={section => handleOnBrowse(decentraland, section)}
            />
          </Menu>
        </div>
      ) : (
        <VendorMenu
          key={decentraland}
          address={address}
          vendor={decentraland}
          section={section}
          onClick={section => handleOnBrowse(decentraland, section)}
        />
      )}
      {!isCurrentAddress &&
        getPartners().map(partner => (
          <VendorMenu
            key={partner}
            address={address}
            vendor={partner}
            section={section}
            onClick={section => handleOnBrowse(partner, section)}
          />
        ))}
    </div>
  )
}

export default React.memo(AccountSidebar)
