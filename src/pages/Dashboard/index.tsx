import DashboardLayout from 'components/ui/DashboardLayout'
import { FC, useEffect } from 'react'
import * as c3 from 'c3'
import * as API from 'api/Api'

// Define the shape of the chart data returned from the server
interface ChartDatum {
  date: string
  sum: string
}

const Dashboard: FC = () => {
  useEffect(() => {
    ;(async () => {
      // Fetch chart data and ensure it's typed
      const response = await API.fetchChart()
      const data: ChartDatum[] = response.data

      // Generate the chart using the real data
      c3.generate({
        bindto: '#chart',
        data: {
          x: 'x',
          columns: [
            ['x', ...data.map((r: ChartDatum) => r.date)],
            ['Sales', ...data.map((r: ChartDatum) => Number(r.sum))],
          ],
          types: { Sales: 'bar' },
        },
        axis: {
          x: {
            type: 'timeseries',
            tick: { format: '%Y-%m-%d' },
          },
          y: {
            label: { text: 'Revenue', position: 'outer-middle' },
          },
        },
        padding: {
          right: 20,
        },
      })
    })()
  }, [])

  return (
    <DashboardLayout>
      <h1 className="mb-4">Sales</h1>
      <div id="chart"></div>
    </DashboardLayout>
  )
}

export default Dashboard
