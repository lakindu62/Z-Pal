import React from 'react'
import TodaysLog from '../components/log/TodaysLogDisplay'
import Tabs from '../components/Tabs'
import { getDate } from '../utils'

export default function Progress() {
  return (
    <div>
        {/* <TodaysLog path='/users/ZQjWr0S5sRfz4WaFklhOvoBcmhx2/userLogs' /> */}
        <Tabs path={`/users/ZQjWr0S5sRfz4WaFklhOvoBcmhx2/userLogs/${getDate()}`}  />
    </div>

  )
}
