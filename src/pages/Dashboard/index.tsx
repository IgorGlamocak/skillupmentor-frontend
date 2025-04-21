import DashboardLayout from 'components/ui/DashboardLayout'
import { FC, useEffect } from 'react'
import * as c3 from 'c3'
import * as API from 'api/Api'

const Dashboard: FC = () => {
  useEffect(() => {
    ;(async () => {
      const chart = c3.generate({
        bindto: '#chart',
        data: {
          x: 'x',
          columns: [['x'], ['Sales']],
          types: {
            Sales: 'bar',
          },
        },
        axis: {
          x: {
            type: 'timeseries',
            tick: {
              format: '%Y-%m-%d',
            },
          },
        },
      })

      const { data } = await API.fetchChart()
      chart.load({
        columns: [
          ['x', ...data.map((r: { date: string; sum: string }) => r.date)],
          ['Sales', ...data.map((r: { date: string; sum: string }) => r.sum)],
        ],
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
