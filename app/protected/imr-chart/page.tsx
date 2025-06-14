import React from 'react'
import { IMRChartProvider } from './contex/contex'
import IMRChart from './components/chart'
import IMRChartConfiguration from './components/config'
import ToolWrapper from '@/components/tool-wrapper'
import IMRChartHistory from './components/history'
import IMRChartInfo from './components/info-dialogue'

function page() {
  return (
    <IMRChartProvider>
      <ToolWrapper
        title="I-MR Chart"
        toolId=""
        firstComponent={< IMRChart/>}
        secondComponent={< IMRChartHistory/>}
        infoComponent={<IMRChartInfo/>}
      />
    </IMRChartProvider>  )
}

export default page